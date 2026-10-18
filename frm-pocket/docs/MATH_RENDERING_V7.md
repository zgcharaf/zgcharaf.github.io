# Mathematical typography review — v7

## Scope

Local KaTeX 0.19.0 renders the question stems, shuffled answer choices, feedback, distractor analysis, flashcard faces, mistake explorer, assessment reviews, learning lessons, formula sheets and displayed personal notes. Formula sheets use display equations; notes have live mathematical previews. Text editors and original bank strings remain plain source text. Source IDs, option order, answer keys and readiness evidence are unchanged.

## Content and semantics

Ambiguous source expressions have exact full-field presentation overrides. Review covered fractions and operator precedence; Greeks and subscripts; time indices; joint and conditional probabilities; copulas; SDEs; discount factors; collateral exposure; capital and liquidity caps; attribution and portfolio models. Spaced thousands are a single numeric operand; numeric indices are subscripts. Unicode word boundaries and conservative implicit multiplication prevent accented prose and articles from becoming mathematical factors. Lambda times time remains a product, not an invented subscript.

KaTeX receives escaped text, explicit math delimiters, trust:false, bounded expansion, fresh macros, and HTML plus accessible MathML output. Invalid personal LaTeX falls back to escaped source. Currency symbols are not treated as single-dollar math delimiters.

## Offline and layout

Both renderer assets and presentation scripts are precached in frm-pocket-v7. All 20 WOFF2 font faces are embedded in the local CSS; package integrity and MIT license are retained. Equations have normal letter spacing, room for fractions and horizontal scrolling within their containers. Mobile questions and formula panels use dedicated font sizes. Existing local progress retains the same storage key and origin.

## Verification

- 13 typography checks, including all 22 display formulas, every curated explicit span and all 6,456 bank fields; zero invalid bank LaTeX renderings. 785 fields contain rendered mathematics.
- 92 application behavior checks, including choice shuffling, hidden assessment answers, progress import/export, scheduling and readiness.
- Independent content/numeric checks across 600 questions, plus offline install, cache migration, navigation fallback and sibling-site scope.
- Embedded font signatures and declared byte lengths checked for all 20 fonts.

DOM tests are simulated in Node. Physical iPhone/Safari installation, layout, gestures and airplane-mode testing were unavailable in this environment and are not claimed.
