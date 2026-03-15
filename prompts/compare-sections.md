# Compare Sections — JL Studio Builder
## Prompt pour Claude API + Vision : comparaison semantique original vs configurateur

Tu recois DEUX screenshots cote a cote :
- **Gauche** : le screenshot ORIGINAL du site source
- **Droite** : le screenshot du CONFIGURATEUR (notre reproduction)

Tu dois decrire EXACTEMENT ce qui differe entre les deux, de facon actionnable.

## Ce que tu dois comparer

### 1. Structure / Layout
- Le nombre de colonnes est-il le meme ?
- La disposition des elements est-elle identique (split, centree, grille) ?
- Les proportions image/texte sont-elles respectees ?
- Y a-t-il des elements manquants ou en trop ?

### 2. Couleurs
- Le fond est-il de la meme couleur ?
- Les couleurs de texte correspondent-elles ?
- Les boutons ont-ils la bonne couleur ?
- Les accents (icones, badges, ornements) sont-ils dans la bonne teinte ?

### 3. Typographie
- Les titres ont-ils la meme taille relative ?
- Le poids (bold, light, normal) est-il correct ?
- La casse est-elle respectee (uppercase, capitalize, normal) ?
- L'espacement des lettres est-il similaire ?

### 4. Images
- Les images sont-elles presentes ?
- Ont-elles la bonne taille et les bonnes proportions ?
- Les coins sont-ils identiques (arrondis, carres) ?
- Y a-t-il des overlays ou effets manquants ?

### 5. Boutons
- Les labels sont-ils corrects ?
- Le style est-il bon (rempli vs outline vs ghost) ?
- Les coins sont-ils identiques ?

### 6. Elements decoratifs
- Icones decoratives presentes/absentes ?
- Separateurs, ornements, badges ?
- Illustrations flottantes ?

### 7. Espacement
- Les marges entre les elements sont-elles comparables ?
- Le padding de la section est-il similaire ?

## Format de sortie (JSON strict)

```json
{
  "overallMatch": 0-100,
  "issues": [
    {
      "priority": "critical|high|medium|low",
      "category": "structure|color|typography|image|button|decoration|spacing",
      "description": "description claire et precise du probleme",
      "fix": "correction concrete a appliquer dans output.json",
      "field": "chemin dans le JSON a modifier (ex: style.background, content.title)"
    }
  ],
  "whatWorksWell": ["liste des aspects bien reproduits"],
  "biggestGap": "le probleme le plus impactant visuellement en une phrase"
}
```

## Regles strictes

- Compare UNIQUEMENT ce que tu VOIS. Ne suppose rien sur le code.
- Sois PRECIS dans les corrections : donne le champ JSON exact et la valeur a mettre.
- Priorise les problemes par impact VISUEL, pas par nombre de pixels.
- Un fond de mauvaise couleur est plus impactant qu'un texte legerement decale.
- Un element manquant est plus impactant qu'une couleur legerement differente.
- Si la structure est completement differente, le variant est probablement mauvais — suggerer le bon variant du variant-catalog.

## Exemples de corrections concretes

- Mauvais variant : `"fix": "Changer variant de 'luxe-grid' a 'luxe-slider'", "field": "sections[8].variant"`
- Fond incorrect : `"fix": "style.background: 'custom', style.customBgColor: '#f8f5ef'", "field": "sections[2].style"`
- Texte manquant : `"fix": "Ajouter content.eyebrow: 'OUR SERVICES'", "field": "sections[3].content.eyebrow"`
- Image absente : `"fix": "Ajouter content.image: 'https://...'", "field": "sections[4].content.image"`
- Items manquants : `"fix": "La section a 6 items visibles mais seulement 3 dans le JSON — ajouter les 3 manquants", "field": "sections[5].content.items"`
