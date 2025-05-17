"use client";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import useCoreData from "@/lib/hooks/CoreData";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from '@stripe/stripe-js';
import CoreStackComponent from "./WorkoutBuilderComponent"
import LiftIndexComponent from "./LiftProfileComponent"
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import Link from 'next/link';


export default function StrengthArchive() {

  //inialization steps

  const { user } = useAuth();
  const userProfile = useGlobalData((s) => s.userProfile);

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
  const [selectedSector, setSelectedSector] = useState<"newsession" | "profiles" | "history">("newsession");

  const handleSectorClick = (sector: "newsession" | "profiles" | "history") => {
    setSelectedSector(sector); // No toggling, just always set the new one
  };


  //Workout selector view pages NEXT BACK BUTTONS/ 
  const [selectedSetup, setSelectedSetup] = useState<"splits" | "bodygroup" | "movements">("splits");


  const handleSetupClick = (page: "splits" | "bodygroup" | "movements") => {
    setSelectedSetup(page); // No toggling, just always set the new one
  };

  //SPLIT SELECTOR BUTTONS
  const [SplitButton, setSplitButton] = useState<"pushpulllegs" | "fullbody" | "brosplit5" | "upperlower" | "brosplit3" | null>(null);

  const handleSplitClick = (selection: "pushpulllegs" | "fullbody" | "brosplit5" | "upperlower" | "brosplit3") => {
    setSplitButton(selection); // No toggling, just always set the new one
  };

  //BODYGROUP SELECTOR BUTTONS
  const [bodygroupButton, setBodygroupButton] = useState<"1" | "2" | "3" | "4" | "5" | null>(null);

  const handleBodygroupClick = (selection: "1" | "2" | "3" | "4" | "5") => {
    setBodygroupButton(selection); // No toggling, just always set the new one
  };

  //MOVEMENT SELECTOR BUTTONS
  const [movementButton, setMovementButton] = useState<"profile" | null>(null);

  const handleMovementClick = (selection: "profile") => {
    setMovementButton(selection); // No toggling, just always set the new one
  };

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


  //NEW CURRENT ACTIVE SPLIT DETECTED
  const [warningSeen, setWarningSeen] = useState(false)
  useEffect(() => {
    if (
      activeSplit &&
      userProfile?.strengthArchiveSettings?.currentSplit &&
      activeSplit !== userProfile?.strengthArchiveSettings.currentSplit
    ) {
      if (!warningSeen) {
        setWarningSeen(true);
      }
    }
  }, [activeSplit, userProfile?.strengthArchiveSettings?.currentSplit]);


  if (typeof userProfile?.isPaid !== 'boolean') return;

  // Main Strength Archive UI
  return (
    <>
      <ScrollLoad />
      {!userProfile?.strengthArchiveSettings?.isStrengthArchiveActive ? (
        <>

          <div className="p-4 text-center backdrop-blur-sm bg-white/30 rounded-lg">


            {userProfile?.isPaid ? (
              <>


                <div>
                  <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                      <div className="flex items-center gap-2">StrengthArchive Lobby</div>
                      <h2 className="text-sm font-bold text-white">
                        Log It. Lift It. Level Up.
                      </h2>
                    </div>
                  </div>
                </div>


                <h2 className="text-2xl font-bold mb-4">Activate StrengthArchive</h2>
                <p className="mb-4">First time setup required.</p>

                <button
                  disabled
                  className="px-4 py-2  text-white rounded glowing-button"
                  onClick={async () => {
                    if (!user) return;

                    const userRef = doc(db, "users", user.uid);

                    // Set meta initialized
                    await setDoc(userRef, {
                      strengthArchiveSettings: {
                        isStrengthArchiveActive: true,
                        currentSplit: "None",
                        activeSession: false,
                        totalWorkouts: 0,
                        totalPRs: 0,
                        liftIndex: {
                          push: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          pull: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          legs: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          upper: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          lower: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          fullbody: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          chest: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          back: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          brolegs: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          shoulders: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                          arms: {
                            profile1: {
                              name: "Create a Profile"
                            },
                            profile2: {
                              name: "Create a Profile"
                            },
                            profile3: {
                              name: "Create a Profile"
                            },
                          },
                        },
                      },
                    }, { merge: true });
                    window.location.reload();
                  }}

                >
                  Development In Progress..
                </button>

              </>
            ) : (
              <>

                <h2 className="text-2xl font-bold mb-4">Access Restricted..</h2>
                <p className="mb-4">The Strength Archive is your personal vault of power — a place to log your lifts,
                  track your progress, and unlock your true potential over time. Right now, the system is offline,
                  waiting for activation. When you&apos;re ready to record every rep, hit personal records, and watch
                  your strength evolve day by day, power up this feature and take control of your training like never before.</p>

                <Link href="/unlock">
                  <div className="text-center p-3 text-lg hover:bg-indigo-300/50 glowing-button">More Info</div>
                </Link>

              </>
            )}


          </div>

        </>
      ) : (
        <>

          <div className=" w-full rounded-xl ">
            <AnimatePresence mode="wait">

              {selectedSector === "newsession" && (
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

              {selectedSector === "profiles" && (
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


              {selectedSector === "history" && (
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

                  <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                    <div className="p-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                      <div className="place-self-center text-2xl font-semibold pulse-glow">View Past Workouts</div>
                    </div>

                    <div className="text-white text-md text-center p-3">
                      Soon youll be able to view past workouts — a detailed history of your training sessions.
                      This lets you track progress over time, review personal records, and reflect on your
                      performance patterns to help optimize your next session.
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>


          <div className="w-full  fixed bottom-16 left-0">
            <div className="grid grid-cols-3 gap-1 w-full rounded-xl">
              <button
                onClick={() => handleSectorClick("history")}
                className={`px-5 w-full text-md rounded-xl shadow ${selectedSector === "history" ? "bg-indigo-300/50" : "glowing-button"}`}>
                History
              </button>
              <button
                onClick={() => handleSectorClick("newsession")}
                className={`w-full text-md rounded-xl shadow ${selectedSector === "newsession" ? "bg-indigo-300/50" : "glowing-button"}`}>
                CoreStack
              </button>
              <button
                onClick={() => handleSectorClick("profiles")}
                className={`px-5 w-full text-md rounded-xl shadow ${selectedSector === "profiles" ? "bg-indigo-300/50" : "glowing-button"}`}>
                Lift Index
              </button>
            </div>
          </div>


        </>
      )
      }
    </>
  );
}
