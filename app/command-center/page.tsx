'use client';

import useCoreData from "@/lib/hooks/CoreData";
import {
  Sun, Moon, Lock, CircleCheckBig,
  ChartSpline, Sparkles,
  Rotate3d, Home, Activity,
  SmilePlus,
  Dumbbell,
  Utensils,
  ListChecks
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import { SettingsModal } from "@/components/Modals/SettingsModal"
import SettingsPageComponent from "@/components/Modals/SettingsPageComponent"
import { FitnessGoalsModal } from "@/components/Modals/FitnessGoalsModal"
import FitnessGoalsPageComponent from "@/components/Modals/FitnessGoalsComponent"
import { OverrideModal } from "@/components/Modals/OverrideModal"
import OverrideComponent from "@/components/Modals/OverrideComponent"
import { BioModal } from "@/components/Modals/BiometricsModal"
import BiometricsComponent from "@/components/Modals/BiometricsComponent"
import { DawnSyncModal } from "@/components/Modals/DawnSyncModal"
import { DuskSyncModal } from "@/components/Modals/DuskSyncModal"
import DawnSyncComponent from "@/components/Modals/DawnSyncComponent"
import DuskSyncComponent from "@/components/Modals/DuskSyncComponent"

import { UnlockModal } from "@/components/Modals/UnlockModal"
import UnlockComponent from "@/components/Modals/UnlockComponent"

import EnergyBreakdown from "@/components/NutrientDisplay/EnergyBreakdown"
import VitaminBreakdown from "@/components/NutrientDisplay/VitaminBreakdown"
import MineralBreakdown from "@/components/NutrientDisplay/MineralBreakdown"
import { BuildEnergyData } from "@/components/NutrientDisplay/BuildEnergyData"
import { BuildVitaminData } from "@/components/NutrientDisplay/BuildVitaminData"
import { BuildMineralData } from "@/components/NutrientDisplay/BuildMineralData"
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import NavLoad from "@/components/Loading/NavLoad";
import InitLoad from "@/components/Loading/InitLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import TodaysSync from '@/lib/hooks/TodaysSync'
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Flame,
  Zap,
  Star,
  Shield,
  Atom,
  Heart,
  Bird,
  Dna,
  KeyRound,
  Settings,
  Mars,
  Venus,
  Fingerprint
} from 'lucide-react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function PaidCommandCenter() {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const { profile, latestSync, settings, fitnessSettings } = useCoreData();

  const LucideIconMap: Record<string, React.ElementType> = {
    Atom: Atom,
    Crown: Crown,
    Flame: Flame,
    Star: Star,
    Zap: Zap,
    Shield: Shield,
    Heart: Heart,
    Bird: Bird,
  };

  const Icon = LucideIconMap[settings?.navIcon || "Atom"];

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);

  const router = useRouter();

  const heightDisplay = profile.preferredHeightUnit === "cm"
    ? `${profile.height_cm} cm`
    : `${profile.height_ft_in.feet}'${profile.height_ft_in.inches}"`;

  const weightDisplay = profile.preferredWeightUnit === "lbs"
    ? `${latestSync?.weight_lbs} lbs`
    : `${latestSync?.weight_kg}'"`;

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFitnessOpen, setFitnessOpen] = useState(false);
  const [isOverrideOpen, setOverrideOpen] = useState(false);
  const [isBioOpen, setBioOpen] = useState(false);
  const [isDawnOpen, setDawnOpen] = useState(false);
  const [isDuskOpen, setDuskOpen] = useState(false);
  const [isUnlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isBioOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isBioOpen]);


  useEffect(() => {
    if (isFitnessOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isFitnessOpen]);


  useEffect(() => {
    if (isOverrideOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isOverrideOpen]);


  useEffect(() => {
    if (isDawnOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDawnOpen]);

  useEffect(() => {
    if (isDuskOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDuskOpen]);


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

  const [selectedSector, setSelectedSector] = useState<"macros" | "vitamins" | "minerals">("macros");

  const handleSectorClick = (sector: "macros" | "vitamins" | "minerals") => {
    setSelectedSector(sector); // No toggling, just always set the new one
  };

  if (typeof isPaidUser !== 'boolean') return;


  return (
    <>
        <NavLoad/>
    <div className="relative z-0 pb-10">

      <div className=" bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <div className="bg-[url('/images/menus/vital.jpg')] bg-cover bg-center bg-no-repeat rounded-xl">
          <div className=" bg-indigo-400/20 inset-0 p-2 rounded-xl">
            <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
            <h2 className="text-md text-center font-bold text-white">
              Every sync refines the system. Every action shapes the form.
            </h2>
          </div>
        </div>

        <hr className="my-2 border-t-4 border-white/30" />
        <h2 className="text-left text-white flex justify-left items-center text-md gap-2"><Atom />Signed in as: {profile.name}</h2>
        <h2 className="text-left text-lg pulse-glow">Last Synced: {latestSync?.timestamp?.toDate().toLocaleString()}</h2>
        <hr className="my-2 border-t-4 border-white/30" />
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md mt-3 ">
        <div className="grid grid-cols-2 flex justify-center items-center gap-2 ">
          <div className=" bg-white/50 h-32 rounded-2xl flex flex-col justify-center p-1">
            <div className="bg-[url('/images/menus/cardbio.jpg')] rounded-xl bg-cover border border-indigo-300 bg-center bg-no-repeat">
              <div className="relative bg-indigo-200/40 rounded-xl pb-5 flex flex-col justify-center">

                <h2 className="text-left text-white ml-2 text-xl pulse-glow flex items-center mt-1">Biometrics{profile.gender === 'male' ? (<Mars size={24} />) : (<Venus size={24} />)}</h2>
                <h2 className="text-left text-white ml-2 text-xs">Age: {profile.age}</h2>
                <h2 className="text-left text-white ml-2 text-xs">Height: {heightDisplay}</h2>
                <h2 className="text-left text-white ml-2 text-xs">Current Weight: {weightDisplay}</h2>
                <h2 className="text-left text-white ml-2 text-xs">Calorie Goal: {fitnessSettings?.calorieGoal}</h2>
                <h2></h2>
              </div>
            </div>
          </div>




          {isPaidUser ? (
            <>
              <div>
                <Link href="/statsecho" className="">
                  <div className="relative h-32 bg-[url('/images/menus/stats2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2">Stats Echo <Rotate3d /></div>
                      <h2 className="text-xs font-bold text-white">
                        Log. Reflect. Evolve.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/statsecho" className="">
                  <div className="relative h-32 bg-[url('/images/menus/stats2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2">Stats Echo <Lock /></div>
                      <h2 className="text-xs font-bold text-white">
                        Unlock to Start Tracking.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}

        </div>
      </div>


      <div className="flex grid grid-cols-3 flex-col gap-4 py-3">
        {/* Right Column: FastLinks bar */}



        {isPaidUser ? (
          <>

            <button className="w-full rounded-xl py-4 glowing-button leading-none bg-white/10 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
              onClick={() => router.push("/sync-simulator")}>
              Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
            </button>



          </>
        ) : (
          <>

            <button className="w-full rounded-xl py-4 glowing-button leading-none bg-white/10 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
              onClick={() => router.push("/sync-simulator")}>
              Free Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
            </button>

          </>
        )}





        {isPaidUser ? (
          <>

            <button
              onClick={() => setSettingsOpen(true)}
              className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
              Neuro <br />Settings<Settings size={36} className=" mt-1 text-white transition cursor-pointer" />
            </button>
            {isSettingsOpen && (
              <SettingsModal onClose={() => setSettingsOpen(false)}>
                < SettingsPageComponent />
              </SettingsModal>)}


          </>
        ) : (
          <>

            <button
              onClick={() => setUnlockOpen(true)}
              className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
              Unlock<br/>1 Month Free<KeyRound size={36} className="mt-1 text-white transition cursor-pointer" />
            </button>

            {isUnlockOpen && (
              <Elements stripe={stripePromise}>
                <UnlockModal onClose={() => setUnlockOpen(false)}>
                  <UnlockComponent />
                </UnlockModal>
              </Elements>


            )}
          </>
        )}

        <button
          onClick={() => setBioOpen(true)}
          className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
          Modify Biometrics<Fingerprint size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>
        {isBioOpen && (
          <BioModal onClose={() => setBioOpen(false)}>
            < BiometricsComponent />
          </BioModal>)}

      </div>

      <div className="bg-white/30 text-white pulse-glow rounded-lg p-2 text-2xl text-center mt-2">Nutrient Blueprint Modules
        <div className="grid grid-cols-3 gap-1 w-full rounded-xl mt-2">

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
      <div className="grid grid-cols-[3fr_1fr] gap-4 h-full">

        {/* Left Column: Tiles */}
        <div className="flex flex-col mt-3 gap-4">


          {/* Tile 1 */}
          {isPaidUser ? (
            <>

              <div>
                <Link href="/primetasks" className="">
                  <div className="relative h-32 bg-[url('/images/menus/tasks.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2"><ListChecks />PrimeTasks</div>
                      <h2 className="text-xs font-bold text-white">
                        Define. Align. Execute.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>

            </>
          ) : (
            <>
              <div>
                <Link href="/primetasks" className="">
                  <div className="relative h-32 bg-[url('/images/menus/tasks.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2"><ListChecks />PrimeTasks</div>
                      <h2 className="text-xs font-bold text-white">
                        Access Granted.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}




          {/* Tile 2 */}



          {isPaidUser ? (
            <>
              <div>
                <Link href="/strengtharchive" className="">
                  <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2"><Dumbbell />StrengthArchive</div>
                      <h2 className="text-xs font-bold text-white">
                        Log It. Lift It. Level Up.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                  <div className="flex items-center gap-2"><Lock />StrengthArchive</div>
                  <h2 className="text-xs font-bold text-white">
                    Access Restricted.
                  </h2>
                </div>
              </div>
            </>
          )}

          {/* Tile 3 */}

          {isPaidUser ? (
            <>
              <div>
                <Link href="/macrovault" className="">
                  <div className="relative h-32 bg-[url('/images/menus/meals3.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                      <div className="flex items-center gap-2"><Utensils />MacroVault</div>
                      <h2 className="text-xs font-bold text-white">
                        Nourish. Record. Repeat.
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="relative h-32 bg-[url('/images/menus/meals3.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                  <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                    <div className="flex items-center gap-2"><Lock />MacroVault</div>
                    <h2 className="text-xs font-bold text-white">
                      Access Restricted.
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Add more tiles here */}
        </div>

        {/* Right Column: FastLinks bar */}
        <div className="flex flex-col  gap-4 py-3">
          <button className="w-full rounded-xl py-4 leading-none bg-white/20 justify-center flex flex-col items-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => router.push("/crowns")}>
            Crowns<Crown size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>

          <button className="w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/10 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => router.push("/infodex")}>
            InfoDex<SmilePlus size={36} className=" mt-1 text-white transition cursor-pointer" />
          </button>

          {isPaidUser ? (
            <>
              <button
                onClick={() => setFitnessOpen(true)}
                className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                Fitness Settings<Flame size={36} className=" mt-1 text-white transition cursor-pointer" />
              </button>
              {isFitnessOpen && (
                <FitnessGoalsModal onClose={() => setFitnessOpen(false)}>
                  < FitnessGoalsPageComponent />
                </FitnessGoalsModal>)}

            </>
          ) : (
            <>


              <button
                disabled
                className=" cursor-default w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur text-white shadow-md">
                Fitness Goals<Lock size={36} className=" mt-1 text-white transition cursor-pointer" />
              </button>

            </>
          )}

          {isPaidUser ? (
            <>
              <button
                onClick={() => setOverrideOpen(true)}
                className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
              >
                Sync Override
                <Atom size={36} className="mt-1 text-white transition cursor-pointer" />
              </button>

              {isOverrideOpen && (
                <OverrideModal
                  onClose={() => setOverrideOpen(false)}
                  onOverrideDawn={() => {
                    setOverrideOpen(false);
                    setDawnOpen(true);
                  }}
                  onOverrideDusk={() => {
                    setOverrideOpen(false);
                    setDuskOpen(true);
                  }}
                >
                  <OverrideComponent
                    onClose={() => setOverrideOpen(false)}
                    setDawnOpen={setDawnOpen}
                    setDuskOpen={setDuskOpen}
                  />
                </OverrideModal>
              )}
            </>

          ) : (
            <>


              <button
                disabled
                className=" cursor-default w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur text-white shadow-md">
                Sync Override<Lock size={36} className=" mt-1 text-white transition cursor-pointer" />
              </button>

            </>
          )}


        </div>

      </div>


      {isDawnOpen && (
        <DawnSyncModal onClose={() => setDawnOpen(false)}>
          < DawnSyncComponent />
        </DawnSyncModal>)}


      {isDuskOpen && (
        <DuskSyncModal onClose={() => setDuskOpen(false)}>
          < DuskSyncComponent />
        </DuskSyncModal>)}




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
                onClick={() => setDawnOpen(true)}
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
                onClick={() => setDuskOpen(true)}
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

    </div >
    </>
  );
}