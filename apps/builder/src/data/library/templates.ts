// ─────────────────────────────────────────────
// LIBRARY — Template presets (full styled pages by industry)
// ─────────────────────────────────────────────

import type { LibraryTemplateItem, LibrarySectionStyle } from '@/types/library'
import { PAGE_TEMPLATES } from '@/data/templates'
import type { SectionBackground } from '@/types/site'

// Shorthand helpers
const wSm: LibrarySectionStyle = { background: 'white', paddingY: 'sm' }
const wMd: LibrarySectionStyle = { background: 'white', paddingY: 'md' }
const wLg: LibrarySectionStyle = { background: 'white', paddingY: 'lg' }
const wXl: LibrarySectionStyle = { background: 'white', paddingY: 'xl' }
const lMd: LibrarySectionStyle = { background: 'light', paddingY: 'md' }
const lLg: LibrarySectionStyle = { background: 'light', paddingY: 'lg' }
const dSm: LibrarySectionStyle = { background: 'dark', paddingY: 'sm' }
const dMd: LibrarySectionStyle = { background: 'dark', paddingY: 'md' }
const dLg: LibrarySectionStyle = { background: 'dark', paddingY: 'lg' }
const dXl: LibrarySectionStyle = { background: 'dark', paddingY: 'xl' }
const pLg: LibrarySectionStyle = { background: 'primary', paddingY: 'lg' }

// ─── Basic templates (original 10 hand-crafted presets) ───

