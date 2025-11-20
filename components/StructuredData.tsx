'use client';

export default function StructuredData({ locale, siteUrl }: { locale: string; siteUrl: string }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeno De Keyzer',
    alternateName: ['jeno', 'jenodk'],
    jobTitle: 'Full-stack Developer',
    description: locale === 'en'
      ? 'Full-stack developer with 10 years of professional experience, ranging from enterprise software development to partnering in a successful and growing SaaS startup.'
      : 'Full-stack developer met 10 jaar professionele ervaring, variërend van enterprise software ontwikkeling tot partnerschap in een succesvolle en groeiende SaaS startup.',
    url: siteUrl,
    image: `${siteUrl}/images/profile_picture.jpg`,
    sameAs: [
      'https://github.com/JenoDK',
      `mailto:jenodekeyzer@gmail.com`,
    ],
    email: 'jenodekeyzer@gmail.com',
    knowsAbout: [
      'Full-stack Development',
      'Web Development',
      'Software Engineering',
      'SaaS',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Practle',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Practle',
      jobTitle: 'Partner',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

