'use client';

import useProfile from "@/lib/hooks/ProfileData";
import PaidMacroVaultPage from "@/components/Pages/MacroVault/paid";
import FreeMacroVaultPage from "@/components/Pages/MacroVault/free";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { useState, useEffect } from 'react';
import NavLoad from "@/components/Loading/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import useCoreData from "@/lib/hooks/CoreData";



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



  if (typeof isPaidUser !== 'boolean' ) return ;
  
  return (
    <>
    <NavLoad />
    <div className="relative  text-white overflow-hidden">
      <div className="text-white ">
        <div className="flex-grow">
          {isPaidUser ? <PaidMacroVaultPage /> : <FreeMacroVaultPage />}
        </div>
        <footer className="pt-4 pb-2">
          {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
        </footer>
      </div>
    </div>
    </>
  );
}