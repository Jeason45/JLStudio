/**
 * Générateur intelligent de diagrammes de Gantt
 * Crée automatiquement un planning complet basé sur:
 * - La catégorie du projet
 * - Les options/features sélectionnées
 */

import { taskLibrary, TaskTemplate } from './taskLibrary';
import { addDays, format } from 'date-fns';

export type ProjectCategory =
  | 'site-vitrine'
  | 'e-commerce'
  | 'saas'
  | 'blog'
  | 'portfolio'
  | 'marketplace'
  | 'application-web';

export type ProjectFeature =
  | 'blog'
  | 'newsletter'
  | 'crm'
  | 'multi-langue'
  | 'paiement'
  | 'reservation'
  | 'forum'
  | 'chat'
  | 'mobile-app'
  | 'api'
  | 'analytics-avance'
  | 'marketing-automation';

export interface ProjectConfig {
  category: ProjectCategory;
  features: ProjectFeature[];
  startDate: Date;
  teamSize?: 'solo' | 'small' | 'medium' | 'large'; // Affecte les durées
}

export interface GeneratedTask {
  templateId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  priority: string;
  category: string;
  dependencies: string[];
  phase: string;
  order: number;
}

// Définition des phases chronologiques (ordre universel)
const PHASES = [
  'commercial',      // 0
  'discovery',       // 1
  'design',          // 2
  'frontend',        // 3
  'backend',         // 4
  'content',         // 5
  'testing',         // 6
  'deployment',      // 7
  'maintenance'      // 8
] as const;

