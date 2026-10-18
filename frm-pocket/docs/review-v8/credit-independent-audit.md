# Independent credit-content audit

Reviewed credit-enrichment.json:69 MCQs and23 guides. Independently checked22 numerical/transfer-trigger responses directly from their stems and selected options, rather than relying on expression metadata. All numerical keys checked are correct. Strict KaTeX compiled163 inline spans/formula records without error.

## Concrete changes requested from author

1. **Exact diagnostic duplication:** GuideCR12 worked problem and xc035 both use rho0.36, factor−2, threshold−2 and yield conditional PD15.87%. Requested a contrasting worked example so the guide does not disclose exactly the same numeric diagnostic.
2. xc025 attributes the cheaper22%-price deliverable bond to “technical scarcity.” Scarcity usually raises the price of the scarce bond; use neutral “market technicals” or specify the scarce alternative. This does not alter the cheapest-to-deliver answer.
3. GuideCR23 check calls SMM annual. SMM is monthly; multiplying monthly SMM by12 only approximates annual CPR.

Lesser conceptual-overlap notes: GuideCR2 repeats the same5-year/8-year delegated-tenor disqualification as xc004, with different amounts. GuideCR8 repeats the same commodity-tax versus diversified-tax comparison as xc023. Those are not mathematical errors, but should not be treated as independent unseen evidence after the worked lesson.

## Scope checked

- Bernoulli loss with conditional random LGD; Euler UL contribution; capital-ratio denominator changes.
- Average versus forward hazards; conditional versus unconditional PD; default-correlation bounds with unequal PDs.
- Structural versus pricing/forecasting measure, Gaussian low-threshold sign, random-intensity mean and variance.
- TRS receiver financing sign; CDS physical-delivery choice; credit exposure with market-neutral trades but distinct legal counterparties.
- Enforceable negative close-out amounts; three-edge cycle compression; cross-currency payment-netting limits.
- MTA as trigger, sequential contractual security/FX haircuts, square-root MPoR approximation domain.
- CCP liquidity timing, nondefaulting segregated IM and cross-product fragmentation.
- EE nonlinear truncation, duration-weighted effective EPE, incremental CVA sign, LGD dependence, spread-fixed recovery recalibration and valuation bridge against double-counting.
- Expected pool loss versus dependence, two-period reserve cash conservation, below-attachment tranche loss, PSA ramp/cap and SMM conversion.
- Guide formula conventions and assumptions for Merton DD, CVA, upfront buyer sign, tranche and reserve waterfall.

No substantive mathematical key error was found within this examined scope. The conditional-PD, wrong-way and survival/CVA formulas use consistent signs and units under their stated assumptions. Formula validity is not evidence that difficulty has been psychometrically calibrated.

## Independently recomputed values

|Item|Result|
|---|---|
|xc002|1.68m loss|
|xc008|4m excess|
|xc010|SD1.9595918m|
|xc011|Euler contribution4.3105272m|
|xc014|capital ratio10.3448276%|
|xc020|LTV60%; PTI26%→42%|
|xc026|forward hazard2.8%|
|xc029|mean4, variance13|
|xc032|max default correlation0.2474358|
|xc035|conditional PD15.87%|
|xc038|receiver pays1.25m|
|xc041|loss11.2m|
|xc047|gross compression150|
|xc049|call620000|
|xc050|unsecured2.2168m|
|xc053|cash shortfall55m|
|xc055|expected value0; EE4m|
|xc056|effective EPE5m|
|xc059|incremental CVA−0.7m|
|xc062|B−A stressed EL0.30m|
|xc065|equity distribution0.5m|
|xc068|CPR10.5%|

Revisions belong to the credit author; this reviewer did not edit the credit dataset.
