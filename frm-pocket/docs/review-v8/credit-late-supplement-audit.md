# Late credit objective supplement

The current remaining-objectives file lists **59** missing practice mappings for CR-12 through CR-23, rather than the 56 initially estimated. `credit-late-supplement.json` supplies one original MCQ for every one of those exact objective IDs, with IDs yc101–yc159. The official objective wording was read from `/workspace/frm-objective-map.json` before authoring. Each question has four distinct options, an integer key, four option-specific French rationales, a recall cue, a valid existing credit skill and a chapter/page-range reference to the previously inspected 2024 compilation. The existing 69 credit questions and their guides are unchanged.

The supplement emphasizes distinctions and applied reasoning rather than merely changing prior case numbers. Examples include survival-weighted CDS premium legs; a simulated synthetic-tranche fair spread; common-versus-client CCP relationships; clearing portability; loss versus liquidity layers; inverse collateral haircuts; state-pairing effects on netting; first-to-default bilateral close-out; posted-margin return exposure; alignment of stressed CVA dates; interest/principal account restrictions; dual coverage-test gates; and all-in funding comparisons across senior and junior tranches. Current regulatory claims are bounded by explicitly stated regimes or stable distinctions rather than recycled phase-in dates from the 2024 book.

Validation before integration:

- **59/59** expected exact objective IDs covered once, with no unexpected objective IDs.
- **16** numerical/threshold checks independently evaluated in JavaScript; values and selected-option values agree within stated tolerances. yc152 checks the released cash amount of zero when the stated coverage gate fails, rather than treating its 120% interest-coverage intermediate as the final answer.
- **43** explicit LaTeX spans compile with the actual application KaTeX engine using strict error throwing and no trusted markup.
- **Zero** exact question-stem matches with the original app corpus or the earlier 69-item credit enrichment.
- Answer positions balanced by rotating each choice and its rationale together: A 15, B 15, C 15, D 14.
- Estimated difficulty is identified as author judgment, not empirical exam calibration. Thirteen straightforward understanding items are level 3; thirteen application items level 4; thirty-three multi-step or assumption-sensitive items level 5.

A practice mapping establishes that an objective has at least one focused item; it does **not** establish full coverage of every clause in a compound objective, learner mastery, official GARP equivalence or predictive exam calibration. Mastery should still depend on fresh attempts, delayed retrieval, confidence and performance across several facets. The book-review scope and limitations in `credit-audit.md` continue to apply; this supplement does not extend that review into a claim of line-by-line verification of the entire book.

Independent review of all 59 stems/keys identified two specification gaps, corrected without changing answers: yc106 now explicitly uses risk-neutral expectations and year-end settlement of each year’s protection losses; yc151 states that at least EUR 6m of senior principal remains outstanding, making full principal-account application determinate. All 16 numerical checks and 43 LaTeX checks were rerun successfully afterward.