// Templates de projets avec tâches obligatoires par catégorie
const PROJECT_TEMPLATES: Record<ProjectCategory, {
  name: string;
  description: string;
  baseTasks: string[]; // IDs des tâches obligatoires
  duration: number; // Durée estimée en jours
}> = {
  'site-vitrine': {
    name: 'Site Vitrine',
    description: 'Site de présentation corporate ou personnel',
    baseTasks: [
      // Commercial & Communication
      'client-1', 'client-2', 'client-3',

      // Discovery
      'discovery-1', 'discovery-2', 'discovery-7', 'discovery-9', 'discovery-10',

      // Design
      'design-2', 'design-4', 'design-5', 'design-6', 'design-7', 'design-13',
      'design-assets-3', 'design-assets-4',

      // Validation Design Client
      'client-11',

      // Frontend
      'frontend-feat-1', 'frontend-1', 'frontend-2', 'frontend-3', 'frontend-4',
      'frontend-5', 'frontend-6', 'frontend-7', 'frontend-10', 'frontend-13', 'frontend-14',
      'frontend-feat-2', 'frontend-feat-3', 'frontend-feat-6',

      // Backend
      'backend-1', 'backend-2', 'backend-5', 'backend-6',

      // Content & SEO
      'content-1', 'content-2', 'content-3', 'content-5', 'content-6', 'content-7', 'content-12',
      'seo-1', 'seo-2', 'seo-3',

      // Validation Contenu Client
      'client-12',

      // Security
      'security-1', 'security-2', 'security-4',

      // Testing
      'testing-1', 'testing-2', 'testing-3', 'testing-4', 'testing-8',

      // Corrections post-tests
      'testing-13',

      // Recette Client
      'client-13',

      // Deployment
      'hosting-1', 'hosting-2', 'hosting-4', 'hosting-5',
      'deployment-1', 'deployment-2', 'deployment-8', 'deployment-10', 'deployment-11', 'deployment-13',

      // Marketing
      'marketing-1', 'marketing-6',

      // Marketing Digital
      'marketing-digital-3', 'marketing-digital-5',

      // Legal & RGPD (OBLIGATOIRE)
      'legal-1', 'legal-2', 'legal-3',

      // Accessibilité
      'accessibility-pro-5', 'accessibility-pro-7',

      // Monitoring
      'monitoring-1', 'monitoring-3',

      // Maintenance
      'client-8', 'client-9', 'maintenance-2', 'maintenance-3'
    ],
    duration: 45
  },

  'e-commerce': {
    name: 'Site E-commerce',
    description: 'Boutique en ligne complète',
    baseTasks: [
      // Commercial
      'client-1', 'client-2', 'client-3',

      // Discovery
      'discovery-1', 'discovery-2', 'discovery-3', 'discovery-4', 'discovery-7', 'discovery-9', 'discovery-10',

      // Design
      'design-2', 'design-3', 'design-4', 'design-5', 'design-6', 'design-7', 'design-13',
      'design-assets-2', 'design-assets-3', 'design-assets-4',

      // Validation Design Client
      'client-11',

      // Frontend
      'frontend-feat-1', 'frontend-1', 'frontend-2', 'frontend-3', 'frontend-4',
      'frontend-5', 'frontend-6', 'frontend-9', 'frontend-13', 'frontend-14',
      'frontend-feat-2', 'frontend-feat-3', 'frontend-feat-5', 'frontend-feat-10',

      // Backend
      'backend-1', 'backend-2', 'backend-3', 'backend-4', 'backend-5', 'backend-6',

      // E-commerce (TOUT!)
      'ecommerce-1', 'ecommerce-2', 'ecommerce-3', 'ecommerce-4', 'ecommerce-5',
      'ecommerce-6', 'ecommerce-7', 'ecommerce-8', 'ecommerce-9', 'ecommerce-11', 'ecommerce-12',

      // Content
      'content-1', 'content-3', 'content-5', 'content-6', 'content-7', 'content-12',
      'seo-1', 'seo-2', 'seo-3',

      // Validation Contenu Client
      'client-12',

      // Security (renforcée)
      'security-1', 'security-2', 'security-3', 'security-4', 'security-6', 'security-7',
      'compliance-1', 'compliance-2', 'compliance-3', 'compliance-4',

      // Testing
      'testing-1', 'testing-2', 'testing-3', 'testing-4', 'testing-6', 'testing-7', 'testing-8', 'testing-12',

      // Corrections post-tests
      'testing-13',

      // Recette Client
      'client-13',

      // Deployment
      'hosting-1', 'hosting-2', 'hosting-3', 'hosting-4', 'hosting-5',
      'deployment-1', 'deployment-2', 'deployment-3', 'deployment-7', 'deployment-8', 'deployment-10', 'deployment-11',

      // Marketing & Analytics
      'marketing-1', 'marketing-2', 'marketing-3', 'marketing-6', 'marketing-7',

      // Marketing Digital (ESSENTIEL E-COMMERCE)
      'marketing-digital-2', 'marketing-digital-4', 'marketing-digital-5', 'marketing-digital-6',
      'marketing-digital-10', 'marketing-digital-11',

      // Legal & RGPD (OBLIGATOIRE E-COMMERCE)
      'legal-1', 'legal-2', 'legal-3', 'legal-4', 'legal-5', 'legal-6',

      // Accessibilité
      'accessibility-pro-5', 'accessibility-pro-7',

      // Monitoring
      'monitoring-1', 'monitoring-2', 'monitoring-3', 'monitoring-6',

      // Maintenance
      'client-8', 'client-9', 'maintenance-2', 'maintenance-3', 'maintenance-5'
    ],
    duration: 90
  },

  'saas': {
    name: 'Application SaaS',
    description: 'Software as a Service avec abonnements',
    baseTasks: [
      // Commercial
      'client-1', 'client-2', 'client-3',

      // Discovery
      'discovery-1', 'discovery-2', 'discovery-4', 'discovery-7', 'discovery-8', 'discovery-9', 'discovery-10',

      // Design
      'design-2', 'design-3', 'design-4', 'design-5', 'design-6', 'design-7', 'design-8', 'design-11', 'design-13',

      // Validation Design Client
      'client-11',

      // Frontend
      'frontend-feat-1', 'frontend-1', 'frontend-2', 'frontend-3', 'frontend-4',
      'frontend-5', 'frontend-6', 'frontend-12', 'frontend-13', 'frontend-14', 'frontend-15',
      'frontend-feat-3', 'frontend-feat-9',

      // Backend (complet)
      'backend-1', 'backend-2', 'backend-3', 'backend-4', 'backend-6', 'backend-8',
      'backend-12', 'backend-13', 'backend-14',

      // Advanced features
      'advanced-10', // Subscriptions
      'advanced-12', // Notifications

      // Content
      'content-5', 'content-6', 'content-12',

      // Validation Contenu Client
      'client-12',

      // Security (maximale)
      'security-1', 'security-2', 'security-3', 'security-4', 'security-5', 'security-6', 'security-7', 'security-8',
      'compliance-1', 'compliance-2', 'compliance-3', 'compliance-4', 'compliance-5',

      // Performance
      'perf-2', 'perf-4', 'perf-6', 'perf-7',

      // Testing
      'testing-1', 'testing-2', 'testing-3', 'testing-4', 'testing-5', 'testing-6', 'testing-9',

      // Corrections post-tests
      'testing-13',

      // Recette Client
      'client-13',

      // Deployment
      'hosting-1', 'hosting-2', 'hosting-3', 'hosting-5', 'hosting-7',
      'deployment-1', 'deployment-2', 'deployment-3', 'deployment-5', 'deployment-8', 'deployment-9', 'deployment-10',

      // Marketing Digital (CRUCIAL SAAS)
      'marketing-digital-2', 'marketing-digital-4', 'marketing-digital-8', 'marketing-digital-10',

      // Legal & RGPD (CRITIQUE SAAS)
      'legal-1', 'legal-2', 'legal-3', 'legal-4', 'legal-5', 'legal-6', 'legal-7',

      // Accessibilité (Important SaaS)
      'accessibility-pro-1', 'accessibility-pro-2', 'accessibility-pro-3', 'accessibility-pro-5',

      // Monitoring (complet)
      'monitoring-1', 'monitoring-2', 'monitoring-3', 'monitoring-4', 'monitoring-5', 'monitoring-6', 'monitoring-10',

      // Maintenance
      'client-8', 'client-9', 'maintenance-1', 'maintenance-2', 'maintenance-3', 'maintenance-6'
    ],
    duration: 120
  },

  'blog': {
    name: 'Blog / Magazine',
    description: 'Site de contenu éditorial',
    baseTasks: [
      'client-1', 'client-2', 'client-3',
      'discovery-1', 'discovery-2', 'discovery-7', 'discovery-9',
      'design-2', 'design-5', 'design-6', 'design-7',
      'client-11', // Validation Design
      'frontend-feat-1', 'frontend-1', 'frontend-3', 'frontend-5', 'frontend-6', 'frontend-11', 'frontend-13',
      'backend-1', 'backend-2', 'backend-9',
      'content-1', 'content-5', 'content-6', 'content-10', 'content-11', 'content-12',
      'seo-1', 'seo-2', 'seo-3', 'seo-6',
      'client-12', // Validation Contenu
      'testing-1', 'testing-2', 'testing-4', 'testing-8',
      'testing-13', // Corrections
      'client-13', // Recette
      'deployment-1', 'deployment-2', 'deployment-8', 'deployment-10', 'deployment-13',
      'marketing-1', 'marketing-6',

      // Legal & RGPD
      'legal-1', 'legal-2', 'legal-3',

      // Accessibilité
      'accessibility-pro-5',

      'client-8', 'client-9'
    ],
    duration: 35
  },

  'portfolio': {
    name: 'Portfolio',
    description: 'Site portfolio créatif',
    baseTasks: [
      'client-1', 'client-2', 'client-3',
      'discovery-1', 'discovery-2', 'discovery-4', 'discovery-7',
      'design-1', 'design-2', 'design-5', 'design-6', 'design-7', 'design-8', 'design-9',
      'client-11', // Validation Design
      'frontend-feat-1', 'frontend-1', 'frontend-3', 'frontend-5', 'frontend-6', 'frontend-9', 'frontend-12', 'frontend-13',
      'backend-1', 'backend-5',
      'content-2', 'content-4', 'content-5', 'content-7',
      'client-12', // Validation Contenu
      'testing-1', 'testing-2', 'testing-4',
      'testing-13', // Corrections
      'client-13', // Recette
      'deployment-1', 'deployment-2', 'deployment-8', 'deployment-10',

      // Legal & RGPD
      'legal-1', 'legal-2', 'legal-3',

      'client-8', 'client-9'
    ],
    duration: 30
  },

  'marketplace': {
    name: 'Marketplace',
    description: 'Plateforme multi-vendeurs',
    baseTasks: [
      'client-1', 'client-2', 'client-3',
      'discovery-1', 'discovery-2', 'discovery-3', 'discovery-7', 'discovery-8', 'discovery-9', 'discovery-10',
      'design-2', 'design-3', 'design-4', 'design-5', 'design-6', 'design-7',
      'client-11', // Validation Design
      'frontend-feat-1', 'frontend-1', 'frontend-2', 'frontend-3', 'frontend-5', 'frontend-6', 'frontend-13', 'frontend-14',
      'backend-1', 'backend-2', 'backend-3', 'backend-4', 'backend-8',
      'ecommerce-1', 'ecommerce-2', 'ecommerce-4', 'ecommerce-5', 'ecommerce-6', 'ecommerce-7', 'ecommerce-8',
      'advanced-11', // Marketplace
      'client-12', // Validation Contenu
      'security-1', 'security-2', 'security-3', 'security-4', 'security-6',
      'compliance-1', 'compliance-2',
      'testing-1', 'testing-2', 'testing-4', 'testing-6',
      'testing-13', // Corrections
      'client-13', // Recette
      'deployment-1', 'deployment-2', 'deployment-8', 'deployment-10',

      // Marketing Digital
      'marketing-digital-2', 'marketing-digital-5', 'marketing-digital-6',

      // Legal & RGPD (CRITIQUE MARKETPLACE)
      'legal-1', 'legal-2', 'legal-3', 'legal-4', 'legal-5', 'legal-6',

      'monitoring-1', 'monitoring-3',
      'client-8', 'client-9'
    ],
    duration: 150
  },

  'application-web': {
    name: 'Application Web',
    description: 'Application web personnalisée',
    baseTasks: [
      'client-1', 'client-2', 'client-3',
      'discovery-1', 'discovery-2', 'discovery-7', 'discovery-8', 'discovery-9', 'discovery-10',
      'design-2', 'design-3', 'design-4', 'design-5', 'design-7',
      'client-11', // Validation Design
      'frontend-feat-1', 'frontend-1', 'frontend-2', 'frontend-3', 'frontend-13', 'frontend-14',
      'backend-1', 'backend-2', 'backend-3', 'backend-4', 'backend-13',
      'client-12', // Validation Contenu
      'security-1', 'security-2', 'security-4',
      'testing-1', 'testing-2', 'testing-4',
      'testing-13', // Corrections
      'client-13', // Recette
      'deployment-1', 'deployment-2', 'deployment-10',

      // Legal & RGPD
      'legal-1', 'legal-2', 'legal-3',

      'monitoring-1', 'monitoring-3',
      'client-8', 'client-9'
    ],
    duration: 60
  }
};

