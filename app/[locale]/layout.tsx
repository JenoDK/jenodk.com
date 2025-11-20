import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/Providers';
import type { Metadata } from 'next';
import { routing } from '@/routing';
import StructuredData from '@/components/StructuredData';

const getSiteUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://jenodk.com';
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const baseUrl = `${siteUrl}/${locale}`;
  const canonicalUrl = locale === routing.defaultLocale ? siteUrl : baseUrl;
  
  const title = locale === 'en' 
    ? 'Jeno De Keyzer | Full-stack Developer | Freelancer'
    : 'Jeno De Keyzer | Full-stack Developer | Freelancer';
  
  const description = locale === 'en'
    ? 'Jeno De Keyzer - Full-stack developer with 10 years of experience. Partner at Practle, open to freelance opportunities. Expert in modern web technologies.'
    : 'Jeno De Keyzer - Full-stack developer met 10 jaar ervaring. Partner bij Practle, open voor freelance mogelijkheden. Expert in moderne web technologieën.';

  const alternateLanguages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    if (loc === routing.defaultLocale) {
      alternateLanguages[loc] = siteUrl;
    } else {
      alternateLanguages[loc] = `${siteUrl}/${loc}`;
    }
  });

  return {
    title,
    description,
    keywords: ['Jeno De Keyzer', 'jeno', 'jenodk', 'full-stack developer', 'freelancer', 'Practle', 'web developer', 'software engineer'],
    authors: [{ name: 'Jeno De Keyzer' }],
    creator: 'Jeno De Keyzer',
    publisher: 'Jeno De Keyzer',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'nl_NL',
      url: canonicalUrl,
      siteName: 'Jeno De Keyzer',
      title,
      description,
      images: [
        {
          url: `${siteUrl}/images/profile_picture.jpg`,
          width: 128,
          height: 128,
          alt: 'Jeno De Keyzer - Full-stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [`${siteUrl}/images/profile_picture.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const siteUrl = getSiteUrl();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <StructuredData locale={locale} siteUrl={siteUrl} />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}

