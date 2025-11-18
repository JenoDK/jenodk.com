'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('about');

  const quickFacts = [
    { key: 'yearsExperience', icon: '💼' },
    { key: 'practleUsers', icon: '👥' },
    { key: 'freelance', icon: '🚀' },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-100"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-center max-w-3xl mx-auto mb-12 text-zinc-600 dark:text-zinc-400"
        >
          {t('summary')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20 text-center"
            >
              <div className="text-4xl mb-4">{fact.icon}</div>
              <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
                {t(`quickFacts.${fact.key}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

