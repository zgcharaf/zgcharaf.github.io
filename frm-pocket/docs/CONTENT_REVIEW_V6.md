# Content review — version 6

18 October 2026. Original practice, not official-exam calibration. Coverage means mapped practice, not mastery.


---

# FRM II Market/Credit expansion audit

Date: 18 October 2026. Questions authored originally for FRM Pocket; these are not official GARP examination items or psychometrically calibrated pass predictors.

## Deliverable

- 124 questions, IDs b001–b124, with English stems/options and French explanations, four option-specific rationales and a takeaway.
- Market: 54 questions across all 18 readings. Credit: 70 questions across all 23 readings.
- 124 distinct valid local objective identifiers; 123 were absent from the existing explicit mappings in checkpoints.js. The only previously mapped target is MR-18.2, retained to provide three questions for the three-objective MR-18 reading.
- 44 numerical cases: 19 Market, 25 Credit. Every JavaScript expression was evaluated; its exact computed value is stored, and the selected rounded numerical answer is within its stated tolerance.
- Raw answer keys are balanced: 31 each for A, B, C and D; option-specific explanations were permuted with their corresponding options.

## Checks completed

1. Exactly 124 sequential unique IDs; 124 distinct stems and objective IDs.
2. Each objective is within the ordered objective map in /workspace/frm-objective-map.json; reading metadata equals its objective prefix.
3. All 41 MR/CR readings represented; no repeated objective within this new bank.
4. Four distinct nonempty choices, four aligned nonempty rationales, one valid correct index, valid existing skill codes, and HTTPS source URLs.
5. Numeric expressions use explicit numbers and standard Math operations only; all 44 checks pass. All numeric selected options were inspected for sign, percentage units and rounding.
6. Conceptual review tightened misleading and weak distractors, specified assumptions for specialized calculations, and separated probability measures, exposure measures and stress-level versus incremental-loss conventions.
7. No question text or answer was copied from an official exam. Existing exam/challenge/checkpoint mappings were reviewed to prioritize gaps.

## Important numeric conventions

- b001: the exact lognormal loss is 0.9014527193744226 million; the displayed answer is EUR 0.901m. An initial intermediate estimate was corrected during audit.
- b034: the exact hedge ratio is 2/3; displayed hedge and cash are rounded to four decimal places, with an explicit approximation question and tolerance.
- Two-output answers (PIT/complement, AR mean/autocorrelation, Vasicek rate/half-life, Gauss+ short/medium drift, reserve/equity) have one machine expression for the designated scalar; the second output was checked from the stated formulas and explained in the worked solution.
- b053 is explicitly an isolated-factor, square-root-time simplification, not the complete nested FRTB aggregation.
- b064 compares discounted net recoveries; b116–b117 explicitly define the loss as stress minus baseline.
- b113 holds default probability fixed when changing recovery, avoiding an unintended recalibration of hazard from a fixed market spread.

## Source scope

Most source links identify the official GARP learning-objective location; they do not claim that GARP wrote or validated these items. Additional official primary sources reviewed for specialized or standards-related context:

- Wiley/Tuckman & Serrat, Chapter 9, The Vasicek and Gauss+ Models: https://onlinelibrary.wiley.com/doi/10.1002/9781119835622.ch9
- BIS market-risk framework and MAR32/MAR33: https://www.bis.org/committees/bcbs/basel-framework/standard/mar
- BIS Principles for financial market infrastructures: https://www.bis.org/cpmi/publ/d101a.pdf
- IFRS Foundation IFRS 9: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/
- BIS 2025 credit-risk management principles were also checked as governance context: https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/cri/10

## Reading/objective allocation

