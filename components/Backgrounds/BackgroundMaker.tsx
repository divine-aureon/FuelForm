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
    "infopage": "bg-[url('/images/info.webp')]",
    "loginpage": "bg-[url('/images/login.webp')]",
    "Neural Link": "bg-[url('/images/bg.webp')]",
    "Circuit Veins": "bg-[url('/images/info.webp')]",
    "Data Cloud": "bg-[url('/images/login.webp')]",
    "Dream Bokeh": "bg-[url('/images/bokehlights.webp')]",
    "Ether Pulse": "bg-[url('/images/magic.webp')]",
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
