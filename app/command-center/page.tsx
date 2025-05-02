// pages/dashboard.js
'use client';

import useFuelFormData from "@/lib/hooks/CoreData";
import { Sun, Moon, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Modal } from "@/components/SyncSimulator/SyncSimModal"
import SyncSimulator from "@/components/SyncSimulator/SyncSimulator"
import EnergyBreakdown from "@/components/NutrientDisplay/EnergyBreakdown"
import VitaminBreakdown from "@/components/NutrientDisplay/VitaminBreakdown"
import MineralBreakdown from "@/components/NutrientDisplay/MineralBreakdown"
import { BuildEnergyData } from "@/components/NutrientDisplay/BuildEnergyData"
import { BuildVitaminData } from "@/components/NutrientDisplay/BuildVitaminData"
import { BuildMineralData } from "@/components/NutrientDisplay/BuildMineralData"
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import NavLoad from "@/components/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundContext';

export default function PaidCommandCenter() {

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    setBackgroundMode("main");
  }, []);


  const { profile, latestSync } = useFuelFormData();

  const router = useRouter();

  const heightDisplay = profile.preferredHeightUnit === "cm"
    ? `${profile.height_cm} cm`
    : `${profile.height_ft_in.feet}'${profile.height_ft_in.inches}"`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mergedMacros = (latestSync?.recoveryMacros || []).map((recoveryMacro) => {
    const matchingActive = (latestSync?.activeMacros || []).find(
      (activeMacro) => activeMacro.name === recoveryMacro.name
    );

    return {
      name: recoveryMacro.name,
      recoveryValue: recoveryMacro.value,
      activeValue: matchingActive?.value || "[pending]",
    };
  });

  const EnergyData = BuildEnergyData(latestSync);
  const Nutrient_V = BuildVitaminData(latestSync);
  const Nutrient_M = BuildMineralData(latestSync);

  const isPaidUser = profile?.isPaid ?? null;
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (typeof isPaidUser !== 'boolean' || !delayDone) return <NavLoad />;


  return (
    <div className="relative z-0 pb-10">

      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
        <hr className="my-2 border-t-4 border-white/30" />
        <h2 className="text-left text-white ml-4 text-xs">Name: {profile.name}</h2>
        <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
        <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
        <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>
      </div>


      <div className="pt-2">
        <button onClick={() => setIsModalOpen(true)} className="w-full rounded-lg bg-blue-600 text-white glowing-button">
          Open Sync Simulator
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* Here's where you drop your whole SyncSimulator page */}
          <SyncSimulator />
        </Modal>
      </div>

      <div className="pt-2">
        <EnergyBreakdown data={EnergyData} />
        <VitaminBreakdown Vitamins={Nutrient_V} />
        <MineralBreakdown minerals={Nutrient_M} />
      </div>

      <div className="fixed bottom-16 left-0 w-full flex justify-between z-30">
        {isPaidUser ? (
          <>
            <button
              className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300 transition glowing-button mr-1"
              onClick={() => router.push("/dawnsync")}
            >
              <Sun size={20} />DawnSync
            </button>
            <button
              className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300 transition glowing-button ml-1"
              onClick={() => router.push("/dusksync")}
            >
              <Moon size={20} />DuskSync
            </button>
          </>
        ) : (
          <>
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed mr-1 glowing-button"
            >
              <Sun size={20} />DawnSync <Lock size={20} />
            </button>
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed ml-1 glowing-button"
            >
              <Moon size={20} />DuskSync <Lock size={20} />
            </button>
          </>
        )}
      </div>
      
      <footer className="pt-4 pb-2">
        {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
      </footer>

      <div>
        {!isPaidUser && (
          <div className="absolute inset-0 pointer-events-none z-50">
          </div>
        )}
      </div>

    </div>
  );
}