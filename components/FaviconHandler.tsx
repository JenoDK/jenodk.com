'use client';

import { useEffect } from 'react';

export default function FaviconHandler() {
  useEffect(() => {
    function updateFavicon() {
      const isDark = document.documentElement.classList.contains('dark');
      const existingFavicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      
      if (existingFavicon) {
        existingFavicon.href = isDark ? '/images/logo_dark.png' : '/images/logo_light.png';
        return;
    }
      
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = isDark ? '/images/logo_dark.png' : '/images/logo_light.png';
      document.head.appendChild(link);
    }
    
    // Set initial favicon based on current theme (already set by blocking script)
    updateFavicon();
    
    // Watch for theme changes
    const observer = new MutationObserver(updateFavicon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return null;
}

