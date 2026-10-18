# FRM Pocket

Une station, une notion. Application mobile de révision FRM II, utilisable hors ligne, avec synchronisation privée entre appareils.

## Version 9 — progression synchronisée

Ouvre **https://frm-pocket-charaf.zgcharaf.chatgpt.site/** sur téléphone et ordinateur et connecte-toi au même compte ChatGPT. Le badge **Synchronisé** indique la dernière vérification réussie ; une nouvelle réponse est envoyée automatiquement, avec vérification toutes les 30 secondes lorsque l’app est visible. Le retour du réseau et la réouverture déclenchent un nouvel essai. Les sessions et chronos restent propres à chaque appareil.

Depuis l’ancienne version GitHub, exporte les progrès dans Réglages, puis utilise **Importer et fusionner** dans la version privée. Une copie avant fusion est téléchargée ; une copie avant la première synchronisation est aussi conservée dans le journal de cet appareil. Les imports qui se recouvrent utilisent des compteurs conservateurs et réunissent les réponses identifiables. Ne pas effacer les données de l’ancienne app avant vérification.

Le serveur utilise les identifiants ChatGPT fournis par Sites et une base D1 liée au projet. Chaque lecture et écriture est filtrée par identifiant utilisateur côté serveur. Aucune clé, aucun mot de passe et aucun jeton n’est intégré aux fichiers publics. Le service worker exclut les routes de compte et de synchronisation du cache. Les réponses, erreurs, notes, déclarations de lecture, historiques et roadmap sont fusionnés ; les copies des notes en conflit restent accessibles dans les réglages. Un seul onglet par navigateur prend la main pour éviter des écritures concurrentes dans le même journal.

[Détails du protocole, migration et limites](docs/SYNC_V9.md). Les sections v1–v8 ci-dessous décrivent l’historique du produit ; leurs anciennes limites de stockage local sont remplacées par cette version.

```bash
node tests/sync.mjs
node tests/sync-ui.mjs
```

## Version 8 — roadmap adaptative et apprentissage par chapitre

**Plan → Roadmap** affiche les 107 lectures du programme 2026, les cinq priorités expliquées, une projection selon le budget, et les changements observés avec les réponses. Accès direct : `#roadmap`. Chaque chapitre relie compréhension, application, raisonnement critique et rappel différé ; les prérequis sont conseillés sans bloquer l’accès.

| Contenu actuel | Nombre | Lecture du compteur |
| --- | ---: | --- |
| Questions originales uniques | 1 102 | 1 062 en pratique + 40 checkpoints réservés |
| Nouveaux cas Approfondir | 502 | 143 compréhension, 187 application, 172 raisonnement critique |
| Guides de chapitre | 107 | Principes, rappels, pièges, problème travaillé et références |
| Objectifs avec au moins un cas précisément relié | 591/591 | Une présence ne couvre pas toutes les composantes d’un objectif |
| Cartes | 1 193 | 1 062 reprises de questions + 131 cartes ouvertes, dont 107 nouvelles |
| Fiches de formules | 174 | Dont 152 nouvelles avec variables, hypothèses et pièges |
| Diagnostics de pièges | 231 | Dans les guides ; pas 231 objectifs supplémentaires |
| Questions ouvertes de rappel | 321 | Trois prompts par lecture |

La roadmap tient compte des erreurs, de la certitude erronée, des dimensions non testées, des rappels et des faiblesses déclarées dans les mocks. Les notes, lectures cochées, perceptions et cartes orientent le travail sans gonfler les scores. Les recommandations quotidiennes se recalculent avec les preuves ; le plan v6 gardait ses lectures fixes dans la journée. Les mocks de quatre heures remplacent les tâches de lecture du jour. Une étape de 25 minutes n’est pas une promesse d’apprendre un chapitre entier ; les lectures sans créneau distinct restent visibles.

Le **score global de préparation v1 /100 et son historique sont conservés**. Les indices de chapitre, séparés, exposent leurs échantillons et ne créent aucun historique passé. Un corrigé consulté pendant une session en pause annule le caractère inédit de sa question. Les sauvegardes conservent l’ancienne clé et les identifiants ; les nouveaux champs sont inclus dans l’export/import.

