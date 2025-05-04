// pages/dashboard.js
'use client';

import useFuelFormData from "@/lib/hooks/CoreData";
import {
  Sun, Moon, Lock, CircleCheckBig,
  ChartSpline, Sparkles,
  Rotate3d, Home, Activity, Heart, Flame, Crown,
  SmilePlus
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Modal } from "@/components/Archive/SyncSimulator/SyncSimModal"
import SyncSimulator from "@/components/Archive/SyncSimulator/SyncSimulator"
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
import SineWave from "@/components/Backgrounds/SineWave";




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

  const handleSectorClick = (sector: "macros" | "vitamins" | "minerals") => {
    setSelectedSector(prev => (prev === sector ? null : sector));
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

        <h2 className="text-left text-white ml-4 text-center text-sm">Signed in as: {profile.name}</h2>
        <hr className="my-2 border-t-4 border-white/30" />
        <div className="grid grid-cols-2 flex justify-center items-center gap-2 mb-3">
          <div className="bg-white/30 h-32 rounded-2xl flex flex-col justify-center pb-2">
            <h2 className="text-left text-white ml-4 text-md pulse-glow">Biometrics</h2>
            <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Current Weight: {weightDisplay}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Calorie Goal: {fitnessGoals?.calorieGoal}</h2>
            <h2></h2>
          </div>
          <div>
            <Link href="/statsecho" className="">
              <div className="relative h-32 bg-[url('/images/dna.webp')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                <div className="absolute flex flex-col pb-2 items-center justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                  <div className="flex items-center gap-2">Stats Echo <Rotate3d /></div>
                  <h2 className="text-xs font-bold text-white">
                    “Log. Reflect. Evolve.”
                  </h2>
                </div>
              </div>

            </Link>
          </div>

        </div>
        <hr className="my-2 border-t-4 border-white/30" />

        <div className="bg-black/20 rounded-xl p-2">
          <h2 className="text-center text-green-300 text-lg pulse-glow">Last Synced: {latestSync?.timestamp?.toDate().toLocaleString()}</h2>
        </div>
      </div>



      <button onClick={() => router.push("/sync-simulator")} className="relative glowing-button mt-2 bg-[url('/images/hologram.gif')] bg-cover bg-center bg-no-repeat h-14 w-full rounded-xl overflow-hidden hover:bg-indigo-300/50 text-white ">
        <div className="absolute inset-0 w-full rounded-xl text-2xl flex items-center justify-center pb-1 ">
          Activate Sync Simulator
        </div>
      </button>

      <div className="bg-white/30 text-white pulse-glow rounded-lg p-2 text-3xl text-center mt-2">Nutrient Modules
        <div className="grid grid-cols-3 w-full rounded-xl mt-2">

          <button
            onClick={() => handleSectorClick("macros")}
            className={`p-2 w-full text-lg rounded-xl shadow ${selectedSector === "macros" ? "bg-indigo-300/50" : "glowing-button"
              }`}
          >
            Macros
          </button>

          <button
            onClick={() => handleSectorClick("vitamins")}
            className={`p-2 w-full text-lg rounded-xl shadow ${selectedSector === "vitamins" ? "bg-indigo-300/50" : "glowing-button"
              }`}
          >
            Vitamins
          </button>
          <button
            onClick={() => handleSectorClick("minerals")}
            className={`p-2 w-full text-lg rounded-xl shadow ${selectedSector === "minerals" ? "bg-indigo-300/50" : "glowing-button"
              }`}
          >
            Minerals
          </button>
        </div>
      </div>
      <div className=" w-full rounded-xl ">
        <AnimatePresence mode="wait">

          {selectedSector === "macros" && (
            <motion.div
              key="macros"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}>
              <EnergyBreakdown data={EnergyData} />
            </motion.div>
          )}
          {selectedSector === "vitamins" && (
            <motion.div
              key="vitamins"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}>
              <VitaminBreakdown Vitamins={Nutrient_V} />
            </motion.div>
          )}


          {selectedSector === "minerals" && (
            <motion.div
              key="minerals"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >

              <MineralBreakdown minerals={Nutrient_M} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-4 h-full">
        {/* Left Column: Tiles */}


        {/* Right Column: FastLinks bar */}
        <div className="flex flex-col  gap-4 py-3">
          <button className="w-full rounded-xl py-4 leading-none bg-white/10 flex flex-col items-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => router.push("/crowns")}>
            Crowns<Crown size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>
          <button className="w-full rounded-xl py-4 leading-none bg-white/10 flex flex-col items-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => router.push("/neurosettings")}>
            Calorie Goal<Flame size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>
          <button className="w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/10 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => router.push("/help-center")}>
            Help<SmilePlus size={36} className=" mt-1 text-white transition cursor-pointer" />
          </button>


        </div>

        <div className="flex flex-col mt-3 gap-4">
          {/* Tile 1 */}
          <button onClick={() => router.push("/strengtharchive")} className="relative h-24 glowing-menu-button mt-2  w-full rounded-xl overflow-hidden text-white ">
            <div className="absolute inset-0 w-full rounded-xl bg-white/10 hover:bg-indigo-300/30 text-2xl flex items-center justify-center pb-1 ">
              StrengthArchive
            </div>
          </button>
          {/* Tile 2 */}
          <button onClick={() => router.push("/macrovault")} className="relative h-24 glowing-menu-button mt-2  w-full rounded-xl overflow-hidden text-white ">
            <div className="absolute inset-0 w-full rounded-xl bg-white/10 hover:bg-indigo-300/30 text-2xl flex items-center justify-center pb-1 ">
              MacroVault
            </div>
          </button>
          {/* Tile 2 */}
          <button onClick={() => router.push("/primetasks")} className="relative h-24 glowing-menu-button mt-2  w-full rounded-xl overflow-hidden text-white ">
            <div className="absolute inset-0 w-full rounded-xl bg-white/10 hover:bg-indigo-300/30 text-2xl flex items-center justify-center pb-1 ">
              PrimeTasks
            </div>
          </button>


          {/* Add more tiles here */}
        </div>

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
                className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-indigo-300/50 transition glowing-button mr-1 px-4 py-2"
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
                className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-indigo-300/50 transition glowing-button ml-1 px-4 py-2"
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