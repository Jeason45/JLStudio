/**
 * Generateur simplifie de diagrammes de Gantt
 * Cree un planning sequentiel par phase a partir des templates de projets
 */

import { taskLibrary, TaskTemplate } from './taskLibrary';
import { addDays, format } from 'date-fns';

export type ProjectCategory =
  | 'vitrine'
  | 'ecommerce'
  | 'webapp'
  | 'refonte'
  | 'landing';

export interface ProjectConfig {
  category: ProjectCategory;
  startDate: Date;
}

export interface GeneratedTask {
  templateId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  category: string;
  phase: string;
  order: number;
}

// Templates de projets: liste ordonnee de task IDs par type de projet
const PROJECT_TEMPLATES: Record<ProjectCategory, {
  name: string;
  taskIds: string[];
}> = {
  vitrine: {
    name: 'Site Vitrine',
    taskIds: [
      // Decouverte
      'dec-1', 'dec-2', 'dec-4', 'dec-6', 'dec-7', 'dec-8',
      // Design
      'des-1', 'des-2', 'des-3', 'des-4', 'des-7', 'des-8',
      // Developpement
      'dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-6', 'dev-7', 'dev-8', 'dev-12', 'dev-13',
      // Tests
      'test-1', 'test-2', 'test-3', 'test-5', 'test-6', 'test-7',
      // Livraison
      'liv-1', 'liv-2', 'liv-3', 'liv-4', 'liv-5', 'liv-6'
    ]
  },

  ecommerce: {
    name: 'Site E-commerce',
    taskIds: [
      // Decouverte
      'dec-1', 'dec-2', 'dec-3', 'dec-4', 'dec-5', 'dec-6', 'dec-7', 'dec-8',
      // Design
      'des-1', 'des-2', 'des-3', 'des-4', 'des-5', 'des-6', 'des-7', 'des-8',
      // Developpement
      'dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-5', 'dev-6', 'dev-7', 'dev-8',
      'dev-9', 'dev-10', 'dev-11', 'dev-12', 'dev-13', 'dev-14',
      // Tests
      'test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6', 'test-7',
      // Livraison
      'liv-1', 'liv-2', 'liv-3', 'liv-4', 'liv-5', 'liv-6'
    ]
  },

  webapp: {
    name: 'Application Web',
    taskIds: [
      // Decouverte
      'dec-1', 'dec-2', 'dec-3', 'dec-5', 'dec-6', 'dec-7', 'dec-8',
      // Design
      'des-1', 'des-2', 'des-3', 'des-4', 'des-5', 'des-6', 'des-7', 'des-8',
      // Developpement
      'dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-5', 'dev-6', 'dev-7', 'dev-8',
      'dev-9', 'dev-10', 'dev-11', 'dev-12', 'dev-13', 'dev-14',
      // Tests
      'test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6', 'test-7',
      // Livraison
      'liv-1', 'liv-2', 'liv-3', 'liv-4', 'liv-5', 'liv-6'
    ]
  },

  refonte: {
    name: 'Refonte de Site',
    taskIds: [
      // Decouverte
      'dec-1', 'dec-2', 'dec-3', 'dec-4', 'dec-5', 'dec-6', 'dec-7', 'dec-8',
      // Design
      'des-1', 'des-2', 'des-3', 'des-4', 'des-5', 'des-7', 'des-8',
      // Developpement
      'dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-6', 'dev-7', 'dev-8',
      'dev-10', 'dev-11', 'dev-12', 'dev-13', 'dev-14',
      // Tests
      'test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6', 'test-7',
      // Livraison
      'liv-1', 'liv-2', 'liv-3', 'liv-4', 'liv-5', 'liv-6'
    ]
  },

  landing: {
    name: 'Landing Page',
    taskIds: [
      // Decouverte
      'dec-1', 'dec-2', 'dec-6', 'dec-8',
      // Design
      'des-1', 'des-2', 'des-3', 'des-7', 'des-8',
      // Developpement
      'dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-6', 'dev-7', 'dev-8', 'dev-12',
      // Tests
      'test-1', 'test-2', 'test-3', 'test-5', 'test-7',
      // Livraison
      'liv-1', 'liv-2', 'liv-3', 'liv-5', 'liv-6'
    ]
  }
};

/**
 * Genere un plan Gantt sequentiel a partir de la configuration projet
 */
export function generateGanttPlan(config: ProjectConfig): GeneratedTask[] {
  const template = PROJECT_TEMPLATES[config.category];
  if (!template) return [];

  // Recuperer toutes les taches de la librairie
  const allTasks = taskLibrary.flatMap(cat => cat.tasks);

  // Resoudre les IDs en TaskTemplate
  const selectedTasks = template.taskIds
    .map(id => allTasks.find(t => t.id === id))
    .filter((t): t is TaskTemplate => t !== undefined);

  // Generer le planning sequentiel
  const generatedTasks: GeneratedTask[] = [];
  let currentDate = new Date(config.startDate);

  selectedTasks.forEach((task, index) => {
    const taskStart = new Date(currentDate);
    const taskEnd = addDays(taskStart, task.estimatedDays);

    generatedTasks.push({
      templateId: task.id,
      title: task.title,
      description: task.description,
      startDate: taskStart,
      endDate: taskEnd,
      duration: task.estimatedDays,
      category: task.category,
      phase: task.category,
      order: index
    });

    currentDate = taskEnd;
  });

  return generatedTasks;
}

/**
 * Exporte le plan au format lisible
 */
export function exportPlanSummary(tasks: GeneratedTask[]): string {
  const phases = Array.from(new Set(tasks.map(t => t.phase)));

  let summary = '# Plan de projet Gantt\n\n';

  phases.forEach(phase => {
    const phaseTasks = tasks.filter(t => t.phase === phase);
    const phaseName = phase.charAt(0).toUpperCase() + phase.slice(1);
    summary += `## ${phaseName}\n\n`;

    phaseTasks.forEach(task => {
      summary += `- **${task.title}**\n`;
      summary += `  - Dates: ${format(task.startDate, 'dd/MM/yyyy')} - ${format(task.endDate, 'dd/MM/yyyy')}\n`;
      summary += `  - Duree: ${task.duration} jours\n\n`;
    });
  });

  return summary;
}