Les cinq livres 2024 ont fait l’objet d’une correspondance complète de leurs **93 chapitres**, de revues des sections substantielles et mécanismes d’exercices, et de contrôles ciblés des formules/pages. Cela ne constitue pas une vérification ligne par ligne des 1 709 pages ou de chaque exercice. Les différences 2024–2026, lectures absentes, sources récentes partiellement accessibles et corrections sont tracées dans [la revue détaillée](docs/ROADMAP_V8.md) et [les audits](docs/review-v8/). Les PDFs fournis ne sont jamais publiés. Tous les nouveaux problèmes sont originaux ; la difficulté n’est pas étalonnée sur l’examen réel.

Vérification : 101 contrôles de comportement, 16 de roadmap, 13 de typographie ; 149 calculs des nouveaux cas recomputés, 835 segments LaTeX explicites plus 152 formules compilés strictement ; intégrité des questions, mappings et cache hors ligne. Le moteur réel rend les 12 406 champs de la banque sans erreur LaTeX. Les auteurs et relecteurs ont aussi contrôlé les réponses depuis les énoncés. L’interface DOM est simulée en Node ; les gestes et l’affichage sur iPhone physique restent non vérifiés.

```bash
node tests/verify.cjs
node tests/roadmap.cjs
node tests/enrichment.cjs
node tests/content.cjs
node tests/math.cjs
node tests/offline.cjs
```

Les données relues sont dans `content/` ; `node scripts/build-enrichment.cjs` produit les six packs `deep-*.js` et leur registre. Cache et URL actuels en v9, LaTeX et polices locaux, fonctionnement hors ligne après téléchargement complet. [Brief d’apprentissage renforcé](docs/LEARNING_BRIEF_V8.md).

## Version 7 — formules LaTeX lisibles, 18 octobre 2026

Les équations des questions, réponses, cartes, corrigés, leçons et fiches sont rendues avec KaTeX 0.19.0 local : fractions, racines, puissances, indices et symboles grecs. Les fiches affichent leurs équations dans un bloc distinct. Les longues expressions se défilent horizontalement dans leur propre zone, avec espacement renforcé sur téléphone. Les notes personnelles acceptent `\( ... \)` et `\[ ... \]` et montrent un aperçu mathématique à la saisie.

Le moteur, sa feuille de style et les 20 polices WOFF2 intégrées sont préchargés dans le cache v7 : aucun CDN nécessaire, y compris en mode hors ligne après chargement complet. La licence MIT et les informations d’intégrité du paquet sont conservées dans `vendor/katex/`. Les textes et clés de la banque, identifiants, sauvegardes et calculs du score restent inchangés.

Validation : `node tests/math.cjs` vérifie les 22 fiches, tous les segments LaTeX explicites, 6 456 champs de la banque, les groupements numériques/indices, l’échappement des notes et les polices embarquées. Les 92 contrôles de comportement, les contrôles de contenu et la simulation hors ligne passent également. [Détails de la revue mathématique](docs/MATH_RENDERING_V7.md). L’affichage dans Safari et sur iPhone physique reste à vérifier.

## Version 6 — préparation du 24 novembre 2026

Le nouvel onglet **Plan** transforme la banque en programme quotidien : bilan initial de 20 questions inédites, sélection de cas sur les objectifs non explorés et les erreurs arrivées à échéance, vérification ciblée de 2 à 4 lectures, débrief et rappels différés. Un chapitre entièrement nouveau demande un vrai temps d’apprentissage dans les supports officiels, au-delà d’une vérification rapide. Les règles, lectures et résultats de mocks sont conservés dans la sauvegarde locale.

### Banque et couverture

**600 questions originales uniques** : 560 en entraînement (60 fondamentaux, 80 Exam-style, 48 Challenge, 372 Programme) et 40 réservées aux checkpoints. **584 cartes** : 560 reprises de questions, plus 24 cartes de raisonnement ; ce ne sont pas 584 notions supplémentaires.