| Reading | Questions | Objective suffixes |
|---|---:|---|
| MR-1 | 3 | 2, 5, 6 |
| MR-2 | 3 | 1, 2, 4 |
| MR-3 | 3 | 1, 3, 6 |
| MR-4 | 3 | 1, 2, 4 |
| MR-5 | 3 | 2, 3, 6 |
| MR-6 | 3 | 1, 2, 3 |
| MR-7 | 3 | 1, 2, 4 |
| MR-8 | 3 | 3, 4, 7 |
| MR-9 | 3 | 1, 2, 3 |
| MR-10 | 3 | 1, 2, 3 |
| MR-11 | 3 | 1, 6, 7 |
| MR-12 | 3 | 2, 6, 9 |
| MR-13 | 3 | 1, 2, 4 |
| MR-14 | 3 | 2, 5, 7 |
| MR-15 | 3 | 2, 4, 5 |
| MR-16 | 3 | 1, 2, 3 |
| MR-17 | 3 | 3, 4, 9 |
| MR-18 | 3 | 1, 2, 3 |
| CR-1 | 4 | 1, 2, 3, 5 |
| CR-2 | 3 | 1, 3, 5 |
| CR-3 | 3 | 4, 7, 8 |
| CR-4 | 3 | 4, 5, 6 |
| CR-5 | 3 | 1, 3, 7 |
| CR-6 | 3 | 1, 2, 4 |
| CR-7 | 3 | 3, 6, 8 |
| CR-8 | 3 | 1, 3, 7 |
| CR-9 | 3 | 2, 4, 6 |
| CR-10 | 3 | 1, 5, 6 |
| CR-11 | 3 | 1, 2, 5 |
| CR-12 | 3 | 1, 4, 5 |
| CR-13 | 3 | 4, 5, 7 |
| CR-14 | 3 | 3, 8, 9 |
| CR-15 | 3 | 1, 5, 8 |
| CR-16 | 3 | 2, 4, 5 |
| CR-17 | 3 | 4, 6, 9 |
| CR-18 | 3 | 2, 6, 9 |
| CR-19 | 3 | 4, 5, 7 |
| CR-20 | 3 | 4, 7, 9 |
| CR-21 | 3 | 4, 6, 8 |
| CR-22 | 3 | 4, 5, 6 |
| CR-23 | 3 | 3, 7, 8 |

## Remaining limitations

This expansion gives breadth at every Market/Credit reading and evidence at 124 specific objectives. It does not cover every objective within those readings, and one correctly answered item cannot establish mastery of an objective. Broader scenario variation, independent timed mocks and delayed reattempt evidence remain necessary. Specialized Gauss+ dynamics are stated within the numerical question so that the answer does not depend on an unstated parameterization. No empirical item-difficulty or discrimination calibration is claimed.


---

# FRM II operational and liquidity coverage bank — audit

124 new original application questions: **72 operational and 52 liquidity**, IDs **b125–b248**. All cases were authored for this bank, not copied from GARP curriculum, mocks or examination material. They are uncalibrated practice questions, not an official or predictive mock.

**Coverage:** every ORR reading 1–24 and every LTR reading 1–17 appears, totaling **41 readings and 119 distinct objective identifiers**. Objective numbers refer to the ordered local 2026 objective inventory, not official GARP-assigned sub-identifiers. The additional liquidity-ratio case b248 intentionally maps to **ORR-22.6**.

Of the 119 objective IDs, 105 are not explicitly present in the three supplied existing question modules. This text comparison does not establish that no other app module already maps them.

## Review checks

- 124 unique IDs and stems; exact topic counts and contiguous ID range checked.
- Four distinct options and four aligned French rationales for every item; answer positions balanced at 31 each.
- All objective IDs exist in the corrected objective inventory; reading/target semantics manually checked against that inventory.
- 22 numeric cases were evaluated in JavaScript and independently recomputed with Python Decimal arithmetic. Selected numeric option text agrees with optionValue. No expressions depend on external variables.
- Numeric rules, caps, timing and simplifying assumptions appear in the stems; historical Basel I is explicitly historical and the output-floor factor is an exercise assumption.
- Current-law claims are avoided in historical syllabus topics. Model governance cases use current primary Fed guidance as further reading; their principles also match the prescribed course themes.
- Primary-source URLs cover BIS standards, Fed model/capital/third-party guidance, OCC enforcement, FTC breach lessons, ESMA investor protection and EIOPA insurer solvency. A source provides topic context and does not endorse an authored question.

