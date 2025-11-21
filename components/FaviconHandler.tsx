'use client';

import { useEffect } from 'react';

type RelType = 'icon' | 'shortcut icon' | 'apple-touch-icon';

export default function FaviconHandler() {
  useEffect(() => {
    const setIconLink = (
      rel: RelType,
      href: string,
      options: { type?: string; sizes?: string } = {}
    ) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }

      if (options.type) {
        link.type = options.type;
      }

      if (options.sizes) {
        link.sizes.value = options.sizes;
      }

      link.href = href;
    };

    function updateFavicon() {
      const isDark = document.documentElement.classList.contains('dark');
      const iconHref = isDark ? '/images/logo_dark.png' : '/images/logo_light.png';

      setIconLink('icon', iconHref, { type: 'image/png' });
      setIconLink('shortcut icon', iconHref, { type: 'image/png' });
      setIconLink('apple-touch-icon', iconHref, { sizes: '180x180' });
    }

    updateFavicon();

    const observer = new MutationObserver(updateFavicon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