La nouvelle banque Programme contient 54 Market, 70 Credit, 72 Operational, 52 Liquidity, 84 Investment et 40 Current Issues. L’ensemble possède des mappings explicites sur **107 lectures et 412 des 591 objectifs**. Les **179 objectifs sans question précisément reliée restent visibles**, pour être étudiés dans les supports officiels. Un mapping indique une pratique partielle du sujet, pas la maîtrise de tout l’objectif. Les 372 nouveaux cas et leurs réponses ont fait l’objet d’une revue distincte, avec corrections tracées dans [le compte rendu de contenu](docs/CONTENT_REVIEW_V6.md). Les 88 nouveaux calculs ont été recomputés ; cela ne constitue pas un étalonnage psychométrique.

### Programme et calibration

Budget initial ajustable : 90 minutes en semaine, 180 le week-end. Les simulations complètes réservent 240 minutes et remplacent la séance ordinaire. Les tâches de lecture du jour restent fixes une fois affichées ; la file de questions s’ajuste aux preuves et ne demande pas de rattraper mécaniquement toutes les questions non faites.

| Date proposée | Travail |
| --- | --- |
| Premier départ | Checkpoint inédit 20 Q /60 min, puis débrief |
| 25 octobre | Second checkpoint inédit 20 Q /60 min |
| 1 novembre | Simulation de l’app, 80 Q /4 h |
| 8 novembre | Mock officiel GARP 1, à réaliser dans le support officiel |
| 15 novembre | Mock officiel GARP 2, à réaliser dans le support officiel |
| 21 novembre | Bloc mixte 20 Q /60 min |
| 22–23 novembre | Rappels courts, règles personnelles et organisation |

Les lendemains des trois mocks longs sont dédiés au débrief. Les dates se recalculent par rapport à la date d’examen réglée et restent des propositions : le programme n’écrit pas dans un agenda. Les règles de dates utilisent le fuseau Europe/Paris, y compris après changement d’heure.

Le suivi des mocks officiels/externe enregistre date, score /80, durée, première tentative déclarée, conditions, lectures faibles et notes. Une reprise du même mock reste visible, mais n’est pas une nouvelle validation inédite. Les résultats futurs, les reprises, les tentatives avec aide ou de plus de quatre heures ne remplissent pas les jalons de mocks officiels. L’objectif initial de 70 % est **un objectif personnel ajustable, pas un seuil de réussite GARP**. Les résultats saisis et les cases de lecture/débrief ne modifient jamais le score de pratique /100.

Les jalons séparés du score demandent des preuves dans chaque domaine, une exploration de chaque lecture, la consolidation des erreurs avec certitude et deux mocks GARP inédits dans les conditions choisies au-dessus de l’objectif personnel. Ce sont des outils de préparation, **aucune garantie de réussite ou probabilité de passage n’est calculée**.

### Vérifications et sources

```bash
node tests/verify.cjs
node tests/content.cjs
node tests/offline.cjs
```

92 vérifications de comportement, intégrité des 600 questions/mappings, 88 nouveaux calculs et options numériques, plus installation/migration/scope du cache hors ligne. Les vérifications DOM sont simulées ; Safari, installation et mode avion sur iPhone physique restent à vérifier. La clé locale, les anciennes réponses, les sessions et l’historique de score v1 sont préservés. Le cache et les URL sont en v6. Aucun compte, API payante ou synchronisation cloud nécessaire à l’application.