// Mapping des features vers les tâches additionnelles
const FEATURE_TASKS: Record<ProjectFeature, string[]> = {
  'blog': [
    'frontend-11', // Page blog
    'backend-9',   // API Blog
    'content-10',  // Rédaction articles
    'content-11'   // Stratégie contenu
  ],

  'newsletter': [
    'advanced-4',  // Newsletter automation
    'marketing-9', // Email marketing
    'backend-6'    // Système emails
  ],

  'crm': [
    'advanced-5'   // Intégration CRM
  ],

  'multi-langue': [
    'advanced-1',      // i18n
    'seo-7',          // Hreflang
    'content-mgmt-3'  // Traduction
  ],

  'paiement': [
    'ecommerce-6',    // Stripe
    'integration-1',  // PayPal
    'security-3'      // CSRF
  ],

  'reservation': [
    'advanced-7'  // Booking system
  ],

  'forum': [
    'advanced-9'  // Forum/Communauté
  ],

  'chat': [
    'advanced-3',     // Chatbot/Live chat
    'integration-3'   // Support client
  ],

  'mobile-app': [
    'mobile-3', 'mobile-4', 'mobile-5', 'mobile-6', 'mobile-8'
  ],

  'api': [
    'backend-2',   // API setup
    'backend-13',  // Rate limiting
    'maintenance-1' // Doc technique
  ],

  'analytics-avance': [
    'marketing-1', 'marketing-2', 'marketing-5', 'marketing-7',
    'monitoring-2', 'monitoring-5'
  ],

  'marketing-automation': [
    'marketing-3', 'marketing-4', 'marketing-8', 'marketing-9', 'marketing-10'
  ]
};

