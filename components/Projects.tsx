'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { projects, ProjectType } from '@/lib/data/projects';
import { useState } from 'react';

export default function Projects() {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.type === filter);

  const filters: Array<{ key: ProjectType | 'all'; label: string }> = [
    { key: 'all', label: t('filter.all') },
    { key: 'professional', label: t('filter.professional') },
    { key: 'personal', label: t('filter.personal') },
    { key: 'opensource', label: t('filter.opensource') },
  ];

  return (
    <section id="projects" className="py-20 px-4">
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

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                filter === f.key
                  ? 'bg-zinc-800 dark:bg-zinc-700 text-zinc-100 dark:text-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-600'
                  : 'bg-zinc-200 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative flex flex-col items-start bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20 hover:ring-zinc-200 dark:hover:ring-zinc-300/30 transition-all ${
                project.featured ? 'ring-2 ring-zinc-800 dark:ring-zinc-100' : ''
              }`}
            >
              <div className="w-full flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{project.title}</h3>
                {project.wip && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-1 rounded">
                    {t('wip')}
                  </span>
                )}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
                {project.description}
              </p>

              {project.stats && (
                <div className="mb-4 space-y-1">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400 font-semibold">{stat.label}:</span>{' '}
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-1 text-zinc-500 dark:text-zinc-400 text-xs">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {t('viewProject')} →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {t('viewCode')} →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

