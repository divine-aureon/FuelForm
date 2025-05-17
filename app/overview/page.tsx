'use client';
import { useGlobalData } from "../initializing/Global/GlobalData";
import useCoreData from "@/lib/hooks/CoreData"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import useAuth from '@/lib/useAuth';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ensureDefaultsExist } from "@/lib/UpdateDatabase/ensureDefaultsExist";
import { DawnSyncModal } from "../../ArchivedComponents/Modals/DawnSyncModal";
import { DuskSyncModal } from "../../ArchivedComponents/Modals/DuskSyncModal";
import DawnSyncComponent from "../OverViewComponents/Sync/DawnSyncComponent";
import DuskSyncComponent from "../OverViewComponents/Sync/DuskSyncComponent";
import EnergyBreakdown from "../OverViewComponents/NutrientDisplay/EnergyBreakdown";
import VitaminBreakdown from "../OverViewComponents/NutrientDisplay/VitaminBreakdown";
import MineralBreakdown from "../OverViewComponents/NutrientDisplay/MineralBreakdown";
import { BuildEnergyData } from "../OverViewComponents/NutrientDisplay/BuildEnergyData";
import { BuildVitaminData } from "../OverViewComponents/NutrientDisplay/BuildVitaminData";
import { BuildMineralData } from "../OverViewComponents/NutrientDisplay/BuildMineralData";
import ControlHub from "../OverViewComponents/ControlHub/ControlHubBar";
import useTodaysSync from '@/lib/hooks/TodaysSync';
import { motion, AnimatePresence } from "framer-motion";
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, Sprout, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";
import BirthdayDrop from "../OverViewComponents/PulseDrops/BirthdayDrop";
import PulseDropEngine from "../OverViewComponents/PulseDrops/Data/PulseDropEngine";
import NavLoad from "../initializing/LoadingComponents/NavLoad";
import { AutoClamp } from "@/lib/hooks/AutoClamp";
import ScrollLoad from "@/Backgrounds/ScrollLoad";
import SyncReport from "../OverViewComponents/SyncReportsPage";
import SyncSimulator from "../OverViewComponents/SyncSimulatorPage";
import Crowns from "../OverViewComponents/CrownsPage";
import InfoDex from "../OverViewComponents/InfoDexPage";
import StrengthArchiveComponent from "../OverViewComponents/FitnessTracker/FitnessTrackerComponent";
import NutritionLog from "../OverViewComponents/NutrientLog/NutritionLogComponent";
import DailyGoals from "../OverViewComponents/DailyGoals/DailyGoalsComponent";

import UnlockPageComponent from "../OverViewComponents/CustomerPortal/UnlockPageComponent";
import CoreFeaturesComponent from "../OverViewComponents/CoreTiles/CoreFeaturesComponent";

import OverrideComponent from "../OverViewComponents/Sync/OverrideComponent";
import BiometricsComponent from "../OverViewComponents/Settings/BiometricsComponent";
import CustomSettingsComponent from "../OverViewComponents/Settings/CustomSettingsComponent";
import FitnessGoalsPageComponent from "../OverViewComponents/Settings/MacroSettingsComponent";

