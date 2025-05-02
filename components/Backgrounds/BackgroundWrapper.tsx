'use client';
import { useBackground } from './BackgroundContext';
import React from 'react';

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { backgroundMode } = useBackground();

  const backgroundMap: Record<string, string> = {
    main: "bg-[url('/images/bg.webp')]",
    infopage: "bg-[url('/images/info.webp')]",
    loginpage: "bg-[url('/images/login.webp')]",
  };

  const backgroundClass = backgroundMap[backgroundMode] || backgroundMap.main;

  return (
    <div className={`${backgroundClass} bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white`}>
      {children}
    </div>
  );
}