## Limits and review gaps

- Mapping an item to an objective does not prove complete mastery of the full objective, especially multi-part objectives.
- Case-study objective items are original transfer applications of a lesson. They do not reproduce the complete prescribed Equifax, USAA, third-party, investor-protection or three-model-case narratives. Read the assigned cases as well.
- The questions emphasize application and discrimination, but have not been calibrated using candidate performance or psychometric item analysis.
- Five objectives have two distinct cases because several ORR readings have only two objectives; duplicate objectives are listed below. No question is a verbatim duplicate of another new item.

## Repeated targets

- ORR-9.1: b149, b151
- ORR-11.1: b155, b157
- ORR-13.1: b161, b163
- ORR-14.1: b164, b166
- ORR-20.2: b183, b184

## Reading coverage

| Reading | Objectives targeted | Items |
|---|---|---:|
| ORR-1 | ORR-1.1, ORR-1.2, ORR-1.3 | 3 |
| ORR-2 | ORR-2.1, ORR-2.2, ORR-2.4 | 3 |
| ORR-3 | ORR-3.1, ORR-3.2, ORR-3.4 | 3 |
| ORR-4 | ORR-4.1, ORR-4.3, ORR-4.5 | 3 |
| ORR-5 | ORR-5.2, ORR-5.3, ORR-5.5 | 3 |
| ORR-6 | ORR-6.1, ORR-6.2, ORR-6.3 | 3 |
| ORR-7 | ORR-7.1, ORR-7.2, ORR-7.4 | 3 |
| ORR-8 | ORR-8.2, ORR-8.3, ORR-8.4 | 3 |
| ORR-9 | ORR-9.1, ORR-9.2 | 3 |
| ORR-10 | ORR-10.1, ORR-10.2, ORR-10.3 | 3 |
| ORR-11 | ORR-11.1, ORR-11.2 | 3 |
| ORR-12 | ORR-12.1, ORR-12.2, ORR-12.3 | 3 |
| ORR-13 | ORR-13.1, ORR-13.2 | 3 |
| ORR-14 | ORR-14.1, ORR-14.2 | 3 |
| ORR-15 | ORR-15.1, ORR-15.3, ORR-15.4 | 3 |
| ORR-16 | ORR-16.1, ORR-16.2, ORR-16.3 | 3 |
| ORR-17 | ORR-17.1, ORR-17.2, ORR-17.3 | 3 |
| ORR-18 | ORR-18.3, ORR-18.5, ORR-18.7 | 3 |
| ORR-19 | ORR-19.1, ORR-19.3, ORR-19.4 | 3 |
| ORR-20 | ORR-20.1, ORR-20.2 | 3 |
| ORR-21 | ORR-21.2, ORR-21.4, ORR-21.8 | 3 |
| ORR-22 | ORR-22.4, ORR-22.5, ORR-22.7, ORR-22.6 | 4 |
| ORR-23 | ORR-23.1, ORR-23.2, ORR-23.3 | 3 |
| ORR-24 | ORR-24.1, ORR-24.2, ORR-24.3 | 3 |
| LTR-1 | LTR-1.1, LTR-1.2, LTR-1.4 | 3 |
| LTR-2 | LTR-2.2, LTR-2.4, LTR-2.7 | 3 |
| LTR-3 | LTR-3.1, LTR-3.2, LTR-3.3 | 3 |
| LTR-4 | LTR-4.1, LTR-4.2, LTR-4.3 | 3 |
| LTR-5 | LTR-5.1, LTR-5.2, LTR-5.3 | 3 |
| LTR-6 | LTR-6.1, LTR-6.2, LTR-6.3 | 3 |
| LTR-7 | LTR-7.1, LTR-7.2, LTR-7.4 | 3 |
| LTR-8 | LTR-8.1, LTR-8.2, LTR-8.3 | 3 |
| LTR-9 | LTR-9.1, LTR-9.2, LTR-9.3 | 3 |
| LTR-10 | LTR-10.1, LTR-10.2, LTR-10.3 | 3 |
| LTR-11 | LTR-11.1, LTR-11.2, LTR-11.3 | 3 |
| LTR-12 | LTR-12.1, LTR-12.2, LTR-12.4 | 3 |
| LTR-13 | LTR-13.1, LTR-13.5, LTR-13.7 | 3 |
| LTR-14 | LTR-14.1, LTR-14.3, LTR-14.4 | 3 |
| LTR-15 | LTR-15.1, LTR-15.2, LTR-15.3 | 3 |
| LTR-16 | LTR-16.1, LTR-16.2, LTR-16.3 | 3 |
| LTR-17 | LTR-17.2, LTR-17.3, LTR-17.4 | 3 |

