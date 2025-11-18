'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 flex-none">
      <div className="border-t border-zinc-100 dark:border-zinc-700/40 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {t('copyright', { year })}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {t('builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

