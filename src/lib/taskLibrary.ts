export interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  estimatedDays: number;
  category: string;
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
    id: 'decouverte',
    name: 'Decouverte',
    icon: 'search',
    color: '#818cf8',
    description: 'Phase de decouverte et cadrage du projet',
    tasks: [
      {
        id: 'dec-1',
        title: 'Brief client',
        description: 'Reunion de lancement et recueil des besoins',
        estimatedDays: 1,
        category: 'decouverte'
      },
      {
        id: 'dec-2',
        title: 'Analyse des besoins',
        description: 'Analyse detaillee des besoins fonctionnels et techniques',
        estimatedDays: 2,
        category: 'decouverte'
      },
      {
        id: 'dec-3',
        title: 'Audit existant',
        description: 'Audit du site ou de la solution existante',
        estimatedDays: 2,
        category: 'decouverte'
      },
      {
        id: 'dec-4',
        title: 'Benchmark concurrence',
        description: 'Analyse des sites concurrents et bonnes pratiques',
        estimatedDays: 2,
        category: 'decouverte'
      },
      {
        id: 'dec-5',
        title: 'Maquettes wireframe',
        description: 'Creation des wireframes basse fidelite',
        estimatedDays: 3,
        category: 'decouverte'
      },
      {
        id: 'dec-6',
        title: 'Arborescence du site',
        description: 'Definition de la structure et navigation du site',
        estimatedDays: 1,
        category: 'decouverte'
      },
      {
        id: 'dec-7',
        title: 'Cahier des charges',
        description: 'Redaction du cahier des charges complet',
        estimatedDays: 3,
        category: 'decouverte'
      },
      {
        id: 'dec-8',
        title: 'Validation client decouverte',
        description: 'Presentation et validation du cadrage avec le client',
        estimatedDays: 1,
        category: 'decouverte'
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'palette',
    color: '#D4AF37',
    description: 'Conception visuelle et experience utilisateur',
    tasks: [
      {
        id: 'des-1',
        title: 'Moodboard',
        description: 'Creation du moodboard avec references visuelles',
        estimatedDays: 1,
        category: 'design'
      },
      {
        id: 'des-2',
        title: 'Design UI pages principales',
        description: 'Maquettes haute fidelite des pages cles',
        estimatedDays: 5,
        category: 'design'
      },
      {
        id: 'des-3',
        title: 'Design responsive',
        description: 'Adaptation des maquettes pour mobile et tablette',
        estimatedDays: 3,
        category: 'design'
      },
      {
        id: 'des-4',
        title: 'Design composants',
        description: 'Creation des composants UI reutilisables',
        estimatedDays: 3,
        category: 'design'
      },
      {
        id: 'des-5',
        title: 'Design pages secondaires',
        description: 'Maquettes des pages annexes et templates',
        estimatedDays: 3,
        category: 'design'
      },
      {
        id: 'des-6',
        title: 'Prototype interactif',
        description: 'Creation du prototype cliquable',
        estimatedDays: 2,
        category: 'design'
      },
      {
        id: 'des-7',
        title: 'Validation design client',
        description: 'Presentation et validation des maquettes finales',
        estimatedDays: 1,
        category: 'design'
      },
      {
        id: 'des-8',
        title: 'Export assets',
        description: 'Export des images, icones et ressources graphiques',
        estimatedDays: 1,
        category: 'design'
      }
    ]
  },
  {
    id: 'developpement',
    name: 'Developpement',
    icon: 'code',
    color: '#34d399',
    description: 'Integration et developpement technique',
    tasks: [
      {
        id: 'dev-1',
        title: 'Setup projet',
        description: 'Initialisation du projet, repo et configuration',
        estimatedDays: 1,
        category: 'developpement'
      },
      {
        id: 'dev-2',
        title: 'Integration header / footer',
        description: 'Developpement du header et footer responsive',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-3',
        title: 'Pages principales',
        description: 'Integration des pages cles du site',
        estimatedDays: 5,
        category: 'developpement'
      },
      {
        id: 'dev-4',
        title: 'Formulaires',
        description: 'Developpement des formulaires et validations',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-5',
        title: 'CMS / back-office',
        description: 'Mise en place du systeme de gestion de contenu',
        estimatedDays: 4,
        category: 'developpement'
      },
      {
        id: 'dev-6',
        title: 'Integration responsive',
        description: 'Ajustements responsive sur tous les breakpoints',
        estimatedDays: 3,
        category: 'developpement'
      },
      {
        id: 'dev-7',
        title: 'Animations',
        description: 'Implementation des animations et transitions',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-8',
        title: 'SEO technique',
        description: 'Meta tags, sitemap, schema.org, performance',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-9',
        title: 'Integration API',
        description: 'Connexion aux APIs externes et services tiers',
        estimatedDays: 3,
        category: 'developpement'
      },
      {
        id: 'dev-10',
        title: 'Pages secondaires',
        description: 'Integration des pages annexes',
        estimatedDays: 3,
        category: 'developpement'
      },
      {
        id: 'dev-11',
        title: 'Fonctionnalites specifiques',
        description: 'Developpement des features propres au projet',
        estimatedDays: 5,
        category: 'developpement'
      },
      {
        id: 'dev-12',
        title: 'Optimisation performance',
        description: 'Lazy loading, compression, code splitting',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-13',
        title: 'Tests cross-browser',
        description: 'Verification sur Chrome, Firefox, Safari, Edge',
        estimatedDays: 2,
        category: 'developpement'
      },
      {
        id: 'dev-14',
        title: 'Corrections bugs',
        description: 'Correction des bugs identifies pendant le dev',
        estimatedDays: 3,
        category: 'developpement'
      }
    ]
  },
  {
    id: 'tests',
    name: 'Tests & Recette',
    icon: 'check-circle',
    color: '#f59e0b',
    description: 'Phase de tests et validation',
    tasks: [
      {
        id: 'test-1',
        title: 'Tests fonctionnels',
        description: 'Verification de toutes les fonctionnalites',
        estimatedDays: 2,
        category: 'tests'
      },
      {
        id: 'test-2',
        title: 'Tests responsive',
        description: 'Tests sur differents appareils et tailles ecran',
        estimatedDays: 1,
        category: 'tests'
      },
      {
        id: 'test-3',
        title: 'Tests performance',
        description: 'Audit Lighthouse, temps de chargement, Core Web Vitals',
        estimatedDays: 1,
        category: 'tests'
      },
      {
        id: 'test-4',
        title: 'Corrections pre-recette',
        description: 'Correction des anomalies trouvees en tests internes',
        estimatedDays: 2,
        category: 'tests'
      },
      {
        id: 'test-5',
        title: 'Recette client',
        description: 'Presentation au client et collecte des retours',
        estimatedDays: 2,
        category: 'tests'
      },
      {
        id: 'test-6',
        title: 'Corrections post-recette',
        description: 'Application des retours client',
        estimatedDays: 3,
        category: 'tests'
      },
      {
        id: 'test-7',
        title: 'Validation finale',
        description: 'Validation definitive par le client avant mise en ligne',
        estimatedDays: 1,
        category: 'tests'
      }
    ]
  },
  {
    id: 'livraison',
    name: 'Livraison',
    icon: 'rocket',
    color: '#ef4444',
    description: 'Mise en production et accompagnement',
    tasks: [
      {
        id: 'liv-1',
        title: 'Mise en production',
        description: 'Deploiement sur le serveur de production',
        estimatedDays: 1,
        category: 'livraison'
      },
      {
        id: 'liv-2',
        title: 'Configuration DNS',
        description: 'Configuration du nom de domaine et certificat SSL',
        estimatedDays: 1,
        category: 'livraison'
      },
      {
        id: 'liv-3',
        title: 'Tests production',
        description: 'Verification du bon fonctionnement en production',
        estimatedDays: 1,
        category: 'livraison'
      },
      {
        id: 'liv-4',
        title: 'Formation client',
        description: 'Formation a la prise en main du site et du back-office',
        estimatedDays: 1,
        category: 'livraison'
      },
      {
        id: 'liv-5',
        title: 'Documentation',
        description: 'Remise de la documentation technique et utilisateur',
        estimatedDays: 1,
        category: 'livraison'
      },
      {
        id: 'liv-6',
        title: 'Garantie et maintenance',
        description: 'Periode de garantie et suivi post-livraison',
        estimatedDays: 5,
        category: 'livraison'
      }
    ]
  }
];

// Helper: get all tasks flat
export function getAllTasks(): TaskTemplate[] {
  return taskLibrary.flatMap(category => category.tasks);
}

// Helper: get tasks by category
export function getTasksByCategory(categoryId: string): TaskTemplate[] {
  const category = taskLibrary.find(cat => cat.id === categoryId);
  return category ? category.tasks : [];
}

// Helper: get a single task by ID
export function getTaskById(taskId: string): TaskTemplate | undefined {
  return getAllTasks().find(task => task.id === taskId);
}

// Helper: search tasks by query
export function searchTasks(query: string): TaskTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllTasks().filter(task =>
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery)
  );
}
