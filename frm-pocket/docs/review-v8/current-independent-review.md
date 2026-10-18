# Independent current-issues review

Reviewed all 31 MCQ stems, choices, answer keys and explanations, the eight chapter guides, and the current CI objective map. No incorrect answer key found.

## Recheck after author corrections

The canonical `current-enrichment.json` was reread after the author applied corrections. No competing patch is needed.

Five worked examples now use different tasks from the diagnostic questions:

| Guide | Revised task | Independently recomputed result |
|---|---|---|
| CI-2 | Estimate missed cases using an explicitly random audit sample, then estimate recall | 16 estimated misses; 12/(12+16) = 42.857% estimated recall |
| CI-3 | Attribute changes in component funding costs with weights fixed | 0.8×(−1)+0.2×3 = −0.2 percentage points |
| CI-4 | Combine a price increase and a fall in realizable export volume | 100×1.20×0.75 = 90; revenue falls 10% |
| CI-5 | Offset higher reserve interest with repricing loan income on the central-bank balance sheet | 12×0.02−20×0.02 = −0.16 |
| CI-7 | Compute the financing cost of collateral immobilized to support future performance | 100×30×0.04×0.5 = 60 |

These remain learning examples on related objectives, as intended, but are no longer exact guide/diagnostic clones or merely renamed numbers. CI-2 appropriately describes recall as a point estimate with sampling uncertainty, not an exact count of all missed cases. CI-5 now measures central-bank net interest, which is distinct from the diagnostic's gross consolidated-public-sector reserve sensitivity. CI-7 adds the cost of commitment rather than repeating the initial-atomic-settlement qualification.

The reserve remuneration rate in xt017 is now explicit. Its additional cost remains 30×0.03 = 0.9 units. xt019 now includes high public debt, refinancing-cost sensitivity and fiscal pressure for broad rate cuts, improving its match to CI-5.3. The calibrated levels of xt010, xt017, xt025 and xt030 are now 4 rather than 5.

All 25 inline/formula LaTeX expressions detected in the revised canonical CI dataset compile with the local pinned KaTeX engine. Numerical rechecks above passed.

## Scope and reporting cautions

Objective mapping is not exhaustive coverage of every clause within broad learning objectives. For example, xt022 tests indirect crypto exposure, not all comparative regulatory approaches or every historical BCBS proposal; xt013 tests event-study identification, not all empirical findings about Ukraine and US–China trade tensions. Retain that distinction in coverage claims and readiness inference.

The assigned Banco de España paper was checked directly for the definition underlying xt029: physical PDF page 5 distinguishes attack-related cyber risk from non-attack ICT engineering disruptions, while noting their relationships. The question's distinction is supported. Original source: https://www.bde.es/f/webbde/GAP/Secciones/Publicaciones/InformesBoletinesRevistas/RevistaEstabilidadFinanciera/22/3_FSR43_Digital.pdf

No canonical content or app files were changed by this independent reviewer. The author applied fixes; the root remains the integration owner.
