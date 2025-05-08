'use client';


import useCoreData from "@/lib/hooks/CoreData";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import NavLoad from "@/components/Loading/NavLoad";
import { useState, useEffect } from "react";

export default function PaidMacroVaultPage() {


  const { profile, latestSync, settings } = useCoreData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);

  const isPaidUser = profile?.isPaid ?? null;



  if (typeof isPaidUser !== 'boolean' ) return ;

  return (
    <>
    <NavLoad />
      <div>
        <div className="relative h-32 bg-[url('/images/menus/tasks2.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex items-center gap-2">PrimeTasks Coming Soon!</div>
            <h2 className="text-xs font-bold text-white">
              Align. Commit. Evolve.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white/30 text-white rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <p className="text-lg max-w-md">

          PrimeTasks is your personal mission board — a space to set intentions, track meaningful actions, and crystallize your focus into real progress.

          Craft daily or weekly tasks that align with your fitness, nutrition, or life goals. As you complete them, youll not only build discipline — youll generate Crowns, fueling your transformation across the FuelForm ecosystem.

          Whether youre leveling up your routine, integrating a new habit, or pursuing soul-aligned milestones, PrimeTasks keeps your journey visible, actionable, and rewarding.

          Coming Soon
          Your evolution awaits.
        </p>
      </div>
            <footer className="pt-4 pb-2">
              {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
            </footer>
    </>
  );
}