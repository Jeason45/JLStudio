# Extract Brand — JL Studio Builder
## Prompt pour Claude API + Vision : extraction du brand system depuis les screenshots

Tu recois TOUS les screenshots d'un site web + le raw-data.json du scan Playwright.
Ton objectif : extraire le brand system EXACT du site.

## Ce que tu dois extraire

### 1. Couleurs (OBLIGATOIRE)
- **primary** : couleur dominante des boutons CTA, liens, elements d'accent principaux
- **secondary** : couleur complementaire (boutons secondaires, hover states)
- **accent** : couleur d'accentuation ponctuelle (badges, icones, ornements, survols)
- **background** : couleur de fond PRINCIPALE du site (#ffffff, #f8f5ef, #0a0a0a...)
- **foreground** : couleur de texte PRINCIPALE (#000000, #ffffff...)
- **muted** : couleur de fond des surfaces secondaires (cards, inputs, zones grisees)

### 2. Typographie (OBLIGATOIRE)
- **heading** : font des titres — identifier serif vs sans-serif, puis le nom exact
- **body** : font du body — identifier serif vs sans-serif, puis le nom exact
- **size** : 'compact' | 'default' | 'large' — evaluer l'echelle typographique globale

### 3. Forme et espacement
- **borderRadius** : 'none' | 'sm' | 'md' | 'lg' | 'full' — observer les boutons, cards, images
- **spacing** : 'compact' | 'default' | 'relaxed' — evaluer les marges entre sections

### 4. Universe du site
Determiner l'universe qui correspond le mieux :
- **startup** : tech, SaaS, gradients, glow, cards modernes
- **corporate** : entreprise, navy/bleu, structures carrees, professionnel
- **luxe** : premium, hotellerie, mode — serif, or/dore, espacement genereux, fond creme/noir
- **creative** : agences, portfolios — asymetrie, neobrutalism, couleurs vives, typo bold
- **ecommerce** : boutiques en ligne — focus produit, badges promo
- **glass** : fintech, crypto — glassmorphism, blur, transparence

## Sources d'information (par ordre de priorite)

1. **Screenshots** — source de verite visuelle absolue
2. **raw-data.json > css.globalStyles** — computed styles exacts (fonts, sizes, colors)
3. **raw-data.json > libraries.cssVariables** — variables CSS :root
4. **raw-data.json > libraries.fonts** — fonts chargees

## Regles strictes

- Les SCREENSHOTS priment sur le code. Si le screenshot montre du beige mais le CSS dit #fff → c'est beige.
- Identifier les fonts par leur RENDU VISUEL d'abord, confirmer avec raw-data ensuite.
- Si une font n'est pas dans Google Fonts standards, noter `provider: "local"`.
- Ne pas confondre primary et accent — chercher la distinction dans les boutons vs ornements.
- Si le site est dark mode → background sombre, foreground clair.
- Copier les couleurs hex depuis raw-data.json quand elles confirment ce que tu vois.

## Format de sortie (JSON strict)

```json
{
  "brand": {
    "colors": {
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "background": "#hex",
      "foreground": "#hex",
      "muted": "#hex"
    },
    "typography": {
      "heading": "Font Name",
      "body": "Font Name",
      "size": "compact|default|large"
    },
    "borderRadius": "none|sm|md|lg|full",
    "spacing": "compact|default|relaxed"
  },
  "universe": "startup|corporate|luxe|creative|ecommerce|glass",
  "confidence": {
    "colors": "high|medium|low",
    "typography": "high|medium|low",
    "universe": "high|medium|low"
  },
  "notes": "observations supplementaires sur le brand"
}
```
