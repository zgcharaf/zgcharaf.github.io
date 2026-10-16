# FRM Pocket

Une station, une notion. Application mobile de révision FRM II, sans serveur ni dépendance externe.

## Utilisation

- Sessions indicatives de 5, 10 ou 20 minutes (5, 10 ou 20 questions).
- 60 questions originales en anglais, corrections et repères en français.
- 60 cartes liées aux mêmes questions, avec auto-évaluation et suivi séparé.
- 22 formules avec hypothèses, recherche et filtres par domaine.
- Répétition espacée : erreur après 10 minutes ; rappel hésitant le lendemain ; rappel solide après 1 puis 3 jours, puis intervalles croissants.
- Favoris, notes, reprise après interruption, objectif quotidien et historique.
- Sauvegarde locale et export/import JSON pour transférer sa progression.
- PWA : installation sur l’écran d’accueil et fonctionnement hors ligne après un premier chargement complet. Attendre « Disponible hors ligne ».

Sur iPhone : ouvrir dans Safari, Partager → Sur l’écran d’accueil. Ouvrir ensuite la version installée avec une connexion. Les espaces de stockage du navigateur et de l’app installée peuvent être distincts : exporter/importer la progression si nécessaire.

## Contenu pédagogique

La banque est un complément ciblé et non exhaustif. Les questions sont originales, ne sont pas des questions officielles et ne reproduisent pas les mocks ou le curriculum GARP. Les cartes réutilisent les notions de la banque de questions ; ce ne sont pas 60 notions supplémentaires.

Current Issues : six exercices de concepts généraux rattachés aux thèmes publiés pour 2026. Ils ne remplacent pas l’étude des lectures obligatoires.

Sources de cadrage vérifiées le 16 octobre 2026 :
- https://www.garp.org/frm/study-materials
- https://www.garp.org/frm/readings/required

Les scores concernent uniquement cette banque et ne prédisent pas un résultat à l’examen. Outil indépendant, sans affiliation à GARP.

## Développement

Les fichiers de production sont dans ce dossier. Aucun build nécessaire. Servir ce dossier sur HTTPS pour utiliser le service worker ; localhost fonctionne aussi en développement.

```bash
python -m http.server 8000
node tests/verify.cjs
```

`data.js` contient les questions et formules ; `engine.js` la logique de révision ; `app.js` l’interface. `sw.js` met en cache uniquement les fichiers de l’application et limite son interception à son propre dossier. Lors d’une mise à jour, incrémenter le nom du cache dans `sw.js` et la vérification correspondante dans `app.js`.

Pour GitHub Pages, publier le contenu de `dist/` dans un dossier dédié, par exemple `frm-pocket/`. Les URLs et le scope du service worker sont relatifs. Pas besoin de modifier le site parent ni son workflow Pages.

## Vérification

17 vérifications Node : banque et réponses, pages, scoring sans double comptage, sauvegarde de session, quiz/cartes séparés, échéances, filtres, échappement du texte, présence des ressources hors ligne, formules numériques. Les interactions DOM sont simulées ; affichage, installation et mode avion sur iPhone restent à vérifier sur l’appareil réel.

La progression est locale au navigateur. Aucun compte, télémétrie, clé API ou synchronisation cloud dans le code de l’application.