export default function CommandCenter() {

  const { user } = useAuth();
  const { userProfile, latestSync } = useCoreData();
  const setUserProfile = useGlobalData((s) => s.setUserProfile);
  const setLatestSync = useGlobalData((s) => s.setLatestSync);
  const UserBackground = userProfile?.customSettings?.background || "None";


  useEffect(() => {
    if (userProfile) {
      setUserProfile(userProfile);
    }
  }, [userProfile]);

  useEffect(() => {
    if (latestSync) {
      setLatestSync(latestSync);
    }
  }, [latestSync]);


  useEffect(() => {
    if (user && userProfile) {
      ensureDefaultsExist(user.uid, userProfile);
    }
  }, [user, userProfile]);

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

  const Icon = LucideIconMap[userProfile?.customSettings?.navIcon || "Atom"];


  const heightDisplay = userProfile?.preferredHeightUnit === "cm"
    ? `${userProfile?.height_cm} cm`
    : `${userProfile?.height_ft_in.feet}'${userProfile?.height_ft_in.inches}"`;

  const weightDisplay = userProfile?.preferredWeightUnit === "lbs"
    ? `${userProfile?.lastKnownWeight_lbs} lbs`
    : `${userProfile?.lastKnownWeight_kg} kg`;

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFitnessOpen, setFitnessOpen] = useState(false);
  const [isOverrideOpen, setOverrideOpen] = useState(false);
  const [isBioOpen, setBioOpen] = useState(false);
  const [isDawnOpen, setDawnOpen] = useState(false);
  const [isDuskOpen, setDuskOpen] = useState(false);
  const [isUnlockOpen, setUnlockOpen] = useState(false);
  const [isCoreOpen, setCoreOpen] = useState(false);

  useEffect(() => {
    if (isCoreOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isCoreOpen]);


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


  const mergedMacros = (userProfile?.latestSync?.recoveryMacros || []).map((recoveryMacro) => {
    const matchingActive = (userProfile?.latestSync?.activeMacros || []).find(
      (activeMacro) => activeMacro.name === recoveryMacro.name
    );

    return {
      name: recoveryMacro.name,
      recoveryValue: recoveryMacro.value,
      activeValue: matchingActive?.value || "[pending]",
    };
  });

  const EnergyData = BuildEnergyData(userProfile?.latestSync);
  const Nutrient_V = BuildVitaminData(userProfile?.latestSync);
  const Nutrient_M = BuildMineralData(userProfile?.latestSync);

  //  if (typeof AccessToken !== 'boolean') return;

  //NUTRIENT BLUEPRINT SECTIONS
  const [selectedSector, setSelectedSector] = useState<"macros" | "vitamins" | "minerals">("macros");

  const handleSectorClick = (sector: "macros" | "vitamins" | "minerals") => {
    setSelectedSector(sector); // No toggling, just always set the new one

  };

  // COMMAND CENTER SECTIONS
  const pageDefault = useGlobalData.getState().pageDefault;

  useEffect(() => {
    setSelectedPage(pageDefault);
  }, []);

  const selectedPage = useGlobalData((s) => s.selectedPage);
  const pageView = selectedPage || "bodysync";

  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);


  const bgKey = userProfile?.customSettings?.background || "None";

  const BGdisplay: Record<string, string> = {
    "None": "bg-[url('/images/loading.jpg')]",
    "homepage": "bg-[url('/images/home.webp')]",
    "loginpage": "bg-[url('/images/login.jpg')]",
    "homepage2": "bg-[url('/images/home2.jpg')]",
    "NeuralLink": "bg-[url('/images/backgrounds/neurallink.webp')]",
    "StarVeil": "bg-[url('/images/backgrounds/starveil.jpg')]",
    "QuantumFade": "bg-[url('/images/backgrounds/quantumfade.jpg')]",
    "ObsidianProtocol": "bg-[url('/images/backgrounds/obsidianprotocol.jpg')]",
    "HexPulse": "bg-[url('/images/backgrounds/hexpulse.jpg')]",
    "CircuitRift": "bg-[url('/images/backgrounds/circuitrift.jpg')]",
    "ChronoSync": "bg-[url('/images/backgrounds/chronosync.webp')]",
    "DataDrift": "bg-[url('/images/backgrounds/datadrift.jpg')]",
    "DarkFirewall": "bg-[url('/images/backgrounds/darkfirewall.jpg')]",
  };
  const backgroundClass = BGdisplay[bgKey] ?? BGdisplay["None"];
  ///TEXT RESIXER FOR CUSTOMER CORE FEATURE CARDS

  const imageKey = userProfile?.customSettings?.background || "None";
  const BG: Record<string, string> = {
    "None": "/images/loading.jpg",
    "homepage": "/images/home.webp",
    "loginpage": "/images/login.jpg",
    "homepage2": "/images/home2.jpg",
    "NeuralLink": "/images/backgrounds/neurallink.webp",
    "StarVeil": "/images/backgrounds/starveil.jpg",
    "QuantumFade": "/images/backgrounds/quantumfade.jpg",
    "ObsidianProtocol": "/images/backgrounds/obsidianprotocol.jpg",
    "HexPulse": "/images/backgrounds/hexpulse.jpg",
    "CircuitRift": "/images/backgrounds/circuitrift.jpg",
    "ChronoSync": "/images/backgrounds/chronosync.webp",
    "DataDrift": "/images/backgrounds/datadrift.jpg",
    "DarkFirewall": "/images/backgrounds/darkfirewall.jpg",
  };
  const backgroundURL = BG[imageKey] ?? BG["None"];

  useTodaysSync();

  const hasDawnSyncedToday = useGlobalData((s) => s.hasDawnSyncedToday);
  const hasDuskSyncedToday = useGlobalData((s) => s.hasDuskSyncedToday);

  return (
    <>
      <ScrollLoad />

      <NavLoad />
      <PageFadeWrapper>
        <BirthdayDrop />
        <PulseDropEngine />

        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundURL}')`,
            minHeight: '100%',
            height: '100%', // Not 100vh!
          }}
        />


        <div className="z-0 scrollbar-hide">
          {/*PAGE ONE === BODYSYNC*/}
          <div className=" w-full rounded-xl">
            <AnimatePresence mode="wait">
              {pageView === "bodysync" && (
                <motion.div
                  key="bodysync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <div className="bg-[url('/images/greyscale/commandcenter.webp')] bg-cover bg-center bg-no-repeat rounded-xl">
                      <div className=" bg-[rgba(43,0,255,0.2)] inset-0 p-2 rounded-xl mb-2">
                        <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
                        <h2 className="text-md text-center font-bold text-white">
                          Every sync refines the system. Every action shapes the form.
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-[5fr_1fr] gap-4 h-full">
                      {/*LARGE COLUMN*/}
                      <div>
                        {userProfile?.gender === 'male' ? (
                          <>
                            <div className="h-[500px] bg-[url('/images/greyscale/bodysyncmale.webp')] bg-cover bg-center bg-no-repeat rounded-xl glowing-button2">
                              <div className="relative h-[500px]  bg-[rgba(43,0,255,0.2)] inset-0 p-2 rounded-xl ">
                                <div className="absolute text-white top-0 left-0 w-full h-full">



                                  <h2 className="text-left  ml-2 text-lg pulse-glow flex items-center">Biometrics{userProfile?.gender === 'male' ? (<Mars size={24} />) : (<Venus size={24} />)}</h2>
                                  <h2 className="text-left ml-2 text-xs">Age: {userProfile?.age} Years</h2>
                                  <h2 className="text-left ml-2 text-xs">Height: {heightDisplay}</h2>
                                  <h2 className="text-left  ml-2 text-xs">Current Weight: {weightDisplay}</h2>
                                  <h2 className="text-left ml-2 text-xs pb-1">Calorie Goal: {userProfile?.macroVaultSettings?.calorieGoal}Kcal</h2>



                                  <div className="flex justify-end pr-[5px] items-end h-full pb-[95px] ">
                                    <button onClick={() => {
                                      setSelectedPage("SyncReport");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}>
                                      <div
                                        className="bg-white/30 rounded-xl  border border-bg-indigo-300  hover:bg-indigo-300/50 flex flex-col text-center p-2 mb-2">
                                        <div className="flex leading-none text-sm items-center font-semibold" >
                                          SyncReport
                                          <Rotate3d size={30} />
                                        </div>
                                      </div>
                                    </button>
                                  </div>



                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="h-[500px]  bg-[url('/images/greyscale/bodysyncfemale.webp')] bg-cover bg-center bg-no-repeat rounded-xl glowing-button2">
                              <div className="h-[500px]  bg-[rgba(43,0,255,0.2)] inset-0 p-2 rounded-xl">
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/*SMALL COLUMN*/}
                      <div className="">



                        <button onClick={() => {
                          setSelectedPage("Macros");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                          <div
                            className="bg-white/30 rounded-3xl  border border-bg-indigo-300 flex flex-col  hover:bg-indigo-300/50 text-center p-2 mb-2">
                            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
                              Macros
                              <Flame size={30} />
                            </div>
                          </div>

                        </button>

                        <button onClick={() => {
                          setSelectedPage("Vitamins");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                          <div
                            className="bg-white/30 rounded-3xl  border border-bg-indigo-300 flex  hover:bg-indigo-300/50 flex-col text-center p-2 mb-2">
                            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
                              Vitamin
                              <Sprout size={30} />
                            </div>
                          </div>

                        </button>

                        <button onClick={() => {
                          setSelectedPage("Minerals");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                          <div
                            className="bg-white/30 rounded-3xl  border border-bg-indigo-300  hover:bg-indigo-300/50 flex flex-col text-center p-2 mb-2">
                            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
                              Mineral
                              <Atom size={30} />
                            </div>
                          </div>
                        </button>



                      </div>

                    </div>

                    {/*DAWNSYNC 7 DUSKSYNC LOGIC*/}


                    {isDawnOpen && (
                      <DawnSyncModal onClose={() => setDawnOpen(false)}>
                        < DawnSyncComponent />
                      </DawnSyncModal>)}


                    {isDuskOpen && (
                      <DuskSyncModal onClose={() => setDuskOpen(false)}>
                        < DuskSyncComponent />
                      </DuskSyncModal>)}



                    <div className="fixed bottom-16 max-w-md left-1/2 -translate-x-1/2 w-full flex justify-center z-30">
                      {userProfile?.isPaid ? (
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
                              onClick={() => {
                                setSelectedPage("DawnSync");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}>
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
                              onClick={() => {
                                setSelectedPage("DuskSync");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}>
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


                  </>
                </motion.div>)}

              {/*PAGE 2 - STATS ECHO*/}
              {pageView === "SyncReport" && (
                <motion.div
                  key="SyncReport"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>

                    <SyncReport />

                  </>
                </motion.div>)}

              {/*FITNESS TRACKER- WORKOUT BUILDER*/}
              {pageView === "FitnessTracker" && (

                <motion.div
                  key="FitnessTracker"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>



                  <StrengthArchiveComponent />

                </motion.div>
              )}

              {/*DAILY GOALS */}
              {pageView === "DailyGoals" && (
                <motion.div
                  key="DailyGoals"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>

                    <DailyGoals />

                  </>
                </motion.div>)}

              {/*NutritionLog*/}
              {pageView === "NutrientLog" && (
                <motion.div
                  key="NutrientLog"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>

                    <NutritionLog />


                  </>
                </motion.div>)}

              {/*ACHIEVMENTS*/}
              {pageView === "Crowns" && (
                <motion.div
                  key="Crowns"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <Crowns />
                  </>
                </motion.div>)}

              {/*SyncSimulator*/}
              {pageView === "SyncSim" && (
                <motion.div
                  key="SyncSim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <SyncSimulator />
                  </>
                </motion.div>)}

              {/*INFO DEX*/}
              {pageView === "InfoDex" && (
                <motion.div
                  key="InfoDex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <InfoDex />
                  </>
                </motion.div>)}

              {/*UNLOCK PAGE*/}
              {pageView === "Unlock" && (
                <motion.div
                  key="Unlock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <UnlockPageComponent />
                  </>
                </motion.div>)}

              {/*MACROS*/}
              {pageView === "Macros" && (
                <motion.div
                  key="Macros"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <EnergyBreakdown data={EnergyData} />
                  </>
                </motion.div>)}


              {/*VITAMINS*/}
              {pageView === "Vitamins" && (
                <motion.div
                  key="Vitamins"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <VitaminBreakdown Vitamins={Nutrient_V} />
                  </>
                </motion.div>)}


              {/*MINERALS*/}
              {pageView === "Minerals" && (
                <motion.div
                  key="Minerals"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <MineralBreakdown minerals={Nutrient_M} />
                  </>
                </motion.div>)}

              {/*DAWN SYNC*/}
              {pageView === "DawnSync" && (
                <motion.div
                  key="DawnSync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <DawnSyncComponent />
                  </>
                </motion.div>)}


              {/*DUSK SYNC*/}
              {pageView === "DuskSync" && (
                <motion.div
                  key="DuskSync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <DuskSyncComponent />
                  </>
                </motion.div>)}



              {/*SYNC OVERRIDE*/}
              {pageView === "override" && (
                <motion.div
                  key="override"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <OverrideComponent />
                  </>
                </motion.div>)}




              {/*CORE FEATURES*/}
              {pageView === "corefeatures" && (
                <motion.div
                  key="DuskcorefeaturesSync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <CoreFeaturesComponent />
                  </>
                </motion.div>)}



              {/*BIOMETRICS*/}
              {pageView === "biometrics" && (
                <motion.div
                  key="biometrics"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <BiometricsComponent />
                  </>
                </motion.div>)}



              {/*custom settings*/}
              {pageView === "customsettings" && (
                <motion.div
                  key="customsettings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <CustomSettingsComponent />
                  </>
                </motion.div>)}



              {/*custom settings*/}
              {pageView === "nutrientsettings" && (
                <motion.div
                  key="nutrientsettings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <FitnessGoalsPageComponent />
                  </>
                </motion.div>)}



              FitnessGoalsPageComponent




            </AnimatePresence>
          </div>

          {/*NAVIGATION ARROWS*/}






          {/*NAVPORTAL*/}
          <footer className="pt-4 pb-2">
            <ControlHub />
          </footer>
        </div >
      </PageFadeWrapper>

    </>

  );
}