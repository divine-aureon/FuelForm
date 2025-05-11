"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import { AddSplitModal } from "@/components/Modals/StrengthArchiveModals/AddSplitModal"; // You can create this next
import AddSplitComponent from "@/components/Modals/StrengthArchiveModals/AddSplitComponent"; // You can create this next
import useCoreData from "@/lib/hooks/CoreData";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';

import NavLoad_v2 from "@/components/Loading/NavLoad_v2";
import NavLoad from "@/components/Loading/NavLoad";

import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { motion, AnimatePresence } from "framer-motion";

import { UnlockModal } from "@/components/Modals/UnlockModal"
import UnlockComponent from "@/components/Modals/UnlockComponent"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PageFadeWrapper from "@/components/Loading/PageFadeWrapper"
import UpgradeButton from "@/components/UpgradeButton"

import Link from 'next/link';

export default function StrengthArchive() {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


  //inialization steps

  const { user } = useAuth();

  const { profile } = useCoreData();
  const isPaidUser = profile?.isPaid ?? null;
  const { settings } = useCoreData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);



  const [activeSplit, setActiveSplit] = useState(null);
  const [allSplits, setAllSplits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSplitName, setNewSplitName] = useState("Full Body");

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

  //check split steps

  type Split = {
    id: string;
    name: string;
  };

  const [splits, setSplits] = useState<Split[]>([]);
  const [isAddSplitModalOpen, setAddSplitModalOpen] = useState(false);

  useEffect(() => {
    const fetchSplits = async () => {
      const uid = user?.uid;
      if (!uid) return;

      const splitsRef = collection(db, "users", uid, "strength", "stats", "storedSplits");
      const splitsSnap = await getDocs(splitsRef);

      const splits: Split[] = splitsSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Split, "id">), // tells TypeScript "trust me, this has a `name`"
      }));

      setSplits(splits);
    };

    fetchSplits();
  }, []);


  { /SELECTED VIEW BAR/ }

  const [selectedSector, setSelectedSector] = useState<"newsession" | "profiles" | "history">("newsession");

  const handleSectorClick = (sector: "newsession" | "profiles" | "history") => {
    setSelectedSector(sector); // No toggling, just always set the new one
  };


  { /Workout selector view pages NEXT BACK BUTTONS/ }

  const [selectedSetup, setSelectedSetup] = useState<"splits" | "bodygroup" | "movements">("splits");


  const handleSetupClick = (page: "splits" | "bodygroup" | "movements") => {
    setSelectedSetup(page); // No toggling, just always set the new one
  };



  if (typeof isPaidUser !== 'boolean') return;

  // Main Strength Archive UI
  return (
    <>
      <NavLoad />
      <PageFadeWrapper>

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

        {!profile?.isStrengthActive ? (
          <>

            <div className="p-4 text-center backdrop-blur-sm bg-white/30 rounded-lg">


              {isPaidUser ? (
                <>

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
                        isStrengthActive: true,
                        fitnessSettings: {
                          totalWorkouts: 0,
                          totalPR: 0,
                        },
                      }, { merge: true });

                      const strengthRef = collection(db, "users", user.uid, "strength");
                      const strengthDocRef = doc(strengthRef, dateString);

                      // Set meta initialized
                      await setDoc(strengthDocRef, {
                        currentSplitName: "",
                        lastWorkout: "",
                        todaysWorkout: "",
                        movements: [],
                        prCount: 0,
                      }, { merge: true });
                      window.location.reload();
                    }}

                  >
                    Coming Soon!
                  </button>

                </>
              ) : (
                <>

                  <h2 className="text-2xl font-bold mb-4">Access Restricted..</h2>
                  <p className="mb-4">The Strength Archive is your personal vault of power — a place to log your lifts,
                    track your progress, and unlock your true potential over time. Right now, the system is offline,
                    waiting for activation. When youre ready to record every rep, hit personal records, and watch
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
                    transition={{ duration: 0.4 }}
                  >


                    <div className=" w-full rounded-xl ">
                      <AnimatePresence mode="wait">

                        {selectedSetup === "splits" && (
                          <motion.div
                            key="splits"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >

                            <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                              <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                                <div className="place-self-center pb-1 text-3xl font-semibold pulse-glow">Define Your Split</div>
                                <div className="bg-white/40 rounded-xl p-1 mx-12 pb-1"></div>
                                <div className="pb-1 pt-2 text-white text-md text-center">First Stage</div>
                              </div>

                              <div className="text-white mb-2 justify-center flex">

                                <button className="w-full h-16 glowing-green-button rounded-xl">
                                  Current Active Split is Push-Pull-Legs
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2 left-0 ">
                                <div className="">

                                  <button className=" mb-2 w-full glowing-button rounded-xl">
                                    Push-Pull-Legs
                                  </button>

                                  <button className=" w-full glowing-button rounded-xl">
                                    Upper-Lower
                                  </button>

                                </div>
                                <div className="" >

                                  <button className=" mb-2 w-full glowing-button rounded-xl">
                                    Full-Body
                                  </button>

                                  <button className=" w-full glowing-button rounded-xl">
                                    Bro-Split
                                  </button>

                                </div>
                              </div>

                              <button
                                className="mt-4 mb-2 bg-indigo-500 text-white glowing-button px-4 py-2 rounded-lg w-full">
                                Add Custom Split (coming soon)
                              </button>

                            </div>
                          </motion.div>
                        )}
                        {selectedSetup === "bodygroup" && (
                          <motion.div
                            key="bodygroup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >

                            <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                              <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                                <div className="place-self-center pb-1 text-3xl font-semibold pulse-glow">Define Your BodyGroup</div>
                                <div className="bg-white/40 rounded-xl p-1 mx-12 pb-1"></div>
                                <div className="pb-1 pt-2 text-white text-md text-center">Second Stage</div>
                              </div>

                              <div className="text-white mb-2 justify-center flex">

                                <button className="w-full h-16 glowing-green-button rounded-xl">
                                  Last Session: Pull<br /> May 10, 2025 6:52pm
                                </button>
                              </div>

                              <div className="grid grid-cols gap-2 left-0 ">

                                <button className=" mb-2 w-full glowing-button rounded-xl">
                                  Push
                                </button>

                                <button className="mb-2 w-full glowing-button rounded-xl">
                                  Pull
                                </button>

                                <button className=" mb-2 w-full glowing-button rounded-xl">
                                  Legs
                                </button>


                              </div>
                            </div>
                          </motion.div>
                        )}


                        {selectedSetup === "movements" && (
                          <motion.div
                            key="movements"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >



                            <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                              <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                                <div className="place-self-center pb-1 text-3xl font-semibold pulse-glow">Define Your Movements</div>
                                <div className="bg-white/40 rounded-xl p-1 mx-12 pb-1"></div>
                                <div className="pb-1 pt-2 text-white text-md text-center">Final Stage</div>
                              </div>

                              <div className="text-white mb-2 justify-center flex">

                                <button className="w-full h-16 glowing-green-button rounded-xl">
                                  Movement Profile "Pull1" Selected
                                </button>
                              </div>

                              <div className="grid grid-cols gap-2 left-0 ">

                                <button className=" w-full glowing-button rounded-xl">
                                  Select Movement Profile
                                </button>


                              </div>

                              <div className="flex px-12 pt-3 justify-center">
                                <button className="mb-2 text-3xl glowing-button rounded-xl">
                                  Initiate Strength Protocol
                                </button>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="w-full fixed bottom-28 left-0 ">
                        <div className="grid grid-cols-3 gap-1 w-full rounded-xl">
                          <button
                            onClick={() => handleSetupClick("splits")}
                            className={`px-5 w-full text-md rounded-xl shadow ${selectedSetup === "splits" ? "bg-indigo-300/50" : "glowing-green-button"}`}>
                            Splits
                          </button>
                          <button
                            onClick={() => handleSetupClick("bodygroup")}
                            className={`w-full text-md rounded-xl shadow ${selectedSetup === "bodygroup" ? "bg-indigo-300/50" : "glowing-green-button"}`}>
                            BodyGroup
                          </button>
                          <button
                            onClick={() => handleSetupClick("movements")}
                            className={`w-full text-md rounded-xl shadow ${selectedSetup === "movements" ? "bg-indigo-300/50" : "glowing-green-button"}`}>
                            Movements
                          </button>
                        </div>
                      </div>


                    </div>

                  </motion.div>
                )}

                {selectedSector === "profiles" && (
                  <motion.div
                    key="profiles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >

                    <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">
                      <div className="p-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">
                        <div className="place-self-center text-center text-2xl font-semibold pulse-glow">Manage Workout Profiles</div>
                      </div>

                      <div className="text-white text-md text-center p-3">
                        Youll soon be able to manage your Workout Profiles — saved templates of your training splits,
                        movements, and preferred set/rep structures. Whether you follow Push/Pull/Legs, Upper/Lower,
                        or your own custom routine, profiles make it easy to start new sessions with everything preloaded and ready to go.
                      </div>
                      <button className=" mb-2 w-full glowing-button rounded-xl">
                        Manage Movement Profiles modal
                      </button>

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
                  New Session
                </button>
                <button
                  onClick={() => handleSectorClick("profiles")}
                  className={`px-5 w-full text-md rounded-xl shadow ${selectedSector === "profiles" ? "bg-indigo-300/50" : "glowing-button"}`}>
                  Profiles
                </button>
              </div>
            </div>


          </>
        )
        }

        <footer className="pt-4 pb-2">
          {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
        </footer>
      </PageFadeWrapper>
    </>
  );
}
