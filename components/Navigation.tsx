'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/routing';
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('en');
  const [mounted, setMounted] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    // Get current locale from URL after mount
    if (typeof window !== 'undefined') {
      const locale = window.location.pathname.split('/')[1];
      setCurrentLocale(locale === 'nl' ? 'nl' : 'en');
      setActiveHash(window.location.hash);
    }
  }, []);

  useEffect(() => {
    // Update locale when pathname changes
    if (mounted && typeof window !== 'undefined') {
      const locale = window.location.pathname.split('/')[1];
      setCurrentLocale(locale === 'nl' ? 'nl' : 'en');
      setActiveHash(window.location.hash);
    }
  }, [pathname, mounted]);

  useEffect(() => {
    // Update active hash when hash changes
    if (mounted && typeof window !== 'undefined') {
      const handleHashChange = () => {
        setActiveHash(window.location.hash);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'experience', href: '#experience' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'strava', href: '#strava' },
    { key: 'contact', href: '#contact' },
  ];

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'nl' : 'en';
    router.push(`../${newLocale}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:ring-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg ring-1 ring-zinc-900/5 dark:ring-white/10 text-zinc-800 dark:text-zinc-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
            <Link href="/" className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
              Jeno De Keyzer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = mounted && activeHash === item.href;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative block px-3 py-2 ${
                    isActive
                      ? 'text-teal-500 dark:text-teal-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400'
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
                  )}
                </a>
              );
            })}
            <button
              onClick={toggleLocale}
              className="text-sm font-medium px-3 py-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:ring-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {mounted ? (currentLocale === 'en' ? 'NL' : 'EN') : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="text-sm font-medium px-3 py-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:ring-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLocale}
              className="text-sm font-medium px-2 py-1 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg ring-1 ring-zinc-900/5 dark:ring-white/10 text-zinc-600 dark:text-zinc-200"
            >
              {mounted ? (currentLocale === 'en' ? 'NL' : 'EN') : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="text-sm font-medium px-2 py-1 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg ring-1 ring-zinc-900/5 dark:ring-white/10 text-zinc-600 dark:text-zinc-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-300 hover:text-teal-500 dark:hover:text-teal-400 rounded transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
