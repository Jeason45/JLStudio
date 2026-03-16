import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jlstudio.dev';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-16'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/qualifier`,
      lastModified: new Date('2026-03-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions-generales-de-vente`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