## Independent arithmetic results

| Item | Exact/recomputed result | Selected option |
|---|---:|---|
| b136 | 4.9400 | 4.94% |
| b176 | 15 | 15% |
| b177 | 1.80 | EUR 1.8m |
| b183 | 10 | 10% |
| b185 | 10.400 | EUR 10.4m |
| b193 | 145.000 | 145 |
| b194 | 920.00 | EUR 920m |
| b197 | 0.700 | EUR 0.70m |
| b201 | 12 | 12x |
| b209 | -2 | EUR -2m |
| b211 | 28.5 | EUR 28.5m |
| b214 | 12 | EUR 12m |
| b217 | 1 | EUR 1m |
| b222 | 37.0 | EUR 37m |
| b231 | 20 | EUR 20m |
| b232 | 2.60 | 2.6% |
| b233 | 9.8294 | EUR 9.8294m |
| b235 | 50000.000 | EUR 50,000 |
| b238 | 0.6000 | EUR 0.60m |
| b245 | -0.30 | EUR -0.30m |
| b246 | -4.0 | EUR -4.0m |
| b248 | 3E+2 | 300% |

## Final reviewer corrections

- b214 wording corrected to individual sequential cash flows, not cumulative flows. The cumulative trough is EUR -12m, requiring EUR 12m opening funds. Its gross-outflow distractor is corrected to EUR 15m.
- Distractors strengthened in b125, b127, b140, b158, b178, b204, b239 and b244 to replace conspicuous absolute or irrelevant alternatives with more plausible conceptual errors. Answer indices and numeric keys unchanged.
- b233 distractor explanation now identifies the wrong 36-day interest interval explicitly.
- Cases vary in difficulty; coverage tier does not claim that every item is a hard or examination-calibrated question.


---

# FRM II Investment and Current Issues expansion audit

Original authored bank: **124 MCQs, b249–b372**. Investment84; Current Issues40. English applied stems and options; French worked explanation, four option-specific rationales, and cue for every question. No questions copied from GARP or commercial banks.

## Coverage

| Reading | New MCQs | Distinct primary objective IDs |
|---|---:|---:|
| IM-1 | 6 | 6 |
| IM-2 | 5 | 5 |
| IM-3 | 9 | 9 |
| IM-4 | 9 | 9 |
| IM-5 | 4 | 4 |
| IM-6 | 7 | 7 |
| IM-7 | 5 | 5 |
| IM-8 | 4 | 4 |
| IM-9 | 4 | 4 |
| IM-10 | 4 | 4 |
| IM-11 | 5 | 5 |
| IM-12 | 7 | 7 |
| IM-13 | 3 | 3 |
| IM-14 | 2 | 2 |
| IM-15 | 2 | 2 |
| IM-16 | 4 | 4 |
| IM-17 | 4 | 4 |
| CI-1 | 5 | 4 |
| CI-2 | 5 | 3 |
| CI-3 | 5 | 3 |
| CI-4 | 7 | 6 |
| CI-5 | 4 | 3 |
| CI-6 | 5 | 4 |
| CI-7 | 6 | 5 |
| CI-8 | 3 | 3 |

