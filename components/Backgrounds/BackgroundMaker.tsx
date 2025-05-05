'use client';

import { createContext, useContext, useState } from 'react';
import useFuelFormData from "@/lib/hooks/CoreData"
import React from 'react';

interface BackgroundContextType {
  backgroundMode: string;
  setBackgroundMode: (mode: string) => void;
}

export const BackgroundContext = createContext<BackgroundContextType>({
  backgroundMode: 'main',
  setBackgroundMode: () => {},
});

export function useBackground() {
  return useContext(BackgroundContext);
}

export function BackgroundMaker({ children }: { children: React.ReactNode }) {

  const [backgroundMode, setBackgroundMode] = useState("Default"); 


  const BGdisplay: Record<string, string> = {
    "homepage": "bg-[url('/images/orb.webp')]",
    "infopage": "bg-[url('/images/info.webp')]",
    "loginpage": "bg-[url('/images/login.webp')]",
    "Neural Link": "bg-[url('/images/bg.webp')]",
    "Circuit Core": "bg-[url('/images/backgrounds/circuitcore.jpg')]",
    "MotherBoard": "bg-[url('/images/backgrounds/motherboard.jpg')]",
    "Cerebral Matrix": "bg-[url('/images/backgrounds/cerebralmatrix.jpg')]",
    "Ether Links": "bg-[url('/images/backgrounds/etherlinks.jpg')]",
    "StarVeil": "bg-[url('/images/backgrounds/starveil.jpg')]",
    "Quantum Surface": "bg-[url('/images/backgrounds/quantumsurface.jpg')]",
    "Tesseract Fade": "bg-[url('/images/backgrounds/tesseractfade.jpg')]",
  };

  const backgroundClass = BGdisplay[backgroundMode] || BGdisplay["Digital"]

  return (
    <BackgroundContext.Provider value={{ backgroundMode, setBackgroundMode }}>
      <div className={`${backgroundClass} bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white`}>
        {children}
      </div>
    </BackgroundContext.Provider>
  );
}