/**
 * Génère un diagramme de Gantt complet
 */
export function generateGanttPlan(config: ProjectConfig): GeneratedTask[] {
  const template = PROJECT_TEMPLATES[config.category];

  // Collecter toutes les tâches nécessaires
  const taskIds = new Set([
    ...template.baseTasks,
    ...config.features.flatMap(feature => FEATURE_TASKS[feature] || [])
  ]);

  // Récupérer les templates de tâches
  const allTaskTemplates = taskLibrary.flatMap(cat => cat.tasks);
  const selectedTasks = Array.from(taskIds)
    .map(id => allTaskTemplates.find(t => t.id === id))
    .filter((t): t is TaskTemplate => t !== undefined);

  // Grouper par phase et créer les dépendances
  const tasksByPhase = groupTasksByPhase(selectedTasks);

  // Générer le planning avec dates
  const generatedTasks = generateTimeline(tasksByPhase, config.startDate, config.teamSize);

  return generatedTasks;
}

/**
 * Groupe les tâches par phase chronologique
 */
function groupTasksByPhase(tasks: TaskTemplate[]): Map<string, TaskTemplate[]> {
  const phaseMap = new Map<string, TaskTemplate[]>();

  tasks.forEach(task => {
    let phase = getPhaseFromCategory(task.category);

    // Gestion spéciale pour les tâches de validation client (positionnées stratégiquement)
    if (task.id === 'client-11') {
      phase = 'design'; // Validation design après les maquettes
    } else if (task.id === 'client-12') {
      phase = 'content'; // Validation contenu après intégration
    } else if (task.id === 'client-13' || task.id === 'testing-13') {
      phase = 'testing'; // Recette client et corrections en phase de tests
    }

    if (!phaseMap.has(phase)) {
      phaseMap.set(phase, []);
    }
    phaseMap.get(phase)!.push(task);
  });

  return phaseMap;
}

