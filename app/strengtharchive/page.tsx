'use client';

import useProfile from "@/lib/hooks/ProfileData";
import PaidStrengthArchivePage from "@/components/Pages//StrengthArchive/paid";
import FreeStrengthArchivePage from "@/components/Pages/StrengthArchive/free";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { useState, useEffect } from 'react';
import NavLoad from "@/components/Loading/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import useCoreData from "@/lib/hooks/CoreData";

export default function DawnSyncPage() {


    const { settings } = useCoreData();
    
  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);

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
          {isPaidUser ? <PaidStrengthArchivePage /> : <FreeStrengthArchivePage />}
        </div>
        <footer className="pt-4 pb-2">
          {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
        </footer>
      </div>
    </div>
  );
}