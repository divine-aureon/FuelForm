'use client';

import { useEffect } from 'react';

export function BackgroundManager() {
  useEffect(() => {
    const handler = (e: any) => {
      const body = document.body;
      if (!body) return;

      if (e.detail?.mode === 'infopage') {
        body.classList.remove("bg-[url('/images/bg.webp')]");
        body.classList.add("bg-[url('/images/info.webp')]");
      } 
      else if (e.detail?.mode === 'loginpage') {
        body.classList.remove("bg-[url('/images/bg.webp')]");
        body.classList.add("bg-[url('/images/login.webp')]");
      } 
      else if (e.detail?.mode === 'default') {
        body.classList.remove("bg-[url('/images/bg.webp')]");
        body.classList.add("bg-[url('/images/bg.webp')]");
      }
      else {
        body.classList.remove("bg-[url('/images/info.webp')]");
        body.classList.add("bg-[url('/images/bg.webp')]");
      }
    };

    window.addEventListener('backgroundChange', handler);
    return () => window.removeEventListener('backgroundChange', handler);
  }, []);

  return null;
}
