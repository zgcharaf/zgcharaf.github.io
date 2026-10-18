# Current Issues enrichment audit — 2026 syllabus

## Deliverable

`current-enrichment.json`: 8 original chapter guides and 31 original multiple-choice questions, one per locally numbered learning objective for CI-1 through CI-8. Question IDs `xt001`–`xt031`; 9 understanding, 11 application, 11 critical. Each guide includes 3 principles, 3 recall prompts, 2 trap diagnostics, an original worked problem and prerequisites. Three mathematical formula records carry variables, assumptions and interpretation traps. Every question has four individually explained options and a precise 2026 objective mapping.

`chapters` is intentionally empty: these are separately assigned current-issues readings, not chapters from any of the five supplied 2024 core books. Guide-level provenance identifies the source instead of manufacturing uploaded-book page references.

## Sources actually accessed and limits

1. Official GARP required reading inventory: https://www.garp.org/frm/readings/required — reviewed the 2026 inventory listing all eight reading titles and direct source links. This was cross-checked against `/workspace/frm2026-objectives.txt` pp.58–60 and the site's `SYLLABUS` inventory.
2. CI-1: the assigned full chapter is IMF GFSR October 2024 ch.3, “Advances in Artificial Intelligence: Implications for Capital Market Activities.” GARP's eLibrary link https://www.elibrary.imf.org/display/book/9798400277573/CH003.xml returned 403; the canonical https://www.imf.org/-/media/files/publications/gfsr/2024/october/english/ch3.pdf returned 429. The chapter's own IMF author summary was successfully reviewed: https://www.imf.org/en/Blogs/Articles/2024/10/15/artificial-intelligence-can-make-markets-more-efficient-and-more-volatile (Abbas, Cohen, Grolleman and Mosk, 15 October 2024), especially normal-time price discovery versus stress liquidity, AI-enabled order speed, nonbank monitoring and supervisory dependencies. The new exercises are original applications of these concepts and the official objectives. **Do not claim the full CI-1 chapter was successfully read in this run.** The source URL in the JSON intentionally points to the primary author summary that was actually accessible.
3. CI-2: FSB 14 November 2024 full PDF, https://www.fsb.org/uploads/P14112024.pdf — reviewed executive summary, supply/demand factors, supervisory use cases, concentration and model/data/governance sections. No claim is made about present-day AI adoption statistics.
4. CI-3: BIS original assigned URL https://www.bis.org/publ/qtrpdf/r_qt2503b.pdf redirects to https://www.bis.org/publications/qr-202503/global-drivers-private-credit. Reviewed private-credit structure, cross-country regression design, demand-versus-supply box context, WACC counterfactuals and funding-cost decomposition. Hypothetical WACC numbers in the exercises are invented pedagogical assumptions, not BIS estimates. Fixed-effects identification cautions are original research-method applications.
5. CI-4: IMF GFSR April 2025 chapter 2, https://www.imf.org/-/media/files/publications/gfsr/2025/april/english/ch2.pdf — reviewed channel overview, equity and sovereign responses, sector differences, options/tail-risk discussion and financial-institution transmission. The malformed site title `", IMF (April 2025)."` should become **“Geopolitical Risks: Implications for Asset Prices and Financial Stability.”** The options question deliberately avoids treating a market price as the physical probability of a single event.
6. CI-5: BIS AER2023 chapter II https://www.bis.org/publications/aer-2023/monetary-fiscal-policy-safeguarding-stability-trust — reviewed policy interactions, the consolidated central-bank/treasury balance sheet in box A, the moving region of stability in box B, historical boundary shifts and policy implications. The reserve-interest arithmetic is an explicitly simplified original example.
7. CI-6: IMF September 2022 full note https://www.imf.org/-/media/files/publications/ftn063/2022/english/ftnea2022007.pdf — reviewed taxonomy, central service-provider roles, prudential direct/indirect exposure and Bali Fintech Agenda monitoring/capacity sections. Questions explicitly frame the reading's regulatory discussion as historical. No numerical claim is presented as current law.
8. CI-7: IMF January 2025 full note https://www.imf.org/-/media/files/publications/ftn063/2025/english/ftnea2025001.pdf — reviewed features and models in box1, immediate versus future counterparty obligations, externalities, market power and retail internalities. Exercise distinctions between common consensus and external data truth, and between simultaneous inception and future fulfilment, are original cases.
9. CI-8: Banco de España author PDF https://www.bde.es/f/webbde/GAP/Secciones/Publicaciones/InformesBoletinesRevistas/RevistaEstabilidadFinanciera/22/3_FSR43_Digital.pdf — reviewed CIA/ICT definitions, technology–financial interaction, queued-run effects, circuit-breaker discussion and cooperative arrangements. The official source identifies **Financial Stability Review 43, Autumn 2022**, by José Ramón Martínez Resano. The GARP objective list uses April2023 and its link points to SSRN; preserve the official 2026 syllabus mapping while noting this bibliographic difference. The content does not assert contemporary legal details about DORA.

