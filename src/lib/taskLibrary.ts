export interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  duration: number; // en jours
  priority: 'basse' | 'moyenne' | 'haute' | 'critique';
  category: string;
  dependencies?: string[]; // IDs des tâches dont celle-ci dépend
  tags?: string[];
}

export interface TaskCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  tasks: TaskTemplate[];
}

export const taskLibrary: TaskCategory[] = [
  {
    id: 'discovery',
    name: 'Découverte & Stratégie',
    icon: '🔍',
    color: '#818cf8',
    description: 'Phase de découverte, analyse et définition de la stratégie',
    tasks: [
      {
        id: 'discovery-1',
        title: 'Kickoff meeting initial',
        description: 'Réunion de lancement avec le client pour définir les objectifs, le scope et les attentes',
        duration: 1,
        priority: 'critique',
        category: 'discovery',
        tags: ['client', 'meeting', 'stratégie']
      },
      {
        id: 'discovery-2',
        title: 'Analyse des besoins client',
        description: 'Analyse détaillée des besoins fonctionnels et techniques du client',
        duration: 2,
        priority: 'critique',
        category: 'discovery',
        tags: ['analyse', 'besoins']
      },
      {
        id: 'discovery-3',
        title: 'Étude de la concurrence',
        description: 'Analyse des sites concurrents et benchmark du marché',
        duration: 2,
        priority: 'haute',
        category: 'discovery',
        tags: ['recherche', 'concurrence']
      },
      {
        id: 'discovery-4',
        title: 'Définition des personas',
        description: 'Création des profils utilisateurs types et leurs parcours',
        duration: 2,
        priority: 'haute',
        category: 'discovery',
        tags: ['ux', 'personas']
      },
      {
        id: 'discovery-5',
        title: 'Audit SEO du site existant',
        description: 'Analyse SEO complète si migration/refonte d\'un site existant',
        duration: 2,
        priority: 'moyenne',
        category: 'discovery',
        tags: ['seo', 'audit']
      },
      {
        id: 'discovery-6',
        title: 'Analyse des analytics existants',
        description: 'Étude des données Google Analytics/Matomo pour comprendre le comportement actuel',
        duration: 1,
        priority: 'moyenne',
        category: 'discovery',
        tags: ['analytics', 'data']
      },
      {
        id: 'discovery-7',
        title: 'Définition de l\'arborescence',
        description: 'Création de la structure du site et organisation des contenus',
        duration: 2,
        priority: 'haute',
        category: 'discovery',
        tags: ['architecture', 'structure']
      },
      {
        id: 'discovery-8',
        title: 'Rédaction du cahier des charges',
        description: 'Documentation complète des spécifications fonctionnelles et techniques',
        duration: 3,
        priority: 'haute',
        category: 'discovery',
        tags: ['documentation', 'specs']
      },
      {
        id: 'discovery-9',
        title: 'Choix de la stack technique',
        description: 'Sélection des technologies, frameworks et outils pour le projet',
        duration: 1,
        priority: 'critique',
        category: 'discovery',
        tags: ['technique', 'architecture']
      },
      {
        id: 'discovery-10',
        title: 'Planification du projet',
        description: 'Création du planning détaillé avec milestones et livrables',
        duration: 1,
        priority: 'haute',
        category: 'discovery',
        tags: ['planning', 'gestion']
      }
    ]
  },
  {
    id: 'design',
    name: 'Design & UX/UI',
    icon: '🎨',
    color: '#D4AF37',
    description: 'Conception visuelle et expérience utilisateur',
    tasks: [
      {
        id: 'design-1',
        title: 'Recherche d\'inspiration (moodboard)',
        description: 'Création d\'un moodboard avec références visuelles et tendances',
        duration: 1,
        priority: 'haute',
        category: 'design',
        tags: ['inspiration', 'créatif']
      },
      {
        id: 'design-2',
        title: 'Définition de la charte graphique',
        description: 'Création du guide de style : couleurs, typographies, éléments graphiques',
        duration: 3,
        priority: 'critique',
        category: 'design',
        tags: ['brand', 'charte']
      },
      {
        id: 'design-3',
        title: 'Création du design system',
        description: 'Conception des composants UI réutilisables (boutons, inputs, cards, etc.)',
        duration: 4,
        priority: 'haute',
        category: 'design',
        tags: ['design-system', 'composants']
      },
      {
        id: 'design-4',
        title: 'Wireframes basse fidélité',
        description: 'Création des wireframes pour définir la structure et le layout',
        duration: 3,
        priority: 'haute',
        category: 'design',
        tags: ['wireframes', 'ux']
      },
      {
        id: 'design-5',
        title: 'Maquettes desktop - Page d\'accueil',
        description: 'Design haute fidélité de la homepage en version desktop',
        duration: 3,
        priority: 'critique',
        category: 'design',
        tags: ['maquette', 'homepage']
      },
      {
        id: 'design-6',
        title: 'Maquettes desktop - Pages principales',
        description: 'Design des pages clés (À propos, Services, Contact, etc.)',
        duration: 5,
        priority: 'critique',
        category: 'design',
        tags: ['maquette', 'pages']
      },
      {
        id: 'design-7',
        title: 'Maquettes mobile & tablette',
        description: 'Adaptation responsive de toutes les maquettes',
        duration: 4,
        priority: 'haute',
        category: 'design',
        tags: ['responsive', 'mobile']
      },
      {
        id: 'design-8',
        title: 'Design des interactions & animations',
        description: 'Définition des micro-interactions et animations (hover, scroll, transitions)',
        duration: 2,
        priority: 'moyenne',
        category: 'design',
        tags: ['animations', 'interactions']
      },
      {
        id: 'design-9',
        title: 'Création des assets graphiques',
        description: 'Icônes, illustrations, images customisées',
        duration: 3,
        priority: 'moyenne',
        category: 'design',
        tags: ['assets', 'graphisme']
      },
      {
        id: 'design-10',
        title: 'Design du logo (si nécessaire)',
        description: 'Conception du logo et déclinaisons',
        duration: 5,
        priority: 'haute',
        category: 'design',
        tags: ['logo', 'brand']
      },
      {
        id: 'design-11',
        title: 'Prototype interactif',
        description: 'Création d\'un prototype cliquable sur Figma/Adobe XD',
        duration: 2,
        priority: 'moyenne',
        category: 'design',
        tags: ['prototype', 'ux']
      },
      {
        id: 'design-12',
        title: 'Tests utilisateurs (UX)',
        description: 'Tests avec vrais utilisateurs et ajustements',
        duration: 3,
        priority: 'moyenne',
        category: 'design',
        tags: ['testing', 'ux']
      },
      {
        id: 'design-13',
        title: 'Validation design client',
        description: 'Présentation et validation des maquettes finales',
        duration: 1,
        priority: 'critique',
        category: 'design',
        tags: ['validation', 'client']
      }
    ]
  },
  {
    id: 'frontend',
    name: 'Développement Front-end',
    icon: '💻',
    color: '#34d399',
    description: 'Intégration et développement de l\'interface utilisateur',
    tasks: [
      {
        id: 'frontend-1',
        title: 'Setup du projet & environnement',
        description: 'Initialisation du repo, installation des dépendances, configuration',
        duration: 1,
        priority: 'critique',
        category: 'frontend',
        tags: ['setup', 'config']
      },
      {
        id: 'frontend-2',
        title: 'Configuration du système de design',
        description: 'Setup Tailwind/CSS, variables, thème, composants de base',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['design-system', 'css']
      },
      {
        id: 'frontend-3',
        title: 'Intégration Header & Navigation',
        description: 'Développement du header responsive avec menu de navigation',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['header', 'navigation']
      },
      {
        id: 'frontend-4',
        title: 'Intégration Footer',
        description: 'Développement du footer avec liens, infos légales, etc.',
        duration: 1,
        priority: 'moyenne',
        category: 'frontend',
        tags: ['footer', 'layout']
      },
      {
        id: 'frontend-5',
        title: 'Page d\'accueil - Hero section',
        description: 'Intégration de la section hero avec animations',
        duration: 2,
        priority: 'critique',
        category: 'frontend',
        tags: ['homepage', 'hero']
      },
      {
        id: 'frontend-6',
        title: 'Page d\'accueil - Sections principales',
        description: 'Intégration de toutes les sections de la homepage',
        duration: 4,
        priority: 'critique',
        category: 'frontend',
        tags: ['homepage', 'sections']
      },
      {
        id: 'frontend-7',
        title: 'Page À propos',
        description: 'Intégration complète de la page about',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['pages', 'about']
      },
      {
        id: 'frontend-8',
        title: 'Page Services/Prestations',
        description: 'Intégration de la page services avec détails des offres',
        duration: 3,
        priority: 'haute',
        category: 'frontend',
        tags: ['pages', 'services']
      },
      {
        id: 'frontend-9',
        title: 'Page Portfolio/Réalisations',
        description: 'Galerie de projets avec filtres et pages détails',
        duration: 4,
        priority: 'haute',
        category: 'frontend',
        tags: ['portfolio', 'galerie']
      },
      {
        id: 'frontend-10',
        title: 'Page Contact',
        description: 'Formulaire de contact et informations',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['contact', 'form']
      },
      {
        id: 'frontend-11',
        title: 'Page Blog/Actualités',
        description: 'Liste des articles et template article',
        duration: 3,
        priority: 'moyenne',
        category: 'frontend',
        tags: ['blog', 'content']
      },
      {
        id: 'frontend-12',
        title: 'Animations & Interactions',
        description: 'Implémentation des animations scroll, hover, transitions',
        duration: 3,
        priority: 'moyenne',
        category: 'frontend',
        tags: ['animations', 'interactions']
      },
      {
        id: 'frontend-13',
        title: 'Optimisation responsive',
        description: 'Tests et ajustements responsive sur tous les breakpoints',
        duration: 3,
        priority: 'haute',
        category: 'frontend',
        tags: ['responsive', 'mobile']
      },
      {
        id: 'frontend-14',
        title: 'Accessibilité (a11y)',
        description: 'Implémentation des standards WCAG, ARIA, navigation clavier',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['a11y', 'accessibilité']
      },
      {
        id: 'frontend-15',
        title: 'Optimisation des performances',
        description: 'Lazy loading, optimisation images, code splitting, etc.',
        duration: 2,
        priority: 'haute',
        category: 'frontend',
        tags: ['performance', 'optimisation']
      }
    ]
  },
  {
    id: 'backend',
    name: 'Développement Back-end',
    icon: '⚙️',
    color: '#a78bfa',
    description: 'Développement serveur, API et base de données',
    tasks: [
      {
        id: 'backend-1',
        title: 'Architecture & modélisation BDD',
        description: 'Définition du schéma de base de données et relations',
        duration: 2,
        priority: 'critique',
        category: 'backend',
        tags: ['database', 'architecture']
      },
      {
        id: 'backend-2',
        title: 'Setup API & routes',
        description: 'Configuration de l\'API REST/GraphQL et système de routing',
        duration: 2,
        priority: 'critique',
        category: 'backend',
        tags: ['api', 'setup']
      },
      {
        id: 'backend-3',
        title: 'Système d\'authentification',
        description: 'Mise en place de l\'auth (JWT, OAuth, etc.)',
        duration: 3,
        priority: 'critique',
        category: 'backend',
        tags: ['auth', 'sécurité']
      },
      {
        id: 'backend-4',
        title: 'Gestion des utilisateurs',
        description: 'CRUD utilisateurs, profils, rôles et permissions',
        duration: 3,
        priority: 'haute',
        category: 'backend',
        tags: ['users', 'crud']
      },
      {
        id: 'backend-5',
        title: 'API Formulaire de contact',
        description: 'Endpoint pour traiter et envoyer les formulaires de contact',
        duration: 1,
        priority: 'haute',
        category: 'backend',
        tags: ['contact', 'email']
      },
      {
        id: 'backend-6',
        title: 'Système d\'envoi d\'emails',
        description: 'Configuration SMTP, templates emails (confirmations, notifications)',
        duration: 2,
        priority: 'haute',
        category: 'backend',
        tags: ['email', 'notifications']
      },
      {
        id: 'backend-7',
        title: 'Upload et gestion des fichiers',
        description: 'Système d\'upload d\'images/fichiers avec validation et stockage',
        duration: 2,
        priority: 'moyenne',
        category: 'backend',
        tags: ['upload', 'files']
      },
      {
        id: 'backend-8',
        title: 'CMS / Admin panel',
        description: 'Interface d\'administration pour gérer le contenu',
        duration: 5,
        priority: 'haute',
        category: 'backend',
        tags: ['cms', 'admin']
      },
      {
        id: 'backend-9',
        title: 'API Blog/Articles',
        description: 'Endpoints pour la gestion des articles (CRUD)',
        duration: 2,
        priority: 'moyenne',
        category: 'backend',
        tags: ['blog', 'api']
      },
      {
        id: 'backend-10',
        title: 'Système de recherche',
        description: 'Implémentation de la recherche full-text',
        duration: 2,
        priority: 'moyenne',
        category: 'backend',
        tags: ['search', 'feature']
      },
      {
        id: 'backend-11',
        title: 'API Analytics',
        description: 'Endpoints pour tracker les statistiques et événements',
        duration: 2,
        priority: 'basse',
        category: 'backend',
        tags: ['analytics', 'tracking']
      },
      {
        id: 'backend-12',
        title: 'Cache & optimisation',
        description: 'Mise en place de Redis/cache pour optimiser les performances',
        duration: 2,
        priority: 'moyenne',
        category: 'backend',
        tags: ['cache', 'performance']
      },
      {
        id: 'backend-13',
        title: 'Rate limiting & sécurité',
        description: 'Protection contre spam, DDoS, injections SQL, XSS',
        duration: 2,
        priority: 'critique',
        category: 'backend',
        tags: ['sécurité', 'protection']
      },
      {
        id: 'backend-14',
        title: 'Logs & monitoring',
        description: 'Système de logs et monitoring des erreurs',
        duration: 1,
        priority: 'moyenne',
        category: 'backend',
        tags: ['logs', 'monitoring']
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    color: '#f59e0b',
    description: 'Fonctionnalités spécifiques e-commerce',
    tasks: [
      {
        id: 'ecommerce-1',
        title: 'Catalogue produits',
        description: 'Base de données et affichage des produits avec catégories',
        duration: 3,
        priority: 'critique',
        category: 'ecommerce',
        tags: ['produits', 'catalogue']
      },
      {
        id: 'ecommerce-2',
        title: 'Fiches produits détaillées',
        description: 'Pages produits avec photos, descriptions, variantes, stock',
        duration: 3,
        priority: 'critique',
        category: 'ecommerce',
        tags: ['produits', 'détails']
      },
      {
        id: 'ecommerce-3',
        title: 'Système de filtres & recherche',
        description: 'Filtres avancés (prix, catégorie, attributs) et recherche',
        duration: 3,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['search', 'filtres']
      },
      {
        id: 'ecommerce-4',
        title: 'Panier d\'achat',
        description: 'Gestion du panier avec ajout/suppression/modification quantités',
        duration: 3,
        priority: 'critique',
        category: 'ecommerce',
        tags: ['panier', 'cart']
      },
      {
        id: 'ecommerce-5',
        title: 'Tunnel de commande',
        description: 'Process de checkout (infos client, livraison, paiement)',
        duration: 4,
        priority: 'critique',
        category: 'ecommerce',
        tags: ['checkout', 'commande']
      },
      {
        id: 'ecommerce-6',
        title: 'Intégration paiement (Stripe/PayPal)',
        description: 'Mise en place des moyens de paiement sécurisés',
        duration: 3,
        priority: 'critique',
        category: 'ecommerce',
        tags: ['paiement', 'stripe']
      },
      {
        id: 'ecommerce-7',
        title: 'Gestion des commandes',
        description: 'Backend pour gérer le statut des commandes',
        duration: 3,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['commandes', 'admin']
      },
      {
        id: 'ecommerce-8',
        title: 'Espace client',
        description: 'Dashboard client avec historique commandes, favoris, infos perso',
        duration: 4,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['compte', 'dashboard']
      },
      {
        id: 'ecommerce-9',
        title: 'Système de stock',
        description: 'Gestion automatique des stocks et alertes',
        duration: 2,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['stock', 'inventory']
      },
      {
        id: 'ecommerce-10',
        title: 'Codes promo & réductions',
        description: 'Système de coupons de réduction et promotions',
        duration: 2,
        priority: 'moyenne',
        category: 'ecommerce',
        tags: ['promo', 'réductions']
      },
      {
        id: 'ecommerce-11',
        title: 'Calcul frais de livraison',
        description: 'Tarifs de livraison selon zone géographique et poids',
        duration: 2,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['livraison', 'shipping']
      },
      {
        id: 'ecommerce-12',
        title: 'Emails transactionnels',
        description: 'Confirmations commande, expédition, factures par email',
        duration: 2,
        priority: 'haute',
        category: 'ecommerce',
        tags: ['email', 'notifications']
      },
      {
        id: 'ecommerce-13',
        title: 'Avis clients & notes',
        description: 'Système de reviews et évaluations produits',
        duration: 2,
        priority: 'moyenne',
        category: 'ecommerce',
        tags: ['reviews', 'ratings']
      },
      {
        id: 'ecommerce-14',
        title: 'Wishlist / Favoris',
        description: 'Liste de souhaits pour les produits',
        duration: 1,
        priority: 'basse',
        category: 'ecommerce',
        tags: ['wishlist', 'favoris']
      },
      {
        id: 'ecommerce-15',
        title: 'Produits recommandés',
        description: 'Système de recommandations et cross-selling',
        duration: 2,
        priority: 'basse',
        category: 'ecommerce',
        tags: ['recommendations', 'upsell']
      }
    ]
  },
  {
    id: 'content',
    name: 'Contenu & SEO',
    icon: '📝',
    color: '#10b981',
    description: 'Création de contenu et optimisation SEO',
    tasks: [
      {
        id: 'content-1',
        title: 'Rédaction des contenus homepage',
        description: 'Rédaction et optimisation SEO des textes de la page d\'accueil',
        duration: 2,
        priority: 'haute',
        category: 'content',
        tags: ['rédaction', 'homepage']
      },
      {
        id: 'content-2',
        title: 'Rédaction page À propos',
        description: 'Storytelling et présentation de l\'entreprise/projet',
        duration: 2,
        priority: 'haute',
        category: 'content',
        tags: ['rédaction', 'about']
      },
      {
        id: 'content-3',
        title: 'Rédaction pages Services',
        description: 'Description détaillée de chaque service/offre',
        duration: 3,
        priority: 'haute',
        category: 'content',
        tags: ['rédaction', 'services']
      },
      {
        id: 'content-4',
        title: 'Création cases studies/Portfolio',
        description: 'Rédaction des études de cas et projets réalisés',
        duration: 4,
        priority: 'moyenne',
        category: 'content',
        tags: ['portfolio', 'case-study']
      },
      {
        id: 'content-5',
        title: 'Optimisation SEO on-page',
        description: 'Meta titles, descriptions, balises Hn, alt texts, schema markup',
        duration: 3,
        priority: 'critique',
        category: 'content',
        tags: ['seo', 'optimisation']
      },
      {
        id: 'content-6',
        title: 'Recherche mots-clés',
        description: 'Analyse et sélection des mots-clés stratégiques',
        duration: 2,
        priority: 'haute',
        category: 'content',
        tags: ['seo', 'keywords']
      },
      {
        id: 'content-7',
        title: 'Optimisation des images',
        description: 'Compression, formats WebP/AVIF, responsive images, lazy loading',
        duration: 2,
        priority: 'haute',
        category: 'content',
        tags: ['images', 'performance']
      },
      {
        id: 'content-8',
        title: 'Création sitemap XML',
        description: 'Génération et soumission du sitemap aux moteurs de recherche',
        duration: 1,
        priority: 'haute',
        category: 'content',
        tags: ['seo', 'sitemap']
      },
      {
        id: 'content-9',
        title: 'Configuration robots.txt',
        description: 'Fichier robots.txt optimisé pour le crawling',
        duration: 1,
        priority: 'moyenne',
        category: 'content',
        tags: ['seo', 'robots']
      },
      {
        id: 'content-10',
        title: 'Rédaction articles de blog',
        description: 'Création de 5-10 articles de blog optimisés SEO',
        duration: 10,
        priority: 'moyenne',
        category: 'content',
        tags: ['blog', 'rédaction']
      },
      {
        id: 'content-11',
        title: 'Stratégie de contenu',
        description: 'Plan éditorial et calendrier de publication',
        duration: 2,
        priority: 'moyenne',
        category: 'content',
        tags: ['stratégie', 'planning']
      },
      {
        id: 'content-12',
        title: 'Pages légales',
        description: 'Rédaction mentions légales, CGV, politique de confidentialité, cookies',
        duration: 2,
        priority: 'critique',
        category: 'content',
        tags: ['légal', 'rgpd']
      }
    ]
  },
  {
    id: 'testing',
    name: 'Tests & QA',
    icon: '🧪',
    color: '#ec4899',
    description: 'Tests qualité et validation',
    tasks: [
      {
        id: 'testing-1',
        title: 'Tests fonctionnels',
        description: 'Vérification de toutes les fonctionnalités et interactions',
        duration: 3,
        priority: 'critique',
        category: 'testing',
        tags: ['testing', 'qa']
      },
      {
        id: 'testing-2',
        title: 'Tests responsive multi-devices',
        description: 'Tests sur différents devices (mobile, tablette, desktop)',
        duration: 2,
        priority: 'critique',
        category: 'testing',
        tags: ['responsive', 'devices']
      },
      {
        id: 'testing-3',
        title: 'Tests cross-browser',
        description: 'Vérification sur Chrome, Firefox, Safari, Edge',
        duration: 2,
        priority: 'haute',
        category: 'testing',
        tags: ['browsers', 'compatibilité']
      },
      {
        id: 'testing-4',
        title: 'Tests de performance',
        description: 'Lighthouse, PageSpeed, GTmetrix - optimisations',
        duration: 2,
        priority: 'haute',
        category: 'testing',
        tags: ['performance', 'lighthouse']
      },
      {
        id: 'testing-5',
        title: 'Tests d\'accessibilité',
        description: 'Validation WCAG, tests avec screen readers',
        duration: 2,
        priority: 'haute',
        category: 'testing',
        tags: ['a11y', 'wcag']
      },
      {
        id: 'testing-6',
        title: 'Tests de sécurité',
        description: 'Scan de vulnérabilités, tests de pénétration basiques',
        duration: 2,
        priority: 'critique',
        category: 'testing',
        tags: ['sécurité', 'security']
      },
      {
        id: 'testing-7',
        title: 'Tests de formulaires',
        description: 'Validation de tous les formulaires et gestion d\'erreurs',
        duration: 1,
        priority: 'haute',
        category: 'testing',
        tags: ['forms', 'validation']
      },
      {
        id: 'testing-8',
        title: 'Tests SEO technique',
        description: 'Vérification meta tags, structured data, crawlability',
        duration: 1,
        priority: 'haute',
        category: 'testing',
        tags: ['seo', 'technique']
      },
      {
        id: 'testing-9',
        title: 'Tests de charge',
        description: 'Simulation de trafic élevé et test de scalabilité',
        duration: 1,
        priority: 'moyenne',
        category: 'testing',
        tags: ['performance', 'load']
      },
      {
        id: 'testing-10',
        title: 'Corrections bugs & ajustements',
        description: 'Résolution de tous les bugs identifiés pendant les tests',
        duration: 5,
        priority: 'critique',
        category: 'testing',
        tags: ['bugfix', 'corrections']
      },
      {
        id: 'testing-11',
        title: 'Recette client',
        description: 'Tests et validation par le client avec feedback',
        duration: 3,
        priority: 'critique',
        category: 'testing',
        tags: ['client', 'validation']
      },
      {
        id: 'testing-12',
        title: 'Tests emails',
        description: 'Vérification de tous les emails automatiques sur différents clients',
        duration: 1,
        priority: 'haute',
        category: 'testing',
        tags: ['email', 'testing']
      },
      {
        id: 'testing-13',
        title: 'Corrections des bugs identifiés',
        description: 'Correction des bugs et problèmes identifiés lors de la phase de tests',
        duration: 5,
        priority: 'haute',
        category: 'testing',
        tags: ['bug-fixes', 'corrections', 'quality']
      }
    ]
  },
  {
    id: 'deployment',
    name: 'Déploiement & Mise en ligne',
    icon: '🚀',
    color: '#06b6d4',
    description: 'Préparation et mise en production',
    tasks: [
      {
        id: 'deployment-1',
        title: 'Configuration serveur de production',
        description: 'Setup du serveur, environnement de prod, variables d\'env',
        duration: 2,
        priority: 'critique',
        category: 'deployment',
        tags: ['serveur', 'config']
      },
      {
        id: 'deployment-2',
        title: 'Configuration domaine & DNS',
        description: 'Pointage du domaine, configuration DNS, certificat SSL',
        duration: 1,
        priority: 'critique',
        category: 'deployment',
        tags: ['domaine', 'dns', 'ssl']
      },
      {
        id: 'deployment-3',
        title: 'Configuration base de données production',
        description: 'Setup BDD prod, migrations, backup automatique',
        duration: 1,
        priority: 'critique',
        category: 'deployment',
        tags: ['database', 'prod']
      },
      {
        id: 'deployment-4',
        title: 'Configuration CDN',
        description: 'Setup CDN (Cloudflare, etc.) pour les assets statiques',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['cdn', 'performance']
      },
      {
        id: 'deployment-5',
        title: 'Pipeline CI/CD',
        description: 'Configuration déploiement automatique (GitHub Actions, etc.)',
        duration: 2,
        priority: 'moyenne',
        category: 'deployment',
        tags: ['ci-cd', 'automation']
      },
      {
        id: 'deployment-6',
        title: 'Migration contenu',
        description: 'Transfert du contenu de staging vers production',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['migration', 'contenu']
      },
      {
        id: 'deployment-7',
        title: 'Configuration emails production',
        description: 'Setup SMTP prod, vérification SPF/DKIM/DMARC',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['email', 'smtp']
      },
      {
        id: 'deployment-8',
        title: 'Configuration analytics',
        description: 'Setup Google Analytics, Tag Manager, pixels tracking',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['analytics', 'tracking']
      },
      {
        id: 'deployment-9',
        title: 'Configuration monitoring',
        description: 'Setup outils de monitoring (uptime, erreurs, performance)',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['monitoring', 'alertes']
      },
      {
        id: 'deployment-10',
        title: 'Mise en ligne',
        description: 'Déploiement final en production',
        duration: 1,
        priority: 'critique',
        category: 'deployment',
        tags: ['go-live', 'production']
      },
      {
        id: 'deployment-11',
        title: 'Tests post-déploiement',
        description: 'Vérifications complètes après mise en ligne',
        duration: 1,
        priority: 'critique',
        category: 'deployment',
        tags: ['testing', 'validation']
      },
      {
        id: 'deployment-12',
        title: 'Redirections 301',
        description: 'Configuration des redirections si migration d\'ancien site',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['seo', 'redirections']
      },
      {
        id: 'deployment-13',
        title: 'Soumission aux moteurs de recherche',
        description: 'Indexation Google Search Console, Bing Webmaster',
        duration: 1,
        priority: 'haute',
        category: 'deployment',
        tags: ['seo', 'indexation']
      }
    ]
  },
  {
    id: 'maintenance',
    name: 'Formation & Maintenance',
    icon: '📚',
    color: '#8b5cf6',
    description: 'Formation client et support post-lancement',
    tasks: [
      {
        id: 'maintenance-1',
        title: 'Documentation technique',
        description: 'Rédaction de la doc technique du projet',
        duration: 3,
        priority: 'haute',
        category: 'maintenance',
        tags: ['documentation', 'dev']
      },
      {
        id: 'maintenance-2',
        title: 'Guide utilisateur',
        description: 'Création d\'un guide pour le client (CMS, admin)',
        duration: 2,
        priority: 'haute',
        category: 'maintenance',
        tags: ['documentation', 'guide']
      },
      {
        id: 'maintenance-3',
        title: 'Formation client au CMS',
        description: 'Session de formation pour gérer le contenu',
        duration: 1,
        priority: 'haute',
        category: 'maintenance',
        tags: ['formation', 'cms']
      },
      {
        id: 'maintenance-4',
        title: 'Vidéos tutoriels',
        description: 'Création de vidéos explicatives pour le client',
        duration: 2,
        priority: 'moyenne',
        category: 'maintenance',
        tags: ['formation', 'vidéo']
      },
      {
        id: 'maintenance-5',
        title: 'Garantie & corrections (1 mois)',
        description: 'Période de garantie avec corrections mineures incluses',
        duration: 20,
        priority: 'haute',
        category: 'maintenance',
        tags: ['garantie', 'support']
      },
      {
        id: 'maintenance-6',
        title: 'Mises à jour de sécurité',
        description: 'Updates régulières des dépendances et patches sécurité',
        duration: 1,
        priority: 'critique',
        category: 'maintenance',
        tags: ['sécurité', 'updates']
      },
      {
        id: 'maintenance-7',
        title: 'Backup automatique',
        description: 'Configuration système de sauvegarde régulière',
        duration: 1,
        priority: 'critique',
        category: 'maintenance',
        tags: ['backup', 'sécurité']
      },
      {
        id: 'maintenance-8',
        title: 'Rapport d\'analytics mensuel',
        description: 'Analyse des performances et recommandations',
        duration: 1,
        priority: 'moyenne',
        category: 'maintenance',
        tags: ['analytics', 'reporting']
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Fonctionnalités Avancées',
    icon: '⚡',
    color: '#f43f5e',
    description: 'Features avancées et intégrations tierces',
    tasks: [
      {
        id: 'advanced-1',
        title: 'Multilingue (i18n)',
        description: 'Implémentation du site en plusieurs langues',
        duration: 5,
        priority: 'haute',
        category: 'advanced',
        tags: ['i18n', 'multilangue']
      },
      {
        id: 'advanced-2',
        title: 'PWA (Progressive Web App)',
        description: 'Transformation en PWA avec offline mode',
        duration: 3,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['pwa', 'offline']
      },
      {
        id: 'advanced-3',
        title: 'Chatbot / Live chat',
        description: 'Intégration d\'un système de chat en direct',
        duration: 2,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['chat', 'support']
      },
      {
        id: 'advanced-4',
        title: 'Newsletter & automation email',
        description: 'Système de newsletter avec Mailchimp/Sendinblue',
        duration: 2,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['newsletter', 'email']
      },
      {
        id: 'advanced-5',
        title: 'Intégration CRM',
        description: 'Connexion avec CRM externe (HubSpot, Salesforce)',
        duration: 3,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['crm', 'integration']
      },
      {
        id: 'advanced-6',
        title: 'API tierces (Maps, etc.)',
        description: 'Intégration Google Maps, météo, réseaux sociaux',
        duration: 2,
        priority: 'basse',
        category: 'advanced',
        tags: ['api', 'integration']
      },
      {
        id: 'advanced-7',
        title: 'Réservation / Booking system',
        description: 'Système de prise de rendez-vous en ligne',
        duration: 5,
        priority: 'haute',
        category: 'advanced',
        tags: ['booking', 'réservation']
      },
      {
        id: 'advanced-8',
        title: 'Espace membre avancé',
        description: 'Dashboard membres avec contenu exclusif, communauté',
        duration: 7,
        priority: 'haute',
        category: 'advanced',
        tags: ['membres', 'dashboard']
      },
      {
        id: 'advanced-9',
        title: 'Forum / Communauté',
        description: 'Système de forum ou espace communautaire',
        duration: 8,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['forum', 'communauté']
      },
      {
        id: 'advanced-10',
        title: 'Abonnements / Subscriptions',
        description: 'Gestion d\'abonnements récurrents (Stripe Subscriptions)',
        duration: 4,
        priority: 'haute',
        category: 'advanced',
        tags: ['subscription', 'paiement']
      },
      {
        id: 'advanced-11',
        title: 'Marketplace / Multi-vendor',
        description: 'Plateforme multi-vendeurs avec commissions',
        duration: 15,
        priority: 'haute',
        category: 'advanced',
        tags: ['marketplace', 'vendors']
      },
      {
        id: 'advanced-12',
        title: 'Système de notifications',
        description: 'Notifications push, emails, in-app',
        duration: 3,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['notifications', 'push']
      },
      {
        id: 'advanced-13',
        title: 'Dark mode',
        description: 'Implémentation du mode sombre avec switch',
        duration: 2,
        priority: 'basse',
        category: 'advanced',
        tags: ['ui', 'dark-mode']
      },
      {
        id: 'advanced-14',
        title: 'WebRTC / Visio',
        description: 'Système de visioconférence intégré',
        duration: 7,
        priority: 'moyenne',
        category: 'advanced',
        tags: ['webrtc', 'video']
      },
      {
        id: 'advanced-15',
        title: 'IA / Chatbot intelligent',
        description: 'Intégration d\'IA pour chatbot ou recommandations',
        duration: 5,
        priority: 'basse',
        category: 'advanced',
        tags: ['ai', 'ml']
      }
    ]
  },
  {
    id: 'client-communication',
    name: 'Client & Communication',
    icon: '🤝',
    color: '#14b8a6',
    description: 'Gestion de la relation client et communication projet',
    tasks: [
      {
        id: 'client-1',
        title: 'Signature du contrat',
        description: 'Signature du contrat de prestation entre client et agence',
        duration: 1,
        priority: 'critique',
        category: 'client-communication',
        tags: ['contrat', 'légal', 'admin']
      },
      {
        id: 'client-2',
        title: 'Validation et signature du devis',
        description: 'Présentation, validation et signature du devis détaillé',
        duration: 1,
        priority: 'critique',
        category: 'client-communication',
        tags: ['devis', 'commercial', 'admin']
      },
      {
        id: 'client-3',
        title: 'Facturation acompte (30-50%)',
        description: 'Émission et encaissement de la facture d\'acompte',
        duration: 1,
        priority: 'critique',
        category: 'client-communication',
        tags: ['facturation', 'paiement', 'admin']
      },
      {
        id: 'client-4',
        title: 'Réunions de suivi hebdomadaires',
        description: 'Points hebdomadaires avec le client sur l\'avancement',
        duration: 1,
        priority: 'haute',
        category: 'client-communication',
        tags: ['meeting', 'suivi', 'communication']
      },
      {
        id: 'client-5',
        title: 'Présentation jalons & livrables',
        description: 'Présentation des livrables majeurs (maquettes, bêta, etc.)',
        duration: 1,
        priority: 'haute',
        category: 'client-communication',
        tags: ['présentation', 'livrables', 'validation']
      },
      {
        id: 'client-6',
        title: 'Gestion des feedbacks client',
        description: 'Collecte, priorisation et intégration des retours client',
        duration: 2,
        priority: 'haute',
        category: 'client-communication',
        tags: ['feedback', 'ajustements', 'communication']
      },
      {
        id: 'client-7',
        title: 'Facturation intermédiaire',
        description: 'Facturation des jalons intermédiaires selon planning',
        duration: 1,
        priority: 'haute',
        category: 'client-communication',
        tags: ['facturation', 'paiement', 'admin']
      },
      {
        id: 'client-8',
        title: 'Validation finale client',
        description: 'Validation complète du projet avant mise en ligne',
        duration: 2,
        priority: 'critique',
        category: 'client-communication',
        tags: ['validation', 'recette', 'go-live']
      },
      {
        id: 'client-9',
        title: 'Facturation solde final',
        description: 'Émission de la facture de solde après livraison',
        duration: 1,
        priority: 'critique',
        category: 'client-communication',
        tags: ['facturation', 'paiement', 'clôture']
      },
      {
        id: 'client-10',
        title: 'Bilan de projet',
        description: 'Réunion de clôture et retour d\'expérience avec le client',
        duration: 1,
        priority: 'moyenne',
        category: 'client-communication',
        tags: ['bilan', 'retex', 'communication']
      },
      {
        id: 'client-11',
        title: 'Validation design par client',
        description: 'Présentation et validation des maquettes design par le client',
        duration: 2,
        priority: 'critique',
        category: 'client-communication',
        tags: ['validation', 'design', 'maquettes']
      },
      {
        id: 'client-12',
        title: 'Validation contenu par client',
        description: 'Validation des textes, images et contenus intégrés',
        duration: 2,
        priority: 'haute',
        category: 'client-communication',
        tags: ['validation', 'contenu', 'review']
      },
      {
        id: 'client-13',
        title: 'Recette fonctionnelle client',
        description: 'Tests fonctionnels et validation par le client avant déploiement',
        duration: 3,
        priority: 'critique',
        category: 'client-communication',
        tags: ['recette', 'tests', 'validation']
      }
    ]
  },
  {
    id: 'design-assets',
    name: 'Design Assets & Détails',
    icon: '🖼️',
    color: '#fb923c',
    description: 'Création des assets graphiques et détails visuels',
    tasks: [
      {
        id: 'design-assets-1',
        title: 'Design pages d\'erreur (404, 500)',
        description: 'Création des maquettes pour pages d\'erreur personnalisées',
        duration: 1,
        priority: 'moyenne',
        category: 'design-assets',
        tags: ['design', 'erreur', 'ux']
      },
      {
        id: 'design-assets-2',
        title: 'Design templates emails',
        description: 'Création des templates HTML pour emails transactionnels',
        duration: 2,
        priority: 'haute',
        category: 'design-assets',
        tags: ['email', 'templates', 'design']
      },
      {
        id: 'design-assets-3',
        title: 'Favicon & App icons',
        description: 'Création du favicon et icônes pour différentes plateformes',
        duration: 1,
        priority: 'haute',
        category: 'design-assets',
        tags: ['favicon', 'icons', 'brand']
      },
      {
        id: 'design-assets-4',
        title: 'Open Graph & Social images',
        description: 'Création des images de partage pour réseaux sociaux (OG, Twitter)',
        duration: 1,
        priority: 'haute',
        category: 'design-assets',
        tags: ['og', 'social', 'seo']
      },
      {
        id: 'design-assets-5',
        title: 'Loader & States vides',
        description: 'Design des loaders, états de chargement et pages vides',
        duration: 1,
        priority: 'moyenne',
        category: 'design-assets',
        tags: ['ui', 'states', 'loader']
      },
      {
        id: 'design-assets-6',
        title: 'Design print (PDF, factures)',
        description: 'Templates pour documents imprimables (factures, devis, etc.)',
        duration: 2,
        priority: 'moyenne',
        category: 'design-assets',
        tags: ['print', 'pdf', 'templates']
      }
    ]
  },
  {
    id: 'frontend-features',
    name: 'Fonctionnalités Front-end Essentielles',
    icon: '⚡',
    color: '#a855f7',
    description: 'Fonctionnalités indispensables côté client',
    tasks: [
      {
        id: 'frontend-feat-1',
        title: 'Configuration Git & versioning',
        description: 'Setup du repository, branches, .gitignore, workflow Git',
        duration: 1,
        priority: 'critique',
        category: 'frontend-features',
        tags: ['git', 'versioning', 'setup']
      },
      {
        id: 'frontend-feat-2',
        title: 'Pages d\'erreur personnalisées',
        description: 'Intégration des pages 404, 500, 403 personnalisées',
        duration: 1,
        priority: 'moyenne',
        category: 'frontend-features',
        tags: ['erreur', 'pages', 'ux']
      },
      {
        id: 'frontend-feat-3',
        title: 'Banner cookies / RGPD',
        description: 'Implémentation du banner de consentement cookies conforme RGPD',
        duration: 2,
        priority: 'critique',
        category: 'frontend-features',
        tags: ['rgpd', 'cookies', 'légal']
      },
      {
        id: 'frontend-feat-4',
        title: 'Breadcrumbs / Fil d\'Ariane',
        description: 'Système de navigation breadcrumbs sur toutes les pages',
        duration: 1,
        priority: 'moyenne',
        category: 'frontend-features',
        tags: ['navigation', 'breadcrumbs', 'ux']
      },
      {
        id: 'frontend-feat-5',
        title: 'Pagination',
        description: 'Système de pagination pour listes (articles, produits, etc.)',
        duration: 1,
        priority: 'haute',
        category: 'frontend-features',
        tags: ['pagination', 'ui', 'navigation']
      },
      {
        id: 'frontend-feat-6',
        title: 'Partage réseaux sociaux',
        description: 'Boutons de partage Facebook, Twitter, LinkedIn, WhatsApp',
        duration: 1,
        priority: 'moyenne',
        category: 'frontend-features',
        tags: ['social', 'partage', 'marketing']
      },
      {
        id: 'frontend-feat-7',
        title: 'Formulaires multi-étapes',
        description: 'Formulaires complexes avec validation par étape',
        duration: 3,
        priority: 'moyenne',
        category: 'frontend-features',
        tags: ['forms', 'multistep', 'ux']
      },
      {
        id: 'frontend-feat-8',
        title: 'Lazy loading images & vidéos',
        description: 'Chargement différé des médias pour optimiser la performance',
        duration: 1,
        priority: 'haute',
        category: 'frontend-features',
        tags: ['performance', 'lazy-load', 'optimisation']
      },
      {
        id: 'frontend-feat-9',
        title: 'Mode maintenance',
        description: 'Page de maintenance pour mises à jour et interventions',
        duration: 1,
        priority: 'moyenne',
        category: 'frontend-features',
        tags: ['maintenance', 'ux', 'admin']
      },
      {
        id: 'frontend-feat-10',
        title: 'Recherche globale',
        description: 'Barre de recherche globale avec suggestions',
        duration: 3,
        priority: 'haute',
        category: 'frontend-features',
        tags: ['search', 'feature', 'ux']
      }
    ]
  },
  {
    id: 'seo-advanced',
    name: 'SEO Avancé',
    icon: '📈',
    color: '#22c55e',
    description: 'Optimisations SEO poussées et techniques',
    tasks: [
      {
        id: 'seo-1',
        title: 'Schema.org / Rich Snippets',
        description: 'Implémentation du balisage Schema.org pour résultats enrichis',
        duration: 2,
        priority: 'haute',
        category: 'seo-advanced',
        tags: ['schema', 'structured-data', 'seo']
      },
      {
        id: 'seo-2',
        title: 'Optimisation Core Web Vitals',
        description: 'Optimisation LCP, FID, CLS pour Google Page Experience',
        duration: 3,
        priority: 'haute',
        category: 'seo-advanced',
        tags: ['performance', 'core-web-vitals', 'google']
      },
      {
        id: 'seo-3',
        title: 'Sitemap dynamique',
        description: 'Génération automatique du sitemap XML avec contenu dynamique',
        duration: 1,
        priority: 'haute',
        category: 'seo-advanced',
        tags: ['sitemap', 'seo', 'automation']
      },
      {
        id: 'seo-4',
        title: 'Robots.txt intelligent',
        description: 'Configuration avancée du robots.txt selon environnement',
        duration: 1,
        priority: 'moyenne',
        category: 'seo-advanced',
        tags: ['robots', 'seo', 'crawling']
      },
      {
        id: 'seo-5',
        title: 'Optimisation des fonts',
        description: 'Font loading strategy, subset fonts, font-display',
        duration: 1,
        priority: 'moyenne',
        category: 'seo-advanced',
        tags: ['fonts', 'performance', 'optimisation']
      },
      {
        id: 'seo-6',
        title: 'URLs canoniques',
        description: 'Gestion des canonical URLs et duplicate content',
        duration: 1,
        priority: 'haute',
        category: 'seo-advanced',
        tags: ['canonical', 'seo', 'duplicate']
      },
      {
        id: 'seo-7',
        title: 'Hreflang (multi-langue)',
        description: 'Configuration hreflang pour sites multilingues',
        duration: 1,
        priority: 'moyenne',
        category: 'seo-advanced',
        tags: ['hreflang', 'i18n', 'seo']
      },
      {
        id: 'seo-8',
        title: 'AMP (Accelerated Mobile Pages)',
        description: 'Version AMP des pages principales pour mobile',
        duration: 4,
        priority: 'basse',
        category: 'seo-advanced',
        tags: ['amp', 'mobile', 'performance']
      }
    ]
  },
  {
    id: 'security',
    name: 'Sécurité Web',
    icon: '🔒',
    color: '#ef4444',
    description: 'Mesures de sécurité essentielles',
    tasks: [
      {
        id: 'security-1',
        title: 'Configuration HTTPS/SSL',
        description: 'Installation et configuration du certificat SSL/TLS',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['ssl', 'https', 'sécurité']
      },
      {
        id: 'security-2',
        title: 'Headers de sécurité',
        description: 'Configuration CSP, HSTS, X-Frame-Options, etc.',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['headers', 'csp', 'sécurité']
      },
      {
        id: 'security-3',
        title: 'Protection CSRF',
        description: 'Implémentation de la protection Cross-Site Request Forgery',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['csrf', 'sécurité', 'protection']
      },
      {
        id: 'security-4',
        title: 'Validation côté serveur',
        description: 'Validation et sanitization de toutes les entrées utilisateur',
        duration: 2,
        priority: 'critique',
        category: 'security',
        tags: ['validation', 'sanitization', 'sécurité']
      },
      {
        id: 'security-5',
        title: 'Gestion sécurisée des sessions',
        description: 'Configuration sécurisée des sessions et cookies',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['sessions', 'cookies', 'sécurité']
      },
      {
        id: 'security-6',
        title: 'Protection XSS',
        description: 'Prévention des attaques Cross-Site Scripting',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['xss', 'sécurité', 'protection']
      },
      {
        id: 'security-7',
        title: 'Protection injection SQL',
        description: 'Requêtes préparées et protection contre SQL injection',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['sql', 'injection', 'sécurité']
      },
      {
        id: 'security-8',
        title: 'Gestion des secrets & env vars',
        description: 'Stockage sécurisé des clés API et variables sensibles',
        duration: 1,
        priority: 'critique',
        category: 'security',
        tags: ['secrets', 'env', 'sécurité']
      }
    ]
  },
  {
    id: 'marketing-analytics',
    name: 'Marketing & Analytics',
    icon: '📊',
    color: '#3b82f6',
    description: 'Outils marketing et suivi analytique',
    tasks: [
      {
        id: 'marketing-1',
        title: 'Google Analytics 4',
        description: 'Configuration complète de GA4 avec événements personnalisés',
        duration: 2,
        priority: 'haute',
        category: 'marketing-analytics',
        tags: ['ga4', 'analytics', 'tracking']
      },
      {
        id: 'marketing-2',
        title: 'Google Tag Manager',
        description: 'Setup GTM pour gestion centralisée des tags',
        duration: 1,
        priority: 'haute',
        category: 'marketing-analytics',
        tags: ['gtm', 'tags', 'tracking']
      },
      {
        id: 'marketing-3',
        title: 'Facebook Pixel',
        description: 'Installation du pixel Facebook pour tracking et retargeting',
        duration: 1,
        priority: 'moyenne',
        category: 'marketing-analytics',
        tags: ['facebook', 'pixel', 'ads']
      },
      {
        id: 'marketing-4',
        title: 'LinkedIn Insight Tag',
        description: 'Configuration du tag LinkedIn pour tracking B2B',
        duration: 1,
        priority: 'basse',
        category: 'marketing-analytics',
        tags: ['linkedin', 'b2b', 'tracking']
      },
      {
        id: 'marketing-5',
        title: 'Hotjar / Heatmaps',
        description: 'Installation de Hotjar pour heatmaps et enregistrements',
        duration: 1,
        priority: 'moyenne',
        category: 'marketing-analytics',
        tags: ['hotjar', 'heatmaps', 'ux']
      },
      {
        id: 'marketing-6',
        title: 'Google Search Console',
        description: 'Configuration et monitoring Google Search Console',
        duration: 1,
        priority: 'haute',
        category: 'marketing-analytics',
        tags: ['gsc', 'seo', 'google']
      },
      {
        id: 'marketing-7',
        title: 'Conversion tracking',
        description: 'Setup du tracking des conversions (formulaires, achats, etc.)',
        duration: 2,
        priority: 'haute',
        category: 'marketing-analytics',
        tags: ['conversion', 'tracking', 'goals']
      },
      {
        id: 'marketing-8',
        title: 'A/B Testing setup',
        description: 'Configuration d\'outils de A/B testing (Google Optimize, etc.)',
        duration: 2,
        priority: 'basse',
        category: 'marketing-analytics',
        tags: ['ab-testing', 'optimisation', 'cro']
      },
      {
        id: 'marketing-9',
        title: 'Email marketing integration',
        description: 'Intégration Mailchimp/Sendinblue pour campagnes email',
        duration: 2,
        priority: 'moyenne',
        category: 'marketing-analytics',
        tags: ['email', 'newsletter', 'marketing']
      },
      {
        id: 'marketing-10',
        title: 'Pixels retargeting (Google Ads)',
        description: 'Configuration des pixels pour campagnes de retargeting',
        duration: 1,
        priority: 'moyenne',
        category: 'marketing-analytics',
        tags: ['retargeting', 'ads', 'google']
      }
    ]
  },
  {
    id: 'hosting-infrastructure',
    name: 'Hébergement & Infrastructure',
    icon: '🌐',
    color: '#6366f1',
    description: 'Configuration serveur et infrastructure',
    tasks: [
      {
        id: 'hosting-1',
        title: 'Choix de l\'hébergement',
        description: 'Sélection et souscription hébergement (VPS, Cloud, Shared)',
        duration: 1,
        priority: 'critique',
        category: 'hosting-infrastructure',
        tags: ['hosting', 'infrastructure', 'décision']
      },
      {
        id: 'hosting-2',
        title: 'Configuration serveur web',
        description: 'Configuration Nginx/Apache avec optimisations',
        duration: 2,
        priority: 'critique',
        category: 'hosting-infrastructure',
        tags: ['serveur', 'nginx', 'apache']
      },
      {
        id: 'hosting-3',
        title: 'Environnement de staging',
        description: 'Setup d\'un environnement de pré-production',
        duration: 1,
        priority: 'haute',
        category: 'hosting-infrastructure',
        tags: ['staging', 'environnement', 'testing']
      },
      {
        id: 'hosting-4',
        title: 'Email professionnel',
        description: 'Configuration des emails professionnels (@domaine.com)',
        duration: 1,
        priority: 'haute',
        category: 'hosting-infrastructure',
        tags: ['email', 'domaine', 'professionnel']
      },
      {
        id: 'hosting-5',
        title: 'Sauvegardes automatiques serveur',
        description: 'Configuration des backups automatiques quotidiens/hebdomadaires',
        duration: 1,
        priority: 'critique',
        category: 'hosting-infrastructure',
        tags: ['backup', 'sauvegardes', 'sécurité']
      },
      {
        id: 'hosting-6',
        title: 'Load balancing / Haute disponibilité',
        description: 'Configuration répartition de charge pour haute disponibilité',
        duration: 3,
        priority: 'basse',
        category: 'hosting-infrastructure',
        tags: ['load-balancing', 'ha', 'scalabilité']
      },
      {
        id: 'hosting-7',
        title: 'Configuration cache serveur',
        description: 'Setup de Varnish/Redis pour cache serveur',
        duration: 2,
        priority: 'moyenne',
        category: 'hosting-infrastructure',
        tags: ['cache', 'performance', 'varnish']
      },
      {
        id: 'hosting-8',
        title: 'Configuration firewall',
        description: 'Configuration du firewall et règles de sécurité',
        duration: 1,
        priority: 'critique',
        category: 'hosting-infrastructure',
        tags: ['firewall', 'sécurité', 'serveur']
      },
      {
        id: 'hosting-9',
        title: 'Optimisation PHP/Node',
        description: 'Configuration et optimisation du runtime (PHP-FPM, Node.js)',
        duration: 1,
        priority: 'moyenne',
        category: 'hosting-infrastructure',
        tags: ['runtime', 'optimisation', 'performance']
      }
    ]
  },
  {
    id: 'mobile-app',
    name: 'Développement Mobile',
    icon: '📱',
    color: '#ec4899',
    description: 'Applications mobiles natives et hybrides',
    tasks: [
      {
        id: 'mobile-1',
        title: 'Application iOS native',
        description: 'Développement de l\'application native pour iOS (Swift)',
        duration: 30,
        priority: 'haute',
        category: 'mobile-app',
        tags: ['ios', 'swift', 'mobile']
      },
      {
        id: 'mobile-2',
        title: 'Application Android native',
        description: 'Développement de l\'application native pour Android (Kotlin)',
        duration: 30,
        priority: 'haute',
        category: 'mobile-app',
        tags: ['android', 'kotlin', 'mobile']
      },
      {
        id: 'mobile-3',
        title: 'Application React Native / Flutter',
        description: 'Développement cross-platform avec React Native ou Flutter',
        duration: 25,
        priority: 'haute',
        category: 'mobile-app',
        tags: ['react-native', 'flutter', 'cross-platform']
      },
      {
        id: 'mobile-4',
        title: 'Soumission App Store (Apple)',
        description: 'Préparation et soumission sur l\'App Store iOS',
        duration: 3,
        priority: 'critique',
        category: 'mobile-app',
        tags: ['app-store', 'ios', 'publication']
      },
      {
        id: 'mobile-5',
        title: 'Soumission Google Play Store',
        description: 'Préparation et soumission sur le Play Store Android',
        duration: 2,
        priority: 'critique',
        category: 'mobile-app',
        tags: ['play-store', 'android', 'publication']
      },
      {
        id: 'mobile-6',
        title: 'Push notifications mobiles',
        description: 'Implémentation des notifications push (Firebase, OneSignal)',
        duration: 3,
        priority: 'haute',
        category: 'mobile-app',
        tags: ['push', 'notifications', 'firebase']
      },
      {
        id: 'mobile-7',
        title: 'Deep linking',
        description: 'Configuration des deep links et universal links',
        duration: 2,
        priority: 'moyenne',
        category: 'mobile-app',
        tags: ['deep-linking', 'navigation', 'ux']
      },
      {
        id: 'mobile-8',
        title: 'Tests mobile (devices réels)',
        description: 'Tests sur devices physiques iOS et Android',
        duration: 3,
        priority: 'haute',
        category: 'mobile-app',
        tags: ['testing', 'qa', 'devices']
      }
    ]
  },
  {
    id: 'accessibility-advanced',
    name: 'Accessibilité Avancée',
    icon: '♿',
    color: '#8b5cf6',
    description: 'Conformité accessibilité WCAG',
    tasks: [
      {
        id: 'a11y-1',
        title: 'Audit accessibilité WCAG 2.1 AA',
        description: 'Audit complet de conformité WCAG niveau AA',
        duration: 3,
        priority: 'haute',
        category: 'accessibility-advanced',
        tags: ['wcag', 'audit', 'a11y']
      },
      {
        id: 'a11y-2',
        title: 'Tests lecteurs d\'écran',
        description: 'Tests avec NVDA, JAWS, VoiceOver, TalkBack',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-advanced',
        tags: ['screen-readers', 'testing', 'a11y']
      },
      {
        id: 'a11y-3',
        title: 'Navigation clavier complète',
        description: 'Implémentation navigation 100% clavier avec focus visible',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-advanced',
        tags: ['keyboard', 'navigation', 'a11y']
      },
      {
        id: 'a11y-4',
        title: 'Mode contraste élevé',
        description: 'Support du mode high contrast pour malvoyants',
        duration: 2,
        priority: 'moyenne',
        category: 'accessibility-advanced',
        tags: ['contrast', 'vision', 'a11y']
      },
      {
        id: 'a11y-5',
        title: 'Zoom et taille texte ajustable',
        description: 'Support du zoom jusqu\'à 200% sans perte de fonctionnalité',
        duration: 1,
        priority: 'moyenne',
        category: 'accessibility-advanced',
        tags: ['zoom', 'resize', 'a11y']
      },
      {
        id: 'a11y-6',
        title: 'ARIA landmarks et rôles',
        description: 'Implémentation complète des attributs ARIA',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-advanced',
        tags: ['aria', 'semantics', 'a11y']
      },
      {
        id: 'a11y-7',
        title: 'Sous-titres et transcriptions',
        description: 'Ajout de sous-titres pour vidéos et transcriptions audio',
        duration: 3,
        priority: 'moyenne',
        category: 'accessibility-advanced',
        tags: ['captions', 'transcripts', 'media']
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Intégrations Tierces',
    icon: '🔌',
    color: '#06b6d4',
    description: 'Connexions avec services externes',
    tasks: [
      {
        id: 'integration-1',
        title: 'Intégration PayPal',
        description: 'Configuration paiement via PayPal',
        duration: 2,
        priority: 'haute',
        category: 'integrations',
        tags: ['paypal', 'paiement', 'ecommerce']
      },
      {
        id: 'integration-2',
        title: 'Intégration comptabilité',
        description: 'Connexion QuickBooks, Xero ou Sage',
        duration: 3,
        priority: 'moyenne',
        category: 'integrations',
        tags: ['comptabilité', 'finance', 'automation']
      },
      {
        id: 'integration-3',
        title: 'Intégration support client',
        description: 'Setup Zendesk, Intercom ou Crisp',
        duration: 2,
        priority: 'moyenne',
        category: 'integrations',
        tags: ['support', 'chat', 'customer']
      },
      {
        id: 'integration-4',
        title: 'Intégration calendrier',
        description: 'Connexion Google Calendar, Outlook ou Calendly',
        duration: 2,
        priority: 'moyenne',
        category: 'integrations',
        tags: ['calendar', 'booking', 'scheduling']
      },
      {
        id: 'integration-5',
        title: 'Stockage cloud (S3, Cloudinary)',
        description: 'Configuration stockage médias sur cloud',
        duration: 2,
        priority: 'haute',
        category: 'integrations',
        tags: ['storage', 'cloud', 'media']
      },
      {
        id: 'integration-6',
        title: 'Service de visio (Zoom, Meet)',
        description: 'Intégration API Zoom ou Google Meet',
        duration: 3,
        priority: 'basse',
        category: 'integrations',
        tags: ['visio', 'meeting', 'video']
      },
      {
        id: 'integration-7',
        title: 'Signature électronique',
        description: 'Intégration DocuSign ou HelloSign',
        duration: 2,
        priority: 'moyenne',
        category: 'integrations',
        tags: ['signature', 'documents', 'légal']
      },
      {
        id: 'integration-8',
        title: 'SMS / Notifications SMS',
        description: 'Intégration Twilio ou similaire pour envoi SMS',
        duration: 2,
        priority: 'basse',
        category: 'integrations',
        tags: ['sms', 'notifications', 'twilio']
      },
      {
        id: 'integration-9',
        title: 'Shipping / Livraison',
        description: 'Intégration transporteurs (Colissimo, UPS, DHL)',
        duration: 3,
        priority: 'moyenne',
        category: 'integrations',
        tags: ['shipping', 'delivery', 'ecommerce']
      }
    ]
  },
  {
    id: 'compliance',
    name: 'Conformité & Légal',
    icon: '⚖️',
    color: '#f59e0b',
    description: 'Conformité RGPD et obligations légales',
    tasks: [
      {
        id: 'compliance-1',
        title: 'Audit RGPD complet',
        description: 'Analyse de conformité RGPD de l\'ensemble du projet',
        duration: 3,
        priority: 'critique',
        category: 'compliance',
        tags: ['rgpd', 'gdpr', 'audit']
      },
      {
        id: 'compliance-2',
        title: 'Système de gestion des consentements',
        description: 'Implémentation granulaire de la gestion des consentements',
        duration: 3,
        priority: 'critique',
        category: 'compliance',
        tags: ['consent', 'rgpd', 'cookies']
      },
      {
        id: 'compliance-3',
        title: 'Droit à l\'oubli',
        description: 'Fonctionnalité de suppression complète des données utilisateur',
        duration: 2,
        priority: 'critique',
        category: 'compliance',
        tags: ['right-to-be-forgotten', 'rgpd', 'privacy']
      },
      {
        id: 'compliance-4',
        title: 'Export données personnelles',
        description: 'Fonctionnalité d\'export des données au format portable',
        duration: 2,
        priority: 'critique',
        category: 'compliance',
        tags: ['data-portability', 'rgpd', 'export']
      },
      {
        id: 'compliance-5',
        title: 'Registre des traitements',
        description: 'Documentation du registre des activités de traitement',
        duration: 2,
        priority: 'haute',
        category: 'compliance',
        tags: ['registre', 'rgpd', 'documentation']
      },
      {
        id: 'compliance-6',
        title: 'DPO / Délégué protection données',
        description: 'Désignation et configuration du DPO si nécessaire',
        duration: 1,
        priority: 'moyenne',
        category: 'compliance',
        tags: ['dpo', 'rgpd', 'privacy']
      },
      {
        id: 'compliance-7',
        title: 'Déclaration CNIL',
        description: 'Déclaration auprès de la CNIL si traitement sensible',
        duration: 1,
        priority: 'moyenne',
        category: 'compliance',
        tags: ['cnil', 'déclaration', 'rgpd']
      },
      {
        id: 'compliance-8',
        title: 'Contrats sous-traitants',
        description: 'Rédaction des contrats de sous-traitance RGPD',
        duration: 2,
        priority: 'haute',
        category: 'compliance',
        tags: ['contrats', 'sous-traitance', 'rgpd']
      },
      {
        id: 'compliance-9',
        title: 'Privacy by design',
        description: 'Audit et implémentation des principes privacy by design',
        duration: 3,
        priority: 'haute',
        category: 'compliance',
        tags: ['privacy', 'architecture', 'rgpd']
      }
    ]
  },
  {
    id: 'performance-advanced',
    name: 'Performance Avancée',
    icon: '⚡',
    color: '#10b981',
    description: 'Optimisations performance poussées',
    tasks: [
      {
        id: 'perf-1',
        title: 'Service Workers & Cache strategies',
        description: 'Implémentation de service workers pour cache offline',
        duration: 3,
        priority: 'moyenne',
        category: 'performance-advanced',
        tags: ['service-worker', 'cache', 'pwa']
      },
      {
        id: 'perf-2',
        title: 'Code splitting avancé',
        description: 'Découpage intelligent du code par routes et composants',
        duration: 2,
        priority: 'haute',
        category: 'performance-advanced',
        tags: ['code-splitting', 'webpack', 'optimisation']
      },
      {
        id: 'perf-3',
        title: 'Tree shaking',
        description: 'Élimination du code mort et optimisation du bundle',
        duration: 1,
        priority: 'moyenne',
        category: 'performance-advanced',
        tags: ['tree-shaking', 'bundle', 'optimisation']
      },
      {
        id: 'perf-4',
        title: 'Image optimization pipeline',
        description: 'Pipeline automatique d\'optimisation images (WebP, AVIF, responsive)',
        duration: 2,
        priority: 'haute',
        category: 'performance-advanced',
        tags: ['images', 'optimisation', 'automation']
      },
      {
        id: 'perf-5',
        title: 'Video optimization',
        description: 'Compression et streaming adaptatif des vidéos',
        duration: 2,
        priority: 'moyenne',
        category: 'performance-advanced',
        tags: ['video', 'streaming', 'optimisation']
      },
      {
        id: 'perf-6',
        title: 'Database query optimization',
        description: 'Optimisation des requêtes SQL et indexation',
        duration: 2,
        priority: 'haute',
        category: 'performance-advanced',
        tags: ['database', 'sql', 'indexing']
      },
      {
        id: 'perf-7',
        title: 'API response caching',
        description: 'Stratégies de cache pour les réponses API (Redis, CDN)',
        duration: 2,
        priority: 'haute',
        category: 'performance-advanced',
        tags: ['api', 'cache', 'redis']
      },
      {
        id: 'perf-8',
        title: 'Critical CSS inline',
        description: 'Extraction et inline du CSS critique pour first paint',
        duration: 1,
        priority: 'moyenne',
        category: 'performance-advanced',
        tags: ['css', 'critical', 'render']
      },
      {
        id: 'perf-9',
        title: 'Preconnect & Prefetch',
        description: 'Configuration des resource hints pour domaines externes',
        duration: 1,
        priority: 'moyenne',
        category: 'performance-advanced',
        tags: ['preconnect', 'prefetch', 'optimisation']
      }
    ]
  },
  {
    id: 'content-management',
    name: 'Gestion de Contenu Avancée',
    icon: '📄',
    color: '#f97316',
    description: 'Workflow et gestion avancée du contenu',
    tasks: [
      {
        id: 'content-mgmt-1',
        title: 'Versioning de contenu',
        description: 'Système de versions et historique des modifications',
        duration: 3,
        priority: 'moyenne',
        category: 'content-management',
        tags: ['versioning', 'history', 'cms']
      },
      {
        id: 'content-mgmt-2',
        title: 'Workflow d\'approbation',
        description: 'Système de validation et publication par étapes',
        duration: 3,
        priority: 'moyenne',
        category: 'content-management',
        tags: ['workflow', 'approval', 'cms']
      },
      {
        id: 'content-mgmt-3',
        title: 'Traduction de contenu',
        description: 'Interface de traduction et gestion multilingue',
        duration: 4,
        priority: 'moyenne',
        category: 'content-management',
        tags: ['translation', 'i18n', 'cms']
      },
      {
        id: 'content-mgmt-4',
        title: 'Import / Export de contenu',
        description: 'Outils d\'import/export CSV, JSON, XML',
        duration: 2,
        priority: 'moyenne',
        category: 'content-management',
        tags: ['import', 'export', 'migration']
      },
      {
        id: 'content-mgmt-5',
        title: 'Migration de données',
        description: 'Migration depuis ancien CMS ou base de données',
        duration: 5,
        priority: 'haute',
        category: 'content-management',
        tags: ['migration', 'data', 'import']
      },
      {
        id: 'content-mgmt-6',
        title: 'Database seeding',
        description: 'Scripts de génération de données de test',
        duration: 1,
        priority: 'basse',
        category: 'content-management',
        tags: ['seeding', 'fixtures', 'testing']
      },
      {
        id: 'content-mgmt-7',
        title: 'Planification de publication',
        description: 'Système de scheduling pour publication différée',
        duration: 2,
        priority: 'moyenne',
        category: 'content-management',
        tags: ['scheduling', 'publication', 'cms']
      },
      {
        id: 'content-mgmt-8',
        title: 'Duplicate & Draft',
        description: 'Fonctionnalités de duplication et brouillons',
        duration: 1,
        priority: 'basse',
        category: 'content-management',
        tags: ['draft', 'duplicate', 'cms']
      }
    ]
  },
  {
    id: 'monitoring-devops',
    name: 'Monitoring & DevOps',
    icon: '📡',
    description: 'Surveillance et opérations',
    color: '#ef4444',
    tasks: [
      {
        id: 'monitoring-1',
        title: 'Monitoring uptime',
        description: 'Configuration alertes uptime (UptimeRobot, Pingdom)',
        duration: 1,
        priority: 'critique',
        category: 'monitoring-devops',
        tags: ['uptime', 'monitoring', 'alertes']
      },
      {
        id: 'monitoring-2',
        title: 'APM (Application Performance)',
        description: 'Monitoring performance application (New Relic, Datadog)',
        duration: 2,
        priority: 'haute',
        category: 'monitoring-devops',
        tags: ['apm', 'performance', 'monitoring']
      },
      {
        id: 'monitoring-3',
        title: 'Error tracking (Sentry)',
        description: 'Configuration Sentry ou Rollbar pour suivi des erreurs',
        duration: 1,
        priority: 'critique',
        category: 'monitoring-devops',
        tags: ['sentry', 'errors', 'tracking']
      },
      {
        id: 'monitoring-4',
        title: 'Log aggregation',
        description: 'Centralisation des logs (ELK, Splunk, Loggly)',
        duration: 2,
        priority: 'haute',
        category: 'monitoring-devops',
        tags: ['logs', 'aggregation', 'elk']
      },
      {
        id: 'monitoring-5',
        title: 'Métriques business',
        description: 'Dashboard de métriques métier et KPIs',
        duration: 3,
        priority: 'moyenne',
        category: 'monitoring-devops',
        tags: ['metrics', 'kpi', 'business']
      },
      {
        id: 'monitoring-6',
        title: 'Alertes Slack/Email',
        description: 'Configuration des notifications d\'alertes',
        duration: 1,
        priority: 'haute',
        category: 'monitoring-devops',
        tags: ['alertes', 'notifications', 'slack']
      },
      {
        id: 'monitoring-7',
        title: 'Status page publique',
        description: 'Page de status pour communication incidents',
        duration: 1,
        priority: 'moyenne',
        category: 'monitoring-devops',
        tags: ['status', 'incidents', 'communication']
      },
      {
        id: 'monitoring-8',
        title: 'Synthetic monitoring',
        description: 'Tests automatiques simulant parcours utilisateur',
        duration: 2,
        priority: 'moyenne',
        category: 'monitoring-devops',
        tags: ['synthetic', 'testing', 'monitoring']
      },
      {
        id: 'monitoring-9',
        title: 'Infrastructure as Code',
        description: 'Configuration Terraform, Ansible ou similaire',
        duration: 3,
        priority: 'moyenne',
        category: 'monitoring-devops',
        tags: ['iac', 'terraform', 'devops']
      },
      {
        id: 'monitoring-10',
        title: 'Disaster recovery plan',
        description: 'Plan et procédures de récupération après incident',
        duration: 2,
        priority: 'haute',
        category: 'monitoring-devops',
        tags: ['disaster-recovery', 'backup', 'plan']
      }
    ]
  },

  // ==================== MARKETING DIGITAL ====================
  {
    id: 'marketing-digital',
    name: 'Marketing Digital',
    icon: '📢',
    color: '#f59e0b',
    description: 'Stratégie marketing, campagnes et optimisation des conversions',
    tasks: [
      {
        id: 'marketing-digital-1',
        title: 'Stratégie de contenu marketing',
        description: 'Définition de la stratégie de contenu et planning éditorial',
        duration: 3,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['stratégie', 'contenu', 'planning']
      },
      {
        id: 'marketing-digital-2',
        title: 'Email marketing automation',
        description: 'Configuration des workflows d\'emails automatisés (welcome, abandon panier, etc.)',
        duration: 3,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['email', 'automation', 'workflows']
      },
      {
        id: 'marketing-digital-3',
        title: 'Integration réseaux sociaux',
        description: 'Connexion et partage automatique vers Facebook, Instagram, LinkedIn, Twitter',
        duration: 2,
        priority: 'moyenne',
        category: 'marketing-digital',
        tags: ['social-media', 'integration', 'partage']
      },
      {
        id: 'marketing-digital-4',
        title: 'Landing pages optimisées',
        description: 'Création de pages de destination pour campagnes marketing avec CTA optimisés',
        duration: 3,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['landing-page', 'conversion', 'cta']
      },
      {
        id: 'marketing-digital-5',
        title: 'Pixels de tracking',
        description: 'Installation Facebook Pixel, Google Ads, LinkedIn Insight Tag',
        duration: 1,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['tracking', 'pixels', 'ads']
      },
      {
        id: 'marketing-digital-6',
        title: 'Retargeting campaigns',
        description: 'Configuration des campagnes de retargeting et audiences personnalisées',
        duration: 2,
        priority: 'moyenne',
        category: 'marketing-digital',
        tags: ['retargeting', 'ads', 'remarketing']
      },
      {
        id: 'marketing-digital-7',
        title: 'Lead magnets & pop-ups',
        description: 'Création de lead magnets (ebooks, guides) et pop-ups de capture',
        duration: 2,
        priority: 'moyenne',
        category: 'marketing-digital',
        tags: ['lead-generation', 'pop-ups', 'magnets']
      },
      {
        id: 'marketing-digital-8',
        title: 'Marketing automation CRM',
        description: 'Intégration HubSpot, Mailchimp, ActiveCampaign ou similaire',
        duration: 3,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['crm', 'automation', 'integration']
      },
      {
        id: 'marketing-digital-9',
        title: 'Affiliate program setup',
        description: 'Mise en place d\'un programme d\'affiliation',
        duration: 4,
        priority: 'basse',
        category: 'marketing-digital',
        tags: ['affiliation', 'partners', 'program']
      },
      {
        id: 'marketing-digital-10',
        title: 'Conversion funnel optimization',
        description: 'Analyse et optimisation du tunnel de conversion',
        duration: 3,
        priority: 'haute',
        category: 'marketing-digital',
        tags: ['funnel', 'conversion', 'optimization']
      },
      {
        id: 'marketing-digital-11',
        title: 'Référencement payant (SEA)',
        description: 'Configuration Google Ads, Facebook Ads campaigns',
        duration: 3,
        priority: 'moyenne',
        category: 'marketing-digital',
        tags: ['sea', 'ads', 'ppc']
      }
    ]
  },

  // ==================== LEGAL & RGPD ====================
  {
    id: 'legal-rgpd',
    name: 'Legal & RGPD',
    icon: '⚖️',
    color: '#64748b',
    description: 'Conformité légale, RGPD et protection des données',
    tasks: [
      {
        id: 'legal-1',
        title: 'Cookie consent banner',
        description: 'Implémentation du bandeau de consentement cookies conforme RGPD',
        duration: 2,
        priority: 'critique',
        category: 'legal-rgpd',
        tags: ['rgpd', 'cookies', 'consent']
      },
      {
        id: 'legal-2',
        title: 'Politique de confidentialité',
        description: 'Rédaction de la privacy policy conforme RGPD',
        duration: 2,
        priority: 'critique',
        category: 'legal-rgpd',
        tags: ['privacy', 'rgpd', 'legal']
      },
      {
        id: 'legal-3',
        title: 'Mentions légales',
        description: 'Rédaction des mentions légales obligatoires',
        duration: 1,
        priority: 'critique',
        category: 'legal-rgpd',
        tags: ['legal', 'mentions']
      },
      {
        id: 'legal-4',
        title: 'CGU/CGV',
        description: 'Conditions Générales d\'Utilisation et de Vente',
        duration: 3,
        priority: 'critique',
        category: 'legal-rgpd',
        tags: ['cgu', 'cgv', 'legal']
      },
      {
        id: 'legal-5',
        title: 'Export de données utilisateur',
        description: 'Fonctionnalité d\'export des données personnelles (RGPD Article 20)',
        duration: 2,
        priority: 'haute',
        category: 'legal-rgpd',
        tags: ['rgpd', 'export', 'portabilité']
      },
      {
        id: 'legal-6',
        title: 'Age verification',
        description: 'Système de vérification d\'âge si applicable (13/16 ans)',
        duration: 2,
        priority: 'moyenne',
        category: 'legal-rgpd',
        tags: ['age', 'verification', 'compliance']
      }
    ]
  },

  // ==================== ACCESSIBILITÉ AVANCÉE ====================
  {
    id: 'accessibility-pro',
    name: 'Accessibilité Pro',
    icon: '♿',
    color: '#8b5cf6',
    description: 'Accessibilité avancée et conformité WCAG',
    tasks: [
      {
        id: 'accessibility-pro-1',
        title: 'Audit WCAG 2.1 AA',
        description: 'Audit complet de conformité WCAG niveau AA',
        duration: 3,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['wcag', 'audit', 'compliance']
      },
      {
        id: 'accessibility-pro-2',
        title: 'Screen reader optimization',
        description: 'Optimisation complète pour lecteurs d\'écran (NVDA, JAWS, VoiceOver)',
        duration: 3,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['screen-reader', 'a11y', 'nvda']
      },
      {
        id: 'accessibility-pro-3',
        title: 'Keyboard navigation complète',
        description: 'Navigation 100% au clavier avec indicateurs focus visibles',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['keyboard', 'navigation', 'focus']
      },
      {
        id: 'accessibility-pro-4',
        title: 'ARIA labels & roles',
        description: 'Implémentation complète des attributs ARIA pour sémantique',
        duration: 3,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['aria', 'semantic', 'roles']
      },
      {
        id: 'accessibility-pro-5',
        title: 'Contrast ratio verification',
        description: 'Vérification et correction des ratios de contraste (4.5:1 minimum)',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['contrast', 'colors', 'wcag']
      },
      {
        id: 'accessibility-pro-6',
        title: 'Skip links & landmarks',
        description: 'Liens d\'évitement et points de repère ARIA',
        duration: 1,
        priority: 'moyenne',
        category: 'accessibility-pro',
        tags: ['skip-links', 'landmarks', 'navigation']
      },
      {
        id: 'accessibility-pro-7',
        title: 'Alternative text audit',
        description: 'Audit et optimisation de tous les textes alternatifs images',
        duration: 2,
        priority: 'haute',
        category: 'accessibility-pro',
        tags: ['alt-text', 'images', 'a11y']
      }
    ]
  }
];

// Fonction helper pour obtenir toutes les tâches
export function getAllTasks(): TaskTemplate[] {
  return taskLibrary.flatMap(category => category.tasks);
}

// Fonction helper pour obtenir les tâches par catégorie
export function getTasksByCategory(categoryId: string): TaskTemplate[] {
  const category = taskLibrary.find(cat => cat.id === categoryId);
  return category ? category.tasks : [];
}

// Fonction helper pour obtenir une tâche par ID
export function getTaskById(taskId: string): TaskTemplate | undefined {
  return getAllTasks().find(task => task.id === taskId);
}

// Fonction helper pour rechercher des tâches
export function searchTasks(query: string): TaskTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllTasks().filter(task =>
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery) ||
    task.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
