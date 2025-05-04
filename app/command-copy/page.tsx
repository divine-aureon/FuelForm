// pages/dashboard.js
'use client';

import useFuelFormData from "@/lib/hooks/CoreData";
import { Sun, Moon, Lock, CircleCheckBig } from "lucide-react";
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
import NavLoad from "@/components/Loading/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import TodaysSync from '@/lib/hooks/TodaysSync'
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

export default function PaidCommandCenter() {
  const { profile, latestSync, preferences, fitnessGoals } = useFuelFormData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (preferences?.background) {
      setBackgroundMode(preferences.background);
    }
  }, [preferences?.background, setBackgroundMode]);

  const router = useRouter();

  const heightDisplay = profile.preferredHeightUnit === "cm"
    ? `${profile.height_cm} cm`
    : `${profile.height_ft_in.feet}'${profile.height_ft_in.inches}"`;

  const weightDisplay = profile.preferredWeightUnit === "lbs"
    ? `${latestSync?.weight_lbs} lbs`
    : `${latestSync?.weight_kg}'"`;


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

  const { hasDuskSyncedToday, hasDawnSyncedToday } = TodaysSync();

  const EnergyData = BuildEnergyData(latestSync);
  const Nutrient_V = BuildVitaminData(latestSync);
  const Nutrient_M = BuildMineralData(latestSync);

  const isPaidUser = profile?.isPaid ?? null;
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 800);
    return () => clearTimeout(timer);
  }, []);


  const [selectedSector, setSelectedSector] = useState<"macros" | "vitamins" | "minerals" | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState<"macros" | "vitamins" | "minerals" | null>(null);


  const handleSectorClick = (sector: "macros" | "vitamins" | "minerals") => {
    if (selectedSector === sector && isDrawerOpen) {
      // If same sector clicked again, close drawer
      setIsDrawerOpen(false);
      setSelectedSector(null);
      setButtonColor(null);
    } else {
      // Open drawer with new content
      setSelectedSector(sector);
      setIsDrawerOpen(true);
      setButtonColor(sector);
    }
  };

  const getButtonColor = (sector: "macros" | "vitamins" | "minerals") => {
    return isDrawerOpen && selectedSector === sector
      ? "bg-white/30 text-white"
      : "glowing-button";
  };

  if (typeof isPaidUser !== 'boolean' || !delayDone) return <NavLoad />;


  return (
    <div className="relative z-0 pb-10">

      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
        <h2 className="text-md text-center font-bold text-white">
          “Every sync refines the system. Every action shapes the form.”
        </h2>
        <hr className="my-2 border-t-4 border-white/30" />
        <div className="w-full flex items-center gap-6 mb-3">
          <div className="flex-1">
            <h2 className="text-left text-white ml-4 text-xs">Name: {profile.name}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Current Weight: {weightDisplay}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Calorie Goal: {fitnessGoals?.calorieGoal}</h2>
            <h2></h2>
          </div>
          <Link href="/statsecho" className="flex-1 flex items-center justify-center">
            <div className="w-40 h-20 bg-[url('/images/sine.gif')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl flex flex-col items-center justify-center text-white text-2xl glowing-button">
              <div className="">Stats Echo</div>
              <h2 className="text-xs text-center font-bold text-white">
                “Log. Reflect. Evolve.”
              </h2>
            </div>

          </Link>
        </div>
        <div className="bg-black/20 rounded-xl p-2">
          <h2 className="text-center text-green-300 text-lg pulse-glow">Last Synced: {latestSync?.timestamp?.toDate().toLocaleString()}</h2>
        </div>
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

      <div className="bg-white/30 text-white pulse-glow rounded-lg p-2 text-lg text-center mx-1 my-1">Nutrient Modules
        <div className="grid grid-cols-3 w-full rounded-xl mt-2">
          <button
            className={`p-2 w-full rounded-xl ${getButtonColor("macros")}`}
            onClick={() => handleSectorClick("macros")}>
            Macros
          </button>
          <button
            className={`p-2 w-full rounded-xl ${getButtonColor("vitamins")}`}
            onClick={() => handleSectorClick("vitamins")}>
            Vitamins
          </button>
          <button
            className={`p-2 w-full rounded-xl ${getButtonColor("minerals")}`}
            onClick={() => handleSectorClick("minerals")}>
            Minerals
          </button>
        </div>
      </div>
      <div className="p-2 w-full rounded-xl ">
        <AnimatePresence mode="wait">

          {selectedSector === "macros" && (
            <motion.div
              key="macros"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <EnergyBreakdown data={EnergyData} />
            </motion.div>
          )}
          {selectedSector === "vitamins" && (
            <motion.div
              key="vitamins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <VitaminBreakdown Vitamins={Nutrient_V} />
            </motion.div>
          )}


          {selectedSector === "minerals" && (
            <motion.div
              key="minerals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >

              <MineralBreakdown minerals={Nutrient_M} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>





      <div className="fixed bottom-16 left-0 w-full flex justify-between z-30">
        {isPaidUser ? (
          <>
            {hasDawnSyncedToday ? (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full bg-gray-500/80 text-white rounded-lg mr-1 cursor-default px-4 py-2"
              >
                <Sun size={20} /> DawnSynced <CircleCheckBig size={20} />
              </button>
            ) : (
              <button
                className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300 transition glowing-button mr-1 px-4 py-2"
                onClick={() => router.push("/dawnsync")}
              >
                <Sun size={20} /> DawnSync
              </button>
            )}

            {hasDuskSyncedToday ? (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full bg-gray-500/80 text-white rounded-lg ml-1 cursor-default px-4 py-2"
              >
                <Moon size={20} /> DuskSynced <CircleCheckBig size={20} />
              </button>
            ) : (
              <button
                className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300 transition glowing-button ml-1 px-4 py-2"
                onClick={() => router.push("/dusksync")}
              >
                <Moon size={20} /> DuskSync
              </button>
            )}
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