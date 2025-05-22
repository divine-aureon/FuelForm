"use client";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile, LiftIndexData, FitnessSettingsData } from "../../initializing/Global/BodySyncManifest"

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import useCoreData from "@/lib/hooks/CoreData";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from '@stripe/stripe-js';
import CoreStackComponent from "./WorkoutBuilderComponent"
import LiftIndexComponent from "./LiftProfileComponent"
import FitHistoryComponent from "./FitHistoryComponent"
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import Link from 'next/link';


export default function StrengthArchive() {

  //inialization steps

  const { user } = useAuth();

  const userProfileSTORE = getGlobalDataState().userProfileSTORE;
  const userProfile = userProfileSTORE
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);


  const fitnessSettings = userProfile?.fitnessSettings ?? ({} as FitnessSettingsData);
  const liftIndex = fitnessSettings?.liftIndex ?? ({} as LiftIndexData);

  const setLiftIndex = useGlobalData((s) => s.setLiftIndex);

  useEffect(() => {
    if (userProfile?.fitnessSettings?.liftIndex) {
      setLiftIndex(userProfile.fitnessSettings.liftIndex);
    }
  }, [userProfile?.fitnessSettings?.liftIndex]);


  //DATA INPUT

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  const [activeSplit, setActiveSplit] = useState("");
  const [bodygroup, setBodygroup] = useState("");
  const [movements, setMovements] = useState("");


  //check split steps
  type Split = {
    id: string;
    name: string;
  };

  //SELECTED VIEW BAR/ 

  const selectedSector2 = useGlobalData((s) => s.selectedSector2);
  const setSelectedSector2 = useGlobalData((s) => s.setSelectedSector2);

  const pageView = selectedSector2 || "newsession";


  const SplitDisplayNames: { [key: string]: string } = {
    pushpulllegs: "Push-Pull-Legs",
    upperlower: "Upper-Lower",
    fullbody: "Full Body",
    brosplit5: "5-Day Bro Split",
    brosplit3: "3-Day Bro Split",

  };

  const BodyGroupDisplayNames = {
    push: "Push",
    pull: "Pull",
    legs: "Legs",

    upper: "Upper",
    lower: "Lower",

    fullBody: "FullBody",

    broLegs: "Legs",
    chest: "Chest",
    back: "Back",
    shoulders: "Shoulders",
    arms: "Arms",
  };

  const MovementProfileDisplayNames = {
    push: "Push",
    pull: "Pull",
    legs: "Legs",

    upper: "Upper",
    lower: "Lower",

    fullBody: "FullBody",

    broLegs: "Legs",
    chest: "Chest",
    back: "Back",
    shoulders: "Shoulders",
    arms: "Arms",
  };





  if (typeof userProfile?.isPaid !== 'boolean') return;

  // Main Strength Archive UI
  return (
    <>
      <ScrollLoad />
      {userProfile?.isPaid ? (
        <>

          <div className=" w-full rounded-xl ">
            <AnimatePresence mode="wait">

              {pageView === "newsession" && (
                <motion.div
                  key="newsession"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}>
                  <div>
                    <CoreStackComponent />
                  </div>
                </motion.div>
              )}

              {pageView === "profiles" && (
                <motion.div
                  key="profiles"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}>
                  <div>
                    <LiftIndexComponent />
                  </div>
                </motion.div>
              )}


              {pageView === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-5xl glowing-button mb-2">
                      <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                        <div className="flex items-center gap-2 pulse-glow">Fitness History</div>
                        <h2 className="text-lg font-bold text-white">
                          Log It. Lift It. Level Up.
                        </h2>
                      </div>
                    </div>
                  </div>

                  <FitHistoryComponent />

                </motion.div>
              )}

            </AnimatePresence>
          </div>


          <div className="w-full max-w-md px-2 left-1/2 -translate-x-1/2 fixed bottom-16 ">
            <div className="grid grid-cols-3 gap-1 w-full rounded-xl">
              <button
                onClick={() => setSelectedSector2("history")}
                className={`px-5 w-full text-md rounded-xl shadow ${selectedSector2 === "history" ? "bg-indigo-300/50" : "glowing-button"}`}>
                History
              </button>
              <button
                onClick={() => setSelectedSector2("newsession")}
                className={`w-full text-md rounded-xl shadow ${selectedSector2 === "newsession" ? "bg-indigo-300/50" : "glowing-button"}`}>
                CoreStack
              </button>
              <button
                onClick={() => setSelectedSector2("profiles")}
                className={`px-5 w-full text-md rounded-xl shadow ${selectedSector2 === "profiles" ? "bg-indigo-300/50" : "glowing-button"}`}>
                Lift Index
              </button>
            </div>
          </div>




        </>
      ) : (
        <>

          <h2 className="text-2xl font-bold mb-4">Access Restricted..</h2>
          <p className="mb-4">The Strength Archive is your personal vault of power — a place to log your lifts,
            track your progress, and unlock your true potential over time. Right now, the system is offline,
            waiting for activation. When you&apos;re ready to record every rep, hit personal records, and watch
            your strength evolve day by day, power up this feature and take control of your training like never before.</p>

          <button onClick={() => {
            setSelectedPage("Unlock");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} className="text-center p-3 text-lg hover:bg-indigo-300/50 glowing-button">
            More Info
          </button>

        </>
      )}
    </>
  );
}
