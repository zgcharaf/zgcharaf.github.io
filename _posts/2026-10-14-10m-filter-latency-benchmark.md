---
layout: post
title: "Benchmarking 10 Million Collection Events: Pandas, Polars, Cython and Rust/C++"
description: "Real measurements of warm filter-change and KPI recalculation latency across four engine architectures on 10 million synthetic collection events."
date: 2026-10-14 13:19:00 +0200
category: PERFORMANCE
tags: [Python, Pandas, Polars, Cython, C++, Rust, Benchmarking]
---

> **Scope:** This is a benchmark on deterministic **synthetic data**, not a measurement of the deployed business tool described in my [segmentation case study]({{ '/blog/segmentation-engine/' | relative_url }}).

## Why benchmark a filter change?

The real-world engineering problem is not processing ten million rows once. It is enabling business users to change a filter and immediately recalculate segment-level efficiency, monetary exposure, average monthly outcomes and segment weights.

The question: **Can a compiled filtering stage reduce the entire filter-change-and-KPI recalculation latency, rather than just accelerating an isolated low-level predicate?**

## Experimental design

I generated **10,000,000 synthetic event records**, saved in a **98.3 MiB Parquet** file. The dataset models ENC/RET movements, collection phases, risk score deciles 1–9, CL/CP/BA products, due-date quintiles, 12 entry months and IMPAYE date ranges.

Each scenario begins from the same constrained selection and changes **one** axis. The timer includes filtering the *new* selection, grouping by entry month and assembling the count, amount, efficiency and weight KPIs. The previous selection is executed outside the clock. Data are already loaded into memory; results are not cached per filter. Disk loading, initialization, browser paint and network are excluded.

**Environment:** Windows 11, Python 3.12.0, Pandas 2.3.3, Polars 1.44.2, NumPy 2.5.4 and 32 logical CPU cores. Four engines × seven scenarios × 30 timed repetitions yielded **840 timed measurements**, after **140 warmup calls**. The order of engines is shuffled between iterations. **All 28 engine/scenario outputs passed correctness checks.**

## Four engine architectures

| Implementation | Filtering | Aggregation |
| --- | --- | --- |
| Pandas | Pandas Boolean selection | Pandas groupby |
| Polars | **Eager** Polars filter expressions | Polars groupby |
| Polars + Cython + C++ | Compiled C++ integer/bitmask filter, called via Cython | Polars groupby |
| Polars + Rust/PyO3 + C++ | **The same** compiled C++ filter, called via Rust/PyO3 | Polars groupby |

The native paths still use Polars for KPI aggregation. The Rust bridge is not a Rust filtering algorithm; it is an alternative integration path to the same C++ kernel.

## Results: 10-million-row filter change

![Median filter-change latency by engine and scenario]({{ '/assets/img/benchmark-10m-median.svg' | relative_url }})

The headline is the **unweighted average of the seven scenario-level medians**. It is not the median of all 210 observations pooled for each engine.

| Engine | Mean scenario median | Relative speed vs Pandas |
| --- | ---: | ---: |
| Pandas | 738.96 ms | 1.00× |
| Polars | 403.33 ms | 1.83× |
| Polars + Cython + C++ | **81.39 ms** | **9.08×** |
| Polars + Rust + C++ | 82.53 ms | 8.95× |

On these seven scenarios, the Cython/C++ filter + Polars aggregation averaged **4.96× lower latency than the tested eager Polars path** and **9.08× lower latency than Pandas**. It beat the tested Polars path on all seven scenarios (4.24×–6.23× by scenario). These are measured outcomes on one synthetic workload, not promises about every Polars program.

| Filter change | Pandas | Polars | Cython/C++ | Rust/C++ |
| --- | ---: | ---: | ---: | ---: |
| ENC → RET | 1,027.87 | 536.84 | 126.02 | 124.40 |
| Phase 1–3 → Phase 2 | 701.14 | 406.97 | 74.00 | 82.20 |
| Deciles 2–8 → 4–5 | 582.97 | 298.33 | 63.04 | 61.84 |
| CL+CP → BA | 551.58 | 267.41 | 63.12 | 62.15 |
| Due-date quintiles → 4–5 | 580.81 | 300.88 | 64.23 | 63.82 |
| IMPAYE dates → May–Aug | 837.52 | 457.15 | 90.12 | 92.57 |
| Entry months → Jul–Sep | 890.83 | 555.70 | 89.18 | 90.71 |

*All values above are medians in milliseconds, measured over 30 timed repetitions.*

## Tail latency reveals a different story

The **Phase 2** scenario had unusually long tails across every engine. Its p95 was **1,984.89 ms** for Pandas, **1,029.53 ms** for Polars, **186.76 ms** for Cython/C++ and **182.22 ms** for Rust/C++. The Cython path's median for the same scenario was 74.00 ms, so its p95 was about 2.52 times higher.

The common cross-engine behavior suggests a shared time-varying machine effect may have contributed, but this run cannot establish a cause. In particular, a p95 estimated from 30 observations is not a robust production SLO measurement.

The native bridges performed similarly overall: **81.39 ms for Cython vs 82.53 ms for Rust/PyO3** when averaging scenario medians. That small difference is not grounds to declare one bridge faster.

## How does it change with dataset size?

A separate **100,000-row** preliminary run (five repetitions, not thirty) produced mean scenario medians of **40.37 ms Pandas**, **26.83 ms Polars**, **10.57 ms Cython/C++** and **10.45 ms Rust/C++**.

At 10 million rows, the corresponding figures were **738.96**, **403.33**, **81.39** and **82.53 ms**. These two experiments are not controlled scaling measurements because they were run separately under potentially different machine/cache conditions and with different repetition counts. More sizes are needed to determine a defensible crossover point.

## What this result does not prove

An important baseline caveat: the standalone Polars implementation used eager `DataFrame.filter` expressions. It did **not** use an independently tuned lazy query plan, fused alternative, or a predicate-specific optimization. Accordingly, a claim such as “C++ is five times faster than Polars” would be too broad. The defensible claim is about **this specific compiled mask architecture versus these specific eager Pandas/Polars implementations**.

The report also does not measure initial loads, peak RSS, concurrent users or perceived Streamlit response time. Multiple in-memory representations are prepared *before* the clock starts.

## Next experiments

The next iteration should add an optimized lazy Polars baseline, isolate the native-mask and aggregation costs, benchmark multiple dataset sizes and selectivities, and measure actual Streamlit interactions under concurrency.

The lesson is not that every filter belongs in C++. It is that **the right representation and execution boundary can dramatically change the latency of a repeated analytical workflow**.

---

*This study uses synthetic data only and does not expose customer data, employer source code or measurements from the proprietary deployed application.*
