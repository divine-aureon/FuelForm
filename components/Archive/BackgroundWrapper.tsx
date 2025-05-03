'use client';
import { useBackground } from '../Backgrounds/BackgroundMaker';
import React from 'react';
import useFuelFormData from "@/lib/hooks/CoreData"

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { backgroundMode } = useBackground();
  const { preferences } = useFuelFormData();


  const ChosenBackgroundLink: Record<string, string> = {
    "Default": "bg-[url('/images/bg.webp')]",
    "Digital": "bg-[url('/images/info.webp')]",
    "Network": "bg-[url('/images/login.webp')]",
  };



  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white">
      {children}
    </div>
  );
}