Sources primaires vérifiées le 18 octobre 2026 : GARP [format de l’examen](https://www.garp.org/frm/program-exams), [supports et deux mocks Part II](https://www.garp.org/frm/study-materials), [objectifs 2026](https://www.garp.org/landing/frm-learning-objectives), [lectures obligatoires](https://www.garp.org/frm/readings/required). Les sources propres aux questions sont renseignées dans leurs corrections. Questions originales indépendantes, pas des questions officielles ni des reproductions de mocks. L’index de pratique v1 reste inchangé pour conserver la comparabilité de son historique.

Les descriptions de versions précédentes ci-dessous sont conservées pour historique ; la v8 ci-dessus fait référence pour le comportement actuel.

## Version 5 — préparation et évaluations, 17 octobre 2026

- **Préparation /100 et courbe dans le temps**, visibles sur Accueil et Coach, avec relevés chiffrés accessibles. Historique créé à partir des observations réelles, jamais reconstitué à partir d’anciennes moyennes.
- **40 questions originales réservées** aux checkpoints : 8 Market, 8 Credit, 8 Operational, 6 Liquidity, 6 Investment, 4 Current Issues. Deux blocs inédits de 20 si la réserve n’a pas été entamée. Banque totale : 228 questions, dont 188 accessibles en entraînement habituel ; 212 cartes inchangées. Les 29 nouveaux cas numériques sont recomputés indépendamment.
- **Évaluations sans corrigé immédiat** : checkpoint 20 Q /60 min, bloc 10 Q /30 min, mock 80 Q /4 h en proportions 16/16/16/12/12/8. Réponses modifiables, drapeaux, grille de navigation, contrôle des réponses manquantes et remise explicite. Le délai absolu persiste après fermeture ; une copie échue est remise à la réouverture avec les choix sauvegardés. Les questions sans réponse sont incorrectes. Remise sans double comptage ; résultats inédits et déjà vus séparés.
- **Mini-leçons persistantes** : piège du choix incorrect, explication, reformulation personnelle sauvegardée à la saisie, comparaison au repère et auto-vérification, autre cas du même objectif si disponible sinon du même groupe (limite signalée), puis contrôle après 24 h. La reformulation n’est pas automatiquement notée. Les variantes ne consomment pas la réserve de checkpoints.
- **Objectifs 2026** : inventaire de 107 lectures et 591 objectifs. Les numéros d’objectifs après le point sont locaux et suivent l’ordre des puces dans le guide officiel ; le libellé complet est accessible dans ce guide. 143 questions sont précisément reliées à 77 objectifs. Les autres références restent générales ; aucun crédit automatique pour toute une lecture. Les lacunes sont affichées. Les références LCR/NSFR sont corrigées vers ORR-22.
- **Détails des erreurs** par cas, objectif, choix et raison associée, avec cause déclarée, erreurs faites avec certitude et leçon correspondante.
- **Sauvegarde** : rappel hebdomadaire après 10 réponses, export/import incluant score, relevés, leçons, réserve utilisée et copie active. Clé locale et identifiants précédents conservés. Cache et URLs passés à v5 avec les nouveaux modules. Aucun compte ni synchronisation cloud.

### Indice d’étude /100 : formule v1

Fenêtre glissante de 42 jours. 60 points de performance sur premières réponses inédites aux cas appliqués/Challenge/checkpoint, pondérés par domaines 20/20/20/15/15/10 ; 20 points d’étendue (jusqu’à deux réponses inédites réussies par chacun des 24 groupes) ; 10 points de rétention (dernière réponse objective après au moins 24 h depuis la dernière réponse et le dernier affichage, sur 24 questions) ; 10 points de réponses inédites correctes en évaluations chronométrées (20 questions pour le plein poids). Le total est arrondi. Un domaine non évalué contribue zéro ; le signal reste provisoire avant 40 réponses inédites, dont au moins quatre par domaine.

Les fondamentaux, cartes auto-évaluées et répétitions immédiates ne donnent pas de points de performance. Une question déjà pratiquée ou affichée en carte/corrigé dans l’app ne compte pas comme inédite. Ce suivi des affichages commence en v5 ; une ancienne première réponse n’est pas inventée. Les erreurs peuvent faire baisser le score ; les preuves vieillissantes sortent de la fenêtre. L’indice n’est ni une probabilité de réussite, ni une estimation de note GARP. L’étendue de 24 groupes ne prouve pas une couverture intégrale du programme. Les questions sont originales, indépendantes et non étalonnées sur l’examen officiel.

### Vérification v5

71 vérifications Node couvrent l’ancien comportement et les nouveaux calculs, les réserves, la séparation des corrigés, les drapeaux et choix modifiables, le délai absolu et la récupération, les leçons et contrôles différés, les mappings d’objectifs, l’échappement du texte et les sauvegardes. `node tests/offline.cjs` vérifie l’installation du cache, l’isolation des mises à jour, le repli hors ligne et le scope du service worker. Les interactions DOM sont simulées ; Safari, installation et mode avion sur iPhone physique restent à vérifier sur l’appareil.

```bash
node tests/verify.cjs
node tests/offline.cjs
```

Les sections suivantes documentent aussi les versions antérieures ; la description v5 ci-dessus fait référence pour le comportement actuel.

## Utilisation

- Sessions de 5, 10 ou 20 questions, à rythme libre. Repère de cadence pour les cas appliqués : 3 minutes par question.
- 188 questions originales en anglais : 60 fondamentaux, 80 cas Exam-style et 48 cas Challenge, avec corrections et repères en français.
- 212 cartes : 188 cartes liées aux questions et 24 cartes de raisonnement ouvertes, avec auto-évaluation et suivi séparé.
- 22 formules avec hypothèses, recherche et filtres par domaine.
- Répétition espacée : erreur après 10 minutes ; rappel hésitant le lendemain ; rappel solide après 1 puis 3 jours, puis intervalles croissants.
- Favoris, notes, reprise après interruption, objectif quotidien et historique.
- Sauvegarde locale et export/import JSON pour transférer sa progression.
- PWA : installation sur l’écran d’accueil et fonctionnement hors ligne après un premier chargement complet. Attendre « Disponible hors ligne ».

Sur iPhone : ouvrir dans Safari, Partager → Sur l’écran d’accueil. Ouvrir ensuite la version installée avec une connexion. Les espaces de stockage du navigateur et de l’app installée peuvent être distincts : exporter/importer la progression si nécessaire.

## Coach et Challenge — version 3

48 nouveaux cas plus exigeants (25 avec contrôle numérique indépendant) et 24 cartes de raisonnement ouvertes. Deux cas Challenge par groupe de compétence ; huit cas par domaine. Cette banque ciblée n’est pas répartie selon le blueprint de l’examen : le bloc Exam-style de 20 questions conserve sa répartition 4/4/4/3/3/2.

### Boucle de travail

1. Ouvrir Coach, puis lancer le diagnostic de 12 questions (deux par domaine).
2. Répondre et, facultativement, indiquer son degré de certitude avant de valider.
3. Pour une erreur, revoir le choix incorrect et le corrigé, choisir soi-même une cause (concept, formule, calcul, lecture ou réponse devinée), puis écrire une règle de correction.
4. Utiliser les questions ciblées et cartes liées du groupe de compétence.
5. Revenir pour les rappels différés. Une erreur reste à consolider jusqu’à deux réussites espacées sur deux jours distincts, chacune au moins dix minutes après l’erreur la plus récente. Une nouvelle erreur réinitialise cette étape. Une compétence dont les erreurs ont été consolidées peut repasser à « À entretenir », même si son historique de premiers essais reste faible.

### Preuves et limites

- Le suivi comporte 24 groupes de compétences. Sans réponse, le groupe est non évalué. Avec moins de trois premiers essais connus, le signal est limité.
- Les premiers essais sont observés une seule fois par question après cette mise à jour. Pour des questions déjà travaillées dans les versions précédentes, le premier résultat est inconnu : il n’est pas reconstitué à partir du taux historique.
- Les reprises n’améliorent pas rétroactivement le premier résultat. Une erreur faite avec certitude est signalée pour attirer l’attention, sans prétendre en déduire sa cause.
- Les cartes sont auto-évaluées et ne contribuent pas au score objectif des premiers essais en QCM. Les 24 cartes dédiées demandent une réponse ouverte ; les cartes liées aux QCM affichent les propositions et demandent une justification mentale avant révélation.
- L’entraînement ciblé choisit parmi les banques avancées : erreurs arrivées à échéance, questions inédites sur les compétences fragiles, exploration et rappels, avec diversification des groupes. Il évite une reprise avant son échéance ; une session peut être plus courte quand le stock éligible est épuisé.
- Les références de lecture repèrent les sujets. La difficulté n’est pas calibrée sur les questions officielles et le tableau de compétences n’est pas une prédiction de réussite.

Le carnet, les causes déclarées, les règles et un maximum de 2 000 réponses détaillées sont enregistrés dans le navigateur et inclus dans l’export JSON. Les anciens identifiants, la clé de stockage et les sessions sont conservés. Pas de télémetrie ni de lecture à distance de la progression du téléphone. Le cache et les URLs de ressources sont passés à v4.

## Extension Exam-style — 16 octobre 2026

80 nouvelles questions, dont 46 numériques, avec quatre propositions, un raisonnement détaillé et une analyse de chaque choix. Chaque question porte un repère de lecture du programme 2026. Les anciens identifiants q001–q060 et la clé de stockage sont conservés.

| Domaine | Nouveaux cas | Repère de programme |
| --- | ---: | ---: |
| Market | 16 | 20 % |
| Credit | 16 | 20 % |
| Operational | 16 | 20 % |
| Liquidity | 12 | 15 % |
| Investment | 12 | 15 % |
| Current Issues | 8 | 10 % |

Le bloc mixte de 20 questions utilise 4/4/4/3/3/2 questions, sans doublon dans le bloc, avec correction immédiate et temps actif indicatif (~60 min). Ce n’est pas un mock chronométré : il peut être mis en pause. Les autres sessions respectent les filtres de domaine et de banque.

Les repères de lecture ont été rapprochés des Learning Objectives 2026 de GARP. Ils localisent le sujet étudié ; ils ne constituent pas une certification de la difficulté ou du contenu. La difficulté et la proportion calcul/jugement ne sont pas calibrées sur une session réelle. Les questions ne sont ni des souvenirs d’examen, ni une paraphrase des mocks. Les deux mocks officiels de 80 questions accessibles aux candidats GARP restent la référence de calibration.

L’interface distingue les banques Exam-style, Fondamentaux et Tout. Les corrections des nouveaux cas expliquent les quatre choix dans l’ordre affiché, même après mélange. Le cache est passé à v2, avec URLs de ressources versionnées ; fermer puis rouvrir ou recharger l’app avec une connexion pour recevoir la mise à jour. Ne pas vider les données du site.

## Contenu pédagogique

La banque est un complément ciblé et non exhaustif. Les questions sont originales, ne sont pas des questions officielles et ne reproduisent pas les mocks ou le curriculum GARP. Les cartes réutilisent les notions de la banque de questions ; elles ne constituent pas des notions supplémentaires.

Current Issues : six questions de base et huit nouveaux cas avec références de lecture. Ils ne remplacent pas l’étude des lectures obligatoires.

Sources de cadrage vérifiées le 16 octobre 2026 (le PDF Learning Objectives a été contrôlé dans une copie du document publié par GARP) :
- https://www.garp.org/landing/frm-learning-objectives
- https://www.garp.org/frm/study-materials
- https://www.garp.org/frm/readings/required

Les scores concernent uniquement cette banque et ne prédisent pas un résultat à l’examen. Outil indépendant, sans affiliation à GARP.

## Développement

Cette copie GitHub Pages contient l’interface statique à la racine de `frm-pocket/`. Le serveur privé est déployé et versionné dans le dépôt source du projet Sites. Les modules partagés `lib/sync-*.mjs` et la migration SQL sont conservés ici pour les tests du protocole ; GitHub Pages ne les exécute pas.

```bash
node tests/sync.mjs
node tests/sync-ui.mjs
node tests/verify.cjs
python -m http.server 8000
```

Les URLs et le scope du service worker sont relatifs. Le backend utilise le même compte ChatGPT uniquement à l’adresse privée ; cette copie ne fait aucun appel à son API.

## Vérification

43 vérifications Node : banque et réponses, pages, scoring sans double comptage, sauvegarde de session, quiz/cartes séparés, échéances, filtres, échappement du texte, présence des ressources hors ligne, formules numériques. Les calculs des 46 nouvelles questions numériques sont recomputés indépendamment, y compris la cohérence des options sélectionnées. Les filtres, proportions du bloc mixte et sauvegardes antérieures sont contrôlés. Les interactions DOM sont simulées ; affichage, installation et mode avion sur iPhone restent à vérifier sur l’appareil réel.

Version privée : progression locale et cloud liée au compte ChatGPT. Version GitHub : progression locale avec export et lien de migration. Aucune télémétrie ni clé API publique.
