# Market-risk enrichment audit

Date: 18 October 2026. Scope: the uploaded 2024 Market Risk Measurement and Management PDF, compared with the current 2026 inventory and full objectives already in the project.

## Deliverable

`market-enrichment.json` contains 16 chapter crosswalk records, 18 current-reading guides, 54 original MCQs, 54 active-recall prompts, 36 explicit trap/correction/check records, 18 worked examples and 32 formula records. Every current market reading has three new questions: understanding, application and critical reasoning. Application questions include independently recomputed numeric metadata. Numerical answers are derived from explicitly stated assumptions, not copied from the book. All question IDs are `xm001`–`xm054`.

The new items add different reasoning structures rather than merely changing numbers in existing items. Examples include inverse-density sample-size requirements, separating scenario weights from amplitudes, threshold stability, zero-exception two-sided rejection, rank-switch derivative kinks, randomized PITs, a calculated KS statistic, opposite-signed correlation exposure, comonotonic conditional default, a flawed joint-CDF simulation, PC risk after portfolio loadings, Itô conversion, and nested liquidity-horizon sets.

## Review performed and limits

The PDF has 229 pages. Its substantive material is PDF 14–223 (printed pages 1–210). All 16 chapters were chronologically indexed and reviewed through their section/equation passages; selected core explanations were read in full. End questions in chapter 7 (PDF137) and chapter 8 (PDF145) were read. The review included the full range of topics: loss conventions, quantile estimation, ES/spectral weights, estimator uncertainty and QQ plots; all weighted historical and filtered/bootstrap methods; EVT/POT/GEV and dependence; coverage/independence backtesting; mapping general/specific risk and derivatives; old trading-book literature, liquidity and systemic feedback; correlation basics, empirical correlation and copulas; regression/PCA; arbitrage trees, OAS and curve shape; drift/volatility rate models; smiles/surfaces; and the historical FRTB chapter.

This was a structured substantive review, **not a word-for-word proofread of every sentence, chart and bibliography entry**, and it does not claim complete full-text access to the current publisher chapters missing from the upload. The generated material is a first enrichment batch, not exhaustive testing of all market learning objectives and not an official exam bank.

Representative equation pages were rendered and visually inspected: PDF58 (POT quantile and ES) and PDF204 (Black–Karasinski). The images are research intermediates only and are not intended for publication.

## Edition crosswalk and missing current readings

- 2024 chapters 1–5 map to current MR-1–MR-5.
- Old chapter 6, academic trading-book literature, is supplementary; it is **not** the new MR-6 validation chapter or the new MR-7 PIT chapter.
- 2024 chapters 7–9 map to MR-8–MR-10; current page boundaries differ for the copula excerpt.
- 2024 chapters 10–12 underpin MR-11–MR-13 under changed current titles/editions.
- 2024 chapters 13–14 map to MR-14–MR-15. The Vasicek background contributes to MR-16, but the full current Gauss+ treatment is absent.
- 2024 chapters 15–16 underpin MR-17–MR-18. FRTB wording describes older proposals/versions and must not be treated as current implementation law.

For MR-6, MR-7 and MR-16, `bookRef.chapter` is null, `pdfPages` is empty, and `bookRef.note` explicitly discloses absence. Each guide/question has a `currentSource` field. Verified publisher pages are:

- Cambridge, David Lynch, *Validating Bank Holding Companies’ Value-at-Risk Models for Market Risk*: https://www.cambridge.org/core/books/abs/validation-of-risk-management-models-for-financial-institutions/validating-bank-holding-companies-valueatrisk-models-for-market-risk/AC740C16108EF1A7D3926F00BCFB8D70 . Publisher abstract verified; full chapter not accessed.
- Cambridge, Iercosan et al., *Beyond Exceedance-Based Backtesting...Probability Integral Transform*: https://www.cambridge.org/core/books/validation-of-risk-management-models-for-financial-institutions/beyond-exceedancebased-backtesting-of-valueatrisk-models-methods-for-backtesting-the-entire-forecasting-distribution-using-probability-integral-transform/6077935FB75663AF3242178AEDA75520 . Publisher metadata verified; full chapter not accessed.
- Wiley, Tuckman & Serrat, *The Vasicek and Gauss+ Models*, DOI10.1002/9781119835622.ch9: https://onlinelibrary.wiley.com/doi/10.1002/9781119835622.ch9 . Publisher summary verified; full current chapter not accessed.

