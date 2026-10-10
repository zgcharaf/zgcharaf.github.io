---
layout: post
title: "From 10 Million Customer Events to Business Decisions"
description: "Building a deployed interactive segmentation engine using Streamlit, Python, Polars, Cython and C++."
date: 2026-10-10 00:00:00 +0200
category: ENGINEERING CASE STUDY
tags: [Streamlit, Python, Polars, Cython, C++, Performance]
---

*The hardest part of analyzing ten million customer events was not their volume. It was letting business users explore arbitrary segments, repeatedly, without writing code or waiting for a bespoke report.*

## The problem: from events to economic decisions

We needed to analyze approximately **10 million customer events** across multiple axes. A static dashboard could display predefined aggregations, but users needed to explore new combinations on demand: Which populations perform well? Which pockets underperform? What do those differences represent in **euros and event counts**?

The solution was an interactive, **deployed Streamlit application** backed by a calculation engine using **Python, Polars, Cython and C++**. Users could narrow the data along several dimensions, inspect a segment, change the selection and immediately recompute its KPIs.

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

## An interactive workload across Python, Cython and C++

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
     +---- Cython: compiled Python/C++ interface
     |         |
     |         v
     |       C++: performance-critical filtering
     |
     +---- Polars: columnar aggregation and summarization
     |
     v
Counts, amounts, monthly averages, rates, segment weights
     |
     v
Streamlit: render updated business view
```

**Streamlit** provided an accessible interface. **Python** coordinated the application and calculations. **Polars** handled columnar computations. **Cython** formed the compiled interface between Python and C++, and **C++** accelerated performance-sensitive filtering paths. The precise native APIs, ownership model and proprietary source code are not presented here.

The central engineering challenge was **not a single batch query**. Filters changed repeatedly, requiring fast recalculation of related numerators and denominators while preserving correctness.

## Bridging Python and C++ with Cython

**Cython was the integration layer**, not simply another framework on the technology list. It let the Python application call compiled routines without exposing C++ complexity to the Streamlit interface.

This boundary matters for repeated interactive requests. Compiled native filtering can be fast, but each request still incurs the costs of argument validation, conversion or copying (if needed), calling the compiled code and presenting its results back in Python. The engineering target is the **whole operation**, not only the C++ loop.

To demonstrate the mechanism without publishing employer code, consider this *illustrative* Cython interface for a much smaller operation: counting matches in a contiguous `int32` array.

```cython
# segment_bridge.pyx — public illustration, not production code
from libc.stdint cimport int32_t
from libc.stddef cimport size_t

cdef extern from "segment_core.hpp":
    size_t count_matches(const int32_t* codes,
                         size_t length,
                         int32_t target) nogil

def count_filtered(const int32_t[::1] codes, int target):
    cdef Py_ssize_t length = codes.shape[0]
    cdef size_t matches
    if length == 0:
        return 0
    with nogil:
        matches = count_matches(&codes[0], <size_t>length,
                                <int32_t>target)
    return matches
```

Here a Cython **typed memoryview** describes the contiguous input and the declaration exposes a C++ function through a compiled extension. A public C++ header and extension build configuration would be required to actually compile this small example. Releasing the GIL is safe only if the called routine does not touch Python objects and is thread-safe for concurrent calls.

This is **not** the actual implementation of our multi-axis filter engine; it deliberately demonstrates only the boundary. A real multi-axis implementation may combine masks or row indices, and its best interface depends on the data layout.

One subtlety: a Polars column exported to a NumPy array or other buffer **does not always imply zero-copy**. Nulls, type conversions, memory layout and ownership can force allocations. Any honest benchmark of a Polars–Cython–C++ path must include those costs and verify the lifetime of the input buffer.

## Optimizing for response time rather than benchmark theater

A native filtering routine is useful only when it reduces *end-to-end* latency. Its speedup can disappear if copying intermediate arrays between Python and C++ is expensive.

The practical principles are:

1. Separate stable data preparation from computations depending on active filters.
2. Minimize intermediate materialization and avoid transferring unnecessary columns.
3. Keep the hot filtering path small, but rely on Polars for operations it already optimizes well.
4. Recompute dependent metrics from the same segment definition, with unambiguous denominators.
5. Benchmark entire interactions, including Cython boundary overhead, any copies, aggregation and rendering.

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

A natural public companion project is a fully synthetic benchmark that compares pure Polars, Cython-wrapped native filtering and other approaches on reproducible event data, records p50/p95 interaction latency, validates KPI invariants and reports the costs of crossing Python/C++ boundaries. Those results would describe the public experiment, not the proprietary application.

---

*Confidentiality: This article describes the general problem and technology stack of a deployed professional project. All numeric examples are synthetic. It shares no customer data, employer source code, deployment secrets or unpublished production benchmarks.*
