# SCAN_SITE_PROMPT.md — JL Studio Builder
## Prompt d'extraction et d'auto-amélioration pour la reproduction de sites

Tu es un expert en reverse-engineering de sites web, design systems et CSS avancé.
Ton objectif : analyser le site cible (URL + screenshots fournis) et produire un JSON directement exploitable par le JL Studio Builder pour le reproduire à l'identique — visuellement, textuellement, et structurellement.

**Site cible** : [URL]
**Screenshots fournis** : [LISTE DES SCREENSHOTS]

---

## PARTIE 1 — MAPPING VERS LE CONFIGURATEUR (INTERFACES RÉELLES)

**CRITIQUE** : Le JSON que tu produis doit mapper DIRECTEMENT vers les interfaces TypeScript du configurateur. Ne pas inventer de champs — utiliser uniquement les valeurs acceptées.
Brand (interface Brand)
{
  colors: {
    primary: string      // Couleur principale (#hex)
    secondary: string    // Couleur secondaire (#hex)
    accent: string       // Couleur d'accent (#hex)
    background: string   // Fond principal (#hex)
    foreground: string   // Texte principal (#hex)
    muted: string        // Fond secondaire/surface (#hex)
  },
  typography: {
    heading: string      // Font des titres (ex: "DM Sans", "Playfair Display")
    body: string         // Font du body (ex: "Inter", "Lato")
    size: 'compact' | 'default' | 'large'
  },
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full',
  spacing: 'compact' | 'default' | 'relaxed'
}
SectionStyle (interface SectionStyle) — CE QUI FAIT LE VISUEL
{
  background: 'white' | 'light' | 'dark' | 'primary' | 'gradient' | 'custom' | 'custom-gradient',
  paddingY: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  fullWidth?: boolean,
  titleSize?: 'sm' | 'md' | 'lg' | 'xl',
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  // Règle : hero/cta/stats = souvent 'center', image-text = souvent 'left', features = dépend du layout
  textColor?: string,           // #hex — override couleur de texte
  accentColor?: string,         // #hex — couleur d'accent pour éléments spécifiques
  // *** TYPOGRAPHIE (CRITIQUE POUR LE RENDU) ***
  fontFamily?: string,
  fontWeight?: number,          // 700, 800, 900...
  letterSpacing?: 'tight' | 'normal' | 'wide' | 'wider',
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize',
  // *** BACKGROUNDS AVANCÉS ***
  customBgColor?: string,       // #hex pour background: 'custom'
  customGradient?: { from: string, to: string, direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl' },
  backgroundImage?: {
    url: string,
    overlayColor?: string,      // ex: '#000000'
    overlayOpacity?: number,    // 0.0 à 1.0
    size?: 'cover' | 'contain' | 'auto',
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  },
  videoBackground?: { url: string, poster?: string, loop?: boolean, muted?: boolean },
  // *** EFFETS ***
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
  boxShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  opacity?: number,
  // *** SPACING OVERRIDES ***
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  marginTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  marginBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  // *** DIVIDERS ***
  dividerTop?: { shape: 'none' | 'wave' | 'angle' | 'curve' | 'triangle', color?: string },
  dividerBottom?: { shape: 'none' | 'wave' | 'angle' | 'curve' | 'triangle', color?: string }
}
Types de sections disponibles
Universes : startup | corporate | luxe | creative | ecommerce | glass | brixsa | zmr
Types (37 au total) :
  site-header · navbar-advanced · hero · logos · features · stats · testimonials · pricing · faq · cta ·
  gallery-grid · blog-grid · team · contact · form · newsletter · timeline · steps · slider · lightbox ·
  image-text · video · tabs · accordion · dropdown · map · search · quick-stack · comparison-table ·
  awards · product-grid · product-detail · cart · checkout · collection-list · site-footer · custom

⚠️ ATTENTION : "blog" → "blog-grid", "gallery" → "gallery-grid", "comparison" → "comparison-table"

Système de variants
Chaque section suit le pattern : {universe}-{layout}
Exemples : startup-grid, luxe-cards, corporate-split, glass-hero, brixsa-parallax
Layouts courants par type :
  - features : grid | bento | list | accordion | services | location
  - cta : centered | split | card | banner | countdown
  - stats : simple | cards | highlight | review-stars
  - pricing : columns | comparison
  - slider : hero | cards | thumbnails | parallax
  - tabs : horizontal | vertical
  - accordion : single | multi
  - form : default | split
  - product-detail : split | gallery
  - cart : slide | page
  - checkout : steps | single
  - quick-stack : 1+2 | 2x2 | 3x1 | masonry | 1+1 | asymmetric
  - hero : (par universe direct) startup | corporate | luxe | creative | ecommerce | glass | brixsa | brixsa-page | zmr-agency | zmr-talent-profile

ButtonConfig (utilisé dans les CTAs et sections)
{
  label: string,
  href: string,
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
}
⚠️ Ne pas oublier le champ variant — il détermine le rendu visuel du bouton.

Guide de sélection de l'Universe
L'universe détermine le rendu visuel de chaque section. Choisis selon l'ambiance du site :
  startup → Sites tech, SaaS, apps. Gradients, glow, cards modernes, dark themes, badges colorés.
  corporate → Entreprises traditionnelles. Navy/bleu, structures carrées, professionnel, bordures nettes.
  luxe → Premium, hôtellerie, immobilier, mode. Serif, or/doré, espacement généreux, fond crème/noir.
  creative → Agences, portfolios, artistes. Asymétrie, néobrutalism, couleurs vives, typo bold.
  ecommerce → Boutiques en ligne. Focus produit, badges promo, grilles, prix, trust badges.
  glass → Fintech, crypto, tech avant-garde. Glassmorphism, blur, transparence, gradients néon.

Règle : toutes les sections d'un même site DOIVENT utiliser le MÊME universe (sauf brixsa/zmr qui sont des universes spécifiques).

Ordre standard des sections (wireframe typique)
1. site-header / navbar-advanced (TOUJOURS en premier)
2. hero (TOUJOURS juste après le header)
3. logos (confiance, partenaires)
4. features / image-text / steps (présentation des services/bénéfices)
5. stats / awards (preuves sociales chiffrées)
6. gallery-grid / slider / lightbox (visuels)
7. testimonials (preuves sociales qualitatives)
8. pricing / comparison-table (offres)
9. faq / accordion (questions fréquentes)
10. cta / newsletter (conversion finale)
11. contact / form / map (coordonnées)
12. blog-grid / timeline (contenu éditorial)
13. site-footer (TOUJOURS en dernier)
Design Presets — IDs EXACTS pour le matching

Palettes de couleurs (28) — designPresets.ts
  Light (10) : indigo-light · emerald-light · rose-light · amber-light · cyan-light · sky-light · teal-light · violet-light · slate-light · orange-light
  Dark (8) : dark-pro · dark-emerald · dark-rose · dark-cyan · dark-amber · dark-midnight · dark-charcoal · dark-ocean
  Vibrant (5) : neon-purple · electric-blue · hot-pink · lime-punch · sunset
  Pastel (5) : pastel-lavender · pastel-mint · pastel-peach · pastel-sky · pastel-blush
  Corporate (5) : corp-navy · corp-trust · corp-finance · corp-steel · corp-law
  Luxe (6) : luxe-gold · luxe-noir · luxe-champagne · luxe-marble · luxe-emerald · luxe-sapphire

Typography Presets (24) — designPresets.ts
  Modern (8) : typo-inter · typo-plus-inter · typo-dm-inter · typo-space-mono · typo-outfit · typo-manrope · typo-sora · typo-cabinet
  Classic (5) : typo-playfair-lato · typo-merriweather · typo-cormorant · typo-libre · typo-dm-serif
  Minimal (4) : typo-helvetica · typo-work-sans · typo-karla · typo-rubik
  Creative (4) : typo-clash · typo-anton · typo-bebas · typo-righteous
  Editorial (3) : typo-fraunces · typo-editorial · typo-lora

Tag Style Presets (11) — designPresets.ts
  SaaS : ts-saas-modern · ts-saas-bold
  Luxe : ts-luxe-serif · ts-luxe-modern
  Glass : ts-glass
  Brutalist : ts-brutalist · ts-brutalist-mono
  Corporate : ts-corp-clean
  Minimal : ts-minimal-zen · ts-minimal-geo · ts-minimal-editorial

Thèmes complets (18) — combinaisons palette + typo + tag style
  theme-saas-indigo · theme-saas-dark · theme-saas-emerald
  theme-luxe-gold · theme-luxe-champagne · theme-luxe-marble
  theme-glass-neon · theme-glass-ocean
  theme-brutalist-bw · theme-brutalist-electric
  theme-corp-navy · theme-corp-trust
  theme-minimal-zen · theme-minimal-geo
  theme-pastel-soft · theme-editorial
  theme-creative-sunset · theme-creative-lime

Style Families (6) — familles visuelles globales
  saas : tech-friendly, gradients, clean cards
  luxe : premium, serif, gold accents, spacious
  glassmorphism : blur, transparency, glowing borders
  brutalist : bold, uppercase, monospace, raw
  corporate : structured, navy/blue, serious
  minimal : zen, clean, whitespace, subtle

Heuristiques pour choisir le tag style :
* Serif élégant + uppercase titres + espacement généreux → ts-luxe-serif
* Serif moderne + minimaliste + pas d'uppercase → ts-luxe-modern
* Sans-serif propre + SaaS/tech + titres bold → ts-saas-modern
* Sans-serif + très gros titres + impact → ts-saas-bold
* Glassmorphism + blur + néon → ts-glass
* Monospace + terminal look + uppercase → ts-brutalist-mono
* Bold + géométrique + raw → ts-brutalist
* Open Sans/Roboto + professionnel → ts-corp-clean
* Work Sans + zen + léger → ts-minimal-zen
* Karla + géométrique + précis → ts-minimal-geo
* Serif + magazine + éditorial → ts-minimal-editorial

Heuristiques pour choisir la palette :
* Or + noir + crème → luxe-gold ou luxe-champagne
* Noir total + minimal → luxe-noir
* Indigo/violet + blanc → indigo-light
* Navy + blanc + professionnel → corp-navy ou corp-trust
* Pastel lavande + doux → pastel-lavender
* Néon + fond sombre → neon-purple ou electric-blue
* Noir + vert néon → dark-emerald
* Blanc + vert émeraude → emerald-light
Librairie de composants (500+ items au total)

Composants (61 items) — library/components.ts
  Boutons (12) : comp-btn-primary · comp-btn-outline-luxury · comp-btn-glass · comp-btn-gradient-glow · comp-btn-neobrutalism · comp-btn-dark-minimal · comp-btn-pill-soft · comp-btn-white-shadow · comp-btn-icon-arrow · comp-btn-large-hero · comp-btn-circle-icon · comp-btn-danger
  Badges (10) : comp-badge-glass · comp-badge-solid-primary · comp-badge-outline-light · comp-badge-success · comp-badge-warning · comp-badge-danger · comp-badge-neobrutalism · comp-badge-dark-subtle · comp-badge-notification · comp-badge-gold-luxury
  Cards (11) : comp-card-glass · comp-card-image-hover · comp-card-pricing-premium · comp-card-testimonial-brixsa · comp-card-feature-icon · comp-card-stat · comp-card-team-member · comp-card-cta-split · comp-card-property · comp-card-dark-elevated
  Navbars (1) : comp-navbar-glass
  Footers (1) : comp-footer-premium

Éléments (26 items) — library/elements.ts
  Headings (6) : el-heading-hero-xl · el-heading-hero-clamp · el-heading-section · el-heading-section-light · el-heading-subsection · el-heading-card
  Text (8) : el-text-overline · el-text-overline-dark · el-text-lead · el-text-body · el-text-body-light · el-text-small-muted · el-text-blockquote-luxury · el-text-price-display
  Dividers (4) : el-divider-subtle · el-divider-gradient-gold · el-divider-gradient-purple · el-divider-short-accent
  Spacers (5) : el-spacer-xs (0.5rem) · el-spacer-sm (1.5rem) · el-spacer-md (3rem) · el-spacer-lg (6rem) · el-spacer-xl (10rem)
  Containers (4) : el-container-glass · el-container-dark-panel · el-container-cream-card · el-container-elevated

Illustrations (20 items) — library/illustrations.ts
  Blobs (4) : ill-blob-warm · ill-blob-purple · ill-blob-gold-glow · ill-blob-indigo-glow
  Gradients (4) : ill-gradient-brixsa-dark · ill-gradient-aurora · ill-gradient-midnight · ill-gradient-warm-cream
  Patterns (3) : ill-pattern-dots · ill-pattern-grid-lines · ill-pattern-diagonal
  Decorative (9) : ill-deco-wave · ill-deco-wave-dark · ill-deco-gradient-line-gold · ill-deco-glow-circle · ill-deco-ring · ill-deco-image-overlay-dark · ill-deco-noise-texture

Icônes (29 items) — library/icons.ts
  Lucide SVG : arrow-right · arrow-left · check · x · star · heart · mail · phone · map-pin · user · settings · search · home · menu · shopping-cart · zap · shield · globe · play · download · plus · minus · chevron-down · chevron-right · external-link · eye · calendar · clock · camera

Wireframes (6 items) — library/wireframes.ts
  wf-landing-basic : Hero → Features → Testimonials → CTA → Footer
  wf-landing-full : Hero → Logos → Features → Image-Text → Stats → Testimonials → Pricing → FAQ → CTA → Footer
  wf-about : Hero → Image-Text → Timeline → Team → Stats → CTA → Footer
  wf-blog : Hero → Blog Grid → Newsletter → Footer
  wf-portfolio : Hero → Gallery Grid → Testimonials → Contact → Footer
  wf-ecommerce : Hero → Product Grid → Features → Testimonials → Newsletter → Footer

Animations (60+ items) — library/animations.ts
  Entrance (10) : fade-in · slide-up · slide-down · slide-left · slide-right · zoom-in · rotate-in · blur-in · flip-x · flip-y
  Exit (5) : fade-out · slide-out-left · slide-out-right · slide-out-down · zoom-out
  Hover (5) : hover-grow · hover-lift · hover-glow · hover-rotate · hover-skew
  Emphasis (9) : pulse · bounce · shake-x · shake-y · swing · rubber-band · jello · tada · wobble · heartbeat
  Scroll (2) : parallax-slow · parallax-fast
Animation Presets — Config détaillée
{
  id: string,            // ex: 'fade-in', 'slide-up', 'zoom-in'
  category: 'entrance' | 'scroll' | 'hover' | 'loop' | 'exit' | 'emphasis',
  config: {
    from: { opacity?, y?, x?, scale?, rotate?, blur?, rotateX?, rotateY? },
    to:   { opacity?, y?, x?, scale?, rotate?, blur?, rotateX?, rotateY? },
    duration: number,    // ms (typique: 300-1000ms)
    delay: number,       // ms (typique: 0-500ms)
    easing: string       // CSS easing ou preset name (ex: 'ease-out', 'cubic-in-out', 'spring')
  }
}
Valeurs de référence par preset :
  fade-in : from { opacity: 0 } → to { opacity: 1 }, 600ms, ease-out
  slide-up : from { opacity: 0, y: 40 } → to { opacity: 1, y: 0 }, 600ms, ease-out
  slide-left : from { opacity: 0, x: -60 } → to { opacity: 1, x: 0 }, 700ms, ease-out
  zoom-in : from { opacity: 0, scale: 0.8 } → to { opacity: 1, scale: 1 }, 500ms, ease-out
  blur-in : from { opacity: 0, blur: 10 } → to { opacity: 1, blur: 0 }, 600ms, ease-out
  flip-x : from { opacity: 0, rotateX: -90 } → to { opacity: 1, rotateX: 0 }, 600ms, ease-out
  hover-lift : from {} → to { y: -8, boxShadow: 'lg' }, 300ms, ease-out, reverseOnLeave: true
  parallax-slow : speed: 0.3 (30% du scroll)
  parallax-fast : speed: 0.7 (70% du scroll)

Triggers d'animation supportés par le configurateur :
  Basic : hover · hover-enter · hover-leave
  Click : click · click-first · click-second (toggle)
  Scroll : scroll-into-view · while-scrolling · scroll-position · while-in-view · scroll-progress · scroll-pin · scroll-snap · scroll-trigger
  Page : page-load · mouse-move
  Avancé : mouse-move-element · scroll-trigger avec configuration ScrollTrigger (start/end/scrub/pin)

Propriétés animables (23) :
  Transform : opacity · x · y · z · scale · scaleX · scaleY · scaleZ · rotate · rotateX · rotateY · rotateZ · skewX · skewY
  Filters : blur · brightness · contrast · grayscale · hueRotate · saturate · sepia · backdropBlur
  Colors : color · backgroundColor · borderColor
  Sizing : width · height · padding · margin · borderWidth · borderRadius
  Typography : fontSize · letterSpacing · lineHeight
  Effects : boxShadow · textShadow · clipPath

Stagger directions : normal · reverse · center · edges · random
Engines : web-api · gsap · css-keyframes
Easing Presets (38 fonctions)
Standard : linear · ease · ease-in · ease-out · ease-in-out · spring
Quad : quad-in · quad-out · quad-in-out
Cubic : cubic-in · cubic-out · cubic-in-out
Quart : quart-in · quart-out · quart-in-out
Quint : quint-in · quint-out · quint-in-out
Sine : sine-in · sine-out · sine-in-out
Expo : expo-in · expo-out · expo-in-out
Circ : circ-in · circ-out · circ-in-out
Back : back-in · back-out · back-in-out
Bounce : bounce-in · bounce-out · bounce-in-out
Elastic : elastic-in · elastic-out · elastic-in-out
Custom : cubic-bezier(x1, y1, x2, y2)

## PARTIE 2 — CHAMPS CONTENT PAR TYPE DE SECTION (RÉFÉRENCE OBLIGATOIRE)
Chaque section a un type et un content typé. Utilise UNIQUEMENT les champs listés ci-dessous.

hero: { eyebrow?, title, subtitle, primaryButton?: ButtonConfig, secondaryButton?: ButtonConfig, image?: { src, alt }, backgroundImage?, videoUrl?, posterImage?, autoplay?, price?, originalPrice?, trustText? }
features: { eyebrow?, title, subtitle?, items: [{ id, icon, title, description }] }
cta: { title, subtitle?, primaryButton?, secondaryButton?, badge?, icon?, dismissible?, targetDate? }
stats: { eyebrow?, title?, items: [{ id, value, label, description? }], average?, sources?: [{ id, name, rating, count, logo? }] }
testimonials: { eyebrow?, title, subtitle?, items: [{ id, quote, author, role, company?, avatar?, rating? }] }
pricing: { eyebrow?, title, subtitle?, plans: [{ id, name, price, period, description, features: [{ text, included }], cta, ctaHref, highlighted, badge? }] }
faq: { eyebrow?, title, subtitle?, items: [{ id, question, answer }] }
contact: { eyebrow?, title, subtitle?, email?, phone?, address?, formTitle?, formButtonLabel?, successMessage?, embedUrl? }
form: { title?, subtitle?, fields: [{ id, type, name, label, placeholder?, required, width: 'full'|'half', options? }], submitLabel, successMessage, errorMessage?, redirectUrl?, formName?, captchaType?, honeypot?, emailNotification?, createContact?, webhookUrl? }
logos: { eyebrow?, title?, items: [{ id, name, logo?, quote?, url? }] }
team: { eyebrow?, title, subtitle?, members: [{ id, name, role, bio?, avatar?, linkedin?, twitter? }] }
blog-grid: { eyebrow?, title, subtitle?, posts: [{ id, title, excerpt, category, date, readTime, image?, slug }], ctaLabel?, ctaHref? }
timeline: { eyebrow?, title, items: [{ id, date, title, description, icon? }] }
steps: { eyebrow?, title, subtitle?, items: [{ id, number, title, description, icon? }] }
gallery-grid: { title?, images: [{ id, src, alt, caption?, hoverSrc?, badge?, category?, subcategory? }], columns? }
image-text: { eyebrow?, title, subtitle?, body, image, imageAlt, imagePosition: 'left'|'right', primaryButton?, secondaryButton? }
newsletter: { eyebrow?, title, subtitle?, placeholder, buttonLabel, disclaimer?, count?, socialProof? }
comparison-table: { title, columns: string[], features: [{ id, name, values: (string|boolean)[] }] }
awards: { eyebrow?, title?, items: [{ id, name, year, issuer, icon? }] }
site-header: { logo, links: [{ id, label, href }], ctaLabel?, ctaHref?, sticky?, transparent? }
navbar-advanced: { logo, links: [{ id, label, href, hasDropdown, megaSections?: [{ id, title, links }] }], ctaLabel?, ctaHref?, sticky, transparent, hamburgerStyle: 'minimal'|'bold'|'animated', announcementBar? }
site-footer: { logo, tagline?, columns: [{ id, title, links: [{ id, label, href }] }], copyright, socials?: { twitter?, linkedin?, github?, instagram? } }
tabs: { eyebrow?, title, subtitle?, orientation: 'horizontal'|'vertical', items: [{ id, label, content, image? }] }
accordion: { eyebrow?, title, subtitle?, allowMultiple, iconStyle: 'chevron'|'plus-minus'|'arrow'|'none', items: [{ id, question, answer }] }
slider: { eyebrow?, title?, autoplay, loop, showDots, showArrows, showCounter, effect: 'slide'|'fade'|'scale', interval, slides: [{ id, image, title?, subtitle?, badge?, ctaLabel?, ctaHref? }] }
lightbox: { eyebrow?, title?, subtitle?, columns, gap, showCaptions, enableZoom, enableKeyboard, images: [{ id, src, alt, caption? }] }
video: { eyebrow?, title?, subtitle?, body?, provider: 'youtube'|'vimeo'|'html5', url, poster?, autoplay, loop, controls }
map: { eyebrow?, title?, subtitle?, provider: 'embed'|'openstreetmap'|'mapbox', embedUrl?, address?, phone?, hours?, linkLabel?, linkHref?, lat?, lng?, zoom, markers: [{ id, lat, lng, label? }], apiKey? }
search: { title?, placeholder, showCategories }
quick-stack: { eyebrow?, title?, subtitle?, layout: '1+2'|'2x2'|'3x1'|'masonry'|'1+1'|'asymmetric', items: [{ id, title?, subtitle?, body?, image?, icon?, badge?, ctaLabel?, ctaHref? }] }
dropdown: { eyebrow?, title, triggerLabel, isMegaMenu, groups: [{ id, title, items: [{ id, label, href, description?, icon? }] }] }
product-grid: { eyebrow?, title, items: [{ id, name, price, originalPrice?, image?, badge?, category?, rating?, reviews? }], ctaLabel?, ctaHref? }
product-detail: { productId?, name, description, price, compareAtPrice?, images: string[], badge?, variants: [{ id, label, options }], addToCartLabel, buyNowLabel?, trustBadges: string[] }
cart: { emptyMessage, continueShoppingLabel, checkoutLabel, showCouponField, showProductImages }
checkout: { paymentProviders: ('stripe'|'paypal')[], stripePublishableKey?, paypalClientId?, showOrderSummary, showCouponField, successRedirectUrl?, termsUrl? }
collection-list: { title?, subtitle?, emptyMessage?, columns?, showPagination? }
custom: { elements?: CustomElement[] }  // Section libre avec arbre d'éléments personnalisés

Types d'éléments custom (pour les sections "custom") :
  custom-container : div conteneur pour grouper des éléments
  custom-text : paragraphe ou texte libre
  custom-heading : titre (h1-h6)
  custom-image : image
  custom-button : bouton avec label + href
  custom-divider : séparateur horizontal/vertical
  custom-spacer : espacement invisible
  custom-embed : iframe/embed (YouTube, formulaire externe, widget)
  custom-lottie : animation Lottie (JSON/dotLottie)
  custom-spline : scène 3D Spline
  custom-rive : animation Rive (.riv)

---

## PARTIE 3 — MÉTHODE D'ANALYSE (MULTI-PASSES)
Ne fais pas tout en une seule lecture. Effectue ces passes dans l'ordre strict.

PASSE 0 — ANALYSE DES SCREENSHOTS (EN PREMIER, AVANT TOUT CODE)
Les screenshots sont LA source de vérité visuelle. Avant de lire une seule ligne de CSS :
1. Regarde chaque screenshot attentivement et note :
    * Ce que tu VOIS réellement (couleurs, layouts, typographie, espaces, icônes, ornements)
    * Les patterns visuels récurrents (icônes décoratives, séparateurs, backgrounds alternés)
    * L'ambiance générale (luxury, minimal, bold, dark, light...)
    * Les éléments "signature" du site (ce qui le rend immédiatement reconnaissable)
2. Cartographie visuelle préliminaire depuis les screenshots :
    * Liste toutes les sections visibles (ordre haut → bas)
    * Note les backgrounds de chaque section (couleur exacte, image, gradient, overlay)
    * Identifie les variantes de boutons (rempli vs outline vs ghost vs sombre)
    * Repère les icônes, ornements, illustrations décoratives
    * Observe les polices (serif ? sans-serif ? combien de familles ?)
    * Évalue les espacements (généreux = luxury / serré = dense)
3. Règle absolue : ce qui est visible dans les screenshots prime sur le code.
    * Screenshot montre du beige mais le code dit #fff → le screenshot a raison
    * Tout le texte apparaît en majuscules dans les screenshots → text-transform: uppercase
    * Les screenshots révèlent les computed styles finaux, pas les intentions du CSS

PASSE 1 — STRUCTURE & LAYOUT GLOBAL
Identifie toutes les pages, toutes les sections dans l'ordre exact, la hiérarchie DOM. Pour chaque section : type, position, background, layout (full-width, contained, split, grid, mosaic).

Heuristiques de détection du type de section :
* Grande image/vidéo plein écran + titre proéminent + CTA → hero
* Logo strip horizontal / carrousel de logos → logos
  Si les logos défilent en continu (marquee/ticker) → documenter dans visualEffects.textAnimations
  Si les logos sont statiques en ligne → section "logos" standard
  Si les logos ont des citations → chaque item a un champ "quote"
  Capturer le nom EXACT de chaque entreprise/partenaire dans items[].name
* Grille de cards avec icône + titre + description → features (grid)
* 2 colonnes : image | texte avec paragraphe + CTA → image-text
* Grands chiffres + labels → stats
* Citations avec avatar + nom + rôle → testimonials
* Cards avec prix + features + bouton → pricing
* Questions avec réponses dépliables → faq ou accordion
* Grande bannière colorée + titre + CTA → cta
* Input email + bouton "S'inscrire" → newsletter
* Formulaire multi-champs + bouton submit → form ou contact
* Timeline verticale avec dates → timeline
* Étapes numérotées (01, 02, 03...) → steps
  Le champ "number" est une STRING : "01", "02", "03" (pas un number int)
  Connecteur visuel entre les étapes (ligne, flèche) → documenter dans wireframesDetected
* Grille d'images cliquables → gallery-grid ou lightbox
* Tableau comparatif avec ✓/✗ → comparison-table
* Carrousel avec navigation prev/next → slider
* Onglets cliquables avec contenu qui change → tabs
* Grille de produits avec prix + image → product-grid
* Fiche produit avec images + variantes + prix → product-detail
* Carte Google Maps / plan → map
* Vidéo embed (YouTube/Vimeo) → video
* Grille de membres avec photo + nom + rôle → team
  Chaque membre : name (nom complet), role (fonction), bio? (texte court), avatar? (photo URL)
  Liens sociaux : linkedin? et twitter? sont des URLS complètes (pas des handles)
  Si pas de photo visible → avatar: null (ne PAS inventer d'URL)
* Grille d'articles avec image + titre + date → blog-grid
  Chaque post : title, excerpt (COMPLET), category, date (format exact), readTime, image, slug
  Le slug = URL relative de l'article (ex: "/blog/mon-article")
  Date : capturer le format affiché (ex: "15 Mars 2026", "Mar 15, 2026")
  ReadTime : capturer tel quel (ex: "5 min", "3 min de lecture")
  CTA en bas de la section blog → ctaLabel + ctaHref
* Barre de navigation fixe/sticky → site-header
* Pied de page multi-colonnes avec liens → site-footer
* Badges/awards avec année + nom + organisme → awards
  Chaque award a : name (nom du prix), year (année), issuer (organisme qui a donné le prix), icon? (icône optionnelle)
  Différent de "stats" : awards = distinctions/récompenses, stats = chiffres/métriques

Détection avancée Hero :
* Hero avec background image plein écran → variant: "{universe}" + backgroundImage dans style
* Hero avec vidéo background → videoBackground dans style + videoUrl dans content
* Hero split (texte gauche, image droite) → variant: "{universe}" + image dans content
* Hero avec eyebrow (petit texte/badge au-dessus du titre) → eyebrow dans content
* Hero avec prix (e-commerce) → price + originalPrice dans content
* Hero avec trust text → trustText dans content ("Livraison gratuite", "+10k clients")

Détection avancée CTA :
* CTA centré (titre + sous-titre + bouton au centre) → variant: "{universe}-centered"
* CTA split (texte à gauche, image/boutons à droite) → variant: "{universe}-split"
* CTA avec countdown (date cible) → variant: "countdown" + targetDate dans content
* CTA avec background coloré → background: "primary" ou "custom" dans style

PASSE 1bis — CARTOGRAPHIE MULTI-PAGE
Si le site a plusieurs pages (détectées via navigation, footer links, sitemap) :
1. Lister TOUTES les pages avec leur URL et titre
2. Pour chaque page accessible : sections dans l'ordre, avec type et contenu
3. La page d'accueil va dans "sections" (au root), les autres dans "pages[]"
4. Chaque page dans pages[] est indépendante : ses propres sections, son propre SEO
5. Les sections partagées (header, footer) apparaissent dans "sections" du root uniquement
6. Si trop de pages pour tout scanner → prioriser : accueil > about > services > contact > blog

PASSE 2 — CSS PROFOND & DESIGN TOKENS
2a. Variables CSS (:root) Inspecte le :root et liste TOUTES les custom properties CSS. Si elles existent → confidence: "high" automatiquement.

Comment mapper les couleurs vers Brand.colors :
* primary = couleur dominante des boutons CTA, liens, éléments d'accent principaux
* secondary = couleur complémentaire (parfois utilisée pour les boutons secondaires, hover states)
* accent = couleur d'accentuation ponctuelle (badges, icônes, ornements décoratifs, survols)
* background = couleur de fond PRINCIPALE du site (souvent #ffffff ou #f8f5ef ou #0a0a0a)
* foreground = couleur de texte PRINCIPALE (souvent #000000 ou #ffffff)
* muted = couleur de fond des surfaces secondaires (cards, inputs, zones grisées)

Règles de cohérence couleur :
* Si le site est en dark mode → background sera sombre (#0a0a0a, #111, #1a1a1a), foreground clair
* Si le site est en light mode → background sera clair (#fff, #f8f5ef), foreground sombre
* primary et accent sont RAREMENT identiques — chercher la distinction
* Si une seule couleur d'accent est utilisée → primary = accent (mais essayer de différencier)

Détection des CSS variables du site source :
Le configurateur supporte un système de CSS variables personnalisées (CSSVariable) :
  { id: string, name: string, type: 'color'|'size'|'font-family'|'number'|'percentage', value: string, group?: string }
Si le site source utilise des :root variables → les documenter pour recréer le design system.
Variables courantes à chercher :
  --color-* (couleurs)
  --font-* (familles de font)
  --spacing-* ou --gap-* (espacements)
  --radius-* (border radius)
  --shadow-* (ombres)
  --transition-* (transitions)
2b. Computed styles par élément clé
* h1, h2, h3 → font-family, font-size, font-weight, line-height, letter-spacing, text-transform, color
* .btn-primary, .btn-outline → toutes les propriétés
* .card → background, border, border-radius, box-shadow, padding
* input, textarea → border, border-radius, background, font, padding
* section → padding-top, padding-bottom
* body → font-family, font-size, line-height, color, background-color
2c. Keyframes CSS (@keyframes) Pour chaque animation : nom, propriétés animées, valeurs start/end, durée typique.
2d. Media queries & Responsive Design
* Identifier tous les breakpoints (ex: 768px, 1024px, 1280px, 1440px)
* Pour chaque breakpoint, noter les changements : colonnes de grid, font-size, padding, display:none
* Mobile menu : type (hamburger/drawer/fullscreen), breakpoint d'activation
* Images responsive : srcset, sizes, art direction (images différentes par breakpoint)
Breakpoints du configurateur (desktop-first, 7 niveaux) :
  1920px (min-width) — écran large
  1440px (min-width) — desktop large
  1280px (min-width) — desktop standard
  992px — BASE (pas de media query, styles par défaut)
  768px (max-width: 991px) — tablette
  480px (max-width: 767px) — mobile paysage
  320px (max-width: 479px) — mobile portrait
Documenter les changements majeurs à chaque breakpoint détecté dans le site source.
2e. Transitions globales Identifier la transition "par défaut" du site (durée, easing).
2f. Font loading Vérifier UNIQUEMENT via le code source : balises <link>, @import, @font-face, WebFont.load(). ATTENTION : les pages "style guide" affichent des noms de fonts comme contenu décoratif — ce NE SONT PAS forcément les fonts chargées.
2g. Navigation & multi-page
* Détecter le type de navbar : site-header (simple) vs navbar-advanced (mega menu, dropdowns)
* Style : transparent (fond transparent sur le hero) | solid (fond opaque) | blur (glassmorphism)
* Sticky : la navbar reste-t-elle visible au scroll ?
* CTA dans la navbar : bouton distinct des liens normaux ?
* Menu mobile : hamburger classique | drawer latéral | fullscreen overlay
* Mega menu : si un lien de nav ouvre un panneau large avec sous-sections → navbar-advanced
  Chaque lien avec dropdown : hasDropdown: true + megaSections avec titre et liens
  Announcement bar : bandeau texte en haut de la navbar → announcementBar: "texte exact"
* Liens de navigation → lister CHAQUE lien avec label EXACT et href
* Multi-page : si le site a /about, /services, /contact → créer des entrées dans "pages"
* Chaque page est une entité séparée avec ses propres sections
* Comportement au scroll de la navbar :
  - Transparent → opaque au scroll : navigation.style = "transparent" + documenter dans visualEffects
  - Disparaît au scroll down, réapparaît au scroll up : documenter dans visualEffects
  - Réduit sa hauteur au scroll : documenter dans visualEffects
  - Toujours visible (sticky/fixed) : site-header.content.sticky = true

PASSE 3 — PATTERNS VISUELS (CRITIQUE — souvent oubliée)
Cette passe capture ce qui fait que le site RESSEMBLE au site. Sans elle, le JSON sera textuel mais visuellement méconnaissable.
3a. text-transform & casing global
* Les titres, boutons, labels, liens navbar, liens footer sont-ils en UPPERCASE via CSS ?
* Si TOUT le texte visible est en majuscules → text-transform: uppercase global
3b. Styles de boutons distincts Identifier CHAQUE variante VISUELLEMENT (pas d'après le label) :
* Primary/filled : fond coloré, texte contrasté
* Secondary/outline : bordure visible, fond transparent
* Ghost : ni fond ni bordure, juste du texte
* Dark : fond sombre, texte clair Pour chaque variante : bg, text, border, border-radius, text-transform, letter-spacing, hover state.
3c. Éléments décoratifs récurrents
* Icônes/ornements au-dessus des titres de section
* Lignes horizontales ou séparateurs autour des icônes
* Illustrations SVG semi-transparentes dans les coins/côtés
* Pattern de répétition (même icône ou différente par section ?)
3d. Alternance de backgrounds entre sections Cartographier la séquence EXACTE des fonds de haut en bas : cream → white → dark → cream → dark... Sections avec image + overlay : noter l'image ET l'opacité overlay.
3e. Layouts d'images
* Grid uniforme : toutes images même taille
* Mosaic/Bento : images tailles différentes, layout asymétrique
* Split : 1 image + texte côte à côte
* Stacked : images empilées, décalées
* Full-width : image de fond couvrant toute la section
* Carousel : images défilantes avec navigation
3f. Accents typographiques
* Certains caractères dans une couleur différente ? (ex: "99%" avec "%" en doré)
* Des mots surlignés, soulignés, en couleur d'accent ?
* Des chiffres/stats avec traitement spécial ?
* Texte en italique pour les citations/témoignages ?
* Texte barré (prix barré) ?
3f-bis. Échelle typographique → mapping vers Brand.typography.size
* Si les titres h1 sont >= 72px et les body >= 18px → size: 'large'
* Si les titres h1 sont 48-64px et les body 16px → size: 'default'
* Si les titres h1 sont <= 40px et les body <= 14px → size: 'compact'
3f-ter. Espacement → mapping vers Brand.spacing
* Si padding-y des sections >= 120px et gaps >= 32px → spacing: 'relaxed'
* Si padding-y des sections 60-100px et gaps 16-24px → spacing: 'default'
* Si padding-y des sections <= 48px et gaps <= 12px → spacing: 'compact'
3f-quater. Border radius → mapping vers Brand.borderRadius
* Si les buttons/cards/inputs ont 0px de radius → borderRadius: 'none'
* Si radius 4-6px → borderRadius: 'sm'
* Si radius 8-12px → borderRadius: 'md'
* Si radius 16-24px → borderRadius: 'lg'
* Si radius >= 9999px (pill) → borderRadius: 'full'
3g-bis. Conteneur principal & système de grille
* Container max-width : 1200px ? 1440px ? pleine largeur ?
* Gouttière (gap entre colonnes) : 16px ? 24px ? 32px ?
* Système de grille : CSS Grid ? Flexbox ? Colonnes fixes ?
* Padding latéral du container : 16px mobile → 32px tablet → 64px desktop ?
* Si fullWidth: true sur certaines sections → noter lesquelles exactement
3g. Cards et conteneurs
* Bordure visible sur les cards ? Quelle couleur ?
* Shadow sur les cards ? Au hover ?
* Cards dans un conteneur bordé ?
* Fond des cards différent du fond de section ?
Mapping observations visuelles → SectionStyle
Observation visuelle → Champ SectionStyle → Valeur

Texte en ALL CAPS → textTransform → 'uppercase'
Lettres espacées (uppercase) → letterSpacing → 'wide' ou 'wider'
Fond crème/beige → background: 'custom' + customBgColor → '#F8F5EF'
Fond noir/très sombre → background: 'dark' → (ou 'custom' + customBgColor si pas #000/#111)
Fond dégradé → background: 'custom-gradient' + customGradient → { from, to, direction }
Image de fond + texte clair → backgroundImage → { url, overlayColor, overlayOpacity }
Vidéo en background → videoBackground → { url, poster, loop: true, muted: true }
Éléments dorés/accent → accentColor → '#DEC7A6'
Titres très gros → titleSize → 'xl'
Titres petits/discrets → titleSize → 'sm'
Texte centré → textAlign → 'center'
Texte aligné à gauche → textAlign → 'left'
Texte clair sur fond sombre → textColor → '#FFFFFF'
Texte sombre sur fond clair → textColor → '#0f172a' ou omis
Coins arrondis cards → borderRadius → 'md' ou 'lg'
Coins très arrondis (pills) → borderRadius → 'full'
Coins carrés → borderRadius → 'none'
Ombre sur les cards → boxShadow → 'md'
Grosse ombre portée → boxShadow → 'xl'
Pas d'ombre → boxShadow → 'none'
Section pleine largeur (pas de container) → fullWidth → true
Section semi-transparente → opacity → 0.8
Séparateur ondulé entre sections → dividerBottom → { shape: 'wave', color: '#hex' }
Séparateur angulaire → dividerBottom → { shape: 'angle', color: '#hex' }
Séparateur courbe → dividerBottom → { shape: 'curve', color: '#hex' }
Séparateur triangulaire → dividerBottom → { shape: 'triangle', color: '#hex' }
⚠️ Les dividers séparent DEUX sections → le dividerBottom de la section du haut
   OU le dividerTop de la section du bas. Utiliser l'un OU l'autre, pas les deux.
Beaucoup d'espace vertical → paddingY → 'xl'
Peu d'espace vertical → paddingY → 'sm'
Pas d'espace vertical → paddingY → 'none'
Mapping padding-y px → SectionPaddingY :
  0px → 'none'
  16-32px → 'sm'
  48-64px → 'md'
  80-100px → 'lg'
  120px+ → 'xl'
Font serif sur les titres → fontFamily → 'Playfair Display' (ou la font détectée)
Titres très bold → fontWeight → 800 ou 900
Section couleur primaire en fond → background → 'primary'

Arbre de décision background :
1. Le fond est-il une IMAGE ? → backgroundImage + background: 'custom' ou 'dark'
2. Le fond est-il une VIDÉO ? → videoBackground + background: 'dark'
3. Le fond est-il un DÉGRADÉ ? → background: 'custom-gradient' + customGradient
4. Le fond est-il la COULEUR PRIMAIRE du brand ? → background: 'primary'
5. Le fond est-il BLANC (#fff, #fafafa) ? → background: 'white'
6. Le fond est-il GRIS CLAIR (#f1f5f9, #f8fafc) ? → background: 'light'
7. Le fond est-il NOIR/SOMBRE (#000, #111, #1a1a1a) ? → background: 'dark'
8. Le fond est-il une AUTRE COULEUR ? → background: 'custom' + customBgColor: '#hex'
⚠️ Si le fond est crème (#F8F5EF), beige, ou une couleur non-standard → TOUJOURS 'custom' + customBgColor
⚠️ Ne JAMAIS mettre background: 'white' si le fond n'est pas réellement blanc
⚠️ Une section avec background image N'EST PAS automatiquement un "hero"
  → Hero = PREMIÈRE section principale avec titre proéminent
  → CTA avec background image = type "cta" avec backgroundImage dans style
  → Image-text avec background image = type "image-text" avec backgroundImage dans style
  → La backgroundImage est un STYLE, pas un TYPE de section


### PASSE 3bis — EFFETS VISUELS & INTERACTIONS (CRITIQUE PREMIUM)

C'est ce qui distingue un site premium d'un site basique.
Chaque point est obligatoire. Ne pas sauter.

---

**3h. Effets de scroll (les plus impactants)**

- **Parallax background** : le fond reste fixe pendant que le contenu défile
  → Détecter via `background-attachment: fixed` sur les sections hero/video/CTA
  → Sortie : `{ type: "parallax-bg", intensity: "slow|medium|fast", cssValue: "fixed" }`

- **Parallax image** : une image se déplace plus lentement que le scroll
  → Souvent via `transform: translateY()` piloté par JS (GSAP ScrollTrigger, Lenis, etc.)
  → Sortie : `{ type: "parallax-image", direction: "up|down", speed: 0.3-0.8 }`

- **Zoom out au scroll** : image qui commence zoomée et dézoome pendant le scroll
  → Souvent sur les heroes : `scale(1.1) → scale(1.0)` en scrollant
  → Sortie : `{ type: "scroll-zoom-out", from: 1.15, to: 1.0 }`

- **Texte qui révèle ligne par ligne** : les lignes apparaissent en séquence
  → Souvent via clip-path ou overflow:hidden + translateY
  → Sortie : `{ type: "text-reveal-lines", stagger: "50ms" }`

- **Éléments qui entrent depuis les côtés** : slide-in left/right au scroll
  → Sortie : `{ type: "slide-in", direction: "left|right", distance: "60px", trigger: "scroll" }`

- **Fade + translateY au scroll** (le plus courant)
  → Sortie : `{ type: "fade-up", y: "40px", opacity: "0→1", duration: "600ms" }`

- **Stagger d'éléments** : les cards/items apparaissent en cascade
  → Sortie : `{ type: "stagger-fade-up", staggerDelay: "100ms", items: "cards|icons|list-items" }`

- **Counter animation** : les chiffres de stats comptent de 0 jusqu'à la valeur finale
  → Sortie : `{ type: "counter", trigger: "scroll-enter", duration: "2000ms" }`

- **Progress bar animée** : barres qui se remplissent au scroll
  → Sortie : `{ type: "progress-fill", trigger: "scroll-enter" }`

- **Sticky section** : un élément reste fixe pendant le scroll d'une autre partie
  → Sortie : `{ type: "sticky", element: "image|text|sidebar", duration: "section-height" }`

- **Horizontal scroll** : une section défile horizontalement au lieu de verticalement
  → Sortie : `{ type: "horizontal-scroll", trigger: "vertical-to-horizontal" }`

---

**3i. Effets hover — DOCUMENTER CHAQUE ÉLÉMENT INTERACTIF**

Pour CHAQUE élément interactif du site, documenter l'état hover :

- **Cards hover** :
  - Lift (translateY négatif) : `transform: translateY(-8px)`
  - Scale : `transform: scale(1.02)`
  - Shadow qui apparaît/grossit
  - Bordure qui change de couleur
  - Background qui change
  - Image qui zoome à l'intérieur de la card (overflow:hidden + scale sur l'img)
  - Overlay qui apparaît sur l'image (couleur + opacité)
  - Texte qui révèle (un sous-texte caché qui apparaît)
  → Sortie : `{ element: "card", hoverEffects: ["lift-8px", "shadow-lg", "image-zoom-1.05"] }`

- **Boutons hover** :
  - Changement de background color
  - Inversion couleurs (fill ↔ outline)
  - Icône qui apparaît ou se déplace (arrow qui slide)
  - Background qui remonte du bas (effet liquid/fill)
  - Scale léger
  - Shadow qui apparaît
  → Sortie : `{ element: "button-primary", hoverEffects: ["bg-darken-10%", "translateY(-2px)", "shadow-md"] }`

- **Images hover** :
  - Zoom (scale 1.05-1.1)
  - Overlay coloré
  - Desaturation → saturation
  - Rotation légère
  → Sortie : `{ element: "gallery-image", hoverEffects: ["zoom-1.08", "overlay-rgba(0,0,0,0.3)"] }`

- **Liens hover** :
  - Underline qui slide de gauche à droite
  - Changement de couleur
  - Flèche qui apparaît
  → Sortie : `{ element: "nav-link", hoverEffects: ["underline-slide-left", "color-accent"] }`

- **Icônes hover** :
  - Rotation
  - Scale
  - Changement de couleur
  → Sortie : `{ element: "social-icon", hoverEffects: ["scale-1.1", "color-primary"] }`

- **Transition par défaut** :
  La plupart des sites premium ont une transition globale de 0.2s-0.4s ease.
  Détecter via : `* { transition: all 0.3s ease }` ou équivalent.
  Documenter dans brand.effects.transitions.default

---

**3j. Effets de background avancés**

- **background-attachment: fixed** (parallax CSS natif)
  → Détecter sur quelles sections exactement
  → Sortie : `{ type: "bg-fixed", sections: ["hero", "cta-video"] }`

- **Vidéo en background** (autoplay, muted, loop)
  → Sortie : `{ type: "video-bg", autoplay: true, muted: true, loop: true, fallbackImage: "url" }`

- **Gradient animé** (gradient qui évolue en continu)
  → Détecter via `@keyframes` sur `background-position` ou `background-size`
  → Sortie : `{ type: "animated-gradient", duration: "8s", easing: "linear", loop: true }`

- **Noise/grain texture** (overlay de texture sur le fond)
  → Souvent un SVG ou canvas en pseudo-element
  → Sortie : `{ type: "noise-texture", opacity: 0.04, blendMode: "overlay" }`

- **Glassmorphism** (backdrop-filter: blur)
  → Détecter sur cards, navbar, modals
  → Sortie : `{ type: "glassmorphism", blur: "12px", bg: "rgba(255,255,255,0.1)", border: "rgba(255,255,255,0.2)" }`

- **Grain/film effect** (css filter ou canvas)
  → Sortie : `{ type: "film-grain", intensity: "light|medium|heavy" }`

---

**3k. Animations de texte avancées**

- **Texte qui se type** (typewriter effect)
  → Sortie : `{ type: "typewriter", words: ["mot1", "mot2"], speed: "100ms/char" }`

- **Mots qui changent** (word rotator/flipper)
  → Souvent un titre avec 1 mot qui change parmi plusieurs
  → Sortie : `{ type: "word-rotator", words: ["Premium", "Unique", "Élégant"], duration: "2000ms" }`

- **Texte scramble** (lettres aléatoires qui se résolvent)
  → Sortie : `{ type: "text-scramble", duration: "800ms" }`

- **Split text** (chaque lettre/mot animé individuellement)
  → Sortie : `{ type: "split-text", splitBy: "char|word|line", stagger: "20ms" }`

- **Marquee/ticker** (texte défilant en boucle horizontale)
  → Souvent dans les sections logos ou bandeau
  → Sortie : `{ type: "marquee", direction: "left|right", speed: "30s", items: [...] }`

---

**3l. Transitions de page et micro-interactions**

- **Transition de page** : fondu, slide, ou effet lors du changement de page
  → Sortie : `{ type: "page-transition", effect: "fade|slide|clip", duration: "400ms" }`

- **Smooth scroll** : défilement fluide (Lenis, locomotive-scroll, ou CSS)
  → Sortie : `{ type: "smooth-scroll", library: "lenis|locomotive|css-native", easing: "ease" }`

- **Cursor personnalisé** : curseur remplacé par un élément custom
  → Sortie : `{ type: "custom-cursor", shape: "circle|dot|cross", size: "px", color: "#hex", hasTrail: true }`

- **Magnetic buttons** : boutons qui attirent le curseur
  → Sortie : `{ type: "magnetic", strength: 0.3, elements: ["cta-buttons"] }`

- **Loading screen** : animation au chargement initial
  → Sortie : `{ type: "loading-screen", duration: "1500ms", effect: "fade-out|slide-up" }`

- **Animation Lottie** : fichier JSON animé (icônes, illustrations, micro-interactions)
  → Détecter via : lottie-player, lottie-web, @lottiefiles, bodymovin, .lottie/.json
  → Sortie : `{ type: "lottie", src: "url", autoplay: true, loop: true, speed: 1 }`

- **Scène 3D Spline** : modèle 3D interactif en WebGL
  → Détecter via : @splinetool/runtime, spline-viewer, spline.design embed
  → Sortie : `{ type: "spline", sceneUrl: "url", interactive: true }`

- **Animation Rive** : animation vectorielle interactive (.riv)
  → Détecter via : @rive-app/canvas, rive-wasm, .riv file
  → Sortie : `{ type: "rive", src: "url", stateMachine: "name", autoplay: true }`

---

**3m. Effets sur les sections au scroll (intersection)**

Pour CHAQUE section, documenter ce qui se passe quand elle entre dans le viewport :
```json
{
  "section": "features",
  "scrollEffects": {
    "entrance": {
      "type": "stagger-fade-up",
      "elements": "cards",
      "staggerDelay": "120ms",
      "duration": "600ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)",
      "threshold": 0.15
    },
    "parallax": {
      "element": "background-image",
      "speed": 0.4,
      "direction": "up"
    },
    "sticky": null,
    "pinned": null
  }
}
```

---

**Checklist effets visuels — à cocher avant de passer à la Passe 4**

- [ ] Chaque section hero : y a-t-il un parallax, un zoom, une vidéo bg ?
- [ ] Les cards : hover lift ? hover zoom image ? hover overlay ?
- [ ] Les boutons : hover color change ? fill effect ? arrow slide ?
- [ ] Y a-t-il du texte en mouvement (marquee, typewriter, word rotator) ?
- [ ] Y a-t-il un smooth scroll (Lenis, Locomotive) ?
- [ ] Y a-t-il un curseur personnalisé ?
- [ ] Les chiffres de stats comptent-ils (counter animation) ?
- [ ] Y a-t-il des sections avec background-attachment: fixed ?
- [ ] Y a-t-il des animations stagger sur les listes/grilles ?
- [ ] Y a-t-il des effets glassmorphism (backdrop-filter: blur) ?
- [ ] Y a-t-il des transitions de page ?
- [ ] Y a-t-il un loading screen ?
- [ ] Les images de gallery zooment-elles au hover ?
- [ ] Y a-t-il des sections qui scrollent horizontalement ?
- [ ] Y a-t-il des éléments sticky pendant le scroll d'une section ?

Et dans le JSON de sortie, rajoute cette section :


json
"visualEffects": {
  "scrollEffects": [
    {
      "section": "hero",
      "effects": [
        { "type": "parallax-bg", "cssValue": "background-attachment: fixed" },
        { "type": "scroll-zoom-out", "from": 1.15, "to": 1.0 }
      ]
    }
  ],
  "hoverEffects": [
    { "element": "cards", "effects": ["lift-8px", "shadow-lg", "image-zoom-1.05"] },
    { "element": "button-primary", "effects": ["bg-darken", "translateY(-2px)"] },
    { "element": "gallery-images", "effects": ["zoom-1.08", "overlay-dark-0.3"] }
  ],
  "textAnimations": [
    { "type": "marquee", "location": "logos-section", "speed": "30s" },
    { "type": "counter", "location": "stats-section", "duration": "2000ms" }
  ],
  "globalEffects": {
    "smoothScroll": { "active": true, "library": "lenis|native", "confidence": "" },
    "customCursor": { "active": false },
    "pageTransition": { "active": false },
    "loadingScreen": { "active": false },
    "noiseTexture": { "active": false }
  }
}
```

---

Et dans l'audit, rajoute ces lignes :
```
Effets hover non documentés    : X → [liste exacte]
Effets scroll non documentés   : X → [liste exacte]
Animations texte non détectées : X → [liste exacte]
Effets globaux non vérifiés    : X → [liste exacte]
Score effets visuels           : XX%


PASSE 4 — MATCHING AVEC LA LIBRAIRIE JL STUDIO BUILDER
Pour chaque élément détecté, identifier quel élément de la librairie correspond le mieux.
4a. Icônes (→ library/icons.ts) Pour chaque icône : description visuelle, famille probable (Lucide en priorité), ID suggéré.
4b. Éléments de base (→ library/elements.ts) Badges, tags, pills, séparateurs, dividers, avatars, progress bars, rating stars, breadcrumbs, pagination.
4c. Composants UI (→ library/components.ts) Cartes de service, témoignages, blog, portfolio, produits, accordéons, FAQ, formulaires, pricing tables.
4d. Wireframes (→ library/wireframes.ts) Pour chaque section : pattern de structure, hiérarchie des éléments (icône → titre → body → CTA), position des médias par rapport au texte, nombre de colonnes.

Matching wireframe de la page globale :
* Header + Hero + Features + Testimonials + CTA + Footer → wf-landing-basic
* Header + Hero + Logos + Features + Image-Text + Stats + Testimonials + Pricing + FAQ + CTA + Footer → wf-landing-full
* Header + Hero + Image-Text + Timeline + Team + Stats + CTA + Footer → wf-about
* Header + Hero + Blog Grid + Newsletter + Footer → wf-blog
* Header + Hero + Gallery + Testimonials + Contact + Footer → wf-portfolio
* Header + Hero + Products + Features + Testimonials + Newsletter + Footer → wf-ecommerce

⚠️ Si la page ne correspond exactement à aucun wireframe → pattern: "custom" et décrire la structure

Templates existants pour référence (library/templates.ts) :
  basic-tpl-photographe : Portfolio photo — hero + gallery + testimonials + contact
  basic-tpl-coach : Coaching — hero + features + testimonials + pricing + FAQ
  basic-tpl-restaurant : Restaurant — hero + gallery + testimonials + map + contact
  basic-tpl-saas : SaaS — hero + logos + features + stats + testimonials + pricing + comparison + FAQ
  basic-tpl-agency : Agence digitale — hero + features + gallery + steps + team + testimonials
  basic-tpl-portfolio-creatif : Portfolio créatif — hero + gallery + testimonials + contact
  basic-tpl-ecommerce-shop : E-commerce — hero + products + features + testimonials + newsletter
  basic-tpl-startup : Startup tech — hero + logos + features + stats + testimonials + pricing
  basic-tpl-immobilier : Immobilier — hero + products + features + testimonials
  basic-tpl-sante : Santé/Bien-être — hero + features + image-text + team + testimonials + pricing
→ Si le site scanné ressemble à un de ces templates, le mentionner dans reproductionNotes

Raccourci thème complet — Si le site correspond étroitement à un thème existant :
Le configurateur peut appliquer un thème complet en un clic via applyFullTheme() :
  palette + typography + tag styles + spacing + borderRadius
Si le designPreset.closestTheme a confidence: "high" → le thème peut être appliqué directement
puis les sections et contenus sont ajoutés par-dessus. Mentionner cette stratégie dans reproductionNotes.
4e. Animations (→ library/animations.ts + animationPresets.ts + easingPresets.ts) Pour chaque animation : type, propriétés animées, durée, easing exact, trigger, délai stagger, preset correspondant dans animationPresets.ts.
4f. Illustrations (→ library/illustrations.ts) Blobs, gradients décoratifs, patterns (dots, grid, diagonal), overlays, noise textures, waves, glow circles — identifier chaque élément décoratif de fond.

Heuristiques de matching composants :
* Bouton avec fond coloré plein → comp-btn-primary
* Bouton avec bordure et fond transparent → comp-btn-outline-luxury
* Bouton avec effet glass/blur → comp-btn-glass
* Bouton noir minimal → comp-btn-dark-minimal
* Bouton arrondi comme une pilule → comp-btn-pill-soft
* Bouton avec flèche → comp-btn-icon-arrow
* Bouton très grand en hero → comp-btn-large-hero
* Badge avec fond translucide → comp-badge-glass
* Badge doré/luxury → comp-badge-gold-luxury
* Badge avec bordure outline → comp-badge-outline-light
* Card avec glass effect → comp-card-glass
* Card avec image qui zoome au hover → comp-card-image-hover
* Card de témoignage avec avatar → comp-card-testimonial-brixsa
* Card de stat avec gros chiffre → comp-card-stat
* Card de prix premium → comp-card-pricing-premium

Heuristiques de matching éléments :
* Petit texte en caps au-dessus du titre → el-text-overline (ou el-text-overline-dark si fond sombre)
* Très grand titre display → el-heading-hero-xl
* Titre de section standard → el-heading-section
* Corps de texte lead (plus grand que body) → el-text-lead
* Citation avec guillemets décoratifs → el-text-blockquote-luxury
* Prix affiché en grand → el-text-price-display
* Ligne fine séparatrice → el-divider-subtle
* Ligne dorée dégradée → el-divider-gradient-gold

Heuristiques de matching illustrations :
* Fond avec grain/bruit → ill-deco-noise-texture
* Forme blob abstraite dorée → ill-blob-gold-glow
* Pattern de points en fond → ill-pattern-dots
* Vague décorative → ill-deco-wave
* Cercle lumineux en fond → ill-deco-glow-circle

PASSE 5 — CONTENU & COPYWRITING (SECTION PAR SECTION)
NE PAS faire une lecture globale. Pour CHAQUE section individuellement :
1. Titre EXACT (ou confirmer qu'il n'y en a pas)
2. Eyebrow/badge EXACT (ou confirmer que c'est une icône SVG sans texte → eyebrow: null)
3. Body text COMPLET mot pour mot (ne jamais tronquer)
4. Chaque bouton CTA : label EXACT + URL EXACT + variante visuelle (primary/outline/ghost/dark)
5. Tous les items de listes/grilles : TOUS les champs de TOUS les items
6. Médias : position, type, description
7. Footer : colonnes, labels exacts, casse exacte, copyright complet

PASSE 5bis — DÉTECTION CMS & CONTENU DYNAMIQUE
Si le site semble avoir du contenu dynamique (blog, portfolio, catalogue) :
1. Identifier les collections : blog posts, projets, produits, catégories
2. Pour chaque collection : estimer les champs (titre, image, date, catégorie, corps)
3. Types de champs CMS supportés : plain-text · rich-text · image · multi-image · video · link · email · phone · number · boolean · date · datetime · color · option · multi-option · reference · multi-reference
4. Documenter dans reproductionNotes les collections détectées et leurs champs probables
5. Les sections dynamiques (blog-grid, product-grid, collection-list) seront liées à ces collections

PASSE 5ter — DÉTECTIONS SPÉCIFIQUES PAR TYPE DE SECTION

Footer — Règles de détection :
* Colonnes : compter le nombre EXACT de colonnes (typiquement 3-5)
* Chaque colonne a un titre ET des liens — capturer TOUS les liens avec casse exacte
* Copyright : copier MOT POUR MOT y compris "Designed by X", "Powered by Y", "All rights reserved"
* Socials : chaque icône sociale = un lien → capturer la plateforme ET l'URL
* Logo du footer : peut être différent du header (version claire/sombre)
* Tagline : texte court sous le logo → capturer si présent

Slider — Règles de détection :
* Compter les slides UNIQUES (ignorer les clones pour l'effet loop)
* Navigation : dots en bas ? flèches sur les côtés ? compteur "2/5" ?
* Autoplay : le slider défile-t-il automatiquement ? À quel intervalle ?
* Effet : slide (glissement) vs fade (fondu) vs scale (zoom)
* Chaque slide peut avoir : image, titre, sous-titre, badge, CTA

Map — Règles de détection :
* Google Maps embed → provider: "embed", capturer l'URL iframe exacte
* OpenStreetMap → provider: "openstreetmap"
* Adresse affichée à côté → capturer dans content.address
* Horaires affichés → capturer dans content.hours
* Téléphone affiché → capturer dans content.phone

Tabs — Règles de détection :
* Onglets horizontaux (en haut) vs verticaux (à gauche)
* Le contenu change-t-il au clic ? → type "tabs"
* Chaque onglet : label exact + contenu exact + image si présente

Quick Stack — Règles de détection :
* Layout asymétrique avec des blocks de tailles différentes → quick-stack
* 1 grand block + 2 petits → layout: "1+2"
* 2 rangées de 2 → layout: "2x2"
* 3 blocks côte à côte → layout: "3x1"
* Masonry (Pinterest-like) → layout: "masonry"
* 1 block + 1 block côte à côte → layout: "1+1"
* Asymétrique sans pattern clair → layout: "asymmetric"
* Chaque block peut avoir : titre, sous-titre, body, image, icône, badge, CTA

Comparison Table — Règles de détection :
* Tableau avec colonnes (plans/produits) et lignes (features)
* Checkmarks ✓ et croix ✗ → values: [true, false, true]
* Texte dans les cellules → values: ["10 GB", "100 GB", "Illimité"]
* La première colonne = noms des features
* Les colonnes suivantes = valeurs par plan/produit

Newsletter — Règles de détection :
* Input email + bouton subscribe → type "newsletter"
* Différent de "contact" : newsletter = juste email, contact = multi-champs
* Placeholder du champ email → capturer exactement (ex: "Votre email", "Enter your email")
* Label du bouton → capturer exactement (ex: "S'inscrire", "Subscribe")
* Texte de social proof → count: "8,400+" ou socialProof: "Join 8,400+ subscribers"
* Disclaimer RGPD → capturer si présent

Contact — Règles de détection :
* Formulaire avec nom + email + message → type "contact" (pas "form")
* Si formulaire complexe avec plus de 4-5 champs → type "form" (pas "contact")
* Informations de contact affichées (email, téléphone, adresse) → dans content
* Google Maps intégré AVEC formulaire de contact → 2 sections séparées : "contact" + "map"
* Google Maps intégré SEUL → type "map"

Video — Règles de détection :
* YouTube embed (iframe youtube.com/embed/) → provider: "youtube", url: "embed URL"
* Vimeo embed (player.vimeo.com/video/) → provider: "vimeo", url: "embed URL"
* Fichier MP4/WebM natif (<video src="...">) → provider: "html5", url: "file URL"
* Vidéo en background (sans contrôles, autoplay, loop) → PAS une section "video"
  → C'est un videoBackground dans le style de la section parente (hero, cta, etc.)
* Vidéo avec contrôles visibles (play/pause) → section "video"
* Poster/thumbnail → poster: "image URL"
* Lightbox vidéo (clic sur image → vidéo en modal) → noter dans visualEffects

Accordion — Règles de détection :
* Différent de FAQ : accordion = contenu générique dépliable, FAQ = questions/réponses
* IconStyle : chevron (▼), plus/minus (+/−), flèche (→), ou rien
* Multiple items ouverts simultanément → allowMultiple: true
* Un seul à la fois → allowMultiple: false

PASSE 6 — VÉRIFICATION PAR NÉGATION (CRITIQUE)
Pour CHAQUE champ rempli : "Est-ce que je l'ai VU, ou je le SUPPOSE ?"
Checklist obligatoire :
* [ ] Chaque eyebrow/badge : texte réel ou icône SVG sans texte ?
* [ ] Chaque titre : texte EXACT ou inventé ?
* [ ] Chaque body : copié du site ou reformulé ?
* [ ] Chaque bouton : label + href + variante visuelle corrects ?
* [ ] Footer : labels exacts, casse exacte, colonnes réelles ?
* [ ] Copyright : complet mot pour mot ?
* [ ] Backgrounds : vérifiés visuellement ou supposés blancs ?
* [ ] text-transform : vérifié via CSS ou supposé ?
* [ ] Icônes décoratives : documentées dans library.iconsDetected ?
* [ ] Éléments de base : badges, dividers, avatars dans library.elementsDetected ?
* [ ] Wireframe patterns : documentés dans library.wireframesDetected ?
* [ ] Animations : observées et documentées dans library.animationsDetected ?
* [ ] Composants : tous dans library.componentsDetected ?
* [ ] Illustrations/décorations : blobs, patterns, noise dans library.illustrationsDetected ?
* [ ] Navigation : style (transparent/solid/blur), liens, CTA documentés ?
* [ ] Footer : colonnes, liens exacts, socials, copyright COMPLET ?
* [ ] Chaque section.type est un des 37 types valides ?
* [ ] Chaque variant suit le pattern {universe}-{layout} ?
* [ ] Chaque ButtonConfig a un champ variant ?
* [ ] Les champs icon utilisent des noms Lucide (pas des emojis) ?
* [ ] Les pages supplémentaires sont dans "pages" (pas mélangées dans "sections") ?
* [ ] Le designPreset utilise un ID exact de la liste (pas un nom inventé) ?
* [ ] Les sections "custom" ont une structure elements[] documentée ?
* [ ] Les vidéos background sont dans style.videoBackground (pas dans une section "video") ?
* [ ] Le contenu CMS dynamique (blog, portfolio) est documenté dans reproductionNotes ?
* [ ] Les fonts détectées sont dans la liste des 80+ fonts intégrées ? Si non → signaler comme custom
* [ ] Les animations Lottie/Spline/Rive sont documentées ?
* [ ] Les pseudo-états (:hover, :focus) sont documentés pour les éléments interactifs ?
* [ ] Les composants réutilisables (patterns répétés) sont signalés ?
* [ ] Le nombre de colonnes est renseigné pour les grids ?
* [ ] Les collections CMS sont identifiées (blog posts, produits, projets) ?
Règle d'or : si tu n'as pas pu VÉRIFIER, mets null. N'invente JAMAIS.

---

## PARTIE 4 — STRUCTURE DU JSON DE SORTIE
1. IDENTITÉ DE SITE
{
  "name": "Nom du site",
  "slug": "slug-kebab-case",
  "industry": "immobilier | restauration | mode | photo | tech | conseil | retail | agence | fitness | ecommerce",
  "audience": "B2B | B2C-premium | B2C-mass | startup | artisan",
  "primaryGoal": "conversion | storytelling | catalogue | branding | lead-gen | ecommerce"
}

2. DESIGN SYSTEM
{
  "brand": {
    "colors": {
      "--color-primary":        { "value": "#hex", "confidence": "high|medium|low", "source": "CSS variable|computed|screenshot|estimated" },
      "--color-secondary":      { "value": "#hex", "confidence": "", "source": "" },
      "--color-accent":         { "value": "#hex", "confidence": "", "source": "" },
      "--color-background":     { "value": "#hex", "confidence": "", "source": "" },
      "--color-surface":        { "value": "#hex", "confidence": "", "source": "" },
      "--color-text-primary":   { "value": "#hex", "confidence": "", "source": "" },
      "--color-text-secondary": { "value": "#hex", "confidence": "", "source": "" },
      "--color-text-muted":     { "value": "#hex", "confidence": "", "source": "" },
      "--color-border":         { "value": "#hex", "confidence": "", "source": "" },
      "--color-success":        { "value": "#hex", "confidence": "", "source": "" },
      "--color-error":          { "value": "#hex", "confidence": "", "source": "" }
    },
    "gradients": [
      { "name": "gradient-hero", "value": "linear-gradient(...)", "confidence": "", "usedIn": [] }
    ],
    "typography": {
      "fontPrimary":   { "name": "Nom exact", "weights": [400,600,700], "confidence": "", "source": "link-tag|font-face|webfont-load" },
      "fontSecondary": { "name": "Nom exact ou null", "weights": [], "confidence": "", "source": "" },
      "fontAccent":    { "name": "Nom exact ou null", "weights": [], "confidence": "", "source": "" },
      "textTransform": {
        "headings":    "uppercase|capitalize|none",
        "buttons":     "uppercase|capitalize|none",
        "labels":      "uppercase|capitalize|none",
        "navLinks":    "uppercase|capitalize|none",
        "footerLinks": "uppercase|capitalize|none",
        "body":        "none",
        "confidence":  "high|medium|low"
      },
      "letterSpacing": {
        "headings":          "em ou px",
        "buttons":           "em ou px",
        "labels":            "em ou px",
        "uppercase-default": "0.05em-0.15em (typique pour uppercase)",
        "confidence":        "high|medium|low"
      },
      "scale": {
        "h1":      { "size": "", "weight": 700, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "h2":      { "size": "", "weight": 600, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "h3":      { "size": "", "weight": 500, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "h4":      { "size": "", "weight": 500, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "body":    { "size": "", "weight": 400, "lineHeight": "", "letterSpacing": "", "textTransform": "none", "confidence": "" },
        "small":   { "size": "", "weight": 400, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "label":   { "size": "", "weight": 500, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" },
        "caption": { "size": "", "weight": 400, "lineHeight": "", "letterSpacing": "", "textTransform": "", "confidence": "" }
      }
    },
    "spacing": {
      "unit": "8px",
      "sectionPaddingY":   { "desktop": "px", "tablet": "px", "mobile": "px", "confidence": "" },
      "sectionPaddingX":   { "desktop": "px", "tablet": "px", "mobile": "px", "confidence": "" },
      "containerMaxWidth": "px",
      "gutter":            "px",
      "gridGap":           "px",
      "confidence":        "high|medium|low"
    },
    "effects": {
      "borderRadius": {
        "sm":   { "value": "px", "usedOn": "badges, inputs",     "confidence": "" },
        "md":   { "value": "px", "usedOn": "cards, buttons",     "confidence": "" },
        "lg":   { "value": "px", "usedOn": "modals, panels",     "confidence": "" },
        "full": { "value": "9999px", "usedOn": "pills, avatars", "confidence": "" }
      },
      "shadows": {
        "card":   { "value": "0 2px 8px rgba(...)", "confidence": "" },
        "button": { "value": "...", "confidence": "" },
        "modal":  { "value": "...", "confidence": "" },
        "hover":  { "value": "...", "confidence": "" }
      },
      "transitions": {
        "default": { "value": "0.3s ease",  "confidence": "" },
        "slow":    { "value": "0.6s ease",  "confidence": "" },
        "fast":    { "value": "0.15s ease", "confidence": "" },
        "spring":  { "value": "cubic-bezier(...)", "confidence": "" }
      },
      "blur": {
        "backdrop": { "value": "px ou none", "confidence": "" }
      }
    },
    "decorativeElements": {
      "sectionIcon": {
        "present": true,
        "description": "description visuelle de l'icône",
        "position": "above-title|before-title|after-title",
        "color": "#hex ou description",
        "hasLines": true,
        "lineDescription": "lignes horizontales de chaque côté",
        "frequency": "every-section|most-sections|specific-sections",
        "confidence": "high|medium|low"
      },
      "cornerIllustrations": {
        "present": false,
        "description": "illustrations SVG dans les coins",
        "positions": ["top-right", "bottom-left"],
        "opacity": 0.1,
        "confidence": ""
      },
      "sectionDividers": {
        "present": false,
        "type": "line|wave|angle|none",
        "confidence": ""
      }
    }
  }
}

3. MOOD & STYLE
{
  "style": {
    "mood": ["luxury", "minimal"],
    "palette": "dark|light|neutral|colorful",
    "density": "spacious|balanced|dense",
    "typography": "serif-dominant|sans-dominant|mixed"
  }
}
Valeurs autorisées UNIQUEMENT. Maximum 2 moods.

4. LIBRAIRIE — MATCHING COMPLET
{
  "library": {
    "iconsDetected": [
      {
        "location": "où est l'icône sur le site",
        "description": "description visuelle précise",
        "family": "lucide|heroicons|feather|phosphor|custom-svg",
        "suggestedId": "nom dans icons.ts ou null",
        "confidence": "high|medium|low"
      }
    ],
    "elementsDetected": [
      {
        "type": "badge|divider|avatar|progress-bar|star-rating|tooltip|breadcrumb|pagination|tag",
        "variant": "description de la variante",
        "style": {
          "bg": "#hex", "text": "#hex", "border": "",
          "borderRadius": "px", "fontSize": "px", "fontWeight": 400,
          "textTransform": "uppercase|none", "letterSpacing": "em"
        },
        "usedIn": ["liste des sections"],
        "confidence": "high|medium|low"
      }
    ],
    "componentsDetected": [
      {
        "type": "testimonial-card|service-card|blog-card|product-card|faq-item|pricing-card|team-card|stat-block|form-contact|modal|tabs|accordion",
        "variant": "description de la variante",
        "structure": {
          "fields": ["liste des champs présents"],
          "mediaPosition": "top|left|right|background|none",
          "hasIcon": false, "hasBadge": false, "hasRating": false
        },
        "style": {
          "bg": "#hex", "border": "1px solid #hex|none",
          "borderRadius": "px", "shadow": "valeur|none",
          "padding": "px", "hoverEffect": "shadow|lift|border|none"
        },
        "usedIn": ["sections concernées"],
        "confidence": "high|medium|low"
      }
    ],
    "wireframesDetected": [
      {
        "section": "nom de la section",
        "pattern": "nom-du-pattern-kebab-case",
        "structure": "description linéaire: [icône] → heading → body → [grid: card card card]",
        "columns": 3,
        "mediaPosition": "background|left|right|top|none",
        "textAlignment": "left|center|right",
        "hasDecorativeElements": true,
        "confidence": "high|medium|low"
      }
    ],
    "animationsDetected": [
      {
        "name": "nom descriptif",
        "type": "fade-up|fade-in|slide-left|slide-right|scale|stagger|parallax|rotate|bounce",
        "properties": {
          "opacity": "0→1", "translateY": "Xpx→0",
          "translateX": "Xpx→0", "scale": "0.8→1"
        },
        "duration": "ms",
        "easing": "ease|ease-out|ease-in-out|cubic-bezier(...)",
        "trigger": "scroll|load|hover|click",
        "threshold": "0.1",
        "staggerDelay": "ms ou null",
        "delay": "ms",
        "matchesPreset": "nom du preset dans animationPresets.ts ou null",
        "usedIn": ["sections concernées"],
        "confidence": "high|medium|low"
      }
    ],
    "illustrationsDetected": [
      {
        "type": "blob|gradient|pattern|decorative|wave|noise|glow|overlay",
        "description": "description visuelle précise",
        "position": "background|corner|behind-section|full-width",
        "suggestedId": "ID dans illustrations.ts ou null (ex: ill-blob-warm, ill-pattern-dots, ill-deco-noise-texture)",
        "opacity": 0.1,
        "blendMode": "normal|overlay|multiply|screen",
        "usedIn": ["sections concernées"],
        "confidence": "high|medium|low"
      }
    ]
  }
}

5. PAGES ET SECTIONS — FORMAT PageTemplate DIRECT
{
  "id": "site-slug",
  "name": "Nom du site",
  "description": "Description courte",
  "category": "saas|agency|ecommerce|portfolio|restaurant|immobilier|coach|photographe|startup|mode",
  "universe": "startup|corporate|luxe|creative|ecommerce|glass",
  "emoji": "🏠",
  "preview": "linear-gradient(135deg, #hex 0%, #hex 100%)",
  "brand": {
    "colors": { "primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex", "foreground": "#hex", "muted": "#hex" },
    "typography": { "heading": "DM Sans", "body": "Inter", "size": "compact|default|large" },
    "borderRadius": "none|sm|md|lg|full",
    "spacing": "compact|default|relaxed"
  },
  "navigation": {
    "links": [{ "label": "About", "href": "/about" }],
    "cta": { "label": "Contact", "href": "/contact" },
    "style": "transparent|solid|blur"
  },
  "footer": {
    "columns": [{ "title": "Company", "links": [{ "label": "About", "href": "/about" }] }],
    "copyright": "© 2026 Nom. Tous droits réservés.",
    "showSocials": true,
    "socials": { "instagram": "url", "twitter": "url", "linkedin": "url", "facebook": "url", "github": "url" }
  },
  "meta": {
    "title": "Titre du site",
    "description": "Meta description",
    "lang": "fr|en|es|de",
    "favicon": "url ou null",
    "ogImage": "url ou null"
  },
  "sections": [
    {
      "id": "section-unique-id",
      "type": "site-header",
      "variant": "luxe-transparent",
      "content": { },
      "style": {
        "background": "white|light|dark|primary|gradient|custom|custom-gradient",
        "paddingY": "none|sm|md|lg|xl",
        "textTransform": "uppercase|none|lowercase|capitalize",
        "letterSpacing": "tight|normal|wide|wider",
        "textAlign": "left|center|right|justify",
        "textColor": "#hex",
        "accentColor": "#hex",
        "fontFamily": "nom de font ou null",
        "fontWeight": 700,
        "customBgColor": "#hex",
        "customGradient": { "from": "#hex", "to": "#hex", "direction": "to-b|to-r|to-br|to-bl|to-tr|to-tl|to-t|to-l" },
        "backgroundImage": { "url": "", "overlayColor": "#000000", "overlayOpacity": 0.6, "size": "cover|contain|auto", "position": "center|top|bottom|left|right" },
        "videoBackground": { "url": "", "poster": "", "loop": true, "muted": true },
        "borderRadius": "none|sm|md|lg|xl|full",
        "boxShadow": "none|sm|md|lg|xl",
        "opacity": 1.0,
        "dividerTop": { "shape": "none|wave|angle|curve|triangle", "color": "#hex" },
        "dividerBottom": { "shape": "none|wave|angle|curve|triangle", "color": "#hex" },
        "titleSize": "sm|md|lg|xl",
        "fullWidth": false
      },
      "visible": true
    }
  ],
  "pages": [
    {
      "id": "page-about",
      "slug": "/about",
      "title": "About",
      "seo": { "title": "About - Nom du site", "description": "Meta description de la page" },
      "sections": []
    }
  ]
}
⚠️ RÈGLES CRITIQUES :
* Chaque section DOIT avoir un id unique (format : "section-{type}-{index}", ex: "section-hero-0", "section-features-1", "section-cta-2")
  Si plusieurs sections du même type → incrémenter l'index (section-image-text-3, section-image-text-4)
* Le content DOIT respecter les champs listés dans la référence ci-dessus pour le type donné
* Le variant DOIT suivre le pattern {universe}-{layout} valide pour ce type
* Les pages supplémentaires (about, services, etc.) vont dans "pages", pas dans "sections"
* Le champ "navigation" et "footer" sont au même niveau que "sections" — ils définissent la nav et le pied de page GLOBAUX du site
* "meta" contient les informations SEO globales du site
IMPORTANT : Chaque style de section DOIT inclure :
* textTransform si le texte est en uppercase (sinon rendu méconnaissable)
* letterSpacing si les textes uppercase ont un espacement augmenté
* backgroundImage si la section a une image de fond
* customBgColor si le fond n'est pas blanc/light/dark standard
* accentColor si des éléments ont une couleur d'accent spécifique

6. COMPOSANTS UI RÉCURRENTS
{
  "components": {
    "buttons": {
      "primary":   { "bg": "#hex", "text": "#hex", "border": "none", "borderRadius": "px", "paddingX": "px", "paddingY": "px", "fontSize": "px", "fontWeight": 600, "textTransform": "uppercase|none", "letterSpacing": "em", "hoverBg": "#hex", "hoverTransform": "translateY(-2px)|scale(1.02)|none", "shadow": "valeur", "confidence": "" },
      "secondary": { "bg": "transparent", "text": "#hex", "border": "1px solid #hex", "borderRadius": "px", "textTransform": "", "confidence": "" },
      "dark":      { "bg": "#hex sombre", "text": "#hex clair", "border": "none", "confidence": "" },
      "ghost":     { "bg": "transparent", "border": "none", "confidence": "" }
    },
    "cards":    { "borderRadius": "px", "shadow": "valeur", "border": "1px solid #hex|none", "padding": "px", "hoverEffect": "shadow|lift|border|none", "confidence": "" },
    "inputs":   { "borderRadius": "px", "border": "1px solid #hex", "bg": "#hex", "focusBorder": "#hex", "height": "px", "textTransform": "", "letterSpacing": "em", "confidence": "" },
    "navbar":   { "type": "fixed|sticky|static|transparent", "height": "px", "bg": "#hex", "scrollBehavior": "description", "mobileMenu": "hamburger|drawer|fullscreen", "linkTextTransform": "uppercase|capitalize|none", "confidence": "" },
    "badges":   { "borderRadius": "px", "paddingX": "px", "paddingY": "px", "fontSize": "px", "textTransform": "", "confidence": "" },
    "stats":    { "numberSize": "px", "numberWeight": 700, "numberColor": "#hex", "suffixColor": "#hex", "labelTextTransform": "", "labelLetterSpacing": "em", "confidence": "" },
    "testimonialCards": { "hasAvatar": true, "hasStarRating": true, "starCount": 5, "starColor": "#hex", "quoteStyle": "guillemets|italic|none", "authorSeparator": "—|,|line-break", "confidence": "" }
  }
}

7. BACKGROUND MAP
{
  "backgroundMap": {
    "/": [
      { "section": "navbar",        "bg": "transparent",                      "textColor": "light" },
      { "section": "hero",          "bg": "image + overlay rgba(0,0,0,0.5)",  "textColor": "light" },
      { "section": "about",         "bg": "#F8F5EF",                          "textColor": "dark"  },
      { "section": "newsletter",    "bg": "#121212",                          "textColor": "light" },
      { "section": "site-footer",   "bg": "#121212",                          "textColor": "light" }
    ]
  }
}

8. INTÉGRATIONS DÉTECTÉES
{
  "integrations": {
    "crm": { "enabled": true },
    "analytics": {
      "provider": "plausible|gtag|posthog|umami|null",
      "id": "identifiant détecté ou null"
    },
    "gtm": { "containerId": "GTM-XXXX ou null" },
    "metaPixel": { "pixelId": "pixel ID ou null" },
    "hotjar": { "siteId": "site ID ou null" },
    "mailchimp": { "detected": true },
    "hubspot": { "detected": true },
    "zapier": { "detected": true },
    "customIntegrations": [
      { "name": "nom du service", "type": "script|webhook|api", "detected": "comment détecté (balise script, iframe, etc.)" }
    ]
  }
}
⚠️ Détecter via : balises <script>, iframes, data-attributes, cookies, variables globales (window.ga, window.fbq, etc.)

9. MODULES CRM
{
  "portalModules": {
    "moduleCRM": true, "moduleDevis": false, "moduleFactures": false,
    "moduleContrats": false, "moduleProjets": false, "moduleCMS": false, "moduleCalendrier": false
  },
  "reasoning": "Justification des modules selon le business"
}
Heuristiques de détection des modules CRM pertinents :
* Le site a un formulaire de contact → moduleCRM: true (pour gérer les contacts/leads)
* Le site propose des services avec prix → moduleDevis: true (pour créer des devis)
* Le site vend des produits/services → moduleFactures: true
* Le site mentionne des contrats/CGV → moduleContrats: true
* Le site a des projets/portfolio → moduleProjets: true (si le client gère ses propres projets)
* Le site a un blog/actualités → moduleCMS: true (pour que le client publie du contenu)
* Le site propose des RDV/consultations → moduleCalendrier: true
* Restaurant/Hôtel → CRM + Calendrier (réservations)
* Freelance/Agence → CRM + Devis + Factures + Projets
* E-commerce → CRM + Factures
* Coach/Consultant → CRM + Calendrier + Devis
* Photographe → CRM + Devis + Factures + Projets

9. FONTS
{
  "fontImports": [
    { "provider": "google|adobe|local|variable", "name": "Nom exact", "weights": [300,400,500,600,700], "importUrl": "https://fonts.googleapis.com/css2?family=...", "confidence": "", "source": "link-tag|font-face|webfont-load" }
  ]
}
Font detection — Priorité des sources :
1. <link href="https://fonts.googleapis.com/css2?family=..." → provider: "google"
2. @import url('https://fonts.googleapis.com/...') → provider: "google"
3. @font-face { font-family: "..." } → provider: "local"
4. use.typekit.net ou fonts.adobe.com → provider: "adobe"
5. Variable font (font-variation-settings) → provider: "variable"

Mapping font vers Brand.typography :
* La font des h1/h2/h3 → brand.typography.heading
* La font du body/p → brand.typography.body
* Si heading = body (même font partout) → renseigner les deux avec le même nom
* Weights à capturer : UNIQUEMENT ceux réellement chargés (pas tous de 100 à 900)

Fonts courantes et leur catégorie (pour le matching typo preset) :
  Serif : Playfair Display, Cormorant Garamond, Lora, Merriweather, DM Serif Display, Libre Baskerville, Fraunces
  Sans-serif moderne : Inter, DM Sans, Plus Jakarta Sans, Outfit, Manrope, Sora, Cabinet Grotesk
  Sans-serif classique : Open Sans, Roboto, Lato, Work Sans, Karla, Rubik
  Creative : Clash Display, Anton, Bebas Neue, Righteous, Space Grotesk
  Monospace : Space Mono, JetBrains Mono, Fira Code, Roboto Mono, Source Code Pro, IBM Plex Mono

80+ Google Fonts intégrées au configurateur (par catégorie) :
  Sans-serif (29) : Inter · DM Sans · Poppins · Outfit · Plus Jakarta Sans · Sora · Nunito · Raleway · Lato · Montserrat · Open Sans · Roboto · Work Sans · Manrope · Urbanist · Figtree · Albert Sans · Source Sans 3 · Rubik · Karla · Josefin Sans · Mulish · Cabin · Barlow · Lexend · Space Grotesk · Geist · IBM Plex Sans · Archivo · Red Hat Display
  Serif (15) : Playfair Display · Merriweather · Libre Baskerville · Lora · EB Garamond · Cormorant Garamond · Crimson Text · Bitter · PT Serif · Source Serif 4 · Noto Serif · DM Serif Display · Fraunces · Instrument Serif · Spectral
  Display (13) : Bebas Neue · Anton · Righteous · Abril Fatface · Bowlby One SC · Bungee · Press Start 2P · Monoton · Passion One · Oswald · Archivo Black · Titan One · Teko
  Handwriting (11) : Dancing Script · Pacifico · Great Vibes · Caveat · Satisfy · Kalam · Sacramento · Indie Flower · Shadows Into Light · Patrick Hand · Permanent Marker
  Monospace (8) : JetBrains Mono · Fira Code · Source Code Pro · IBM Plex Mono · Roboto Mono · Space Mono · Inconsolata · Ubuntu Mono

⚠️ Si la font détectée est dans cette liste → confidence: "high" (le configurateur la supporte nativement)
⚠️ Si la font n'est PAS dans cette liste → documenter comme custom font (upload nécessaire)

10. MÉTA-INFORMATIONS (pour référence)
{
  "designPreset": {
    "closestPalette":      "ID exact parmi les 28 palettes (ex: luxe-champagne, dark-pro, corp-navy)",
    "closestTypography":   "ID exact parmi les 24 typos (ex: typo-playfair-lato, typo-dm-inter)",
    "closestTagStyle":     "ID exact parmi les 11 tag styles (ex: ts-luxe-serif, ts-saas-modern)",
    "closestTheme":        "ID exact parmi les 18 thèmes complets (ex: theme-luxe-gold) ou null",
    "styleFamily":         "saas|luxe|glassmorphism|brutalist|corporate|minimal",
    "confidence":          "high|medium|low"
  },
  "detectedCSS": {
    "textTransform":  { "headings": "uppercase|none", "buttons": "uppercase|none", "labels": "uppercase|none" },
    "letterSpacing":  { "headings": "valeur CSS", "buttons": "valeur CSS" },
    "fontWeight":     { "headings": "700-900", "body": "400" },
    "lineHeight":     { "headings": "1.1-1.2", "body": "1.6-1.7" }
  },
  "reproductionNotes": "Notes sur les éléments complexes ou impossibles à reproduire automatiquement",
  "seo": {
    "title": "Titre <title> exact",
    "metaDescription": "Meta description exacte",
    "ogTitle": "og:title ou null",
    "ogDescription": "og:description ou null",
    "ogImage": "og:image URL ou null",
    "canonicalUrl": "canonical URL ou null",
    "structuredData": "type de schema.org détecté (LocalBusiness, Organization, Product, etc.) ou null",
    "robots": "index,follow ou noindex ou null",
    "hreflang": ["fr-FR", "en-US"],
    "multiLanguage": "le site a-t-il plusieurs versions linguistiques ?",
    "languageSwitcher": "y a-t-il un sélecteur de langue dans la navbar ?",
    "sitemap": "URL sitemap ou null"
  },
  "accessibility": {
    "altTexts": "toutes les images ont-elles des alt texts ?",
    "ariaLabels": "les éléments interactifs ont-ils des aria-labels ?",
    "colorContrast": "le ratio de contraste texte/fond est-il suffisant (WCAG AA) ?",
    "focusStates": "les éléments focusables ont-ils un outline visible ?",
    "skipNavLink": "y a-t-il un lien 'Skip to content' ?"
  },
  "performance": {
    "lazyLoading": "les images utilisent-elles loading='lazy' ?",
    "imageFormats": "webp|avif|jpg|png (quels formats sont utilisés ?)",
    "fontsPreloaded": "les fonts sont-elles preloaded (link rel=preload) ?",
    "criticalCss": "y a-t-il du CSS inline critique dans le head ?"
  },
  "redirects": [
    { "from": "/ancienne-page", "to": "/nouvelle-page", "type": "301|302" }
  ]
}

FORMAT DE SORTIE FINAL
Le JSON final DOIT contenir TOUTES ces clés dans cet ordre exact :
{
  "site": {
    "name": "...", "slug": "...", "industry": "...", "audience": "...", "primaryGoal": "..."
  },
  "meta": {
    "title": "...", "description": "...", "lang": "fr|en", "favicon": "url|null", "ogImage": "url|null"
  },
  "brand": {
    "colors": { "primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex", "foreground": "#hex", "muted": "#hex" },
    "typography": { "heading": "Font", "body": "Font", "size": "compact|default|large" },
    "borderRadius": "none|sm|md|lg|full",
    "spacing": "compact|default|relaxed"
  },
  "style": {
    "mood": ["luxury", "minimal"], "palette": "...", "density": "...", "typography": "..."
  },
  "navigation": {
    "links": [{ "label": "...", "href": "..." }],
    "cta": { "label": "...", "href": "..." },
    "style": "transparent|solid|blur"
  },
  "footer": {
    "columns": [{ "title": "...", "links": [{ "label": "...", "href": "..." }] }],
    "copyright": "...",
    "showSocials": true,
    "socials": { "instagram": "url", "twitter": "url" }
  },
  "library": {
    "iconsDetected": [ ... ],
    "elementsDetected": [ ... ],
    "componentsDetected": [ ... ],
    "wireframesDetected": [ ... ],
    "animationsDetected": [ ... ],
    "illustrationsDetected": [ ... ]
  },
  "sections": [
    {
      "id": "section-hero-0",
      "type": "hero",
      "variant": "luxe",
      "content": { "title": "...", "subtitle": "..." },
      "style": { "background": "dark", "paddingY": "xl", "textTransform": "uppercase" },
      "visible": true
    }
  ],
  "pages": [
    {
      "id": "page-about",
      "slug": "/about",
      "title": "About",
      "seo": { "title": "...", "description": "..." },
      "sections": [ ... ]
    }
  ],
  "components": {
    "buttons": { ... }, "cards": { ... }, "inputs": { ... },
    "navbar": { ... }, "badges": { ... }, "stats": { ... }, "testimonialCards": { ... }
  },
  "backgroundMap": { "/": [ ... ] },
  "visualEffects": {
    "scrollEffects": [ ... ], "hoverEffects": [ ... ],
    "textAnimations": [ ... ], "globalEffects": { ... }
  },
  "integrations": {
    "crm": { "enabled": true },
    "analytics": { "provider": "...", "id": "..." },
    "gtm": { "containerId": "..." },
    "metaPixel": { "pixelId": "..." },
    "customIntegrations": [...]
  },
  "portalModules": { ... },
  "fontImports": [ ... ],
  "designPreset": {
    "closestPalette": "...", "closestTypography": "...", "closestTagStyle": "...",
    "closestTheme": "...", "styleFamily": "...", "confidence": "..."
  },
  "detectedCSS": { ... },
  "reproductionNotes": "..."
}

---

## PARTIE 5 — VALIDATION & RÈGLES
Avant de soumettre le JSON final, vérifie CHAQUE point :
1. Chaque section.type est dans la liste des 37 types valides
2. Chaque section.variant suit le pattern {universe}-{layout} valide pour ce type
3. Chaque section.content ne contient QUE les champs listés dans la référence pour ce type
4. Chaque ButtonConfig a un champ variant (primary|secondary|outline|ghost)
5. Chaque section.style.background est parmi : white|light|dark|primary|gradient|custom|custom-gradient
6. Si background === 'custom' → customBgColor DOIT être renseigné
7. Si background === 'custom-gradient' → customGradient DOIT être renseigné
8. Si backgroundImage est utilisé → url est obligatoire
9. Les couleurs sont TOUJOURS en format #RRGGBB (6 chars, pas 3)
10. Les items de listes (features, testimonials, etc.) ont TOUS un id unique
11. brand.typography.size est 'compact'|'default'|'large' (pas 'sm'|'md'|'lg')
12. brand.spacing est 'compact'|'default'|'relaxed' (pas 'sm'|'md'|'lg')
13. brand.borderRadius est 'none'|'sm'|'md'|'lg'|'full' (valeurs Brand, pas SectionStyle)
14. Les champs optionnels absents sont OMIS (pas mis à null ou "")
15. Chaque page dans "pages" a un id, slug, title, seo, et sections
16. Chaque item dans une liste (features.items, testimonials.items, etc.) a un id unique
17. hero.content.image est un OBJET { src, alt }, pas une string
18. gallery-grid.content.images[].src est une string URL
19. pricing.plans[].features est un tableau de { text, included } pas de strings
20. slider.content.slides[].image est une string URL, pas un objet
21. footer.columns[].links[].href commence par "/" ou "http"
22. Le champ visible est TOUJOURS true dans les sections (sauf si la section est cachée)
23. Pas de commentaires JavaScript (//) dans le JSON
24. Pas de trailing commas dans les tableaux ou objets

PIÈGES COURANTS À ÉVITER
* "blog" n'existe pas → utiliser "blog-grid"
* "gallery" n'existe pas → utiliser "gallery-grid"
* "comparison" n'existe pas → utiliser "comparison-table"
* Le variant "default" n'existe pas → utiliser "{universe}-{layout}" (ex: "luxe-grid")
* "navbar" n'existe pas → utiliser "site-header" ou "navbar-advanced"
* "footer" n'existe pas → utiliser "site-footer"
* Les sections e-commerce (product-detail, cart, checkout) nécessitent des variants typées
* Le champ "icon" dans features.items attend un nom d'icône Lucide (ex: "star", "shield", "zap") — PAS un emoji
* Le champ "rating" dans testimonials.items est un number (1-5), PAS une string
* Le champ "highlighted" dans pricing.plans est un boolean, PAS une string
* slider.content.interval est en millisecondes (ex: 5000 pour 5s)
* Ne pas confondre "site-header" (section dans sections[]) et "navigation" (objet global)
  → "navigation" = données de navigation globales (liens, style, CTA)
  → "site-header" = la section qui REND la navbar visuellement (avec son propre content et style)
  → Les DEUX doivent être renseignés
* Les champs "logo" dans site-header.content et site-footer.content attendent une URL d'image ou un texte
* Le champ "eyebrow" est un PETIT texte au-dessus du titre (badge, label) — PAS un titre ni un sous-titre
* Si un texte est en ALL CAPS dans le HTML source mais le CSS a text-transform:none → c'est un texte écrit en MAJUSCULES (copier tel quel). Si le CSS a text-transform:uppercase → c'est le CSS qui transforme (textTransform: "uppercase" dans style)

EXEMPLES CORRECTS vs INCORRECTS :
❌ INCORRECT :
  { "type": "blog", "variant": "default", "content": { "icon": "📝" } }
✅ CORRECT :
  { "type": "blog-grid", "variant": "luxe-grid", "content": { "title": "..." } }

❌ INCORRECT :
  { "type": "hero", "content": { "primaryButton": { "label": "Contact", "href": "/contact" } } }
✅ CORRECT :
  { "type": "hero", "variant": "luxe", "content": { "primaryButton": { "label": "Contact", "href": "/contact", "variant": "primary" } } }

❌ INCORRECT :
  { "style": { "background": "custom" } }  // manque customBgColor
✅ CORRECT :
  { "style": { "background": "custom", "customBgColor": "#F8F5EF" } }

❌ INCORRECT :
  { "brand": { "typography": { "size": "md" }, "spacing": "md" } }
✅ CORRECT :
  { "brand": { "typography": { "size": "default" }, "spacing": "default" } }

❌ INCORRECT :
  { "type": "features", "content": { "items": [{ "icon": "🔥" }] } }  // emoji au lieu d'icône Lucide
✅ CORRECT :
  { "type": "features", "content": { "items": [{ "id": "feat-1", "icon": "zap", "title": "...", "description": "..." }] } }

❌ INCORRECT :
  { "type": "hero", "content": { "backgroundImage": "url.jpg" } }  // string au lieu d'objet
✅ CORRECT :
  { "type": "hero", "content": { "backgroundImage": "url.jpg" }, "style": { "backgroundImage": { "url": "url.jpg", "overlayColor": "#000000", "overlayOpacity": 0.5, "size": "cover" } } }

❌ INCORRECT :
  { "type": "gallery-grid", "content": { "images": [{ "src": "url" }] } }  // manque id et alt
✅ CORRECT :
  { "type": "gallery-grid", "content": { "images": [{ "id": "img-1", "src": "url", "alt": "description" }] } }

❌ INCORRECT :
  { "type": "testimonials", "content": { "items": [{ "rating": "5" }] } }  // string au lieu de number
✅ CORRECT :
  { "type": "testimonials", "content": { "items": [{ "id": "t-1", "quote": "...", "author": "...", "role": "...", "rating": 5 }] } }

### RÈGLES ABSOLUES D'EXTRACTION
**Fondamentales**
* N'invente JAMAIS une valeur — si non vérifiable : null + confidence: "low"
* Les screenshots sont LA source de vérité visuelle — ils priment sur le code
* Le vocabulaire contrôlé DOIT être respecté
* Couleurs toujours en HEX (#RRGGBB). JSON propre, valide, sans commentaires.

Niveaux de confidence — quand utiliser quoi :
* "high" → Vérifié dans le code source ET confirmé visuellement par screenshot
  Exemples : couleur extraite d'une variable CSS :root, font chargée via <link>, texte copié verbatim
* "medium" → Vérifié par UNE source uniquement (code OU screenshot, pas les deux)
  Exemples : couleur vue dans le screenshot mais pas trouvée dans le CSS, font estimée visuellement
* "low" → Estimation basée sur l'apparence visuelle sans confirmation dans le code
  Exemples : easing d'une animation, opacité d'un overlay, vitesse de parallax
* null/omis → Impossible à déterminer, même approximativement → mettre null dans le champ

Sources de données par priorité :
1. Variables CSS (:root) → confidence: "high", source: "CSS variable"
2. Computed styles (DevTools) → confidence: "high", source: "computed"
3. Code source CSS/JS → confidence: "high", source: "source"
4. Screenshot (mesure visuelle) → confidence: "medium", source: "screenshot"
5. Estimation par comparaison → confidence: "low", source: "estimated"
CSS
* Inspecte les computed styles réels — pas seulement le CSS source
* Vérifie les variables CSS dans :root et leur valeur calculée finale
* Fonts : vérifier UNIQUEMENT via le code source (balises <link>, @font-face, WebFont.load())
Contenu — INTERDICTIONS STRICTES
* ZÉRO CONTENU INVENTÉ : lorem ipsum → copier tel quel. Titre absent → null.
* ZÉRO TITRE/EXCERPT/SOUS-TITRE INVENTÉ : copier UNIQUEMENT ce qui est affiché
* Préserver la casse EXACTE du site source, fautes de frappe incluses
* Prix avec devise exacte : "$37 USD" pas "$37"
Structure
* Compter les items EXACTEMENT par page (chaque page est indépendante)
* Ne pas fusionner des sections distinctes / ne pas séparer ce qui est 1 section
* Body texts COMPLETS, jamais tronqués
* Capturer TOUS les numéros de téléphone et adresses
* Horaires d'ouverture : capturer le format exact ("Lun-Ven: 9h-18h" pas "9:00 AM - 6:00 PM")
* Adresses : capturer COMPLÈTES (rue, ville, code postal, pays)
* Emails : format exact tel qu'affiché sur le site
Images & Médias
* Pour chaque image significative : noter la position (hero, card, gallery, background)
* Images de fond : URL complète + overlay color + opacity
* Logo : URL exacte (préférer SVG si disponible)
* Avatars : noter si réels (photos) ou génériques (initiales, icônes)
* Images décoratives vs contenus : ne pas confondre une image de fond avec une image de contenu
* Vidéos : provider (youtube/vimeo/html5), URL embed exacte, autoplay/loop/controls
* Si une image n'est pas trouvable → src: "" (string vide), pas une URL inventée
Visuels — PATTERNS RÉCURRENTS (souvent manqués)
* text-transform: uppercase = pattern le plus impactant. TOUJOURS vérifier.
* Boutons : TOUJOURS distinguer visuellement filled vs outline vs ghost vs dark
* Icônes décoratives ≠ eyebrows :
  - Eyebrow = TEXTE court au-dessus du titre (ex: "NOS SERVICES", "À PROPOS")
    → eyebrow: "NOS SERVICES" dans le content
  - Icône SVG seule sans texte au-dessus du titre → eyebrow: null
    → Documenter l'icône dans library.iconsDetected ET decorativeElements
  - Badge coloré avec texte → eyebrow: "texte" (c'est un eyebrow stylisé)
  - NE JAMAIS mettre un nom d'icône dans eyebrow (ex: eyebrow: "star" est FAUX)
* Backgrounds alternés : documenter la séquence EXACTE, pas tout en blanc
* Letter-spacing sur uppercase : quasi toujours 0.05em-0.2em — ne pas oublier
  Mapping CSS → SectionLetterSpacing :
    letter-spacing: -0.02em à -0.05em → 'tight'
    letter-spacing: normal ou 0 → 'normal'
    letter-spacing: 0.03em à 0.08em → 'wide'
    letter-spacing: 0.1em à 0.3em → 'wider'
  ⚠️ Texte uppercase SANS letter-spacing augmenté → letterSpacing: 'normal' (le défaut)
  ⚠️ Texte uppercase AVEC letter-spacing augmenté → letterSpacing: 'wide' ou 'wider'
* Stats avec couleur d'accent sur le suffixe (%, +, k) : détail qui change tout
* Sections avec background image + overlay : noter l'image ET l'opacité overlay
* Mosaic/Bento : images tailles différentes = "mosaic-bento", pas "grid-uniform"
* FAQ collapsible : questions qui se déplient = type "faq" (ou "accordion" si plus générique)
  FAQ avec icône chevron/plus-minus → accordion avec iconStyle détecté
* Carousel/Slider : capturer uniquement les items UNIQUES (pas les répétitions)
  Slider avec fade → effect: "fade", avec zoom → effect: "scale"
  Slider avec autoplay → autoplay: true + interval en ms
  Slider avec navigation par points → showDots: true
  Slider avec flèches → showArrows: true
  Slider avec compteur "3/12" → showCounter: true
* Testimonials : détecter la mise en page (carousel, grid, stack, single-feature)
  Étoiles de notation → rating: 1-5 (number, pas string)
  Avatar circulaire → noter dans componentsDetected
  Guillemets décoratifs → quoteStyle: "guillemets"
* Gallery : détecter le layout (grid uniforme, masonry/bento, carousel)
  Lightbox au clic → utiliser "lightbox" au lieu de "gallery-grid"
  Filtres par catégorie → noter category dans chaque image
    Si filtres par sous-catégorie → noter subcategory dans chaque image
    Les catégories sont des LABELS exacts des filtres (copier tel quel)
  Nombre de colonnes exactes → columns: 2|3|4
  Images avec badge overlay (ex: "Nouveau", catégorie) → badge dans chaque image
  Images avec seconde image au hover → hoverSrc dans chaque image
* Pricing : détecter le plan mis en avant (highlighted: true)
  Badge "Populaire"/"Recommandé" → badge: "label exact"
  Toggle mensuel/annuel → noter les deux prix
  Checkmarks/X pour les features → { text, included: true|false }
* Stats : détecter si les chiffres ont un suffixe coloré (%, +, k, M)
  Le suffixe a-t-il une couleur différente ? → accentColor dans style
  Animation de comptage visible → counter dans animationsDetected
  Format du chiffre : capturer EXACTEMENT (ex: "10K+", "99%", "$2.5M", "15+", "24/7")
  Le champ value est une STRING : "10K+" pas un number
  Le champ label est le texte sous le chiffre : "Clients satisfaits", "Projets livrés"
* Image-text : détecter la position de l'image (left vs right)
  Alternance gauche-droite entre sections image-text → documenter le pattern :
    Section 1 : imagePosition: "right" (image à droite, texte à gauche)
    Section 2 : imagePosition: "left" (image à gauche, texte à droite)
    Chaque section image-text est une section SÉPARÉE avec son propre style
  Si toutes les images sont du même côté → ce n'est PAS une alternance, c'est un choix de design
* Copyright COMPLET : copier exactement, incluant "Designed by...", "Powered by..."
* Réseaux sociaux : détecter TOUS les liens sociaux (instagram, twitter/X, linkedin, facebook, github, youtube, tiktok, pinterest)
* Logo du site : capturer l'URL du logo (SVG ou image) ET le texte alt
* Favicon : capturer l'URL dans <link rel="icon"> ou <link rel="shortcut icon">
* Open Graph : capturer og:image, og:title, og:description
* Langue du site : détecter via <html lang="...">, contenu textuel, meta content-language

Tag Styles globaux — le configurateur supporte des styles globaux par balise HTML :
  body, h1, h2, h3, h4, h5, h6, p, a, button, img
  Ces styles s'appliquent AVANT les styles de section et d'élément (cascade).
  Si le site source a des styles globaux cohérents (ex: tous les h2 = 36px, tous les liens = underline)
  → les documenter dans detectedCSS et dans les tag styles du JSON.

Pseudo-états CSS — le configurateur supporte 8 pseudo-états :
  :hover · :active · :focus · :focus-visible · :visited · ::before · ::after · ::placeholder
  Pour chaque élément interactif, documenter les styles de CHAQUE pseudo-état détecté.

Composants réutilisables (système master/instance) :
  Si un pattern visuel se RÉPÈTE identiquement sur le site (même card, même bouton, même bloc)
  → le signaler comme composant candidat dans reproductionNotes
  Le configurateur peut créer un composant master et l'instancier avec des props overrides.

Détection d'industrie → mapping vers site.industry
Indices pour identifier le secteur :
* Restaurant/hôtel → menus, réservations, horaires, photos plats, Google Maps
* Immobilier → listings propriétés, prix en €/m², photos intérieur/extérieur, carte
* Mode/luxe → collections, lookbook, shooting photos, "nouvelle collection"
* Photo/vidéo → portfolios, galeries plein écran, clients, making-of
* Tech/SaaS → screenshots d'app, pricing tiers, "free trial", integrations, API
* Coach/consultant → "réservez une séance", témoignages clients, "méthode", certifications
* Agence/freelance → portfolio de projets, "nos clients", services, process
* E-commerce → panier, prix, "ajouter au panier", catégories produits, filtres
* Fitness → programmes, coaching, "transformation", photos avant/après
* Retail → points de vente, catalogue, horaires d'ouverture

Détection d'audience → mapping vers site.audience
* Termes formels + vocabulaire B2B ("ROI", "enterprise", "solution") → B2B
* Prix élevés + visuels premium + peu de CTA agressifs → B2C-premium
* Prix bas + promos + urgence + "offre limitée" → B2C-mass
* "Early stage", "beta", "launch" → startup
* "fait main", "artisanal", "local" → artisan
Formulaires — DÉTECTION PRÉCISE
* Chaque <form> détecté = une section "form" ou un formulaire dans "contact"
* Pour chaque champ : identifier le type (text|email|phone|textarea|select|checkbox|radio|date)
* Largeur du champ : full (100%) ou half (50% — 2 champs côte à côte)
* Labels et placeholders EXACTS
* Champs requis (required attribute, astérisque *)
* Bouton submit : label exact
* Action du formulaire : mailto, API endpoint, service tiers (Formspree, Netlify Forms, etc.)
* Captcha : reCAPTCHA v2/v3, hCaptcha, ou aucun

E-commerce — DÉTECTION SPÉCIFIQUE
* Prix : format exact avec devise (€, $, £) — ex: "49,90 €", "$99.00"
* Prix barré : originalPrice (prix avant promo)
* Badges produit : "Nouveau", "Promo -20%", "Rupture", "Best-seller"
* Variantes produit : taille, couleur, matière → variants[].options
* Trust badges : "Livraison gratuite", "Retour 30j", "Paiement sécurisé"
* Boutons e-commerce : "Ajouter au panier", "Acheter maintenant" → labels exacts

Librairie — MATCHING OBLIGATOIRE
* Chaque icône → tenter matching dans icons.ts (Lucide en priorité)
* Chaque élément de base → documenter dans elementsDetected
* Chaque composant complexe → documenter dans componentsDetected
* Chaque section → documenter son wireframe dans wireframesDetected
* Chaque animation → documenter dans animationsDetected avec easing précis
* Chaque illustration décorative → documenter dans illustrationsDetected

---

## PARTIE 6 — BOUCLE D'AUTO-AMÉLIORATION
Après avoir généré le JSON initial, lance automatiquement cette boucle sans attendre.
Cycle par itération
Étape 1 — Audit obligatoire
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIT ITÉRATION N/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Champs null évitables          : X → [liste exacte]
Valeurs confidence "low"       : X → [liste exacte]
Valeurs confidence "medium"    : X → [liste exacte]
Éléments non capturés          : X → [liste exacte]
Formats incorrects             : X → [liste exacte]
Patterns visuels manquants     : X → [liste exacte]
Icônes non identifiées         : X → [liste exacte]
Éléments librairie non matchés : X → [liste exacte]
Animations non détectées       : X → [liste exacte]
Wireframes non documentés      : X → [liste exacte]
Illustrations non détectées    : X → [liste exacte]
Fonts non dans la librairie    : X → [liste exacte]
Composants réutilisables       : X → [liste des patterns répétés]
CMS collections identifiées   : X → [liste]
Pseudo-états non documentés   : X → [liste]
Validation JSON échouée        : X → [liste des erreurs]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score complétude               : XX% (toutes les sections capturées ? tous les champs remplis ?)
Score précision CSS            : XX% (computed styles vérifiés ? variables CSS listées ?)
Score fidélité visuelle        : XX% (textTransform, backgrounds, letterSpacing, accentColor corrects ?)
Score matching librairie       : XX% (icônes, éléments, composants, wireframes, animations, illustrations matchés ?)
Score fiabilité                : XX% (combien de "high" vs "low" dans les confidence ?)
Score validation JSON          : XX% (les 15 règles de validation passent-elles ?)
Score global                   : XX% (moyenne pondérée : fidélité visuelle 30% + complétude 25% + CSS 20% + librairie 15% + fiabilité 10%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Améliorations apportées au prompt : X
Améliorations apportées au JSON   : X
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Étape 2 — Minimum obligatoire : 5 améliorations concrètes
Si moins de 5 trouvées, creuse obligatoirement :
* Computed styles CSS de chaque section
* Animations frame par frame (keyframes exactes)
* Espacements au pixel près
* Chaque valeur null → tenter de la résoudre avant d'abandonner
* Breakpoints exacts et changements par breakpoint
* Pseudo-états (:hover, :focus, ::before, ::after)
* text-transform et letter-spacing de chaque niveau de titre
* Variantes de boutons et rendu visuel exact
* Backgrounds de section (couleur vs image vs overlay)
* Éléments décoratifs (icônes, illustrations, séparateurs)
* Layouts d'images (mosaic vs grid vs split)
* Icônes non identifiées → tenter matching Lucide/Heroicons
* Éléments de base non capturés → badges, dividers, avatars
* Wireframe patterns non documentés
* Animations non identifiées → observer keyframes et transitions
Étape 3 — Ce qui compte comme une vraie amélioration
✅ Champ null → valeur précise ✅ confidence "low"/"medium" → "high" (source vérifiée) ✅ Nouvel élément du site capturé ✅ Format corrigé pour être directement exploitable dans le configurateur ✅ Règle d'extraction ajoutée au prompt (générique, applicable à tout futur site) ✅ Valeur approximative → valeur mesurée au pixel ✅ Pattern visuel identifié (textTransform, buttonStyle, background alterné) ✅ Background de section corrigé (blanc par défaut → vraie couleur) ✅ Variante de bouton corrigée (primary↔outline) ✅ Icône identifiée et matchée avec la librairie ✅ Élément de base documenté dans elementsDetected ✅ Composant documenté dans componentsDetected ✅ Wireframe documenté dans wireframesDetected ✅ Animation avec durée, easing et trigger précis
❌ Reformuler sans changer le résultat ❌ Ajouter un champ qui sera toujours null ❌ Micro-changements cosmétiques ❌ Répéter la même valeur différemment formulée
Étape 4 — Améliore ce fichier SCAN_SITE_PROMPT.md
Principe : chaque erreur corrigée = nouvelle règle générique ajoutée au prompt. Les règles doivent être applicables à TOUT futur site, pas seulement au site en cours.
Types de règles à ajouter :
* Heuristique de détection manquante (ex: "si le footer a des icônes sociales, les documenter dans socials")
* Piège courant évité (ex: "ne pas confondre blog-grid et blog")
* Mapping visuel → JSON manquant (ex: "fond crème → background: 'custom' + customBgColor")
* Validation de type manquante (ex: "rating est un number, pas une string")
* Pattern récurrent non documenté (ex: "alternance image-text left/right")
IMPORTANT : ne pas ajouter de règles spécifiques au site en cours (couleurs exactes, textes, etc.)
Étape 5 — Relance le scan complet
Rescanne le site avec le prompt amélioré. Compare explicitement JSON précédent vs nouveau JSON.
Condition d'arrêt
* Score global ≥ 95%, OU 10 itérations effectuées
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHECKLIST DE QUALITÉ FINALE (avant de rendre le JSON)
1. [ ] TOUTES les sections visibles sur CHAQUE screenshot sont capturées
2. [ ] L'ORDRE des sections correspond à l'ordre sur le site (haut → bas)
3. [ ] Chaque section a un type valide parmi les 37 types
4. [ ] Chaque variant suit le pattern {universe}-{layout}
5. [ ] Le brand.colors correspond visuellement aux screenshots
6. [ ] Les fonts détectées sont confirmées par le code source
7. [ ] Les backgrounds de CHAQUE section sont corrects (pas tout en "white")
8. [ ] textTransform est renseigné pour CHAQUE section avec du texte uppercase
9. [ ] Le footer.copyright est copié MOT POUR MOT
10. [ ] Les liens de navigation sont COMPLETS (tous les liens, labels exacts)
11. [ ] Les icônes sont des noms Lucide (pas des emojis)
12. [ ] Les items de listes ont TOUS un id unique
13. [ ] Le JSON est valide (pas de trailing commas, pas de commentaires)
14. [ ] Le designPreset utilise des IDs exacts de la librairie

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉCAPITULATIF FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Itérations effectuées                     : X/10
Score global final                        : XX%
Améliorations totales apportées au prompt : X
Éléments encore imprécis                  : [liste]
Icônes non matchées                       : [liste]
Animations non confirmées                 : [liste]
Wireframes non documentés                 : [liste]
Recommandations pour la prochaine version : [liste]
Templates les plus proches                 : [IDs de templates]
Theme le plus proche                       : [ID de thème]
Style family                               : [saas|luxe|glassmorphism|brutalist|corporate|minimal]
Fonts dans la librairie native             : [oui/non + liste]
Collections CMS identifiées               : [liste]
Composants réutilisables détectés          : [liste de patterns]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sauvegarde la version finale améliorée dans SCAN_SITE_PROMPT.md.

---

## STATISTIQUES DU CONFIGURATEUR (RÉFÉRENCE RAPIDE)

| Catégorie | Nombre |
|-----------|--------|
| Types de sections | 37 |
| Variants de sections | 200+ |
| Universes | 8 (startup, corporate, luxe, creative, ecommerce, glass, brixsa, zmr) |
| Palettes de couleurs | 28 |
| Typography presets | 24 |
| Tag style presets | 11 |
| Thèmes complets | 18 |
| Style families | 6 |
| Composants librairie | 61 |
| Éléments librairie | 26 |
| Illustrations librairie | 20 |
| Icônes Lucide | 29 |
| Wireframes | 6 |
| Animations librairie | 60+ |
| Animation presets | 26 |
| Easing presets | 38 |
| Google Fonts intégrées | 80+ |
| Breakpoints responsive | 7 |
| Pseudo-états CSS | 8 |
| Custom element types | 11 |
| Triggers d'animation | 32 |
| Propriétés animables | 23+ |
| Templates de pages | 20+ |
| **Total items librairie** | **500+** |
