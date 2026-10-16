# FRM Pocket

Une station, une notion. Application mobile de révision FRM II, sans serveur ni dépendance externe.

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

Les fichiers de production sont dans ce dossier. Aucun build nécessaire. Servir ce dossier sur HTTPS pour utiliser le service worker ; localhost fonctionne aussi en développement.

```bash
python -m http.server 8000
node tests/verify.cjs
```

`data.js` contient les fondamentaux et formules ; `exam.js` contient les 80 cas appliqués ; `challenge.js` contient les 48 cas avancés, les 24 cartes ouvertes et la classification des compétences ; `coach.js` contient les règles adaptatives locales ; `engine.js` la logique de révision ; `app.js` l’interface. `sw.js` met en cache uniquement les fichiers de l’application et limite son interception à son propre dossier. Lors d’une mise à jour, incrémenter le nom du cache dans `sw.js` et la vérification correspondante dans `app.js`.

Pour GitHub Pages, publier le contenu de `dist/` dans un dossier dédié, par exemple `frm-pocket/`. Les URLs et le scope du service worker sont relatifs. Pas besoin de modifier le site parent ni son workflow Pages.

## Vérification

43 vérifications Node : banque et réponses, pages, scoring sans double comptage, sauvegarde de session, quiz/cartes séparés, échéances, filtres, échappement du texte, présence des ressources hors ligne, formules numériques. Les calculs des 46 nouvelles questions numériques sont recomputés indépendamment, y compris la cohérence des options sélectionnées. Les filtres, proportions du bloc mixte et sauvegardes antérieures sont contrôlés. Les interactions DOM sont simulées ; affichage, installation et mode avion sur iPhone restent à vérifier sur l’appareil réel.

La progression est locale au navigateur. Aucun compte, télémétrie, clé API ou synchronisation cloud dans le code de l’application.