const BASIC_TEMPLATES: LibraryTemplateItem[] = [
  {
    id: 'basic-tpl-photographe',
    label: 'Photographe',
    category: 'templates',
    subcategory: 'photographe',
    tags: ['photographe', 'photo', 'portfolio', 'creatif', 'basic'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'gallery-grid', variant: 'default', content: {}, style: dLg },
      { type: 'image-text', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'contact', variant: 'default', content: {}, style: dLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-coach',
    label: 'Coach / Consultant',
    category: 'templates',
    subcategory: 'coach',
    tags: ['coach', 'consultant', 'personal', 'branding', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'logos', variant: 'default', content: {}, style: lMd },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'testimonials', variant: 'default', content: {}, style: lLg },
      { type: 'pricing', variant: 'default', content: {}, style: wLg },
      { type: 'faq', variant: 'default', content: {}, style: lLg },
      { type: 'contact', variant: 'default', content: {}, style: wLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-restaurant',
    label: 'Restaurant',
    category: 'templates',
    subcategory: 'restaurant',
    tags: ['restaurant', 'food', 'menu', 'reservations', 'basic'],
    universe: 'luxe',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'image-text', variant: 'default', content: {}, style: dLg },
      { type: 'gallery-grid', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'map', variant: 'default', content: {}, style: dLg },
      { type: 'contact', variant: 'default', content: {}, style: dLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-saas',
    label: 'SaaS Product',
    category: 'templates',
    subcategory: 'saas',
    tags: ['saas', 'software', 'product', 'tech', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'logos', variant: 'default', content: {}, style: lMd },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: wLg },
      { type: 'stats', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'pricing', variant: 'default', content: {}, style: lLg },
      { type: 'comparison-table', variant: 'default', content: {}, style: wLg },
      { type: 'faq', variant: 'default', content: {}, style: lLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-agency',
    label: 'Agence Digitale',
    category: 'templates',
    subcategory: 'agency',
    tags: ['agency', 'agence', 'digital', 'creative', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'gallery-grid', variant: 'default', content: {}, style: lLg },
      { type: 'steps', variant: 'default', content: {}, style: wLg },
      { type: 'team', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-portfolio-creatif',
    label: 'Portfolio Creatif',
    category: 'templates',
    subcategory: 'portfolio',
    tags: ['portfolio', 'creatif', 'designer', 'artist', 'basic'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: lMd },
      { type: 'hero', variant: 'default', content: {}, style: { background: 'light', paddingY: 'xl' } },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-ecommerce-shop',
    label: 'Boutique en Ligne',
    category: 'templates',
    subcategory: 'ecommerce',
    tags: ['ecommerce', 'boutique', 'shop', 'products', 'basic'],
    universe: 'ecommerce',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wLg },
      { type: 'product-grid', variant: 'default', content: {}, style: wLg },
      { type: 'features', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'newsletter', variant: 'default', content: {}, style: lMd },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-startup',
    label: 'Startup Tech',
    category: 'templates',
    subcategory: 'startup',
    tags: ['startup', 'tech', 'innovation', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'logos', variant: 'default', content: {}, style: dMd },
      { type: 'features', variant: 'default', content: {}, style: dLg },
      { type: 'stats', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'pricing', variant: 'default', content: {}, style: dLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-immobilier',
    label: 'Immobilier',
    category: 'templates',
    subcategory: 'immobilier',
    tags: ['immobilier', 'real-estate', 'property', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'search', variant: 'default', content: {}, style: lMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wLg },
      { type: 'features', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-sante',
    label: 'Sante / Bien-etre',
    category: 'templates',
    subcategory: 'sante',
    tags: ['sante', 'health', 'wellness', 'bien-etre', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: { background: 'light', paddingY: 'xl' } },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: lLg },
      { type: 'team', variant: 'default', content: {}, style: wLg },
      { type: 'testimonials', variant: 'default', content: {}, style: lLg },
      { type: 'pricing', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'template-scan-a73b93cd6477',
    label: 'Beard X',
    category: 'templates',
    subcategory: 'custom',
    tags: ['template', 'imported'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'luxe-transparent', content: {"logo":"BEARD X","links":[{"label":"HOME","href":"/home"},{"label":"ABOUT","href":"/about"},{"label":"PAGES","href":"#","hasDropdown":true},{"label":"SERVICES","href":"/services"},{"label":"CONTACT","href":"/contact"}],"ctaLabel":"BOOK AN APPOINTMENT","ctaHref":"/contact","cartLabel":"CART (0)"}, style: {"background":"dark","paddingY":"sm"} },
      { type: 'hero', variant: 'luxe', content: {"title":"A UNIQUE BARBER EXPERIENCE","subtitle":"Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam.","backgroundImage":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352b63fc9635f6969ca8f39_Home-barbershop-x.jpg","decorativeImage":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63868e1dab1fa01aaa25552a_home-hero-top-image-barber-webflow-ecommerce-template.png","primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"secondaryButton":{"label":"BROWSE SERVICES","href":"/home#Services","variant":"secondary"}}, style: {"background":"dark","paddingY":"xl"} },
      { type: 'image-text', variant: 'luxe-image-left', content: {"title":"10+ YEARS MAKING OUR CUSTOMERS HAPPY","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","image":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352caffe6a8ab6bbcae3ce2_Left-Image-Barbershop.jpg","imageAlt":"Image Left Barbershop","imagePosition":"left","primaryButton":{"label":"MORE ABOUT US","href":"/about","variant":"primary"},"stats":[{"id":"stat-1","value":"99%","label":"Customer Satisfaction"},{"id":"stat-2","value":"10Y","label":"Years of Experience"}],"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352d052776938303fc5a663_Floating-item-barbershop.svg","position":"bottom-right","size":280,"opacity":0.45}]}, style: {"background":"custom","customBgColor":"#F8F5EF","paddingY":"xl"} },
      { type: 'features', variant: 'luxe-grid', content: {"title":"BROWSE OUR SERVICES","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","columns":2,"items":[{"id":"svc-1","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaff96ecdf8025493ea_classic-haircut-service-icon-barber-webflow-ecommerce-template.svg","title":"CLASSIC HAIRCUT","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $37 USD"},{"id":"svc-2","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf785a2ef90f1cabf3_beard-trim-service-icon-barber-webflow-ecommerce-template.svg","title":"BEARD TRIM","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $25 USD"},{"id":"svc-3","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eb0fc1ac2a331a28242_kids-haircut-service-icon-barber-webflow-ecommerce-template.svg","title":"KIDS HAIRCUT","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $26 USD"},{"id":"svc-4","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf971e1c6a341257c4_neck-shave-service-icon-barber-webflow-ecommerce-template.svg","title":"NECK SHAVE","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $12 USD"},{"id":"svc-5","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf5ff3e2f137ed3b3a_scalp-moisturizing-service-icon-barber-webflow-ecommerce-template.svg","title":"SCALP MOISTURIZING","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $55 USD"},{"id":"svc-6","icon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf05534bf92c96d0b5_beard-grooming-and-spa-service-icon-barber-webflow-ecommerce-template.svg","title":"BEARD GROOMING & SPA","description":"Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $46 USD"}],"primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"secondaryButton":{"label":"BROWSE ALL SERVICES","href":"/services","variant":"outline"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352dc80844a1728a8e6cdfa_Floating-item-barbershop-services-Left.svg","position":"bottom-left","size":280,"opacity":0.45}]}, style: {"background":"custom","customBgColor":"#F8F5EF","paddingY":"xl"} },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: {"title":"WE OFFER AN UNIQUE EXPERIENCE","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","images":[{"id":"exp-img-1","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f2b6a7b90cfd94ae18b4_Left-Image-Experience-Barbershop.jpg","alt":"Image Left Experience"},{"id":"exp-img-2","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f252e708dc38e92e533c_Center-Top-Image-Experience-Barbershop.jpg","alt":"Image Center Top Experience"},{"id":"exp-img-3","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f268e708dc07112e544a_Center-Bottom-Image-Experience-Barbershop.jpg","alt":"Image Center Bottom Experience"},{"id":"exp-img-4","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f2f605de392c9d02f20b_Right-Image-Experience-Barbershop.jpg","alt":"Image Right Experience"}],"primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/636085c6d110a1e1db0e4823_floating-item-barbershop-experience-webflow-ecommerce-template.svg","position":"top-right","size":280,"opacity":0.45},{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f6f015baa6ebf4f7e84a_Floating-item-Left-barbershop-Experience.svg","position":"bottom-left","size":280,"opacity":0.45}]}, style: {"background":"custom","customBgColor":"#F8F5EF","paddingY":"xl"} },
      { type: 'cta', variant: 'luxe-centered', content: {"title":"TAKE A LOOK AT OUR WORK","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","icon":"play","primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"videoUrl":"https://www.youtube.com/watch?v=sCurGlAOFIw"}, style: {"background":"dark","paddingY":"xl"} },
      { type: 'image-text', variant: 'luxe-image-right', content: {"title":"WHY CHOOSE US","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","image":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635302fb0af27dbf66bd5e74_Image-barbershop-choosing.jpg","imageAlt":"Image Barbershop","imagePosition":"right","features":[{"id":"feat-1","icon":"user","title":"TOP BARBERS","description":"A mollis pretium sagittis iaculis quam lacus nulla nullam pharetra quis fermentum ipsum phasellus sit."},{"id":"feat-2","icon":"armchair","title":"PREMIUM SERVICES","description":"Nulla leo velit feugiat in consequat accumsan est enim mi consectetur dis pulvinar venenatis dapibus."}],"primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352d052776938303fc5a663_Floating-item-barbershop.svg","position":"bottom-right","size":280,"opacity":0.45}]}, style: {"background":"custom","customBgColor":"#F8F5EF","paddingY":"xl"} },
      { type: 'product-grid', variant: 'luxe-grid', content: {"title":"BROWSE OUR PRODUCTS","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","columns":3,"items":[{"id":"prod-1","title":"BEARD & MUSTACHE CARE OIL","description":"Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.","price":"$ 19.00 USD","image":"https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6353172e41400e47f4b2fb08_Glass-dropper-bottle-%26-tube.png"},{"id":"prod-2","title":"BEARD & HAIR SERUM","description":"Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.","price":"$ 49.00 USD","image":"https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317abd7135d5db1e806e2_Cosmetic-packaging-kit-with-kraft-mailer-box.png"},{"id":"prod-3","title":"PREMIUM HAIR CLAY","description":"Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.","price":"$ 29.00 USD","image":"https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317bbcef9162eb3edfdcc_Amber-cosmetic-bottle-packaging.png"}],"primaryButton":{"label":"BROWSE ALL PRODUCTS","href":"/shop","variant":"outline"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635318c7d13ee9d5bb3fec73_Floating-item-Left-barbershop-products.svg","position":"bottom-left","size":280,"opacity":0.45}]}, style: {"background":"white","paddingY":"xl"} },
      { type: 'testimonials', variant: 'luxe-slider', content: {"title":"WHAT OUR CLIENTS SAY","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","items":[{"id":"test-1","quote":"THIS BARBER SHOP IS SIMPLY AWESOME","description":"Et proin ut in dignissim sem non a nullam magna lectus urna et dui quam tellus imperdiet sit purus at fringilla scelerisque diam amet fermentum orci fringilla aliquet nulla lectus erat eu auctor diam potenti turpis interdum eu.","author":"JOHN CARTER","role":"LOS ANGELES, CA.","rating":5,"avatar":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63531ceb14dc4f7751c93706_Testimonials.jpg"},{"id":"test-2","quote":"THE BEST BARBER SHOP I'VE EVER BEEN","description":"Et proin ut in dignissim sem non a nullam magna lectus urna et dui quam tellus imperdiet sit purus at fringilla scelerisque diam amet fermentum orci fringilla aliquet nulla lectus erat eu auctor diam potenti turpis interdum eu.","author":"SAM HOUSTON","role":"LOS ANGELES, CA.","rating":5,"avatar":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353222a4d0d416ddf8e4360_Image-testimonials.jpg"}],"showArrows":true,"primaryButton":{"label":"BOOK AN APPOINTMENT","href":"/contact","variant":"primary"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635322dd2cf250efc75644d1_Floating-item-barbershop-clients.svg","position":"top-right","size":280,"opacity":0.45}]}, style: {"background":"custom","customBgColor":"#F8F5EF","paddingY":"xl"} },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: {"title":"FOLLOW US ON INSTAGRAM","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","images":[{"id":"insta-1","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262d71b74a7c9aec6273_Image-barbershop-men-01.jpg","alt":"Image Barbershop Instagram","category":"Instagram"},{"id":"insta-2","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635326365ee93e1f49821d0e_Handsome-man-cutting-beard-barber-salon.png","alt":"Image Barbershop Instagram","category":"Instagram"},{"id":"insta-3","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353261dd7638b80bb954e95_handsome-man-cutting-beard-barber-salon%202.png","alt":"Image Barbershop Instagram","category":"Instagram"},{"id":"insta-4","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63532603db028e692e7bd202_Handsome-man-cutting-beard-barber-salon%201.jpg","alt":"Image Barbershop Instagram","category":"Instagram"},{"id":"insta-5","src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262573ae728269cab801_Image-barbershop-machine.jpg","alt":"Image Barbershop Instagram","category":"Instagram"}],"primaryButton":{"label":"FOLLOW US","href":"https://www.instagram.com/","variant":"primary"}}, style: {"background":"custom","customBgColor":"#1a1a1a","paddingY":"xl"} },
      { type: 'newsletter', variant: 'luxe-centered', content: {"title":"SUBSCRIBE TO OUR NEWSLETTER","subtitle":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.","decorativeIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","placeholder":"ENTER YOUR EMAIL","buttonLabel":"SUBSCRIBE NOW"}, style: {"background":"custom","paddingY":"lg","customBgColor":"#1a1a1a"} },
      { type: 'site-footer', variant: 'luxe', content: {"logo":"BEARD X","logoIcon":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","tagline":"Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.","columns":[{"title":"MENU","links":[{"label":"HOME","href":"/home"},{"label":"ABOUT","href":"/about"},{"label":"SERVICES","href":"/services"},{"label":"BLOG","href":"/blog"},{"label":"BLOG POST","href":"/blog/how-to-keep-your-razors-sharp-as-brand-new"},{"label":"SHOP","href":"/shop"},{"label":"SHOP SINGLE","href":"/product/premium-matte-pomade"},{"label":"CONTACT","href":"/contact"},{"label":"TEAM MEMBER","href":"/team/john-carter"},{"label":"MORE WEBFLOW TEMPLATES","href":"https://brixtemplates.com/more-webflow-templates"}]},{"title":"UTILITY PAGES","links":[{"label":"START HERE","href":"/template-pages/start-here"},{"label":"STYLEGUIDE","href":"/template-pages/style-guide"},{"label":"PASSWORD PROTECTED","href":"/401"},{"label":"404 NOT FOUND","href":"/404"},{"label":"LICENSES","href":"/template-pages/licenses"},{"label":"CHANGELOG","href":"/template-pages/changelog"}]}],"copyright":"Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow","socials":{"facebook":"https://www.facebook.com/","twitter":"https://twitter.com/","instagram":"https://www.instagram.com/","youtube":"https://www.youtube.com/","pinterest":"https://www.pinterest.com/"},"floatingImages":[{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg","position":"bottom-left","size":220,"opacity":0.15},{"src":"https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/638112706760ce3d37c721c0_services-floating-image-top-right-barber-webflow-ecommerce-template.svg","position":"bottom-right","size":220,"opacity":0.15}]}, style: {"background":"custom","customBgColor":"#121212","paddingY":"lg"} },
    ],
  },
  {
    id: 'template-scan-734058d0adcb',
    label: 'Allbirds',
    category: 'templates',
    subcategory: 'custom',
    tags: ['template', 'imported'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'ecommerce', content: {"logo":{"text":"Allbirds","href":"/"},"links":[{"id":"men","label":"MEN","href":"/collections/mens"},{"id":"women","label":"WOMEN","href":"/collections/womens"},{"id":"sale","label":"SALE","href":"/collections/sale"}],"actions":[{"id":"search","label":"Search","href":"/search","variant":"ghost"},{"id":"cart","label":"Cart","href":"/cart","variant":"ghost"}]}, style: {"background":"white","paddingY":"md"} },
      { type: 'hero', variant: 'ecommerce', content: {"eyebrow":"SPRING SALE","title":"Put Some Spring In Your Step","primaryButton":{"label":"SHOP MEN","href":"/collections/sale-mens","variant":"primary"},"secondaryButton":{"label":"SHOP WOMEN","href":"/collections/sale-womens","variant":"primary"},"backgroundImage":{"src":"https://www.allbirds.com/cdn/shop/files/preview_images/6f67782fdfc84d1eb245848f4dfea189.thumbnail.0000000000.jpg?v=1773336658&width=2148","alt":"","overlayColor":"#000000","overlayOpacity":0.4}}, style: {"background":"dark","paddingY":"xl"} },
      { type: 'features', variant: 'ecommerce-grid', content: {"items":[{"id":"sale","icon":"tag","title":"SALE","description":"Shop Men | Shop Women","image":"https://www.allbirds.com/cdn/shop/files/26Q1_MarchPromo_Site_Homepage_CategoryRow_Desktop-Mobile_2x3_01.jpg?v=1772838087&width=1024"},{"id":"mens","icon":"user","title":"MENS","description":"Shop Men","image":"https://www.allbirds.com/cdn/shop/files/26Q1_MarchPromo_Site_Homepage_CategoryRow_Desktop-Mobile_2x3_02.jpg?v=1772838087&width=1024"},{"id":"womens","icon":"user","title":"WOMENS","description":"Shop Women","image":"https://www.allbirds.com/cdn/shop/files/26Q1_MarchPromo_Site_Homepage_CategoryRow_Desktop-Mobile_2x3_03.jpg?v=1772838087&width=1024"},{"id":"new-arrivals","icon":"sparkles","title":"NEW ARRIVALS","description":"Shop Men | Shop Women","image":"https://www.allbirds.com/cdn/shop/files/26Q1_MarchPromo_Site_Homepage_CategoryRow_Desktop-Mobile_2x3_04.jpg?v=1772838087&width=1024"}],"columns":4}, style: {"background":"white","paddingY":"lg"} },
      { type: 'slider', variant: 'ecommerce-cards', content: {"title":"Varsity Cruiser","autoplay":false,"loop":true,"showDots":true,"showArrows":true,"effect":"slide","interval":5000,"slides":[{"id":"slide1","image":"https://www.allbirds.com/cdn/shop/files/A12523_26Q2_Varsity-Cruiser-Light-Burnt-Olive-Light-Gum-Sole_PDP_LEFT.png?v=1765308146&width=1600","title":"Varsity Cruiser","subtitle":"Light Burnt Olive (Light Gum Sole) - $115","ctaLabel":"Shop Men","ctaHref":"/products/mens-varsity-cruiser"}]}, style: {"background":"custom","paddingY":"xl","customBgColor":"#f5f2ed"} },
      { type: 'product-grid', variant: 'ecommerce-grid', content: {"title":"Men's Sale","subtitle":"Add breathable comfort and versatile style to your spring rotation.","items":[{"id":"tree-dasher","name":"Tree Dasher 2","price":"$75","originalPrice":"$135","image":"https://www.allbirds.com/cdn/shop/files/A10814_24Q2_Tree-Dasher-2-Blizzard-Blizzard-Blizzard_PDP_LEFT__1.png?v=1750974801&width=1024","description":"Blizzard"},{"id":"tree-runner-nz","name":"Tree Runner NZ","price":"$60","originalPrice":"$98","image":"https://www.allbirds.com/cdn/shop/files/A12264_26Q1_Tree-Runner-NZ-Ochre-Natural-White_PDP_LEFT.png?v=1765242868&width=1024","description":"Ochre"},{"id":"canvas-piper","name":"Canvas Piper","price":"$65","originalPrice":"$110","image":"https://www.allbirds.com/cdn/shop/files/A11505_25Q2_Canvas_Piper_Blizzard_Bark_Brown_PDP_LEFT-2000x2000_39e3beff-5163-4a8e-bc1c-001232adde5c.png?v=1750966548&width=1024","description":"Blizzard"},{"id":"tree-runner","name":"Tree Runner","price":"$80","originalPrice":"$98","image":"https://www.allbirds.com/cdn/shop/files/TR3MJBW080_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_JET_BLACK_WHITE.png?v=1751165486&width=1024","description":"Jet Black"}],"primaryButton":{"label":"SHOP NOW","href":"/collections/sale-mens","variant":"outline"}}, style: {"background":"white","paddingY":"xl"} },
      { type: 'product-grid', variant: 'ecommerce-grid', content: {"title":"Women's Sale","subtitle":"Chic, wildly comfortable shoes for work, play, and whatever spring brings.","items":[{"id":"tree-breezer","name":"TREE BREEZER","price":"$84","originalPrice":"$105","image":"https://www.allbirds.com/cdn/shop/files/A12330_26Q1_Tree-Breezer-Verdant-Green-Verdant-Green_PDP_LEFT.png?v=1765244166&width=1024","description":"Verdant Green","badge":"NEW COLOR"},{"id":"tree-runner-w","name":"TREE RUNNER","price":"$80","originalPrice":"$98","image":"https://www.allbirds.com/cdn/shop/files/TR3MKWW_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_KAIKOURA_WHITE_WHITE.png?v=1751166469&width=1024","description":"Kaikoura White"},{"id":"tree-runner-nz-w","name":"TREE RUNNER NZ","price":"$70","originalPrice":"$98","image":"https://www.allbirds.com/cdn/shop/files/A12614_26Q1_Tree-Runner-NZ-Mushroom-Mushroom_PDP_LEFT_4e9c238b-c1f7-40da-91bf-51fb62b2c113.png?v=1765242423&width=1024","description":"Mushroom"},{"id":"tree-glider","name":"TREE GLIDER","price":"$98","originalPrice":"$140","image":"https://www.allbirds.com/cdn/shop/files/A12366_26Q1_Tree-Glider-Warm-White-Multi-Natural-White_PDP_LEFT.png?v=1765305013&width=1024","description":"Warm White/Multi"}],"primaryButton":{"label":"SHOP NOW","href":"/collections/sale-womens","variant":"outline"}}, style: {"background":"white","paddingY":"xl"} },
      { type: 'features', variant: 'ecommerce-grid', content: {"items":[{"id":"dasher-nz","icon":"lightning-bolt","title":"Dasher NZ Collection","description":"Shop Men | Shop Women","image":"https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_3xPromo-03_Desktop-Mobile_9x16_929505e4-05ff-4b08-8673-10e93d409023.jpg?v=1771356243&width=1024"},{"id":"varsity","icon":"star","title":"Varsity Collection","description":"Shop Men | Shop Women","image":"https://www.allbirds.com/cdn/shop/files/SS26_CH2_Varsity__Site_3xPromo-01_Desktop-Mobile_9x16_UK2.jpg?v=1770626316&width=1024"},{"id":"terralux","icon":"shield-check","title":"Terralux™ Collection","description":"Shop Men | Shop Women","image":"https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_3xPromo-01_Desktop-Mobile_9x16_45236641-a417-4da5-b075-1f24d5986a09.jpg?v=1771356244&width=1024"}],"columns":3}, style: {"background":"white","paddingY":"lg"} },
      { type: 'product-grid', variant: 'ecommerce-grid', content: {"title":"SALE","items":[{"id":"tree-runner-nz-spice","name":"WOMEN'S TREE RUNNER NZ","price":"$60","originalPrice":"$98","image":"https://www.allbirds.com/cdn/shop/files/A12301_26Q1_Tree-Runner-NZ-Spice-Warm-White_PDP_LEFT_cef32e3a-25ea-40c0-acd5-6c89a1c42d5a.png?v=1765243271&width=1024","description":"Spice"},{"id":"golf-dasher","name":"MEN'S GOLF DASHER","price":"$120","originalPrice":"$160","image":"https://www.allbirds.com/cdn/shop/files/A12456_26Q1_Golf-Dasher-Blizzard-Burnt-Olive-Medium-Gm_PDP_LEFT_b0afba41-32ae-4837-8cd2-0458cac0c22b.png?v=1765238044&width=1024","description":"Blizzard/Burnt Olive","badge":"NEW COLOR"},{"id":"breezer-mary-jane","name":"WOMEN'S BREEZER MARY JANE","price":"$92","originalPrice":"$115","image":"https://www.allbirds.com/cdn/shop/files/A12120_25Q4_Breezer-Mary-Jane-Anthracite-Dark-Anthracite-Sole_PDP_LEFT.png?v=1761878842&width=1024","description":"Anthracite"},{"id":"dasher-nz","name":"MEN'S DASHER NZ","price":"$120","originalPrice":"$160","image":"https://www.allbirds.com/cdn/shop/files/A12487_26Q1_Dasher-NZ-Dark-Eucalyptus-Dark-Eucalyptus_PDP_LEFT.png?v=1769559862&width=1024","description":"Dark Eucalyptus","badge":"NEW"}]}, style: {"background":"light","paddingY":"lg"} },
      { type: 'features', variant: 'ecommerce-grid', content: {"items":[{"id":"comfort","icon":"sparkles","title":"WEAR ALL DAY COMFORT","description":"Lightweight, bouncy, and wildly comfortable, Allbirds shoes make any outing feel effortless. Slip in, lace up, or slide them on and enjoy the comfy support."},{"id":"sustainability","icon":"leaf","title":"SUSTAINABILITY IN EVERY STEP","description":"From materials to transport, we're working to reduce our carbon footprint to near zero. Holding ourselves accountable and striving for climate goals isn't a 30-year goal—it's now."},{"id":"materials","icon":"globe","title":"MATERIALS FROM THE EARTH","description":"We replace petroleum-based synthetics with natural alternatives wherever we can. Like using wool, tree fiber, and sugarcane. They're soft, breathable, and better for the planet—win, win, win."}],"columns":3}, style: {"background":"light","paddingY":"lg"} },
      { type: 'site-footer', variant: 'ecommerce', content: {"logo":"https://www.allbirds.com/cdn/shop/files/b-corp.svg?v=1751415254&width=80","copyright":"© 2025 Allbirds, Inc. All Rights Reserved","columns":[{"id":"help","title":"HELP","links":[{"id":"chat","label":"Live Chat","href":"/help/chat"},{"id":"call","label":"Call Us","href":"/help/call"},{"id":"text","label":"Text Us","href":"/help/text"},{"id":"email","label":"help@allbirds.com","href":"mailto:help@allbirds.com"},{"id":"faq","label":"FAQ/Contact Us","href":"/help/faq"},{"id":"returns","label":"Returns/Exchanges","href":"/help/returns"}]},{"id":"shop","title":"SHOP","links":[{"id":"quiz","label":"Style Quiz","href":"/style-quiz"},{"id":"mens-shoes","label":"Men's Shoes","href":"/collections/mens"},{"id":"womens-shoes","label":"Women's Shoes","href":"/collections/womens"},{"id":"mens-apparel","label":"Men's Apparel","href":"/collections/mens-apparel"},{"id":"womens-apparel","label":"Women's Apparel","href":"/collections/womens-apparel"},{"id":"socks","label":"Socks","href":"/collections/socks"},{"id":"gift-cards","label":"Gift Cards","href":"/products/gift-cards"},{"id":"refer","label":"Refer a Friend","href":"/refer"}]},{"id":"company","title":"COMPANY","links":[{"id":"stores","label":"Store Locator","href":"/stores"},{"id":"story","label":"Our Story","href":"/our-story"},{"id":"materials","label":"Our Materials","href":"/materials"},{"id":"sustainability","label":"Sustainability","href":"/sustainability"},{"id":"investors","label":"Investors","href":"/investors"},{"id":"care","label":"Shoe Care","href":"/shoe-care"},{"id":"affiliates","label":"Affiliates","href":"/affiliates"},{"id":"bulk","label":"Bulk Orders","href":"/bulk"}]}],"socials":{"instagram":"https://instagram.com/allbirds","twitter":"https://twitter.com/allbirds"}}, style: {"background":"dark","paddingY":"xl"} },
    ],
  },
  {
    id: 'template-scan-b31af4ccf64c',
    label: 'Allbirds France',
    category: 'templates',
    subcategory: 'custom',
    tags: ['template', 'imported'],
    dropType: 'template',
    sections: [
      { type: 'custom', variant: 'ecommerce-centered', content: {"elements":[{"type":"custom-container","className":"cookie-consent-modal","children":[{"type":"custom-heading","level":2,"text":"Consentement aux cookies","className":"text-lg font-bold mb-4"},{"type":"custom-text","text":"Nous et nos partenaires, y compris Shopify, utilisons des cookies et d'autres technologies pour personnaliser votre expérience, vous afficher des publicités et effectuer des analyses. Nous n'utiliserons pas de cookies ou d'autres technologies à ces fins sans votre consentement. En savoir plus dans notre Politique de confidentialité.","className":"mb-6"},{"type":"custom-container","className":"flex gap-4 justify-center","children":[{"type":"custom-button","label":"Gérer vos préférences","href":"#","variant":"ghost"},{"type":"custom-button","label":"Accepter","href":"#","variant":"outline"},{"type":"custom-button","label":"Refuser","href":"#","variant":"outline"}]}]}]}, style: {"background":"dark","paddingY":"lg"} },
      { type: 'gallery-grid', variant: 'ecommerce-grid', content: {"images":[{"id":"1","src":"https://cdn.prod.website-files.com/placeholder-breezer.jpg","alt":"Breezer - Voilà à quoi ressemble la légèreté","caption":"Breezer"},{"id":"2","src":"https://cdn.prod.website-files.com/placeholder-dasher.jpg","alt":"Dasher NZ - Un confort qui suit votre rythme","caption":"Dasher NZ"},{"id":"3","src":"https://cdn.prod.website-files.com/placeholder-terralux.jpg","alt":"Terralux - Un style. Des possibilités infinies.","caption":"Terralux"},{"id":"4","src":"https://cdn.prod.website-files.com/placeholder-varsity.jpg","alt":"Varsity Cruiser - Un style qui n'a pas besoin d'être bruyant","caption":"Varsity Cruiser"}],"columns":4}, style: {"background":"white","paddingY":"none"} },
      { type: 'image-text', variant: 'ecommerce-image-right', content: {"title":"NOUS VOULONS FAIRE LES CHOSES DIFFÉREMMENT, MAIS MIEUX","subtitle":"Le meilleur inventeur au monde est la nature. C'est pourquoi nous y puisons notre inspiration pour créer des chaussures incroyablement confortables et qui te procurent un sentiment de bien-être à tous les niveaux.","body":"Vibes rétro alliées au confort moderne","image":"https://allbirds.fr/cdn/shop/files/AB_Hero_Varsity_Desktop_a4e8c71e-709a-4870-b02a-262996051090.jpg?v=1772541485&width=3733","imageAlt":"Varsity collection background","imagePosition":"right","primaryButton":{"label":"Pour lui","href":"https://allbirds.fr/collections/varsity-fur-herren","variant":"default"},"secondaryButton":{"label":"Pour elle","href":"https://allbirds.fr/collections/varsity-fur-damen","variant":"outline"}}, style: {"background":"dark","paddingY":"xl"} },
      { type: 'product-grid', variant: 'ecommerce-grid', content: {"title":"DÉCOUVREZ PLUS","items":[{"id":"1","name":"W Tree Glider Chaussures de loisirs","price":"150,00 €","image":"https://allbirds.fr/cdn/shop/files/AB_Teaser_Breezer_62b6d828-6a31-4c3d-a729-4628f3f68579.png?v=1772544004&width=1000","badge":"NOUVEAU"},{"id":"2","name":"W Dasher NZ Chaussures de loisirs","price":"150,00 €","image":"https://allbirds.fr/cdn/shop/files/AB_Dasher_NZ_43fdeafd-5987-4510-a5a1-de16e47561fc.png?v=1772545213&width=1000","badge":"NOUVEAU"},{"id":"3","name":"W Dasher NZ Chaussures de loisirs","price":"150,00 €","image":"https://allbirds.fr/cdn/shop/files/AB_Terralux.png?v=1772545691&width=1000","badge":"NOUVEAU"},{"id":"4","name":"W Runner NZ Slip On Slip-On","price":"120,00 €","image":"https://allbirds.fr/cdn/shop/files/AB_Varsity_Cruiser_7df2788c-ca53-412b-89f7-c0346973abf2.png?v=1772546537&width=1000","badge":"NOUVEAU"},{"id":"5","name":"W Breezer Point Ballerines","price":"130,00 €","rating":4.2,"badge":"NOUVEAU"}]}, style: {"background":"white","paddingY":"lg"} },
      { type: 'product-grid', variant: 'ecommerce-grid', content: {"items":[{"id":"1","name":"Tree Breezer","description":"Voilà à quoi ressemble la légèreté","image":"https://allbirds.fr/cdn/shop/files/AB_Teaser_Breezer_62b6d828-6a31-4c3d-a729-4628f3f68579.png?v=1772544004&width=1000"},{"id":"2","name":"Dasher NZ","description":"Un confort qui suit votre rythme","image":"https://allbirds.fr/cdn/shop/files/AB_Dasher_NZ_43fdeafd-5987-4510-a5a1-de16e47561fc.png?v=1772545213&width=1000"},{"id":"3","name":"Terralux","description":"Un style. Des possibilités infinies.","image":"https://allbirds.fr/cdn/shop/files/AB_Terralux.png?v=1772545691&width=1000"},{"id":"4","name":"Varsity Cruiser","description":"Un style qui n'a pas besoin d'être bruyant","image":"https://allbirds.fr/cdn/shop/files/AB_Varsity_Cruiser_7df2788c-ca53-412b-89f7-c0346973abf2.png?v=1772546537&width=1000"}]}, style: {"background":"white","paddingY":"lg"} },
      { type: 'site-footer', variant: 'ecommerce', content: {"logo":"https://allbirds.fr/cdn/shop/files/Allbirds.Logo.Black.RGB.Medium.jpg?v=1749020324&width=500","columns":[{"id":"1","title":"Service","links":[{"id":"1","label":"Newsletter","href":"#"},{"id":"2","label":"Questions fréquemment posées","href":"#"},{"id":"3","label":"Expédition et retours","href":"#"},{"id":"4","label":"Options de paiement","href":"#"},{"id":"5","label":"Mon compte","href":"#"},{"id":"6","label":"Giftcard","href":"#"},{"id":"7","label":"Contact","href":"#"}]},{"id":"2","title":"Contact","links":[{"id":"1","label":"Soutien et conseils au :","href":"#"},{"id":"2","label":"+43 5522-72303","href":"tel:+435522-72303"},{"id":"3","label":"Lu - Ve, 9:00 - 12:00 h / 13:00 - 16:30 h","href":"#"},{"id":"4","label":"Ou écrivez-nous un e-mail","href":"#"},{"id":"5","label":"service@allbirds.eu","href":"mailto:service@allbirds.eu"}]},{"id":"3","title":"Suivez-nous","links":[{"id":"1","label":"Facebook","href":"#"},{"id":"2","label":"Instagram","href":"#"}]},{"id":"4","title":"allbirds France","links":[{"id":"1","label":"Protection des données","href":"#"},{"id":"2","label":"Imprimer","href":"#"},{"id":"3","label":"Conditions générales de vente","href":"#"}]}],"copyright":"© 2024 Allbirds France","socials":{"instagram":"https://instagram.com/allbirds","facebook":"https://facebook.com/allbirds"}}, style: {"background":"dark","paddingY":"lg"} },
    ],
  },
]

// ─── Rich templates (converted from PAGE_TEMPLATES) ───

/** Map PAGE_TEMPLATES category to library subcategory */
const CATEGORY_TO_SUBCATEGORY: Record<string, string> = {
  'saas': 'saas',
  'agency': 'agency',
  'ecommerce': 'ecommerce',
  'portfolio': 'portfolio',
  'startup': 'startup',
  'blog': 'blog',
  'real-estate': 'real-estate',
  'photographe': 'photographe',
  'coach': 'coach',
  'restaurant': 'restaurant',
  'coiffeur': 'coiffeur',
  'architecte': 'architecte',
  'tatoueur': 'tatoueur',
  'beaute': 'beaute',
  'dj': 'dj',
  'traiteur': 'traiteur',
  'agency-models': 'agency-models',
}

const RICH_TEMPLATES: LibraryTemplateItem[] = PAGE_TEMPLATES.map((tpl) => ({
  id: tpl.id,
  label: tpl.name,
  category: 'templates' as const,
  subcategory: CATEGORY_TO_SUBCATEGORY[tpl.category] ?? tpl.category,
  tags: [tpl.category, tpl.universe, tpl.name.toLowerCase(), 'rich'],
  universe: tpl.universe,
  dropType: 'template' as const,
  sections: tpl.sections.map((s) => ({
    type: s.type,
    variant: s.variant,
    content: (s.content ?? {}) as Record<string, unknown>,
    style: {
      background: (s.style?.background ?? 'white') as SectionBackground,
      paddingY: (s.style?.paddingY ?? 'md') as LibrarySectionStyle['paddingY'],
    },
  })),
}))

// ─── Industry templates (10 full page presets by sector) ───

const INDUSTRY_TEMPLATES: LibraryTemplateItem[] = [
  // 1. Restaurant / Bistro
  {
    id: 'tpl-restaurant',
    label: 'Restaurant / Bistro',
    category: 'templates',
    subcategory: 'restaurant',
    tags: ['restaurant', 'bistro', 'food', 'gastronomie', 'menu', 'industry'],
    universe: 'luxe',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'La Belle Assiette',
          links: [
            { label: 'Accueil', href: '/' },
            { label: 'Notre Carte', href: '#carte' },
            { label: 'Le Chef', href: '#chef' },
            { label: 'Galerie', href: '#galerie' },
            { label: 'Contact', href: '#contact' },
          ],
          ctaLabel: 'Réserver une table',
          ctaHref: '#contact',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Une expérience culinaire d\'exception',
          subtitle: 'Saveurs authentiques, produits de saison et passion du goût. Découvrez notre cuisine raffinée dans un cadre intimiste au coeur de Paris.',
          primaryButton: { label: 'Réserver une table', href: '#contact', variant: 'primary' },
          secondaryButton: { label: 'Voir la carte', href: '#carte', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Notre Carte',
          subtitle: 'Des plats préparés avec amour à partir de produits frais et locaux',
          items: [
            { id: 'dish-1', icon: 'utensils', title: 'Tartare de Boeuf', description: 'Boeuf Aubrac, câpres, cornichons, jaune d\'oeuf bio, frites maison. 24 €' },
            { id: 'dish-2', icon: 'utensils', title: 'Risotto aux Cèpes', description: 'Riz carnaroli, cèpes frais, parmesan 24 mois, truffe noire. 28 €' },
            { id: 'dish-3', icon: 'utensils', title: 'Filet de Bar', description: 'Bar de ligne, beurre blanc aux agrumes, légumes croquants. 32 €' },
            { id: 'dish-4', icon: 'utensils', title: 'Souffle au Chocolat', description: 'Chocolat grand cru Valrhona, coeur coulant, glace vanille. 14 €' },
            { id: 'dish-5', icon: 'utensils', title: 'Plateau de Fromages', description: 'Sélection de 5 fromages affinés, confiture de figues, noix. 16 €' },
            { id: 'dish-6', icon: 'utensils', title: 'Salade du Marché', description: 'Mesclun, chèvre chaud, noix, miel, vinaigrette balsamique. 18 €' },
          ],
          columns: 2,
        },
        style: { background: 'custom', customBgColor: '#1a1410', paddingY: 'xl' },
      },
      {
        type: 'image-text',
        variant: 'default',
        content: {
          title: 'Le Chef — Marc Dubois',
          subtitle: 'Passionné par la gastronomie depuis l\'âge de 15 ans, le Chef Marc Dubois a perfectionné son art dans les plus grandes maisons étoilées avant de fonder La Belle Assiette en 2018. Sa philosophie : sublimer les produits du terroir avec créativité et respect des saisons.',
          imagePosition: 'right',
        },
        style: dLg,
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'Ce que disent nos clients',
          items: [
            { id: 'rev-1', quote: 'Une expérience gastronomique inoubliable. Le tartare est tout simplement parfait.', author: 'Sophie M.', role: 'Paris', rating: 5 },
            { id: 'rev-2', quote: 'Cadre magnifique, service impeccable et des saveurs qui transportent. On y revient chaque mois.', author: 'Jean-Pierre L.', role: 'Neuilly-sur-Seine', rating: 5 },
            { id: 'rev-3', quote: 'Le meilleur restaurant du quartier, sans hésitation. Le soufflé au chocolat est divin.', author: 'Claire D.', role: 'Paris', rating: 5 },
          ],
        },
        style: { background: 'custom', customBgColor: '#1a1410', paddingY: 'lg' },
      },
      {
        type: 'gallery-grid',
        variant: 'default',
        content: {
          title: 'Notre Univers',
          images: [
            { id: 'gal-1', src: '', alt: 'Plat signature du chef' },
            { id: 'gal-2', src: '', alt: 'Salle du restaurant' },
            { id: 'gal-3', src: '', alt: 'Dessert raffiné' },
            { id: 'gal-4', src: '', alt: 'Cave à vins' },
            { id: 'gal-5', src: '', alt: 'Terrasse en été' },
            { id: 'gal-6', src: '', alt: 'Le chef en cuisine' },
          ],
        },
        style: dLg,
      },
      {
        type: 'contact',
        variant: 'default',
        content: {
          title: 'Réservation & Contact',
          subtitle: 'Réservez votre table pour une expérience culinaire unique',
          address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
          phone: '+33 1 42 65 12 34',
          email: 'reservation@labelleassiette.fr',
          hours: 'Mar-Sam : 12h-14h30, 19h-22h30 | Dim-Lun : Fermé',
        },
        style: { background: 'custom', customBgColor: '#1a1410', paddingY: 'lg' },
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'La Belle Assiette',
          copyright: '© 2026 La Belle Assiette — Tous droits réservés',
          tagline: 'Cuisine française contemporaine au coeur de Paris',
        },
        style: { background: 'custom', customBgColor: '#0f0d0a', paddingY: 'md' },
      },
    ],
  },

  // 2. Photographe Portfolio
  {
    id: 'tpl-photographer',
    label: 'Photographe Portfolio',
    category: 'templates',
    subcategory: 'photographe',
    tags: ['photographe', 'photo', 'portfolio', 'creatif', 'artist', 'industry'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'Camille Renard',
          links: [
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'A propos', href: '#about' },
            { label: 'Prestations', href: '#services' },
            { label: 'Contact', href: '#contact' },
          ],
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Camille Renard',
          subtitle: 'Photographe portraitiste & reportage. Je capture l\'instant, l\'émotion, la lumière. Basée à Lyon, disponible partout en France.',
          primaryButton: { label: 'Voir le portfolio', href: '#portfolio', variant: 'primary' },
        },
        style: dXl,
      },
      {
        type: 'gallery-grid',
        variant: 'default',
        content: {
          title: 'Portfolio',
          subtitle: 'Une sélection de mes travaux récents',
          images: [
            { id: 'photo-1', src: '', alt: 'Portrait studio noir et blanc' },
            { id: 'photo-2', src: '', alt: 'Mariage en plein air' },
            { id: 'photo-3', src: '', alt: 'Portrait corporate' },
            { id: 'photo-4', src: '', alt: 'Reportage événementiel' },
            { id: 'photo-5', src: '', alt: 'Portrait artistique' },
            { id: 'photo-6', src: '', alt: 'Paysage urbain' },
          ],
        },
        style: dLg,
      },
      {
        type: 'image-text',
        variant: 'default',
        content: {
          title: 'A propos',
          subtitle: 'Passionnée par l\'image depuis plus de 12 ans, je mets mon regard au service de vos projets. Chaque séance est une rencontre, chaque photo raconte une histoire. Mon approche : naturelle, authentique, lumineuse.',
          imagePosition: 'left',
        },
        style: { background: 'custom', customBgColor: '#111111', paddingY: 'xl' },
      },
      {
        type: 'pricing',
        variant: 'default',
        content: {
          title: 'Prestations',
          subtitle: 'Des formules adaptées à chaque besoin',
          items: [
            { id: 'pack-1', title: 'Essentiel', price: '350 €', description: 'Séance portrait 1h, 15 photos retouchées, galerie privée en ligne', features: ['1 heure de shooting', '15 photos HD retouchées', 'Galerie privée en ligne'] },
            { id: 'pack-2', title: 'Premium', price: '650 €', description: 'Séance 2h, 30 photos retouchées, tirages Fine Art inclus', features: ['2 heures de shooting', '30 photos HD retouchées', '3 tirages Fine Art 30x40', 'Galerie privée en ligne'], highlighted: true },
            { id: 'pack-3', title: 'Reportage', price: 'Sur devis', description: 'Couverture événementielle complète, nombre de photos illimité', features: ['Demi-journée ou journée complète', 'Photos illimitées', 'Galerie privée en ligne', 'Livraison sous 15 jours'] },
          ],
        },
        style: dLg,
      },
      {
        type: 'contact',
        variant: 'default',
        content: {
          title: 'Me contacter',
          subtitle: 'Parlons de votre projet photo',
          email: 'hello@camillerenard.fr',
          phone: '+33 6 12 34 56 78',
        },
        style: { background: 'custom', customBgColor: '#111111', paddingY: 'lg' },
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'Camille Renard',
          copyright: '© 2026 Camille Renard Photographie',
          socials: { instagram: '#', facebook: '#' },
        },
        style: dMd,
      },
    ],
  },

  // 3. SaaS / Application Web
  {
    id: 'tpl-saas',
    label: 'SaaS / Application Web',
    category: 'templates',
    subcategory: 'saas',
    tags: ['saas', 'software', 'app', 'tech', 'startup', 'industry'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'FlowMetrics',
          links: [
            { label: 'Fonctionnalités', href: '#features' },
            { label: 'Comment ça marche', href: '#steps' },
            { label: 'Tarifs', href: '#pricing' },
            { label: 'Témoignages', href: '#testimonials' },
          ],
          ctaLabel: 'Essai gratuit',
          ctaHref: '#cta',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Pilotez votre activité avec des données en temps réel',
          subtitle: 'FlowMetrics centralise vos KPIs, automatise vos rapports et vous aide à prendre les bonnes décisions. Plus de 2 000 entreprises nous font confiance.',
          primaryButton: { label: 'Démarrer gratuitement', href: '#cta', variant: 'primary' },
          secondaryButton: { label: 'Voir la démo', href: '#demo', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'logos',
        variant: 'default',
        content: {
          title: 'Ils nous font confiance',
          items: [
            { id: 'logo-1', name: 'TechCorp' },
            { id: 'logo-2', name: 'DataFlow' },
            { id: 'logo-3', name: 'ScaleUp' },
            { id: 'logo-4', name: 'NovaTech' },
            { id: 'logo-5', name: 'CloudFirst' },
          ],
        },
        style: dMd,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Tout ce dont vous avez besoin',
          subtitle: 'Des outils puissants pour analyser, comprendre et agir',
          items: [
            { id: 'feat-1', icon: 'bar-chart-3', title: 'Tableaux de bord en temps réel', description: 'Visualisez vos métriques clés en un coup d\'oeil avec des dashboards personnalisables et interactifs.' },
            { id: 'feat-2', icon: 'zap', title: 'Automatisation intelligente', description: 'Configurez des alertes et des rapports automatiques pour ne jamais manquer une tendance importante.' },
            { id: 'feat-3', icon: 'shield', title: 'Sécurité renforcée', description: 'Vos données sont chiffrées de bout en bout. Conformité RGPD et certifications SOC 2 incluses.' },
          ],
          columns: 3,
        },
        style: { background: 'custom', customBgColor: '#0a0a12', paddingY: 'xl' },
      },
      {
        type: 'steps',
        variant: 'default',
        content: {
          title: 'Comment ça marche',
          subtitle: 'Opérationnel en 3 étapes simples',
          items: [
            { id: 'step-1', number: '01', title: 'Connectez vos sources', description: 'Intégrez vos outils existants en quelques clics : CRM, comptabilité, analytics, réseaux sociaux.' },
            { id: 'step-2', number: '02', title: 'Configurez vos dashboards', description: 'Choisissez parmi nos templates ou créez vos propres tableaux de bord sur mesure.' },
            { id: 'step-3', number: '03', title: 'Prenez les bonnes décisions', description: 'Recevez des insights actionables et des recommandations basées sur vos données.' },
          ],
        },
        style: dLg,
      },
      {
        type: 'pricing',
        variant: 'default',
        content: {
          title: 'Des tarifs simples et transparents',
          subtitle: 'Commencez gratuitement, évoluez à votre rythme',
          items: [
            { id: 'plan-1', title: 'Starter', price: '0 €/mois', description: 'Pour découvrir FlowMetrics', features: ['3 dashboards', '5 sources de données', 'Rapports hebdomadaires', 'Support email'] },
            { id: 'plan-2', title: 'Pro', price: '49 €/mois', description: 'Pour les équipes en croissance', features: ['Dashboards illimités', '20 sources de données', 'Rapports temps réel', 'Alertes intelligentes', 'Support prioritaire'], highlighted: true },
            { id: 'plan-3', title: 'Enterprise', price: 'Sur mesure', description: 'Pour les grandes organisations', features: ['Tout Pro +', 'Sources illimitées', 'SSO & SCIM', 'SLA garanti', 'Account manager dédié'] },
          ],
        },
        style: { background: 'custom', customBgColor: '#0a0a12', paddingY: 'xl' },
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'Ils en parlent mieux que nous',
          items: [
            { id: 'test-1', quote: 'FlowMetrics a transformé notre façon de piloter l\'entreprise. On ne pourrait plus s\'en passer.', author: 'Marie Lefebvre', role: 'CEO, TechCorp', rating: 5 },
            { id: 'test-2', quote: 'Mise en place en 2 jours, ROI en 2 semaines. L\'outil indispensable pour toute équipe data-driven.', author: 'Thomas Bernard', role: 'Head of Growth, ScaleUp', rating: 5 },
          ],
        },
        style: dLg,
      },
      {
        type: 'cta',
        variant: 'default',
        content: {
          title: 'Prêt à transformer vos données en décisions ?',
          subtitle: 'Rejoignez plus de 2 000 entreprises. Essai gratuit 14 jours, sans carte bancaire.',
          primaryButton: { label: 'Démarrer gratuitement', href: '#signup', variant: 'primary' },
        },
        style: pLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'FlowMetrics',
          copyright: '© 2026 FlowMetrics SAS — Tous droits réservés',
          columns: [
            { title: 'Produit', links: [{ label: 'Fonctionnalités', href: '#' }, { label: 'Tarifs', href: '#' }, { label: 'Intégrations', href: '#' }, { label: 'Changelog', href: '#' }] },
            { title: 'Entreprise', links: [{ label: 'A propos', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Carrières', href: '#' }, { label: 'Contact', href: '#' }] },
            { title: 'Ressources', links: [{ label: 'Documentation', href: '#' }, { label: 'Centre d\'aide', href: '#' }, { label: 'Statut', href: '#' }] },
            { title: 'Légal', links: [{ label: 'Confidentialité', href: '#' }, { label: 'CGU', href: '#' }, { label: 'RGPD', href: '#' }] },
          ],
          socials: { twitter: '#', linkedin: '#', github: '#' },
        },
        style: dMd,
      },
    ],
  },

  // 4. Agence Immobilière
  {
    id: 'tpl-real-estate',
    label: 'Agence Immobiliere',
    category: 'templates',
    subcategory: 'immobilier',
    tags: ['immobilier', 'real-estate', 'agence', 'property', 'industry'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'Prestige Immobilier',
          links: [
            { label: 'Nos biens', href: '#biens' },
            { label: 'L\'agence', href: '#agence' },
            { label: 'Témoignages', href: '#temoignages' },
            { label: 'Contact', href: '#contact' },
          ],
          ctaLabel: 'Estimer mon bien',
          ctaHref: '#contact',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Trouvez le bien de vos rêves',
          subtitle: 'Spécialiste de l\'immobilier de prestige à Paris et sur la Côte d\'Azur. Plus de 15 ans d\'expertise au service de vos projets immobiliers.',
          primaryButton: { label: 'Voir nos biens', href: '#biens', variant: 'primary' },
          secondaryButton: { label: 'Estimer mon bien', href: '#contact', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'product-grid',
        variant: 'default',
        content: {
          title: 'Biens en vedette',
          subtitle: 'Notre sélection de propriétés d\'exception',
          items: [
            { id: 'prop-1', name: 'Appartement Haussmannien', description: '5 pièces — 180 m² — Paris 8e', price: '2 450 000 €' },
            { id: 'prop-2', name: 'Villa Vue Mer', description: '6 pièces — 320 m² — Cannes', price: '4 800 000 €' },
            { id: 'prop-3', name: 'Loft Contemporain', description: '3 pièces — 150 m² — Paris 3e', price: '1 890 000 €' },
          ],
          columns: 3,
        },
        style: { background: 'custom', customBgColor: '#0c0c14', paddingY: 'xl' },
      },
      {
        type: 'stats',
        variant: 'default',
        content: {
          title: 'Notre expertise en chiffres',
          items: [
            { id: 'stat-1', value: '500+', label: 'Biens vendus' },
            { id: 'stat-2', value: '98%', label: 'Clients satisfaits' },
            { id: 'stat-3', value: '15', label: 'Années d\'expérience' },
            { id: 'stat-4', value: '45 jours', label: 'Délai moyen de vente' },
          ],
        },
        style: dLg,
      },
      {
        type: 'image-text',
        variant: 'default',
        content: {
          title: 'L\'agence',
          subtitle: 'Prestige Immobilier est une agence indépendante fondée en 2011. Notre équipe de 8 conseillers spécialisés vous accompagne à chaque étape de votre projet : estimation, mise en valeur, visites, négociation et signature. Notre promesse : un service sur-mesure et une connaissance approfondie du marché local.',
          imagePosition: 'right',
        },
        style: { background: 'custom', customBgColor: '#0c0c14', paddingY: 'lg' },
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'Ils nous ont fait confiance',
          items: [
            { id: 'test-1', quote: 'Un accompagnement exceptionnel du début à la fin. Notre appartement a été vendu en 3 semaines au prix souhaité.', author: 'Laurent & Isabelle P.', role: 'Vente — Paris 16e', rating: 5 },
            { id: 'test-2', quote: 'Professionnalisme et réactivité. L\'équipe a su trouver la villa parfaite pour notre famille en un temps record.', author: 'Famille Moreau', role: 'Achat — Nice', rating: 5 },
            { id: 'test-3', quote: 'Je recommande sans hésiter. Estimation juste, photos magnifiques et suivi irréprochable.', author: 'Christine D.', role: 'Vente — Cannes', rating: 5 },
          ],
        },
        style: dLg,
      },
      {
        type: 'cta',
        variant: 'default',
        content: {
          title: 'Un projet immobilier ?',
          subtitle: 'Contactez-nous pour une estimation gratuite et confidentielle de votre bien.',
          primaryButton: { label: 'Demander une estimation', href: '#contact', variant: 'primary' },
        },
        style: pLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'Prestige Immobilier',
          copyright: '© 2026 Prestige Immobilier — Tous droits réservés',
          tagline: 'Immobilier de prestige — Paris & Côte d\'Azur',
        },
        style: dMd,
      },
    ],
  },

  // 5. Salle de Sport / Coach Fitness
  {
    id: 'tpl-fitness',
    label: 'Salle de Sport / Coach',
    category: 'templates',
    subcategory: 'fitness',
    tags: ['fitness', 'sport', 'gym', 'coach', 'musculation', 'industry'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'IRON PULSE',
          links: [
            { label: 'Cours', href: '#cours' },
            { label: 'Coachs', href: '#coachs' },
            { label: 'Abonnements', href: '#pricing' },
            { label: 'Résultats', href: '#resultats' },
            { label: 'Contact', href: '#contact' },
          ],
          ctaLabel: 'Essai gratuit',
          ctaHref: '#pricing',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'DÉPASSEZ VOS LIMITES',
          subtitle: 'Coaching personnalisé, équipements premium et communauté motivante. Rejoignez Iron Pulse et transformez votre corps.',
          primaryButton: { label: 'Essai gratuit 7 jours', href: '#pricing', variant: 'primary' },
          secondaryButton: { label: 'Voir les cours', href: '#cours', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Nos Cours',
          subtitle: 'Des programmes pour tous les niveaux et tous les objectifs',
          items: [
            { id: 'class-1', icon: 'flame', title: 'HIIT Brûle-Graisse', description: 'Séances intenses de 45 min pour maximiser la dépense calorique et sculpter votre silhouette.' },
            { id: 'class-2', icon: 'dumbbell', title: 'Musculation Guidée', description: 'Programmes structurés avec coach pour développer force et masse musculaire en toute sécurité.' },
            { id: 'class-3', icon: 'heart', title: 'Yoga & Mobilité', description: 'Retrouvez souplesse et sérénité grâce à nos séances de yoga adaptées aux sportifs.' },
            { id: 'class-4', icon: 'trophy', title: 'CrossFit', description: 'Entraînement fonctionnel haute intensité pour développer endurance, force et agilité.' },
          ],
          columns: 2,
        },
        style: { background: 'custom', customBgColor: '#0a0a0a', paddingY: 'xl' },
      },
      {
        type: 'team',
        variant: 'default',
        content: {
          title: 'Nos Coachs',
          subtitle: 'Des professionnels certifiés et passionnés',
          items: [
            { id: 'coach-1', name: 'Lucas Martin', role: 'Coach Musculation & HIIT', description: 'Diplômé BPJEPS, 8 ans d\'expérience. Spécialiste transformation physique.' },
            { id: 'coach-2', name: 'Inès Belkacem', role: 'Coach Yoga & Mobilité', description: 'Certifiée Yoga Alliance 500h. Approche holistique du bien-être et de la performance.' },
          ],
        },
        style: dLg,
      },
      {
        type: 'pricing',
        variant: 'default',
        content: {
          title: 'Abonnements',
          subtitle: 'Choisissez la formule qui vous correspond',
          items: [
            { id: 'sub-1', title: 'Accès Libre', price: '39 €/mois', description: 'Accès salle en autonomie', features: ['Accès illimité à la salle', 'Vestiaires & douches', 'App de suivi', 'Sans engagement'] },
            { id: 'sub-2', title: 'Coaching', price: '69 €/mois', description: 'Avec cours collectifs', features: ['Tout Accès Libre +', 'Cours collectifs illimités', 'Programme personnalisé', 'Bilan mensuel'], highlighted: true },
            { id: 'sub-3', title: 'VIP', price: '129 €/mois', description: 'Coaching privé inclus', features: ['Tout Coaching +', '4 séances privées/mois', 'Plan nutrition', 'Accès prioritaire'] },
          ],
        },
        style: { background: 'custom', customBgColor: '#0a0a0a', paddingY: 'xl' },
      },
      {
        type: 'gallery-grid',
        variant: 'default',
        content: {
          title: 'Transformations',
          subtitle: 'Les résultats parlent d\'eux-mêmes',
          images: [
            { id: 'transfo-1', src: '', alt: 'Transformation avant/après' },
            { id: 'transfo-2', src: '', alt: 'Séance HIIT en groupe' },
            { id: 'transfo-3', src: '', alt: 'Coaching personnalisé' },
            { id: 'transfo-4', src: '', alt: 'Espace musculation' },
          ],
        },
        style: dLg,
      },
      {
        type: 'cta',
        variant: 'default',
        content: {
          title: 'VOTRE TRANSFORMATION COMMENCE ICI',
          subtitle: 'Essai gratuit de 7 jours. Sans engagement. Sans excuses.',
          primaryButton: { label: 'Commencer maintenant', href: '#signup', variant: 'primary' },
        },
        style: pLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'IRON PULSE',
          copyright: '© 2026 Iron Pulse — Tous droits réservés',
          tagline: 'Coaching premium — Lyon',
        },
        style: dMd,
      },
    ],
  },

  // 6. Agence Créative / Freelance
  {
    id: 'tpl-agency',
    label: 'Agence Creative / Freelance',
    category: 'templates',
    subcategory: 'agency',
    tags: ['agence', 'creative', 'freelance', 'digital', 'design', 'industry'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'ATELIER NOIR',
          links: [
            { label: 'Services', href: '#services' },
            { label: 'Projets', href: '#portfolio' },
            { label: 'Processus', href: '#process' },
            { label: 'Equipe', href: '#team' },
            { label: 'Contact', href: '#contact' },
          ],
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Nous créons des expériences digitales mémorables',
          subtitle: 'Studio de design et développement web. Nous transformons vos idées en produits numériques qui marquent les esprits.',
          primaryButton: { label: 'Voir nos projets', href: '#portfolio', variant: 'primary' },
          secondaryButton: { label: 'Nous contacter', href: '#contact', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Nos expertises',
          items: [
            { id: 'svc-1', icon: 'palette', title: 'Direction Artistique', description: 'Identité visuelle, charte graphique et univers de marque sur-mesure pour vous démarquer.' },
            { id: 'svc-2', icon: 'layout', title: 'Design UX/UI', description: 'Interfaces intuitives et esthétiques qui placent l\'utilisateur au centre de chaque interaction.' },
            { id: 'svc-3', icon: 'code', title: 'Développement Web', description: 'Sites et applications performants, accessibles et optimisés pour tous les supports.' },
            { id: 'svc-4', icon: 'megaphone', title: 'Stratégie Digitale', description: 'SEO, content marketing et réseaux sociaux pour amplifier votre présence en ligne.' },
          ],
          columns: 2,
        },
        style: { background: 'custom', customBgColor: '#0a0a0a', paddingY: 'xl' },
      },
      {
        type: 'gallery-grid',
        variant: 'default',
        content: {
          title: 'Projets sélectionnés',
          subtitle: 'Quelques réalisations dont nous sommes fiers',
          images: [
            { id: 'proj-1', src: '', alt: 'Refonte site e-commerce luxe', caption: 'Maison Éclat — E-commerce' },
            { id: 'proj-2', src: '', alt: 'Application mobile fintech', caption: 'NéoBank — App Mobile' },
            { id: 'proj-3', src: '', alt: 'Branding restaurant gastronomique', caption: 'Le Comptoir — Branding' },
            { id: 'proj-4', src: '', alt: 'Plateforme SaaS B2B', caption: 'DataSync — Plateforme SaaS' },
          ],
        },
        style: dLg,
      },
      {
        type: 'steps',
        variant: 'default',
        content: {
          title: 'Notre processus',
          subtitle: 'Une méthodologie éprouvée pour des résultats concrets',
          items: [
            { id: 'proc-1', number: '01', title: 'Découverte', description: 'Nous apprenons à connaître votre marque, vos objectifs et votre audience pour définir la stratégie idéale.' },
            { id: 'proc-2', number: '02', title: 'Conception', description: 'Wireframes, maquettes et prototypes. Chaque pixel est pensé pour servir l\'expérience utilisateur.' },
            { id: 'proc-3', number: '03', title: 'Développement', description: 'Code propre, performant et maintenable. Tests rigoureux avant chaque mise en production.' },
            { id: 'proc-4', number: '04', title: 'Lancement', description: 'Déploiement, optimisation et accompagnement post-lancement pour assurer votre succès.' },
          ],
        },
        style: { background: 'custom', customBgColor: '#0a0a0a', paddingY: 'xl' },
      },
      {
        type: 'team',
        variant: 'default',
        content: {
          title: 'L\'équipe',
          items: [
            { id: 'member-1', name: 'Alexandre Dumont', role: 'Directeur Créatif', description: 'Ex-BETC, 10 ans de direction artistique pour des marques internationales.' },
            { id: 'member-2', name: 'Sarah Chen', role: 'Lead Designer UX', description: 'Spécialiste des interfaces complexes et de l\'accessibilité web.' },
            { id: 'member-3', name: 'Maxime Roux', role: 'Lead Développeur', description: 'Expert React/Next.js, passionné par la performance et les animations web.' },
          ],
        },
        style: dLg,
      },
      {
        type: 'contact',
        variant: 'default',
        content: {
          title: 'Parlons de votre projet',
          subtitle: 'Un projet en tête ? On adore les nouveaux défis.',
          email: 'hello@ateliernoir.studio',
          phone: '+33 1 86 95 42 10',
          address: '28 Rue de Rivoli, 75004 Paris',
        },
        style: { background: 'custom', customBgColor: '#0a0a0a', paddingY: 'lg' },
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'ATELIER NOIR',
          copyright: '© 2026 Atelier Noir — Tous droits réservés',
          socials: { instagram: '#', dribbble: '#', linkedin: '#' },
        },
        style: dMd,
      },
    ],
  },

  // 7. Boutique E-commerce
  {
    id: 'tpl-ecommerce',
    label: 'Boutique E-commerce',
    category: 'templates',
    subcategory: 'ecommerce',
    tags: ['ecommerce', 'boutique', 'shop', 'produits', 'vente', 'industry'],
    universe: 'ecommerce',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'MAISON ÉLARA',
          links: [
            { label: 'Nouveautés', href: '#nouveautes' },
            { label: 'Collections', href: '#collections' },
            { label: 'Notre histoire', href: '#about' },
          ],
          ctaLabel: 'Panier (0)',
          ctaHref: '/cart',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Collection Printemps 2026',
          subtitle: 'Des pièces intemporelles, confectionnées avec des matières nobles et un savoir-faire artisanal. Livraison offerte dès 150 €.',
          primaryButton: { label: 'Découvrir la collection', href: '#collections', variant: 'primary' },
        },
        style: dXl,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Nos Collections',
          items: [
            { id: 'cat-1', icon: 'shirt', title: 'Prêt-à-porter', description: 'Pièces élégantes pour le quotidien' },
            { id: 'cat-2', icon: 'gem', title: 'Accessoires', description: 'Bijoux, sacs et maroquinerie' },
            { id: 'cat-3', icon: 'home', title: 'Maison', description: 'Linge de maison et décoration' },
            { id: 'cat-4', icon: 'gift', title: 'Coffrets Cadeaux', description: 'Offrez l\'élégance' },
          ],
          columns: 4,
        },
        style: { background: 'custom', customBgColor: '#0f0f0f', paddingY: 'lg' },
      },
      {
        type: 'product-grid',
        variant: 'default',
        content: {
          title: 'Nos meilleures ventes',
          items: [
            { id: 'prod-1', name: 'Chemise en Lin Naturel', price: '89 €', description: 'Lin français, coupe droite' },
            { id: 'prod-2', name: 'Sac Cabas Cuir', price: '195 €', description: 'Cuir pleine fleur, fabrication italienne', badge: 'BEST-SELLER' },
            { id: 'prod-3', name: 'Foulard Soie Imprimé', price: '75 €', description: 'Soie naturelle, motif exclusif' },
            { id: 'prod-4', name: 'Bracelet Jonc Doré', price: '45 €', description: 'Laiton doré à l\'or fin', badge: 'NOUVEAU' },
          ],
          columns: 4,
        },
        style: dLg,
      },
      {
        type: 'newsletter',
        variant: 'default',
        content: {
          title: 'Rejoignez le cercle Élara',
          subtitle: 'Inscrivez-vous pour recevoir en avant-première nos nouvelles collections et offres exclusives.',
          placeholder: 'Votre adresse email',
          buttonLabel: 'S\'inscrire',
        },
        style: { background: 'custom', customBgColor: '#0f0f0f', paddingY: 'lg' },
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'Avis clients',
          items: [
            { id: 'rev-1', quote: 'Qualité exceptionnelle, les matières sont magnifiques. Je suis cliente depuis 2 ans et toujours aussi ravie.', author: 'Nathalie R.', rating: 5 },
            { id: 'rev-2', quote: 'Livraison rapide, emballage soigné et le sac cabas est encore plus beau en vrai. Merci !', author: 'Pauline M.', rating: 5 },
            { id: 'rev-3', quote: 'Le service client est au top. Échange sans problème et très réactif. Je recommande.', author: 'Émilie D.', rating: 5 },
          ],
        },
        style: dLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'MAISON ÉLARA',
          copyright: '© 2026 Maison Élara — Tous droits réservés',
          columns: [
            { title: 'Boutique', links: [{ label: 'Nouveautés', href: '#' }, { label: 'Prêt-à-porter', href: '#' }, { label: 'Accessoires', href: '#' }, { label: 'Maison', href: '#' }] },
            { title: 'Aide', links: [{ label: 'Livraison & Retours', href: '#' }, { label: 'Guide des tailles', href: '#' }, { label: 'FAQ', href: '#' }, { label: 'Contact', href: '#' }] },
            { title: 'Maison Élara', links: [{ label: 'Notre histoire', href: '#' }, { label: 'Nos engagements', href: '#' }, { label: 'Mentions légales', href: '#' }, { label: 'CGV', href: '#' }] },
            { title: 'Suivez-nous', links: [{ label: 'Instagram', href: '#' }, { label: 'Pinterest', href: '#' }, { label: 'Facebook', href: '#' }] },
          ],
        },
        style: dMd,
      },
    ],
  },

  // 8. Blog / Magazine
  {
    id: 'tpl-blog',
    label: 'Blog / Magazine',
    category: 'templates',
    subcategory: 'blog',
    tags: ['blog', 'magazine', 'articles', 'contenu', 'media', 'industry'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'TENDANCE',
          links: [
            { label: 'Culture', href: '#culture' },
            { label: 'Design', href: '#design' },
            { label: 'Tech', href: '#tech' },
            { label: 'Lifestyle', href: '#lifestyle' },
            { label: 'A propos', href: '#about' },
          ],
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Les dernières tendances créatives',
          subtitle: 'Culture, design, tech et lifestyle. Un regard curieux sur le monde qui nous entoure.',
        },
        style: dXl,
      },
      {
        type: 'image-text',
        variant: 'default',
        content: {
          title: 'A la une',
          subtitle: 'L\'architecture biophilique : quand la nature s\'invite dans nos espaces de travail',
          description: 'Comment les plus grands studios de design intègrent végétation, lumière naturelle et matériaux organiques pour transformer l\'expérience au bureau. Un mouvement qui redéfinit notre rapport à l\'espace professionnel.',
          imagePosition: 'right',
          primaryButton: { label: 'Lire l\'article', href: '#', variant: 'primary' },
        },
        style: { background: 'custom', customBgColor: '#0c0c0c', paddingY: 'xl' },
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Articles récents',
          items: [
            { id: 'article-1', icon: 'pen-tool', title: 'Le retour du brutalisme web', description: 'Typographies XXL, contrastes violents et grilles cassées : le brutalisme digital fait son grand retour en 2026.' },
            { id: 'article-2', icon: 'cpu', title: 'IA générative : menace ou outil ?', description: 'Enquête auprès de 50 créatifs français sur leur utilisation quotidienne de l\'intelligence artificielle.' },
            { id: 'article-3', icon: 'camera', title: 'Les 10 photographes à suivre en 2026', description: 'Notre sélection de talents émergents qui redéfinissent les codes de la photographie contemporaine.' },
          ],
          columns: 3,
        },
        style: dLg,
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Rubriques',
          items: [
            { id: 'cat-1', icon: 'book-open', title: 'Culture', description: 'Art, musique, cinéma et littérature' },
            { id: 'cat-2', icon: 'palette', title: 'Design', description: 'Graphisme, architecture et UX' },
            { id: 'cat-3', icon: 'monitor', title: 'Tech', description: 'Innovation, outils et tendances numériques' },
            { id: 'cat-4', icon: 'coffee', title: 'Lifestyle', description: 'Mode, voyage et bien-être' },
          ],
          columns: 4,
        },
        style: { background: 'custom', customBgColor: '#0c0c0c', paddingY: 'lg' },
      },
      {
        type: 'newsletter',
        variant: 'default',
        content: {
          title: 'Restez inspiré',
          subtitle: 'Recevez chaque semaine notre sélection d\'articles, directement dans votre boîte mail.',
          placeholder: 'Votre email',
          buttonLabel: 'S\'abonner',
        },
        style: dLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'TENDANCE',
          copyright: '© 2026 Tendance Magazine — Tous droits réservés',
          columns: [
            { title: 'Rubriques', links: [{ label: 'Culture', href: '#' }, { label: 'Design', href: '#' }, { label: 'Tech', href: '#' }, { label: 'Lifestyle', href: '#' }] },
            { title: 'A propos', links: [{ label: 'L\'équipe', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Mentions légales', href: '#' }] },
          ],
          socials: { twitter: '#', instagram: '#', linkedin: '#' },
        },
        style: dMd,
      },
    ],
  },

  // 9. Consultant / Coach
  {
    id: 'tpl-consultant',
    label: 'Consultant / Coach',
    category: 'templates',
    subcategory: 'coach',
    tags: ['consultant', 'coach', 'conseil', 'formation', 'personal-branding', 'industry'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'Julien Marchand',
          links: [
            { label: 'A propos', href: '#about' },
            { label: 'Accompagnements', href: '#services' },
            { label: 'Témoignages', href: '#temoignages' },
            { label: 'FAQ', href: '#faq' },
          ],
          ctaLabel: 'Réserver un appel',
          ctaHref: '#booking',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Accélérez la croissance de votre entreprise',
          subtitle: 'Consultant en stratégie digitale et coach business. J\'accompagne les dirigeants et entrepreneurs ambitieux vers leurs objectifs de croissance.',
          primaryButton: { label: 'Réserver un appel découverte', href: '#booking', variant: 'primary' },
          secondaryButton: { label: 'Découvrir mes offres', href: '#services', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'image-text',
        variant: 'default',
        content: {
          title: 'A propos',
          subtitle: '15 ans d\'expérience en stratégie digitale. Ex-directeur marketing chez Criteo et co-fondateur de deux startups. Certifié ICF (International Coaching Federation). J\'ai accompagné plus de 200 dirigeants dans leur transformation digitale et leur développement business.',
          imagePosition: 'left',
        },
        style: { background: 'custom', customBgColor: '#0b0b14', paddingY: 'xl' },
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Mes accompagnements',
          items: [
            { id: 'offer-1', icon: 'target', title: 'Coaching Individuel', description: 'Un accompagnement sur-mesure de 3 à 6 mois pour clarifier votre vision, structurer votre stratégie et passer à l\'action. 6 séances par mois.' },
            { id: 'offer-2', icon: 'users', title: 'Coaching d\'Equipe', description: 'Workshops et séances collectives pour aligner vos équipes, améliorer la collaboration et booster la performance globale.' },
            { id: 'offer-3', icon: 'rocket', title: 'Consulting Stratégique', description: 'Audit complet, recommandations actionnables et accompagnement à la mise en oeuvre de votre stratégie de croissance digitale.' },
          ],
          columns: 3,
        },
        style: dLg,
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'Ce que disent mes clients',
          items: [
            { id: 'test-1', quote: 'Julien a une capacité rare à poser les bonnes questions. En 3 mois, j\'ai doublé mon CA et retrouvé de la clarté dans ma stratégie.', author: 'Aurélie Blanc', role: 'Fondatrice, Studio Bloom', rating: 5 },
            { id: 'test-2', quote: 'Son approche pragmatique et bienveillante a transformé notre façon de travailler en équipe. Résultats concrets dès le premier mois.', author: 'Nicolas Petit', role: 'CTO, DataFlow', rating: 5 },
            { id: 'test-3', quote: 'Le meilleur investissement que j\'ai fait pour mon business cette année. Les sessions de coaching ont été un vrai accélérateur.', author: 'Camille Fontaine', role: 'CEO, GreenTech Solutions', rating: 5 },
          ],
        },
        style: { background: 'custom', customBgColor: '#0b0b14', paddingY: 'lg' },
      },
      {
        type: 'faq',
        variant: 'default',
        content: {
          title: 'Questions fréquentes',
          items: [
            { id: 'faq-1', question: 'Comment se déroule un appel découverte ?', answer: 'C\'est un échange gratuit de 30 minutes pour comprendre vos enjeux, vos objectifs et voir si nous sommes faits pour travailler ensemble.' },
            { id: 'faq-2', question: 'Quelle est la durée d\'un accompagnement ?', answer: 'Le coaching individuel se fait sur 3 à 6 mois. Le consulting stratégique peut être ponctuel (audit) ou continu selon vos besoins.' },
            { id: 'faq-3', question: 'Travaillez-vous avec tous les secteurs ?', answer: 'Je suis spécialisé dans les entreprises tech, SaaS et services B2B, mais j\'accompagne aussi des entrepreneurs dans d\'autres secteurs.' },
            { id: 'faq-4', question: 'Les séances sont-elles en présentiel ou en visio ?', answer: 'Les deux sont possibles. La majorité de mes clients préfèrent la visio pour la flexibilité, mais je me déplace à Paris et en Île-de-France.' },
            { id: 'faq-5', question: 'Quels résultats puis-je espérer ?', answer: 'Mes clients constatent en moyenne une croissance de 40 à 80% de leur CA dans les 6 mois suivant l\'accompagnement.' },
          ],
        },
        style: dLg,
      },
      {
        type: 'cta',
        variant: 'default',
        content: {
          title: 'Prêt à passer au niveau supérieur ?',
          subtitle: 'Réservez votre appel découverte gratuit. 30 minutes pour parler de vos objectifs et voir comment je peux vous aider.',
          primaryButton: { label: 'Réserver mon appel', href: '#booking', variant: 'primary' },
        },
        style: pLg,
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'Julien Marchand',
          copyright: '© 2026 Julien Marchand Consulting — Tous droits réservés',
          socials: { linkedin: '#', twitter: '#' },
        },
        style: dMd,
      },
    ],
  },

  // 10. Hôtel / Luxe
  {
    id: 'tpl-hotel',
    label: 'Hotel / Luxe',
    category: 'templates',
    subcategory: 'hotel',
    tags: ['hotel', 'luxe', 'hospitality', 'resort', 'voyage', 'industry'],
    universe: 'luxe',
    dropType: 'template',
    sections: [
      {
        type: 'site-header',
        variant: 'default',
        content: {
          logo: 'VILLA SÉRAPHINE',
          links: [
            { label: 'Nos Chambres', href: '#chambres' },
            { label: 'Le Domaine', href: '#domaine' },
            { label: 'Galerie', href: '#galerie' },
            { label: 'Avis', href: '#avis' },
            { label: 'Contact', href: '#contact' },
          ],
          ctaLabel: 'Réserver',
          ctaHref: '#booking',
        },
        style: dSm,
      },
      {
        type: 'hero',
        variant: 'default',
        content: {
          title: 'Un havre de paix en Provence',
          subtitle: 'Niché au coeur des vignobles de Luberon, Villa Séraphine vous offre une expérience de luxe authentique mêlant charme provençal et élégance contemporaine.',
          primaryButton: { label: 'Réserver votre séjour', href: '#booking', variant: 'primary' },
          secondaryButton: { label: 'Découvrir nos chambres', href: '#chambres', variant: 'outline' },
        },
        style: dXl,
      },
      {
        type: 'product-grid',
        variant: 'default',
        content: {
          title: 'Nos Chambres & Suites',
          subtitle: 'Chaque chambre est une invitation au voyage et à la sérénité',
          items: [
            { id: 'room-1', name: 'Chambre Lavande', price: 'A partir de 280 €/nuit', description: '35 m² — Vue jardin — Lit king size — Terrasse privée — Salle de bain marbre' },
            { id: 'room-2', name: 'Suite Olivier', price: 'A partir de 420 €/nuit', description: '55 m² — Vue vignoble — Salon privé — Baignoire îlot — Balcon panoramique', badge: 'BEST-SELLER' },
            { id: 'room-3', name: 'Suite Prestige', price: 'A partir de 680 €/nuit', description: '80 m² — Vue panoramique — Jacuzzi privatif — Cheminée — Terrasse 20 m²', badge: 'EXCLUSIVE' },
          ],
          columns: 3,
        },
        style: { background: 'custom', customBgColor: '#0d0b08', paddingY: 'xl' },
      },
      {
        type: 'features',
        variant: 'default',
        content: {
          title: 'Le Domaine',
          subtitle: 'Tout pour un séjour inoubliable',
          items: [
            { id: 'amenity-1', icon: 'waves', title: 'Piscine à Débordement', description: 'Piscine chauffée 28°C avec vue imprenable sur les collines du Luberon.' },
            { id: 'amenity-2', icon: 'utensils', title: 'Restaurant Gastronomique', description: 'Table étoilée du Chef Antoine Blanc. Cuisine de saison et produits du potager.' },
            { id: 'amenity-3', icon: 'sparkles', title: 'Spa & Bien-être', description: 'Hammam, sauna, salle de soins. Massages et rituels sur réservation.' },
            { id: 'amenity-4', icon: 'wine', title: 'Cave & Dégustations', description: 'Découvrez les vins du domaine et de la région lors de dégustations privées.' },
            { id: 'amenity-5', icon: 'bike', title: 'Activités Plein Air', description: 'Vélos électriques, randonnées guidées, cours de yoga en plein air.' },
            { id: 'amenity-6', icon: 'baby', title: 'Service Conciergerie', description: 'Notre conciergerie organise vos excursions, transferts et événements privés.' },
          ],
          columns: 3,
        },
        style: dLg,
      },
      {
        type: 'gallery-grid',
        variant: 'default',
        content: {
          title: 'Galerie',
          images: [
            { id: 'hotel-1', src: '', alt: 'Facade de la villa au coucher du soleil' },
            { id: 'hotel-2', src: '', alt: 'Suite Prestige avec vue panoramique' },
            { id: 'hotel-3', src: '', alt: 'Piscine à débordement' },
            { id: 'hotel-4', src: '', alt: 'Restaurant gastronomique' },
            { id: 'hotel-5', src: '', alt: 'Spa et espace bien-être' },
            { id: 'hotel-6', src: '', alt: 'Jardins du domaine' },
          ],
        },
        style: { background: 'custom', customBgColor: '#0d0b08', paddingY: 'lg' },
      },
      {
        type: 'testimonials',
        variant: 'default',
        content: {
          title: 'L\'avis de nos hôtes',
          items: [
            { id: 'rev-1', quote: 'Un lieu magique. Le personnel est aux petits soins, la suite Olivier est un rêve éveillé. Nous reviendrons chaque été.', author: 'Charlotte & Pierre', role: 'Paris', rating: 5 },
            { id: 'rev-2', quote: 'Cadre exceptionnel, cuisine sublime et un calme absolu. La perfection provençale existe, elle s\'appelle Villa Séraphine.', author: 'Marco B.', role: 'Milan', rating: 5 },
            { id: 'rev-3', quote: 'Le spa est divin, la piscine à couper le souffle. Un séjour parfait pour notre anniversaire de mariage.', author: 'Anne-Sophie L.', role: 'Lyon', rating: 5 },
          ],
        },
        style: dLg,
      },
      {
        type: 'contact',
        variant: 'default',
        content: {
          title: 'Réservation & Contact',
          subtitle: 'Notre équipe est à votre disposition pour organiser votre séjour sur-mesure',
          address: 'Chemin des Vignes, 84220 Gordes, Provence',
          phone: '+33 4 90 72 12 34',
          email: 'reservation@villaseraphine.fr',
        },
        style: { background: 'custom', customBgColor: '#0d0b08', paddingY: 'lg' },
      },
      {
        type: 'site-footer',
        variant: 'default',
        content: {
          logo: 'VILLA SÉRAPHINE',
          copyright: '© 2026 Villa Séraphine — Tous droits réservés',
          tagline: 'Hôtel de charme 5 étoiles — Gordes, Provence',
          socials: { instagram: '#', facebook: '#', tripadvisor: '#' },
        },
        style: { background: 'custom', customBgColor: '#080604', paddingY: 'md' },
      },
    ],
  },
]

// ─── Combined export ───

export const LIBRARY_TEMPLATES: LibraryTemplateItem[] = [
  ...BASIC_TEMPLATES,
  ...RICH_TEMPLATES,
  ...INDUSTRY_TEMPLATES,
]
