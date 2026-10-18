# Credit book enrichment audit

## Deliverable

`credit-enrichment.json` contains 23 chapter mappings, 23 reading guides, 69 original questions (three per current CR reading: understanding, application, critical), 45 annotated formula entries and 20 independently executable numerical checks. All questions use four distinct choices and four choice-specific French rationales. Original English stems are distinct from the existing bank. No book question, full solution, or PDF is redistributed.

## Source coverage and limits

Source: uploaded 2024 Credit Risk Measurement and Management compilation, 409 PDF pages. Teaching chapters occupy PDF pages 16–393; front matter and the trailing index are not learning chapters. The current credit syllabus has 23 readings corresponding to the 23 compiled chapters. I inspected the contents, chapter opening objectives, representative chapter-body and concluding excerpts, relevant worked-example/formula contexts, and the complete end-problem pages for chapters 9, 10 and 13 (PDF 134–135, 144–145, 182–183). Targeted extracted-page scans covered the collateral, clearing, exposure, CVA, waterfall and securitization-metric sections.

This was a structured content and equation audit, not a claim that every paragraph on all 378 teaching pages received a line-by-line expert review. It is also not official GARP validation or a substitute for the current assigned readings. Some broad excerpt batches were truncated by tool output, so the review does not count unseen remainder text as read. The deliverable therefore uses fully specified original scenarios and independently derives its answer keys instead of relying on OCR to reproduce book questions.

Representative formula pages were visually rendered and inspected: PDF 52 (standalone UL and Bernoulli variance), 154 (latent and default correlation), 255 (haircut and credit-support arithmetic), 313 (CVA discretization) and 386 (PSA, CPR and performance ratios). The extracted text loses some roots, subscripts and equation layout; the content uses independently written explicit LaTeX, checked with the app's actual KaTeX engine. For CVA the guides explicitly use a positive-charge convention; the book's signed adjustment convention differs.

## 2024–2026 mapping

- CR-1–CR-23 all have a corresponding 2024 chapter; no entire credit chapter is established as newly added or removed by this mapping.
- CR-4: the current syllabus specifies source pages 170–186, whereas the compiled book renumbers the corresponding extract as chapter 4, printed 33–42. The 2026 objective list takes precedence over source page numbering.
- CR-8: the compilation calls this chapter “Sovereign Default Risk.” The 2026 list cites the Damodaran Country Risk 2022 reading. Sovereign material maps, and current country-risk objectives are used explicitly; the broader country-risk assignment should be checked against the current assigned source rather than assumed identical from its title.
- CR-11: the 2026 assignment is limited to original sections 8.1–8.3; these appear under compilation chapter 11. Renumbering is not evidence that extra source sections are assigned.
- Historical market-size figures, regulatory phase-in calendars, Basel examples, accounting references and crisis narratives in a 2024 compilation are historical context. No generated item requires a candidate to treat a historical number as a current legal rule. Regulatory and accounting questions have supplied assumptions or test stable distinctions.

## Main additions beyond the existing bank

1. Contractual default without missed interest; supplier-prepayment exposure; amount/tenor delegation; business proximity versus reporting independence.
2. Twelve-month ECL as a window of possible defaults, connected-party aggregation, accounting write-off versus retained legal recovery rights.
3. Random LGD second moments, Euler contribution to portfolio UL, equal moments versus different tail capital, RWA changes after low-risk asset sales, and RAROC denominator artifacts.
4. Borrower/time leakage, within-grade composition shifts, mortgage payment resets despite stable LTV, and favorable-override selection bias.
5. Forward hazards from cumulative hazards, cheapest eligible delivery, Poisson-mixture variance, state valuations beyond transition frequencies, feasible default-correlation bounds and omitted sector factors.
6. Conditional copula sign conventions, TRS price-performance cash flows, base-tranche expected-loss monotonicity, and market-neutral hedges across distinct counterparties.
7. Negative close-out obligations, three-party cycle compression, same-currency payment netting, MTA trigger versus deductible, sequential haircuts and MPoR scaling limits.
8. CCP liquidity timing, legal ownership of surviving members' IM, fragmentation of netting sets, EE convexity, duration-weighted effective EPE, negative incremental CVA and fixed-spread recovery sensitivities.
9. Stress valuation double counting, own-credit valuation gains versus cash, two-period reserve conservation, linear pool EL versus nonlinear tranche EL, PSA seasoning cap and retained securitization risk.

## Validation

- Current reading IDs and objective indices checked against `/workspace/frm-objective-map.json`.
- Each current credit reading has exactly one item in each of the three dimensions.
- 20 numerical expressions recomputed in JavaScript; exact values and rounded selected-option values agree within explicit tolerances.
- 163 LaTeX spans/formula entries compile through the app's actual KaTeX engine with `throwOnError: true`, `trust: false`.
- Prerequisite graph is acyclic and all prerequisite IDs exist in the current credit syllabus.
- Answer-position counts: A 16, B 17, C 21, D 15; no answer is intentionally implied by position.
- Exact stem duplicates against the existing corpus: zero. Some recurring core concepts are deliberately revisited through different reasoning tasks, not simply changed numbers.

## Remaining content gaps

Three questions per reading create breadth and useful transfer cases, not exhaustive mastery of all 2026 learning objectives. Examples still needing more depth include full CDS premium/protection-leg bootstrapping with accrued premiums; simultaneous Merton asset/volatility inversion; multi-period rating migration valuation; complete synthetic CDO spread pricing; detailed securitization coverage tests; and current jurisdiction-specific collateral or capital rules. The roadmap should keep these as partial evidence, rather than certify an entire chapter mastered from its three new items.

## Independent peer review and diagnostic integrity

An independent reviewer recomputed 22 numerical or threshold-trigger keys directly from stems and options, and found no incorrect numerical key or substantive formula/sign issue. The peer review identified an exact worked-example overlap with xc035. The CR-12 worked case was replaced with an inverse-transform simulation of exponential default times from copula uniforms, a different mechanism from xc035’s conditional Gaussian threshold calculation. Its two simulated default times and three-year marginal-CDF cross-checks were independently recomputed. The diagnostic question remains unchanged.

Two precision fixes were applied: xc025 now attributes deliverable-bond price differences to market technicals rather than saying scarcity causes the lower price; the CR-23 note correctly calls SMM monthly and says multiplying by twelve only approximates annual CPR. Conceptual teaching guides necessarily discuss some mechanisms tested in diagnostics; no claim is made that conceptual exposure is absent. Exact worked-parameter/answer leakage into xc035 has been removed.
