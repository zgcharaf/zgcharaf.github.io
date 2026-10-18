# Operational Risk and Resilience enrichment audit

## Deliverable and scope

- Source: user-supplied 2024 Operational Risk and Resilience volume, 395 PDF pages. Substantive chapters run from PDF page 20 through 380; front matter and index are not learning content.
- 2026 alignment: all 24 current operational readings map to 2024 chapters 1–24 by title and principal topic. This is continuity of conceptual coverage, not a conclusion that every historical statement remains legally current.
- Output: `operational-enrichment.json` contains 24 chapter mappings, 24 guides, 72 original MCQs, 24 distinct worked mini-cases, 48 mechanism-based traps and 19 formula entries.
- MCQ dimensions: 24 understanding, 24 application, 24 critical. Correct positions: 18 each. IDs: xo001–xo072.
- New MCQs map to 62 distinct official objective IDs out of 99 ORR objectives. The remaining 37 have not acquired a new objective-specific question in this package. The app must keep those gaps visible rather than infer mastery from chapter membership.
- All questions and worked cases are original scenarios and explanations, not copies or numeric substitutions of end-of-chapter questions. Some principles necessarily reinforce concepts already represented by the existing bank.

## Actual review record

The PDF text was available by page. Review used the table of contents and chapter-opening objectives, then substantive explanatory paragraphs, cases, numerical examples, control tables and caveats in chunks. I did **not** perform a line-by-line editorial review of all 395 pages, inspect every diagram, or recompute every numerical example in the source. This package must not be described as that.

Detailed selected-text review included:

- Chapter 1: operational boundaries, heterogeneous/heavy-tailed losses, interconnected causes, resilience structure (PDF 21–31; emphasis 26–31).
- Chapter 2: committee documentation, board oversight, three lines, facilitation without ownership, actionable appetite and culture examples (40–49).
- Chapter 3: top-down/bottom-up identification, extreme-scenario construction and bias, taxonomy of events versus causes/resources, impacts and hierarchy (51–69; focused paragraphs 56, 58, 60, 64, 67–68).
- Chapter 4: collection dates and reporting gaps, RCSA/scales, overlapping KPI/KCI/KRI roles, causal factor/fault-tree examples, FAIR/bowtie, LDA distribution and truncation issues, resilience mapping (74–93).
- Chapter 5: control type table, automation changing the risk profile, optimistic controls, error categories, process redesign, project stages, BCM, insurance and reputational responses (97–110).
- Chapter 6: audience-specific reporting, ordinal aggregation/criticality, combined assurance, qualitative/quantitative reporting and historical disclosure requirements (114–128; particularly 125–128).
- Chapter 7: risk culture, appetite, regulatory/economic capital, aggregation caveats and stress-test taxonomy, conditional LDA and expert adjustment (134–145).
- Chapter 8: supervisory practices, CISO responsibility, workforce, response/recovery testing, information sharing and third-party dependencies (151–171, selected opening/closing paragraphs and embedded case headings).
- Chapter 9: security taxonomy, NIST/CIS/ISO context, technical and behavioral controls, Equifax causal weaknesses (172–178; substantial case excerpts).
- Chapter 10: risk-based CDD, beneficial ownership, monitoring, STR/freezing context, group sharing and cross-border legal constraints (181–192, selected paragraphs across the sections).
- Chapter 11: fraud/AML distinctions, control framework and USAA resource/remediation lessons (195–200, case excerpts).
- Chapters 12–14: outsourced service lifecycle, diligence, contracts and incentives; Capital One/shared responsibility; investor protection and routing/best-execution case (203–219, selected sections and case excerpts).
- Chapters 15–16: conceptual soundness, ongoing monitoring, outcomes analysis, sensitivity and prudent adjustments, independent influence, model inventory; Gaussian copula, Barclays export and Mars Orbiter interfaces (223–238, selected substantive excerpts).
- Chapter 17: historical exercise credibility and recapitalization, disclosure comparison, scenario coherence, loss/revenue and dynamic-balance-sheet challenges (242–250).
- Chapter 18: risk capital purposes, RAROC horizon, PIT/TTC context, adjusted RAROC, capital-allocation distinctions and implementation (257–267). PDF 264–265 read in full for formulas and allocation terminology.
- Chapter 19: governance/use, risk measurement, aggregation and dependence, validation limits, CCR and IRRBB annex concerns (270–308; focused selections 270–278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306).
- Chapter 20: all section range examined through selected openings/endings; substantive passages on risk identification, controls, governance, overlays, management actions, revenues and balance-sheet consistency (311–339, focused 313–324 and 329–338).
- Chapters 21–23: historical Basel I/II, conversion/weights, capital composition, buffers, liquidity/CoCos, reforms, output floor and historical implementation table (341–373, selected section and example extracts).
- Chapter 24: PDF 375–378 read in full; data annex headings/content inspected on 379–380. PDF 375 visually rendered and inspected to verify ILM exponent 0.8 and log grouping after the text extraction omitted the equation.

