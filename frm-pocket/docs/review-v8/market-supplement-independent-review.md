# Independent market supplement review

Reviewed all 18 supplemental stems, four choices and answer keys against the current objective map, and compared them with all 54 new market questions in `market-enrichment.json`.

No wrong answer key found. All ten numerical keys were independently rebuilt from the actual question assumptions rather than only executing stored check expressions. All 68 detected inline LaTeX expressions compile with the local pinned renderer.

| ID | Recomputed target | Additional checks |
|---|---:|---|
| ym002 | 3.75 | Eight exceptions is yellow under the explicitly given historical table; addition does not replace baseline. |
| ym003 | EUR25m at seven years | EUR75m at three years; PV100 and weighted maturity400 both preserved. |
| ym004 | EUR2.60m twist loss | Parallel loss EUR0.20m; both signed factor products create losses in the specified twist. |
| ym006 | 0.0016 independent senior loss | Common-state senior loss0.20; expected pool loss0.8 in both models. |
| ym007 | 50% reduction in remaining hedge-error variance | DV01 hedge32 squared bp versus regression hedge16; standard-deviation reduction29.289%, not50%. |
| ym008 | Risk-neutral expected change+11bp | Physical expected change+2bp; neither expectation is a certain realization. |
| ym010 | EUR1,671.931472 | Coupon resets at year1 but pays year2; use each year1 state's one-year discount factor before averaging and discounting at year0. |
| ym012 | Upper node3.5% | Lower node2.7%; drift10bp, innovation40bp, mean3.1%. |
| ym013 | SD80bp | Child rates3% and5%, upper probability0.2 produce mean3.4% and variance0.000064. Other proposed pairs fail at least one target. |
| ym018 | Strike121.275, displayed121.28 | Equality of the explicitly defined maturity-scaled log-forward coordinate requires squaring1.05. |

## Focused conceptual checks

- The CMT coupon uses its stated accrual and actual payment date, not the reset date. The benchmark K is a given contractual strike, not asserted to be par. Stated state CMT quotes and discount rates are sufficient for the single remaining coupon.
- A recombining Markov rate state can be insufficient for an accumulated-average payoff. Retaining history relevant to the payoff does not invalidate the underlying rate model.
- The given positive-mean-reversion Vasicek zero-yield volatility loading decreases with maturity. A common positive parameter pair cannot fit the specified50bp/two-year and70bp/ten-year ordering.
- Declining deterministic diffusion volatility without a state-dependent pull does not erase a short-rate level shock from subsequent conditional means.
- The smile/moneyness questions specify their coordinate and conventions. They do not incorrectly equate fixed forward moneyness with a fixed maturity-scaled coordinate, or require a smile's wings to be symmetric.
- All objective labels are within the current objective map and their targeted subskills fit those labels. They are examples of objective evidence, not claims that one question exhausts every clause of a broad objective.
- No exact duplicate or simple numeric reskin was found against the54new market questions. Related material is extended through a different task: CMT payment timing versus a fixed zero-coupon claim; remaining hedge-error variance versus hedge notional sizing; moment-matching a shared child node versus explaining Ho–Lee recombination; conditional shock persistence versus endpoint-moment equivalence.

## Requested wording correction

In ym007, replace “how much does residual variance fall” with “how much does the variance of the remaining hedged-position P&L fall” or “remaining hedge-error variance.” The stem has already defined epsilon as the structural regression residual, whose variance remains16 under both hedge choices. The intended50%answer is correct for total remaining hedge error32→16, but avoiding two meanings of “residual” makes it unambiguous. The author applied this wording correction, preserving the50%key, and notified the root. This reviewer did not edit the owner's file.

## Incidental issue outside supplement

While comparing the54market questions, xm008 appeared to contain a nested malformed inline expression around the GPD shape parameter. The author corrected the stem and all four choices to single-delimited explicit xi expressions, and reported no remaining doubled/nested delimiter candidates. This is separate from the18supplemental questions, all of whose detected LaTeX spans compiled.
