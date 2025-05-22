'use client';

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import useCoreData from "@/lib/hooks/CoreData";
import ControlHub from "../ControlHub/ControlHubBar";
import { motion, AnimatePresence } from "framer-motion";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"



export default function DailyGoals() {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  //inialization steps

  const { user } = useAuth();
         const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

  const isPaidUser = userProfile?.isPaid ?? null;

  const [isUnlockOpen, setUnlockOpen] = useState(false);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);

  { /SELECTED VIEW BAR/ }

  const [selectedSector, setSelectedSector] = useState<"prime" | "longterm" | "completed">("prime");

  const handleSectorClick = (sector: "prime" | "longterm" | "completed") => {
    setSelectedSector(sector); // No toggling, just always set the new one
  };


  if (typeof isPaidUser !== 'boolean') return;

  // Main Strength Archive UI
  return (
    <>
      <ScrollLoad />
      <div>
        <div className="relative h-32 bg-[url('/images/menus/tasks2.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex items-center gap-2">PrimeTasks Lobby</div>
            <h2 className="text-sm font-bold text-white">
              Align. Commit. Evolve.
            </h2>
          </div>
        </div>
      </div>

          <div className=" w-full rounded-xl ">
            <AnimatePresence mode="wait">

              {selectedSector === "prime" && (
                <motion.div
                  key="prime"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >

                  <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                    <div className="p-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                      <div className="place-self-center text-center text-2xl font-semibold pulse-glow">PrimeTask List</div>
                    </div>

                    <div className="text-white text-md text-center p-3">
                      PrimeTasks are your core objectives — the essential tasks you commit to completing each day to stay
                      aligned with your goals, routines, and values. They represent discipline in action. Whether you&apos;re
                      focused on fitness, productivity, mental clarity, or growth, PrimeTasks are your non-negotiables.
                      Each morning, set your PrimeTasks. At night, check them off and track your momentum.
                    </div>
                  </div>

                </motion.div>
              )}
              {selectedSector === "longterm" && (
                <motion.div
                  key="longterm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >

                  <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                    <div className="p-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                      <div className="place-self-center text-center text-2xl font-semibold pulse-glow">Think Big. Achieve Big.</div>
                    </div>

                    <div className="text-white text-md text-center p-3">
                      This is where youll keep track of your larger goals — the ones that unfold over weeks or months, not just a single day.
                      Whether you&apos;re working toward building a new system, transforming your body, launching a project, or creating lasting
                      habits, your long-term tasks live here. These are the missions that require consistency, vision, and patience. You
                      can update them as you evolve, mark milestones along the way, and stay grounded in what you&apos;re truly working toward.
                      Let this section be your reminder of the bigger picture — the reason behind your daily efforts.
                    </div>

                  </div>

                </motion.div>
              )}


              {selectedSector === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                    <div className="p-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                      <div className="place-self-center text-center text-2xl font-semibold pulse-glow">Completed Tasks</div>
                    </div>

                    <div className="text-white text-md text-center p-3">
                      This is your archive of wins — the place where your progress becomes real. Every time you check off a
                      task, it gets logged here as proof of your consistency, focus, and follow-through. Over time, this
                      space becomes a timeline of your growth — not just what you&apos;ve done, but how far you&apos;ve come. On
                      tough days, come here to remind yourself: you&apos;re building something, and its working. Every checkbox is a step forward.
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>


          <div className="w-full fixed bottom-16 left-0">
            <div className="grid grid-cols-3 gap-1 rounded-xl">
              <button
                onClick={() => handleSectorClick("completed")}
                className={` text-md rounded-xl shadow ${selectedSector === "completed" ? "bg-indigo-300/50" : "text-left flex justify-center glowing-button"}`}>
                Completed
              </button>
              <button
                onClick={() => handleSectorClick("prime")}
                className={`w-full text-md  rounded-xl shadow ${selectedSector === "prime" ? "bg-indigo-300/50" : "text-left flex justify-center glowing-button"}`}>
                PrimeTasks
              </button>
              <button
                onClick={() => handleSectorClick("longterm")}
                className={`w-full text-md rounded-xl shadow ${selectedSector === "longterm" ? "bg-indigo-300/50" : "text-left flex justify-center glowing-button"}`}>
                ThinkBig
              </button>
            </div>
          </div>


    </>
  );
}
