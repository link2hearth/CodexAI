# CodexAI Idle Game Prototype

Ceci est une base de jeu **idle** 

Votre personnage combat automatiquement un ennemi à la fois.
Les images des ennemis changent selon leur niveau (`enemy1.1.png`, `enemy1.2.png`...).
Par défaut, chaque niveau comporte 10 ennemis avec des PV augmentant de 10 à chaque étape.
Le menu "Personnage" sert de page d'équipement avec un emplacement d'arme
équipé d'une épée infligeant 2 dégâts par seconde.

## Démarrage
Ouvrez simplement `index.html` dans votre navigateur.

Les images PNG du héros, de l'arme et des ennemis se trouvent dans le dossier `assets/`.
Pour ajouter de nouveaux monstres, placez un fichier nommé `enemyX.Y.png`
(`X` = monde, `Y` = sous-niveau) et ajustez la constante `ENEMIES_PER_STAGE`
dans `main.js` si vous souhaitez un autre nombre d'ennemis par niveau.


## Développement
Aucun outil de build n'est nécessaire pour cette démo.

## Tests
Pour l'instant il n'y a pas de tests, la commande suivante affiche un message :
```bash
npm test
```
