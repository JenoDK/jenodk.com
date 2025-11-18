'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills, SkillCategory } from '@/lib/data/skills';

const categoryLabels: Record<SkillCategory, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  tools: 'Tools',
};

const levelColors = {
  expert: 'bg-green-500 dark:bg-green-600',
  advanced: 'bg-blue-500 dark:bg-blue-600',
  intermediate: 'bg-yellow-500 dark:bg-yellow-600',
  beginner: 'bg-gray-500 dark:bg-gray-600',
};

export default function Skills() {
  const t = useTranslations('skills');

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  return (
    <section id="skills" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(skillsByCategory) as SkillCategory[]).map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20"
            >
              <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">{t(category)}</h3>
              <div className="space-y-3">
                {skillsByCategory[category].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{skill.name}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${levelColors[skill.level]}`}
                        style={{
                          width:
                            skill.level === 'expert'
                              ? '100%'
                              : skill.level === 'advanced'
                              ? '75%'
                              : skill.level === 'intermediate'
                              ? '50%'
                              : '25%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

