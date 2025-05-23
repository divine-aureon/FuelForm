'use client';
//DUAL STATES DATABASE & GLOBALDATA ACCISABILITY
import { getGlobalDataState } from "../Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import type { UserProfile } from "../Global/BodySyncManifest"

//MISC..
import { useState, useEffect } from "react";
import React from "react";
import useAuth from '@/lib/useAuth';
import { ensureDefaultsExist } from "@/lib/UpdateDatabase/ensureDefaultsExist";
import { motion, AnimatePresence } from "framer-motion";
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, Sprout, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";


//PAGE COMPONENTS
import DawnSyncComponent from "../OverViewComponents/Sync/DawnSyncComponent";
import DuskSyncComponent from "../OverViewComponents/Sync/DuskSyncComponent";
import ControlHub from "../OverViewComponents/ControlHub/ControlHubBar";
import SyncReportNEW from "../OverViewComponents/SyncReport/SyncReportsPage";
import SyncSimulator from "../OverViewComponents/SyncSimulatorPage";
import Crowns from "../OverViewComponents/CrownsPage";
import InfoDex from "../OverViewComponents/InfoDexPage";
import StrengthArchive from "../OverViewComponents/FitnessTracker/FitnessTrackerComponent";
import RepSync from "../OverViewComponents/FitnessTracker/RepSync";
import NutritionLog from "../OverViewComponents/NutrientLog/NutritionLogComponent";
import DailyGoals from "../OverViewComponents/DailyGoals/DailyGoalsComponent";
import UnlockPageComponent from "../OverViewComponents/CustomerPortal/UnlockPageComponent";
import CoreFeaturesComponent from "../OverViewComponents/CoreTiles/CoreFeaturesComponent";
import OverrideComponent from "../OverViewComponents/Sync/OverrideComponent";
import BiometricsComponent from "../OverViewComponents/Settings/BiometricsComponent";
import CustomSettingsComponent from "../OverViewComponents/Settings/CustomSettingsComponent";
import FitnessGoalsPageComponent from "../OverViewComponents/Settings/MacroSettingsComponent";

//MISC COMPONENTS
import EnergyBreakdown from "../OverViewComponents/NutrientDisplay/EnergyBreakdown";
import VitaminBreakdown from "../OverViewComponents/NutrientDisplay/VitaminBreakdown";
import MineralBreakdown from "../OverViewComponents/NutrientDisplay/MineralBreakdown";
import { BuildEnergyData } from "../OverViewComponents/NutrientDisplay/BuildEnergyData";
import { BuildVitaminData } from "../OverViewComponents/NutrientDisplay/BuildVitaminData";
import { BuildMineralData } from "../OverViewComponents/NutrientDisplay/BuildMineralData";
import useDawnSyncPoints from '@/app/OverViewComponents/Sync/hasDawnSynced';
import useDuskSyncPoints from '@/app/OverViewComponents/Sync/hasDuskSynced';
import useFitnessSyncPoints from '@/app/OverViewComponents/Sync/hasFitnessSynced';
import ScrollLoad from "@/Backgrounds/ScrollLoad";
import NavLoad from "../LoadingComponents/NavLoad"
import SystemInit from "../LoadingComponents/SystemInit"

//PULSE DROP COMPONENT
import BirthdayDrop from "../OverViewComponents/PulseDrops/BirthdayDrop";
import PulseDropEngine from "../OverViewComponents/PulseDrops/Data/PulseDropEngine";