/**
 * Détermine la phase d'une tâche selon sa catégorie
 */
function getPhaseFromCategory(category: string): string {
  const phaseMapping: Record<string, string> = {
    // Phase 0: Commercial
    'client-communication': 'commercial',

    // Phase 1: Discovery
    'discovery': 'discovery',

    // Phase 2: Design
    'design': 'design',
    'design-assets': 'design',

    // Phase 3: Frontend
    'frontend': 'frontend',
    'frontend-features': 'frontend',
    'mobile-app': 'frontend',

    // Phase 4: Backend (inclut features avancées, sécurité, intégrations)
    'backend': 'backend',
    'ecommerce': 'backend',
    'security': 'backend',
    'compliance': 'backend',
    'integrations': 'backend',
    'advanced': 'backend',

    // Phase 5: Content
    'content': 'content',
    'content-management': 'content',
    'seo-advanced': 'content',

    // Phase 6: Testing
    'testing': 'testing',
    'accessibility-advanced': 'testing',
    'performance-advanced': 'testing',

    // Phase 7: Deployment
    'deployment': 'deployment',
    'hosting-infrastructure': 'deployment',

    // Phase 8: Maintenance (inclut marketing et monitoring post-lancement)
    'marketing-analytics': 'maintenance',
    'monitoring-devops': 'maintenance',
    'maintenance': 'maintenance',
    'marketing-digital': 'maintenance',

    // Legal & RGPD (pendant la phase de deployment pour conformité pré-lancement)
    'legal-rgpd': 'deployment',

    // Accessibilité (pendant les tests)
    'accessibility-pro': 'testing'
  };

  return phaseMapping[category] || 'backend';
}

