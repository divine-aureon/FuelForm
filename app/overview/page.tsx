'use client';
//DUAL STATES DATABASE & GLOBALDATA ACCISABILITY
import { useGlobalData } from "../initializing/Global/GlobalData";
import { EstablishConnection } from "../initializing/Global/EstablishConnection";

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
import SyncReport from "../OverViewComponents/SyncReportsPage";
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
import useTodaysSync from '@/lib/hooks/TodaysSync';
import NavLoad from "../initializing/LoadingComponents/SystemLoad";
import ScrollLoad from "@/Backgrounds/ScrollLoad";

//PULSE DROP COMPONENT
import BirthdayDrop from "../OverViewComponents/PulseDrops/BirthdayDrop";
import PulseDropEngine from "../OverViewComponents/PulseDrops/Data/PulseDropEngine";

//OVERVIEW PAGE BEGINS
export default function CommandCenter() {


  //CENTRAL INTELLIGENCE
  const { user } = useAuth();

  const userProfile = useGlobalData((s) => s.userProfile);

  useEffect(() => {
    if (user?.uid) {
      EstablishConnection(user?.uid);
    }
  }, [user?.uid]);

  ///END NOTE

  const setUserProfile = useGlobalData((s) => s.setUserProfile);
  const setLatestSync = useGlobalData((s) => s.setLatestSync);
  const setLatestFitnessSync = useGlobalData((s) => s.setLatestFitnessSync);
  const setSyncHistory = useGlobalData.getState().setSyncHistory;
  const setFitnessHistory = useGlobalData.getState().setFitnessHistory;


  //useEffect(() => {
  //  if (latestSync) {
  //    setLatestSync(latestSync);
  //  }
  // }, [latestSync]);


  //useEffect(() => {
  //  if (user && userProfile) {
  //    ensureDefaultsExist(user.uid, userProfile);
  //   }
  //}, [user, userProfile]);

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
  const EnergyData = BuildEnergyData(userProfile?.latestSync);
  const Nutrient_V = BuildVitaminData(userProfile?.latestSync);
  const Nutrient_M = BuildMineralData(userProfile?.latestSync);


  // COMMAND CENTER PAGE SECTION MANAGEMENT
  const pageDefault = useGlobalData.getState().pageDefault;

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
  useTodaysSync();
  const hasDawnSyncedToday = useGlobalData((s) => s.hasDawnSyncedToday);
  const hasDuskSyncedToday = useGlobalData((s) => s.hasDuskSyncedToday);


  //THE VISUAL PAGE STARTS HERE
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
                      <div className="max-w-xs bg-[url('/images/greyscale/commandcenter.webp')] bg-cover bg-center bg-no-repeat rounded-xl border border-indigo-400">
                        <div className=" bg-[rgba(43,0,255,0.2)] inset-0 rounded-xl">
                          <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
                          <h2 className="text-md text-center font-bold text-white">
                            Syncing {userProfile?.name}&apos;s<br />
                            Biological Data
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="grid place-items-center">


                      <div className="max-w-xs w-full">

                        <div className="h-[500px] bg-cover bg-center bg-no-repeat rounded-xl glowing-button2"
                          style={{
                            backgroundImage: `url('${GenderBackgroundURL}')`,

                          }}>


                          <div className="h-[500px] bg-[rgba(43,0,255,0.2)] inset-0 p-2 rounded-xl ">
                            <div className="relative h-[500px] ">


                              <div className="absolute p-1 pr-5 pb-2 text-indigo-100 bg-white/20 rounded-xl ">
                                <h2 className="text-left  ml-2 text-lg pulse-glow flex items-center">Biometrics</h2>
                                <h2 className="text-left ml-2 text-xs">Age: {userProfile?.age} Years</h2>
                                <h2 className="text-left ml-2 text-xs">Gender: {userProfile?.gender}</h2>
                                <h2 className="text-left ml-2 text-xs">Height: {heightDisplay}</h2>
                                <h2 className="text-left  ml-2 text-xs">Weight: {weightDisplay}</h2>
                                <h2 className="text-left ml-2 text-xs pb-1">+/- Kcal: {userProfile?.nutritionSettings?.calorieGoal}Kcal</h2>
                              </div>

                              <div className="absolute text-indigo-100 bottom-0 left-0 pb-5">
                                {userProfile?.gender === 'male' ? (<Mars size={40} />) : (<Venus size={40} />)}
                              </div>

                              <div className="absolute bottom-0 right-0 mb-3 text-indigo-100">
                                <button onClick={() => {
                                  setSelectedPage("SyncReport");
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}>
                                  <div
                                    className="bg-white/30 rounded-xl  border border-indigo-400  hover:bg-indigo-300/50 flex flex-col text-center p-2 mb-2">
                                    <div className="flex leading-none text-sm items-center font-semibold" >
                                      SyncReport
                                      <Rotate3d size={30} />
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 absolute top-0 right-0  text-indigo-100">



                                <button onClick={() => {
                                  setSelectedPage("Macros");
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}>
                                  <div
                                    className="bg-white/30 rounded-3xl  border border-indigo-400 flex flex-col  hover:bg-indigo-300/50 text-center p-2 mb-2">
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
                                    className="bg-white/30 rounded-3xl  border border-indigo-400 flex  hover:bg-indigo-300/50 flex-col text-center p-2 mb-2">
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
                                    className="bg-white/30 rounded-3xl  border border-indigo-400  hover:bg-indigo-300/50 flex flex-col text-center p-2 mb-2">
                                    <div className="flex leading-none text-sm items-center flex-col font-semibold" >
                                      Mineral
                                      <Atom size={30} />
                                    </div>
                                  </div>
                                </button>



                              </div>


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