import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">404</h1>
      <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">Page not found</p>
    </div>
  );
}