/**
 * Génère la timeline avec dates et dépendances - VERSION RÉALISTE
 */
function generateTimeline(
  tasksByPhase: Map<string, TaskTemplate[]>,
  startDate: Date,
  teamSize: 'solo' | 'small' | 'medium' | 'large' = 'small'
): GeneratedTask[] {
  const generatedTasks: GeneratedTask[] = [];
  let taskOrder = 0;

  // Multiplicateur de durée selon la taille d'équipe
  // Ajusté pour plus de réalisme avec des buffers appropriés
  const durationMultiplier = {
    'solo': 1.8,    // Plus de temps pour le travail solo (contexte switching, décisions seules)
    'small': 1.3,   // Buffer pour coordination petite équipe
    'medium': 0.9,  // Léger buffer pour équipe moyenne
    'large': 0.6    // Équipe large avec plus de ressources
  }[teamSize];

  // Nombre max de tâches parallèles par phase (selon taille équipe)
  const maxParallelTasks: Record<string, number> = {
    'commercial': 1,     // Toujours séquentiel (réunions)
    'discovery': 1,      // Séquentiel (analyse méthodique)
    'design': teamSize === 'solo' ? 1 : teamSize === 'small' ? 2 : 3,
    'frontend': teamSize === 'solo' ? 1 : teamSize === 'small' ? 2 : teamSize === 'medium' ? 3 : 4,
    'backend': teamSize === 'solo' ? 1 : teamSize === 'small' ? 2 : teamSize === 'medium' ? 3 : 4,
    'content': teamSize === 'solo' ? 1 : teamSize === 'small' ? 2 : 3,
    'testing': teamSize === 'solo' ? 1 : 2,
    'deployment': 1,     // Toujours séquentiel (critique)
    'maintenance': teamSize === 'solo' ? 1 : 3
  };

  // Parcourir les phases dans l'ordre chronologique
  let phaseStartDate = new Date(startDate);

  PHASES.forEach(phase => {
    const phaseTasks = tasksByPhase.get(phase) || [];
    if (phaseTasks.length === 0) return;

    // Trier les tâches de la phase par priorité
    const sortedTasks = phaseTasks.sort((a, b) => {
      const priorityOrder = { 'critique': 0, 'haute': 1, 'moyenne': 2, 'basse': 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] -
             priorityOrder[b.priority as keyof typeof priorityOrder];
    });

    const maxParallel = maxParallelTasks[phase] || 1;
    const slots: Date[] = Array(maxParallel).fill(null).map(() => new Date(phaseStartDate));

    // Distribuer les tâches dans les slots parallèles disponibles
    sortedTasks.forEach(task => {
      const adjustedDuration = Math.ceil(task.duration * durationMultiplier);

      // Trouver le slot qui se libère le plus tôt
      const earliestSlotIndex = slots.reduce((minIdx, date, idx) =>
        date < slots[minIdx] ? idx : minIdx, 0
      );

      const taskStartDate = new Date(slots[earliestSlotIndex]);
      const taskEndDate = addDays(taskStartDate, adjustedDuration);

      generatedTasks.push({
        templateId: task.id,
        title: task.title,
        description: task.description,
        startDate: taskStartDate,
        endDate: taskEndDate,
        duration: adjustedDuration,
        priority: task.priority,
        category: task.category,
        dependencies: [], // Sera rempli après
        phase,
        order: taskOrder++
      });

      // Marquer le slot comme occupé jusqu'à la fin de cette tâche
      slots[earliestSlotIndex] = taskEndDate;
    });

    // La phase suivante commence après la fin de toutes les tâches
    const maxEndDate = new Date(Math.max(...slots.map(d => d.getTime())));

    // Buffer de transition entre phases
    const bufferDays = phase === 'commercial' ? 1 :
                       phase === 'discovery' ? 2 :
                       phase === 'design' ? 1 :
                       phase === 'testing' ? 2 :
                       phase === 'deployment' ? 1 : 0;

    phaseStartDate = addDays(maxEndDate, bufferDays);
  });

  // Ajouter les dépendances logiques
  addDependencies(generatedTasks);

  // Ajuster les dates pour respecter les dépendances
  adjustDatesForDependencies(generatedTasks);

  return generatedTasks;
}

