# Investment enrichment audit

Deliverable: `investment-enrichment.json`. Source edition: uploaded 2024 GARP investment volume,251 PDFpages. Target: the 17 investment readings in the supplied 2026 objective map. This is original educational content, not official GARP questions or an assertion of official validation.

## Delivered and checked

- 68 original MCQs, exactly 4 for every current readingIM-1 throughIM-17. Every reading has understanding, application and critical evidence; total 18 understanding,28 application,22 critical.
- 38 questions at level 4 and 30 at level 5. Level labels are editorial difficulty estimates, not calibrated psychometrics.
- 59 distinct current objectives directly tested by the new questions. This addition does **not** by itself exhaust all 96 investment objectives; guides and prior bank cover additional material, and objective gaps must remain visible.
- 17 chapter guides, each with 3 principles,3 active-recall prompts,2 specific traps, a worked mini-case, assumptions and prerequisite suggestions.
- 27 formula entries. Inline equations use explicitLaTeX delimiters. The local pinned KaTeX engine compiled every detected equation and every formula entry without errors; see `investment-validation.json` for the actual run counts.
- 29 numeric MCQs have recomputable pureMathJS expressions. All recomputations passed. Correct answer positions are balanced 17 A/17 B/17 C/17 D, with deterministic scrambling and synchronized distractor feedback.
- Exact normalized-stem duplicate check against all 624 pre-existing items passed. A high-overlap initial Mahalanobis plug-in case was replaced with a conditional scenario-to-P&L problem: mapping the conditional mean and residual uncertainty, not re-numbering the old squared-distance exercise.
- An independent colleague manually recomputed the bank’s numerical cases and confirmed the answer keys, including Brinson 0.65 percentage points, finite VaR removal 1.662, constrained hedge 1, marginal Sharpe derivative 0.004, PME 1 and annual sum volatilitysqrt 7.
- Two guide mini-cases that were overly close to diagnostic MCQs were replaced: private-credit guide now uses levered NAV markdowns; fund-liquidity guide now uses settlement-date cash availability.

##2024 to 2026 crosswalk

PDF page numbers below are physical,1-based PDF pages, not printed page numbers.

|2024 chapter|Physical PDF pages|2026 target|Treatment|
|---|---:|---|---|
|1 Factor Theory|14–25|IM-1|Matched|
|2 Factors|26–41|IM-2|Matched|
|3 Alpha and Low-Risk Anomaly|42–65|IM-3|Matched|
|4 Portfolio Construction|66–81|IM-4|Matched|
|5 Portfolio Risk: Analytical Methods|82–95|IM-5|Matched|
|6 VaR and Risk Budgeting|96–107|IM-6|Matched|
|7 Risk Monitoring and Performance Measurement|108–129|No autonomous matching reading|Supplementary; do not add to current required chapter count|
|8 Portfolio Performance Evaluation|130–159|IM-7|Matched|
|9 Hedge Funds|160–199|IM-8 and partialIM-9 background|Partial: cannot replace two different current readings|
|10 Performing Due Diligence|200–213|IM-12|Matched|
|11 Predicting Fraud by Investment Managers|214–241|No autonomous matching reading|Supplementary; do not relabel it as the Madoff reading|

There is no complete current text forIM-9,IM-10,IM-11,IM-13,IM-14,IM-15,IM-16 orIM-17 in this uploaded investment PDF. Some ideas in the old hedge-fund chapter supportIM-9, but its current regulation/organization scope is not covered fully. Those guides and questions carry `sourceRef` and a current-edition scope note instead of a fabricated 2024 chapter citation. IM-8 carries the older hedge-fund chapter as partial support, with the edition difference disclosed in the crosswalk.

## Actual review scope and limits

Full text was extracted for all 251 pages. Chapter boundaries, all 11 chapter objective lists, table-of-contents structure and page-level subject material were inspected against the current objective map. Selected explanatory passages, derivations and worked problems were examined across the matched chapters. More detailed review concentrated on SDF pricing; factor premiums; benchmark dependence and low-risk anomalies; neutralization, no-trade bands and dispersion; VaR decomposition and finite trades; active manager risk budgets; performance attribution, timing, and the chapter 8 problem sets; hedge-fund option-like payoffs and funding shocks; and diligence controls, fees, business-model sustainability and service-provider mandates.

This is a systematic chapter audit plus selected detailed passage/problem review, **not** a claim that every line, statistical table, bibliography or end-problem in the entire 251-pagePDF has received a complete line-by-line verification. Historical result tables and references were scanned for scope rather than reproduced. OCR can corrupt powers, Greek letters, signs and formula layout; new formulas were reconstructed as original mathematical statements and checked algebraically rather than copied mechanically from OCR. No uploaded PDF or book problem is published with this deliverable.

The precise central passages examined include physical PDF 70–73(no-trade/neutralization),86–89 and 93–94(VaR),105–106(risk budgets),131–132 and 137–148(performance methods),151–159(performance problem sets and solution concepts),176–182 and 193–194(hedge-fund mechanisms and funding),203–212(diligence). Chapter 1–3 explanations and later paragraphs were additionally reviewed across 14–24,26–41 and 42–64. The old predictive-fraud material was treated as supplementary, not given a new current objective identity.

Important semantic correction during review: benchmark-weighted mean-centering of alphas is distinct from risk-benchmark neutralization. The guide now separately states the simple mean-centering operation and the beta-adjusted benchmark-neutral alpha formula. The associated MCQ explicitly asks for the stated mean-centering operation and does not falsely assert general factor neutrality.

## Primary-source scope for absent current texts

- Current GARP learning-objectives map supplied by the parent is the scope authority for every objective label: https://www.garp.org/landing/frm-learning-objectives
- IM-9: SEC original hedge-fund discussion used for conceptual risk/organization background, without treating a 2006 speech as a statement of current law: https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds
- IM-10: IMF original 2024 GFSR chapter 2: https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf
- IM-11: CFA Institute-authored performance-method discussion and current objectives. The bespoke PME exercise states its convention completely: https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns
- IM-13: current objectives plus explicit hypothetical restructuring rules; no jurisdiction-specific legal claim is invented.
- IM-14: author paper identity for the required reading: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639 . Full paper retrieval failed during review, so the guide is not claimed to be a line-by-line audit of that paper; questions use general independently-verifiable diligence mechanisms, not alleged historical details beyond the stated strategy.
- IM-15 and IM-16: original BlackRock/Wiley chapter identities and current objectives; publisher contents verified: https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3 . Publisher page verifies scope and authors, not every formula in inaccessible chapters. The Gaussian and transaction-cost exercises therefore state all model assumptions and are original examples.
- IM-16 supplement: BIS original research on fund liquidity: https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications
- IM-17: current objectives and explicitly stated smoothing/covariance assumptions. This chapter is absent from the uploaded investment volume; no invented 2024 book-reference claim is made.

## Integration guidance

Do not count guide views or repeated mini-cases as fresh scored evidence. Keep displayed recall familiarity separate from first-attempt unseen performance. Preserve coverage gaps and uncertainty, and do not turn this bank into a promise of passing. The questions deliberately distinguish conditional risk from averages, dates from totals, component attribution from finite trade impact, and accounting marks from economic risk.

The exact deliverable count is 68 MCQs, verified programmatically. Read counts from `investment-validation.json` during integration rather than manually transcribing them.
