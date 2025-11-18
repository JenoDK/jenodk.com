import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/Providers';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}