Investment has84 new distinct primary objective mappings. These are exactly the84 previously unmapped objectives in the local 2026 map; combined with12 existing mapped IM objectives, all96 IM objectives have at least one mapped question. Current Issues covers all31 local CI objectives through40 questions, including new applied variants for AI, private credit, geopolitical pricing, fiscal-monetary interaction, crypto intermediation, tokenization and digital resilience. The combined124-question file maps115 distinct objectives across all25 requested readings.

A mapped MCQ is evidence of a tested subskill; it does not establish complete mastery of every clause of a broad objective. New material remains distinct from the reserved40 checkpoint items; readiness should separate fresh first attempts from repeats.

## Verification

- Exact sequential unique IDs b249–b372;84 Investment and40 Current Issues.
- Every primary objective exists in the ordered2026 local map and matches its reading and topic. Semantic alignment was reviewed question by question.
- Four distinct options and four corresponding specific French rationales per question; correct-answer positions balanced31/31/31/31.
-22 numerical questions independently recomputed in Node using only standard arithmetic and Math; selected numeric option equals optionValue and falls within the stated tolerance. No conceptual judgment is disguised as numerical validation.
- All124 normalized stems checked against the228 existing questions: no verbatim/normalized duplicate stems. Existing skill IDs and topic assignments validated.
- Mixed difficulty metadata: straightforward applied coverage items level3; integrated model, governance, nonlinear or inference cases level4. Difficulty labels are editorial, not empirically calibrated.
- Reviewer fixes incorporated: b278 explicitly zero-mean jointly normal P&Ls for VaR aggregation; b282 equal weights with unequal volatilities imply unequal risk contributions, with covariance affecting their magnitudes.
- b250 distractor rationale corrected:15.6% incorrectly uses total market return inside beta before adding rf.

## Primary references and source scope

