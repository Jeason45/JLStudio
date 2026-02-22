export function calculateLeadScore(data: {
  budget?: string;
  deadline?: string;
  company?: string;
  phone?: string;
  features?: string[];
  projectType?: string;
}): number {
  let score = 50;

  const budgetScore: Record<string, number> = {
    '<2000': 5,
    '2000-5000': 15,
    '5000-10000': 20,
    '>10000': 25,
  };
  score += budgetScore[data.budget || ''] || 0;

  const deadlineScore: Record<string, number> = {
    urgent: 15,
    '1-2-mois': 10,
    '2-3-mois': 5,
    flexible: 0,
  };
  score += deadlineScore[data.deadline || ''] || 0;

  if (data.company) score += 3;
  if (data.phone) score += 2;
  if (data.features && data.features.length >= 3) score += 5;

  return Math.min(score, 100);
}

export function calculateEstimatedPrice(data: {
  projectType?: string;
  pages?: string;
  features?: string[];
  deadline?: string;
}): number {
  let basePrice = 0;

  switch (data.projectType) {
    case 'vitrine': basePrice = 2000; break;
    case 'ecommerce': basePrice = 5000; break;
    case 'webapp': basePrice = 8000; break;
    case 'refonte': basePrice = 3000; break;
    case 'landing': basePrice = 1200; break;
    default: basePrice = 2500;
  }

  const pages = parseInt(data.pages || '0') || 0;
  if (pages > 10) basePrice += (pages - 10) * 150;

  const featurePricing: Record<string, number> = {
    responsive: 0,
    seo: 500,
    cms: 800,
    blog: 600,
    booking: 1500,
    payment: 1200,
    multilang: 1000,
    analytics: 400,
  };

  if (data.features) {
    data.features.forEach(f => { basePrice += featurePricing[f] || 0; });
  }

  if (data.deadline === 'urgent') basePrice *= 1.3;

  return Math.round(basePrice / 100) * 100;
}
