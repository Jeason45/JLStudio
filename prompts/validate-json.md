# Validate JSON — JL Studio Builder
## Prompt pour Claude API : validation et correction du output.json

Tu recois un output.json genere pour le JL Studio Builder.
Ton objectif : verifier que CHAQUE champ est valide et corriger les erreurs.

## Validations obligatoires

### 1. Structure globale
- `site.name` present et non vide
- `sections[]` non vide
- `brand` present avec colors (6 champs), typography (heading, body, size), borderRadius, spacing

### 2. Pour CHAQUE section
- `type` est un type valide parmi : site-header, hero, logos, features, stats, testimonials, pricing, faq, cta, gallery-grid, blog-grid, team, contact, form, newsletter, timeline, steps, slider, lightbox, image-text, video, tabs, accordion, product-grid, product-detail, cart, checkout, site-footer, custom, map, search, quick-stack, comparison-table, awards, collection-list, navbar-advanced, dropdown
- `variant` correspond au pattern {universe}-{layout} et EXISTE dans le variant-catalog
- `style.background` est un de : white, light, dark, primary, gradient, custom, custom-gradient
- Si `style.background` = "custom" → `style.customBgColor` DOIT etre present
- Si `style.background` = "dark" → `style.customBgColor` NE DOIT PAS etre present
- Si fond sombre → `style.textColor: "#ffffff"` DOIT etre present

### 3. Champs content par type
Verifier que les champs obligatoires sont presents :
- **hero** : title obligatoire
- **features** : title + items[] obligatoires, chaque item a id, icon, title, description
- **cta** : title obligatoire
- **stats** : items[] obligatoire, chaque item a id, value, label
- **testimonials** : title + items[] obligatoires, chaque item a id, quote, author, role
- **pricing** : title + plans[] obligatoires
- **faq** : title + items[] obligatoires, chaque item a id, question, answer
- **gallery-grid** : images[] obligatoire (PAS items[]), chaque image a id, src, alt
- **image-text** : title + image + imageAlt obligatoires
- **site-header** : logo + links[] obligatoires
- **site-footer** : logo + copyright obligatoires
- **product-grid** : title + items[] obligatoires, chaque item a id, name (PAS title), price
- **steps** : items[] obligatoire, chaque item a id, number (STRING "01" pas int), title, description

### 4. Regles de coherence
- Toutes les sections doivent utiliser le MEME universe (sauf brixsa/zmr)
- site-header TOUJOURS en premier
- site-footer TOUJOURS en dernier
- hero TOUJOURS juste apres le header
- Pas de variant inexistant (verifier dans le variant-catalog)
- `gallery-grid` utilise `images[]` PAS `items[]`
- `image-text` : la position de l'image est dans le NOM du variant (-image-left ou -image-right)
- `product-grid` : utiliser `name` pas `title` pour les items
- Boutons : chaque ButtonConfig a label, href, variant (primary|secondary|outline|ghost)

### 5. Erreurs courantes a corriger automatiquement
- `"blog"` → `"blog-grid"`
- `"gallery"` → `"gallery-grid"`
- `"comparison"` → `"comparison-table"`
- `"navbar"` → `"site-header"`
- `"footer"` → `"site-footer"`
- `features[].features` → `features[].items` (renommer)
- `product-grid items[].title` → `items[].name`
- `steps items[].number` en int → convertir en string "01"
- IDs manquants → generer des IDs uniques

## Format de sortie

```json
{
  "valid": true|false,
  "errors": [
    {
      "path": "sections[2].content.items",
      "error": "description du probleme",
      "fix": "correction appliquee ou suggeree"
    }
  ],
  "warnings": [
    {
      "path": "sections[5].variant",
      "warning": "description",
      "suggestion": "suggestion"
    }
  ],
  "correctedJson": { /* le JSON corrige si des erreurs ont ete trouvees */ }
}
```
