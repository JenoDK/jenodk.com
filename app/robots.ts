import { MetadataRoute } from 'next';

const getSiteUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://jenodk.com';
};

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/_vercel/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

