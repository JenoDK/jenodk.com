'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-zinc-600 dark:text-zinc-400 mb-8"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <a
            href="mailto:jenodekeyzer@gmail.com"
            className="px-6 py-3 bg-zinc-800 dark:bg-zinc-700 text-zinc-100 dark:text-zinc-100 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-600 active:bg-zinc-800 dark:active:bg-zinc-700 active:text-zinc-100/70 dark:active:text-zinc-100/70 transition-colors font-semibold text-sm"
          >
            {t('email')}
          </a>
          <a
            href="https://github.com/JenoDK"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-zinc-800 dark:bg-zinc-700 text-zinc-100 dark:text-zinc-100 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-600 active:bg-zinc-800 dark:active:bg-zinc-700 active:text-zinc-100/70 dark:active:text-zinc-100/70 transition-colors font-semibold text-sm"
          >
            {t('github')}
          </a>
          <a
            href="/cv/CV_EN.pdf"
            download
            className="px-6 py-3 border-2 border-zinc-800 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors font-semibold text-sm"
          >
            {t('downloadCV')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