Investment metadata uses the official [GARP2026 learning-objectives landing page](https://www.garp.org/landing/frm-learning-objectives). Mathematical calculations use supplied hypothetical data, not claims about actual realized returns. Additional direct institutional sources are assigned in JSON to relevant readings: CFA Institute portfolio construction/performance evaluation/manager selection/private structures/alternative allocation; IMF2024 private credit chapter; SEC Inspector General Madoff report. These support relevant principles, not an assertion that the authored MCQs are official GARP material.

Current Issues sources were verified against the exact eight assigned reading titles, not substituted with current news:

1. CI-1: IMF October2024 GFSR, Chapter3, *Advances in Artificial Intelligence: Implications for Capital Market Activities*: https://www.imf.org/en/Publications/GFSR/Issues/2024/10/22/global-financial-stability-report-october-2024
2. CI-2: FSB14November2024, *The Financial Stability Implications of Artificial Intelligence*: https://www.fsb.org/2024/11/the-financial-stability-implications-of-artificial-intelligence/
3. CI-3: BIS, *The Global Drivers of Private Credit*: https://www.bis.org/publ/qtrpdf/r_qt2503b.htm
4. CI-4: IMF April2025 GFSR, Chapter2: https://www.imf.org/en/Publications/GFSR/Issues/2025/04/22/global-financial-stability-report-april-2025
5. CI-5: BIS Annual Economic Report2023, ChapterII, *Monetary and Fiscal Policy: Safeguarding Stability and Trust*: https://www.bis.org/publ/arpdf/ar2023e2.htm
6. CI-6: IMF26September2022, *Regulating the Crypto Ecosystem: The Case of Unbacked Crypto Assets*: https://www.imf.org/en/Publications/fintech-notes/Issues/2022/09/26/Regulating-the-Crypto-Ecosystem-The-Case-of-Unbacked-Crypto-Assets-523715
7. CI-7: IMF29January2025, *Tokenization and Financial Market Inefficiencies*: https://www.imf.org/en/Publications/fintech-notes/Issues/2025/01/29/Tokenization-and-Financial-Market-Inefficiencies-561256
8. CI-8: Banco de España, *Digital Resilience and Financial Stability: The Quest for Policy Tools in the Financial Sector*: https://www.bde.es/f/webbde/GAP/Secciones/Publicaciones/InformesBoletinesRevistas/RevistaEstabilidadFinanciera/22/3_FSR43_Digital.pdf

Bibliography discrepancy: the local GARP2026 source labels CI-3 February2025 while BIS publication is March2025 Quarterly Review. The local source labels CI-8 April2023, whereas the official linked paper itself is Financial Stability Review43, Autumn2022. The matching assigned titles/content are used. These are source-date discrepancies, not replacement readings. CI-6 questions explicitly discuss the assigned2022 note or hypothetical rules, not present-day legal requirements.

## Limits and next evaluation

One primary question per previously unmapped IM objective is minimum coverage, not exam calibration. Many multi-part objectives need further variants. No pass probability or official exam fidelity claim is supported by the bank alone. Fresh timed mocks and official GARP practice remain necessary external checks.


---

# Independent FRM coverage-bank review — final

18 October 2026. Reviewed all **372 new question stems, keyed options and explanations** in the three final frm6 JSON files (124 each), with objective associations compared against the local objective map. This is a bounded content review, not external validation of exam representativeness or question calibration.

## Checks

- All 88 numeric expressions recomputed; strict expression/value difference ≤1e-8 and selected numeric option within the authored rounding tolerance.
- Independently transcribed numerical calculations from the stems (rather than merely executing the supplied expression) were checked for the initial 84 and four Current Issues numerical cases. No incorrect final keyed numeric option found.
- Final revisions to b001, b002, b034, b214, b278 and b282 reread, including final correct-option rationale.
- Final twenty Current Issues rows b353–b372 reviewed after author completion. No additional substantive defect identified.

## Findings resolved

- **b001:** Root found inaccurate exact-value metadata hidden by the option-rounding tolerance. Correct exact result is 0.9014527193744226. Final choice and explanation now round to EUR 0.901m. Strict exact-value check now passes.
- **b214:** “Sequential cumulative settlement flows” contradicted the running-balance solution. Final stem says “Sequential individual settlement cash flows”; required opening liquidity EUR 12m is correct.
- **b278:** Normal standalone-VaR covariance aggregation needed zero-mean P&Ls (or an unexpected-loss definition). Final stem explicitly states zero means and jointly normal P&Ls.
- **b282:** With two equal capital weights and volatilities differing by a factor of three, equal risk contributions are ruled out regardless of covariance. Final keyed option and explanation now state this accurately and retain covariance as a determinant of magnitudes.

## Interpretation limits

The new material should be described as applied **coverage** practice. Many distractors contain clearly implausible categorical claims (“always”, “never”, “guarantees”), so this bank should not be marketed as uniformly hard or calibrated to GARP exam difficulty. A question commonly covers only a subset of a broad objective: for example b027 rejects an unbounded normal correlation model but does not identify the actual best-fit distribution required by the wider MR-9.3 objective; b194 tests BIC×ILM multiplication but not all BI/BIC/loss-component mechanics in ORR-24.1. “Mapped/practiced” is justified; a single mapped success is not full-objective mastery.

No actual exam questions were used or reproduced. No passing probability, full syllabus mastery, or pass guarantee is certified by this review.


---


Integration checks: all600IDs/stems unique;372newcases;107readings;412mappedobjectives of591;88new numeric results and selected options checked. Root expanded the short wrong-choice rationales in b070/b114; no answer keys changed. See tests/content.cjs for reproducible structural and arithmetic checks.
