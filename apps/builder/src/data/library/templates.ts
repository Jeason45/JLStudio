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
