/**
 * Algorithme du chemin critique (CPM - Critical Path Method)
 * Identifie les tâches critiques qui ne peuvent pas être retardées sans retarder le projet
 */

interface Task {
  id: string;
  title: string;
  startDate: string | null;
  dueDate: string | null;
  duration: number | null;
  dependencies?: Array<{
    taskId: string;
    type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
    lag: number;
  }> | string[] | null;
}

interface CriticalPathResult {
  criticalTasks: Set<string>;
  earliestStart: Map<string, number>;
  earliestFinish: Map<string, number>;
  latestStart: Map<string, number>;
  latestFinish: Map<string, number>;
  slack: Map<string, number>;
  projectDuration: number;
}

/**
 * Normalise les dépendances au format uniforme
 */
function normalizeDependencies(task: Task): string[] {
  if (!task.dependencies) return [];

  if (Array.isArray(task.dependencies)) {
    if (task.dependencies.length === 0) return [];

    // Si c'est un tableau d'objets
    if (typeof task.dependencies[0] === 'object') {
      return task.dependencies.map((dep: any) => dep.taskId);
    }

    // Si c'est un tableau de strings
    return task.dependencies as string[];
  }

  return [];
}

/**
 * Calcule le chemin critique d'un ensemble de tâches
 */
export function calculateCriticalPath(tasks: Task[]): CriticalPathResult {
  // Maps pour stocker les valeurs calculées
  const earliestStart = new Map<string, number>();
  const earliestFinish = new Map<string, number>();
  const latestStart = new Map<string, number>();
  const latestFinish = new Map<string, number>();
  const slack = new Map<string, number>();

  // Créer un graphe de dépendances
  const taskMap = new Map(tasks.map(t => [t.id, t]));
  const successors = new Map<string, string[]>();
  const predecessors = new Map<string, string[]>();

  // Construire le graphe
  tasks.forEach(task => {
    successors.set(task.id, []);
    predecessors.set(task.id, normalizeDependencies(task));
  });

  // Construire les successeurs (inverse des prédécesseurs)
  tasks.forEach(task => {
    const preds = predecessors.get(task.id) || [];
    preds.forEach(predId => {
      const succs = successors.get(predId) || [];
      succs.push(task.id);
      successors.set(predId, succs);
    });
  });

  // FORWARD PASS - Calculer les dates de début/fin au plus tôt
  const visited = new Set<string>();
  const queue: string[] = [];

  // Trouver les tâches sans prédécesseurs (tâches de début)
  tasks.forEach(task => {
    const preds = predecessors.get(task.id) || [];
    if (preds.length === 0) {
      earliestStart.set(task.id, 0);
      const duration = task.duration || 1;
      earliestFinish.set(task.id, duration);
      queue.push(task.id);
      visited.add(task.id);
    }
  });

  // Parcourir le graphe en largeur
  while (queue.length > 0) {
    const taskId = queue.shift()!;
    const succs = successors.get(taskId) || [];

    succs.forEach(succId => {
      const preds = predecessors.get(succId) || [];

      // Vérifier si tous les prédécesseurs ont été visités
      if (preds.every(p => visited.has(p))) {
        // Calculer le début au plus tôt = max des fins au plus tôt des prédécesseurs
        const maxFinish = Math.max(
          ...preds.map(p => earliestFinish.get(p) || 0),
          0
        );

        const task = taskMap.get(succId);
        const duration = task?.duration || 1;

        earliestStart.set(succId, maxFinish);
        earliestFinish.set(succId, maxFinish + duration);

        queue.push(succId);
        visited.add(succId);
      }
    });
  }

  // Durée totale du projet = max des fins au plus tôt
  const projectDuration = Math.max(...Array.from(earliestFinish.values()), 0);

  // BACKWARD PASS - Calculer les dates de début/fin au plus tard
  const backQueue: string[] = [];
  const backVisited = new Set<string>();

  // Trouver les tâches sans successeurs (tâches de fin)
  tasks.forEach(task => {
    const succs = successors.get(task.id) || [];
    if (succs.length === 0) {
      latestFinish.set(task.id, projectDuration);
      const duration = task.duration || 1;
      latestStart.set(task.id, projectDuration - duration);
      backQueue.push(task.id);
      backVisited.add(task.id);
    }
  });

  // Parcourir le graphe en remontant
  while (backQueue.length > 0) {
    const taskId = backQueue.shift()!;
    const preds = predecessors.get(taskId) || [];

    preds.forEach(predId => {
      const succs = successors.get(predId) || [];

      // Vérifier si tous les successeurs ont été visités
      if (succs.every(s => backVisited.has(s))) {
        // Calculer la fin au plus tard = min des débuts au plus tard des successeurs
        const minStart = Math.min(
          ...succs.map(s => latestStart.get(s) || projectDuration),
          projectDuration
        );

        const task = taskMap.get(predId);
        const duration = task?.duration || 1;

        latestFinish.set(predId, minStart);
        latestStart.set(predId, minStart - duration);

        backQueue.push(predId);
        backVisited.add(predId);
      }
    });
  }

  // Calculer la marge (slack) et identifier les tâches critiques
  const criticalTasks = new Set<string>();

  tasks.forEach(task => {
    const es = earliestStart.get(task.id) || 0;
    const ls = latestStart.get(task.id) || 0;
    const taskSlack = ls - es;

    slack.set(task.id, taskSlack);

    // Tâche critique = marge nulle ou quasi-nulle
    if (Math.abs(taskSlack) < 0.001) {
      criticalTasks.add(task.id);
    }
  });

  return {
    criticalTasks,
    earliestStart,
    earliestFinish,
    latestStart,
    latestFinish,
    slack,
    projectDuration
  };
}

/**
 * Trouve le chemin critique complet (séquence de tâches)
 */
export function getCriticalPathSequence(tasks: Task[]): string[] {
  const { criticalTasks } = calculateCriticalPath(tasks);

  // Construire le graphe de dépendances des tâches critiques
  const criticalDeps = new Map<string, string[]>();

  tasks.forEach(task => {
    if (criticalTasks.has(task.id)) {
      const deps = normalizeDependencies(task)
        .filter(depId => criticalTasks.has(depId));
      criticalDeps.set(task.id, deps);
    }
  });

  // Tri topologique pour obtenir la séquence
  const sequence: string[] = [];
  const visited = new Set<string>();

  function visit(taskId: string) {
    if (visited.has(taskId)) return;
    visited.add(taskId);

    const deps = criticalDeps.get(taskId) || [];
    deps.forEach(visit);

    sequence.push(taskId);
  }

  Array.from(criticalTasks).forEach(visit);

  return sequence;
}
