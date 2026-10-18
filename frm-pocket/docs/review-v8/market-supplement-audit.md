# Market objective supplement audit

Scope: one new original MCQ for each of the18market objectives listed in `remaining-objectives.json`. This closes minimum practice mapping only; it does not establish mastery, complete question coverage within a learning objective, or exam readiness.

IDs `ym001`–`ym018` map respectively to MR-3.2, MR-4.6, MR-5.4, MR-5.5, MR-8.1, MR-8.2, MR-11.2, MR-12.4, MR-12.7, MR-12.8, MR-12.10, MR-14.1, MR-14.6, MR-14.8, MR-15.1, MR-17.1, MR-17.5 and MR-17.6. Each JSON item also carries the exact full objective wording from the2026objective map.

All these concepts have corresponding material in the uploaded2024Market book; each item identifies its chapter and PDF page range. The source material was used conceptually. No original end-of-chapter question was copied. The historical Basel question explicitly supplies and versions the traffic-light framework; it does not assert a current jurisdiction’s regulatory implementation. The CMT question supplies its reset/payment dates, risk-neutral probability, CMT quotes and state short rates. Questions using simplified mapping or moment-matching rules state the constraints being preserved rather than pretending they preserve every risk.

## Independent arithmetic, reconstructed from stems

- ym002: baseline3 plus historical addition0.75 gives total multiplier3.75, in yellow zone for8exceptions under the given table.
- ym003: solve x+y=100 and3x+7y=400: three-yearPV75, seven-yearPV25.
- ym004: parallel loss(60000−40000)×10=200000; twist loss60000×30+(−40000)×(−20)=2600000.
- ym006: unchanged expected pool loss4×0.2=0.8; senior expected loss equals probability all4default,0.2^4=0.0016 under independence versus0.20 under the common-state construction.
- ym007: DV01-neutral variance(0.6−1)^2×100+16=32; regression-hedge variance16; relative reduction50%, whereas standard-deviation reduction is approximately29.3%.
- ym008: physical expected rate change0.4×20+0.6×(−10)=2bp; pricing-measure expected change0.7×20+0.3×(−10)=11bp.
- ym010: year2cash flows+10000 and−10000; year1values+10000/1.06 and−10000/1.02; time0value[0.6×10000/1.06−0.4×10000/1.02]/1.04=1671.931472. Displayed nearest amount1672, rounding tolerance0.1.
- ym012: quarter drift0.004×0.25=0.001 and shock0.008×sqrt0.25=0.004; rate nodes0.035 and0.027, mean0.031, SD40bp.
- ym013: upperchild0.05with probability0.2 and sharedchild0.03with probability0.8 give mean0.034 and variance0.2×0.8×0.02²=0.000064; SD80bp.
- ym018: normalized coordinate2log1.05 at the shorter expiry implies strike110×1.05²=121.275 at one year, displayed121.28.

Ten numerical items have executable expression/value/printed-option/tolerance metadata. Additional outputs in multi-output items were also checked directly above, rather than only evaluating the one scalar stored in metadata.

## Mathematical and interpretation checks

- EVT limits concern properly normalized extremes, not the full parent daily-loss distribution.
- Mapping into standard zero instruments preserves exactly the PV and parallel sensitivity constraints supplied; no exact covariance or twist equivalence is claimed.
- Signed DV01 stress calculations use the announced loss/P&L convention.
- The electricity example uses E[QP]=E[Q]E[P]+Cov(Q,P), showing a physical-demand/market-price correlation channel while marginal distributions are unchanged.
- The CMT valuation first discounts the delayed coupon at the state-specific rate, then takes the risk-neutral average and discounts at the current rate.
- Recombination is qualified by sufficiency of pricing state. Rate equality does not preserve a differing running average.
- A constant-parameter positive-mean-reversion Vasicek model has decreasing instantaneous zero-yield volatility loading across maturities; the question does not confuse this with a term structure of option-expiry volatility.
- Declining calendar diffusion volatility in a no-reversion process does not attenuate an already realized initial-state shock.
- Smile/skew classification refers to quoted strike points at a fixed maturity; empirical equity/FX shape explanations are qualified rather than presented as universal laws.
- Normalized log-forward moneyness includes both forward and square-root maturity, explicitly defined in the stem.

Initial machine validation:18uniqueIDs,18exact target objectives,10numeric expressions and68TeXspans, no errors. Existing-bank and54xm stems were compared for duplicates and conceptual structure. Similar methods are necessary across related readings, but none of these supplements merely renumbers an existing stem. Peer precision review was requested separately before final handoff.

Peer review independently recomputed all10supplemental numerical answers, including the delayed CMT coupon. It refined ym007 wording to distinguish variance of the remaining hedged-position P&L from the fixed variance of the regression residual epsilon; key remains50%.