/**
 * Ajuste les dates des tâches pour respecter les dépendances
 */
function adjustDatesForDependencies(tasks: GeneratedTask[]): void {
  const taskMap = new Map(tasks.map(t => [t.templateId, t]));
  let changed = true;
  let iterations = 0;
  const maxIterations = 10;

  // Boucle jusqu'à ce que toutes les dépendances soient respectées
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    tasks.forEach(task => {
      if (task.dependencies.length === 0) return;

      // Trouver la date de fin maximale des dépendances
      let maxDepEndDate = new Date(0);
      task.dependencies.forEach(depId => {
        const depTask = taskMap.get(depId);
        if (depTask && depTask.endDate > maxDepEndDate) {
          maxDepEndDate = new Date(depTask.endDate);
        }
      });

      // Si la tâche commence avant la fin de ses dépendances, la décaler
      if (maxDepEndDate > new Date(0) && task.startDate < maxDepEndDate) {
        const newStartDate = addDays(maxDepEndDate, 1); // 1 jour de buffer
        const duration = task.duration;
        task.startDate = newStartDate;
        task.endDate = addDays(newStartDate, duration);
        changed = true;
      }
    });
  }
}

/**
 * Ajoute les dépendances logiques entre tâches
 */
function addDependencies(tasks: GeneratedTask[]): void {
  // Règles de dépendances logiques complètes
  const dependencyRules: Record<string, string[]> = {
    // COMMERCIAL -> DISCOVERY
    'discovery-1': ['client-2'], // Brief après première réunion
    'discovery-2': ['client-2'],

    // DISCOVERY -> DESIGN
    'design-2': ['discovery-2', 'discovery-7'], // Wireframes après analyse
    'design-4': ['discovery-2'],                // Maquettes après wireframes
    'design-5': ['design-2'],                   // Design system après wireframes
    'design-6': ['design-4', 'design-5'],       // Prototype après maquettes
    'design-7': ['design-4'],                   // Assets après maquettes

    // DESIGN -> FRONTEND
    'frontend-feat-1': ['design-5'],            // Setup après design system
    'frontend-1': ['frontend-feat-1'],          // Architecture après setup
    'frontend-2': ['frontend-1'],               // Routing après architecture
    'frontend-3': ['frontend-1'],               // Components après architecture
    'frontend-4': ['frontend-3'],               // Layout après components
    'frontend-5': ['design-5', 'frontend-3'],   // UI library après design system
    'frontend-6': ['frontend-4', 'frontend-5'], // Pages après layout + UI
    'frontend-13': ['frontend-6'],              // SEO après pages
    'frontend-14': ['frontend-6'],              // PWA après pages

    // DESIGN -> BACKEND (peut commencer en parallèle)
    'backend-1': ['discovery-7'],               // Architecture après analyse technique
    'backend-2': ['backend-1'],                 // API après architecture
    'backend-3': ['backend-2'],                 // Database après API
    'backend-4': ['backend-3'],                 // Auth après database
    'backend-5': ['backend-3'],                 // Models après database
    'backend-6': ['backend-5'],                 // Email service après models

    // E-COMMERCE (après backend de base)
    'ecommerce-1': ['backend-3'],               // Catalogue après database
    'ecommerce-2': ['ecommerce-1'],             // Cart après catalogue
    'ecommerce-3': ['ecommerce-2'],             // Checkout après cart
    'ecommerce-4': ['backend-4'],               // User account après auth
    'ecommerce-5': ['ecommerce-3'],             // Order management après checkout
    'ecommerce-6': ['backend-2'],               // Payment gateway après API
    'ecommerce-7': ['ecommerce-6'],             // Payment processing après gateway
    'ecommerce-8': ['ecommerce-5'],             // Shipping après order management
    'ecommerce-9': ['ecommerce-5'],             // Inventory après order management

    // CONTENT (peut être parallèle au dev, mais après design)
    'content-1': ['design-4'],                  // Stratégie après maquettes
    'content-2': ['content-1'],                 // Rédaction après stratégie
    'content-3': ['content-2'],                 // Images après rédaction
    'content-5': ['frontend-6'],                // Intégration après pages
    'content-6': ['content-5'],                 // Optimisation après intégration

    // SEO (après content)
    'seo-1': ['content-5'],                     // Meta tags après intégration
    'seo-2': ['seo-1'],                         // Schema markup après meta
    'seo-3': ['seo-2'],                         // Sitemap après schema

    // SECURITY (pendant backend)
    'security-1': ['backend-1'],                // SSL après architecture
    'security-2': ['backend-4'],                // Security headers après auth
    'security-3': ['backend-2'],                // CSRF après API
    'security-4': ['backend-3'],                // Input validation après database

    // TESTING (après dev)
    'testing-1': ['frontend-6', 'backend-6'],   // Unit tests après pages + backend
    'testing-2': ['testing-1'],                 // Integration après unit
    'testing-3': ['testing-2'],                 // E2E après integration
    'testing-4': ['frontend-14'],               // Performance après PWA
    'testing-8': ['testing-3'],                 // UAT après E2E

    // DEPLOYMENT (après tests)
    'hosting-1': ['testing-8'],                 // Serveur après UAT
    'hosting-2': ['hosting-1'],                 // Config serveur
    'hosting-4': ['hosting-2'],                 // SSL certificat
    'hosting-5': ['hosting-4'],                 // CDN après SSL
    'deployment-1': ['hosting-5'],              // Pipeline après infra
    'deployment-2': ['deployment-1'],           // Env variables après pipeline
    'deployment-8': ['deployment-2'],           // Database migration après env
    'deployment-10': ['deployment-8'],          // Production deploy après migration
    'deployment-11': ['deployment-10'],         // Monitoring après deploy

    // MARKETING & ANALYTICS (après déploiement)
    'marketing-1': ['deployment-10'],           // Analytics après deploy
    'marketing-6': ['deployment-10'],           // Google tools après deploy

    // MONITORING (après déploiement)
    'monitoring-1': ['deployment-11'],          // Error tracking après monitoring setup
    'monitoring-3': ['monitoring-1'],           // Logs après error tracking

    // MAINTENANCE (après tout)
    'maintenance-2': ['deployment-11'],         // Backup après monitoring
    'maintenance-3': ['maintenance-2']          // Updates après backup
  };

  tasks.forEach(task => {
    const deps = dependencyRules[task.templateId] || [];
    // Ne garder que les dépendances qui existent dans le projet
    task.dependencies = deps.filter(depId =>
      tasks.some(t => t.templateId === depId)
    );
  });
}

/**
 * Exporte le plan au format lisible
 */
export function exportPlanSummary(tasks: GeneratedTask[]): string {
  const phases = Array.from(new Set(tasks.map(t => t.phase)));

  let summary = '# Plan de projet Gantt\n\n';

  phases.forEach(phase => {
    const phaseTasks = tasks.filter(t => t.phase === phase);
    summary += `## Phase: ${phase.toUpperCase()}\n\n`;

    phaseTasks.forEach(task => {
      summary += `- **${task.title}**\n`;
      summary += `  - Dates: ${format(task.startDate, 'dd/MM/yyyy')} → ${format(task.endDate, 'dd/MM/yyyy')}\n`;
      summary += `  - Durée: ${task.duration} jours\n`;
      summary += `  - Priorité: ${task.priority}\n\n`;
    });
  });

  return summary;
}
