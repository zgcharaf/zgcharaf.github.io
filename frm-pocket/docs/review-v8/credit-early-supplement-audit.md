# Early-credit objective supplement audit

## Exact requested scope

The current remaining-objectives.json snapshot contains **29**, rather than32, uncovered credit objectives in readingsCR1–11. The supplement contains exactly one original MCQ for each listed objective, IDs **yc001–yc029**. There are no extra inferred objectives and no claims that one item establishes mastery.

The source of exact learning-objective wording is frm-objective-map.json cross-checked with frm2026-objectives.txt. Topic/skill IDs use the existing credit skill registry. Each question includes four individually justified alternatives, an explicit objective, level and dimension, and verified source-book PDF pages.

## Book review performed

Reviewed the relevant sections in the supplied 2024 credit book via credit-pages.json, including:

- Chapter2 PDF27–33: origination, assessment, approval and the binding decision sequence.
- Chapter3 PDF37–47: lifecycle credit policy, facilities/off-balance-sheet review, allowances/provisions, vintage analysis and management capacity.
- Chapter4 PDF49–56: PD/EAD/LGD, expected loss, portfolio loss distribution/economic capital and limitations of one-year/default-only models.
- Chapter5 PDF62–67: horizon and parameter definitions, judgmental/empirical/financial model distinctions and the Merton setup.
- Chapter7 PDF85–90: retail-versus-corporate process differences, shared decision-rule risk, residual asset valuation and pooled/custom/generic model types.
- Chapter8 PDF106,114–118: sovereign default consequences, rating information limitations and cross-currency spread comparability. This uploaded chapter is Sovereign Default Risk, only a partial topic match to the broader 2026 Country Risk reading. The questions stay within the verified sovereign-measurement/default material; they do not claim to replace the broader assigned2026 reading.
- Chapter9 PDF121–123,129–133: rating philosophies and horizons, physical versus risk-neutral default estimates and empirical mapping of structural probabilities.
- Chapter11 PDF149–156: discrete default dependence effects, single-factor conditional default rates, joint-default integration and simulation.

Questions are authored scenarios and applications. They do not reproduce source practice problems or quote the books. Historical regulatory statements are avoided; the allowance question gives its accounting conventions explicitly.

## Independent numerical checks

Seven items carry numeric metadata. Actual stem calculations and correct options were verified separately from metadata:

- yc004: allowance8+3−4+1=8m under stated posting conventions.
- yc008:99.5% loss quantile40m, EL0.8m, EC39.2m, available30m, shortfall9.2m.
- yc010: state-conditioned EL0.8×0.01×10m×0.2+0.2×0.10×15m×0.6=EUR196000. The EUR86240 distractor is the product-of-unconditional-means error, from0.028×11m×0.28.
- yc013: cumulative PD1−0.98³=0.058808; EL50m×0.4×0.058808=1.17616m.
- yc015: physical Merton DD=(0.20+0.06−0.5×0.20²)/0.20=1.2; supplied normal CDF gives11.51% physical PD.
- yc026: independent zero-loss probability0.9604 and P(L≤10m)=0.9996, hence97% VaR10m. Comoving zero-loss probability0.98, hence97% VaR0m. Loss VaR falls10m even though the20m loss becomes more likely. This is a deliberate finite-quantile counterexample, not a general claim that dependence is beneficial. The question does not call negative quantile-minus-EL an economically desirable capital target.
- yc028: quadrature marginal PDs0.028 and0.046; joint PD0.00316; default correlation(0.00316−0.028×0.046)/sqrt(0.028×0.972×0.046×0.954)=0.0541677≈5.42%. The supplied two-node approximation is explicit, not asserted to be an exact Gaussian integral.

All numeric.expression fields evaluate within their tolerances. Strict KaTeX compiled all24 inline spans without errors. Exact requested-objective set equality,29 unique IDs, valid answer ranges and four-choice/four-rationale arrays passed. Answer positions are distributed7/8/8/6 across0/1/2/3.

Stem comparison against existing credit items (old corpus plus credit-enrichment69) found no textual match above0.50 SequenceMatcher ratio. Shared syllabus concepts remain intentional; scenarios include new timing, conditioning, capacity or probability distinctions rather than simply changing an older problem's numbers.

Difficulty labels are pedagogical judgments, not psychometric equivalence to official GARP items. Explicit per-objective coverage must remain separate from a readiness/mastery claim.
