/* Reviewed original learning content; source provenance is recorded separately. */
const DEEP_INVESTMENT={
 "topic": "investment",
 "chapters": [
  {
   "bookChapter": 1,
   "title": "Factor Theory",
   "pdfStart": 14,
   "pdfEnd": 25,
   "readingIds": [
    "IM-1"
   ],
   "status": "matched",
   "difference": "Les six objectifs actuels restent couverts; vérifier les conventions et hypothèses plutôt que mémoriser les exemples historiques."
  },
  {
   "bookChapter": 2,
   "title": "Factors",
   "pdfStart": 26,
   "pdfEnd": 41,
   "readingIds": [
    "IM-2"
   ],
   "status": "matched",
   "difference": "Correspondance thématique et des cinq objectifs. Les statistiques historiques du livre ne sont pas des prévisions."
  },
  {
   "bookChapter": 3,
   "title": "Alpha (and the Low-Risk Anomaly)",
   "pdfStart": 42,
   "pdfEnd": 65,
   "readingIds": [
    "IM-3"
   ],
   "status": "matched",
   "difference": "Les neuf objectifs sont conservés; les régressions et rendements historiques illustrent des méthodes, pas des paramètres actuels."
  },
  {
   "bookChapter": 4,
   "title": "Portfolio Construction",
   "pdfStart": 66,
   "pdfEnd": 81,
   "readingIds": [
    "IM-4"
   ],
   "status": "matched",
   "difference": "Correspondance des neuf objectifs, dont la région de non-transaction et la dispersion."
  },
  {
   "bookChapter": 5,
   "title": "Portfolio Risk: Analytical Methods",
   "pdfStart": 82,
   "pdfEnd": 95,
   "readingIds": [
    "IM-5"
   ],
   "status": "matched",
   "difference": "Correspondance des cinq objectifs. Les approximations marginales doivent être séparées des variations finies."
  },
  {
   "bookChapter": 6,
   "title": "VaR and Risk Budgeting in Investment Management",
   "pdfStart": 96,
   "pdfEnd": 107,
   "readingIds": [
    "IM-6"
   ],
   "status": "matched",
   "difference": "Correspondance des huit objectifs. Les montants et systèmes historiques sont illustratifs."
  },
  {
   "bookChapter": 7,
   "title": "Risk Monitoring and Performance Measurement",
   "pdfStart": 108,
   "pdfEnd": 129,
   "readingIds": [],
   "status": "supplementary",
   "difference": "Cette lecture 2024 ne figure plus comme lecture autonome dans la liste 2026 fournie; utile seulement en complément de IM-6 et IM-7."
  },
  {
   "bookChapter": 8,
   "title": "Portfolio Performance Evaluation",
   "pdfStart": 130,
   "pdfEnd": 159,
   "readingIds": [
    "IM-7"
   ],
   "status": "matched",
   "difference": "Correspondance des neuf objectifs actuels. Les exercices du livre ont été examinés pour les mécanismes de pièges mais ne sont pas reproduits."
  },
  {
   "bookChapter": 9,
   "title": "Hedge Funds",
   "pdfStart": 160,
   "pdfEnd": 199,
   "readingIds": [
    "IM-8",
    "IM-9"
   ],
   "status": "partial",
   "difference": "Le texte 2024 traite les styles et les risques de financement; il ne remplace pas les deux lectures 2026 distinctes sur stratégies, réglementation et organisation."
  },
  {
   "bookChapter": 10,
   "title": "Performing Due Diligence on Specific Managers and Funds",
   "pdfStart": 200,
   "pdfEnd": 213,
   "readingIds": [
    "IM-12"
   ],
   "status": "matched",
   "difference": "Correspondance des sept objectifs; le questionnaire doit être vérifié par des preuves indépendantes et un suivi."
  },
  {
   "bookChapter": 11,
   "title": "Predicting Fraud by Investment Managers",
   "pdfStart": 214,
   "pdfEnd": 241,
   "readingIds": [],
   "status": "supplementary",
   "difference": "Lecture 2024 absente comme lecture autonome 2026. Ne pas la confondre avec IM-14 consacré aux signaux Madoff; la prédiction statistique ne constitue pas une preuve de fraude."
  }
 ],
 "guides": [
  {
   "readingId": "IM-1",
   "title": "Pricer le risque qui compte",
   "principles": [
    "Une prime rémunère une exposition aux états défavorables pour les investisseurs; la volatilité isolée ne suffit pas à expliquer le prix.",
    "Le CAPM est un modèle d’équilibre à un facteur. Une diversification accrue retire le risque spécifique mais laisse le risque systématique.",
    "Le facteur d’actualisation stochastique donne davantage de poids aux paiements utiles dans les mauvais états. Le choix du modèle de risque conditionne toute conclusion sur une inefficience."
   ],
   "recallPrompts": [
    "Explique pourquoi une assurance peut avoir un rendement espéré inférieur au taux sans risque.",
    "Quelles hypothèses permettent à tous les investisseurs de détenir le même portefeuille risqué?",
    "Pourquoi rejeter le CAPM ne démontre-t-il pas, à lui seul, une inefficience du marché?"
   ],
   "traps": [
    {
     "mistake": "Assimiler risque à écart-type",
     "correction": "Comparer la covariance des paiements avec les mauvais états.",
     "check": "Dans quel état ce titre paie-t-il?"
    },
    {
     "mistake": "Additionner taux sans risque et primes sur les mauvais rendements",
     "correction": "Les facteurs doivent être exprimés en rendements excédentaires ou en primes cohérentes.",
     "check": "Ai-je retranché le taux sans risque deux fois?"
    }
   ],
   "worked": {
    "prompt": "Un titre verse 100 dans deux états équiprobables; le SDF vaut 0, 8 ou 1, 1. Quel est son prix?",
    "steps": [
     "Calculer \\(E[m]=(0.8+1.1)/2=0.95\\).",
     "Le paiement est certain: \\(P=100E[m]=95\\).",
     "Le taux sans risque implicite est \\(100/95-1=5.263\\%\\)."
    ],
    "result": "Prix 95; rendement certain 5, 263%.",
    "check": "Un paiement certain doit donner le même taux dans tous les états."
   },
   "formulas": [
    {
     "name": "Valorisation par SDF",
     "tex": "P_0=\\mathbb E[mX_1]",
     "variables": "m: facteur stochastique; X: paiement futur; P: prix présent.",
     "assumptions": "Probabilités réelles et SDF cohérents avec le numéraire.",
     "trap": "Ne pas remplacer une espérance de produit par le produit des espérances."
    },
    {
     "name": "Prime CAPM",
     "tex": "\\mathbb E[R_i]-R_f=\\beta_i\\big(\\mathbb E[R_M]-R_f\\big)",
     "variables": "Bêta: covariance avec le marché divisée par variance du marché.",
     "assumptions": "CAPM à une période avec hypothèses d’équilibre.",
     "trap": "La volatilité totale ne remplace pas le bêta."
    }
   ],
   "prerequisites": [],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 1,
    "pdfPages": [
     14,
     25
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-2",
   "title": "Lire les facteurs comme des risques",
   "principles": [
    "Une variable macroéconomique surprenante peut déplacer les prix; son niveau déjà anticipé ne constitue pas une nouvelle information.",
    "Un portefeuille factoriel est une règle de détention et de rééquilibrage; un simple attribut comptable ne garantit pas une exposition constante.",
    "Value et momentum peuvent se compléter mais comportent des phases de pertes distinctes. Une protection de volatilité a un coût, et une vente de volatilité peut masquer un risque de catastrophe."
   ],
   "recallPrompts": [
    "Distingue caractéristique value et bêta sur un facteur value.",
    "Pourquoi une hausse anticipée de l’inflation ne produit-elle pas nécessairement un choc de prix?",
    "Comment un retournement brutal des anciens perdants affecte-t-il une stratégie momentum?"
   ],
   "traps": [
    {
     "mistake": "Appeler prime toute performance passée",
     "correction": "Identifier compensation du risque, comportement et frictions.",
     "check": "Quelle explication concurrente resterait possible?"
    },
    {
     "mistake": "Confondre achat de VIX futures et détention du VIX au comptant",
     "correction": "Le contrat à terme a une maturité et un coût de roulement.",
     "check": "Quelle exposition concrète achète-t-on?"
    }
   ],
   "worked": {
    "prompt": "Un portefeuille a une prime de marché attendue 4%, un bêta marché 0, 7, un bêta value 0, 6 et une prime value 2%. Quel excès de rendement le modèle prévoit-il?",
    "steps": [
     "Contribution marché: \\(0.7\\times4\\%=2.8\\%\\).",
     "Contribution value: \\(0.6\\times2\\%=1.2\\%\\).",
     "Addition: \\(2.8\\%+1.2\\%=4\\%\\)."
    ],
    "result": "4% de rendement excédentaire annuel.",
    "check": "Les primes et les coefficients doivent partager le même horizon."
   },
   "formulas": [
    {
     "name": "Modèle multifactoriel",
     "tex": "\\mathbb E[R_i]-R_f=\\sum_k\\beta_{ik}\\lambda_k",
     "variables": "Bêtas: sensibilités; lambda: primes factorielles.",
     "assumptions": "Facteurs et primes mesurés selon des conventions compatibles.",
     "trap": "Un bêta peut varier avec le régime."
    }
   ],
   "prerequisites": [
    "IM-1"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 2,
    "pdfPages": [
     26,
     41
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-3",
   "title": "Distinguer talent, facteurs et estimation",
   "principles": [
    "Un benchmark choisi avant l’évaluation et cohérent avec le mandat donne du sens à l’alpha; une régression peut encore manquer des risques non linéaires.",
    "La loi fondamentale raisonne en paris indépendants et informations réellement transférées en positions, pas en nombre brut de titres.",
    "Les contraintes d’emprunt et les incitations benchmark peuvent rendre les hauts bêtas chers. Le faible risque historique ne garantit pas une faible perte future."
   ],
   "recallPrompts": [
    "Pourquoi 100 actions d’un même pari macro ne donnent-elles pas 100 paris indépendants?",
    "Comment distinguer anomalie de bêta et anomalie de volatilité totale?",
    "Que devient un alpha quand on ajoute un facteur omis auquel le fonds est positivement exposé?"
   ],
   "traps": [
    {
     "mistake": "Traiter alpha ex post et talent comme synonymes",
     "correction": "Chercher benchmark approprié, précision statistique et risques omis.",
     "check": "Quel risque est vendu?"
    },
    {
     "mistake": "Multiplier les titres pour gonfler la breadth",
     "correction": "Compter les décisions économiquement indépendantes.",
     "check": "Quels paris s’effondrent ensemble?"
    }
   ],
   "worked": {
    "prompt": "Une équipe peut exécuter 25 décisions indépendantes avec IC 0, 08. Quel IR la version simplifiée prévoit-elle?",
    "steps": [
     "Identifier \\(BR=25\\), et non le nombre de titres détenus.",
     "\\(IR\\approx IC\\sqrt{BR}=0.08\\times5=0.40\\).",
     "Ce chiffre suppose un transfert sans contraintes ni coûts."
    ],
    "result": "IR 0, 40 théorique.",
    "check": "Si les décisions se corrèlent davantage, la même précision ne conserve pas cet IR."
   },
   "formulas": [
    {
     "name": "Loi fondamentale simplifiée",
     "tex": "IR\\approx IC\\sqrt{BR}",
     "variables": "IC: corrélation prévision/résultat; BR: paris indépendants annuels.",
     "assumptions": "Précision stable, paris indépendants, implémentation idéale.",
     "trap": "Nombre de lignes ne signifie pas nombre de paris indépendants."
    },
    {
     "name": "Alpha de régression",
     "tex": "R_{p,t}-R_{f,t}=\\alpha+\\boldsymbol\\beta^\\top\\mathbf f_t+\\varepsilon_t",
     "variables": "f: rendements factoriels; alpha: intercept.",
     "assumptions": "Spécification, horizon et estimations adaptés.",
     "trap": "L’intercept peut capter des facteurs omis ou un payoff non linéaire."
    }
   ],
   "prerequisites": [
    "IM-1",
    "IM-2"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 3,
    "pdfPages": [
     42,
     65
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-4",
   "title": "Construire après coûts et contraintes",
   "principles": [
    "Les prévisions brutes demandent calibration et traitement des extrêmes. Le centrage de leur moyenne et la neutralisation du risque benchmark sont distincts: cette dernière tient compte des bêtas.",
    "Une région de non-transaction évite de payer pour des déplacements dont le gain marginal n’excède pas les coûts. Avec coûts linéaires, le retour à la frontière peut suffire.",
    "Le choix entre screening, stratification et optimisation dépend de la fiabilité des entrées. La dispersion entre comptes peut être le prix rationnel des coûts et contraintes propres à chaque compte."
   ],
   "recallPrompts": [
    "Comment associer alpha du benchmark et bêta pour neutraliser les alphas? Pourquoi un simple centrage ne suffit-il pas toujours?",
    "Pourquoi trader jusqu’à la cible parfaite peut-il détruire de la valeur?",
    "Quels risques un simple classement par alpha peut-il laisser concentrés?"
   ],
   "traps": [
    {
     "mistake": "Confondre centrage de moyenne et neutralisation du risque benchmark",
     "correction": "Le centrage pondéré annule une moyenne; la neutralisation benchmark ajuste aussi par les bêtas.",
     "check": "Quel objectif exact est demandé: moyenne nulle ou risque benchmark neutre?"
    },
    {
     "mistake": "Confondre optimum sans coûts et meilleure transaction",
     "correction": "Comparer le bénéfice marginal au coût marginal.",
     "check": "Quel gain reste après les deux jambes du trade?"
    }
   ],
   "worked": {
    "prompt": "Au poids courant, l’utilité avant coût croît de 0, 004 par point de poids acheté. Le coût d’achat marginal est 0, 006. Faut-il acheter?",
    "steps": [
     "Conserver la même unité: utilité marginale par unité de poids.",
     "Le bénéfice net marginal est \\(0.004-0.006=-0.002\\).",
     "Une petite augmentation détruit de la valeur; aucun achat local n’est optimal."
    ],
    "result": "Rester dans la région de non-transaction.",
    "check": "Une baisse du coût ou un signal plus fort pourrait changer cette décision."
   },
   "formulas": [
    {
     "name": "Centrage pondéré des prévisions",
     "tex": "\\widetilde\\alpha_i=\\alpha_i-\\sum_j b_j\\alpha_j",
     "variables": "b: poids du benchmark totalisant 1.",
     "assumptions": "Opération de centrage de moyenne, pas une neutralisation générale des risques.",
     "trap": "Une moyenne nulle ne garantit pas des facteurs de risque neutres."
    },
    {
     "name": "Neutralisation du benchmark",
     "tex": "\\alpha_i^{BN}=\\alpha_i-\\beta_{i,B}\\alpha_B,\\qquad \\alpha_B=\\sum_j b_j\\alpha_j",
     "variables": "B: benchmark; bêta du titre par rapport àB; alphaB: alpha pondéré du benchmark.",
     "assumptions": "Bêta du benchmark par rapport à lui-même égal 1; conventions de modèle cohérentes.",
     "trap": "Ne pas remplacer les bêtas par 1 sans justification."
    },
    {
     "name": "Condition de non-transaction",
     "tex": "-c_{\\rm sell}\\leq g(x_0)\\leq c_{\\rm buy}",
     "variables": "g: utilité marginale avant coûts au poids actuel.",
     "assumptions": "Coûts linéaires; optimum local concave; mêmes unités.",
     "trap": "Utiliser des coûts aller-retour sans vérifier le sens de la transaction."
    }
   ],
   "prerequisites": [
    "IM-3",
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 4,
    "pdfPages": [
     66,
     81
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-5",
   "title": "Du risque marginal à la bonne décision",
   "principles": [
    "La VaR marginale est une dérivée locale; la contribution composante est la dérivée multipliée par la position. La variation exacte d’une transaction finie exige une nouvelle évaluation.",
    "Le signe de la corrélation qui protège dépend du signe des positions: pour un long–short, une forte corrélation positive peut réduire le risque.",
    "Minimiser la variance et maximiser un ratio rendement/risque sont deux objectifs distincts; une couverture efficace peut réduire le rendement attendu."
   ],
   "recallPrompts": [
    "Que mesure chacune des unités de VaR individuelle, marginale, composante et incrémentale?",
    "Pourquoi supprimer une composante négative peut-il augmenter la VaR?",
    "Quelle covariance entre le portefeuille et la couverture permet une position de couverture positive?"
   ],
   "traps": [
    {
     "mistake": "Confondre contribution actuelle et effet d’une suppression entière",
     "correction": "La suppression est une variation finie; recalculer le risque.",
     "check": "La dérivée a-t-elle été utilisée très loin du point initial?"
    },
    {
     "mistake": "Chercher systématiquement une corrélation négative",
     "correction": "Tenir compte du signe des positions.",
     "check": "Suis-je long les deux jambes ou long–short?"
    }
   ],
   "worked": {
    "prompt": "Un P&L initial P et un hedge H ont covariance −12 et variance de H égale 9. Quelle quantité de H minimise la variance de P+xH?",
    "steps": [
     "Écrire \\(\\operatorname{Var}(P+xH)=\\operatorname{Var}(P)+2x\\operatorname{Cov}(P,H)+x^2\\operatorname{Var}(H)\\).",
     "Annuler la dérivée: \\(2(-12)+2x(9)=0\\).",
     "On obtient \\(x^*=12/9=1.333\\)."
    ],
    "result": "Acheter 1, 333 unité du hedge.",
    "check": "La dérivée seconde est positive et la variance au minimum ne doit pas être négative."
   },
   "formulas": [
    {
     "name": "Couverture minimum-variance",
     "tex": "x^*=-\\frac{\\operatorname{Cov}(P,H)}{\\operatorname{Var}(H)}",
     "variables": "P, H: P&L par unité cohérente; x: quantité du hedge.",
     "assumptions": "Variance de H positive, quantité libre, covariance stable.",
     "trap": "Ne pas inverser covariance et variance, ni oublier le signe."
    },
    {
     "name": "Euler et variation locale",
     "tex": "RC_i=x_i\\frac{\\partial\\rho}{\\partial x_i},\\qquad\\Delta\\rho\\approx\\nabla\\rho^\\top\\Delta x",
     "variables": "rho: mesure de risque; x: positions.",
     "assumptions": "Euler exact si homogène de degré 1 et différentiable; delta local seulement.",
     "trap": "Une contribution composante n’est pas la variation exacte d’une suppression."
    }
   ],
   "prerequisites": [
    "IM-1"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 5,
    "pdfPages": [
     82,
     95
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-6",
   "title": "Allouer le risque du fonds entier",
   "principles": [
    "Une allocation de capital ne donne pas une allocation de risque sans les volatilités et les covariances.",
    "Un passif de pension ou la fragilité du sponsor peuvent dominer une bonne performance des actifs. Examiner les variations du surplus et les besoins de financement.",
    "Les limites doivent suivre les expositions économiques et les horizons de liquidation, y compris dérivés et financement; la VaR reste un élément d’un dispositif plus large."
   ],
   "recallPrompts": [
    "Pourquoi une couverture des engagements peut-elle augmenter la volatilité des actifs tout en protégeant le fonds?",
    "Comment répartir le risque entre deux gérants indépendants dont les IR diffèrent?",
    "Quand faut-il distinguer risque de politique d’allocation et risque actif?"
   ],
   "traps": [
    {
     "mistake": "Additionner des budgets autonomes comme s’ils étaient des contributions Euler",
     "correction": "Inclure les corrélations et préciser la convention du budget.",
     "check": "Les composantes du rapport somment-elles réellement au total?"
    },
    {
     "mistake": "Évaluer les actifs sans les engagements",
     "correction": "Construire le surplus et les flux requis.",
     "check": "Quel résultat oblige à appeler du cash?"
    }
   ],
   "worked": {
    "prompt": "Deux gérants indépendants ont les IR 0, 3 et 0, 4. Quel IR maximal donne leur combinaison sans contraintes?",
    "steps": [
     "La règle d’agrégation optimale est \\(IR_{max}=\\sqrt{IR_1^2+IR_2^2}\\).",
     "\\(\\sqrt{0.09+0.16}=0.50\\).",
     "Les budgets de risque autonome sont proportionnels aux IR, pas nécessairement les poids de capital."
    ],
    "result": "IR théorique 0, 50.",
    "check": "Cette agrégation suppose des rendements actifs non corrélés et des paramètres fiables."
   },
   "formulas": [
    {
     "name": "Risque de surplus",
     "tex": "\\operatorname{Var}(A-L)=\\sigma_A^2+\\sigma_L^2-2\\operatorname{Cov}(A,L)",
     "variables": "A, L: variations de valeur d’actifs et de passifs.",
     "assumptions": "Même horizon, même monnaie, mesure des flux cohérente.",
     "trap": "Une baisse du passif ne constitue pas une perte du surplus."
    },
    {
     "name": "Combinaison de gérants indépendants",
     "tex": "IR_{\\max}=\\sqrt{\\sum_i IR_i^2}",
     "variables": "IR individuels avec positions optimalement dimensionnées.",
     "assumptions": "Rendements actifs indépendants; pas de contraintes ni coûts.",
     "trap": "L’indépendance des noms de gérants ne prouve pas celle des risques."
    }
   ],
   "prerequisites": [
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 6,
    "pdfPages": [
     96,
     107
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-7",
   "title": "Attribuer et tester la performance",
   "principles": [
    "Le rendement pondéré par le temps isole les sous-périodes séparées par les flux; le rendement monétaire reflète la taille et le timing des sommes engagées.",
    "Un indicateur exige un dénominateur cohérent avec la décision: risque total pour un portefeuille complet, bêta pour une exposition diversifiée, tracking error pour un mandat actif.",
    "Une attribution doit réconcilier le rendement actif. Une significativité doit tenir compte de la dépendance temporelle et des risques omis."
   ],
   "recallPrompts": [
    "Comment vérifier qu’une attribution allocation–sélection–interaction réconcilie le résultat total?",
    "Pourquoi un bon pourcentage global de prévisions de marché correctes peut-il cacher une absence de talent?",
    "Comment l’autocorrélation affecte-t-elle l’erreur standard d’un alpha?"
   ],
   "traps": [
    {
     "mistake": "Additionner sélection au poids portefeuille et interaction séparément",
     "correction": "Choisir une décomposition cohérente; sinon l’interaction est comptée deux fois.",
     "check": "La somme égale-t-elle le rendement actif?"
    },
    {
     "mistake": "Utiliser une erreur standard iid sur des rendements autocorrélés",
     "correction": "Employer une estimation robuste adaptée et examiner la source de la dépendance.",
     "check": "Les observations constituent-elles vraiment des répétitions indépendantes?"
    }
   ],
   "worked": {
    "prompt": "Un fonds surpondère un secteur de 10 points. Le secteur de référence rapporte 6%, le benchmark total 4%, et les titres choisis 8%. Calculer allocation, sélection et interaction avec poids benchmark 20% et portefeuille 30%.",
    "steps": [
     "Allocation BF: \\((0.30-0.20)(0.06-0.04)=0.002\\).",
     "Sélection: \\(0.20(0.08-0.06)=0.004\\).",
     "Interaction: \\((0.30-0.20)(0.08-0.06)=0.002\\)."
    ],
    "result": "0, 2point+0, 4point+0, 2point =0, 8point de contribution sectorielle active.",
    "check": "Employer les mêmes définitions pour toutes les lignes du rapport."
   },
   "formulas": [
    {
     "name": "Attribution Brinson–Fachler",
     "tex": "A_j=(w_{p,j}-w_{b,j})(R_{b,j}-R_b),\\quad S_j=w_{b,j}(R_{p,j}-R_{b,j}),\\quad I_j=(w_{p,j}-w_{b,j})(R_{p,j}-R_{b,j})",
     "variables": "Poids initiaux; rendements sectoriels; Rb: rendement total benchmark.",
     "assumptions": "Une période; poids exhaustifs; même devise; convention à trois termes.",
     "trap": "Ne pas ajouter I si la sélection utilise déjà le poids portefeuille."
    },
    {
     "name": "Prévision conditionnelle de timing",
     "tex": "\\theta=p_{\\rm bull}+p_{\\rm bear}-1",
     "variables": "Probabilités de bien prévoir chaque régime conditionnellement.",
     "assumptions": "Modèle binaire de timing avec définitions de régimes fixes.",
     "trap": "Une bonne fréquence globale peut venir du régime le plus fréquent."
    }
   ],
   "prerequisites": [
    "IM-3",
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 8,
    "pdfPages": [
     130,
     159
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-8",
   "title": "Décomposer les arbitrages et leurs queues",
   "principles": [
    "Une stratégie porte un mécanisme précis: direction macro, suivi de tendance, spread de fusion, option convertible ou rang dans une restructuration.",
    "La neutralité delta est locale: gamma, volatilité, crédit, financement et emprunt de titres peuvent rester exposés.",
    "Un profit conditionnel à la réalisation d’un événement n’est pas certain. Les pertes lorsque l’événement échoue doivent être reliées au scénario de marché et au financement."
   ],
   "recallPrompts": [
    "Quels risques restent après une couverture delta d’une convertible?",
    "Comment une fusion payée en actions diffère-t-elle d’une fusion payée en cash?",
    "Pourquoi un trend follower peut-il perdre dans un marché volatile qui oscille sans tendance?"
   ],
   "traps": [
    {
     "mistake": "Qualifier tout spread d’arbitrage sans risque",
     "correction": "Lister événement, rang, financement et besoin de marge.",
     "check": "Quelle hypothèse peut faire disparaître la convergence?"
    },
    {
     "mistake": "Confondre neutralité initiale et couverture permanente",
     "correction": "Réévaluer les sensibilités et le coût de réajustement.",
     "check": "Les deltas ont-ils changé?"
    }
   ],
   "worked": {
    "prompt": "Une position de convertibles a un delta équivalent à 12000 actions. Une hausse du spot ajoute 4000 actions de delta; la position courte reste 12000. Quelle transaction rétablit la neutralité?",
    "steps": [
     "Le nouveau delta long est 16000 actions.",
     "Delta net: \\(16000-12000=4000\\) actions.",
     "Vendre 4000 actions supplémentaires si la couverture reste autorisée et financée."
    ],
    "result": "Short supplémentaire de 4000 actions.",
    "check": "Vérifier coûts d’emprunt et autres sensibilités avant d’assimiler cela à une couverture complète."
   },
   "formulas": [
    {
     "name": "Gain espéré d’une fusion cash",
     "tex": "\\mathbb E[\\Pi]=p(V_{\\rm success}-P)+(1-p)(V_{\\rm fail}-P)",
     "variables": "p: probabilité réelle sous hypothèses données; P: prix payé.",
     "assumptions": "Résolution à l’horizon indiqué, sans coûts ni actualisation sauf mention.",
     "trap": "Probabilité de break-even et probabilité réelle de succès sont distinctes."
    }
   ],
   "prerequisites": [
    "IM-1",
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 9,
    "pdfPages": [
     160,
     199
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-9",
   "title": "Voir le risque au-delà du véhicule",
   "principles": [
    "Le risque de l’investisseur combine actifs, passifs du fonds, contreparties, valorisations et gouvernance. Une position nette faible peut cacher un bilan brut important.",
    "Des fonds séparés peuvent vendre les mêmes actifs au même moment si leurs financeurs imposent des marges communes. Le suivi systémique exige des expositions consolidées.",
    "Un montage master–feeder mutualise l’exécution tout en accueillant différentes catégories d’investisseurs; il ne rend pas les risques économiques indépendants."
   ],
   "recallPrompts": [
    "Que manque-t-il à une exposition nette pour décrire le risque de financement?",
    "Pourquoi des prime brokers différents ne garantissent-ils pas une indépendance des risques?",
    "Quels avantages organisationnels peut apporter le master–feeder, sans supprimer les besoins de due diligence?"
   ],
   "traps": [
    {
     "mistake": "Utiliser le net comme mesure complète du levier",
     "correction": "Examiner brut, dérivés, haircuts et termes de financement.",
     "check": "Combien de cash faut-il si les deux jambes demandent de la marge?"
    },
    {
     "mistake": "Traiter l’enregistrement comme garantie de placement",
     "correction": "La réglementation et la supervision ne remplacent pas l’évaluation du risque.",
     "check": "Quels contrôles et quelles données sont réellement disponibles?"
    }
   ],
   "worked": {
    "prompt": "Un fonds avec NAV 100 porte un long 300 et un short 280. Calculer expositions nette et brute rapportées à la NAV.",
    "steps": [
     "Net: \\((300-280)/100=20\\%\\).",
     "Brut: \\((300+280)/100=580\\%\\).",
     "Un faible net ne résume pas le risque de liquidité des deux jambes."
    ],
    "result": "20% net; 580% brut.",
    "check": "Ne pas soustraire le short dans la mesure brute."
   },
   "formulas": [
    {
     "name": "Expositions brute et nette simples",
     "tex": "L_{gross}=\\frac{|L|+|S|}{NAV},\\qquad L_{net}=\\frac{L-S}{NAV}",
     "variables": "L et S: notionnels long et short positifs; NAV: capital.",
     "assumptions": "Mesure simplifiée pour positions au comptant; dérivés à traiter séparément.",
     "trap": "Le brut n’est pas une mesure complète du risque et le net peut masquer le financement."
    }
   ],
   "prerequisites": [
    "IM-8"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-10",
   "title": "Private credit: cash, valorisation et connexions",
   "principles": [
    "Le prêt privé peut apporter une solution négociée à des emprunteurs peu servis par les marchés publics; son rendement doit être comparé à des risques de crédit, de structure et de liquidité compatibles.",
    "Une hausse des taux peut augmenter le coupon du prêteur et simultanément fragiliser la capacité de paiement d’un emprunteur à taux variable. Le revenu comptable n’est pas toujours du cash.",
    "Les liens avec banques, assureurs et investisseurs passent par plusieurs couches de financement. Les valorisations espacées peuvent retarder la reconnaissance des pertes."
   ],
   "recallPrompts": [
    "Pourquoi un coupon flottant plus élevé peut-il dégrader le crédit?",
    "Comment distinguer coupon cash, PIK et rendement total?",
    "Quels financements relient un fonds fermé au système bancaire même sans rachats quotidiens?"
   ],
   "traps": [
    {
     "mistake": "Interpréter stabilité des marks comme stabilité économique",
     "correction": "Tester sensibilité des emprunteurs et valorisations indépendantes.",
     "check": "Les transactions récentes confirment-elles les valeurs?"
    },
    {
     "mistake": "Conclure absence de risque de liquidité parce que le fonds est fermé",
     "correction": "Inclure appels de marge, lignes et besoins de cash des investisseurs.",
     "check": "Quels contrats exigent du cash avant la réalisation des actifs?"
    }
   ],
   "worked": {
    "prompt": "Un fonds détient un portefeuille privé valorisé 100 financé par 60 de dette et 40 de fonds propres. La valeur des prêts baisse 20%, tandis que la dette reste 60. Ignorer les autres flux. Quelle perte frappe la NAV?",
    "steps": [
     "Valeur des actifs après décote: \\(100(1-0.20)=80\\).",
     "NAV après choc: \\(80-60=20\\), contre 40 initialement.",
     "Perte de la NAV: \\((20-40)/40=-50\\%\\), pour une perte d’actifs de 20%."
    ],
    "result": "Le levier transforme une baisse de 20% des actifs en perte de 50% de NAV.",
    "check": "La valeur de la dette et les coûts sont supposés constants; des appels de garantie pourraient ajouter un besoin de cash."
   },
   "formulas": [
    {
     "name": "Couverture des intérêts cash",
     "tex": "ICR=\\frac{\\text{cash earnings available}}{\\text{cash interest}}",
     "variables": "Résultat disponible et intérêts sur la même période.",
     "assumptions": "Mesure illustrative; définir précisément EBITDA/cash-flow et exclusions.",
     "trap": "Un intérêt capitalisé peut accroître la créance sans générer de cash reçu."
    }
   ],
   "prerequisites": [
    "CR-1",
    "IM-11"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-11",
   "title": "Private markets: timing, engagements et frais",
   "principles": [
    "La structure privée échange souvent liquidité et contrôle contre un horizon long. Les engagements non appelés restent des obligations de financement potentielles.",
    "IRR, multiple de capital et PME répondent à des questions différentes. L’IRR est sensible au timing et au financement; un multiple ignore le temps; un PME dépend du benchmark choisi.",
    "La co-investissement peut réduire les frais mais concentrer le risque et laisser moins de temps de vérification. L’intermédiation apporte une équipe et un accès, au prix de frais et de risques de sélection."
   ],
   "recallPrompts": [
    "Pourquoi deux fonds ayant le même multiple peuvent-ils avoir des IRR différents?",
    "Comment une ligne de souscription peut-elle changer l’IRR net de l’investisseur sans améliorer le portefeuille sous-jacent?",
    "Quels scénarios doivent accompagner un engagement lorsque les distributions attendues sont cycliques?"
   ],
   "traps": [
    {
     "mistake": "Comparer des multiples sans dates de flux",
     "correction": "Compléter par une mesure tenant compte du temps et un benchmark pertinent.",
     "check": "Quand les fonds ont-ils été engagés et rendus?"
    },
    {
     "mistake": "Traiter les distributions prévues comme certaines pour financer les appels",
     "correction": "Stresser retards de distributions et appels accélérés ensemble.",
     "check": "Que reste-t-il si les distributions disparaissent?"
    }
   ],
   "worked": {
    "prompt": "Un investisseur verse 100 maintenant et reçoit 150 dans trois ans. Le benchmark monte de 100 à 125 sur la même période. Calculer le PME simplifié à flux unique.",
    "steps": [
     "Valeur de l’investissement benchmark à l’horizon: \\(100\\times1.25=125\\).",
     "Rapport des valeurs terminales: \\(150/125=1.20\\).",
     "Le multiple privé 1, 50 ne s’interprète pas comme une surperformance annualisée de 50%."
    ],
    "result": "PME 1, 20 dans ce cas simplifié.",
    "check": "Plusieurs flux exigent de respecter leurs dates et les valeurs du benchmark à ces dates."
   },
   "formulas": [
    {
     "name": "Multiple de capital",
     "tex": "MOIC=\\frac{\\text{distributions}+NAV_{\\rm residual}}{\\text{paid-in capital}}",
     "variables": "Montants bruts ou nets précisés; NAV résiduelle estimée.",
     "assumptions": "Même périmètre de frais et mêmes investisseurs.",
     "trap": "Ce ratio ne contient aucune durée."
    },
    {
     "name": "PME à un versement et une sortie",
     "tex": "PME=\\frac{D_T}{C_0(I_T/I_0)}",
     "variables": "C: capital versé; D: sortie finale; I: indice pertinent.",
     "assumptions": "Un flux initial, une sortie finale, aucun flux intermédiaire.",
     "trap": "Ne pas appliquer cette formule simplifiée à des calendriers complexes."
    }
   ],
   "prerequisites": [
    "IM-7"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-12",
   "title": "Chercher des preuves vérifiables",
   "principles": [
    "La due diligence relie promesse de stratégie, compétences, moyens et limites de capacité. Une performance passée d’une autre organisation doit être attribuée et reproductible.",
    "Les contrôles d’exploitation doivent séparer valorisation, trading, garde et réconciliation. Des états audités ne remplacent pas les confirmations et le suivi courant.",
    "Le modèle économique de la société de gestion compte: une équipe dépendante de commissions de performance peut devenir fragile après retraits ou baisse des actifs."
   ],
   "recallPrompts": [
    "Quelles preuves demander pour vérifier qui a réellement produit une performance passée?",
    "Pourquoi joindre soi-même le prestataire par un contact confirmé?",
    "Quels coûts demeurent après une chute des encours et quelle pression cela crée-t-il?"
   ],
   "traps": [
    {
     "mistake": "Prendre un beau questionnaire pour preuve de fonctionnement",
     "correction": "Demander processus, responsables, échantillons et escalades réelles.",
     "check": "Puis-je retracer une anomalie récente jusqu’à sa résolution?"
    },
    {
     "mistake": "Confondre administrateur connu et mandat suffisant",
     "correction": "Vérifier directement ce que le prestataire calcule et contrôle.",
     "check": "Confirme-t-il les actifs ou recopie-t-il les prix du gérant?"
    }
   ],
   "worked": {
    "prompt": "Une société de gestion reçoit 1% sur 300m d’encours et supporte 2, 4m de coûts fixes. Après 30% de retraits, les coûts ne changent pas. Quel déficit annuel avant commissions de performance?",
    "steps": [
     "Encours restants: \\(300(1-0.30)=210\\)m.",
     "Revenus récurrents: \\(210\\times1\\%=2.1\\)m.",
     "Déficit: \\(2.4-2.1=0.3\\)m."
    ],
    "result": "Déficit 0, 3m avant commission de performance.",
    "check": "L’analyse doit aussi examiner trésorerie, engagements et capacité à retenir les équipes."
   },
   "formulas": [
    {
     "name": "Encours au point mort",
     "tex": "AUM_{BE}=\\frac{\\text{fixed operating cost}}{\\text{net recurring fee rate}}",
     "variables": "Taux de frais net des rabais et partages; coûts de même période.",
     "assumptions": "Modèle simplifié sans autres recettes ni coûts variables.",
     "trap": "Le résultat dépend du taux réellement conservé et de la rigidité des coûts."
    }
   ],
   "prerequisites": [
    "IM-8",
    "IM-9"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 10,
    "pdfPages": [
     200,
     213
    ]
   },
   "topic": "investment"
  },
  {
   "readingId": "IM-13",
   "title": "Diagnostiquer la détresse avant de choisir le remède",
   "principles": [
    "Une entreprise peut être rentable mais manquer de cash avant l’encaissement de ses créances. Distinguer décalage de liquidité, surendettement durable et activité non viable.",
    "Un remède doit préserver la valeur: rééchelonnement, apport de capital, cession ou restructuration n’ont pas les mêmes effets sur liquidité, contrôle et priorité.",
    "La fragmentation des créanciers et les procédures peuvent bloquer une solution économiquement souhaitable. Les droits dépendent des contrats et des juridictions; un exercice doit énoncer ses hypothèses."
   ],
   "recallPrompts": [
    "Quelle donnée manque si l’on connaît seulement l’EBITDA d’une entreprise en difficulté?",
    "Quand une cession résout-elle un problème de timing et quand détruit-elle trop de valeur?",
    "Pourquoi une valeur going-concern supérieure à la dette ne garantit-elle pas un accord rapide?"
   ],
   "traps": [
    {
     "mistake": "Prendre EBITDA positif pour preuve de solvabilité immédiate",
     "correction": "Construire les échéances de cash et la disponibilité du financement.",
     "check": "Le paiement arrive-t-il avant la dette due?"
    },
    {
     "mistake": "Appliquer une règle juridique universelle à tout pays",
     "correction": "Lire contrats, sûretés, reconnaissance et hypothèses de procédure.",
     "check": "Quel droit donne priorité à cette créance?"
    }
   ],
   "worked": {
    "prompt": "Une firme a 6m de cash, doit payer 10m dans une semaine et encaissera 8m dans un mois. Ignorer les autres flux. Quel financement relais minimal évite le défaut de paiement immédiat?",
    "steps": [
     "Cash immédiatement disponible:6m.",
     "Échéance avant les encaissements:10m.",
     "Besoin minimum \\(10-6=4\\)m, sous réserve d’une solution finançable et de coûts."
    ],
    "result": "4m de bridge avant coûts; l’encaissement futur ne paie pas l’échéance présente.",
    "check": "La capacité de rembourser le bridge reste à tester ensuite."
   },
   "formulas": [
    {
     "name": "Besoin cumulé de liquidité",
     "tex": "B=\\max_t\\left[\\text{cumulative outflows}_t-\\text{initial cash}-\\text{cumulative inflows}_t\\right]_+",
     "variables": "Flux disponibles aux dates effectives; B: financement minimal.",
     "assumptions": "Aucun refinancement présumé sans disponibilité démontrée.",
     "trap": "Ne pas compenser un paiement aujourd’hui avec un encaissement plus tard."
    }
   ],
   "prerequisites": [
    "CR-1",
    "LTR-2"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-14",
   "title": "Signaux de fraude: enquêter et recouper",
   "principles": [
    "Un historique apparemment régulier doit être compatible avec le mécanisme de la stratégie, ses volumes et ses pertes plausibles. La régularité seule n’est pas une preuve de fraude.",
    "Les preuves les plus utiles sont indépendantes du gérant: actifs et opérations confirmés, prestataires réellement autonomes et contrôles dont le périmètre est compris.",
    "La concentration des fonctions, le secret injustifié et une vérification impossible sont des signaux à cumuler. L’accès à un fonds réputé ne dispense pas de diligence."
   ],
   "recallPrompts": [
    "Quels instruments attendrait-on pour vérifier une stratégie split-strike conversion déclarée?",
    "Pourquoi une confirmation qui repasse par le gérant perd-elle de sa valeur probante?",
    "Comment distinguer un signal d’alerte d’une preuve de fraude?"
   ],
   "traps": [
    {
     "mistake": "Croire qu’une performance lisse démontre une fraude",
     "correction": "Comparer processus, actifs vérifiés et scénarios; traiter le lissage comme signal.",
     "check": "Quelle preuve indépendante manque?"
    },
    {
     "mistake": "Assimiler réputation et validation",
     "correction": "Vérifier le périmètre et l’indépendance réels des intermédiaires.",
     "check": "Qui garde, qui négocie, qui calcule, qui contrôle?"
    }
   ],
   "worked": {
    "prompt": "Un fonds déclare une exposition optionnelle sur 1m de titres, mais n’autorise aucune confirmation indépendante des options. Quel test est prioritaire?",
    "steps": [
     "Identifier les jambes attendues de la stratégie et les contreparties.",
     "Demander des confirmations indépendantes des positions et de leur capacité de marché.",
     "Comparer valorisations, règlements et flux plutôt que valider le seul rendement publié."
    ],
    "result": "La vérifiabilité prime sur le récit et l’accès exclusif.",
    "check": "Un échec de vérification justifie une escalade ou un refus selon le processus, sans conclure automatiquement à un crime."
   },
   "formulas": [],
   "prerequisites": [
    "IM-12"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-15",
   "title": "Construire une histoire et sa cohérence jointe",
   "principles": [
    "Un scénario combine un récit économique, quelques chocs explicites et une transmission aux autres facteurs. Les relations estimées aident à la cohérence sans transformer le récit en prévision certaine.",
    "La distance de Mahalanobis tient compte des volatilités et des corrélations. Un petit choc marginal peut être inhabituel s’il contredit les relations jointes.",
    "La covariance et le mapping sont incertains, notamment en crise. Tester régimes, non-linéarités, bases et choix de facteurs; ne pas supprimer un risque parce que son historique est dégénéré."
   ],
   "recallPrompts": [
    "Que signifie un choc conditionnel différent de la moyenne inconditionnelle?",
    "Pourquoi une valeur de densité gaussienne n’est-elle pas la probabilité d’un point de scénario?",
    "Comment une matrice presque singulière peut-elle rendre une mesure de plausibilité instable?"
   ],
   "traps": [
    {
     "mistake": "Appeler distance une probabilité de réalisation",
     "correction": "Une distance résume une position dans le modèle; une probabilité exige un événement et une distribution.",
     "check": "Quel ensemble de résultats est probabilisé?"
    },
    {
     "mistake": "Prendre la covariance calme comme vérité en crise",
     "correction": "Stresser les paramètres et la transmission.",
     "check": "Que devient le résultat si la corrélation casse?"
    }
   ],
   "worked": {
    "prompt": "Deux facteurs standardisés ont corrélation 0, 6. On impose le premier à −2; sous une loi normale jointe, quelle est la moyenne conditionnelle du second?",
    "steps": [
     "Pour des facteurs centrés standardisés, \\(E[Z_2\\mid Z_1=z]=\\rho z\\).",
     "\\(0.6\\times(-2)=-1.2\\).",
     "La variance résiduelle conditionnelle est \\(1-0.6^2=0.64\\), donc la moyenne n’est pas un résultat certain."
    ],
    "result": "Moyenne conditionnelle −1, 2; écart-type conditionnel 0, 8.",
    "check": "La relation conditionnelle dépend du modèle et de la stabilité de la corrélation."
   },
   "formulas": [
    {
     "name": "Distance de Mahalanobis",
     "tex": "d^2=(x-\\mu)^\\top\\Sigma^{-1}(x-\\mu)",
     "variables": "x: choc vectoriel; mu: centre; Sigma: covariance.",
     "assumptions": "Matrice inversible et estimée sur le régime pertinent.",
     "trap": "La distance n’est pas directement une probabilité ni une perte de portefeuille."
    },
    {
     "name": "Décomposition conditionnelle gaussienne à deux facteurs",
     "tex": "d^2=z_1^2+\\frac{(z_2-\\rho z_1)^2}{1-\\rho^2}",
     "variables": "z: chocs standardisés centrés; rho: corrélation.",
     "assumptions": "Deux facteurs normaux joints avec corrélation en valeur absolue strictement inférieure à 1.",
     "trap": "Un choc égal à la moyenne conditionnelle n’a aucun résidu mais conserve le coût de plausibilité du premier choc."
    }
   ],
   "prerequisites": [
    "MR-8",
    "MR-11",
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-16",
   "title": "Transformer un portefeuille en cash sans cacher le coût",
   "principles": [
    "La liquidité d’un fonds réconcilie actifs réalisables, investisseurs susceptibles de racheter, délais de règlement et instruments de gestion disponibles.",
    "Liquider d’abord les actifs les plus liquides peut payer les sortants mais rendre le portefeuille restant plus fragile. Mesurer l’après-rachat et l’équité entre investisseurs.",
    "Les estimations de coûts et volumes doivent traiter les obligations rarement négociées et les crises. Les mesures exceptionnelles dépendent des règles et approbations applicables."
   ],
   "recallPrompts": [
    "Que devient le profil du portefeuille restant après une liquidation des seuls actifs liquides?",
    "Pourquoi volume passé et prix inchangé ne garantissent-ils ni capacité de vente ni coût nul?",
    "Quels besoins de cash précèdent le règlement des cessions?"
   ],
   "traps": [
    {
     "mistake": "Additionner cash et ventes avant leur règlement",
     "correction": "Suivre la date de disponibilité effective.",
     "check": "Les rachats et marges sont-ils dus avant le règlement?"
    },
    {
     "mistake": "Croire qu’un outil de rachat crée des acheteurs",
     "correction": "Les outils répartissent ou gèrent le coût et le timing, sans créer mécaniquement de liquidité.",
     "check": "Quel mécanisme économique change réellement?"
    }
   ],
   "worked": {
    "prompt": "Un fonds a 3m de cash et une ligne confirmée immédiatement disponible de 2m. Il doit payer 8m de rachats àJ+1. Une vente de 9m ne règle qu’àJ+2. Quel manque de cash doit être résolu àJ+1?",
    "steps": [
     "Ressources disponibles àJ+1: \\(3+2=5\\)m.",
     "Manque de cash àJ+1: \\(8-5=3\\)m.",
     "Le produit de cession 9m arrive après le paiement; il ne peut pas être compté comme ressource déjà réglée."
    ],
    "result": "Manque de 3m àJ+1 malgré une vente de 9m en attente de règlement.",
    "check": "Vérifier dates et disponibilité ferme des ressources, y compris les conditions de tirage de la ligne."
   },
   "formulas": [
    {
     "name": "Part illiquide après rachat financé en liquide",
     "tex": "w_{illiquid}^{\\prime}=\\frac{V_{illiquid}}{NAV-\\text{redemption}}",
     "variables": "V: valeur inchangée des actifs illiquides; rachat financé uniquement par liquide.",
     "assumptions": "Pas de coût, mouvement de marché ou vente illiquide.",
     "trap": "Le numérateur reste fixe mais le dénominateur diminue."
    },
    {
     "name": "Coût monétaire d’une cession",
     "tex": "C=q\\,\\frac{c_{bps}}{10000}",
     "variables": "q: montant cédé; c: coût unidirectionnel en points de base.",
     "assumptions": "Convention de coût explicitée, même monnaie.",
     "trap": "Un point de base vaut 0, 01%, pas 1%."
    }
   ],
   "prerequisites": [
    "LTR-1",
    "IM-5"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  },
  {
   "readingId": "IM-17",
   "title": "Voir au travers des prix retardés",
   "principles": [
    "Les marchés illiquides combinent coûts de recherche, asymétrie d’information, délais et faiblesse de découverte des prix. La diversification publiée peut refléter un décalage des marks.",
    "Le déslissage inverse un modèle de valorisation retardée. Il peut accroître la volatilité et la corrélation estimées, mais amplifie aussi les erreurs si le modèle est mal spécifié.",
    "La prime d’illiquidité n’est pas un rendement gratuit: il faut pouvoir supporter immobilisation, appels et rebalancement défavorable sans vente forcée."
   ],
   "recallPrompts": [
    "Pourquoi un actif dont le prix reste stable pendant une crise peut-il être devenu plus risqué?",
    "Quelles hypothèses rendent légitime une opération de déslissage?",
    "Comment une baisse des actifs publics et un appel de capital privé se combinent-ils sur la poche liquide?"
   ],
   "traps": [
    {
     "mistake": "Annualiser avec racine du temps malgré une autocorrélation positive",
     "correction": "Inclure les covariances entre périodes selon le modèle estimé.",
     "check": "Les rendements successifs sont-ils indépendants?"
    },
    {
     "mistake": "Prendre un rendement déslissé pour une transaction observable",
     "correction": "Le résultat dépend d’un modèle et doit être validé.",
     "check": "La hausse de volatilité vient-elle de risque révélé ou de bruit amplifié?"
    }
   ],
   "worked": {
    "prompt": "Un modèle donne rendement observé égal à 0, 7fois le rendement vrai plus 0, 3fois le précédent rendement observé. Aujourd’hui observé 2%, précédent −1%. Retrouver le vrai rendement.",
    "steps": [
     "\\(r_t^{true}=(r_t^{obs}-0.3r_{t-1}^{obs})/0.7\\).",
     "Numérateur \\(2\\%-0.3(-1\\%)=2.3\\%\\).",
     "Donc \\(2.3\\%/0.7=3.286\\%\\)."
    ],
    "result": "3, 286% selon le modèle.",
    "check": "Le signe du rendement précédent et les coefficients sont essentiels; le résultat n’est pas une observation de transaction."
   },
   "formulas": [
    {
     "name": "Déslissage AR(1)",
     "tex": "r_t^*=\\frac{r_t^{obs}-a\\,r_{t-1}^{obs}}{1-a}",
     "variables": "a: poids de l’ancien mark; r*: rendement latent.",
     "assumptions": "Modèle observé explicite; a inférieur à 1, connu ou estimé.",
     "trap": "Ne pas appliquer à une autocorrélation qui reflète de vrais rendements prévisibles sans vérifier le modèle."
    },
    {
     "name": "Variance cumulée avec autocovariances",
     "tex": "\\operatorname{Var}\\!\\left(\\sum_{t=1}^n r_t\\right)=n\\gamma_0+2\\sum_{k=1}^{n-1}(n-k)\\gamma_k",
     "variables": "gamma_k: autocovariance au lag k; n: nombre de périodes.",
     "assumptions": "Rendements additifs stationnaires; approximation si on parle de rendements simples composés.",
     "trap": "La racine du temps ignore les termes de covariance."
    }
   ],
   "prerequisites": [
    "IM-7",
    "IM-11"
   ],
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "editionNote": "Lecture absente ou non couverte intégralement par le PDF investissement 2024; guide original aligné sur les objectifs 2026, sans prétendre remplacer le texte actuel.",
   "topic": "investment"
  }
 ],
 "questions": [
  {
   "id": "xi001",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-1.5",
   "reading": "IM-1",
   "concept": "SDF et covariance du paiement",
   "question": "In two equally likely states, the stochastic discount factor is 0.7 in expansion and 1.1 in recession. A security pays 140 in expansion and 60 in recession. A second security pays 100 in each state. What is the first security’s price minus the second security’s price?",
   "choices": [
    "−8",
    "0",
    "8",
    "20"
   ],
   "answer": 0,
   "explanation": "Le premier prix est \\(0.5(0.7\\times140+1.1\\times60)=82\\). Le paiement certain vaut \\(100\\times0.9=90\\). Écart \\(-8\\): les deux espérances de paiement valent 100 mais le titre risqué paie moins dans le mauvais état.",
   "why": [
    "Correct: la covariance négative du paiement et du SDF réduit le prix.",
    "Cette réponse remplace à tort une espérance de produit par le produit des espérances.",
    "Le signe est inversé: le paiement de récession est moins utile ici.",
    "L’écart des paiements ne constitue pas un écart de prix actualisés."
   ],
   "cue": "Comparer \\(E[mX]\\), pas seulement \\(E[X]\\).",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 1,
    "pdfPages": [
     14,
     25
    ]
   },
   "numeric": {
    "expression": "0.5*(0.7*140+1.1*60)-100*0.9",
    "value": -8,
    "optionValue": -8,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi002",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-1.3",
   "reading": "IM-1",
   "concept": "Même bêta, volatilités différentes",
   "question": "Two stocks have identical market beta and identical expected returns under a correctly specified CAPM. One has twice the total volatility because of independent firm-specific noise. A diversified investor concludes that the noisier stock must offer an additional equilibrium risk premium. Which evaluation is best?",
   "choices": [
    "Correct only if the investor holds more stocks.",
    "Incorrect because CAPM requires every stock to have the same volatility.",
    "Correct, because any additional variance must be priced.",
    "Incorrect under the stated CAPM: the extra diversifiable risk alone does not change its required expected return."
   ],
   "answer": 3,
   "explanation": "Le CAPM rémunère le bêta et non toute la variance. Le risque spécifique indépendant se diversifie; son augmentation ne modifie pas le rendement requis dans ce modèle. Cela ne signifie pas qu’un investisseur concentré ne souffre pas de ce risque.",
   "why": [
    "Plus de diversification affaiblit, au contraire, cette justification.",
    "Le CAPM permet des volatilités individuelles différentes.",
    "Le risque spécifique ne reçoit pas nécessairement de prime d’équilibre.",
    "Correct: bêta identique, même prime CAPM sous les hypothèses données."
   ],
   "cue": "Risque subi individuellement et risque rémunéré en équilibre sont deux questions.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 1,
    "pdfPages": [
     14,
     25
    ]
   }
  },
  {
   "id": "xi003",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-1.6",
   "reading": "IM-1",
   "concept": "Test conjoint d’efficience",
   "question": "An academic documents a positive intercept against a one-factor market model. A second researcher shows that the strategy has persistent exposure to a traded distress factor omitted from the first regression. Which conclusion is strongest?",
   "choices": [
    "The second factor proves the original prices were correct.",
    "The efficiency interpretation depends jointly on the return model and the pricing evidence; test the added factor and implementation costs.",
    "Adding a factor always raises estimated alpha.",
    "The first intercept proves markets violate every form of efficiency."
   ],
   "answer": 1,
   "explanation": "Un alpha dépend du benchmark. Une exposition omise à un facteur rémunéré peut expliquer le rendement, mais l’ajout d’un facteur ne prouve pas automatiquement que le nouveau modèle est correct. Tester robustesse, coûts et mécanisme économique.",
   "why": [
    "Le nouveau facteur est une hypothèse à tester.",
    "Correct: hypothèse conjointe du modèle de rendement et de l’efficience.",
    "L’alpha peut augmenter ou diminuer selon chargements et primes.",
    "Un rejet du modèle ne rejette pas tous les modèles de marché efficient."
   ],
   "cue": "Un alpha est une conclusion conditionnelle au modèle.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 1,
    "pdfPages": [
     14,
     25
    ]
   }
  },
  {
   "id": "xi004",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-1.4",
   "reading": "IM-1",
   "concept": "Facteur de couverture à prime négative",
   "question": "A two-factor pricing model has market premium 6% and volatility-factor premium −3% per year. An asset has market loading 0.8 and volatility-factor loading 0.5. With risk-free rate 2%, what is its required annual expected return?",
   "choices": [
    "3.3%",
    "8.3%",
    "6.8%",
    "5.3%"
   ],
   "answer": 3,
   "explanation": "\\(E[R]=2\\%+0.8\\times6\\%+0.5\\times(-3\\%)=5.3\\%\\). Une exposition positive à un facteur protecteur assorti d’une prime négative peut réduire le rendement requis.",
   "why": [
    "C’est seulement la prime excédentaire, pas le rendement total.",
    "Ajoute la prime de volatilité en valeur absolue.",
    "Oublie le facteur de volatilité.",
    "Correct: conserver le signe de chaque prime."
   ],
   "cue": "Chargement positif ne veut pas dire prime positive.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 1,
    "pdfPages": [
     14,
     25
    ]
   },
   "numeric": {
    "expression": "0.02+0.8*0.06+0.5*(-0.03)",
    "value": 0.053,
    "optionValue": 0.053,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi005",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-2.3",
   "reading": "IM-2",
   "concept": "Protection de volatilité et roulement",
   "question": "A fund buys short-maturity volatility futures every month as equity-crash insurance. In calm periods the futures curve is upward sloping and contracts tend to converge toward a lower spot level. Which assessment best explains why the hedge can lose money even with little change in spot volatility?",
   "choices": [
    "The hedge is invalid because volatility cannot be traded through derivatives.",
    "An upward-sloping curve guarantees a positive roll return to the long holder.",
    "Convergence and repeated rolling can impose a cost; assess the hedge’s payoff in crashes against its carry and basis risk.",
    "Spot volatility must have fallen by exactly the fund’s loss."
   ],
   "answer": 2,
   "explanation": "Le prix à terme n’est pas le niveau spot. Acheter un contrat cher qui converge vers un spot plus bas peut coûter même si le spot varie peu. L’utilité d’assurance se juge avec son coût récurrent, sa maturité et le scénario de crise.",
   "why": [
    "Des dérivés permettent une exposition à la volatilité.",
    "Le signe du roulement pour l’acheteur est ici inversé.",
    "Correct: distinguer exposition, carry et efficacité conditionnelle.",
    "La convergence peut générer une perte sans mouvement spot correspondant."
   ],
   "cue": "Une assurance utile peut avoir un carry négatif.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 2,
    "pdfPages": [
     26,
     41
    ]
   }
  },
  {
   "id": "xi006",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-2.2",
   "reading": "IM-2",
   "concept": "Facteur macro et richesse humaine",
   "question": "An employee’s job security and future bonuses fall sharply in recessions. A value strategy also suffers its largest losses in those recessions. Its long-run average premium is high. Which allocation consideration is most defensible?",
   "choices": [
    "The strategy removes the employee’s recession exposure.",
    "The employee may have less capacity to bear the factor than an investor with recession-resilient income.",
    "Human capital is irrelevant because it is not a listed security.",
    "The high historical premium automatically makes it optimal for this employee."
   ],
   "answer": 1,
   "explanation": "Le risque pertinent inclut la richesse humaine: salaire et bonus chutant avec le portefeuille aggravent le mauvais état. Une prime élevée peut précisément rémunérer ce risque, sans rendre l’allocation optimale pour chaque individu.",
   "why": [
    "Les pertes communes renforcent l’exposition à la récession.",
    "Correct: évaluer la covariance avec la richesse globale.",
    "Une source non cotée de revenus peut être économiquement majeure.",
    "La prime ne suffit pas à déterminer la capacité de risque."
   ],
   "cue": "Se demander: est-ce aussi mon mauvais état?",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 2,
    "pdfPages": [
     26,
     41
    ]
   }
  },
  {
   "id": "xi007",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-2.4",
   "reading": "IM-2",
   "concept": "Caractéristique et chargement factoriel",
   "question": "A manager buys stocks with low price-to-book ratios and estimates a value-factor beta of 0.2. After several acquisitions change their business mix, the portfolio still has low price-to-book but beta becomes −0.1. Which inference is best?",
   "choices": [
    "The portfolio has become a momentum fund by definition.",
    "The risk premium is now guaranteed negative in every future month.",
    "The beta estimate must be wrong because valuation characteristics fix beta mechanically.",
    "A characteristic-based selection rule and an empirically estimated factor loading are related but different; examine exposures and estimation uncertainty."
   ],
   "answer": 3,
   "explanation": "Une caractéristique sert au tri; un bêta décrit une covariance de rendements. Ils ne sont pas identiques et peuvent évoluer différemment. Il faut vérifier composition, fenêtre d’estimation et incertitude plutôt que forcer un signe.",
   "why": [
    "Un bêta value négatif n’identifie pas une stratégie momentum.",
    "Une prime attendue n’est pas un rendement certain.",
    "Une caractéristique ne fixe pas mécaniquement une covariance.",
    "Correct: distinguer règle de sélection et risque mesuré."
   ],
   "cue": "Attribut de titre et exposition de portefeuille ne sont pas interchangeables.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 2,
    "pdfPages": [
     26,
     41
    ]
   }
  },
  {
   "id": "xi008",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-2.5",
   "reading": "IM-2",
   "concept": "Diversification value–momentum conditionnelle",
   "question": "A committee combines value and momentum because their full-sample correlation is negative. Both now hold positions financed through the same prime broker, whose haircut schedule rises in market stress. Which risk is least captured by the historical return correlation?",
   "choices": [
    "A common funding shock can force both strategies to reduce positions simultaneously.",
    "Negative correlation makes their gross exposures equal.",
    "The combination eliminates counterparty dependence.",
    "Different trading signals guarantee different liquidation buyers."
   ],
   "answer": 0,
   "explanation": "Des signaux différents n’impliquent pas des passifs indépendants. Un choc de financement commun peut imposer des ventes simultanées et modifier les corrélations observées. Tester marges, capacité de vente et concentration du financement.",
   "why": [
    "Correct: dépendance de financement conditionnelle au stress.",
    "La corrélation ne fixe aucun niveau d’exposition.",
    "Le même prime broker crée un point commun de dépendance.",
    "Les signaux ne garantissent ni acheteurs ni liquidité distincts."
   ],
   "cue": "Diversifier les signaux ne diversifie pas automatiquement le financement.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 2,
    "pdfPages": [
     26,
     41
    ]
   }
  },
  {
   "id": "xi009",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-3.4",
   "reading": "IM-3",
   "concept": "Breadth par blocs dépendants",
   "question": "A manager trades 400 securities each year. They fall into 25 independent clusters; within each cluster all 16 trades express exactly the same forecast and payoff. Assume equal opportunities across clusters, IC 0.06 and perfect implementation. Under \\(IR\\approx IC\\sqrt{BR}\\), which attainable IR is consistent with the stated independence structure?",
   "choices": [
    "0.30",
    "0.24",
    "6.00",
    "1.20"
   ],
   "answer": 0,
   "explanation": "Il existe 25 paris indépendants, pas 400. Donc \\(IR\\approx0.06\\sqrt{25}=0.30\\). Compter toutes les lignes surestime la diversification de l’information.",
   "why": [
    "Correct: un pari indépendant par cluster.",
    "N’utilise ni le bon nombre de paris ni sa racine.",
    "Oublie la racine et ne correspond pas à la structure donnée.",
    "Compte 400 titres comme 400 paris indépendants."
   ],
   "cue": "Compter les sources indépendantes, puis prendre \\(\\sqrt{BR}\\).",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 3,
    "pdfPages": [
     42,
     65
    ]
   },
   "numeric": {
    "expression": "0.06*Math.sqrt(25)",
    "value": 0.3,
    "optionValue": 0.3,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi010",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-3.3",
   "reading": "IM-3",
   "concept": "Benchmark modifié après résultats",
   "question": "A mandate permits investment only in developed-market large-cap equities. After lagging that benchmark, a manager proposes a new benchmark consisting 60% of a profitable emerging-market style and 40% cash, neither reflecting the mandate or the portfolio’s normal exposures. What is the strongest objection?",
   "choices": [
    "A benchmark must exactly equal each day’s realized holdings.",
    "Any benchmark containing cash is invalid.",
    "A benchmark may never be revised, even after a genuine mandate change.",
    "Benchmark suitability requires mandate consistency and advance specification; this revision is not justified by the stated investment opportunity set."
   ],
   "answer": 3,
   "explanation": "La cohérence avec le mandat, l’investissabilité et la définition à l’avance comptent. Une vraie évolution du mandat peut justifier une révision prospective documentée. Changer après la performance sans lien économique invalide l’interprétation.",
   "why": [
    "Une copie ex post des positions éliminerait toute mesure de décision active.",
    "Un benchmark peut légitimement inclure du cash.",
    "Une modification prospective motivée peut être justifiée.",
    "Correct: relier benchmark et responsabilités réellement confiées."
   ],
   "cue": "Un benchmark représente les décisions déléguées.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 3,
    "pdfPages": [
     42,
     65
    ]
   }
  },
  {
   "id": "xi011",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-3.8",
   "reading": "IM-3",
   "concept": "Bêta estimé et régression vers la moyenne",
   "question": "A researcher sorts stocks on the lowest estimated betas using 12 monthly observations, then observes that their next-year realized betas are much nearer 1. The researcher calls this proof that the low-beta anomaly disappeared. Which qualification is most important?",
   "choices": [
    "Sorting extreme noisy estimates can cause regression toward the mean; use sufficiently precise exposures and a separate return test.",
    "An estimated beta can never change.",
    "The next-year beta alone directly measures risk-adjusted alpha.",
    "A beta near 1 implies zero stock volatility."
   ],
   "answer": 0,
   "explanation": "Sélectionner les estimations extrêmes sélectionne aussi le bruit. Le bêta post-classement peut revenir vers la moyenne sans changement structurel. L’existence de l’anomalie porte sur les rendements ajustés du risque, pas seulement sur le déplacement des bêtas.",
   "why": [
    "Correct: bruit de classement et test de rendement sont distincts.",
    "Les estimations et les sensibilités économiques peuvent changer.",
    "Un bêta n’est pas un alpha.",
    "Le bêta 1 signifie une sensibilité marché, pas une absence de volatilité."
   ],
   "cue": "Ne pas confondre erreur de classement et disparition d’une prime.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 3,
    "pdfPages": [
     42,
     65
    ]
   }
  },
  {
   "id": "xi012",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-3.9",
   "reading": "IM-3",
   "concept": "Financement du pari faible bêta",
   "question": "A low-beta portfolio has expected excess return 4% and beta 0.5. An investor doubles exposure to target beta 1, financing the extra unit at a borrowing spread of 1.5% above the risk-free rate. Ignore fees and trading costs. Its expected excess return relative to lending at the risk-free rate is closest to:",
   "choices": [
    "8.0%",
    "6.5%",
    "5.0%",
    "2.5%"
   ],
   "answer": 1,
   "explanation": "Deux unités produisent \\(2\\times4\\%=8\\%\\) d’excès brut. Une seule unité supplémentaire est empruntée: coût de spread 1, 5%. Excès net \\(8\\%-1.5\\%=6.5\\%\\). Le financement peut réduire le bénéfice de levier sur le faible bêta.",
   "why": [
    "Oublie le spread de financement.",
    "Correct: spread sur une unité financée.",
    "Impute le spread sur deux unités plutôt que sur l’emprunt.",
    "Ne double pas le rendement excédentaire avant le coût."
   ],
   "cue": "Levier et coût d’emprunt doivent partager la même base.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 3,
    "pdfPages": [
     42,
     65
    ]
   },
   "numeric": {
    "expression": "2*0.04-0.015",
    "value": 0.065,
    "optionValue": 0.065,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi013",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-4.3",
   "reading": "IM-4",
   "concept": "Centrage pondéré des prévisions",
   "question": "Three stocks have benchmark weights 50%, 30%, 20% and raw alphas 4%, 1%,−2%. As a mean-centering preprocessing step, subtract the benchmark-weighted average from every alpha; this is not a claim of general risk-factor neutrality. What is the adjusted alpha of the third stock?",
   "choices": [
    "−4.7%",
    "−2.0%",
    "−3.0%",
    "−3.9%"
   ],
   "answer": 3,
   "explanation": "La moyenne pondérée vaut \\(0.5\\times4\\%+0.3\\times1\\%+0.2\\times(-2\\%)=1.9\\%\\). Le troisième alpha devient \\(-2\\%-1.9\\%=-3.9\\%\\). Vérifier que la moyenne pondérée ajustée est nulle; pour neutraliser un risque benchmark, un ajustement par les bêtas peut être nécessaire.",
   "why": [
    "Calcule la moyenne en ignorant le signe du troisième alpha.",
    "Ne neutralise rien.",
    "Soustrait la moyenne arithmétique 1%.",
    "Correct: centrage selon les poids indiqués."
   ],
   "cue": "Après neutralisation: \\(\\sum b_i\\alpha_i^\\perp=0\\).",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 4,
    "pdfPages": [
     66,
     81
    ]
   },
   "numeric": {
    "expression": "-0.02-(0.5*0.04+0.3*0.01+0.2*(-0.02))",
    "value": -0.039,
    "optionValue": -0.039,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi014",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-4.7",
   "reading": "IM-4",
   "concept": "Coûts asymétriques et bande de non-transaction",
   "question": "For a concave one-period objective, the derivative of utility before costs at current holdings is −0.003 per unit increase in weight. Buying costs 0.002 per unit; selling costs 0.005 per unit sold. Ignore other constraints. Which local decision is optimal?",
   "choices": [
    "Sell because any negative derivative requires a trade.",
    "Buy because buying is cheaper than selling.",
    "Sell until the before-cost derivative is zero.",
    "Do not trade: the derivative lies in \\([-0.005,0.002]\\)."
   ],
   "answer": 3,
   "explanation": "Pour vendre, le gain avant coût par unité vendue est 0, 003; il est inférieur au coût 0, 005. Pour acheter, le gain marginal est déjà négatif. Le sous-gradient vérifie \\(-c_{sell}\\le g\\le c_{buy}\\), donc pas de transaction.",
   "why": [
    "Une dérivée négative doit dépasser le coût de vente en valeur absolue.",
    "Le prix relatif des coûts ne crée pas un gain à acheter.",
    "Il faudrait intégrer le coût de vente, et non viser automatiquement le point sans coûts.",
    "Correct: dérivée dans la bande asymétrique."
   ],
   "cue": "Le coût dépend du sens de la transaction.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 4,
    "pdfPages": [
     66,
     81
    ]
   }
  },
  {
   "id": "xi015",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-4.8",
   "reading": "IM-4",
   "concept": "Stratification et covariance",
   "question": "A portfolio holds the highest-alpha stock in every industry, with benchmark industry weights. Its manager claims that benchmark industry neutrality guarantees minimum tracking error. Which qualification is strongest?",
   "choices": [
    "Stratification controls selected category weights but can leave stock-specific and cross-factor covariance exposures; it is not a general minimum-variance solution.",
    "Tracking error ignores all within-industry stock choices.",
    "Industry neutrality also forces identical stock-level residual risk.",
    "The claim is correct if there are at least ten industries."
   ],
   "answer": 0,
   "explanation": "La stratification impose des catégories, mais ne résout pas automatiquement un problème de covariance. Un titre par industrie peut garder des sensibilités taille, style et spécifiques fortes. Le minimum de tracking error dépend de toute la matrice de covariance et des contraintes.",
   "why": [
    "Correct: neutralité d’une dimension et optimum de risque sont distincts.",
    "Les différences de titres contribuent au rendement actif.",
    "Les volatilités et covariances spécifiques restent différentes.",
    "Le nombre de catégories ne prouve aucune optimalité."
   ],
   "cue": "Une contrainte satisfaite n’est pas une preuve d’optimalité.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 4,
    "pdfPages": [
     66,
     81
    ]
   }
  },
  {
   "id": "xi016",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-4.9",
   "reading": "IM-4",
   "concept": "Réduire la dispersion sans sacrifier le rendement",
   "question": "Two accounts share a model and mandate. Account A has an old position whose sale incurs a large cost; account B starts in cash. A consultant insists that B must copy A immediately to eliminate dispersion. Which response is best?",
   "choices": [
    "Copying A is always optimal because lower dispersion dominates expected return.",
    "Allow B to reflect current forecasts and evaluate dispersion jointly with after-cost expected value; identical positions are not automatically optimal.",
    "Force A to liquidate at any cost so both accounts can start again.",
    "Dispersion proves at least one account violated the mandate."
   ],
   "answer": 1,
   "explanation": "Les positions initiales diffèrent et les coûts dépendent de la trajectoire. Le compte nouveau n’a pas nécessairement intérêt à copier un compromis dicté par les coûts du compte ancien. Réduire la dispersion doit être évalué contre la perte d’alpha et les coûts supplémentaires.",
   "why": [
    "La dispersion n’est pas l’unique objectif.",
    "Correct: juger chaque décision après coûts avec des règles équitables.",
    "Une liquidation coûteuse peut détruire inutilement de la valeur.",
    "Des écarts peuvent être légitimes et documentés."
   ],
   "cue": "Même modèle, coûts initiaux différents, optimum possiblement différent.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 4,
    "pdfPages": [
     66,
     81
    ]
   }
  },
  {
   "id": "xi017",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-5.1",
   "reading": "IM-5",
   "concept": "Suppression finie et composante actuelle",
   "question": "A zero-mean jointly normal portfolio consists of two positive positions whose standalone VaRs are 10 and 6 currency units, with P&L correlation 0. The current portfolio VaR is \\(\\sqrt{136}\\), and the second position’s component VaR is \\(36/\\sqrt{136}\\). If the second position is fully removed, what is the exact reduction in VaR?",
   "choices": [
    "Approximately 3.09",
    "Exactly 6.00",
    "Approximately 1.66",
    "Approximately 4.00"
   ],
   "answer": 2,
   "explanation": "Après suppression, seule la première position reste: VaR 10. La réduction exacte est \\(\\sqrt{136}-10\\approx1.662\\). La contribution actuelle \\(36/\\sqrt{136}\\approx3.087\\) n’est pas cette variation finie.",
   "why": [
    "C’est la contribution composante au point initial.",
    "C’est la VaR individuelle; elle ignore la diversification.",
    "Correct: réévaluer le portefeuille après transaction.",
    "Ni contribution ni différence de VaR ne donne 4."
   ],
   "cue": "Suppression entière: calculer \\(\\rho(x)-\\rho(x-\\Delta x)\\).",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 5,
    "pdfPages": [
     82,
     95
    ]
   },
   "numeric": {
    "expression": "Math.sqrt(136)-10",
    "value": 1.6619037896906015,
    "optionValue": 1.66,
    "tolerance": 0.005
   }
  },
  {
   "id": "xi018",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-5.2",
   "reading": "IM-5",
   "concept": "Corrélation défavorable pour un long–short",
   "question": "A fund is long one return exposure and short an equal-notional second exposure. Each leg has return standard deviation 10%, and the P&L is proportional to \\(R_1-R_2\\). Ignoring means, which change produces the largest increase in portfolio standard deviation?",
   "choices": [
    "Correlation falls from 0.8 to −0.8.",
    "Correlation stays at 0.8.",
    "Both volatilities remain fixed, so correlation cannot affect risk.",
    "Correlation rises from 0 to 0.8."
   ],
   "answer": 0,
   "explanation": "\\(\\sigma_P^2=0.1^2+0.1^2-2\\rho(0.1)(0.1)\\). Faire passer la corrélation de 0, 8 à −0, 8 fait passer la volatilité de 6, 32% à 18, 97%. Une corrélation positive protège ici la différence long–short.",
   "why": [
    "Correct: le signe de la position courte inverse le terme de covariance.",
    "Sans changement, aucun accroissement lié à la corrélation.",
    "Les covariances font partie de la variance de portefeuille.",
    "Une corrélation plus positive réduit la volatilité de la différence."
   ],
   "cue": "Le risque porte sur une différence, pas sur une somme.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 5,
    "pdfPages": [
     82,
     95
    ]
   }
  },
  {
   "id": "xi019",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-5.4",
   "reading": "IM-5",
   "concept": "Couverture, contrainte et minimum-variance",
   "question": "For \\(P+xH\\), the original P&L has variance 81, the hedge has variance 16, and their covariance is −24, in compatible currency units. Trading rules permit only \\(0\\le x\\le1\\). Which hedge quantity minimizes variance?",
   "choices": [
    "0",
    "0.67",
    "1",
    "1.5"
   ],
   "answer": 2,
   "explanation": "Le minimum libre est \\(x^*=-(-24)/16=1.5\\), hors domaine. La fonction quadratique est décroissante jusqu’à 1, 5: sur \\([0,1]\\), son minimum est donc 1. La variance devient \\(81-48+16=49\\).",
   "why": [
    "La covariance négative permet de réduire le risque en achetant le hedge.",
    "Inverse à tort variance et covariance.",
    "Correct: projeter le minimum libre sur le domaine admissible.",
    "C’est le minimum libre, mais il viole la limite."
   ],
   "cue": "Vérifier l’admissibilité après le calcul du minimum libre.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 5,
    "pdfPages": [
     82,
     95
    ]
   },
   "numeric": {
    "expression": "Math.min(1,Math.max(0,24/16))",
    "value": 1,
    "optionValue": 1,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi020",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-5.5",
   "reading": "IM-5",
   "concept": "Améliorer un ratio et réduire le risque",
   "question": "A current portfolio has expected excess P&L 4 and P&L standard deviation 10. A small feasible trade adds expected excess P&L 0.12 per unit and has marginal standard deviation 0.20 per unit at current holdings. Ignore costs and constraints. What happens initially to the portfolio Sharpe ratio?",
   "choices": [
    "It increases because \\(0.12\\times10-4\\times0.20>0\\).",
    "It is unchanged whenever both return and risk rise.",
    "It increases only if marginal risk is negative.",
    "It falls because standard deviation rises."
   ],
   "answer": 0,
   "explanation": "Pour \\(S=\\mu/\\sigma\\), la dérivée est \\((\\mu^\\prime\\sigma-\\mu\\sigma^\\prime)/\\sigma^2\\). Ici \\((0.12\\times10-4\\times0.20)/100=0.004>0\\). Le risque absolu monte, mais le ratio s’améliore.",
   "why": [
    "Correct: le rendement marginal rémunère suffisamment le risque marginal.",
    "Il faut comparer les taux relatifs de variation.",
    "Une contribution négative au risque n’est pas nécessaire.",
    "Une hausse du risque n’interdit pas l’amélioration du ratio."
   ],
   "cue": "Gestion du risque et maximisation du Sharpe ne sont pas le même objectif.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 5,
    "pdfPages": [
     82,
     95
    ]
   },
   "numeric": {
    "expression": "(0.12*10-4*0.20)/100",
    "value": 0.004,
    "optionValue": 0.004,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi021",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-6.5",
   "reading": "IM-6",
   "concept": "Surplus versus actifs",
   "question": "Annual changes in pension assets and liabilities each have standard deviation 12 currency units. Their correlation is 0.9 under allocation A and 0.2 under allocation B. Expected surplus changes are identical. Which allocation has lower surplus volatility?",
   "choices": [
    "A, with volatility approximately 5.37 versus 15.18 for B.",
    "B, because lower correlation is always safer.",
    "They are equal because asset volatilities match.",
    "A, with zero surplus volatility."
   ],
   "answer": 0,
   "explanation": "Le surplus est \\(A-L\\). Pour A: \\(\\sqrt{144+144-2(0.9)(144)}=5.367\\). Pour B: \\(\\sqrt{288-57.6}=15.179\\). La covariance avec les engagements est protectrice ici.",
   "why": [
    "Correct: les actifs suivent mieux le passif.",
    "Pour une différence, une corrélation positive peut réduire le risque.",
    "Le risque du surplus dépend aussi de la covariance actif–passif.",
    "La corrélation reste inférieure à 1."
   ],
   "cue": "D’abord écrire le résultat à protéger: actif moins passif.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 6,
    "pdfPages": [
     96,
     107
    ]
   },
   "numeric": {
    "expression": "Math.sqrt(144+144-2*0.9*144)",
    "value": 5.366563145999495,
    "optionValue": 5.37,
    "tolerance": 0.005
   }
  },
  {
   "id": "xi022",
   "topic": "investment",
   "skill": "i-allocate",
   "objective": "IM-6.8",
   "reading": "IM-6",
   "concept": "Budget de risque autonome des gérants",
   "question": "Two independent active managers have annual information ratios 0.60 and 0.30. Let \\(r_1,r_2\\) denote their positive standalone active-risk budgets. Expected active return is \\(0.60r_1+0.30r_2\\), and total active risk is \\(\\sqrt{r_1^2+r_2^2}\\). Ignoring constraints, which ratio of risk budgets maximizes IR?",
   "choices": [
    "1:2",
    "1:1",
    "2:1",
    "4:1"
   ],
   "answer": 2,
   "explanation": "Le vecteur de risque optimal est parallèle au vecteur des IR: \\(r_1/r_2=0.60/0.30=2\\). Le ratio de contributions à la variance serait 4:1, mais la question porte sur les budgets de risque autonome.",
   "why": [
    "Inverse le rapport d’efficacité.",
    "Ne tient pas compte de la différence de rendement par unité de risque.",
    "Correct: risques autonomes proportionnels aux IR.",
    "Confond les risques autonomes et leurs carrés."
   ],
   "cue": "Préciser si budget signifie sigma, variance ou contribution Euler.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 6,
    "pdfPages": [
     96,
     107
    ]
   },
   "numeric": {
    "expression": "0.60/0.30",
    "value": 2,
    "optionValue": 2,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi023",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-6.7",
   "reading": "IM-6",
   "concept": "Deux mandats de même tracking error",
   "question": "Two active managers have identical tracking error against their respective benchmarks. One benchmark is a short-duration sovereign portfolio; the other is an equity index. Trustees conclude their allocations carry identical absolute risk. Which response is best?",
   "choices": [
    "Incorrect: tracking error measures active deviations; policy-mix exposures and benchmark risks must also be consolidated.",
    "Correct provided the managers have the same fee.",
    "Incorrect because tracking error cannot measure risk.",
    "Correct: tracking error equals absolute volatility for any benchmark."
   ],
   "answer": 0,
   "explanation": "La tracking error décrit l’écart au benchmark. Deux benchmarks portent des risques absolus très différents. Il faut agréger le risque de politique d’allocation, les écarts actifs et leurs covariances au niveau global.",
   "why": [
    "Correct: les deux niveaux de décision doivent être suivis.",
    "Les frais ne rendent pas les expositions équivalentes.",
    "La tracking error est utile pour le risque actif, dans son périmètre.",
    "Le benchmark n’est pas nécessairement sans risque."
   ],
   "cue": "Même écart au benchmark ne signifie pas même risque du fonds.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 6,
    "pdfPages": [
     96,
     107
    ]
   }
  },
  {
   "id": "xi024",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-6.5",
   "reading": "IM-6",
   "concept": "Sponsor et appel de contributions",
   "question": "A manufacturer’s pension plan holds assets that perform well in ordinary years but fall sharply when demand for the manufacturer’s products collapses. The sponsor also faces tight borrowing limits in those states. Which stress test is most informative?",
   "choices": [
    "Test asset returns while holding sponsor contribution capacity fixed.",
    "Assume diversification across unrelated fund managers removes sponsor risk.",
    "Jointly stress the pension deficit, the sponsor’s operating cash flow and its ability to make required contributions.",
    "Ignore the sponsor because pension liabilities have long maturity."
   ],
   "answer": 2,
   "explanation": "Le besoin de contribution peut augmenter précisément lorsque le sponsor a moins de capacité financière. Tester déficit, cash disponible et contraintes de financement ensemble révèle cette mauvaise dépendance.",
   "why": [
    "Cette hypothèse supprime le canal le plus préoccupant.",
    "Plusieurs gérants peuvent partager les mêmes risques économiques.",
    "Correct: mesurer le besoin et la capacité au même état du monde.",
    "L’horizon long n’annule pas les obligations de financement intermédiaires."
   ],
   "cue": "Un besoin de cash est plus grave quand sa source disparaît aussi.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 6,
    "pdfPages": [
     96,
     107
    ]
   }
  },
  {
   "id": "xi025",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-7.9",
   "reading": "IM-7",
   "concept": "Réconciliation sans double interaction",
   "question": "In a one-period three-term Brinson attribution, a sector has portfolio weight 40%, benchmark weight 25%, portfolio sector return 3%, sector benchmark return 1%, and total benchmark return 2%. Allocation is \\((w_p-w_b)(R_{b,j}-R_b)\\), selection is \\(w_b(R_{p,j}-R_{b,j})\\), and interaction is \\((w_p-w_b)(R_{p,j}-R_{b,j})\\). What is this sector’s combined contribution?",
   "choices": [
    "0.65percentage points",
    "0.95percentage points",
    "1.10percentage points",
    "0.35percentage points"
   ],
   "answer": 0,
   "explanation": "Allocation \\(0.15(0.01-0.02)=-0.0015\\); sélection \\(0.25(0.03-0.01)=0.005\\); interaction \\(0.15(0.02)=0.003\\). Total \\(0.0065=0.65\\)point. Un secteur peut avoir allocation négative mais contribution totale positive.",
   "why": [
    "Correct: trois termes sous une convention cohérente.",
    "Compte deux fois l’interaction.",
    "Utilise une base d’allocation incohérente.",
    "Omet l’interaction."
   ],
   "cue": "Fixer la convention avant d’additionner.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 8,
    "pdfPages": [
     130,
     159
    ]
   },
   "numeric": {
    "expression": "(0.4-0.25)*(0.01-0.02)+0.25*(0.03-0.01)+(0.4-0.25)*(0.03-0.01)",
    "value": 0.0065,
    "optionValue": 0.0065,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi026",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-7.4",
   "reading": "IM-7",
   "concept": "Alpha et dépendance temporelle",
   "question": "A manager reports monthly alpha 0.24% and iid standard error 0.10%. A pre-specified dependence-robust estimator gives standard error 0.16%. Using the stated two-sided critical value 1.96, what conclusion is justified?",
   "choices": [
    "Significant under both estimators.",
    "Not significant under either estimator.",
    "Significant under the iid calculation but not under the dependence-robust calculation; investigate dependence rather than choosing the favorable standard error.",
    "The alpha estimate must be changed to 0.16%."
   ],
   "answer": 2,
   "explanation": "Le t iid vaut \\(0.24/0.10=2.4\\); le t robuste vaut \\(0.24/0.16=1.5\\). Seul le premier dépasse 1, 96. Une estimation de variance adaptée au processus est nécessaire; choisir après coup la plus favorable biaise l’inférence.",
   "why": [
    "Le t robuste est inférieur au seuil.",
    "Le t iid dépasse le seuil donné.",
    "Correct: la même moyenne n’a pas la même précision supposée.",
    "L’erreur standard n’est pas la moyenne estimée."
   ],
   "cue": "L’incertitude est une partie du résultat.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 8,
    "pdfPages": [
     130,
     159
    ]
   },
   "numeric": {
    "expression": "0.24/0.16",
    "value": 1.5,
    "optionValue": 1.5,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi027",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-7.8",
   "reading": "IM-7",
   "concept": "Timing et classe majoritaire",
   "question": "Markets are above the risk-free return in 80% of observed periods. A forecaster correctly calls 90% of those up periods and 10% of down periods. Under the timing coefficient \\(\\theta=p_{up}+p_{down}-1\\), which statement is correct?",
   "choices": [
    "The forecaster correctly identifies 90% of all down periods.",
    "A 74% overall hit rate necessarily proves useful timing.",
    "The overall hit rate is 74%, but the stated timing coefficient is 0.",
    "The timing coefficient is 0.74."
   ],
   "answer": 2,
   "explanation": "Exactitude totale \\(0.8(0.9)+0.2(0.1)=0.74\\). Mais \\(\\theta=0.9+0.1-1=0\\). Les fréquences conditionnelles ne montrent pas de pouvoir de timing selon ce critère, malgré 74% de bonnes réponses.",
   "why": [
    "Inverse les probabilités conditionnelles.",
    "Ignore la fréquence différente des régimes.",
    "Correct: distinguer précision globale et information conditionnelle.",
    "Confond le hit rate et le coefficient de timing."
   ],
   "cue": "Comparer chaque régime à son taux de base.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 8,
    "pdfPages": [
     130,
     159
    ]
   },
   "numeric": {
    "expression": "0.9+0.1-1",
    "value": 0,
    "optionValue": 0,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi028",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-7.1",
   "reading": "IM-7",
   "concept": "Flux externe et rendement temporel",
   "question": "A portfolio starts at 100, grows to 110 immediately before a contribution of 90 at the end of the first year, and finishes the second year at 180 with no other flows. What is its cumulative two-year time-weighted return?",
   "choices": [
    "20%",
    "80%",
    "−10%",
    "−1%"
   ],
   "answer": 3,
   "explanation": "Première période: \\(110/100-1=10\\%\\). Après apport, capital 200; seconde période \\(180/200-1=-10\\%\\). TWR cumulé \\((1.10)(0.90)-1=-1\\%\\). L’apport 90 est un flux externe, pas une performance.",
   "why": [
    "Additionne ou transforme mal les rendements.",
    "Compte l’apport comme un gain.",
    "Ne conserve que la deuxième année.",
    "Correct: chaîner les facteurs sans le flux externe."
   ],
   "cue": "Découper avant et après chaque flux externe.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 8,
    "pdfPages": [
     130,
     159
    ]
   },
   "numeric": {
    "expression": "(110/100)*(180/(110+90))-1",
    "value": -0.01,
    "optionValue": -0.01,
    "tolerance": 1e-8
   }
  },
  {
   "id": "xi029",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-8.3",
   "reading": "IM-8",
   "concept": "Fusion et espérance contre rendement apparent",
   "question": "A target trades at 96. A cash deal would pay 104; failure would leave the target worth 76. An analyst assigns a physical success probability 75%. Assume immediate resolution, no discounting, no hedges, fees or financing costs. What is expected P&L per target share?",
   "choices": [
    "1",
    "8",
    "−1",
    "0"
   ],
   "answer": 0,
   "explanation": "Gain succès 8; perte échec 20. \\(E[\\Pi]=0.75(8)+0.25(-20)=1\\). Le spread apparent de 8 n’est pas le gain espéré, et l’espérance positive ne supprime pas la perte de 20 dans l’état défavorable.",
   "why": [
    "Correct: pondérer les deux issues par les probabilités réelles données.",
    "Ne considère que la réussite.",
    "Inversion du signe du gain espéré.",
    "Utilise implicitement une probabilité de succès différente."
   ],
   "cue": "Le spread n’est pas l’espérance.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 9,
    "pdfPages": [
     160,
     199
    ]
   },
   "numeric": {
    "expression": "0.75*(104-96)+0.25*(76-96)",
    "value": 1,
    "optionValue": 1,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi030",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-8.2",
   "reading": "IM-8",
   "concept": "Gamma d’un arbitrage convertible",
   "question": "A fund’s long convertible position has equity delta 30000 shares and positive equity gamma 200 shares of delta per EUR 1 increase in the stock price. The fund shorts 30000 shares. For an instantaneous EUR 2 stock rise, approximate the new net equity delta before rebalancing, holding all other risk factors fixed.",
   "choices": [
    "−400 shares",
    "0 shares",
    "400 shares",
    "60000 shares"
   ],
   "answer": 2,
   "explanation": "Le delta de la convertible augmente de \\(200\\times2=400\\) actions. Le short reste 30000: le delta net devient 400actions. Une neutralité initiale ne persiste pas après un mouvement de spot.",
   "why": [
    "Signe incorrect pour un gamma positif.",
    "Suppose une neutralité permanente.",
    "Correct: gamma fois variation du spot, en unités de delta.",
    "Additionne les positions au lieu de tenir compte du short."
   ],
   "cue": "Gamma change le delta; le short statique ne se réajuste pas tout seul.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 9,
    "pdfPages": [
     160,
     199
    ]
   },
   "numeric": {
    "expression": "200*2",
    "value": 400,
    "optionValue": 400,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi031",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-8.4",
   "reading": "IM-8",
   "concept": "Distressed: valeur totale et classe pivot",
   "question": "A distressed investor buys unsecured debt because enterprise value is expected to recover. A fully secured debt class may absorb all reorganized value under the stated priority waterfall. Which issue is most critical before using the unsecured position as a debt-to-control strategy?",
   "choices": [
    "Whether the unsecured debt has the largest face amount.",
    "Whether the purchase price is below par.",
    "Whether the enterprise has positive sales growth.",
    "Whether the unsecured class is economically in the money under realistic valuation and negotiated allocation scenarios."
   ],
   "answer": 3,
   "explanation": "Une bonne entreprise peut laisser une classe subordonnée sans récupération si les créances prioritaires absorbent la valeur. Il faut modéliser le waterfall et les droits de la classe, sans confondre dette bon marché et droit effectif au capital.",
   "why": [
    "Le nominal ne fixe pas la priorité.",
    "Une décote peut refléter une perte définitive attendue.",
    "La croissance ne suffit pas à établir une récupération pour cette classe.",
    "Correct: identifier la classe pivot et la valeur qui lui revient."
   ],
   "cue": "La thèse porte sur une classe de créance, pas seulement sur l’entreprise.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 9,
    "pdfPages": [
     160,
     199
    ]
   }
  },
  {
   "id": "xi032",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-8.1",
   "reading": "IM-8",
   "concept": "Trend following et whipsaw",
   "question": "A trend-following managed-futures strategy cuts losses and increases positions after persistent price moves. During a month, prices repeatedly reverse direction sharply with no sustained trend. Which assessment is most defensible?",
   "choices": [
    "Repeated false signals and trading costs can produce losses; an option-like long-volatility profile is an approximation, not a payoff guarantee.",
    "The strategy must become equity-market neutral in every period.",
    "The manager can eliminate whipsaw losses by using leverage.",
    "High realized volatility guarantees a profit because trend following is identical to holding a static straddle."
   ],
   "answer": 0,
   "explanation": "Un suivi de tendance peut bénéficier de mouvements persistants, mais subir plusieurs faux départs. L’analogie avec une option résume certains comportements; elle ne rend pas le P&L identique à un straddle statique, et les coûts comptent.",
   "why": [
    "Correct: reconnaître dépendance au chemin et coûts.",
    "Le type de signal n’impose pas un bêta nul.",
    "Le levier peut amplifier les pertes.",
    "Volatilité et tendance persistante ne sont pas synonymes."
   ],
   "cue": "La volatilité sans tendance peut coûter au suiveur de tendance.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 9,
    "pdfPages": [
     160,
     199
    ]
   }
  },
  {
   "id": "xi033",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-9.1",
   "reading": "IM-9",
   "concept": "Net faible et marge brute",
   "question": "A hedge fund has NAV 80, long cash positions 240 and short cash positions 200. Its simplified gross leverage is \\((|L|+|S|)/NAV\\). Which pair of gross and net exposures relative to NAV is correct?",
   "choices": [
    "Gross 5.5x; net 0.5x",
    "Gross 3.0x; net 2.5x",
    "Gross 2.5x; net 0.5x",
    "Gross 0.5x; net 5.5x"
   ],
   "answer": 0,
   "explanation": "Brut \\((240+200)/80=5.5\\). Net \\((240-200)/80=0.5\\). La compensation du net ne dispense pas de financer et gérer les deux jambes.",
   "why": [
    "Correct: somme des valeurs absolues versus différence signée.",
    "Donne les ratios de chaque jambe séparément.",
    "Omet le long du calcul brut.",
    "Inverse les définitions."
   ],
   "cue": "Petit net peut coexister avec grand brut.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds",
   "numeric": {
    "expression": "(240+200)/80",
    "value": 5.5,
    "optionValue": 5.5,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi034",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-9.4",
   "reading": "IM-9",
   "concept": "Master feeder et risque partagé",
   "question": "Two feeder funds own interests in the same master fund. A master-fund asset is marked down materially. One feeder’s investors argue that a different domicile should insulate their NAV from the common trading loss. Which response is most accurate?",
   "choices": [
    "Correct: legal domicile removes common investment exposure.",
    "The shared master portfolio transmits its investment performance to both feeders, subject to their interests and terms; domicile alone does not insulate economic exposure.",
    "The loss must be assigned entirely to the feeder with fewer investors.",
    "Only the manager’s management company can bear trading losses."
   ],
   "answer": 1,
   "explanation": "Le portefeuille est détenu au master; chaque feeder possède une participation exposée à son résultat. Les différences de structure peuvent répondre à des besoins d’investisseurs, mais n’annulent pas les pertes communes. Vérifier aussi les modalités propres à chaque véhicule.",
   "why": [
    "Confond structure juridique et absence d’exposition économique.",
    "Correct: consolider le portefeuille commun et les droits des véhicules.",
    "Le nombre d’investisseurs n’est pas une règle d’allocation de pertes.",
    "Les investisseurs du fonds supportent les résultats d’investissement selon les termes applicables."
   ],
   "cue": "Séparer véhicules ne sépare pas les actifs communs.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds"
  },
  {
   "id": "xi035",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-9.2",
   "reading": "IM-9",
   "concept": "Réseau de financement et ventes communes",
   "question": "A supervisor sees low pairwise correlations among hedge-fund NAV returns. The same funds finance crowded trades through a few dealers, and those dealers use similar haircut triggers. Which additional dataset best addresses the potential systemic channel?",
   "choices": [
    "Only longer histories of each fund’s monthly NAV.",
    "Aggregate gross exposures, collateral, financing maturities and margin terms linking funds to dealers and common assets.",
    "The number of legal feeder funds alone.",
    "Only funds’ stated strategy labels."
   ],
   "answer": 1,
   "explanation": "Les rendements passés ne décrivent pas suffisamment le réseau des financements. Des déclencheurs de marge communs peuvent provoquer désendettement et ventes corrélées. Il faut lier expositions, actifs donnés en garantie et échéances.",
   "why": [
    "Utile mais ne révèle pas directement les obligations de financement.",
    "Correct: les données doivent suivre le mécanisme de contagion.",
    "Le nombre de véhicules ne mesure pas les liens financiers.",
    "Une étiquette de stratégie ne révèle pas les contreparties."
   ],
   "cue": "Observer les contrats qui forcent à agir ensemble.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds"
  },
  {
   "id": "xi036",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-9.3",
   "reading": "IM-9",
   "concept": "Réponse proportionnée au risque systémique",
   "question": "A proposed hedge-fund oversight framework focuses on identifying concentrations and leverage across financing channels. Which measure most directly supports that objective without presuming all funds have the same risk profile?",
   "choices": [
    "Require consistent exposure and financing reporting, while assessing counterparty risk management and concentrations.",
    "Classify every strategy with zero equity beta as risk-free.",
    "Replace all exposure data with a single past Sharpe ratio.",
    "Treat every fund registration as approval of every investment."
   ],
   "answer": 0,
   "explanation": "Des données comparables sur expositions et financement permettent d’identifier concentrations et interactions. Le contrôle doit considérer la structure de risque, pas seulement le bêta ou le statut administratif. Cet exemple décrit un principe de surveillance, pas une règle juridique universelle.",
   "why": [
    "Correct: cohérence de données et suivi des canaux économiques.",
    "Le bêta actions ignore crédit, liquidité et non-linéarités.",
    "Un ratio passé ne décrit ni le levier ni le financement.",
    "L’enregistrement ne certifie pas chaque placement."
   ],
   "cue": "Mesurer le mécanisme visé avant de fixer une réponse.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.sec.gov/newsroom/speeches-statements/ts051606sfw-hedge-funds"
  },
  {
   "id": "xi037",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-10.3",
   "reading": "IM-10",
   "concept": "Coupon flottant et capacité de service",
   "question": "A private-credit borrower has debt 120 and annual earnings available for cash interest 18. Interest is a floating base rate plus a fixed 5% spread. The base rate rises from 4% to 7%, with earnings unchanged and no hedges. What is the new interest coverage ratio, using earnings divided by annual cash interest?",
   "choices": [
    "0.80x",
    "1.25x",
    "1.67x",
    "2.00x"
   ],
   "answer": 1,
   "explanation": "Intérêts stressés \\(120(0.07+0.05)=14.4\\). Couverture \\(18/14.4=1.25\\). Elle était \\(18/10.8=1.667\\) avant le choc. Le taux flottant protège le coupon du prêteur, pas la solvabilité du débiteur.",
   "why": [
    "Inverse le ratio de couverture.",
    "Correct: intérêts sur tout le taux contractuel après choc.",
    "Conserve l’ancien taux 9%.",
    "Sous-estime les intérêts."
   ],
   "cue": "Rendement contractuel plus haut peut signifier qualité de crédit plus faible.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf",
   "numeric": {
    "expression": "18/(120*(0.07+0.05))",
    "value": 1.25,
    "optionValue": 1.25,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi038",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-10.2",
   "reading": "IM-10",
   "concept": "PIK et cash distribué",
   "question": "A private loan of 50 accrues annual interest of 12%; only 7% is paid in cash and 5% is added to principal. Ignore defaults, fees and compounding within the year. Which statement is correct at year-end?",
   "choices": [
    "Cash interest is 2.5 and principal becomes 53.5.",
    "No credit risk remains because total accrued interest is positive.",
    "Cash interest received is 6.0 and principal remains 50.",
    "Cash interest is 3.5 and principal becomes 52.5; accrued income 6.0 is not all immediately spendable."
   ],
   "answer": 3,
   "explanation": "Cash \\(50\\times7\\%=3.5\\); PIK \\(50\\times5\\%=2.5\\), donc principal 52, 5. Le revenu contractuel total 6 inclut une créance supplémentaire, dont le recouvrement dépend toujours du débiteur.",
   "why": [
    "Inverse les parts cash et capitalisée.",
    "Un intérêt comptabilisé n’est pas une garantie de recouvrement.",
    "Traite le PIK comme du cash payé.",
    "Correct: distinguer flux reçu et augmentation de créance."
   ],
   "cue": "Un revenu capitalisé ne finance pas automatiquement un besoin de cash.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf",
   "numeric": {
    "expression": "50*0.07",
    "value": 3.5,
    "optionValue": 3.5,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi039",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-10.3",
   "reading": "IM-10",
   "concept": "Closed end et levier multi-couches",
   "question": "A closed-end private-credit fund has no investor redemption rights for eight years. It borrows against its portfolio, while some investors borrow separately against their fund interests. A severe borrower downturn occurs. Which conclusion is best?",
   "choices": [
    "Only the borrowers can incur losses; lenders are isolated.",
    "Appraisal-based NAV eliminates bank exposure.",
    "Long lockups remove every possible forced-sale channel.",
    "The structure can still amplify stress through fund leverage, investor financing and collateral terms even without contractual redemptions."
   ],
   "answer": 3,
   "explanation": "Le lockup réduit un canal de run mais pas les obligations envers les financeurs ni celles des investisseurs endettés. Une baisse des valeurs peut déclencher des restrictions de dette ou besoins de cash à plusieurs étages.",
   "why": [
    "Les pertes et besoins de financement peuvent toucher les prêteurs.",
    "Une méthode de valorisation n’annule pas les engagements bancaires.",
    "Ignore les financements autres que les rachats.",
    "Correct: lire les différentes couches de levier."
   ],
   "cue": "Fermer la porte aux rachats ne ferme pas tous les canaux de financement.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf"
  },
  {
   "id": "xi040",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-10.4",
   "reading": "IM-10",
   "concept": "Données et risque de sélection des emprunteurs",
   "question": "A regulator compares two private-credit portfolios with identical reported delinquency rates. One permits repeated payment-in-kind amendments and rarely revalues loans; the other recognizes modifications and marks promptly. Which next step best improves comparability?",
   "choices": [
    "Use the portfolio with the smoother NAV as the safe benchmark.",
    "Ignore bank credit lines because the underlying loans are private.",
    "Declare identical credit quality because delinquency rates match.",
    "Collect consistent borrower-level payment, modification, leverage and valuation information and reconcile definitions before drawing conclusions."
   ],
   "answer": 3,
   "explanation": "Les défauts publiés peuvent dépendre des modifications, des paiements capitalisés et de la reconnaissance des pertes. Des définitions comparables et des données détaillées sont nécessaires avant une comparaison prudentielle.",
   "why": [
    "Le lissage peut cacher une perte non reconnue.",
    "Les lignes bancaires restent un lien financier.",
    "L’égalité du chiffre ne prouve pas l’égalité du risque.",
    "Correct: rendre comparables les mécanismes de mesure."
   ],
   "cue": "Comparer les définitions avant de comparer les ratios.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.imf.org/-/media/files/publications/gfsr/2024/april/english/ch2.pdf"
  },
  {
   "id": "xi041",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-11.3",
   "reading": "IM-11",
   "concept": "Multiple et délai de création de valeur",
   "question": "Fund A returns 1.6 times contributed capital after two years. Fund B returns the same 1.6 times after five years. Each has only one initial contribution and one final distribution, with identical fee conventions. Which statement is correct?",
   "choices": [
    "Both have the same IRR because MOIC is the same.",
    "A has a higher IRR; MOIC alone cannot compare the timing of wealth creation.",
    "B has a higher IRR because it holds capital longer.",
    "A necessarily has the higher risk-adjusted alpha."
   ],
   "answer": 1,
   "explanation": "\\(IRR_A=1.6^{1/2}-1\\approx26.49\\%\\); \\(IRR_B=1.6^{1/5}-1\\approx9.86\\%\\). La différence porte sur le temps. Le risque et le benchmark restent nécessaires pour parler d’alpha.",
   "why": [
    "Le multiple ne contient pas le temps.",
    "Correct: rendement annualisé différent pour le même multiple.",
    "La même valeur finale plus tard implique un taux annualisé plus faible.",
    "Le calendrier seul ne prouve pas une meilleure performance ajustée du risque."
   ],
   "cue": "Un multiple dit combien, pas à quelle vitesse.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns"
  },
  {
   "id": "xi042",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-11.3",
   "reading": "IM-11",
   "concept": "PME avec une distribution intermédiaire",
   "question": "An investor contributes 100 at time 0 when a public index is 100, receives 40 at time 1 when the index is 120, and receives 100 at time 2 when the index is 150. There is no remaining NAV. Define terminal-value PME as private distributions compounded to time 2 using the public index, divided by contributions compounded similarly. What is PME?",
   "choices": [
    "1.400",
    "0.933",
    "1.000",
    "1.067"
   ],
   "answer": 2,
   "explanation": "Le flux reçu à 1 vaut \\(40(150/120)=50\\) à 2; ajouter 100 donne 150. La contribution initiale capitalisée vaut \\(100(150/100)=150\\). PME \\(150/150=1\\). Le multiple 1, 40 ignore les dates.",
   "why": [
    "C’est le multiple de distributions, pas le PME.",
    "Ne capitalise pas correctement la première distribution.",
    "Correct: chaque flux suit la performance publique à partir de sa date.",
    "Applique un facteur de croissance erroné."
   ],
   "cue": "Aligner tous les flux au même horizon.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns",
   "numeric": {
    "expression": "(40*(150/120)+100)/(100*(150/100))",
    "value": 1,
    "optionValue": 1,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi043",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-11.2",
   "reading": "IM-11",
   "concept": "Ligne de souscription et IRR affiché",
   "question": "A private fund borrows on a subscription line to delay calling LP capital. The investments, sale proceeds and sale dates are unchanged; financing costs reduce total proceeds available to LPs. Which comparison is most informative?",
   "choices": [
    "Assume leverage cannot affect an IRR calculation.",
    "A higher LP IRR alone proves better underlying investment selection.",
    "Compare IRR with and without the line, net money multiples, financing costs and unlevered deal performance.",
    "Ignore all costs because LP cash is called later."
   ],
   "answer": 2,
   "explanation": "Retarder le cash investi peut augmenter l’IRR mesuré tout en faisant payer des intérêts et en réduisant le multiple net. L’effet de financement doit être distingué de la valeur créée par les actifs. Il n’est pas garanti que toute ligne améliore l’IRR.",
   "why": [
    "L’IRR dépend du calendrier des flux de l’investisseur.",
    "Confond effet de calendrier et sélection.",
    "Correct: plusieurs mesures permettent de séparer les effets.",
    "Les intérêts restent une charge économique."
   ],
   "cue": "Séparer performance de l’actif et calendrier financé de l’investisseur.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns"
  },
  {
   "id": "xi044",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-11.5",
   "reading": "IM-11",
   "concept": "Co-investissement et sélection adverse",
   "question": "A general partner offers its LP a fee-free co-investment concentrated in a single company, with a 48-hour decision window. The main fund is near its concentration limit. Which evaluation is strongest?",
   "choices": [
    "Fee-free means positive expected net alpha regardless of selection.",
    "The LP should assess stand-alone company risk, portfolio concentration, allocation incentives and diligence capacity despite lower fees.",
    "The offer proves the GP expects the company to fail.",
    "Co-investments eliminate the need to evaluate governance rights."
   ],
   "answer": 1,
   "explanation": "La baisse des frais est un avantage, mais la proposition peut refléter contraintes de concentration ou besoins de financement. Il faut analyser le dossier, les conflits potentiels et les droits sans affirmer automatiquement sélection adverse ni qualité supérieure.",
   "why": [
    "Les frais ne sont qu’une composante du résultat.",
    "Correct: évaluer à la fois l’économie et la capacité d’exécution.",
    "Le motif ne peut pas être déduit avec certitude.",
    "Les droits et protections restent matériels."
   ],
   "cue": "Des frais bas ne remplacent pas le travail de sélection.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns"
  },
  {
   "id": "xi045",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-12.5",
   "reading": "IM-12",
   "concept": "Périmètre du prestataire",
   "question": "A fund names a reputable independent administrator. During a verified direct call, the administrator says it only calculates NAV using the manager’s unverified position file and prices; it does not confirm custody or challenge illiquid valuations. Which conclusion is best?",
   "choices": [
    "The fund is proven fraudulent.",
    "Independent price checks are unnecessary if NAV arithmetic is correct.",
    "The administrator’s brand alone validates asset existence and valuation.",
    "The operational review must establish who independently confirms positions and challenges prices, because those controls are outside the stated mandate."
   ],
   "answer": 3,
   "explanation": "Le nom du prestataire n’indique pas le périmètre de sa mission. Une NAV arithmétiquement juste peut reposer sur des actifs ou prix non confirmés. Identifier les contrôles manquants sans déduire automatiquement une fraude.",
   "why": [
    "Une faiblesse de contrôle n’est pas une preuve de fraude.",
    "Une bonne addition ne valide pas les entrées.",
    "Confond réputation et étendue de mission.",
    "Correct: relier chaque risque à une vérification effective."
   ],
   "cue": "Vérifier le mandat réel de chaque prestataire.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 10,
    "pdfPages": [
     200,
     213
    ]
   }
  },
  {
   "id": "xi046",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-12.6",
   "reading": "IM-12",
   "concept": "Modèle économique après rabais et retraits",
   "question": "A management company charges 1.5% on fee-paying AUM 250m, but rebates 20% of that fee to distributors. Annual fixed costs are 2.7m. Following 20% investor withdrawals, AUM falls proportionally and costs remain fixed. Ignoring performance fees and other items, what is the annual operating surplus?",
   "choices": [
    "−0.7m",
    "0.3m",
    "0m",
    "−0.3m"
   ],
   "answer": 3,
   "explanation": "Encours \\(250(1-0.20)=200\\)m. Taux net \\(1.5\\%(1-0.20)=1.2\\%\\). Recettes 2, 4m; résultat \\(2.4-2.7=-0.3\\)m. Le taux affiché n’est pas celui conservé par la société.",
   "why": [
    "Sous-estime les revenus nets.",
    "Ignore le rabais après les retraits.",
    "N’équilibre pas correctement revenus et coûts.",
    "Correct: appliquer retraits puis taux de frais net."
   ],
   "cue": "Encours facturables, taux net et coûts fixes: trois bases à vérifier.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 10,
    "pdfPages": [
     200,
     213
    ]
   },
   "numeric": {
    "expression": "250*(1-0.2)*0.015*(1-0.2)-2.7",
    "value": -0.3,
    "optionValue": -0.3,
    "tolerance": 1e-8
   }
  },
  {
   "id": "xi047",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-12.2",
   "reading": "IM-12",
   "concept": "Attribution de track record à une équipe",
   "question": "A newly formed manager markets a successful strategy from a previous employer. The lead researcher has moved, but the execution team, data licence and portfolio risk systems have not. Which diligence action best tests repeatability?",
   "choices": [
    "Identify actual decision ownership, IP and data rights, execution capacity, controls and evidence that the new organization can reproduce the process.",
    "Reject every prior-employer record as necessarily false.",
    "Evaluate only the historical Sharpe ratio.",
    "Accept the full record because the lead researcher’s name is familiar."
   ],
   "answer": 0,
   "explanation": "Un historique peut être réel sans être transférable. La nouvelle entité doit posséder les compétences, droits, données, systèmes et contrôles qui produisaient le résultat. Vérifier les responsabilités passées et les capacités actuelles.",
   "why": [
    "Correct: tester le mécanisme de production de performance.",
    "La conclusion automatique de fausseté est excessive.",
    "Un ratio ne décrit pas les moyens nécessaires.",
    "La notoriété ne démontre pas la transférabilité."
   ],
   "cue": "Un track record suit un processus, pas seulement un nom.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 10,
    "pdfPages": [
     200,
     213
    ]
   }
  },
  {
   "id": "xi048",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-12.4",
   "reading": "IM-12",
   "concept": "Contrôle indépendant et preuve d’escalade",
   "question": "A fund has a written rule requiring independent risk approval before exceeding leverage limits. The manager supplies the policy but cannot produce breach logs, approvals or examples of rejected trades. What is the strongest next step?",
   "choices": [
    "Replace leverage analysis with a reference from a successful investor.",
    "Treat the written policy as evidence that the control always operates.",
    "Test a sample of actual exposures against limits and seek contemporaneous approvals, escalations and independent authority evidence.",
    "Assume no breaches occurred because no logs exist."
   ],
   "answer": 2,
   "explanation": "L’existence documentaire ne prouve pas l’exécution. Reconstituer des expositions et vérifier les traces datées permet de tester fonctionnement, indépendance et possibilités d’override. L’absence de logs peut elle-même révéler une faiblesse à traiter.",
   "why": [
    "La réputation ne vérifie pas l’application de la règle.",
    "Confond conception et fonctionnement.",
    "Correct: tester des opérations réelles avec preuves de contrôle.",
    "L’absence de trace ne prouve pas l’absence d’événement."
   ],
   "cue": "Un contrôle se vérifie sur les décisions qu’il a effectivement changées.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "bookRef": {
    "year": 2024,
    "chapter": 10,
    "pdfPages": [
     200,
     213
    ]
   }
  },
  {
   "id": "xi049",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-13.1",
   "reading": "IM-13",
   "concept": "Détresse de liquidité et dates",
   "question": "A firm has unrestricted cash 7m today, an enforceable receivable 9m payable in six weeks, and debt 12m due in two weeks. No other cash flows or available facilities exist. What is the immediate minimum financing shortfall at the debt date?",
   "choices": [
    "3m",
    "5m",
    "12m",
    "0m because total cash plus receivables exceeds debt."
   ],
   "answer": 1,
   "explanation": "À deux semaines, seul le cash 7m est disponible. Besoin \\(12-7=5\\)m. L’encaissement à six semaines peut soutenir une solution relais, mais ne supprime pas le problème à la date contractuelle.",
   "why": [
    "Soustrait mal les flux ou mélange les dates.",
    "Correct: comparer les ressources disponibles à l’échéance.",
    "Ignore les 7m déjà disponibles.",
    "Ignore le calendrier."
   ],
   "cue": "Un encaissement futur n’est pas du cash présent.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "numeric": {
    "expression": "12-7",
    "value": 5,
    "optionValue": 5,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi050",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-13.2",
   "reading": "IM-13",
   "concept": "Cession versus pont de financement",
   "question": "A viable firm faces a temporary cash gap 4m. A noncore asset has credible value 10m if sold normally in six months, but an immediate forced sale would realize 5m. A binding six-month bridge is available at total cost 0.8m and can be repaid from that normal sale. Ignore taxes and all other risks. Which action preserves more value under the stated assumptions?",
   "choices": [
    "Forced sale, because borrowing is always worse than selling assets.",
    "Bridge then normal sale, because the 0.8m financing cost is less than the 5m forced-sale discount.",
    "Both actions preserve the same value because they cover the gap.",
    "Neither can address a liquidity gap."
   ],
   "answer": 1,
   "explanation": "La vente forcée sacrifie 5m de valeur. Le bridge coûte 0, 8m et permet une vente normale: avantage relatif 4, 2m sous les hypothèses données. En pratique, tester réalisation du prix, garanties et calendrier du bridge.",
   "why": [
    "Le choix dépend des coûts et de la faisabilité.",
    "Correct: comparer la valeur préservée nette du coût.",
    "Couvrir le même besoin ne signifie pas sacrifier la même valeur.",
    "Ces actions peuvent fournir du cash si elles sont exécutables."
   ],
   "cue": "Choisir un remède selon la valeur préservée après coûts.",
   "tier": "deep",
   "level": 4,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives"
  },
  {
   "id": "xi051",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-13.2",
   "reading": "IM-13",
   "concept": "Restructuration et valeur de coordination",
   "question": "Assume a firm’s reorganized value is 90 and liquidation value is 60. Debt due now is 100. A binding consensual restructuring would preserve 90 and distribute it proportionally to all creditors, with no new costs. What is the creditors’ aggregate gain from restructuring rather than liquidation, and does restructuring fully repay them?",
   "choices": [
    "Gain 40; yes.",
    "Gain 30; no, total recovery remains 90 against 100 owed.",
    "Gain 10; no.",
    "Gain 30; yes, because the firm survives."
   ],
   "answer": 1,
   "explanation": "Le gain de coordination est \\(90-60=30\\). Mais récupération 90 sur 100: perte 10 même après sauvetage de valeur. Préserver la continuité n’annule pas la perte liée au surendettement.",
   "why": [
    "Le gain est 90 moins 60, pas 100 moins 60.",
    "Correct: comparer la valeur sauvée et le montant contractuel séparément.",
    "10 représente la perte résiduelle, pas le gain de restructuration.",
    "La survie de l’activité n’implique pas remboursement intégral."
   ],
   "cue": "Sauver de la valeur n’est pas recréer tout le nominal.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "numeric": {
    "expression": "90-60",
    "value": 30,
    "optionValue": 30,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi052",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-13.3",
   "reading": "IM-13",
   "concept": "Priorité sous hypothèses données",
   "question": "For this hypothetical restructuring, the court-approved rules preserve secured creditors’ priority over collateral proceeds and temporarily stay individual enforcement. An analyst says the stay makes unsecured debt rank equally with secured debt. Which response is correct?",
   "choices": [
    "Correct if unsecured creditors are more numerous.",
    "Incorrect because a stay guarantees full recovery to secured creditors.",
    "Correct: a stay always cancels security interests.",
    "Incorrect under the stated rules: delaying enforcement does not by itself change the priority waterfall."
   ],
   "answer": 3,
   "explanation": "Selon les hypothèses explicites de l’exercice, le stay change le calendrier des poursuites, pas le rang de sûreté. La récupération dépend encore de la valeur du collatéral et des règles applicables; aucune règle universelle n’est affirmée ici.",
   "why": [
    "Le nombre ne remplace pas le rang contractuel donné.",
    "Priorité ne veut pas dire garantie de valeur suffisante.",
    "Contredit la règle de priorité donnée.",
    "Correct: distinguer suspension d’action et allocation de valeur."
   ],
   "cue": "Droit d’agir maintenant et droit d’être payé en premier sont distincts.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives"
  },
  {
   "id": "xi053",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-14.2",
   "reading": "IM-14",
   "concept": "Capacité optionnelle de la stratégie déclarée",
   "question": "A fund claims to operate a large split-strike conversion strategy. Public market data suggest the option volume required would be a substantial share of the relevant market, yet no independently confirmed positions or OTC counterparties are provided. Which next step is most diagnostic?",
   "choices": [
    "Accept smooth returns as evidence that trades were executed.",
    "Reconcile the claimed capacity with independently confirmed option positions, counterparties, settlements and plausible market activity.",
    "Assume any off-exchange trade is fraudulent.",
    "Check only whether the fund’s annual return exceeds the index."
   ],
   "answer": 1,
   "explanation": "Le point à vérifier est la cohérence entre mécanisme, taille et traces indépendantes. Des opérations OTC peuvent exister; leur invocation exige une confirmation adaptée et ne supprime pas la vérification.",
   "why": [
    "La performance publiée ne confirme pas les positions.",
    "Correct: tester la faisabilité et les preuves d’exécution.",
    "L’OTC n’est pas en soi frauduleux.",
    "Le niveau de rendement ne vérifie pas la capacité de la stratégie."
   ],
   "cue": "Une stratégie revendiquée doit laisser des traces vérifiables.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639"
  },
  {
   "id": "xi054",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-14.2",
   "reading": "IM-14",
   "concept": "Confirmation indépendante détournée",
   "question": "A prospective fund sends a custodian confirmation by forwarding an email attachment from the manager’s own account. The investor is forbidden from contacting the named custodian directly. Which assessment is strongest?",
   "choices": [
    "Forwarding a document proves the fund is fraudulent.",
    "The issue is immaterial if the manager charges low fees.",
    "The attachment is equivalent to a direct confirmation from a verified custodian contact.",
    "The restriction undermines independent verification; obtain authenticated confirmation through independently established contact details before relying on it."
   ],
   "answer": 3,
   "explanation": "Une pièce transmise par la partie contrôlée n’a pas la même force qu’une confirmation obtenue directement auprès d’un contact authentifié. La restriction constitue un signal d’alerte majeur à résoudre sans affirmer une fraude démontrée.",
   "why": [
    "Le signal ne suffit pas seul à établir juridiquement une fraude.",
    "Les frais n’affectent pas l’existence des actifs.",
    "La chaîne de transmission et l’authentification comptent.",
    "Correct: la source doit être indépendante et vérifiée."
   ],
   "cue": "Vérifier l’origine de la preuve, pas seulement son apparence.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639"
  },
  {
   "id": "xi055",
   "topic": "investment",
   "skill": "i-alpha",
   "objective": "IM-14.1",
   "reading": "IM-14",
   "concept": "Cohérence du split-strike",
   "question": "A manager states that the fund holds an equity basket, buys protective puts and sells calls against that exposure. What return pattern should an investigator consider plausible for that claimed structure, before fees and additional trades?",
   "choices": [
    "Downside protection over the stated put region and constrained upside beyond the call strike, with basis and implementation risks still possible.",
    "A guaranteed identical positive return every month.",
    "No dependence on equity prices or option prices at any time.",
    "Unlimited equity upside with no downside protection cost."
   ],
   "answer": 0,
   "explanation": "Une structure de type collar peut limiter certaines pertes à l’horizon des puts et plafonner certains gains par les calls. Les strikes, maturités, base, coûts et exécution restent déterminants. Elle ne promet pas un rendement positif constant.",
   "why": [
    "Correct: la structure conditionne les zones de payoff.",
    "Aucun de ces instruments ne garantit une série mensuelle constante.",
    "Le portefeuille reste exposé aux prix des actions et des options.",
    "Ignore la vente de calls et le coût éventuel des protections."
   ],
   "cue": "Comparer le payoff déclaré à ce qui est effectivement publié.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639"
  },
  {
   "id": "xi056",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-14.2",
   "reading": "IM-14",
   "concept": "Feeder et délégation de diligence",
   "question": "An investor allocates through a feeder whose distributor says a prestigious group of existing investors has already done all necessary checks on the underlying manager. The feeder has never independently confirmed assets or evaluated the manager’s affiliated broker. Which response is best?",
   "choices": [
    "The feeder should establish its own documented diligence and independent asset verification; delegated access does not eliminate those information gaps.",
    "A feeder can never perform due diligence.",
    "The presence of an affiliated broker proves every trade is fictitious.",
    "Existing investors’ prestige substitutes for the missing controls."
   ],
   "answer": 0,
   "explanation": "L’effet de réputation peut créer une diligence supposée chez les autres mais jamais exécutée. Il faut préciser les responsabilités et combler les lacunes par des vérifications indépendantes. Une affiliation est un conflit à examiner, pas une preuve automatique de transactions fictives.",
   "why": [
    "Correct: éviter la délégation circulaire de confiance.",
    "Le feeder peut et doit disposer d’un processus adapté à ses responsabilités.",
    "L’affiliation appelle un examen des conflits et contrôles.",
    "La réputation ne confirme aucun actif."
   ],
   "cue": "Tout le monde croit que quelqu’un d’autre a vérifié: chercher la preuve.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1335639"
  },
  {
   "id": "xi057",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-15.3",
   "reading": "IM-15",
   "concept": "Scénario conditionnel et P&L du portefeuille",
   "question": "Two zero-mean jointly Gaussian standardized factors have correlation 0.6. A scenario fixes \\(z_1=-3\\), while \\(Z_2\\mid z_1\\) has mean \\(0.6z_1\\) and variance \\(1-0.6^2\\). A portfolio’s linear P&L is \\(10z_1-20Z_2\\) million euros. What are conditional expected P&L and conditional P&L standard deviation?",
   "choices": [
    "−66m; 16m",
    "−30m; 0m",
    "+6m; 0m",
    "+6m; 16m"
   ],
   "answer": 3,
   "explanation": "Moyenne secondaire \\(0.6(-3)=-1.8\\); P&L conditionnel espéré \\(10(-3)-20(-1.8)=+6\\)m. Écart-type secondaire \\(\\sqrt{1-0.6^2}=0.8\\); écart-type du P&L \\(20(0.8)=16\\)m. Une moyenne conditionnelle cohérente ne supprime pas l’incertitude résiduelle.",
   "why": [
    "Inverse le signe de la contribution du second facteur.",
    "Ignore l’exposition au second facteur et sa variabilité.",
    "Calcule la moyenne mais la traite à tort comme un résultat certain.",
    "Correct: mapper la moyenne et la dispersion conditionnelles dans le portefeuille."
   ],
   "cue": "Une transmission conditionnelle a une moyenne et un risque résiduel.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3",
   "numeric": {
    "expression": "10*(-3)-20*(0.6*(-3))",
    "value": 6,
    "optionValue": 6,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi058",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-15.1",
   "reading": "IM-15",
   "concept": "Densité versus probabilité de scénario",
   "question": "A team evaluates a continuous multivariate Gaussian density at one exact scenario and labels the resulting number a 12% probability that the exact scenario will occur. Which correction is most appropriate?",
   "choices": [
    "Replace the density value by the scenario’s monetary loss.",
    "Every exact point of a continuous distribution has zero probability; define a region or event before assigning a probability.",
    "The density value must always equal the probability of the point.",
    "A zero point probability means the scenario is economically impossible."
   ],
   "answer": 1,
   "explanation": "Une densité n’est pas une masse de probabilité. Un point exact a une probabilité nulle dans un modèle continu, mais une région autour du point peut avoir une probabilité positive. La plausibilité doit préciser l’événement et les unités.",
   "why": [
    "Une perte mesure la sévérité, pas la fréquence.",
    "Correct: probabiliser une région définie.",
    "Confond densité et probabilité, avec unités différentes.",
    "Tous les points exacts ont masse nulle; cela ne les rend pas impossibles comme observations arrondies."
   ],
   "cue": "Définir l’événement avant d’annoncer sa probabilité.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3"
  },
  {
   "id": "xi059",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-15.4",
   "reading": "IM-15",
   "concept": "Covariance singulière et rupture de base",
   "question": "A scenario model contains two historically almost identical yield series. A pseudoinverse assigns almost no additional distance to a shock in their poorly identified spread direction after discarding a tiny eigenvalue. Which risk challenge is strongest?",
   "choices": [
    "The portfolio’s legal documentation is enough to restore covariance invertibility.",
    "Discarding the direction proves the spread cannot move.",
    "The model may suppress a relevant basis-break scenario; inspect data, rank assumptions and stress the spread separately rather than interpreting truncation as safety.",
    "Every pseudoinverse automatically produces conservative risk estimates."
   ],
   "answer": 2,
   "explanation": "Une faible variance historique peut refléter une relation stable, une mesure pauvre ou une absence de régime de rupture. En supprimant la direction, on peut exclure précisément le scénario important. L’algorithme ne démontre pas l’absence de risque économique.",
   "why": [
    "Un contrat ne répare pas directement une estimation statistique.",
    "Une hypothèse de rang n’est pas une loi de marché.",
    "Correct: vérifier les directions omises et les risques de base.",
    "La troncature peut retirer du risque."
   ],
   "cue": "Une direction supprimée du modèle peut rester un vrai risque.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3"
  },
  {
   "id": "xi060",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-15.3",
   "reading": "IM-15",
   "concept": "Mapping économique et sensibilité non linéaire",
   "question": "A market-driven scenario implies a 200bp rate rise. The portfolio contains callable bonds whose duration changes sharply when rates move. The team applies only the initial duration and reports a small loss. What is the most useful next step?",
   "choices": [
    "Treat Mahalanobis distance as the bond price change.",
    "Keep initial duration because the scenario is already severe.",
    "Revalue callable cash flows under the joint scenario, including changed exercise behavior and relevant spread assumptions.",
    "Replace the rate move with zero because duration is unstable."
   ],
   "answer": 2,
   "explanation": "Le scénario décrit les facteurs, pas directement la perte des instruments. Une option embarquée peut modifier les cash-flows et la duration. Revaloriser dans le scénario permet de traiter l’effet de convexité et d’exercice, avec hypothèses explicites.",
   "why": [
    "Distance statistique et variation de prix ont des unités différentes.",
    "La sévérité du choc renforce le besoin d’une revalorisation adaptée.",
    "Correct: la transmission doit respecter la structure des instruments.",
    "L’instabilité d’une approximation ne supprime pas le risque."
   ],
   "cue": "Scénario cohérent et valuation correcte sont deux étapes.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.wiley-vch.de/de/fachgebiete/finanzen-wirtschaft-recht/blackrock-39-s-guide-to-fixed-income-risk-management-978-1-119-88487-3"
  },
  {
   "id": "xi061",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-16.5",
   "reading": "IM-16",
   "concept": "Rachat et portefeuille restant",
   "question": "A fund has NAV 200, consisting of cash 20, liquid bonds 60 and illiquid loans 120. It pays redemptions 40 by using all cash and selling 20 of liquid bonds at book value. Ignore costs and other price changes. What is the illiquid share of remaining NAV?",
   "choices": [
    "60%",
    "66.7%",
    "75%",
    "80%"
   ],
   "answer": 2,
   "explanation": "NAV restant 160; prêts illiquides 120. Poids \\(120/160=75\\%\\), contre 60% initialement. Le paiement des premiers rachats a augmenté la fragilité potentielle du portefeuille restant.",
   "why": [
    "Conserve le dénominateur avant rachat.",
    "Utilise un rachat ou un numérateur incorrect.",
    "Correct: les actifs illiquides n’ont pas été vendus.",
    "Ne correspond pas à 120 sur 160."
   ],
   "cue": "Toujours recalculer le fonds après la waterfall.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications",
   "numeric": {
    "expression": "120/(200-40)",
    "value": 0.75,
    "optionValue": 0.75,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi062",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-16.3",
   "reading": "IM-16",
   "concept": "Coût de liquidation et unité bps",
   "question": "For this exercise only, one-way transaction cost is \\(c(q)=5+4\\sqrt{q/V}\\) basis points, with order amount q and daily volume V in the same currency units. A fund sells EUR 9m with V=EUR 1m. What is the estimated monetary transaction cost?",
   "choices": [
    "EUR 170000",
    "EUR 1530",
    "EUR 15300",
    "EUR 153000"
   ],
   "answer": 2,
   "explanation": "\\(q/V=9\\); coût \\(5+4\\sqrt9=17\\)bps. Montant \\(9{,}000{,}000(17/10{,}000)=15{,}300\\)EUR. Cette fonction est une hypothèse pédagogique, pas une formule propriétaire universelle.",
   "why": [
    "Applique une mauvaise base monétaire.",
    "Divise encore par 10.",
    "Correct:17bps sur 9m.",
    "Traite 17bps comme 1, 7%."
   ],
   "cue": "Coût bps × montant /10000.",
   "tier": "deep",
   "level": 4,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications",
   "numeric": {
    "expression": "9000000*(5+4*Math.sqrt(9/1))/10000",
    "value": 15300,
    "optionValue": 15300,
    "tolerance": 1e-9
   }
  },
  {
   "id": "xi063",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-16.5",
   "reading": "IM-16",
   "concept": "Rachats concentrés et dépendance",
   "question": "A fund’s liquidity model assumes thousands of investor accounts redeem independently. In fact, one investment adviser controls 35% of NAV across many accounts and follows a common risk-limit policy. What change most improves redemption stress testing?",
   "choices": [
    "Ignore investor information and rely only on bond trading volume.",
    "Treat every account as independent because legal account numbers differ.",
    "Model the adviser-controlled block and other common decision drivers as dependent redemption sources, including tail scenarios.",
    "Use the average daily historical redemption as a worst-case bound."
   ],
   "answer": 2,
   "explanation": "Le nombre de comptes surestime la diversification si une seule décision les relie. Il faut identifier les décideurs économiques, leurs contraintes et des scénarios de rachats conjoints. Les données d’actifs seules ne modélisent pas la demande de cash.",
   "why": [
    "La liquidité d’actifs ne donne pas les obligations de rachat.",
    "Confond unité administrative et unité de décision.",
    "Correct: représenter la concentration économique.",
    "Une moyenne n’est pas une borne de queue."
   ],
   "cue": "Compter les décisions de rachat, pas seulement les comptes.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications"
  },
  {
   "id": "xi064",
   "topic": "investment",
   "skill": "i-stress",
   "objective": "IM-16.4",
   "reading": "IM-16",
   "concept": "Outil exceptionnel et règles explicites",
   "question": "Assume a fund’s governing documents and applicable rules permit in-kind redemptions only with investor consent, while temporary suspension requires regulatory approval in exceptional conditions. An investor refuses an in-kind settlement during market closure. Which action is consistent with those stated conditions?",
   "choices": [
    "Unilaterally deliver illiquid securities because the fund has a cash shortage.",
    "Follow the specified approval process for any suspension and seek an authorized solution; the shortage alone does not override the consent condition.",
    "Promise cash on the normal date regardless of settlement ability.",
    "Declare all asset-liquidity risk eliminated by the option to suspend."
   ],
   "answer": 1,
   "explanation": "L’exercice fixe les conditions: le consentement et les approbations ne sont pas facultatifs. Le problème doit être escaladé selon le dispositif applicable, avec information et traitement appropriés. Un outil exceptionnel gère une situation, sans supprimer le risque économique.",
   "why": [
    "Contredit la condition explicite de consentement.",
    "Correct: respecter les conditions du mécanisme disponible.",
    "Une promesse sans ressources peut aggraver la situation.",
    "La suspension ne crée ni acheteurs ni valeur."
   ],
   "cue": "Un outil n’est disponible que sous ses conditions d’emploi.",
   "tier": "deep",
   "level": 4,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.bis.org/publications/open-ended-bond-funds-systemic-risks-and-policy-implications"
  },
  {
   "id": "xi065",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-17.4",
   "reading": "IM-17",
   "concept": "Déslissage à deux retards",
   "question": "A specified appraisal model is \\(r_t^{obs}=0.6r_t^*+0.3r_{t-1}^{obs}+0.1r_{t-2}^{obs}\\). The observed returns are −1% now, 2% one period ago and 4% two periods ago. What is the implied current latent return?",
   "choices": [
    "−1.67%",
    "−3.33%",
    "−5.0%",
    "−1.0%"
   ],
   "answer": 1,
   "explanation": "Isoler \\(r_t^*=[-1\\%-0.3(2\\%)-0.1(4\\%)]/0.6=-2\\%/0.6=-3.333\\%\\). Les deux valeurs retardées positives soutiennent le mark observé: la performance latente doit être plus mauvaise.",
   "why": [
    "Divise seulement l’observation courante par 0, 6.",
    "Correct: retirer toutes les composantes retardées avant de diviser.",
    "Utilise un coefficient ou un signe incorrect.",
    "Ne déslisse pas."
   ],
   "cue": "Inverser le modèle écrit, sans réutiliser automatiquement une formule à un seul retard.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "numeric": {
    "expression": "(-0.01-0.3*0.02-0.1*0.04)/0.6",
    "value": -0.03333333333333333,
    "optionValue": -0.0333,
    "tolerance": 0.00005
   }
  },
  {
   "id": "xi066",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-17.3",
   "reading": "IM-17",
   "concept": "Annualisation et covariance des périodes",
   "question": "Four additive quarterly returns each have variance 1 squared percentage-point. Every distinct pair has covariance 0.25 in the same units. What is the standard deviation of their annual sum?",
   "choices": [
    "2.00percentage points",
    "2.65percentage points",
    "4.00percentage points",
    "7.00percentage points"
   ],
   "answer": 1,
   "explanation": "Il y a 6paires. Variance de la somme \\(4(1)+2(6)(0.25)=7\\). Écart-type \\(\\sqrt7\\approx2.646\\)points. La règle iid aurait donné 2 et sous-estimerait ici le risque.",
   "why": [
    "Ignore les covariances positives.",
    "Correct: chaque covariance entre deux périodes apparaît deux fois.",
    "Additionne les écarts-types, comme si corrélation 1.",
    "Donne la variance à la place de l’écart-type."
   ],
   "cue": "Annualiser la variance de la somme, pas seulement la variance d’une période.",
   "tier": "deep",
   "level": 5,
   "dimension": "application",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "numeric": {
    "expression": "Math.sqrt(4+2*6*0.25)",
    "value": 2.6457513110645907,
    "optionValue": 2.65,
    "tolerance": 0.005
   }
  },
  {
   "id": "xi067",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-17.6",
   "reading": "IM-17",
   "concept": "Dénominateur et appels de capital simultanés",
   "question": "A portfolio initially has liquid public assets 60 and private assets 40. Public assets fall by 30%, private marks are unchanged, then an already-contracted capital call of 8 is paid from the liquid pool and added to private assets at the same value. Ignore all other flows and costs. What is the reported private-asset weight after the call?",
   "choices": [
    "40.0%",
    "48.8%",
    "58.5%",
    "66.7%"
   ],
   "answer": 2,
   "explanation": "Publics après baisse \\(60(0.7)=42\\), puis 34 après appel. Privés 48. NAV total 82 inchangé par le transfert interne. Poids privé \\(48/82\\approx58.54\\%\\). Baisse publique et appel augmentent ensemble le poids illiquide.",
   "why": [
    "Ignore la baisse et l’appel.",
    "Ne tient compte que de la baisse avant appel.",
    "Correct: appel comme transfert de liquide à privé, non comme apport externe.",
    "Utilise un mauvais dénominateur."
   ],
   "cue": "Appel déjà engagé: baisse du liquide, hausse du privé, pas création de richesse.",
   "tier": "deep",
   "level": 5,
   "dimension": "critical",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives",
   "numeric": {
    "expression": "(40+8)/(60*(1-0.3)+40)",
    "value": 0.5853658536585366,
    "optionValue": 0.585,
    "tolerance": 0.0005
   }
  },
  {
   "id": "xi068",
   "topic": "investment",
   "skill": "i-private",
   "objective": "IM-17.4",
   "reading": "IM-17",
   "concept": "Déslissage et incertitude du modèle",
   "question": "An analyst estimates a smoothing coefficient very close to 1 from a short private-asset return series and mechanically inverts the model, obtaining enormous latent volatility. Which assessment is most defensible?",
   "choices": [
    "Set latent volatility equal to zero because marks were stable.",
    "Choose the coefficient that gives the highest Sharpe ratio.",
    "The inverted estimate is exact because any autoregression identifies true economic risk.",
    "Near-unit smoothing can strongly amplify measurement error; assess parameter uncertainty, alternative models and independent transaction evidence."
   ],
   "answer": 3,
   "explanation": "L’inversion divise par un coefficient proche de zéro et peut amplifier bruit et erreur d’estimation. Le déslissage n’est pas une mesure sans hypothèses: robustesse, plausibilité et preuves externes sont nécessaires.",
   "why": [
    "La stabilité des marks peut masquer du risque.",
    "Le paramètre ne doit pas être choisi pour embellir la performance.",
    "Une régression courte n’identifie pas automatiquement le mécanisme latent.",
    "Correct: distinguer risque révélé et instabilité de l’inversion."
   ],
   "cue": "Déslisser révèle parfois le risque, mais peut aussi amplifier le bruit.",
   "tier": "deep",
   "level": 5,
   "dimension": "understanding",
   "source": "https://www.garp.org/landing/frm-learning-objectives",
   "sourceRef": "https://www.garp.org/landing/frm-learning-objectives"
  }
 ],
 "reviewNotes": {
  "uploadedEdition": 2024,
  "currentObjectiveEdition": 2026,
  "currentReadingsMissingFromInvestmentPDF": [
   "IM-9",
   "IM-10",
   "IM-11",
   "IM-13",
   "IM-14",
   "IM-15",
   "IM-16",
   "IM-17"
  ],
  "partialOlderSupport": [
   "IM-8",
   "IM-9"
  ],
  "note": "Original educational material; references locate concepts and objectives, not official exam-question validation. All numerical scenarios and wording are original. No uploaded PDF text or book problem is republished."
 }
};
