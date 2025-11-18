'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useMemo } from 'react';
import CountUp from 'react-countup';
import Image from 'next/image';

// Calculate age from birthdate
const getAgeInYears = () => {
  const birthDate = new Date(1992, 10, 24); // November 24, 1992
  const today = new Date();
  const diffTime = today.getTime() - birthDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays / 365.25;
};

export default function Hero() {
  const t = useTranslations('hero');
  const age = useMemo(() => getAgeInYears(), []); // Calculate age only once
  const [displayText, setDisplayText] = useState('');
  const fullText = t('subtitle');

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
            <Image
              src="/images/profile_picture.jpg"
              alt="Jeno De Keyzer"
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
          {t('title')}
        </h1>
        
        <div className="text-2xl md:text-4xl mb-6 min-h-[3rem]">
          <span className="text-zinc-600 dark:text-zinc-400">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <div className="text-xl md:text-2xl mb-8 text-zinc-600 dark:text-zinc-400">
          <CountUp
            start={0}
            end={age}
            duration={6}
            decimals={4}
            separator=""
            className="font-mono"
          />
          {' years old'}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 italic"
        >
          {t('available')}
        </motion.p>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com/JenoDK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold"
          >
            GitHub
          </a>
          <a
            href="mailto:jenodekeyzer@gmail.com"
            className="text-2xl text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold"
          >
            Email
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs text-zinc-500 dark:text-zinc-500 mb-1 opacity-70">
            {t('scrollDown')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-zinc-500 dark:text-zinc-500 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

