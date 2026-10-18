# Adaptive chapter roadmap — implementation and review

## What changes for the learner

Open **Plan → Roadmap** or `#roadmap` to explore every current reading. The next five priorities and the near-term time projection recompute from local evidence. Every chapter has diagnostics, targeted practice, critical-thinking cases, recall cards, a conceptual guide, traps, a worked problem, formula context and references to the supplied books where applicable.

The five 2024 books provide 93 chapter records. The roadmap follows the 107 readings and 591 locally numbered objectives in the 2026 inventory, including separately assigned Current Issues. Removed, moved, partial and absent old-edition material is labelled. The uploaded PDFs are never included in either deployment.

## Evidence model

Chapter indices remain distinct from the existing global readiness v1 /100. The global method, IDs, storage key, prior answers and score history are retained.

For each chapter, current first-attempt evidence is split into understanding (20%), application (35%) and critical reasoning (25%). Unknown dimensions contribute zero. Independently delayed recall contributes 20%, with a two-item sample target. The subtotal is multiplied by the fraction of six successful fresh answers available, capped at one. An incorrect additional answer cannot earn a quantity bonus. Legacy applied questions without a more specific dimension count as general application.

Evidence expires after 42 days and future records are excluded. Retrying an old question cannot rewrite the original first answer. A chapter is labelled for maintenance only with at least six fresh observations, each of the three dimensions, two delayed observations, an index of at least 80, and no unresolved errors. These are app study rules, not GARP thresholds or guarantees of full chapter mastery. Scores and sample sizes are shown together.

Reading declarations, subjective confidence, free-text explanations and card ratings do not contribute to performance. A low self-assessment, difficult card recall, confident wrong answer or mock-reported weakness can raise priority. Each recommendation explains its reasons; prerequisites are advisory and never lock a chapter.

## Learning sequence and scheduling

Adaptive sessions prioritize due mistakes, missing dimensions, unseen relevant cases and due maintenance while spreading work across domains. Diagnostics exclude all previously exposed questions and the reserved checkpoint bank. Critical-thinking sessions use explicitly tagged critical cases. Retry deadlines remain enforced.

The projection allocates 25-minute diagnostic/consolidation steps within the reading share of the selected budget. It explicitly reports readings without a distinct remaining slot. A step is not a promise of learning an entire new chapter. Four-hour mocks replace the ordinary day's reading tasks. Final light days recommend familiar chapters and maintenance, rather than opening new chapters. The full chapter inventory remains accessible.

Chapter snapshots begin from real observations on activation. No old chapter trend is invented. Imports validate IDs, dates, bounds and notes; the state remains part of the existing export. The same app origin preserves the user's phone progress.

## Content and mathematical review

The learning packs contain original questions and examples, not reproduced official problems. The complete chapter crosswalk and substantive sections/problem mechanisms were reviewed. This is not a claim that every paragraph, table cell or exercise on all 1,709 PDF pages received an independent line-by-line proofread. Exact source scope, selected page ranges, edition changes, inaccessible newer texts and corrections are recorded in [the review notes](review-v8/).

Authors and independent reviewers checked actual numerical stems and options, formula assumptions, conditional probabilities, signs, units, thresholds, chronology and plausibility. Peer review corrected conceptual VaR wording, ambiguous assumptions and worked examples that were too similar to diagnostic questions. Book arithmetic inconsistencies were checked rather than reproduced. Questions are not psychometrically calibrated against the real examination.

KaTeX remains local and offline. New equations include variables, assumptions and misuse warnings. All original bank fields and keys are preserved. Practice exposure controls and the separate 40-item checkpoint reserve remain intact.

## Verification

Run:

```bash
node tests/verify.cjs
node tests/roadmap.cjs
node tests/enrichment.cjs
node tests/content.cjs
node tests/math.cjs
node tests/offline.cjs
```

The behavioral suite simulates the DOM in Node. The mathematical suite uses the real pinned renderer, and the offline suite simulates cache installation, update isolation, navigation fallback and scope. Physical iPhone/Safari layout, gestures, installation and airplane mode were unavailable for verification and are not claimed.

Reviewed content inputs live in `content/`. `node scripts/build-enrichment.cjs` compiles the six packs and registers questions, chapter cards and formula records. Supplemental question files close specifically identified objective gaps. One linked practice case is partial evidence for a broad objective, not proof that all its clauses have been tested or mastered.
