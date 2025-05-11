'use client';

import useProfile from "@/lib/hooks/ProfileData";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { useState, useEffect } from 'react';
import NavLoad from "@/components/Loading/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import useCoreData from "@/lib/hooks/CoreData";
import PageFadeWrapper from "@/components/Loading/PageFadeWrapper"

export default function MacroVaultPage() {

    const { settings } = useCoreData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);

  const { profile, loading } = useProfile();
  const isPaidUser = profile?.isPaid ?? null;



  if (typeof isPaidUser !== 'boolean') {
    return ;
  }
  
  return (
    <>
    <NavLoad />
    <PageFadeWrapper>
      <div>
        <div className="relative h-32 bg-[url('/images/menus/meals3.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex items-center gap-2">MacroVault Coming Soon!</div>
            <h2 className="text-xs font-bold text-white">
              Fuel Your Form, Master Your Macros.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white/30 text-white rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <p className="text-lg max-w-md">
          MacroVault is your personal nutrition tracker designed to help you master your macros and fuel
          your body effectively. With a simple, user-friendly interface, it lets you log your meals and
          track macronutrients—protein, fats, and carbohydrates—so you can stay on top of your nutritional
          goals. Whether youre building muscle, losing weight, or simply aiming for a balanced diet,
          MacroVault ensures you hit your targets with ease and precision.  </p>
      </div>
      <footer className="pt-4 pb-2">
          {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
        </footer>
        </PageFadeWrapper>
    </>
  );
}
  