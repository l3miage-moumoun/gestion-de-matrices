# Gestion de matrices : L3 Miage 2023-2024

## Configuration de votre github

Nous allons configurer votre github pour lui faire générer le site correspondant à votre projet.
Pour cela, nous nous appuierons sur les github pages et les github actions. 
A chaque fois que vous pousserez une nouvelle version de votre code sur le dépôt, il sera compilé via une github action et le résultat de la compilation sera mis en ligne sur github pages.

Rendez-vous à l'adresse de votre dépôt github, puis cliquez sur le bouton `Settings` en haut à droite.
Dans le menu à gauche, cliquez sur `Pages`, puis configurer comme suit :

* Source : `Deploy from a branch`
* Branch : `gh-pages`  /  `root`
* Puis cliquez sur `Save`

## Configuration du fichier package.json

Modifier le script associé à la commande `build`, remplacez `l3m-tp-2-matrix-2023-2024` par le nom de votre dépôt (devrait être de la forme `l3m-tp-2-matrix-2023-2024-GITHUBID` avec `GITHUBID` votre identifiant github).

Cette configuration est nécessaire pour que l'application puisse fonctionner une fois déployer sur votre github pages.

## Sujet

Dans ce TP, nous allons gérer des matrices de nombres. 
Le fichier src/app/matrix.ts défini les structures de données que nous allons utiliser.
Si vous avez lu le bloc de cours **Typescript avancé**, vous pouvez vous exercer à lire et comprendre les définitions présentes dans ce fichier, n'héistez pas poser des questions (sinon vous pouvez passer outre et vous contentez d'utiliser les fonctions fournies).

### Étape 1 : création des matrices M1 et M2

Dans le composant racine `app.component.ts`, définissez les signaux suivants :
* `sigL1` : un signal de `number` qui indiquera le nombre de lignes de la matrice M1.
* `sigH1` : un signal de `number` qui indiquera le nombre de colonnes de la matrice M1. 
* `sigL2` : un signal de `number` qui indiquera le nombre de lignes de la matrice M2.
* `sigH2` : un signal de `number` qui indiquera le nombre de colonnes de la matrice M2.
* `sigM1` : un signal calculé à partir des signaux sigL1 et sigH1 
          qui initialisera une matrice de nombre M1 de dimensions sigL1() x sigH1().
          Vous utiliserez pour cela la fonction `initMatrixIntRandom`du fichier `src/app/matrix.ts.`
* `sigM2` : un signal calculé à partir des signaux sigL2 et sigH2 
          qui initialisera une matrice de nombre M2 de dimensions sigL2() x sigH2().


### Étape 2 : Affichage

Cette partie se fait en trois étapes :

1. Réglage par l'utilisateur des signaux sigL1, sigH1, sigL2 et sigH2.
2. Affichage simple des matrices M1 et M2 au format JSON.
3. Définition et utilisation d'un composant `matrix` pour afficher les matrices M1 et M2.

#### Étape 2.1 : Réglage des signaux

Utilisez des balises `<input type="number">` pour permettre à l'utilisateur de régler les valeurs des signaux sigL1, sigH1, sigL2 et sigH2. Faites attention à bien data-binder ces balises avec les signaux correspondants.

Pour vérifier que tout est bien data-bindé, vous pouvez afficher les valeurs des signaux dans des balises `<pre>`.

#### Étape 2.2 : Affichage simple des matrices M1 et M2 au format JSON.

Affichez les matrices M1 et M2 au format JSON dans des balises `<pre>`. 
Utilisez le pipe json pour avoir un affichage plus lisible.

#### Étape 2.3 : Définition et utilisation d'un composant `matrix`

Définissez un composant `matrix` qui prendra en entrée une matrice de nombre et qui l'affichera dans un tableau HTM. Pour cela, ouvrez un terminal et placez vous à la racine de votre projet, saisissez la commande suivante : 

```bash
npx ng generate component matrix --change-detection OnPush
```

Ce composant prend en entré un attribut `data` de type `Matrix<number, number, number>` et l'affiche dans un tableau HTML auquel vous attribuerez la classe CSS `matrix`.

