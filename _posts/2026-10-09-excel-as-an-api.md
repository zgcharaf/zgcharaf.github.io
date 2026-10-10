---
layout: post
title: "When an Excel file is your upstream API"
description: "How to turn a twelve-month, row-oriented spreadsheet into a validated, versionable and rerunnable data ingestion contract."
date: 2026-10-09 10:00:00 +0200
category: DATA QUALITY
tags: [ETL, Excel, Python, Data Contracts]
---

Not every production pipeline begins with Kafka or an API. Sometimes an external team sends a monthly workbook, the rows are metrics, the columns are months and every file is *almost* identical.

The engineering problem is not reading Excel. It is ensuring **the same input produces the same validated output, errors are visible and schema changes cannot silently contaminate reporting**.

## A concrete contract

Imagine that each row represents a business metric and the following twelve columns represent months. In this simplified example, we require:

- A `metric` header followed by exactly twelve month labels in `YYYY-MM` format.
- Unique metric names from an allowed set.
- Non-negative numerical values, with blanks treated as missing rather than zero.
- A canonical long table: `metric, month, value`.
- A deterministic output file, regenerated safely on reruns.

For public demonstrations, use fictional numbers only.

## An example input

| metric | 2026-01 | 2026-02 | ... | 2026-12 |
| --- | ---: | ---: | --- | ---: |
| accounts_open | 120 | 128 | ... | 180 |
| payments_received | 34500 | 36200 | ... | 45800 |

A wide spreadsheet is convenient for humans. Most downstream checks, joins and time-series analyses benefit from a normalized long representation.

## A small, runnable ingestion function

Install the dependencies:

```bash
pip install "polars>=1,<2" openpyxl
```

Save this as `ingest.py`:

```python
from pathlib import Path
import re
import polars as pl

ALLOWED_METRICS = {"accounts_open", "payments_received"}
MONTH = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")

def transform(input_file: str, output_file: str) -> None:
    source = pl.read_excel(input_file, engine="openpyxl")
    headers = source.columns
    if not headers or headers[0] != "metric" or len(headers) != 13:
        raise ValueError("Expected metric plus exactly 12 monthly columns")

    months = headers[1:]
    if len(set(months)) != 12 or not all(MONTH.fullmatch(m) for m in months):
        raise ValueError("Invalid or duplicated month headers")

    expected_year = months[0][:4]
    expected = [f"{expected_year}-{m:02d}" for m in range(1, 13)]
    if months != expected:
        raise ValueError("Expected 12 ordered calendar months in one year")

    metrics = source["metric"].to_list()
    if (not metrics or any(not isinstance(m, str) for m in metrics)
            or len(set(metrics)) != len(metrics)
            or set(metrics) != ALLOWED_METRICS):
        raise ValueError("Unexpected, missing or duplicate metrics")

    long = source.unpivot(
        index="metric",
        on=months,
        variable_name="month",
        value_name="value",
    )
    long = long.with_columns(pl.col("value").cast(pl.Float64, strict=True))
    if long["value"].null_count():
        raise ValueError("Missing values: ask upstream to correct source")
    if long.filter(pl.col("value") < 0).height:
        raise ValueError("Negative values violate the agreed contract")

    long = long.sort(["metric", "month"])
    target = Path(output_file)
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_name(target.name + ".tmp")
    long.write_parquet(temporary)
    temporary.replace(target)
    print(f"Validated {long.height} metric/month records -> {target}")

if __name__ == "__main__":
    transform("monthly_report.xlsx", "output/monthly_report.parquet")
```

The temporary file and replace step reduce the risk of a reader observing a partially written result **on the same filesystem**. This is not a transactional guarantee for object storage or multiple writers.

## Test the contract with adversarial inputs

| Test | Expected behavior |
| --- | --- |
| Missing February column | Reject |
| Two columns for March | Reject |
| `payment_received` typo | Reject |
| String `N/A` where a number belongs | Reject |
| Negative payment amount | Reject |
| Rerun identical workbook | Same logical table; replace output |
| Row order changes | Canonical sorted output |

For full production use, add an input checksum, source version, run identifier, quarantine folder, structural logging and downstream reconciliation against prior periods. A single catch-all `try/except` that continues the pipeline on failure would be the wrong abstraction.

## What makes this data engineering?

The useful artifact is not the Excel parser. It is the **contract between the upstream human workflow and the downstream automated one**: explicit schema, validation, deterministic transformation and repeatability. Real systems also need ownership, incident handling and versioned migrations when upstream formats change.

This is a standalone synthetic example, not a description of any employer's confidential data or pipeline.