## Content and validation discipline

- No source problems, book paragraphs or answer stems were copied. Scenarios, assumptions, explanations and distractor diagnoses are authored specifically for this app.
- Review is bounded to these eight 2026 readings and the listed sections. This is not a representation that all five 2024 books or all current legal developments were independently audited here.
- All worked numerical examples state their assumptions and are checked algebraically: WACC preservation 12.5%; sovereign spread change +50bp; consolidated reserve-rate cost +0.9; indirect collateral shortfall 3; cyber-restart cash shortfall3.
- Explicit math uses `\(...\)` and raw `tex` fields. Strict KaTeX check compiled 19 inline spans/formula records without errors.
- IDs, choices, answers, objective ranges, guide counts and dimensions were structurally checked. Original stems were compared against the existing corpus to detect close textual duplication; thematic overlap remains intentional but new cases introduce additional mechanisms, assumptions or counterfactual reasoning.
- Difficulty is pedagogical and not psychometrically calibrated. Do not advertise these as official GARP questions or as validated exam-equivalent difficulty.

## Suggested integration

- Integrate all31 items rather than only the minimum24; this provides an explicit additional item for every current-issues objective.
- Use prerequisites as recommendations, not hard gates; current-issues learning should remain accessible even if prerequisite evidence is missing.
- Keep CI-source provenance distinct from uploaded-book provenance and use the corrected CI-4 title.
- Guides deliberately emphasize mechanism checks, alternative explanations and boundary conditions rather than memorizing unstable numeric facts.

## Second editorial pass

All 31 questions were reviewed again for plausible finance-based distractors. Irrelevant alternatives were replaced with recognizable mistakes: exogenous replays versus endogenous market impact; fixed-effects versus causal identification; ledger agreement versus external-data validity; treasury-only versus consolidated interest exposure; average prices versus stressed depth; and technical restart versus funding confidence. Two stems were replaced to avoid closely repeating earlier classification/autonomy cases. Straight distinctions on fund maturity, buffers, stability boundaries, token classification, centralized ledgers and ICT triggers were calibrated to level3 rather than being labelled difficult by default. Remaining questions comprise 25 level4/5 and 6 level3 items. Difficulty labels remain author judgments pending actual performance evidence.

## Independent review of operational enrichment

Reviewed all numerical items in the completed 72-item operational set against their stated assumptions. All answer-key arithmetic is correct, including the 10.054% common-cause mixture, annual insurance cap, FX triangulation, discrete incremental capital, adjusted RAROC, stressed CET1 ratio, Basel historical mechanics and marginal BIC. Strict KaTeX compiled all110 operational inline/formula records without error.

Precision comments sent to the operational author (no operational-file edits made by this reviewer):

- xo003: “within2hours” does not imply exactly2hours; its worked explanation should not assert a guaranteed4hours without fixing the restoration time.
- xo011: state independence of failures **conditional on a healthy shared configuration** explicitly.
- xo020: add conditional iid severity and independence from the incident count for the compound-loss expectation.
- xo047: pound-force seconds and newton seconds are **impulse**, not force.

These are wording/assumption refinements rather than identified arithmetic-key errors.