No separate bank of end-of-chapter practice questions was identified in the examined chapter structure. Embedded boxes, cases and numerical examples were reviewed selectively as described; no assertion that every source problem was independently solved is made.

## Independent and numerical checks

A separate content reviewer checked all 72 MCQs, including numerical keys. Four wording clarifications were applied:

1. xo003 now states that prerequisite restoration finishes **exactly** two hours after disruption, avoiding an inference from “within” two hours.
2. xo011 explicitly conditions independence on healthy common configuration.
3. xo020 explicitly assumes conditional i.i.d. severities independent of count.
4. xo047 refers to **impulse increments**, since pound-force seconds and newton seconds are impulse units.

All 14 machine-checkable numeric expressions were recomputed in Node. They agree with declared numeric values within supplied tolerance. Other multi-output numerical answers and all 24 worked mini-cases were manually recomputed.

103 TeX spans/formulas passed actual local KaTeX rendering with `throwOnError:true`, `strict:'error'`, `trust:false`; zero errors. No control-character corruption was found. Every guide formula has string `variables`, `assumptions` and `trap` fields; every worked case has string prompt/result/check and an array of steps.

Exact stem comparisons against the existing 624-item corpus found no duplicates. No guide worked prompt exactly matches any of the 72 bank question stems. Studying a guide therefore does not expose the exact bank mini-case or its numerical key, although it intentionally teaches the underlying concept.

## Dated regulation and framework audit

- **Basel I and II** exercises explicitly identify the historical framework and supply all CCFs, weights, minimums and BIA inclusion rules. They are educational computations, not current capital requirements.
- **Basel 2.5** VaR/stressed-VaR question supplies the two-maxima rule and excludes other charges. It is labeled historical.
- **Buffers and ratios** use an explicitly simplified calibration and omit other buffers by instruction; answers do not conclude that buffer use is automatic insolvency.
- **Output floor** factors are stated as exercise assumptions, with no transition cap unless specified. No claim that 72.5% is the universal applicable 2026 national factor is made. The 70% worked example is likewise an exercise assumption.
- **SMA/BIC/ILM** uses the chapter’s stated calibration and explicitly treats national overrides as relevant. Formula grouping was visually checked. Loss-data questions distinguish received recoveries from receivables and restoration from improvements, following the assigned historical framework.
- **Implementation timetable**: the 2017 dates reproduced in the 2024 book are not taught as definitive 2026 legal dates. A critical-thinking question explicitly tests this distinction.
- **Cyber frameworks**: no question tests the older five-function NIST formulation as the complete current framework or asserts that an old ISO edition remains latest. Guides refer to functions/concepts, not “latest” version numbers.
- **Outsourcing/AML/capital planning scope**: older national guidance and historical bank-size applicability thresholds are not presented as contemporary universal legal requirements.
- **Case facts**: examples focus on causal lessons rather than requiring fine amounts, headline victim counts or literal case wording. The hypothetical shared-cloud responsibility question is explicitly a hypothetical contract allocation, not an assertion about every real contract.

## Remaining limitations for the product

This is a source-informed original learning package, not official GARP questions, an exam replica, a prediction of pass probability, exhaustive 99-objective coverage, or a legal update service. Further source review can deepen uncovered objective subtopics (including detailed IRB formulas, Solvency II specifics, individual control taxonomies and the full set of capital-planning principles). Current national rule verification should be a separate sourced task before presenting implementation dates as current facts.
