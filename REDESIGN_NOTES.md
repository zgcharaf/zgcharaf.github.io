# Data Engineering Portfolio — October 2026 redesign

This branch proposes an engineering-first redesign of [zgcharaf.github.io](https://zgcharaf.github.io/).

## What changed
- Homepage reoriented around data engineering, production pipelines and performance.
- Responsive visual language with green accents, technical sample and featured projects.
- Reworked writing archive and post layout.
- Two reproducible, synthetic-data engineering walkthroughs (Polars and Excel ingestion).
- Legacy research, teaching and professional history retained.
- Existing Jekyll/GitHub Pages setup retained; no new front-end framework required.

## Run locally
```bash
bundle install
bundle exec jekyll serve
```
Open http://127.0.0.1:4000/ and validate navigation and mobile layout.

## Verify the exercises
For the Polars benchmark: copy the Python snippet from the article to `benchmark.py`, install Polars and PyArrow, run it and record *your* environment and numbers. No benchmark speedups are claimed without measurements.

For the ingestion example: create a synthetic Excel workbook with a `metric` column, twelve ordered `YYYY-MM` columns and the two specified metrics, then run `ingest.py`. Verify that malformed inputs fail.

## Editorial roadmap
1. Test and publish a downloadable benchmark repository with CLI, pytest, RSS memory and environment metadata.
2. Add reproducible input fixtures + automated tests for the Excel ingestion article.
3. Write a backfills/idempotency Airflow + Postgres article with Docker Compose.
4. Write a late-arriving-events / incremental ingestion article with state transitions and error handling.
5. Add annotated system architecture diagrams, metrics and before/after screenshots from synthetic examples.

## Caveats
All public examples must remain independent of employer datasets, internal systems and confidential performance metrics. Verify personal role titles and claims before merging.
