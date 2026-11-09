# Empereur, Citoyen, Esclave (ECE)

Version en ligne du jeu de duel **Empereur, Citoyen, Esclave** pour un club de jeux de cartes.
Les membres créent leur profil, jouent contre l'ordinateur en 12 manches, et toutes les parties sont gardées dans un historique.

🔗 **Site en ligne :** https://fertaqfatimaezzahra.github.io/brief2-s2/

## Les règles

| Duel | Résultat |
| --- | --- |
| Empereur contre Citoyen | L'Empereur gagne |
| Citoyen contre Esclave | Le Citoyen gagne |
| Esclave contre Empereur | L'Esclave gagne |
| Citoyen contre Citoyen | Égalité (les deux cartes sont enlevées, on rejoue) |

- Camp de l'Empereur : 1 Empereur + 4 Citoyens. Camp de l'Esclave : 1 Esclave + 4 Citoyens.
- 12 manches en 4 groupes de 3. Le joueur commence Empereur, les camps changent après les manches 3, 6 et 9.
- À chaque duel, le camp qui joue en premier change (Empereur, puis Esclave, puis Empereur…).
- Une manche gagnée rapporte **1 point** dans le camp de l'Empereur et **5 points** dans le camp de l'Esclave.

## Fonctionnalités

**Profils (`index.html`)**
- Ajouter un profil : pseudo de 3 à 15 caractères (`/^[A-Za-z0-9_]{3,15}$/`), pseudo unique (sans tenir compte des majuscules), avatar choisi dans une liste. Les erreurs s'affichent sous les champs, en rouge.
- Afficher les profils : avatar, pseudo, nombre de parties jouées.
- Modifier un profil (le formulaire se remplit avec les valeurs, mêmes vérifications).
- Supprimer un profil après confirmation. Ses parties restent dans l'historique avec le nom « Joueur supprimé ».
- Choisir le joueur qui joue. Son pseudo est affiché en haut de chaque page.

**Jeu (`game.html`)**
- Impossible de lancer une partie sans joueur choisi (bouton désactivé).
- Les cartes de l'ordinateur sont cachées. Le joueur clique sur une carte, l'ordinateur choisit au hasard, les deux cartes se retournent (animation).
- Pendant l'animation (`setTimeout`), les cartes sont désactivées : impossible de jouer deux fois.
- Affichage : manche (x/12), groupe (x/4), camp du joueur, qui joue en premier, score des deux côtés.
- Fin de partie : gagnant + score, enregistrement dans l'historique, bouton « Play again ».

**Historique (`history.html`)**
- Toutes les parties, de la plus récente à la plus ancienne : date, pseudo, score, résultat.
- Recherche par pseudo (majuscules/minuscules ignorées).
- Filtres par résultat (toutes, victoires, défaites, égalités) et par date (aujourd'hui, 7 derniers jours, tout). La recherche et les filtres marchent ensemble.
- Suppression d'une partie après confirmation.
- Message clair quand aucune partie ne correspond.

Les profils, le joueur choisi et l'historique sont gardés dans le **LocalStorage** : rien n'est perdu au rechargement.

## Organisation du code

```
├── index.html        Page des profils
├── game.html         Page du jeu
├── history.html      Page de l'historique
├── images/           Captures d'écran
└── src/
    ├── main.js       Point de départ : lance le site et écoute les clics
    ├── game.js       Règles du jeu seulement (mains, duel(), manches, score). Ne touche jamais à la page
    ├── players.js    Ajouter, modifier, supprimer les profils (+ vérification du pseudo)
    ├── history.js    Enregistrer les parties, chercher et filtrer
    ├── storage.js    Lire et écrire dans le LocalStorage
    ├── ui.js         Tout ce qui s'affiche à l'écran
    ├── input.css     Source Tailwind (+ animation de la carte)
    └── output.css    CSS généré par Tailwind
```

Les fichiers se partagent leurs fonctions avec `export` / `import`. Le HTML charge seulement `src/main.js` avec `<script type="module">`.

JavaScript moderne utilisé : fonctions fléchées, template literals, déstructuration (`const { nickname, avatar } = player`), spread (copie des mains et des objets), `map`, `filter`, `find`, `findIndex`, `some`, `sort`.

La fonction `duel(carteJoueur, carteOrdinateur)` dans `src/game.js` renvoie `"victoire"`, `"défaite"` ou `"égalité"`.

## Lancer le projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Fertaqfatimaezzahra/brief2-s2.git
   ```
2. Ouvrir le dossier dans VS Code et lancer `index.html` avec **Live Server** (les modules JS ne marchent pas avec un double-clic sur le fichier).
3. Pour modifier le style, regénérer le CSS avec Tailwind :
   ```bash
   npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
   ```

## Git

- `main` : version en ligne (GitHub Pages). `develop` : version en cours.
- Une branche par fonctionnalité (`feature/players-crud`, `feature/game-duel`, `feature/history-filters`…), fusionnée dans `develop` par Pull Request relue.

## Bonus réalisés

Aucun pour le moment.

## Captures d'écran

### Liste des profils
![Players List](images/profiles.png)

### Formulaire avec erreurs
![Form Validation](images/validation.png)