//OVERVIEW PAGE BEGINS
export default function CommandCenter() {
console.warn("USER PROFILE:", getGlobalDataState().userProfileSTORE);

  //CENTRAL INTELLIGENCE
  const { user } = useAuth();




  const userProfileSTORE = getGlobalDataState().userProfileSTORE;
  const userProfile = userProfileSTORE;
  const latestSyncSTORE = getGlobalDataState().latestSyncSTORE;
  const latestSync = latestSyncSTORE;

  ///END NOTE

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


  //DISPLAY INFORMATION FOR BODYSYNC PANEL

  //HEIGHT INFO
  const heightDisplay = userProfile?.preferredHeightUnit === "cm"
    ? `${userProfile?.height_cm} cm`
    : `${userProfile?.height_ft_in.feet}'${userProfile?.height_ft_in.inches}"`;


  //WEIGHT INFO
  const weightDisplay = userProfile?.preferredWeightUnit === "lbs"
    ? `${userProfile?.lastKnownWeight_lbs} lbs`
    : `${userProfile?.lastKnownWeight_kg} kg`;


  //????
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


  //NUTRIENT PANEL DISPLAYS
  const EnergyData = BuildEnergyData(latestSync);
  const Nutrient_V = BuildVitaminData(latestSync);
  const Nutrient_M = BuildMineralData(latestSync);


  // COMMAND CENTER PAGE SECTION MANAGEMENT
  const pageDefault = useGlobalData((s) => s.pageDefault);

  useEffect(() => {
    setSelectedPage(pageDefault);
  }, []);

  const selectedPage = useGlobalData((s) => s.selectedPage);
  const pageView = selectedPage || "bodysync";

  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);


  //BACKGROUND MANAGMENT
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

  //BACKGROUND MANAGMENT
  const GenderKey = userProfile?.gender || "None";
  const GenderBG: Record<string, string> = {
    "male": "/images/greyscale/bodysyncmale2.png",
    "female": "/images/greyscale/bodysyncfemale2.png",
  };
  const GenderBackgroundURL = GenderBG[GenderKey] ?? GenderBG["None"];


  //DAWN SYNC BUTTON MANIPULATION
  useDawnSyncPoints();
  const hasDawnSyncedToday = useGlobalData((s) => s.hasDawnSyncedToday);
  useDuskSyncPoints();
  const hasDuskSyncedToday = useGlobalData((s) => s.hasDuskSyncedToday);
  useFitnessSyncPoints();
  const hasFitnessSyncedToday = useGlobalData((s) => s.hasFitnessSyncedToday);

  //DAILY SYNC PROGRESS BAR

  const DawnPoints = hasDawnSyncedToday ? 1 : 0;
  const DuskPoints = hasDuskSyncedToday ? 1 : 0;
  const FitnessPoints = hasFitnessSyncedToday ? 1 : 0;

  const TotalBarPoints = DawnPoints + DuskPoints + FitnessPoints | 0;

  const percentage = (TotalBarPoints / 3) * 100;

  //THE VISUAL PAGE STARTS HERE
  return (
    <>
      <ScrollLoad />
      <NavLoad />
      <PageFadeWrapper>
        {/*<BirthdayDrop />*/}

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
          <div className="w-full rounded-xl">
            <AnimatePresence mode="wait">
              {pageView === "bodysync" && (
                <motion.div
                  key="bodysync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <>
                    <div className="grid place-items-center mb-2">
                      <div className=" bg-[url('/images/greyscale/commandcenter.webp')] bg-cover bg-center bg-no-repeat rounded-xl border border-indigo-400">
                        <div className=" bg-[rgba(43,0,255,0.2)] inset-0 rounded-xl">
                          <h2 className="text-3xl text-center font-bold text-white pulse-glow px-3">Vital Systems Online</h2>
                          <h2 className="text-md text-center font-bold text-white">
                            Syncing {userProfile?.name}&apos;s<br />
                            Biological Data
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="grid place-items-center">


                      <div className="max-w-xs w-full">

                        <div className="h-[550px] bg-cover bg-center bg-no-repeat rounded-xl glowing-button2"
                          style={{
                            backgroundImage: `url('${GenderBackgroundURL}')`,

                          }}>

                          {/*BODYSYNC CONTAINER*/}
                          <div className="h-[550px] bg-[rgba(43,0,255,0.2)] inset-0 p-2 rounded-xl ">
                            {/*BEGIN TRANSMISSION*/}
                            <div className="relative h-[530px] ">




                              {/*BIOMETRICS*/}
                              <button onClick={() => { setSelectedPage("biometrics"); }} >
                                <div className="absolute bottom-0 left-0 text-indigo-100 bg-white/10 rounded-lg border border-indigo-100">

                                  <div className="relative pl-3 pr-9 h-full pb-1">
                                    <div className="absolute right-1 flex gap-2 ">

                                      <h2><Fingerprint size={36} /></h2>
                                    </div>
                                    <h2 className="text-left text-lg pulse-glow flex text-left">Biometrics</h2>
                                    <h2 className="text-left text-xs">Age: {userProfile?.age} Years</h2>
                                    <h2 className="text-left text-xs">Height: {heightDisplay}</h2>
                                    <h2 className="text-left  text-xs">Weight: {weightDisplay}</h2>
                                    <h2 className="mt-1 text-center text-sm font-semibold pulse-glow ">Click to Modify</h2>
                                  </div>

                                </div>
                              </button>
                              {/*HAS SYNCED BAR*/}




                              <div className="absolute  rounded-xl top-0 left-0 w-[75%] border border-indigo-300 overflow-hidden">
                                <div className="relative rounded-xl text-left pl-3 pb-1 text-indigo-100 ">Daily Sync Progress</div>
                                <div className="absolute inset-0 h-full rounded-xl bg-white/10 overflow-hidden">
                                  <div
                                    className="left-0 h-full bg-green-300/50 transition-all duration-1200"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>

                              {/*MARS vs VENUS*/}
                              <div className="absolute text-indigo-100 bottom-28 left-0">
                                {userProfile?.gender === 'male' ? (<Mars size={40} />) : (<Venus size={40} />)}
                              </div>

                              {/*BOTTOM RIGHT CORNER*/}
                              <div className="absolute bottom-0 right-0 flex flex-col text-indigo-100">

                                {userProfile?.isPaid ? (
                                  <>

                                    <button
                                      onClick={() => {
                                        setSelectedPage("nutrientsettings");
                                      }}>

                                      <div className="bg-white/20 rounded-lg  border border-indigo-400  hover:bg-indigo-300/50 flex flex-col justify-betwen text-center backdrop-blur  py-1 pl-2 pr-1 mb-2">

                                        <div className="flex justify-between">
                                          <div className="flex leading-none text-sm items-center font-semibold" >
                                            {userProfile?.nutritionSettings?.calorieGoal}Kcal</div>
                                          <div><Flame size={30} /></div>
                                        </div>

                                      </div>
                                    </button>

                                  </>
                                ) : (
                                  <>


                                    <button
                                      disabled>
                                      <div className="bg-white/20 rounded-lg cursor-default border border-indigo-400 flex flex-col justify-betwen text-center backdrop-blur  py-1 pl-2 pr-1">

                                        <div className="flex justify-between">
                                          <div className="flex leading-none text-sm items-center font-semibold" >
                                            Kcal Goal</div>
                                          <div><Lock size={30} /></div>
                                        </div>

                                      </div>
                                    </button>

                                  </>
                                )}

                                <button onClick={() => {
                                  setSelectedPage("SyncReport");
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}>
                                  <div
                                    className="bg-white/20 rounded-lg  border border-indigo-400  hover:bg-indigo-300/50 flex flex-col justify-between text-center py-1 pl-2 pr-1">

                                    <div className="flex justify-between">
                                      <div className="flex leading-none text-sm items-center font-semibold" >
                                        Trends</div>
                                      <div><Rotate3d size={30} /></div>

                                    </div>

                                  </div>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 absolute top-0 right-0  text-indigo-100">
                                {/*NUTRIENT LINKS*/}
                                <button onClick={() => {
                                  setSelectedPage("Macros");
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}>
                                  <div
                                    className="bg-white/20 rounded-xl  border border-indigo-400 flex flex-col  hover:bg-indigo-300/50 text-center p-2 mb-2">
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
                                    className="bg-white/20 rounded-xl  border border-indigo-400 flex  hover:bg-indigo-300/50 flex-col text-center p-2 mb-2">
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
                                  <div className="bg-white/20 rounded-xl  border border-indigo-400  hover:bg-indigo-300/50 flex flex-col text-center p-2 mb-2">
                                    <div className="flex leading-none text-sm items-center flex-col font-semibold" >
                                      Mineral
                                      <Atom size={30} />
                                    </div>
                                  </div>
                                </button>

                              </div>
                              {/*END TRANSMITTION*/}

                            </div>
                          </div>
                        </div>
                      </div>




                    </div>

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

                    <SyncReportNEW />

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



                  <StrengthArchive />

                </motion.div>
              )}


              {/*RepSync*/}
              {pageView === "RepSync" && (

                <motion.div
                  key="RepSync"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>



                  <RepSync />

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