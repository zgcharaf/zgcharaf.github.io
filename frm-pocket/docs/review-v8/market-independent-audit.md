# Independent market-content audit

Reviewed market-enrichment.json (54 questions and18 guides) independently of numeric.expression metadata. Compared all explicit numerical questions with the inputs in their stems and their selected answer. All19 numerical answers checked are correct. Strict KaTeX compilation succeeds for218 inline spans and formula records.

## Substantive correction requested

**xm018: rank-crossing VaR continuity.** Under a fixed finite scenario set and continuous scenario loss functions of position weights, the order-statistic empirical quantile is continuous. The active scenario can change at a crossing, but the two losses coincide there. Such crossings produce kinks/changes in derivatives, not discontinuous jumps in quantile value. Current stem, correct option and explanation endorse value jumps from rank changes. Asked author to replace this with derivative instability or explicitly introduce discontinuous rounding/positions.

## Assumption and notation refinements sent to author

- xm003: add finite ES/integrable tail before claiming strict increase; infinity can remain infinity.
- MR7 worked random-PIT example: specify the remaining20% of outcomes are strictly positive; otherwise the left CDF at zero need not equal zero.
- MR8 worked long-short example: specify correlations refer to underlying unsigned asset price changes, rather than signed position P&Ls. Otherwise the negative cross term risks double-counting the short sign.
- MR17 density formula: define r as the deterministic continuously compounded maturity-T zero rate (or constant rate). Merely saying deterministic rates does not define the e^(rT) factor if r denotes a time-varying short rate.
- xm033: levels OLS does not itself guarantee/assume stationary mean-reverting deviations; phrase this as the economic assumption of the levels hedge.
- xm029: the comonotonic default case is valid, but its MR10.2 Gaussian-copula objective mapping is more precise with explicit limiting rho→1 framing; otherwise MR10.1 is a better general copula label.

## Worked-example overlap

Most numerical examples intentionally rehearse the same method with different inputs. Three conceptual worked examples virtually disclose the same new diagnostic question: MR6 common benchmark/xm016, MR14 up-down recombination/xm040, MR16 random target driving a finite-variation rate/xm046. Suggested contrasting worked cases if these items are intended to count as fresh diagnostic evidence after studying the guide. This is a pedagogical-independence issue, not a mathematical error.

## Independently recomputed values

| Item | Result |
|---|---|
| xm002 |3600 observations|
| xm005 |4% weight, −4% innovation|
| xm008 |shape0.25, scale3m|
| xm011 |LR10.25866; reject under stated critical value|
| xm014 |general21, specific4|
| xm017 |SD0.4123106m|
| xm020 |KS0.15|
| xm023 |correlation-swap receipt0.75m|
| xm026 |mean0.15, persistence−0.20|
| xm029 |conditional default probability40%|
| xm032 |short45m and60m|
| xm035 |price91.6499078|
| xm038 |price98.09|
| xm041 |SD132.92975bp|
| xm044 |level proportional drift1%|
| xm047 |Euler rate2.30%|
| xm049 |total variances0.0225 and0.0400|
| xm050 |butterfly cost−0.4|
| xm053 |LH-adjusted ES9.539392m|

No other mathematical key error found. Questions and guide formulas were checked for CDF/ES grouping, GPD support/domain, covariance units, diffusion-versus-level conventions and risk-neutral versus physical probabilities. Revisions belong to the market author; this reviewer did not edit that dataset.
