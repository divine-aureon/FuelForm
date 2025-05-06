'use client';

import { createContext, useContext, useState } from 'react';
import useCoreData from "@/lib/hooks/CoreData"
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
    "homepage": "bg-[url('/images/home.webp')]",
    "loginpage": "bg-[url('/images/login.webp')]",

    "NeuralLink": "bg-[url('/images/backgrounds/neurallink.webp')]",
    "StarVeil": "bg-[url('/images/backgrounds/starveil.jpg')]",
    "QuantumFade": "bg-[url('/images/backgrounds/quantumfade.jpg')]",
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
