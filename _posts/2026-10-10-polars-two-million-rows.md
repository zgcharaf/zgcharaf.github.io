---
layout: post
title: "What actually makes a 2-million-row Polars pipeline faster?"
description: "A reproducible experiment on synthetic Parquet data: eager versus lazy execution, selective scans, query plans, correctness and honest benchmark methodology."
date: 2026-10-10 10:00:00 +0200
category: PERFORMANCE
tags: [Python, Polars, Parquet, Benchmarking]
---

A slow pipeline is not automatically a reason to switch frameworks. Often the largest improvement comes from **reading fewer bytes, creating fewer intermediate objects and pushing filters closer to the scan**.

This article provides an experiment you can run locally, not a fabricated claim that one engine is *N times faster*.

## The problem

Imagine two million transaction-like events stored in Parquet, with columns for account, country, event time, amount, status and an intentionally large payload. The task is to aggregate paid amounts by country for a chosen subset of records.

We will compare:

1. An eager path that loads the full dataset before selecting and filtering.
2. A lazy path that expresses the same transformation from `scan_parquet`, allowing the optimizer to push down projections and eligible predicates.

**Crucially, the results must match.** Faster but incorrect is a regression.

## Reproduce the experiment

Use Python 3.11+ and install `polars` and `pyarrow`:

```bash
python -m venv .venv
source .venv/bin/activate # Windows: .venv\Scripts\activate
pip install "polars>=1,<2" pyarrow
python benchmark.py
```

Save the following code as `benchmark.py`:

```python
from pathlib import Path
from statistics import median
from time import perf_counter
import polars as pl

PATH = Path("synthetic_events.parquet")
ROWS = 2_000_000

def generate() -> None:
    if PATH.exists():
        return
    # Deterministic, synthetic values. No confidential data.
    frame = (
        pl.DataFrame({"id": range(ROWS)})
        .with_columns(
            (pl.col("id") % 12).cast(pl.Int32).alias("country"),
            (pl.col("id") % 1000).cast(pl.Float64).alias("amount"),
            ((pl.col("id") % 5) == 0).alias("paid"),
            pl.lit("synthetic_payload_" + "x" * 120).alias("payload"),
        )
    )
    frame.write_parquet(PATH)

def eager() -> pl.DataFrame:
    return (
        pl.read_parquet(PATH)
        .filter(pl.col("paid") & (pl.col("country") < 4))
        .group_by("country")
        .agg(pl.col("amount").sum().alias("total"))
        .sort("country")
    )

def lazy() -> pl.DataFrame:
    return (
        pl.scan_parquet(PATH)
        .filter(pl.col("paid") & (pl.col("country") < 4))
        .group_by("country")
        .agg(pl.col("amount").sum().alias("total"))
        .sort("country")
        .collect()
    )

def measure(fn, repeats=7):
    durations = []
    result = None
    for _ in range(repeats):
        t0 = perf_counter()
        result = fn()
        durations.append(perf_counter() - t0)
    return result, median(durations), durations

if __name__ == "__main__":
    generate()
    # Warm up both code paths before timing.
    eager()
    lazy()
    eager_result, eager_s, _ = measure(eager)
    lazy_result, lazy_s, _ = measure(lazy)
    assert eager_result.equals(lazy_result), "Results differ!"
    print(f"rows={ROWS:,} file_bytes={PATH.stat().st_size:,}")
    print(f"eager_median={eager_s:.4f}s")
    print(f"lazy_median={lazy_s:.4f}s")
    print(f"eager_to_lazy_ratio={eager_s / lazy_s:.2f}x")
    print(lazy_result)
```

## Why the lazy plan can win

`read_parquet` materializes the data before the next transformation starts. `scan_parquet` builds a query plan; Polars can request only the columns needed for filtering and aggregation, and may use Parquet statistics to avoid decoding irrelevant row groups when the physical file permits it.

Inspect the plan *before* collecting:

```python
query = (
    pl.scan_parquet("synthetic_events.parquet")
    .filter(pl.col("paid") & (pl.col("country") < 4))
    .group_by("country")
    .agg(pl.col("amount").sum().alias("total"))
)
print(query.explain(optimized=True))
```

Look for the scan's projected columns and filter. A predicate being pushed to the scanner does **not** guarantee row-group pruning: that also depends on layout and statistics.

## Benchmark without fooling yourself

| Pitfall | Better approach |
| --- | --- |
| Comparing different computations | Assert result equality |
| Timing synthetic data creation | Generate before timing |
| Trusting one run | Warm up, repeat and report a median |
| Publishing a speedup with no context | Include CPU, RAM, Polars version and file size |
| Treating memory and latency as equivalent | Record peak RSS separately if needed |
| Expecting every Parquet file to prune the same way | Inspect file layout, row groups and query plan |

This simple experiment measures **warm, local execution**, not production end-to-end time. Disk cache, compression, cardinality and memory pressure can change the result drastically. Treat the printed ratio as an observation on *your machine*, not a universal benchmark.

## The production lesson

My order of operations is: define correctness, profile read and transform stages, reduce the bytes scanned, measure repeated workloads, and finally consider parallelism or a different execution engine. Bigger machines should not be your first optimization.
