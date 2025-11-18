'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { StravaStats } from '@/lib/strava';
import { SportType } from '@/lib/strava';
import { useTheme } from './ThemeProvider';

// Dynamically import ActivityHeatmap to avoid SSR issues with leaflet
const ActivityHeatmap = dynamic(() => import('./ActivityHeatmap'), {
  ssr: false,
});

export default function StravaStats() {
  const t = useTranslations('strava');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stats, setStats] = useState<StravaStats | null>(null);
  const [selectedSport, setSelectedSport] = useState<SportType>('Ride');
  const [loading, setLoading] = useState(true);
  const [usingCache, setUsingCache] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchStats(false);
    }
  }, []);

  const fetchStats = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const url = forceRefresh ? '/api/strava/stats?refresh=true' : '/api/strava/stats';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
      setUsingCache(data.usingCache || false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="strava" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-100">
            {t('title', { year: new Date().getFullYear() })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20 animate-pulse"
              >
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-4" />
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="strava" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-100">
            {t('title', { year: new Date().getFullYear() })}
          </h2>
          <div className="text-center text-red-600 dark:text-red-400">
            {error || 'Failed to load stats'}
          </div>
        </div>
      </section>
    );
  }

  const currentStats = stats?.statsBySport?.[selectedSport];
  if (!currentStats || !stats) {
    return (
      <section id="strava" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-100">
            {t('title', { year: new Date().getFullYear() })}
          </h2>
          <div className="text-center text-zinc-600 dark:text-zinc-400">
            {t('noData')}
          </div>
        </div>
      </section>
    );
  }

  const sportIcons: Record<SportType, string> = {
    Ride: '🚴',
    Run: '🏃',
    Walk: '🚶',
  };

  const sportLabels: Record<SportType, string> = {
    Ride: t('sportTypes.ride'),
    Run: t('sportTypes.run'),
    Walk: t('sportTypes.walk'),
  };

  const getActivityLabel = (sport: SportType) => {
    if (sport === 'Ride') return t('activities.rides');
    if (sport === 'Run') return t('activities.runs');
    return t('activities.walks');
  };

  const statCards = [
    {
      label: t('weeklyStreak'),
      value: `${currentStats.weeklyStreak} weeks`,
      icon: '🔥',
    },
    {
      label: t('totalKm'),
      value: `${currentStats.totalKmThisYear} km`,
      icon: sportIcons[selectedSport],
    },
    {
      label: t('longestActivity'),
      value: `${currentStats.longestActivity.distance} km`,
      subValue: currentStats.longestActivity.date
        ? new Date(currentStats.longestActivity.date).toLocaleDateString()
        : undefined,
      icon: '📏',
    },
    {
      label: t('maxElevationGain'),
      value: `${currentStats.maxElevationGain.elevation} m`,
      subValue: currentStats.maxElevationGain.date
        ? new Date(currentStats.maxElevationGain.date).toLocaleDateString()
        : undefined,
      icon: '⛰️',
    },
    {
      label: t('earlyBird'),
      value: `${currentStats.earlyBirdCount} ${getActivityLabel(selectedSport)}`,
      icon: '🌅',
    },
    {
      label: selectedSport === 'Ride' ? t('coffeeRides') : t('shortActivities'),
      value: `${currentStats.shortActivitiesCount} ${getActivityLabel(selectedSport)}`,
      icon: selectedSport === 'Ride' ? '☕' : '📍',
    },
    {
      label: t('averageSpeed'),
      value: `${currentStats.averageSpeed} km/h`,
      icon: '⚡',
    },
  ];

  return (
    <section id="strava" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
            {t('title', { year: new Date().getFullYear() })}
          </h2>
          
          {/* Sport Type Selector */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {(['Ride', 'Run', 'Walk'] as SportType[]).map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  selectedSport === sport
                    ? 'bg-zinc-800 dark:bg-zinc-700 text-zinc-100 dark:text-zinc-100'
                    : 'bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                <span className="mr-2">{sportIcons[sport]}</span>
                {sportLabels[sport]}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t('lastUpdated')}:{' '}
              {new Date(stats.lastUpdated).toLocaleString()}
            </p>
            <button
              onClick={() => fetchStats(true)}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 underline underline-offset-2 transition-colors"
              title={t('refresh')}
            >
              {t('refresh')}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-300/20 text-center"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                {card.label}
              </h3>
              <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{card.value}</p>
              {card.subValue && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {card.subValue}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Activity Heatmap */}
        {stats?.activityPolylines && stats.activityPolylines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-zinc-800 dark:text-zinc-100">
              {t('heatmap.title', { year: new Date().getFullYear() })}
            </h3>
            <ActivityHeatmap
              polylines={stats.activityPolylines}
              selectedSport={selectedSport}
              isDark={isDark}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

