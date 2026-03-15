# Generate Template — JL Studio Builder
## Prompt pour Claude API : generation du output.json a partir des analyses

Tu recois :
- L'**analyse de chaque section** (type, layout, contenu, typographie, couleurs)
- Le **brand system** extrait (couleurs, fonts, universe)
- Le **variant-catalog** (reference de tous les variants disponibles)
- Le **raw-data.json** du scan Playwright

Ton objectif : generer un output.json COMPLET et VALIDE pour le JL Studio Builder.

---

## Structure du output.json

```json
{
  "site": { "name": "Nom du site" },
  "brand": {
    "colors": { "primary", "secondary", "accent", "background", "foreground", "muted" },
    "typography": { "heading": "Font", "body": "Font", "size": "default" },
    "borderRadius": "none|sm|md|lg|full",
    "spacing": "compact|default|relaxed"
  },
  "sections": [
    {
      "type": "site-header|hero|features|...",
      "variant": "{universe}-{layout}",
      "style": { /* SectionStyle */ },
      "content": { /* selon le type */ }
    }
  ],
  "meta": {
    "sourceUrl": "URL",
    "scannedAt": "ISO date",
    "reproductionNotes": ["notes importantes"]
  }
}
```

---

## Regles de selection du variant

### Methode
1. Lire la description visuelle de la section (issue de analyze-section.md)
2. Consulter le variant-catalog pour trouver le variant qui CORRESPOND visuellement
3. Verifier que le variant existe (pas de variant invente)
4. En cas de doute, utiliser le fallback du type

### Regles critiques
- **hero** : pas de suffixe layout, juste l'universe → `"luxe"`, `"startup"`, `"creative"`
- **image-text** : la position est dans le NOM → `"luxe-image-left"` ou `"luxe-image-right"`
- **features** : `{universe}-grid` | `{universe}-bento` | `{universe}-list`
- **cta** : `{universe}-centered` | `{universe}-split` | `{universe}-card`
- **gallery-grid** : `{universe}-grid` | `{universe}-masonry`
- **Toutes les sections** : MEME universe sauf brixsa/zmr

---

## Champs content par type (REFERENCE)

### hero
```json
{ "eyebrow?", "title", "subtitle", "primaryButton?": { "label", "href", "variant" }, "secondaryButton?", "image?": { "src", "alt" }, "backgroundImage?", "videoUrl?", "trustText?" }
```

