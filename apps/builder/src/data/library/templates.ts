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

// ─── Combined export ───

export const LIBRARY_TEMPLATES: LibraryTemplateItem[] = [
  ...BASIC_TEMPLATES,
  ...RICH_TEMPLATES,
]
