'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { experiences } from '@/lib/data/experience';
import { useState } from 'react';

export default function Experience() {
  const t = useTranslations('experience');
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="experience" className="py-20 px-4 overflow-x-hidden">
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

        <div className="relative overflow-x-hidden">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-700/40 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-zinc-800 dark:bg-zinc-100 rounded-full transform -translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  } max-w-full`}
                >
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {exp.company}
                          {exp.url && (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                            >
                              ↗
                            </a>
                          )}
                          {exp.current && (
                            <span className="ml-2 text-sm text-emerald-600 dark:text-emerald-400">
                              ({t('current')})
                            </span>
                          )}
                        </h3>
                        <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {exp.period}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <button
                        onClick={() =>
                          setExpanded(expanded === exp.company ? null : exp.company)
                        }
                        className="text-sm text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-2"
                      >
                        {expanded === exp.company ? 'Hide' : 'Show'} details
                      </button>
                    )}

                    {expanded === exp.company && exp.highlights && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}

                    {exp.techStack && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

