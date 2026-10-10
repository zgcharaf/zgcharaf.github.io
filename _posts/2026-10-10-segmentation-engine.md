---
layout: post
title: "From 10 Million Customer Events to Business Decisions"
description: "Building a deployed interactive segmentation engine using Streamlit, Python, Polars and C++."
date: 2026-10-10 15:30:00 +0200
category: ENGINEERING CASE STUDY
tags: [Streamlit, Python, Polars, C++, Performance]
---

*The hardest part of analyzing ten million customer events was not their volume. It was letting business users explore arbitrary segments, repeatedly, without writing code or waiting for a bespoke report.*

## The problem: from events to economic decisions

We needed to analyze approximately **10 million customer events** across multiple axes. A static dashboard could display predefined aggregations, but users needed to explore new combinations on demand: Which populations perform well? Which pockets underperform? What do those differences represent in **euros and event counts**?

The solution was an interactive, **deployed Streamlit application** backed by a calculation engine using **Python, Polars and C++**. Users could narrow the data along several dimensions, inspect a segment, change the selection and immediately recompute its KPIs.

The experience resembled a decision tree, except the business user chose the splits. It was **not a trained decision-tree model**: it was multidimensional, guided analytical exploration.

## What the application calculated

Every selection was assessed on more than one dimension:

| Metric family | Count-based | Amount-based |
| --- | --- | --- |
| Scale | Number of events | Eligible event amount |
| Efficiency | Efficient event count and rate | Efficient amount and rate |
| Inefficiency | Inefficient event count and rate | Inefficient amount and rate |
| Monthly averages | Average monthly efficient and inefficient event counts | Average monthly efficient and inefficient amounts |
| Segment weight | Share of all reference events | Share of total reference amount |

To keep indicators interpretable, the denominator must be explicit. A segment's percentage of the total universe is different from its percentage of the *parent* segment. Event counts are also not unique customer counts: customers may have repeated events.

Let S denote the selected events, U the reference universe, and M the number of months in the reporting window. Illustrative definitions are:

- Event weight = count(S) / count(U).
- Amount weight = eligible_amount(S) / eligible_amount(U).
- Count efficiency = successful eligible events in S / eligible events in S.
- Amount efficiency = amount associated with successful outcomes in S / eligible amount in S.
- Mean monthly inefficiency amount = inefficient amount in S / M.

These are **illustrative definitions**, not a disclosure of the organization's business rules. The actual classification of efficiency and the eligible denominator must be agreed with business owners. Missing or pending outcomes, zero denominators and months with no activity must be treated explicitly.

### A synthetic illustration

Suppose a year of data contained **10 million events worth €180 million**. A user-defined segment contains **300,000 events worth €18 million**, of which 210,000 events and €11.7 million meet the illustrative success criterion.

| KPI | Segment |
| --- | ---: |
| Weight by number | 3.0% |
| Weight by amount | 10.0% |
| Efficiency by number | 70.0% |
| Efficiency by amount | 65.0% |
| Inefficient amount | €6.3 million |
| Average monthly inefficient amount | €525,000 |
| Average monthly inefficient events | 7,500 |

*These numbers are fictional and provided only to explain the calculation.*

The interesting business question is why a population contributing **3% of events** represents **10% of monetary exposure**, while amount-based performance trails count-based performance. This creates a hypothesis for investigation, **not proof of a causal effect**. An inefficient amount is not automatically recoverable revenue.

## Four technologies, one interactive workload

The public architectural description is deliberately conceptual:

```text
Business user
     |
     v
Streamlit: choose filters and comparison axes
     |
     v
Python: orchestrate each selection and KPI request
     |
     +---- C++: performance-critical filter evaluation
     |
     +---- Polars: columnar aggregation and summarization
     |
     v
Counts, amounts, monthly averages, rates, segment weights
     |
     v
Streamlit: render updated business view
```

**Streamlit** provided an accessible interface. **Python** coordinated the application and calculations. **Polars** handled columnar computations. **C++** accelerated performance-sensitive filtering paths. The exact binding, execution boundaries and proprietary source code are not presented here.

The central engineering challenge was **not a single batch query**. Filters changed repeatedly, requiring fast recalculation of related numerators and denominators while preserving correctness.

## Optimizing for response time rather than benchmark theater

A native filtering routine is useful only when it reduces *end-to-end* latency. Its speedup can disappear if copying intermediate arrays between Python and C++ is expensive.

The practical principles are:

1. Separate stable data preparation from computations depending on active filters.
2. Minimize intermediate materialization and avoid transferring unnecessary columns.
3. Keep the hot filtering path small, but rely on Polars for operations it already optimizes well.
4. Recompute dependent metrics from the same segment definition, with unambiguous denominators.
5. Benchmark entire interactions, including Python/native overhead, aggregation and rendering.

Streamlit reruns application code in response to widget changes. Efficient applications make careful choices about what is reused across reruns, what must be recalculated and what state must stay isolated per user. The use of shared caches or state requires particular care in a multi-user setting.

I am intentionally **not claiming a 10x, 50x or other performance improvement** without verified measurements. The system was deployed, but comparable production timings are not included in this public write-up.

## Correctness is part of the calculation engine

Multiple filters can produce tricky edge cases. The engine and presentation logic need to distinguish:

- Full-universe versus parent-segment weights.
- Event counts versus distinct customer counts.
- Pooled period rates versus averages of monthly percentages.
- Zero-activity months versus missing months.
- Empty segments versus genuinely zero efficiency.
- Mutually exclusive outcomes versus missing or unresolved events.
- A monetary amount associated with an outcome versus *incremental financial impact*.

These distinctions matter because a polished interface can make incorrect KPIs look authoritative.

## From an analytical exercise to a deployed tool

The result was a business-facing tool that made multidimensional segmentation possible without requiring users to write SQL or code. Users could investigate high- and low-performing segments, understand their relative weight in the overall population and express that performance through monetary values, absolute counts and percentages.

This project shaped my engineering philosophy: **optimization starts with an actual user workflow**. A fast algorithm matters because it allows someone to ask a second question, challenge the first answer and reach a better decision while they are still exploring.

A natural public companion project is a fully synthetic benchmark that compares alternative filtering engines on reproducible event data, records p50/p95 interaction latency, validates KPI invariants and reports the costs of crossing Python/C++ boundaries. Those results would describe the public experiment, not the proprietary application.

---

*Confidentiality: This article describes the general problem and technology stack of a deployed professional project. All numeric examples are synthetic. It shares no customer data, employer source code, deployment secrets or unpublished production benchmarks.*
