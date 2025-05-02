'use client';

import useProfile from "@/lib/hooks/ProfileData";
import PaidMacroVaultPage from "@/components/MacroVault/paid";
import FreeMacroVaultPage from "@/components/MacroVault/free";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { useState, useEffect } from 'react';
import NavLoad from "@/components/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundContext';


export default function MacroVaultPage() {

    const { setBackgroundMode } = useBackground();
    useEffect(() => {
      setBackgroundMode("main");
    }, []);

  const { profile, loading } = useProfile();
  const isPaidUser = profile?.isPaid ?? null;

  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (typeof isPaidUser !== 'boolean' || !delayDone) return <NavLoad />;
  
  return (
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
  );
}