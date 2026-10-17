/* 80 original, syllabus-referenced application questions. Not GARP questions. */
const EXAM_BLUEPRINT={market:16,credit:16,operational:16,liquidity:12,investment:12,current:8};
const EXAM_RAW=[];
function addExam(topic,reading,concept,question,choices,answer,explanation,why,cue,calculation=null){
 EXAM_RAW.push({topic,reading,concept,question,choices,answer,explanation,why,cue,calculation});
}
// MARKET RISK — 16
addExam('market','MR–1','Historical VaR: quantile convention',
'A market-risk analyst sorts 1,000 daily losses from smallest to largest. Losses at ranks 974, 975 and 976 are EUR 6.8m, EUR 7.2m and EUR 7.9m. Using the nearest-rank estimator (rank = ceiling of n × confidence), the 97.5% one-day VaR is closest to:',
['EUR 6.8m','EUR 7.2m','EUR 7.55m','EUR 7.9m'],1,
'Le rang demandé est plafond(1 000 × 0,975) = 975. La perte à ce rang vaut 7,2 M€. La convention de quantile est explicitement donnée : aucune interpolation n’est nécessaire.',
['Prend le rang précédent.','Applique exactement le rang 975.','Interpole entre deux rangs alors que cette convention ne le demande pas.','Prend le rang suivant.'],'Toujours lire la convention du quantile.',{value:7.2,unit:'EUR m',check:'historical'});
addExam('market','MR–1','Expected shortfall with a discrete loss distribution',
'A portfolio loses EUR 0m with probability 97%, EUR 5m with probability 2%, and EUR 15m with probability 1%. Define 97.5% ES as the average loss in the worst 2.5% of outcomes, splitting probability mass at the cutoff when necessary. ES is closest to:',
['EUR 5m','EUR 9m','EUR 10m','EUR 15m'],1,
'La queue de 2,5 % contient tous les scénarios à 15 M€ (1 %) et 1,5 % des scénarios à 5 M€. ES = (0,01×15 + 0,015×5)/0,025 = 9 M€. La moyenne conditionnelle stricte au-delà de la VaR ne convient pas ici.',
['Donne la VaR, pas la moyenne de queue.','Pondère correctement les 2,5 % pires cas.','Fait une moyenne non pondérée des deux pertes positives.','Ne retient que les pertes strictement supérieures à la VaR.'],'En discret, remplir exactement la masse de queue.',{value:9,unit:'EUR m',check:'discreteES'});
addExam('market','MR–2','Filtered historical simulation under changing volatility',
'A historical daily return was −2.0% when estimated daily volatility was 1.0%. A filtered historical simulation uses that standardized shock with current daily volatility of 2.5%. Ignoring the conditional mean, the simulated return is:',
['−0.8%','−2.0%','−3.5%','−5.0%'],3,
'Le choc standardisé vaut −2 %/1 % = −2. On le remet à l’échelle avec la volatilité actuelle : −2×2,5 % = −5 %. Il faut multiplier par le ratio volatilité actuelle/ancienne.',
['Inverse le ratio des volatilités.','Ignore le changement de régime.','Ajoute la hausse de volatilité au rendement.','Standardise puis applique la volatilité actuelle.'],'Choc ancien × σ actuelle / σ ancienne.',{value:-5,unit:'percent',check:'fhs'});
addExam('market','MR–3','POT: extrapolating a tail quantile',
'Losses exceed a EUR 10m threshold on 2% of days. Excesses follow a generalized Pareto distribution with scale beta = EUR 4m and shape xi = 0.25. Use VaR(p) = u + (beta/xi)[(P(L>u)/(1−p))^xi − 1]. The 99.5% daily VaR is closest to:',
['EUR 11.66m','EUR 16.63m','EUR 22.00m','EUR 26.63m'],1,
'Le ratio de probabilités vaut 0,02/0,005 = 4. VaR = 10 + (4/0,25)(4^0,25−1) = 16,63 M€. Le seuil u doit être ajouté une seule fois.',
['Sous-estime l’extrapolation de la queue.','Utilise la probabilité de dépassement et ajoute le seuil une fois.','Extrapole linéairement les excès.','Ajoute une deuxième fois le seuil.'],'POT : seuil + quantile des excès.',{value:16.627417,unit:'EUR m',check:'gpd'});
addExam('market','MR–7','PIT: diagnosing dispersion',
'A continuous one-day loss forecasting model is backtested using U_t = F_t(L_t), where F_t is the forecast loss CDF. The PIT histogram is strongly U-shaped, with too many observations near zero and one. Which diagnosis is most consistent with this evidence?',
['The forecast distribution is too narrow relative to realized losses.','The forecast distribution is too wide relative to realized losses.','The model is calibrated because the histogram is symmetric.','The result proves only that the mean forecast is biased upward.'],0,
'Une distribution trop étroite place trop d’observations réelles dans ses deux queues. Leurs PIT sont proches de 0 ou 1. Une distribution trop large produit plutôt une concentration vers 0,5.',
['Explique l’excès de PIT extrêmes.','Produirait plutôt un histogramme bombé au centre.','La symétrie ne remplace pas l’uniformité.','Une erreur de dispersion ne démontre pas ce biais de moyenne.'],'PIT en U : prévision trop serrée.');
addExam('market','MR–4 / MR–7','Conditional calibration beyond a uniform PIT histogram',
'A VaR model has approximately uniform PITs and the expected annual number of 99% exceptions. However, squared returns, extreme PITs and exceptions cluster after volatility shocks. Which validation conclusion is strongest?',
['The model is fully validated because unconditional coverage is correct.','The confidence level should be lowered until clustering disappears.','Conditional calibration remains questionable; independence must be assessed.','Uniform marginal PITs establish serial independence.'],2,
'Une fréquence correcte et un histogramme marginal uniforme ne prouvent pas l’indépendance temporelle. Le regroupement des extrêmes appelle un test de dépendance et une revue de la dynamique conditionnelle.',
['La couverture inconditionnelle ne détecte pas tous les défauts temporels.','Changer la cible ne corrige pas la dynamique.','Distingue calibration marginale et conditionnelle.','Uniformité marginale et indépendance sont deux propriétés différentes.'],'Bon nombre de dépassements ≠ bon calendrier.');
addExam('market','MR–11','Regression hedge versus DV01 hedge',
'A bond position has DV01 of EUR 80,000/bp. One unit of a liquid hedge instrument has DV01 of EUR 50,000/bp. Regressing the bond yield change on the hedge yield change gives beta = 1.20. Under the regression hedge, the number of hedge units to short is closest to:',
['1.33','1.60','1.92','2.40'],2,
'Le risque du bond par unité de variation du taux de couverture est 80 000×1,20. Il faut donc vendre 96 000/50 000 = 1,92 unités. Le hedge DV01 simple de 1,60 ignore le bêta de la régression.',
['Divise par bêta au lieu de multiplier.','Neutralise seulement une variation parallèle identique des taux.','Corrige le ratio DV01 par la pente de la bonne régression.','Ne respecte pas le ratio des sensibilités.'],'Ratio de DV01 × bêta dans le bon sens.',{value:1.92,unit:'units',check:'regressionHedge'});
addExam('market','MR–8','Correlation stress and portfolio volatility',
'A portfolio is 60% invested in asset A and 40% in asset B. Their annual volatilities are 20% and 10%. The risk manager stresses their correlation from zero to 0.50, leaving weights and marginal volatilities unchanged. The stressed portfolio volatility is closest to:',
['12.65%','14.42%','16.00%','18.97%'],1,
'Variance = (0,6×0,20)² + (0,4×0,10)² + 2×0,6×0,4×0,20×0,10×0,50 = 0,0208. La racine vaut 14,42 %. Il faut inclure le terme de covariance deux fois.',
['Correspond approximativement à la corrélation nulle.','Inclut la covariance stressée.','Additionne les volatilités pondérées comme si la corrélation valait 1.','Surestime le terme de covariance.'],'La covariance fait le lien entre les risques individuels.',{value:14.422205,unit:'percent',check:'correlatedVol'});
addExam('market','MR–10','Copula choice with unchanged marginals',
'A bank holds the marginal loss distributions and linear correlation parameter fixed while replacing a Gaussian copula with a Student-t copula with finite degrees of freedom. Which consequence is most defensible for nondegenerate positive dependence?',
['The marginal loss distributions necessarily become Student-t.','The probability of joint extreme outcomes may increase because the t copula has tail dependence.','Every portfolio VaR must increase at every confidence level.','The replacement removes the need to estimate dependence parameters.'],1,
'Une copule modifie la dépendance sans imposer de nouvelles marginales. La copule t possède une dépendance de queue pour une corrélation non dégénérée ; cela ne prouve pas une hausse de chaque VaR dans chaque portefeuille.',
['Confond copule et distributions marginales.','Identifie le mécanisme de co-extrêmes.','Affirme une monotonie universelle qui n’est pas garantie.','La dépendance doit toujours être calibrée.'],'Même corrélation ne signifie pas mêmes co-extrêmes.');
addExam('market','MR–5','Mapping fixed-income exposures',
'Two fixed-income portfolios have the same market value and modified duration but very different cash-flow timing. A risk manager is concerned about yield-curve twists. Which mapping approach most directly preserves information relevant to this concern?',
['Map both portfolios to the same single zero-coupon maturity using duration alone.','Map all payments to the final maturity of the portfolio.','Map the individual cash flows to relevant term-structure vertices.','Replace both portfolios with their aggregate face values.'],2,
'La cartographie des flux par maturité conserve la localisation des sensibilités le long de la courbe. Une duration globale peut neutraliser un déplacement parallèle tout en masquant un risque de pente ou de courbure.',
['Perd la répartition des flux et donc les risques non parallèles.','Concentre artificiellement tous les flux en un point.','Préserve la structure par maturité pour analyser les twists.','Le nominal n’est pas une mesure de sensibilité de courbe.'],'Même duration, risques de courbe différents.');
addExam('market','MR–12','Risk-neutral pricing in a one-step tree',
'A bond will be worth 90 in the up-rate state and 110 in the down-rate state one year from now, immediately before its remaining cash flows. The risk-neutral probabilities are 0.40 and 0.60. The current one-year risk-free rate is 4%, with annual compounding. Its current arbitrage-free value is closest to:',
['96.15','98.08','100.00','102.00'],1,
'Valeur = [0,40×90 + 0,60×110]/1,04 = 102/1,04 = 98,08. Les probabilités risque-neutres sont déjà fournies ; il ne faut ni utiliser une moyenne équiprobable ni oublier l’actualisation.',
['Actualise une moyenne à probabilités égales.','Actualise correctement l’espérance risque-neutre.','Prend une moyenne non actualisée à probabilités égales.','Oublie l’actualisation.'],'Espérance risque-neutre, puis actualisation.',{value:98.076923,unit:'price',check:'riskNeutral'});
addExam('market','MR–14','Vasicek conditional mean',
'Under dr = a(b−r)dt + sigma dW, the initial short rate is 2%, the long-run level b is 5%, and a = 0.50 per year. Using E[r_T] = b + (r_0−b)exp(−aT), the expected short rate in two years is closest to:',
['2.00%','3.10%','3.90%','5.00%'],2,
'E[r₂] = 5 % + (2 %−5 %)e^(−1) = 3,896 %. Le retour à la moyenne est progressif ; le niveau de long terme n’est pas atteint exactement en deux ans.',
['Ignore le retour à la moyenne.','Ne correspond pas à l’horizon de deux ans donné.','Applique le facteur de décroissance e^(−aT).','Confond limite de long terme et moyenne à horizon fini.'],'L’écart à la cible décroît exponentiellement.',{value:3.896362,unit:'percent',check:'vasicek'});
addExam('market','MR–15','CIR: basis-point volatility',
'A short-rate desk uses a CIR model with instantaneous diffusion sigma × sqrt(r). Sigma is unchanged while the short rate falls from 4% to 1%. Relative to its initial level, instantaneous basis-point volatility becomes:',
['One quarter as large.','One half as large.','Unchanged.','Twice as large.'],1,
'La volatilité absolue des taux est proportionnelle à √r. Son ratio vaut √(0,01/0,04) = 1/2. La baisse du niveau du taux ne se transmet pas linéairement à sa volatilité en points de base.',
['Serait le ratio d’un modèle à volatilité proportionnelle au taux.','Applique la racine du ratio des niveaux.','Correspondrait à une volatilité absolue constante.','Inverse le ratio.'],'CIR : volatilité absolue proportionnelle à √r.',{value:.5,unit:'ratio',check:'cir'});
addExam('market','MR–17','Put–call parity and implied volatility',
'European calls and puts on the same stock have identical strike and maturity. Interest rates and dividends are consistently specified. Market prices satisfy put–call parity. A trader inverts the same Black–Scholes model for both prices. Which statement is most accurate?',
['The put must have a higher implied volatility because downside protection is more valuable.','The call must have a higher implied volatility whenever spot exceeds strike.','They should give the same implied volatility, apart from numerical or quotation effects.','Parity determines one implied volatility shared by every strike.'],2,
'Pour un même strike et une même échéance, le prix du put est déterminé par celui du call et la parité. Avec les mêmes hypothèses, l’inversion donne la même volatilité implicite. Cela n’empêche pas un smile entre strikes.',
['Confond différence de prix et différence de volatilité au même strike.','La moneyness ne rompt pas la parité.','Respecte la cohérence de valorisation à strike et échéance fixés.','La parité n’impose pas une surface plate.'],'Même strike, même échéance : cohérence call–put.');
addExam('market','MR–17','Smile-adjusted delta',
'A trader models option value as V(S, sigma(S)). At a particular point, Black–Scholes delta is 0.55, vega is 20 per unit of volatility expressed as a decimal, and d sigma/dS = −0.002 per currency unit. Other inputs are fixed. The total derivative dV/dS is closest to:',
['0.51','0.55','0.59','0.95'],0,
'La règle de chaîne donne dV/dS = ΔBS + Vega × dσ/dS = 0,55 + 20×(−0,002) = 0,51. Les unités de vega et de volatilité sont précisées pour éviter un facteur 100.',
['Inclut l’effet du déplacement de volatilité.','Garde la volatilité fixe malgré l’hypothèse sigma(S).','Inverse le signe de la pente du smile.','Mélange les unités de volatilité.'],'Delta total = delta à σ fixe + vega × pente.',{value:.51,unit:'delta',check:'smileDelta'});
addExam('market','MR–18','FRTB liquidity-horizon scaling',
'For an isolated risk-factor bucket, a bank has a 10-day ES of EUR 3m. Assume square-root-of-time scaling is appropriate and no cross-bucket aggregation is needed. If the relevant liquidity horizon is 20 days, the horizon-adjusted ES is closest to:',
['EUR 2.12m','EUR 3.00m','EUR 4.24m','EUR 6.00m'],2,
'ES ajusté = 3×√(20/10) = 4,24 M€. La règle fournie porte sur un bucket isolé ; l’agrégation complète des horizons de liquidité du FRTB est plus structurée.',
['Inverse le ratio des horizons.','Ignore l’horizon de liquidation plus long.','Applique la racine du ratio des horizons.','Multiplie linéairement par le temps.'],'Un horizon de liquidation plus long augmente le risque.',{value:4.242641,unit:'EUR m',check:'liquidityES'});
// CREDIT RISK — 16
addExam('credit','CR–5 / CR–19','EAD and expected loss on a commitment',
'A corporate facility has EUR 90m drawn and EUR 60m undrawn. The one-year credit conversion factor for the undrawn amount is 50%, PD is 1.5%, and LGD is 40%. Assuming these inputs are compatible, the one-year expected credit loss is closest to:',
['EUR 0.54m','EUR 0.72m','EUR 0.90m','EUR 1.80m'],1,
'EAD = 90 + 0,50×60 = 120 M€. EL = 120×0,015×0,40 = 0,72 M€. Le CCF s’applique à l’engagement non tiré, puis la LGD à l’exposition au défaut.',
['Utilise uniquement l’encours déjà tiré.','Intègre le tirage potentiel et la perte conditionnelle au défaut.','Traite tout le non-tiré comme exposé au défaut.','Calcule PD×EAD sans appliquer LGD.'],'Construire l’exposition avant de calculer la perte.',{value:.72,unit:'EUR m',check:'commitmentEL'});
addExam('credit','CR–9','Conditional default probability',
'A credit curve gives cumulative default probabilities of 2% by year one and 5% by year two. Conditional on survival to the end of year one, the probability of default during year two is closest to:',
['2.94%','3.00%','3.06%','5.10%'],2,
'La probabilité non conditionnelle de défaut pendant la deuxième année est 5 %−2 % = 3 %. Il faut la rapporter aux survivants : 0,03/0,98 = 3,061 %.',
['Multiplie par la survie au lieu de diviser.','Donne la probabilité non conditionnelle sur l’intervalle.','Conditionne correctement par la survie à un an.','Reconditionne toute la PD cumulée à deux ans.'],'Probabilité de l’intervalle / survie au début.',{value:3.061224,unit:'percent',check:'conditionalPD'});
addExam('credit','CR–10','Credit VaR and economic capital',
'A one-year credit loss distribution has mean loss EUR 3m and a 99.9th-percentile loss of EUR 12m. The bank defines economic capital as the loss quantile minus expected loss, which is covered separately. Under this convention, economic capital is:',
['EUR 3m','EUR 9m','EUR 12m','EUR 15m'],1,
'Le quantile total inclut déjà la perte attendue. Avec la convention explicitement donnée, capital = 12−3 = 9 M€. Certaines sources nomment différemment la Credit VaR : suivre la définition de l’énoncé.',
['Confond perte attendue et capital de queue.','Retire la moyenne déjà financée séparément.','Ne soustrait pas la perte attendue.','Ajoute la perte attendue une deuxième fois.'],'Distinguer quantile de perte et capital au-delà de la moyenne.',{value:9,unit:'EUR m',check:'creditCapital'});
addExam('credit','CR–11','Independent defaults: loss mean and dispersion',
'A portfolio contains 100 independent, identical EUR 1m loans. Each has a one-year PD of 2% and a fixed LGD of 60%. Defaults are the only source of loss. The expected loss and standard deviation of loss are closest to:',
['EUR 1.20m and EUR 0.84m','EUR 1.20m and EUR 1.40m','EUR 2.00m and EUR 0.84m','EUR 1.20m and EUR 8.40m'],0,
'EL = 100×0,02×0,60 = 1,20 M€. Sous indépendance, Var(L) = 100×0,02×0,98×0,60² = 0,7056 (M€)². L’écart-type vaut 0,84 M€.',
['Applique la sévérité à la moyenne et à l’écart-type du nombre de défauts.','Oublie LGD dans l’écart-type.','Oublie LGD dans la moyenne.','Additionne les écarts-types comme en dépendance parfaite.'],'En indépendance, additionner les variances.',{value:.84,unit:'EUR m',check:'independentUL'});
addExam('credit','CR–10 / ORR–21','One-factor conditional default and capital',
'For a granular portfolio, use stressed PD = Phi[(Phi^−1(PD) + sqrt(rho)Phi^−1(0.99))/sqrt(1−rho)]. EAD is EUR 100m, PD = 2%, LGD = 60%, rho = 20%, and the resulting stressed PD is 12.861%. Ignoring maturity adjustments, capital above expected loss is closest to:',
['EUR 1.20m','EUR 6.52m','EUR 7.72m','EUR 10.86m'],1,
'Perte stressée = 100×0,60×0,12861 = 7,7166 M€. EL = 100×0,60×0,02 = 1,2 M€. Capital = 7,7166−1,2 = 6,5166 M€. La PD stressée fournie évite une inversion de loi normale.',
['Donne seulement EL.','Soustrait EL de la perte conditionnelle au quantile.','Garde la totalité de la perte stressée.','Soustrait les PD sans appliquer LGD.'],'Capital de crédit = LGD × hausse de PD × EAD.',{value:6.5166,unit:'EUR m',check:'asrf'});
addExam('credit','CR–9','Merton: decomposing equity and debt',
'In a basic structural model, firm asset value is 100, the present value of promised risk-free debt repayment is 95, and the value of the corresponding put on firm assets is 8. Using the option decomposition, current equity value is:',
['5','8','13','87'],2,
'Dette risquée = 95−8 = 87. Equity = actifs−dette risquée = 100−87 = 13. De façon équivalente, la parité call–put donne Equity = 100−95+8.',
['Ignore l’option de défaut qui bénéficie à l’equity.','Confond equity et valeur du put de défaut.','Applique la décomposition dette sans risque moins put.','Donne la dette risquée, pas l’equity.'],'Dette risquée = dette sans risque − put.',{value:13,unit:'value',check:'merton'});
addExam('credit','CR–9 / CR–13','Risk-neutral versus historical default estimates',
'A CDS spread is 180 bp and assumed recovery is 40%. The approximation s ≈ lambda(1−R) gives a hazard rate of 3%. A historical rating-based estimate gives a one-year default probability near 1%. Which conclusion is most appropriate?',
['At least one estimate must contain a data-entry error.','The CDS-implied hazard is risk-neutral and may reflect risk premia and market effects; the estimates are not directly interchangeable.','The historical probability must be multiplied by recovery to become risk-neutral.','The CDS spread proves that the physical one-year default probability is exactly 3%.'],1,
'Le spread implique environ 0,018/0,60 = 3 % de hasard risque-neutre dans cette approximation. Une estimation historique relève de la mesure physique. Prime de risque et effets de marché peuvent créer un écart ; même un hasard n’est pas exactement une PD annuelle.',
['L’écart peut être économique, pas une erreur.','Distingue mesure risque-neutre et mesure physique.','Le recouvrement n’est pas une transformation entre mesures.','Confond mesure et taux de hasard avec probabilité.'],'Prix de marché et fréquence historique ne mesurent pas la même chose.');
addExam('credit','CR–20','Unilateral CVA with interval default probabilities',
'A bank estimates positive exposure of EUR 5m and EUR 8m in two successive annual default intervals. Discount factors are 0.99 and 0.97; unconditional probabilities of default in the intervals are 1.0% and 1.5%. Recovery is 40%. Assume independence of exposure and default. CVA is closest to:',
['EUR 66,360','EUR 99,540','EUR 102,000','EUR 166,000'],1,
'CVA = 0,60×[0,99×5 000 000×0,01 + 0,97×8 000 000×0,015] = 99 540 €. Les probabilités données sont déjà celles des intervalles, pas des PD cumulées.',
['Applique le recouvrement de 40 % au lieu de LGD 60 %.','Actualise la perte attendue de chaque intervalle.','Oublie les facteurs d’actualisation.','Oublie la LGD.'],'CVA : actualiser exposition × défaut d’intervalle × LGD.',{value:99540,unit:'EUR',check:'cva'});
addExam('credit','CR–15 / CR–17','Specific wrong-way risk in collateral',
'A bank has a positive derivative exposure to an energy producer. The collateral agreement accepts bonds issued by that same producer. Following an issuer-specific credit shock, which assessment is most appropriate?',
['The arrangement is protected by diversification because derivative and collateral are different instruments.','Daily collateral valuation removes all default-related loss.','Collateral value and counterparty credit quality may deteriorate together, weakening protection when needed.','The arrangement exhibits right-way risk because the bank holds a bond.'],2,
'Le collatéral porte directement le risque de l’émetteur qui doit honorer le dérivé. Un choc propre à cet émetteur peut simultanément accroître le risque de défaut et réduire la valeur de la garantie.',
['Deux instruments du même émetteur ne diversifient pas ce risque.','La fréquence de valorisation ne supprime ni le défaut ni les gaps.','Identifie la dépendance défavorable spécifique.','Le signe économique de la dépendance est défavorable.'],'Qui garantit le garant ?');
addExam('credit','CR–16','Separate enforceable netting sets',
'With one counterparty, a bank has trades worth +EUR 8m and −EUR 6m in enforceable netting set A, and a trade worth −EUR 4m in separate set B. No collateral is held and cross-set netting is unavailable. Current counterparty credit exposure is:',
['EUR 0m','EUR 2m','EUR 6m','EUR 8m'],1,
'Exposition = max(8−6,0) + max(−4,0) = 2 M€. La valeur négative du deuxième ensemble ne peut pas réduire l’exposition positive du premier lorsque la compensation entre ensembles n’est pas opposable.',
['Compense à tort entre les deux ensembles.','Prend la partie positive de chaque ensemble juridique.','Ne correspond pas aux valeurs nettes positives.','Ignore le netting autorisé dans A.'],'Compenser à l’intérieur, agréger entre ensembles.',{value:2,unit:'EUR m',check:'netting'});
addExam('credit','CR–17','Initial margin and variation margin',
'A collateralized derivatives portfolio has zero current unsecured mark-to-market immediately after a variation-margin exchange. The counterparty defaults and replacing the trades takes several days. Which statement best describes the remaining protection?',
['Variation margin alone fully covers all future price changes.','Initial margin can cover adverse changes over the close-out period, subject to its sizing and enforceability.','Initial margin is designed only to settle the current mark-to-market.','The margin period of risk is zero because collateral is exchanged daily.'],1,
'La variation margin couvre principalement la valeur courante. L’initial margin vise les variations défavorables possibles pendant le délai de liquidation ou de remplacement. Sa protection dépend du calibrage et de l’accès juridique au collatéral.',
['Confond exposition courante et variation future.','Distingue les fonctions des deux types de marge.','Décrit plutôt la variation margin.','La fréquence des appels de marge n’annule pas le délai de close-out.'],'VM : aujourd’hui ; IM : mouvement pendant le close-out.');
addExam('credit','CR–13','CDS auction settlement',
'A CDS on a corporate reference entity has EUR 10m notional and is cash-settled after a credit event using a final auction price of 35% of par. Ignoring accrued premium and settlement costs, the protection seller must pay:',
['EUR 3.5m','EUR 6.5m','EUR 10.0m','EUR 13.5m'],1,
'Le règlement de protection vaut nominal×(1−prix final) = 10×(1−0,35) = 6,5 M€. Le prix d’enchère représente la valeur résiduelle du titre, pas directement le paiement de protection.',
['Paie la valeur récupérée au lieu de la perte.','Paie la perte de principal référencée.','Ignore le recouvrement implicite de l’enchère.','Ajoute au lieu de déduire le recouvrement.'],'Protection = pair − valeur résiduelle.',{value:6.5,unit:'EUR m',check:'cdsSettlement'});
addExam('credit','CR–22 / CR–23','Tranche loss waterfall',
'A securitized pool has original notional EUR 100m. A tranche attaches at 3% and detaches at 7% of original pool notional. Cumulative pool principal losses are EUR 5m. Ignoring recoveries after loss allocation, what percentage of this tranche’s original principal has been lost?',
['2%','5%','40%','50%'],3,
'Le nominal de la tranche est 7−3 = 4 M€. Les pertes qui lui arrivent valent min(max(5−3,0),4) = 2 M€. La fraction perdue est 2/4 = 50 %.',
['Rapporte la perte de tranche au pool total.','Donne la perte du pool en pourcentage.','Utilise une mauvaise largeur ou un mauvais dénominateur.','Rapporte la perte affectée à la largeur de tranche.'],'Franchir l’attachement, puis diviser par la largeur.',{value:50,unit:'percent',check:'tranche'});
addExam('credit','CR–22','Correlation and senior-tranche vulnerability',
'Two credit pools have the same marginal default probabilities, exposures and recoveries. Pool H has materially higher default dependence than pool L. A senior investor argues that expected total pool loss is unchanged, so senior-tranche tail risk cannot change. What is the best response?',
['Expected pool loss fixes the distribution of losses across tranches.','Higher dependence can increase severe clustered-default scenarios even if expected pool loss is unchanged.','Every tranche must experience the same proportional increase in expected loss.','Dependence affects expected pool loss but cannot affect its tail.'],1,
'Les pertes marginales déterminent la moyenne du pool, mais la dépendance change la dispersion et la probabilité de pertes groupées. Une tranche senior peut donc devenir plus vulnérable malgré une moyenne du pool inchangée.',
['La moyenne ne fixe pas la distribution ni l’allocation en cascade.','Distingue moyenne et concentration des pertes extrêmes.','Les tranches ont des profils de payoff différents.','Inverse les rôles de la moyenne et de la dépendance.'],'Même EL de pool, risque de tranche différent.');
addExam('credit','CR–6 / CR–12','Two-period migration to default',
'An annual transition matrix has A→A = 90%, A→B = 8%, A→D = 2%; B→A = 10%, B→B = 85%, B→D = 5%. D is absorbing. Assuming a time-homogeneous Markov chain, the two-year default probability for a borrower initially in A is:',
['2.2%','4.0%','4.2%','7.0%'],2,
'Les chemins vers D sont A→D→D, A→A→D et A→B→D : 0,02 + 0,90×0,02 + 0,08×0,05 = 0,042. Le défaut est absorbant ; il faut inclure les défauts de première année.',
['Omet les défauts déjà survenus pendant la première année.','Double simplement la PD sans modéliser les migrations.','Somme les trois chemins possibles.','Additionne les PD de A et B sans pondérer la migration.'],'À deux ans : inclure les états intermédiaires et les défauts déjà survenus.',{value:4.2,unit:'percent',check:'migration'});
addExam('credit','CR–18','Central clearing: a risk trade-off',
'A dealer moves eligible OTC trades from bilateral arrangements to central clearing. Its CFO concludes that counterparty and liquidity risks have both disappeared. Which qualification is most appropriate?',
['A CCP removes only legal risk and cannot reduce bilateral exposures.','Multilateral netting may reduce exposures, but default resources, concentration and margin liquidity remain important.','Initial margin eliminates the possibility of any member default loss.','Cleared positions no longer require stress testing because the CCP performs it.'],1,
'La compensation centrale peut améliorer la gestion du défaut et réduire certaines expositions via le netting. Elle concentre aussi des dépendances et impose des besoins de liquidité liés aux marges ; le risque n’est pas annulé.',
['Néglige les bénéfices de netting et de gestion du défaut.','Présente les bénéfices et les risques résiduels.','Une marge est une protection calibrée, pas une garantie absolue.','Le membre reste responsable de ses risques et de ses tests.'],'La CCP transforme et concentre certains risques.');
// OPERATIONAL RISK AND RESILIENCE — 16
addExam('operational','ORR–1 / ORR–3','Classifying a rogue-trading loss',
'A trader deliberately exceeds authorized limits, conceals positions using fictitious trades, and causes a loss when markets move adversely. For operational event classification, which category most directly reflects the underlying event?',
['External fraud, because market participants caused the price move.','Execution, delivery and process management, because trades were processed.','Internal fraud, because an employee intentionally concealed unauthorized activity.','Market risk only, because the loss was realized after a price change.'],2,
'L’événement sous-jacent est une activité volontairement non autorisée et dissimulée par un salarié. La catégorie opérationnelle pertinente est la fraude interne. Le mouvement de marché participe à la matérialisation de la perte sans effacer sa cause.',
['La fraude est ici commise à l’intérieur de l’établissement.','Une erreur de traitement non intentionnelle serait différente.','Identifie l’intention et l’origine interne de la dissimulation.','Le facteur de prix n’exclut pas une cause opérationnelle.'],'Classifier l’événement selon sa cause, pas seulement son déclencheur.');
addExam('operational','ORR–1','Operational risk boundary',
'A bank reviews two losses: a legal settlement arising from mis-selling, and revenue below budget following an unsuccessful but properly authorized strategy with no process failure. Under the usual Basel operational-risk boundary, which treatment is most appropriate?',
['Both are operational losses because both reduce profit.','The legal settlement can be operational risk; the pure strategic shortfall is outside that definition.','Neither is operational risk because no physical system failed.','The strategic shortfall is operational risk but legal risk is excluded.'],1,
'La définition usuelle du risque opérationnel inclut le risque juridique, mais exclut les risques stratégiques et de réputation en tant que catégories autonomes. L’énoncé écarte une défaillance de processus dans la stratégie.',
['Toute baisse de résultat n’est pas un événement opérationnel.','Respecte l’inclusion du juridique et l’exclusion du pur stratégique.','Le risque opérationnel dépasse les pannes matérielles.','Inverse la frontière usuelle.'],'Juridique inclus ; pur stratégique exclu.');
addExam('operational','ORR–4','Fault tree: redundant safeguards',
'A payment fraud succeeds only if both an authentication control and an independent transaction-monitoring control fail. Their failure probabilities are 2% and 3% for the relevant event. Assuming independence and that these are the only required failures, the fraud-success probability is:',
['0.06%','1.00%','4.94%','5.00%'],0,
'L’arbre de défaillance comporte une porte ET. Sous indépendance, P = 0,02×0,03 = 0,0006 = 0,06 %. Pour une porte OU, la formule serait différente.',
['Multiplie les probabilités des deux défaillances nécessaires.','Ne correspond pas à une combinaison probabiliste de ces contrôles.','Calcule une porte OU indépendante.','Additionne simplement les deux probabilités.'],'ET indépendant : multiplier.',{value:.06,unit:'percent',check:'faultAND'});
addExam('operational','ORR–4','Fault tree: alternative failure channels',
'A service is disrupted if either its network link fails or its power supply fails. The event probabilities over the planning period are 2% and 3%, and the events are independent. The disruption probability is closest to:',
['0.06%','1.00%','4.94%','5.00%'],2,
'P(A ou B) = P(A)+P(B)−P(A et B) = 0,02+0,03−0,02×0,03 = 4,94 %. Il faut retirer le chevauchement pour ne pas compter deux fois la défaillance simultanée.',
['Calcule une porte ET alors qu’un seul incident suffit.','Calcule un écart de probabilités.','Utilise la probabilité de l’union.','Double-compte les cas où les deux canaux échouent.'],'OU : additionner, puis retirer l’intersection.',{value:4.94,unit:'percent',check:'faultOR'});
addExam('operational','ORR–4','Compound loss frequency and severity',
'Annual incident count N is Poisson with mean 3. Independent severities have mean EUR 2m and variance 9 (EUR m)^2; severities are also independent of N. Under a compound Poisson model, annual aggregate loss has mean and standard deviation closest to:',
['EUR 6.00m and EUR 3.00m','EUR 6.00m and EUR 5.20m','EUR 6.00m and EUR 6.24m','EUR 9.00m and EUR 6.24m'],2,
'E[L] = 3×2 = 6 M€. Pour une Poisson composée, Var(L) = λE[X²] = 3×(9+2²) = 39 (M€)². Donc σ = √39 = 6,245 M€. La variance de fréquence contribue elle aussi.',
['Utilise seulement l’écart-type d’une sévérité.','Omet le terme de variance provenant du nombre d’incidents.','Utilise λ fois le second moment de sévérité.','Confond fréquence moyenne et sévérité dans le calcul de la moyenne.'],'Poisson composée : variance = λ × second moment.',{value:6.244998,unit:'EUR m',check:'compoundPoisson'});
addExam('operational','ORR–5','Insurance deductible and coverage limit',
'A bank suffers a covered operational loss of EUR 18m. The policy has a EUR 2m per-event deductible and a EUR 10m per-event limit on the insurer’s payment. Assume the insurer pays in full and there are no exclusions. The bank’s retained loss is:',
['EUR 2m','EUR 6m','EUR 8m','EUR 10m'],2,
'Indemnité = min(max(18−2,0),10) = 10 M€. Perte conservée = 18−10 = 8 M€. La franchise ne définit pas à elle seule la perte résiduelle lorsque le plafond est atteint.',
['Ignore le plafond de l’indemnité.','Soustrait plafond et franchise comme deux remboursements.','Soustrait à la perte brute le paiement effectif de l’assureur.','Donne l’indemnité, pas la perte conservée.'],'Perte nette = perte brute − indemnité plafonnée.',{value:8,unit:'EUR m',check:'insurance'});
addExam('operational','ORR–18','RAROC and the hurdle rate',
'A business generates annual revenue of EUR 12m, operating and funding costs of EUR 4m, and expected credit losses of EUR 2m. Allocated economic capital is EUR 40m. Define RAROC as revenue minus those costs and expected losses, divided by economic capital. With a 12% hurdle, which conclusion follows?',
['RAROC is 10%; the business falls short.','RAROC is 15%; it exceeds the hurdle.','RAROC is 20%; expected losses should not be deducted.','RAROC is 30%; only revenue enters the numerator.'],1,
'Résultat ajusté du risque = 12−4−2 = 6 M€. RAROC = 6/40 = 15 %, au-dessus du seuil de 12 %. Suivre la définition fournie, car des variantes ajoutent d’autres ajustements.',
['Utilise un numérateur incorrect.','Déduit les charges et la perte attendue avant de rapporter au capital.','Omet la perte attendue.','Omet tous les coûts.'],'RAROC : résultat après risque / capital économique.',{value:15,unit:'percent',check:'raroc'});
addExam('operational','ORR–23','Output floor under an explicit calibration',
'For this exercise, a fully phased-in output floor is 72.5% of standardized RWA. A bank has model-based RWA of EUR 70bn and standardized RWA of EUR 120bn. Applying an 8% capital requirement to the binding RWA amount, required capital is closest to:',
['EUR 5.60bn','EUR 6.96bn','EUR 8.70bn','EUR 9.60bn'],1,
'Plancher de RWA = 0,725×120 = 87 Md€. La base contraignante est max(70,87) = 87. Capital = 8 %×87 = 6,96 Md€. L’énoncé fixe le calibrage : aucune hypothèse de calendrier national n’est nécessaire.',
['Ignore le plancher et conserve les RWA internes.','Applique le taux de capital à la base la plus élevée.','Prend 10 % au lieu des 8 % demandés.','Applique 8 % à tous les RWA standardisés sans facteur de plancher.'],'D’abord le plancher de RWA, ensuite le taux de capital.',{value:6.96,unit:'EUR bn',check:'outputFloor'});
addExam('operational','ORR–22','Leverage ratio versus risk-weighted capital',
'A bank has Tier 1 capital of EUR 30bn, a leverage exposure measure of EUR 1,000bn, and RWA of EUR 400bn. Using Tier 1 divided by the leverage exposure measure, its leverage ratio is:',
['3.0%','7.5%','13.3%','33.3%'],0,
'Leverage ratio = 30/1 000 = 3 %. Le ratio Tier 1 sur RWA serait 30/400 = 7,5 %, mais ce n’est pas le dénominateur de la mesure de levier demandée.',
['Utilise le dénominateur non pondéré défini.','Calcule le ratio Tier 1 sur RWA.','Ne correspond pas au ratio de levier défini.','Inverse ou change les grandeurs du ratio.'],'Levier : exposition non pondérée, pas RWA.',{value:3,unit:'percent',check:'leverage'});
addExam('operational','ORR–24','Standardized operational capital calculation',
'Under the SMA calibration explicitly assumed in this question, operational-risk capital equals the business indicator component (BIC) multiplied by the internal loss multiplier (ILM). BIC is EUR 100m and ILM is 1.20. Capital is:',
['EUR 20m','EUR 83.33m','EUR 100m','EUR 120m'],3,
'Capital = BIC×ILM = 100×1,20 = 120 M€. Ne pas remplacer le facteur donné par un choix national d’implémentation ; le calcul demandé est entièrement spécifié.',
['Ne conserve que l’augmentation au-dessus de BIC.','Divise par ILM.','Ignore le multiplicateur fourni.','Applique le produit demandé.'],'Appliquer le calibrage précisé, sans ajouter une hypothèse.',{value:120,unit:'EUR m',check:'sma'});
addExam('operational','ORR–17','Reverse stress testing',
'A board asks risk management to identify combinations of deposit outflows, market losses and funding closures that would make the bank’s business model unviable. How does this exercise differ from a conventional scenario stress test?',
['It starts from a failure outcome and works backward to plausible conditions causing it.','It selects only scenarios previously observed in the bank’s own data.','It replaces the need to assess scenario plausibility.','It estimates the most likely business-as-usual forecast.'],0,
'Le reverse stress test part d’un résultat de rupture et cherche les conditions susceptibles d’y conduire. Un stress test conventionnel part plutôt d’un scénario et en calcule les effets. La plausibilité et les mécanismes économiques restent nécessaires.',
['Décrit la logique inverse de construction.','Restreint à tort l’exercice aux événements historiques internes.','L’identification de rupture ne dispense pas d’un scénario cohérent.','Une prévision centrale n’est pas un test de rupture.'],'Reverse stress : partir de la rupture.');
addExam('operational','ORR–15 / ORR–16','Validation evidence versus model ownership',
'A profitable trading model passes an in-sample fit test. The development team proposes to approve it without independent implementation checks because its code is proprietary and validation staff cannot reproduce every component. Which response best addresses model risk?',
['Approve it solely on profitability because profit validates conceptual soundness.','Treat inability to reproduce the code as proof that the model is wrong.','Require effective independent challenge, implementation verification and explicit treatment of validation limitations before approval.','Transfer approval entirely to the model developer, who knows the code best.'],2,
'La performance observée ne suffit pas. La validation doit challenger la conception, l’implémentation, les résultats et les limites. Des difficultés de réplication doivent conduire à des mesures proportionnées et documentées, pas à l’abandon du contrôle.',
['Un profit historique peut masquer une erreur ou un risque non réalisé.','Une limite de validation est un risque à gérer, pas une preuve automatique d’erreur.','Combine indépendance, vérification et gestion des limites.','Supprime l’indépendance du challenge.'],'La rentabilité n’est pas un substitut à la validation.');
addExam('operational','ORR–12 / ORR–13','Hidden common subcontractor exposure',
'A bank splits critical processing between two vendors to reduce concentration. Due diligence shows both rely on the same data center and software-maintenance subcontractor. Which action most directly tests whether the diversification is effective?',
['Count the two contracts as independent because the vendors have different legal names.','Map shared dependencies and test a simultaneous failure of the common subcontractor.','Assign each vendor half the previous risk score without further testing.','Rely exclusively on each vendor’s individual availability report.'],1,
'La diversification contractuelle peut masquer une concentration technique. La cartographie et les scénarios de panne commune permettent de vérifier si les deux solutions restent disponibles sous le même choc.',
['Deux entités juridiques ne garantissent pas deux infrastructures indépendantes.','Examine le mécanisme réel de défaillance commune.','Suppose un bénéfice de diversification non démontré.','Les moyennes de disponibilité ne testent pas une dépendance commune.'],'Diversifier les dépendances, pas seulement les contrats.');
addExam('operational','ORR–7 / ORR–17','Coherent stress scenarios',
'A bank’s severe recession scenario assumes sharply rising defaults and collateral losses, but also assumes trading liquidity improves and wholesale funding becomes cheaper without any policy intervention or supporting narrative. What is the main modeling concern?',
['A stress scenario must make every risk factor move in the same direction.','The scenario may combine inconsistent assumptions and understate interactions between credit, market and funding stress.','Only historical scenarios are allowed, so hypothetical recessions are invalid.','The problem is solved by increasing the confidence level of a standalone VaR.'],1,
'Les signes ne doivent pas tous être identiques, mais les relations économiques doivent être explicables. Des hypothèses favorables de liquidité et de financement en pleine détérioration peuvent masquer des effets de second tour si elles ne sont pas justifiées.',
['La cohérence économique ne signifie pas des signes uniformes.','Identifie l’incohérence et les interactions manquantes.','Les scénarios hypothétiques sont utiles s’ils sont cohérents.','Un changement de quantile ne répare pas la construction du scénario.'],'Stress crédible = mécanismes économiques cohérents.');
addExam('operational','ORR–10 / ORR–11','Risk-based financial-crime monitoring',
'An established client’s account begins receiving many small payments followed by rapid transfers to unrelated third parties, inconsistent with its stated business. No individual payment crosses the bank’s simple size alert. What is the strongest control response?',
['Close the review because every payment is below the alert size.','Review the aggregate pattern against the client profile and investigate through the bank’s risk-based escalation process.','Treat the pattern as conclusive proof of a criminal offense.','Exempt long-standing clients from transaction monitoring.'],1,
'L’analyse doit regarder les comportements agrégés et leur cohérence avec le profil du client. Un seuil unitaire ne suffit pas. Un schéma suspect justifie une investigation et une escalade, sans constituer à lui seul une preuve d’infraction.',
['Un contrôle par montant unitaire peut rater la structuration.','Combine profil client, comportement et examen proportionné.','Confond signal de risque et conclusion juridique.','L’ancienneté ne dispense pas de suivi.'],'Surveiller le schéma, pas seulement le ticket.');
addExam('operational','ORR–1 / ORR–4','Impact tolerance and recovery dependencies',
'A critical payment service has an impact tolerance of four hours. The application team demonstrates a two-hour recovery time, but restoration of an essential external authentication dependency takes six hours in the same scenario. Which conclusion is most appropriate?',
['The tolerance is met because the application recovers within two hours.','The tolerance is met because the average of two and six is four hours.','End-to-end recovery may breach tolerance; the critical dependency must be included in testing and remediation.','A six-hour dependency recovery is irrelevant once an RTO has been documented.'],2,
'Le service complet ne reprend pas tant qu’une dépendance indispensable reste indisponible. Le test bout en bout peut donc montrer un dépassement des quatre heures, même si une application isolée atteint son objectif de reprise.',
['Confond reprise d’un composant et continuité du service.','Les délais des dépendances ne s’agrègent pas par moyenne.','Évalue le service critique dans son ensemble.','Un objectif documenté n’annule pas une dépendance réelle.'],'La reprise se mesure bout en bout.');
// LIQUIDITY AND TREASURY — 12
addExam('liquidity','ORR–22','LCR inflow cap',
'A bank has EUR 40m of eligible HQLA after all asset adjustments, EUR 100m of gross stressed 30-day outflows and EUR 90m of eligible inflows before the inflow cap. Assume inflows are capped at 75% of gross outflows and no exemptions apply. The LCR is:',
['40%','160%','300%','400%'],1,
'Inflows retenus = min(90,0,75×100) = 75 M€. Sorties nettes = 100−75 = 25 M€. LCR = 40/25 = 160 %. Utiliser 90 sans plafond donnerait à tort 400 %.',
['Utilise les sorties brutes sans reconnaître les inflows autorisés.','Applique d’abord le plafond d’inflows.','Ne correspond pas aux sorties nettes réglementaires données.','Ignore le plafond et retient 90 d’inflows.'],'Le plafond d’inflows vient avant le ratio.',{value:160,unit:'percent',check:'lcrCap'});
addExam('liquidity','ORR–22','HQLA haircut and Level 2 cap',
'A bank has EUR 60m of Level 1 assets and EUR 60m market value of Level 2A assets. For this exercise, apply a 15% Level 2A haircut and cap all Level 2 assets at 40% of total eligible HQLA. Assume no other adjustments or secured transactions. Eligible HQLA is closest to:',
['EUR 84m','EUR 100m','EUR 111m','EUR 120m'],1,
'Après haircut, Level 2A = 60×0,85 = 51. Avec 60 de Level 1, le plafond impose L2/(60+L2) ≤ 40 %, donc L2 ≤ 40. HQLA = 60+40 = 100 M€.',
['Applique le plafond de 40 % directement aux seuls actifs Level 1.','Combine haircut puis plafond portant sur le total.','Applique le haircut mais omet le plafond de composition.','Omet haircut et plafond.'],'Un plafond de composition porte sur le total final.',{value:100,unit:'EUR m',check:'hqlaCap'});
addExam('liquidity','ORR–22','NSFR with weighted funding and assets',
'Assume a bank has EUR 100m of deposits assigned a 95% ASF factor and EUR 40m of funding assigned 50% ASF. Its assets are EUR 100m of loans at an 85% RSF factor and EUR 20m of assets at 5% RSF. There are no other items. Its NSFR is closest to:',
['74.8%','95.8%','115.0%','133.7%'],3,
'ASF = 100×0,95 + 40×0,50 = 115. RSF = 100×0,85 + 20×0,05 = 86. NSFR = 115/86 = 133,72 %. Les facteurs de stabilité sont appliqués à chaque catégorie avant l’agrégation.',
['Inverse RSF et ASF.','Divise ASF par les actifs bruts sans facteurs RSF.','Donne le montant d’ASF comme s’il était un ratio.','Calcule les deux montants pondérés puis leur ratio.'],'NSFR : pondérer les ressources et les besoins séparément.',{value:133.72093,unit:'percent',check:'nsfrWeighted'});
addExam('liquidity','LTR–13','Repo haircut shock and cash shortfall',
'A dealer finances collateral worth EUR 100m through repo at a 2% haircut and has borrowed the maximum permitted amount. The collateral price stays unchanged, but at rollover the haircut rises to 5%. How much cash must the dealer provide to maintain the same collateral position?',
['EUR 2m','EUR 3m','EUR 5m','EUR 7m'],1,
'Financement initial = 100×0,98 = 98 M€. Nouveau financement maximum = 100×0,95 = 95 M€. Le dealer doit fournir la différence, soit 3 M€, même sans baisse du prix de l’actif.',
['Donne l’ancien haircut en montant.','Calcule la contraction du financement disponible.','Donne le nouveau haircut total, pas le besoin supplémentaire.','Additionne les haircuts au lieu de prendre leur différence.'],'Le haircut peut créer un besoin de cash sans mouvement de prix.',{value:3,unit:'EUR m',check:'repoShock'});
addExam('liquidity','LTR–1 / LTR–2','Cash raised in a distressed asset sale',
'A fund needs EUR 10m cash today. It can sell an asset only at a 20% discount to its current marked value. Ignoring taxes and fees, how much marked asset value must it sell to raise the cash?',
['EUR 8.0m','EUR 10.0m','EUR 12.0m','EUR 12.5m'],3,
'Le cash vaut 80 % de la valeur affichée vendue. Il faut donc vendre 10/0,80 = 12,5 M€ de valeur marquée. Ajouter simplement 20 % au besoin ne suffit pas.',
['Applique le discount au besoin au lieu de calculer l’actif nécessaire.','Ignore la décote.','Ajoute 20 % sans inverser le prix de réalisation.','Résout 0,80×valeur vendue = besoin de cash.'],'Pour lever C avec décote h : vendre C/(1−h).',{value:12.5,unit:'EUR m',check:'fireSale'});
addExam('liquidity','LTR–17','Economic value of equity under a rate shock',
'A bank has assets worth EUR 100m with modified duration 5 and liabilities worth EUR 90m with modified duration 2. A parallel yield increase of 100 bp affects both curves equally. Ignoring convexity, the change in economic value of equity is closest to:',
['−EUR 6.8m','−EUR 3.2m','−EUR 0.3m','+EUR 3.2m'],1,
'ΔA ≈ −100×5×0,01 = −5 M€. ΔL ≈ −90×2×0,01 = −1,8 M€. Comme EVE = A−L, ΔEVE = −5−(−1,8) = −3,2 M€.',
['Additionne les baisses des actifs et des passifs.','Soustrait correctement la variation du passif.','Ignore la taille des bilans en appliquant seulement les durations.','Inverse le signe de la variation de valeur nette.'],'EVE = actifs moins passifs, y compris dans les variations.',{value:-3.2,unit:'EUR m',check:'eve'});
addExam('liquidity','LTR–17','NII sensitivity with deposit betas',
'For a one-year simplified NII projection, EUR 100m of floating-rate assets reprice immediately with an 80% pass-through and EUR 100m of deposits with a 40% pass-through. Market rates rise 100 bp and balances stay constant. The annual NII change is:',
['−EUR 0.4m','EUR 0m','+EUR 0.4m','+EUR 1.0m'],2,
'Δrevenu = 100×0,80×0,01 = 0,8 M€. Δcoût = 100×0,40×0,01 = 0,4 M€. ΔNII = 0,8−0,4 = +0,4 M€. Un gap nominal nul ne garantit pas une sensibilité nulle quand les betas diffèrent.',
['Inverse la différence entre pass-through actif et passif.','Suppose des betas identiques parce que les encours sont égaux.','Tient compte des deux vitesses de transmission des taux.','Ignore la réponse des dépôts et le beta des actifs.'],'Même encours, sensibilité différente si les betas diffèrent.',{value:.4,unit:'EUR m',check:'niiBeta'});
addExam('liquidity','LTR–6','Intraday liquidity despite zero end-of-day net flow',
'A bank starts the day with no available payment balance. It must pay 5 at 09:00, receives 2 at 10:00, pays 4 at 11:00 and receives 7 at 12:00, all in EUR millions. Payments cannot be delayed. What minimum intraday funding is needed to avoid a negative balance at any time?',
['EUR 0m','EUR 5m','EUR 7m','EUR 9m'],2,
'Les flux cumulés sans financement sont −5, −3, −7, puis 0. Le déficit maximal est de 7 M€. Le solde final nul ne signifie pas qu’aucun financement intrajournalier n’est nécessaire.',
['Regarde seulement le solde net de fin de journée.','Ne couvre que le premier paiement.','Couvre le point bas des flux cumulés.','Additionne les paiements sans reconnaître la première entrée de cash.'],'Intraday : financer le point bas, pas le solde final.',{value:7,unit:'EUR m',check:'intraday'});
addExam('liquidity','LTR–14','Matched-maturity liquidity transfer pricing',
'A loan desk originates five-year fixed-rate loans. Treasury funds them internally at an overnight transfer price with no term liquidity premium, and the desk appears highly profitable. What change most directly improves risk-adjusted incentives?',
['Continue overnight pricing because treasury can always roll its funding.','Use an internal funding charge reflecting the loan’s maturity and relevant liquidity costs, with clear treatment of optionality.','Remove all funding charges because the customer pays interest.','Charge only realized losses after a liquidity crisis occurs.'],1,
'Un prix de transfert aligné sur la maturité et la consommation de liquidité évite de subventionner la transformation d’échéance. La responsabilité peut rester centralisée chez Treasury tout en attribuant le coût aux activités qui le créent.',
['Suppose une capacité de refinancement illimitée.','Attribue le coût pertinent au desk qui crée le besoin.','Confond revenu client et coût de financement.','Attendre la crise ne corrige pas les incitations ex ante.'],'Le coût interne doit refléter la liquidité consommée.');
addExam('liquidity','LTR–16','Cross-currency basis and constrained arbitrage',
'A persistent cross-currency basis appears to offer a covered-interest-parity arbitrage. A trader argues it must be a data error because the cash flows can be hedged. Which explanation is most credible?',
['Hedging currency risk also makes balance-sheet usage costless.','Hedging demand and limits on dealer balance sheets can sustain a basis after funding, capital and transaction costs.','Covered interest parity is unrelated to FX swaps.','A basis mechanically proves an unhedged currency exposure in every trade.'],1,
'Un arbitrage apparent doit être évalué après coûts de financement, capital, bilan et exécution. Une forte demande de couverture et une capacité d’intermédiation limitée peuvent maintenir un basis sans erreur de données.',
['L’absence de risque de change n’annule pas les contraintes de bilan.','Introduit les coûts et contraintes pertinents.','Le basis se mesure précisément via les relations de taux et de forwards/swaps FX.','Une opération couverte peut consommer des ressources coûteuses.'],'Couvert ne signifie pas gratuit à financer.');
addExam('liquidity','LTR–9 / LTR–10','Survival horizon after an initial collateral shock',
'A liquidity stress model starts with EUR 12m of immediately usable cash. A EUR 4m collateral call must be paid at time zero. Thereafter, net outflows are EUR 2m at the end of each day; no assets can be sold and no other funding arrives. After how many full daily outflows is the remaining cash exhausted?',
['2 days','4 days','6 days','8 days'],1,
'Après le choc initial, cash = 12−4 = 8 M€. Chaque sortie quotidienne consomme 2 M€. Le coussin tombe à zéro après 8/2 = 4 sorties journalières.',
['Ne suit pas le coussin réellement disponible.','Déduit l’appel initial avant de calculer l’horizon.','Ignore l’appel de collatéral initial.','Confond le coussin restant en montant avec un nombre de jours.'],'Survie : partir du cash disponible après les chocs immédiats.',{value:4,unit:'days',check:'survivalHorizon'});
addExam('liquidity','LTR–11','Credibility of contingency funding sources',
'A bank’s contingency plan assumes that, during a downgrade-driven market closure, it will replace all lost unsecured funding with new unsecured debt issued to the same investor base. Which revision most directly addresses the weakness?',
['Increase the assumed issue size because a larger transaction is more efficient.','Count all unencumbered assets as instant cash at par.','Test accessible alternatives under the same stress, including collateral eligibility, operational readiness and execution timing.','Delete the downgrade scenario because the funding assumption is inconsistent.'],2,
'Les sources de secours doivent rester mobilisables dans le scénario qui ferme les sources ordinaires. Il faut tester leur accès réel, les sûretés, les délais et la capacité opérationnelle plutôt que supposer qu’un marché fermé absorbera une nouvelle émission.',
['Amplifie la dépendance au marché supposé fermé.','Une valeur d’actif n’est pas une capacité de cash immédiate.','Teste la faisabilité du financement en situation stressée.','Supprimer le scénario évite le problème sans préparer la réponse.'],'Une ressource de secours doit survivre au scénario.');
// RISK MANAGEMENT AND INVESTMENT MANAGEMENT — 12
addExam('investment','IM–1 / IM–3','Multifactor performance attribution',
'A manager’s annual excess return is 8.0%. A two-factor model assigns market beta 1.10 with a market premium of 5.0%, and value-factor exposure 0.40 with a value premium of 3.0%. Ignoring other factors, model alpha is closest to:',
['1.3%','2.5%','6.7%','8.0%'],0,
'Rendement expliqué = 1,10×5 % + 0,40×3 % = 6,7 %. Alpha = 8 %−6,7 % = 1,3 %. Le rendement fourni est déjà un excès : ne pas déduire une deuxième fois le sans risque.',
['Retire les deux contributions factorielles.','Ne retire que la contribution du marché.','Donne le rendement expliqué, pas alpha.','Attribue tout le rendement à la compétence du manager.'],'Alpha = rendement non expliqué par les expositions.',{value:1.3,unit:'percent',check:'factorAlpha'});
addExam('investment','IM–7','Active risk from joint portfolio and benchmark returns',
'A portfolio and its benchmark each have annual volatility of 15%, with correlation 0.98 between their returns. Average active return is 1.2% per year. The ex-post tracking error and information ratio are closest to:',
['3.0% and 0.40','15.0% and 0.08','21.2% and 0.057','0.3% and 4.00'],0,
'TE² = σp²+σb²−2ρσpσb = 2×0,15²×(1−0,98) = 0,0009. TE = 3 %. IR = 1,2 %/3 % = 0,40. Une forte corrélation ne signifie pas tracking error nulle.',
['Calcule la volatilité de la différence puis le ratio actif.','Utilise le risque absolu du portefeuille.','Ignore la covariance entre portefeuille et benchmark.','Confond variance ou décimales et écart-type.'],'TE est l’écart-type de Rp−Rb, covariance incluse.',{value:.4,unit:'IR',check:'trackingIR'});
addExam('investment','IM–5 / IM–6','Component contribution to portfolio variance',
'A two-asset portfolio has weights 60% and 40%, volatilities 20% and 10%, and correlation 0.25. The share of total portfolio variance attributable to asset A under Euler allocation is w_A(Sigma w)_A / (w′Sigma w). That share is closest to:',
['60.0%','75.0%','84.8%','92.3%'],2,
'Cov(A,B) = 0,25×0,20×0,10 = 0,005. Numérateur A = 0,6×(0,6×0,04+0,4×0,005) = 0,0156. Variance totale = 0,0184. Part A = 0,0156/0,0184 = 84,78 %.',
['Confond poids de capital et part du risque.','Ne tient pas correctement compte des volatilités et de la covariance.','Utilise la contribution Euler et le bon dénominateur.','Omet une partie du risque attribué à B.'],'Un poids de 60 % peut porter bien plus de 60 % du risque.',{value:84.782609,unit:'percent',check:'riskContribution'});
addExam('investment','IM–6','Euler risk allocation with position notionals',
'A homogeneous differentiable risk measure gives marginal VaR sensitivities of EUR 0.12m and EUR 0.08m per EUR 1m invested in strategies A and B. Notionals are EUR 50m and EUR 75m. Assuming these are all positions, total VaR under Euler allocation is:',
['EUR 0.20m','EUR 6m','EUR 10m','EUR 12m'],3,
'Contribution A = 50×0,12 = 6 M€. Contribution B = 75×0,08 = 6 M€. L’homogénéité permet de sommer les contributions composantes : VaR totale = 12 M€. Les dérivées seules ne s’additionnent pas directement.',
['Additionne les sensibilités sans tenir compte des positions.','Ne garde qu’une seule contribution composante.','Ne correspond pas à l’allocation Euler des deux positions.','Multiplie chaque marginale par le nominal correspondant.'],'Marginale × taille = composante.',{value:12,unit:'EUR m',check:'eulerNotional'});
addExam('investment','IM–4','Fundamental law with implementation constraints',
'A manager has information coefficient IC = 0.05 and 400 independent bets per year. A simplified implementation model uses IR = TC × IC × sqrt(BR), with transfer coefficient TC = 0.60. The expected IR is closest to:',
['0.03','0.30','0.60','1.00'],2,
'IR = 0,60×0,05×√400 = 0,60. Sans contraintes, IC×√BR donnerait 1. Le coefficient de transfert réduit la traduction de la compétence en positions effectives.',
['Oublie la breadth.','Utilise une breadth effective ou une racine incorrecte.','Applique le coefficient de transfert et la racine de 400.','Ignore les contraintes d’implémentation.'],'La compétence théorique doit passer dans le portefeuille.',{value:.6,unit:'IR',check:'fundamentalTC'});
addExam('investment','IM–17','Illiquid asset smoothing and measured performance',
'A private-asset manager reports quarterly returns with strong positive serial correlation and unusually low volatility. Valuations rely on lagged appraisals. Which due-diligence conclusion is most appropriate?',
['The low reported volatility establishes low economic risk.','Serial correlation proves that the manager forecasts markets successfully.','Stale marks may smooth returns, distort Sharpe ratios and delay recognition of risk.','Annualizing the reported quarterly volatility by multiplying by two fully resolves the issue.'],2,
'Les prix retardés peuvent lisser les rendements et créer de l’autocorrélation. La volatilité affichée et le Sharpe peuvent alors être trompeurs. L’annualisation standard suppose une structure de dépendance qui doit être examinée.',
['Confond stabilité des valorisations publiées et stabilité économique.','L’autocorrélation peut venir du processus de prix.','Identifie une limite de mesure liée à l’illiquidité.','Une multiplication mécanique ne corrige ni les prix ni la dépendance.'],'Les prix peuvent bouger moins vite que le risque.');
addExam('investment','IM–11','Private-market public market equivalent',
'An investor contributes 100 to a private fund today and receives a final distribution of 121 exactly two years later, with no interim flows or residual NAV. A public-market index rises from 100 to 110 over the same period. Define PME as the distribution discounted by the index growth factor, divided by the contribution. PME is:',
['0.91','1.00','1.10','1.21'],2,
'Le facteur de marché vaut 110/100 = 1,10. Distribution ramenée à la date initiale selon l’indice : 121/1,10 = 110. PME = 110/100 = 1,10. Une PME supérieure à 1 indique une surperformance selon cette convention.',
['Inverse la comparaison privé/public.','Suppose une performance identique à celle du marché.','Ajuste le flux privé de la croissance du benchmark.','Ignore la hausse du marché public.'],'PME compare les flux privés à une alternative cotée.',{value:1.1,unit:'PME',check:'pme'});
addExam('investment','IM–8','Convertible arbitrage residual risks',
'A convertible-arbitrage fund buys convertible bonds and shorts the issuer’s shares to reduce equity delta. The manager describes the trade as nearly riskless because initial delta is neutral. Which risk assessment is most appropriate?',
['Delta neutrality also neutralizes issuer credit and funding risk.','The trade remains exposed to credit spreads, volatility, financing and changing hedge ratios.','Shorting the stock eliminates all liquidity risk in the convertible.','The only remaining exposure is the stock’s current price level.'],1,
'Le hedge delta réduit une sensibilité locale au prix de l’action. Le convertible conserve notamment du risque de crédit, de volatilité et de liquidité ; le financement et l’évolution du delta imposent aussi des contraintes.',
['Un hedge d’equity local ne neutralise pas tous les facteurs.','Identifie plusieurs sources de risque économique résiduel.','La liquidité du stock et celle du convertible diffèrent.','Omet les facteurs qui déterminent le spread et l’optionalité.'],'Delta neutre ne signifie pas risque neutre.');
addExam('investment','IM–8','Merger arbitrage: market-implied completion probability',
'A takeover target trades at 90. It will pay 100 in a successful cash acquisition and is expected to fall to 70 if the deal fails. Assume immediate resolution, no discounting, no risk premium and no other outcomes. The completion probability implied by the current price is closest to:',
['50.0%','66.7%','80.0%','90.0%'],1,
'90 = p×100 + (1−p)×70, donc p = (90−70)/(100−70) = 2/3. Sans l’hypothèse d’absence de prime de risque, ce calcul ne donnerait pas directement une probabilité physique.',
['Impliquerait un prix de 85.','Résout l’espérance binaire sous les hypothèses données.','Impliquerait un prix de 94.','Confond prix divisé par offre et probabilité de succès.'],'Probabilité implicite = (prix − échec)/(succès − échec).',{value:66.666667,unit:'percent',check:'merger'});
addExam('investment','IM–1 / IM–9','Market neutrality and hidden risk factors',
'A hedge fund estimates equity-market beta near zero using ordinary least squares in calm markets. It earns returns from selling volatility and financing illiquid positions with short-term debt. Which conclusion is most defensible?',
['Market beta near zero establishes that the fund is low risk under stress.','All positive returns must be alpha because CAPM beta is zero.','The fund may retain substantial nonlinear, liquidity and funding exposures not captured by its calm-period market beta.','Funding risk is already fully measured by the slope of the equity-market regression.'],2,
'Un bêta linéaire estimé dans un régime calme ne décrit pas une option vendue, des positions illiquides ou une dette à court terme. La neutralité à un facteur ne constitue pas une neutralité économique à tous les chocs.',
['Extrapole abusivement une mesure locale et linéaire.','Ignore les facteurs omis et les primes de risque alternatives.','Sépare neutralité de marché et risques non linéaires ou de liquidité.','La régression de rendement sur le marché ne mesure pas toutes les contraintes de financement.'],'Bêta nul ≠ risque total nul.');
addExam('investment','IM–15','Conditional scenario construction',
'A risk team creates a severe equity-market decline scenario. It has reliable evidence that corporate spreads and market liquidity react conditionally to large equity shocks. What is the strongest next step in constructing a coherent market-driven scenario?',
['Set all other risk factors to their unconditional historical means.','Use unconditional correlations mechanically, regardless of tail behavior.','Model plausible joint responses conditional on the equity shock and challenge the resulting economic narrative.','Choose each factor’s worst historical move independently, without regard to joint plausibility.'],2,
'Une construction conditionnelle cherche les mouvements plausibles des autres facteurs sachant le choc initial. Elle doit considérer les dépendances en stress et faire l’objet d’un challenge économique, plutôt qu’empiler des extrêmes sans cohérence.',
['Ignore les réactions conditionnelles connues.','Une corrélation moyenne peut mal représenter la queue.','Combine dépendance conditionnelle et plausibilité économique.','Un assemblage d’extrêmes isolés n’est pas nécessairement un scénario plausible.'],'Scénario : un choc initial, des réactions jointes cohérentes.');
addExam('investment','IM–12 / IM–14','Independent evidence in manager due diligence',
'A fund reports unusually smooth positive returns and uses a little-known administrator closely connected to the manager. The manager offers detailed internal spreadsheets as verification but restricts direct contact with custodians. What response best strengthens due diligence?',
['Accept the spreadsheets if they reconcile internally.','Increase the allocation because smooth returns indicate diversification.','Seek independent verification of assets, custody and performance, and treat restricted verification as a material red flag.','Use only the fund’s latest Sharpe ratio to resolve the concern.'],2,
'La cohérence interne des documents ne remplace pas des confirmations indépendantes. L’accès au dépositaire, à l’administrateur et aux preuves de positions est essentiel. Un refus ou une impossibilité persistante de vérification est un signal important.',
['Des documents issus d’une même source peuvent être cohérents et faux.','Un lissage inhabituel peut être un risque de mesure ou de fraude.','Cherche des preuves externes et traite le blocage comme un risque.','Un indicateur calculé sur des données non vérifiées ne résout pas le problème.'],'Vérifier l’existence des actifs, pas seulement les chiffres.');
// CURRENT ISSUES — 8; scenario questions tied to selected 2026 reading objectives.
addExam('current','CI–2','AI: individually effective models and system-wide fragility',
'Several large dealers deploy similar AI trading models trained on overlapping data. Each model cuts risk rapidly after the same volatility signal. Which system-wide concern is most directly illustrated?',
['Better individual forecasts necessarily reduce aggregate market volatility.','Correlated automated responses can amplify selling and liquidity pressure.','Model transparency alone guarantees independent trading decisions.','Using different legal entities eliminates shared model behavior.'],1,
'Des modèles proches peuvent déclencher simultanément des réductions de risque. Une amélioration individuelle de la gestion n’exclut donc pas une amplification collective des ventes et de la tension de liquidité.',
['Un bénéfice individuel ne garantit pas la stabilité collective.','Identifie la réaction commune qui amplifie le choc.','La transparence ne supprime pas les expositions communes.','La dépendance des décisions dépasse les frontières juridiques.'],'Optimiser chacun peut synchroniser tout le marché.');
addExam('current','CI–3','Private credit: funding-cost convergence',
'A researcher studies why business development companies became more competitive with banks. Which combination is consistent with the BIS reading’s explanation for a narrowing cost-of-capital gap?',
['A rise in BDC cost of equity and a fall in BDC leverage.','A fall in BDC cost of equity and a rise in BDC leverage.','A guarantee that every BDC loan has a lower default probability than a bank loan.','The disappearance of all differences in regulatory treatment.'],1,
'Le mécanisme étudié met en avant une baisse relative du coût des fonds propres des BDC et une hausse de leur levier. Cela peut réduire leur coût du capital sans démontrer une supériorité universelle de leurs prêts.',
['Décrit des mouvements opposés au mécanisme mis en avant.','Correspond aux deux canaux de coût du capital analysés.','La compétitivité du financement ne prouve pas une PD plus faible.','Le rapprochement de coût ne signifie pas égalité de réglementation.'],'Coût du capital : coût des fonds propres et structure de financement.');
addExam('current','CI–3','Private credit: specialization versus diversification',
'A private-credit manager specializes in one narrow industry and claims its superior borrower knowledge eliminates the need for portfolio diversification. Which assessment best reflects the economic trade-off?',
['Specialization can improve screening and monitoring but leave substantial common-sector exposure.','Sector expertise makes the default events of all borrowers independent.','Closed-end funding eliminates borrower credit losses.','A broader borrower count guarantees diversification even within one tightly linked industry.'],0,
'La spécialisation peut améliorer la sélection et le suivi tout en laissant une exposition commune au secteur. Multiplier les emprunteurs ne supprime pas cette dépendance économique.',
['Reconnaît le bénéfice informationnel et la concentration résiduelle.','L’expertise du prêteur ne rend pas les chocs sectoriels indépendants.','Une structure fermée réduit certains besoins de remboursement des investisseurs, pas le risque des prêts.','Le nombre de lignes ne mesure pas seul la diversification.'],'Expertise sectorielle et concentration peuvent coexister.');
addExam('current','CI–4','Geopolitical spillovers through exposures',
'A major geopolitical shock occurs abroad. A domestic bank has no branches in the directly affected country but lends to exporters and holds securities of firms with supply-chain exposure there. Which conclusion is most appropriate?',
['The bank has no material channel of exposure because it has no foreign branch.','Only the bank’s direct foreign sovereign holdings can transmit the shock.','Trade and financial links can transmit market, credit and funding stress through indirect exposures.','Geopolitical shocks must affect every country and firm by the same amount.'],2,
'L’absence d’implantation directe n’écarte pas une transmission via clients, chaînes de valeur et portefeuilles. Les effets sur prix, crédit et financement dépendent des expositions et vulnérabilités.',
['Ignore les liens économiques indirects.','Restreint trop les mécanismes de transmission.','Prend en compte la propagation par les réseaux économiques.','Les impacts sont hétérogènes selon les liens et les fragilités.'],'La géographie du risque dépasse celle des agences.');
addExam('current','CI–5','High public debt and monetary–fiscal interactions',
'Inflation is above target while public debt is high and a large share must be refinanced soon. Which risk-management assessment is most consistent with the BIS monetary–fiscal framework?',
['Higher policy rates can raise refinancing pressure; fiscal and financial vulnerabilities can complicate disinflation.','A country issuing its own currency faces no interaction between debt service and inflation policy.','Fiscal support automatically makes monetary tightening unnecessary.','Low historical sovereign spreads guarantee low future refinancing risk.'],0,
'Une hausse des taux peut accroître progressivement le service de la dette lors du refinancement. Des fragilités budgétaires et financières peuvent compliquer le rétablissement de la stabilité des prix ; les politiques doivent être cohérentes.',
['Relie inflation, refinancement et fragilité du bilan public.','L’émission dans sa monnaie ne supprime pas les contraintes macroéconomiques.','Le soutien budgétaire peut aussi entretenir la demande et les pressions inflationnistes.','Un prix historique faible ne garantit pas l’accès futur au marché.'],'Taux, dette et stabilité financière interagissent.');
addExam('current','CI–6','Unbacked crypto: functions and regulatory perimeter',
'An unbacked crypto ecosystem is marketed as decentralized, but most users depend on a centralized exchange for trading and custody. Which policy assessment is most consistent with the IMF reading?',
['Decentralized token issuance makes centralized intermediaries irrelevant.','Traditional financial risks disappear when assets are recorded digitally.','Core service providers can reintroduce trust and concentration risks and warrant risk-based licensing or authorization.','Regulation should depend only on whether an entity uses the word bank.'],2,
'Les intermédiaires peuvent réintroduire des dépendances et des risques de conduite malgré un registre décentralisé. Le cadre doit regarder les fonctions et risques des prestataires, pas seulement leur dénomination.',
['Ignore le point de dépendance réellement utilisé par les clients.','La technologie ne supprime pas les risques économiques et de garde.','Suit une approche fondée sur les fonctions et les risques.','La dénomination ne détermine pas seule les risques créés.'],'Regarder la fonction, pas l’étiquette technologique.');
addExam('current','CI–7','Tokenization: efficiency gains and new frictions',
'A tokenized-asset platform automates servicing and enables programmable settlement. Its sponsor claims that this necessarily decentralizes infrastructure and removes systemic risk. Which qualification is most appropriate?',
['Automation prevents faulty code from affecting financial obligations.','Network effects can concentrate infrastructure, while contingent contracts can transmit shocks.','Reduced intermediation costs prove that legal and liquidity frictions have vanished.','Programmable settlement is incompatible with financial-market efficiency.'],1,
'L’automatisation peut réduire certains coûts sans éliminer tous les risques. Les effets de réseau peuvent concentrer l’infrastructure, et les programmes ou contrats conditionnels peuvent créer de nouvelles chaînes de transmission.',
['Le code peut lui-même être une source de défaillance.','Distingue gains de fonctionnement et nouveaux risques d’interconnexion.','Un coût plus faible ne démontre pas l’absence d’autres frictions.','La programmabilité peut améliorer certains processus.'],'Efficacité accrue ne signifie pas risque systémique nul.');
addExam('current','CI–8','Digital resilience: micro and system-wide protection',
'Each institution in a payment network passes its own cyber-security checklist, yet several depend on a common service whose disruption would halt settlement. Which supervisory approach best addresses the remaining financial-stability concern?',
['Rely only on individual compliance scores because system-wide resilience is their simple average.','Require more capital from one institution and assume service continuity follows automatically.','Assess shared critical dependencies, coordinated disruption scenarios and restoration of essential network services.','Exclude operational interconnections because macroprudential tools concern only credit cycles.'],2,
'Une protection institution par institution ne suffit pas à démontrer la résilience du réseau. L’analyse collective doit examiner dépendances critiques, propagation des perturbations et continuité des services essentiels.',
['Une défaillance commune n’est pas décrite par une moyenne de scores.','Le capital absorbe des pertes mais ne remet pas automatiquement un service en route.','Traite la dimension collective et opérationnelle du risque.','Les interdépendances numériques peuvent avoir un effet systémique.'],'Solide séparément ne signifie pas résilient ensemble.');
const CURRENT_SOURCES={
 'CI–2':'https://www.fsb.org/uploads/P14112024.pdf',
 'CI–3':'https://www.bis.org/publ/qtrpdf/r_qt2503b.pdf',
 'CI–4':'https://www.imf.org/en/Publications/GFSR/Issues/2025/04/22/global-financial-stability-report-april-2025',
 'CI–5':'https://www.bis.org/publications/aer-2023/monetary-fiscal-policy-safeguarding-stability-trust',
 'CI–6':'https://www.imf.org/en/Publications/fintech-notes/Issues/2022/09/26/Regulating-the-Crypto-Ecosystem-The-Case-of-Unbacked-Crypto-Assets-523715',
 'CI–7':'https://www.imf.org/en/Publications/fintech-notes/Issues/2025/01/29/Tokenization-and-Financial-Market-Inefficiencies-561256',
 'CI–8':'https://www.bde.es/f/webbde/GAP/Secciones/Publicaciones/InformesBoletinesRevistas/RevistaEstabilidadFinanciera/22/3_FSR43_Digital.pdf'
};
for(const [i,q]of EXAM_RAW.entries())QUESTIONS.push({...q,id:'e'+String(i+1).padStart(3,'0'),tier:'exam',level:3,source:CURRENT_SOURCES[q.reading]||'https://www.garp.org/landing/frm-learning-objectives'});