Vous pouvez spécifier la fichier scss correspondant à ce composant en utilisant la définition de style suivante :

```scss
$W: 32px;

:host {
    display: inline-block;
    text-align: center;
    cursor: pointer;

    table.matrix {
        border-collapse: collapse;
        border: 1px solid black;

        td {
            border: 1px solid black;
            width: $W;
            height: $W;

            &.highlight {
                background-color: #ff0;
            }
        }

        input {
            width: 2em;
        }
    }
}
```

### Étape 3 : addition et multiplication des matrices

Nous allons définir les signaux suivants :

* `sigM1plusM2` : un signal calculé à partir des signaux sigM1 et sigM2 qui calcule la somme des matrices M1 et M2. Si la somme n'est pas possible, le signal renvoie undefined. Vous pourrez utiliser la fonction `addIntMatrixes` du fichier `src/app/matrix.ts`.
* `sigM1xM2` : un signal calculé à partir des signaux sigM1 et sigM2 qui calcule le produit des matrices M1 et M2. Si le produit n'est pas possible, le signal renvoie undefined.
Vous pourrez utilisez la fonction `multiplyIntMatrixes` du fichier `src/app/matrix.ts`.

Affichez les matrices résultantes de ce signaux, si le signal renvoie la valeur `undefined`, affichez alors un texte indiquant `matrice non définie`.

### Étape 4 : Un peu plus d'interaction

Nous voulons maintenant coder le comportement suivante : Lorsqu'on passe le curseur sur une des cases de la matrice M1 + M2, alors on illumine les cases des matrices M1 et M2 qui ont étées impliquées dans son calcul. De même, lorsqu'on passe le curseur sur une des cases de la matrice M1 x M2, alors on illumine la ligne de M1 et la colonne de M2 qui ont étées impliquées dans son calcul.

Voir cette [démonstration en ligne](https://alexdmr.github.io/l3m-tp-2-matrix-2023-2024/) pour mieux comprendre ce que l'on veut faire.


#### Indications :

* Dans votre composant matrix :
    * Ajoutez une sortie `pointerOver` qui émet les les coordonnées de la case survolée si il y en a une (au format `[line: number, column: number]`) et undefined sinon. Utilisez pour cela les événements `pointerenter` et `pointerleave`.
    * Ajoutez une entrée `highlight` de type Highlight avec une valeur par défaut `undefined`. Utilisez la définition du type Highlight suivante :

```typescript
export type HighlightLine = {line: number};
export type HighlightColumn = {column: number};
export type HighlightCell = {cell: [line: number, column: number]};
export type Highlight = undefined
                      | HighlightLine
                      | HighlightColumn
                      | HighlightCell;
```

* Toujours dans le composant `matrix`
    * Ajoutez la classe CSS `highlight` aux balises td concernées par la valeur de l'entrée `highlight`. 
    * Pour vous aider, vous pourrez définir une méthode `isHighlighted(line: number, column: number): boolean` qui renvoie true si la case de coordonnées (line, column) est concernée par l'entrée `highlight` et false sinon.
*  Dans le composant `app.component.ts` :
    * Définissez les signaux de type `Highlight` suivant : 
        * `sigHhilightInM1` : ce qu'il faut illuminer dans M1.
        * `sigHhilightInM2` : ce qu'il faut illuminer dans M2.
        * `sigHhilightInM1plusM2` : ce qu'il faut illuminer dans M1 + M2.
        * `sigHhilightInM1xM2` : ce qu'il faut illuminer dans M1 x M2.
    * Définissez et utilisez la méthode `overM1plusM2( c?: [line: number, column: number] ): void` qui sera appelée lorsque la sortie `pointerOver` de la matrice M1 + M2 produira une valeur. Dans cette méthode, vous gèrerez les valeurs produites par les signaux définis au point précédent.
    * De même, définissez et utilisez la méthode `overM1xM2( c?: [line: number, column: number] ): void` qui sera appelée lorsque la sortie `pointerOver` de la matrice M1 x M2 produira une valeur.