### site-header
```json
{ "logo", "links": [{ "id", "label", "href" }], "ctaLabel?", "ctaHref?", "sticky?", "transparent?" }
```
- logo = URL image (https://...) PAS le texte alt

### features
```json
{ "eyebrow?", "title", "subtitle?", "items": [{ "id", "icon", "title", "description" }], "columns?" }
```
- icon = nom Lucide OU URL http:// pour SVG custom

### image-text
```json
{ "eyebrow?", "title", "subtitle?", "body", "image", "imageAlt", "imagePosition", "primaryButton?", "secondaryButton?", "items?": [{ "id", "icon?", "title", "description?" }], "stats?": [{ "id", "value", "label" }], "decorativeIcon?" }
```
- imagePosition est IGNORE — la position est determinee par le nom du variant
- Ne PAS dupliquer subtitle et body (surtout variant luxe)

### cta
```json
{ "title", "subtitle?", "primaryButton?", "secondaryButton?", "badge?", "icon?" }
```

### gallery-grid
```json
{ "title?", "images": [{ "id", "src", "alt", "caption?" }], "columns?", "primaryButton?" }
```
- IMAGES[] pas items[] !

### testimonials
```json
{ "eyebrow?", "title", "subtitle?", "items": [{ "id", "quote", "author", "role", "company?", "avatar?", "rating?" }], "cardShadow?", "showArrows?", "arrowStyle?" }
```

### stats
```json
{ "eyebrow?", "title?", "items": [{ "id", "value", "label", "description?" }] }
```

### pricing
```json
{ "eyebrow?", "title", "subtitle?", "plans": [{ "id", "name", "price", "period", "description", "features": [{ "text", "included" }], "cta", "ctaHref", "highlighted", "badge?" }] }
```

### faq
```json
{ "eyebrow?", "title", "subtitle?", "items": [{ "id", "question", "answer" }] }
```

### product-grid
```json
{ "eyebrow?", "title", "subtitle?", "items": [{ "id", "name", "price", "originalPrice?", "image?", "badge?", "rating?", "description?" }], "primaryButton?" }
```
- NAME pas title pour les items !

### steps
```json
{ "eyebrow?", "title", "subtitle?", "items": [{ "id", "number", "title", "description", "icon?" }] }
```
- number est une STRING : "01", "02", "03"

### site-footer
```json
{ "logo", "tagline?", "columns": [{ "id", "title", "links": [{ "id", "label", "href" }] }], "copyright", "socials?": { "twitter?", "linkedin?", "instagram?" } }
```

### newsletter
```json
{ "eyebrow?", "title", "subtitle?", "placeholder", "buttonLabel", "disclaimer?", "count?" }
```

### logos
```json
{ "eyebrow?", "title?", "items": [{ "id", "name", "logo?", "quote?", "url?" }] }
```

### contact
```json
{ "eyebrow?", "title", "subtitle?", "email?", "phone?", "address?", "formTitle?", "formButtonLabel?" }
```

### team
```json
{ "eyebrow?", "title", "subtitle?", "members": [{ "id", "name", "role", "bio?", "avatar?", "linkedin?", "twitter?" }] }
```

### blog-grid
```json
{ "eyebrow?", "title", "subtitle?", "posts": [{ "id", "title", "excerpt", "category", "date", "readTime", "image?", "slug" }] }
```

### timeline
```json
{ "eyebrow?", "title", "items": [{ "id", "date", "title", "description", "icon?" }] }
```

### slider
```json
{ "eyebrow?", "title?", "autoplay", "loop", "showDots", "showArrows", "effect": "slide|fade|scale", "interval", "slides": [{ "id", "image", "title?", "subtitle?", "ctaLabel?", "ctaHref?" }] }
```

### video
```json
{ "eyebrow?", "title?", "subtitle?", "body?", "provider": "youtube|vimeo|html5", "url", "poster?", "autoplay", "loop", "controls" }
```

### form
```json
{ "title?", "subtitle?", "fields": [{ "id", "type", "name", "label", "placeholder?", "required", "width": "full|half", "options?" }], "submitLabel", "successMessage", "errorMessage?", "redirectUrl?", "formName?", "captchaType?", "honeypot?", "emailNotification?", "createContact?", "webhookUrl?" }
```

### tabs
```json
{ "eyebrow?", "title", "subtitle?", "orientation": "horizontal|vertical", "items": [{ "id", "label", "content", "image?" }] }
```

### accordion
```json
{ "eyebrow?", "title", "subtitle?", "allowMultiple", "iconStyle": "chevron|plus-minus|arrow|none", "items": [{ "id", "question", "answer" }] }
```

### lightbox
```json
{ "eyebrow?", "title?", "subtitle?", "columns", "gap", "showCaptions", "enableZoom", "enableKeyboard", "images": [{ "id", "src", "alt", "caption?" }] }
```

### map
```json
{ "eyebrow?", "title?", "subtitle?", "provider": "embed|openstreetmap|mapbox", "embedUrl?", "address?", "phone?", "hours?", "linkLabel?", "linkHref?", "lat?", "lng?", "zoom", "markers": [{ "id", "lat", "lng", "label?" }], "apiKey?" }
```

### search
```json
{ "title?", "placeholder", "showCategories" }
```

### quick-stack
```json
{ "eyebrow?", "title?", "subtitle?", "layout": "1+2|2x2|3x1|masonry|1+1|asymmetric", "items": [{ "id", "title?", "subtitle?", "body?", "image?", "icon?", "badge?", "ctaLabel?", "ctaHref?" }] }
```

### comparison-table
```json
{ "title", "columns": ["string"], "features": [{ "id", "name", "values": ["string|boolean"] }] }
```

### awards
```json
{ "eyebrow?", "title?", "items": [{ "id", "name", "year", "issuer", "icon?" }] }
```

### navbar-advanced
```json
{ "logo", "links": [{ "id", "label", "href", "hasDropdown", "megaSections?": [{ "id", "title", "links" }] }], "ctaLabel?", "ctaHref?", "sticky", "transparent", "hamburgerStyle": "minimal|bold|animated", "announcementBar?" }
```

### dropdown
```json
{ "eyebrow?", "title", "triggerLabel", "isMegaMenu", "groups": [{ "id", "title", "items": [{ "id", "label", "href", "description?", "icon?" }] }] }
```

### product-detail
```json
{ "productId?", "name", "description", "price", "compareAtPrice?", "images": ["string"], "badge?", "variants": [{ "id", "label", "options" }], "addToCartLabel", "buyNowLabel?", "trustBadges": ["string"] }
```

### cart
```json
{ "emptyMessage", "continueShoppingLabel", "checkoutLabel", "showCouponField", "showProductImages" }
```

### checkout
```json
{ "paymentProviders": ["stripe|paypal"], "stripePublishableKey?", "paypalClientId?", "showOrderSummary", "showCouponField", "successRedirectUrl?", "termsUrl?" }
```

### collection-list
```json
{ "title?", "subtitle?", "emptyMessage?", "columns?", "showPagination?" }
```

### custom
```json
{ "elements?": [{ "type": "custom-container|custom-text|custom-heading|custom-image|custom-button|custom-divider|custom-spacer|custom-embed|custom-lottie|custom-spline|custom-rive", ... }] }
```

---

## SectionStyle — champs disponibles

```json
{
  "background": "white|light|dark|primary|gradient|custom|custom-gradient",
  "paddingY": "none|sm|md|lg|xl",
  "fullWidth?": boolean,
  "titleSize?": "sm|md|lg|xl|2xl|3xl|4xl",
  "textAlign?": "left|center|right",
  "textColor?": "#hex",
  "accentColor?": "#hex",
  "fontFamily?": "string",
  "fontWeight?": number,
  "letterSpacing?": "tight|normal|wide|wider",
  "textTransform?": "none|uppercase|lowercase|capitalize",
  "customBgColor?": "#hex",
  "backgroundImage?": { "url", "overlayColor?", "overlayOpacity?", "size?", "position?", "attachment?" },
  "borderRadius?": "none|sm|md|lg|xl|full"
}
```

---

## Regles apprises (CRITIQUES)

1. `background: "dark"` → PAS de customBgColor
2. `background: "custom"` → customBgColor OBLIGATOIRE
3. Fond creme/beige → `background: "custom"` + `customBgColor: "#f8f5ef"`
4. Fond sombre → `textColor: "#ffffff"` OBLIGATOIRE
5. textTransform "uppercase" s'applique a TOUT le texte — ne l'utiliser que si TOUT est uppercase
6. Logo = URL image, pas texte alt
7. Illustrations decoratives → `floatingImages[]` dans content (array d'objets `{ src, position, size, opacity }`)
8. decorativeIcon = URL du SVG, pas juste "true"
9. Icones custom = URL complete (https://cdn...), pas nom Lucide generique
10. image-text : pas de duplication subtitle/body (surtout luxe)
11. gallery-grid : utiliser `images[]` PAS `items[]`
12. product-grid : utiliser `name` PAS `title` pour les items
13. Ne JAMAIS inventer de contenu — copier MOT POUR MOT depuis l'analyse
14. image-text avec `items[]` : certains variants affichent une liste de features/stats — utiliser `items[]` ou `stats[]` ou `features[]` selon le variant
15. cta avec image de fond : utiliser `backgroundImage` dans style avec `overlayOpacity` (number 0-1, PAS string)
16. gallery-grid avec bouton : ajouter `primaryButton: { label, href, variant }` dans content
17. floatingImages : `{ src: "URL", position: "top-right|bottom-left|...", size: 280, opacity: 0.45 }` — URLs exactes du scan
18. hero parallax : `backgroundImage.attachment: "fixed"` dans style pour l'effet parallax
19. image-text : la position (left/right) est dans le NOM du variant (`luxe-image-left`, `luxe-image-right`) — `imagePosition` dans content est IGNORE
20. Boutons : toujours inclure `href` (ex: "/contact", "#services") — sans href le bouton ne fait rien

## Format de sortie

Retourner le output.json COMPLET en JSON valide, pret a etre importe via `node scripts/import-template.js`.
