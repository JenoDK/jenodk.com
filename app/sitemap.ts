import { MetadataRoute } from 'next';
import { routing } from '@/routing';

const getSiteUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://jenodk.com';
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  routing.locales.forEach((locale) => {
    const baseUrl = locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
    
    routes.push({
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            loc === routing.defaultLocale ? siteUrl : `${siteUrl}/${loc}`,
          ])
        ),
      },
    });
  });

  return routes;
}

