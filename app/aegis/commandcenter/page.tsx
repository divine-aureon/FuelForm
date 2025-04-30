// pages/dashboard.js
'use client';


import useFuelFormData from "@/lib/hooks/CoreData";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Modal } from "@/components/SyncSimModal"
import SyncSimulator from "@/components/SyncSimulator"
import EnergyBreakdown from "@/components/DataBreakdown/EnergyBreakdown"
import VitaminBreakdown from "@/components/DataBreakdown/VitaminBreakdown"
import MineralBreakdown from "@/components/DataBreakdown/MineralBreakdown"
import {BuildEnergyData } from "@/components/DataSyncNutrientData/BuildEnergyData"
import {BuildVitaminData } from "@/components/DataSyncNutrientData/BuildVitaminData"
import {BuildMineralData } from "@/components/DataSyncNutrientData/BuildMineralData"

export default function BlueprintPage() {

  const router = useRouter();

  const { profile, latestSync } = useFuelFormData();
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

  return (
    <>
      <main className="relative min-h-screen bg-[url('/images/bg.webp')] 
      bg-cover bg-center bg-no-repeat bg-black text-white overflow-hidden pb-10 px-5">
        {/* Background Image */}
        {/* Dark overlay */}

        <div className="flex flex-col justify-center">
          <div className="absolute inset-0 z-0"></div>

          {/* Top Bar */}
          <div className="w-full flex justify-center z-10">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
              <hr className="my-2 border-t-4 border-white/30" />
              <h2 className="text-left text-white ml-4 text-xs">Name: {profile.name}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>
            </div>
          </div>


          <div className="flex justify-center w-full mt-2">
            <button onClick={() => setIsModalOpen(true)} className="w-full max-w-md p-2 rounded-lg justify-center bg-blue-600 z-10 text-white glowing-button">
              Open Sync Simulator
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* Here's where you drop your whole SyncSimulator page */}
            <SyncSimulator />
          </Modal>
<div className="pb-20">
          <EnergyBreakdown data={EnergyData} />
          <VitaminBreakdown Vitamins={Nutrient_V} />
          <MineralBreakdown minerals={Nutrient_M} />
          </div>
          {/*DAWNSYNC & DUSKSYNC*/}
          <div className="fixed bottom-16 left-0 w-full flex justify-between px-4 z-45">
            <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button mr-2"
              onClick={() => router.push("/aegis/dawnsync")}>
              <Sun size={20} />DawnSync
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button ml-2"
              onClick={() => router.push("/aegis/dusksync")}>
              <Moon size={20} />DuskSync
            </button>
          </div>
        </div>


      </main >
    </>
  );
}