The MR-16 numerical/cascade questions explicitly **supply the dynamics in the stem**. Their simplified equations are not asserted to be the complete canonical Gauss+ specification. The reusable guide visibly states that the current reading is needed.

## Source corrections and reasoning safeguards

1. PDF58/printed45 gives POT parameters threshold2%, scale0.8%, shape0.15 and threshold-exceedance probability4%. Its final 99.9% ES line appears to say17.578%. Independent substitution gives VaR approximately5.941534% and ES approximately7.578276%. We do not reproduce the apparent extra leading1. The new questions use independently generated scenarios and parameters.
2. PDF204/printed191 presents a Black–Karasinski level-to-log equivalence whose printed level drift is not a literal application of Itô as displayed. The guide uses the directly stated log-rate SDE and explicitly includes the half-variance correction when converting to level dynamics. No ambiguous level formula was copied.
3. The copula simulation discussion is clarified: draw a multivariate normal vector, transform each coordinate by the **univariate** normal CDF, then use each obligor’s inverse marginal default-time CDF. Evaluating the joint CDF once and feeding that scalar into every marginal inverse is not the correct Gaussian-copula construction.
4. No universal rule that higher correlation raises every portfolio’s risk: signed exposures are retained, with a long-short example.
5. PIT uniformity is conditioned on a continuous correct forecast distribution. Discrete atoms require randomization or a discrete-null test; independence is a separate condition.
6. Current implementation dates, legacy PLA ratios and proposal-specific thresholds are not restated as present regulatory law. Horizon questions supply their pedagogical formula and assumptions.
7. ES comparisons explicitly require finite ES when claiming a strict increase. Quantile conventions, simple/continuous rate units and probability orientation are stated.
8. Independent review corrected a substantive draft point: order-statistic VaR of continuous scenario losses is continuous at rank crossings, although its derivative can kink. xm018 now tests this precise distinction; it does not claim that switching ranks alone creates a jump in the value. The randomized-PIT example specifies its positive tail; the correlation worked example specifies unsigned underlying changes; implied-density notation defines the continuous maturity zero rate.

## Mechanical validation

- Reading IDs and local objective numbers validated against `/workspace/frm-objective-map.json` and current syllabus.
- 54 questions, exactly three per current market reading; each has all three learning dimensions represented.
- Four distinct choices and four choice explanations per question, one integer correct index.
- 18 numeric expressions executed in isolated Node contexts and compared with independent Python-computed values and the selected numeric option/tolerance.
- Every embedded mathematical span and every raw formula compiles with the app’s actual vendored KaTeX with `throwOnError:true`, `trust:false`.
- No control characters from accidental string escapes; no verbatim duplicates of existing app question stems.
- Answer explanations and distractor reasons were rechecked after final wording edits. Understanding items are conservatively graded level3 where appropriate rather than calling all conceptual items level5.

## Publication boundaries

Only the original derived JSON and this provenance audit are intended for application integration. Do not publish the uploaded PDF, extracted book text, page images or long excerpts. The 2026 syllabus remains the governing inventory; the 2024 books are supplementary conceptual sources.

Independent peer review also verified the numerical keys, identified the derivative-continuity correction, refined the level-regression economic assumption and the Gaussian-copula limit framing, and prompted different worked examples for MR-6, MR-14 and MR-16 to reduce direct disclosure of their conceptual MCQs. Final machine validation is recorded in `market-validation.json`.

A subsequent delimiter audit corrected an over-broad notation-cleanup substitution in xm008: its shape parameter and three choice expressions are now single, properly delimited xi formulas. Compile success alone cannot detect every nested-delimiter semantic error, so doubled/nested delimiters were checked separately.
