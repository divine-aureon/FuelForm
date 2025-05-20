"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import useCoreData from "@/lib/hooks/CoreData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ScrollLoad from "@/Backgrounds/ScrollLoad";
import { loadStripe } from '@stripe/stripe-js';
import { CircleAlert, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { Sun, Moon, Lock, Sprout, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";



export default function RepSync() {

  const router = useRouter();
  const userProfile = useGlobalData((s) => s.userProfile);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
  const activeSessionStatus = useGlobalData((s) => s.activeSessionStatus);
  const setActiveSessionStatus = useGlobalData((s) => s.setActiveSessionStatus);
  const liftIndex = useGlobalData((s) => s.liftIndex);

  const temporaryFitnessSync = useGlobalData((s) => s.temporaryFitnessSync);


  const selectedProfile = temporaryFitnessSync?.profileSlot
  const selectedBodygroup = temporaryFitnessSync?.bodygroup


  const setWorkoutSessionData = useGlobalData((s) => s.setWorkoutSessionData); // read live

  const workoutSessionData: Record<string, any> = useGlobalData((s) => s.workoutSessionData);


  const TodaysWorkout: string[] = liftIndex?.[selectedBodygroup]?.[selectedProfile]?.movements ?? [];






  const [liftWeight_lbs, setLiftWeightLbs] = useState("");
  const [liftWeight_kg, setLiftWeightKg] = useState("");
  const [set1, setSet1] = useState("");
  const [locked, setLocked] = useState(false);


  const preferredWeightUnit = userProfile?.preferredWeightUnit ?? "lbs";

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input === "") {
      setLiftWeightLbs("");
      setLiftWeightKg("");
      return;
    }

    const parsed = parseFloat(input);
    if (isNaN(parsed)) return; // Guard against nonsense

    if (preferredWeightUnit === "lbs") {
      setLiftWeightLbs(parsed.toString());
      setLiftWeightKg((parsed * 0.45).toString());
    } else {
      setLiftWeightKg(parsed.toString());
      setLiftWeightLbs((parsed * 2.20).toString());
    }
  };





  const fitnessSettings = userProfile?.fitnessSettings;
  const currentSplit = fitnessSettings?.currentSplit;
  const bodygroup = fitnessSettings?.lastBodygroup;

  //inialization steps

  const { user } = useAuth();

  //DATA INPUT

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;


  //check split steps

  type Split = {
    id: string;
    name: string;
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

  const initializeWorkoutSession = (movementNames: string[]) => {
    const newSession: WorkoutSessionData = {};

    movementNames.forEach((movementName) => {
      newSession[movementName] = {
        set1: {
          reps: undefined,
          liftWeight_lbs: undefined,
          liftWeight_kg: undefined,
          locked: false,
        },
      };
    });

    setWorkoutSessionData(newSession);
  };


  useEffect(() => {
    if (
      TodaysWorkout?.length > 0 &&
      Object.keys(workoutSessionData).length === 0
    ) {
      initializeWorkoutSession(TodaysWorkout);
    }
  }, [TodaysWorkout]);

  const [movementLogs, setMovementLogs] = useState<MovementLog[]>([]);





  //setWorkoutSessionData(movementLogs);

  type SetEntry = {
    liftWeight_lbs: number | undefined;
    liftWeight_kg: number | undefined;
    reps: number | undefined;
    locked: boolean;
    dropset: boolean;
    dropsets: {
      [dropKey: string]: {
        liftWeight_lbs: number | undefined;
        liftWeight_kg: number | undefined;
        reps: number | undefined;
        locked: boolean;
      };
    };
  };

  type DropSetEntry = SetEntry["dropsets"][string];

  type MovementLog = {
    name: string;
    setRecords: {
      [setKey: number]: {
        liftWeight_lbs: number;
        liftWeight_kg: number;
        reps: number;
        locked: boolean;
        dropset: boolean;
        dropsets: {
          [dropKey: number]: {
            liftWeight_lbs: number;
            liftWeight_kg: number;
            reps: number;
            locked: boolean;
          };
        };
      };
    };
  };

  type WorkoutSessionData = Record<
    string,
    Record<
      string,
      {
        reps?: number;
        liftWeight_lbs?: number;
        liftWeight_kg?: number;
        locked?: boolean;
      }
    >
  >;

  const unifiedSessionMap: Record<
    string, // movement name
    {
      type: "set" | "drop";
      setKey: string;
      dropKey?: string;
      data: SetEntry | SetEntry["dropsets"][string];
    }[]
  > = {};

  TodaysWorkout.forEach((movementName) => {
    const movementData = workoutSessionData?.[movementName] as Record<string, SetEntry>;
    if (!movementData) return;

    const unifiedList: {
      type: "set" | "drop";
      setKey: string;
      dropKey?: string;
      data: SetEntry | SetEntry["dropsets"][string];
    }[] = [];

    Object.entries(movementData).forEach(([setKey, setInfo]) => {
      unifiedList.push({
        type: "set",
        setKey,
        data: setInfo,
      });

      // Only process dropsets if they exist and are objects
      if (setInfo.dropsets && typeof setInfo.dropsets === "object") {
        Object.entries(setInfo.dropsets).forEach(([dropKey, dropInfo]) => {
          unifiedList.push({
            type: "drop",
            setKey,
            dropKey,
            data: dropInfo,
          });
        });
      }
    });

    unifiedSessionMap[movementName] = unifiedList;
  });


  const [addSet, setAddSet] = useState<any[]>([]);

  const handleChange = (value: string, index: number) => {
    const updated = [...addSet];
    updated[index] = value;
    setAddSet(updated);
  };


  const addSetToMovement = (movementName: string) => {
    setWorkoutSessionData((prev) => {
      const existing = prev[movementName] ?? {};
      const currentSetKeys = Object.keys(existing).filter((key) =>
        key.startsWith("set")
      );

      const nextSetNumber = currentSetKeys.length + 1;
      const newSetKey = `set${nextSetNumber}`;

      return {
        ...prev,
        [movementName]: {
          ...existing,
          [newSetKey]: {
            reps: undefined,
            liftWeight_lbs: undefined,
            liftWeight_kg: undefined,
            locked: false,
            dropset: false,
            dropsets: {}, // ← important!
          },
        },
      };
    });
  };

  const addDropSetToSet = (movementName: string, setKey: string) => {
    setWorkoutSessionData((prev) => {
      const currentSet = prev[movementName]?.[setKey] ?? {};
      const currentDropSets = currentSet.dropsets ?? {};
      const nextDropKey = `drop${Object.keys(currentDropSets).length + 1}`;

      return {
        ...prev,
        [movementName]: {
          ...prev[movementName],
          [setKey]: {
            ...currentSet,
            dropset: true,
            dropsets: {
              ...currentDropSets,
              [nextDropKey]: {
                reps: undefined,
                liftWeight_lbs: undefined,
                liftWeight_kg: undefined,
                locked: false,
              },
            },
          },
        },
      };
    });
  };

  return (
    <>
      <ScrollLoad />
      <div>
        <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex text-5xl pulse-glow mb-2 items-center gap-2">RepSync</div>
            <h2 className="text-sm font-bold text-white">
              Lets Begin.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 mb-2">

        <div className="text-ls font-bold text-white">
          Instructions:
        </div>
        <div className="text-sm font-bold pb-4 px-4 text-white">
          Input the Weight For each set, as well as how many reps you completed. After you have completed your set. Lock-In your set using the Lock Button.
        </div>
      </div>

      <div className="flex flex-col backdrop-blur-sm">

        {TodaysWorkout.map((movementName, index) => {

          const movementData = workoutSessionData?.[movementName] ?? {};


          const currentSetKeys = Object.keys(workoutSessionData[movementName] ?? {}).filter((key) =>
            key.startsWith("set")
          );

          const lastSetKey = currentSetKeys[currentSetKeys.length - 1];


          return (
            <div key={index} className="text-xl bg-white/30 rounded-xl p-4 mb-2 ">

              {movementName}
              <div className="bg-white/30 p-1 mt-1 rounded-xl"></div>


              {unifiedSessionMap[movementName]?.map((item, index) => {

                if (item.type === "set") {

                  const info = item.data as SetEntry;

                  const reps = info.reps ?? "";
                  const liftWeight_lbs = info.liftWeight_lbs ?? "";
                  const liftWeight_kg = info.liftWeight_kg ?? "";
                  const locked = info.locked ?? false;

                  return (
                    <>
                      <div className="grid grid-cols-[4fr_1fr] gap-4">
                        <div className="grid grid-cols-2 gap-4 mt-2 ">
                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Weight ({preferredWeightUnit === "kg" ? "kg" : "lbs"})
                              <input
                                disabled={locked}
                                type="number"
                                step="0.1"
                                min="0"
                                value={
                                  preferredWeightUnit === "lbs"
                                    ? liftWeight_lbs === undefined ? "" : liftWeight_lbs
                                    : liftWeight_kg === undefined ? "" : liftWeight_kg
                                }
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  setWorkoutSessionData((prev) => ({
                                    ...prev,
                                    [movementName]: {
                                      ...prev[movementName],
                                      [item.setKey]: {
                                        ...prev[movementName]?.[item.setKey],
                                        liftWeight_lbs: preferredWeightUnit === "lbs" ? Number(value) : Number(value) * 2.2,
                                        liftWeight_kg: preferredWeightUnit === "kg" ? Number(value) : Number(value) * 0.45,
                                      },
                                    },
                                  }));
                                }}
                                placeholder="Weight"
                                className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                              />
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Set
                              <input
                                disabled={locked}
                                type="number"
                                min="0"
                                value={reps === undefined ? "" : reps}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setWorkoutSessionData((prev) => ({
                                    ...prev,
                                    [movementName]: {
                                      ...prev[movementName],
                                      [item.setKey]: {
                                        ...prev[movementName]?.[item.setKey],
                                        reps: value,
                                      },
                                    },
                                  }));
                                }}
                                placeholder="Reps"
                                className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                              />
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              setWorkoutSessionData((prev) => ({
                                ...prev,
                                [movementName]: {
                                  ...prev[movementName],
                                  [item.setKey]: {
                                    ...prev[movementName]?.[item.setKey],
                                    liftWeight_lbs: Number(liftWeight_lbs),
                                    liftWeight_kg: Number(liftWeight_kg),
                                    reps: Number(reps),
                                    locked: !locked,
                                  },
                                },
                              }));
                            }}
                            className={`flex rounded-2xl p-3 justify-center items-center ${locked
                              ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                              : "glowing-button"
                              }`}
                          >
                            <Lock size={24} />
                          </button>
                        </div>

                      </div>
                    </>
                  );
                }
                else if (item.type === "drop") {

                  const dropInfo = item.data as DropSetEntry;

                  const dropReps = dropInfo.reps ?? "";
                  const dropLbs = dropInfo.liftWeight_lbs ?? "";
                  const dropKg = dropInfo.liftWeight_kg ?? "";
                  const dropLocked = dropInfo.locked ?? false;

                  return (

                    <div key={item.dropKey!} className="mt-2 p-2 bg-white/10 rounded-lg">
                      <p className="text-sm text-indigo-300 font-semibold mb-1">
                        {item.dropKey!.toUpperCase()}
                      </p>
                      {/* reps & weight inputs just like the main ones */}


                      <div className="grid grid-cols-[4fr_1fr] gap-4">
                        <div className="grid grid-cols-2 gap-4 mt-2 ">
                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Weight ({preferredWeightUnit === "kg" ? "kg" : "lbs"})
                              <input
                                disabled={dropLocked}
                                type="number"
                                step="0.1"
                                min="0"
                                value={
                                  preferredWeightUnit === "lbs"
                                    ? dropInfo.liftWeight_lbs === undefined ? "" : dropLbs
                                    : dropInfo.liftWeight_kg === undefined ? "" : dropKg
                                }
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  setWorkoutSessionData((prev) => ({
                                    ...prev,
                                    [movementName]: {
                                      ...prev[movementName],
                                      [item.setKey]: {
                                        ...prev[movementName]?.[item.setKey],
                                        dropsets: {
                                          ...prev[movementName]?.[item.setKey]?.dropsets,
                                          [item.dropKey!]: {
                                            ...prev[movementName]?.[item.setKey]?.dropsets?.[item.dropKey!],
                                            liftWeight_lbs: preferredWeightUnit === "lbs" ? Number(value) : Number(value) * 2.2,
                                            liftWeight_kg: preferredWeightUnit === "kg" ? Number(value) : Number(value) * 0.45,
                                          },
                                        },
                                      },
                                    },
                                  }));


                                }}
                                placeholder="Weight"
                                className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                              />
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Set
                              <input
                                disabled={dropLocked}
                                type="number"
                                min="0"
                                value={dropReps === undefined ? "" : dropReps}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setWorkoutSessionData((prev) => ({
                                    ...prev,
                                    [movementName]: {
                                      ...prev[movementName],
                                      [item.setKey]: {
                                        ...prev[movementName]?.[item.setKey],
                                        dropsets: {
                                          ...prev[movementName]?.[item.setKey]?.dropsets,
                                          [item.dropKey!]: {
                                            ...prev[movementName]?.[item.setKey]?.dropsets?.[item.dropKey!],
                                            reps: value,
                                          },
                                        },
                                      },
                                    },
                                  }));
                                }}
                                placeholder="Reps"
                                className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                              />
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              setWorkoutSessionData((prev) => ({
                                ...prev,
                                [movementName]: {
                                  ...prev[movementName],
                                  [item.setKey]: {
                                    ...prev[movementName]?.[item.setKey],
                                    dropsets: {
                                      ...prev[movementName]?.[item.setKey]?.dropsets,
                                      [item.dropKey!]: {
                                        ...prev[movementName]?.[item.setKey]?.dropsets?.[item.dropKey!],
                                        liftWeight_lbs: Number(dropLbs),
                                        liftWeight_kg: Number(dropKg),
                                        reps: Number(dropReps),
                                        locked: !dropLocked,
                                      },
                                    },
                                  },
                                },
                              }));
                            }}

                            className={`flex rounded-2xl p-3 justify-center items-center ${dropLocked
                              ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                              : "glowing-button"
                              }`}
                          >
                            <Lock size={24} />
                          </button>
                        </div>

                      </div>


                    </div>
                  );

                }



              })}

              <div className="grid grid-cols-[4fr_1fr] gap-4">
                <div className="grid grid-cols-2 gap-4 mt-2 ">
                  <>
                    <button onClick={() => addDropSetToSet(movementName, lastSetKey)}
                      className="w-full mt-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 w-fit">
                      + Add Drop Set
                    </button>

                    <button
                      onClick={() => addSetToMovement(movementName)}
                      className="w-full mt-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 w-fit"
                    >
                      + Add Set
                    </button>
                  </>
                </div>
              </div>

            </div>

          );
        })}
      </div>




      <div className="bg-white/30 rounded-xl p-4 mb-20">
        <div className="grid grid-cols-[4fr_1fr] gap-4 px-4 pb-4 ">
          <div>
            In order to Sync your workout, please ensure you have locked in all of your sets using the lock function.
          </div>
          <div className="flex bg-white/30 rounded-2xl p-3 justify-center items-center"><Lock size={32} /></div>

        </div>
        <div className="flex px-12 justify-center">
          <button

            className="w-full text-md rounded-xl p-6 shadow transition-all duration-50 glowing-purple-button cursor-pointer"
            onClick={async () => {
              if (!user) return;

              const userRef = doc(db, "users", user.uid);

              // Set meta initialized
              await setDoc(userRef, {
                fitnessSettings: {
                  activeSession: false,
                },
              }, { merge: true });

              const strengthRef = collection(db, "users", user.uid, "fitness");
              const strengthDocRef = doc(strengthRef, dateString);

              const cleanedWorkout: WorkoutSessionData = {};

              Object.entries(workoutSessionData).forEach(([movementName, sets]) => {
                const filteredSets: any = {};

                Object.entries(sets).forEach(([setKey, setData]) => {
                  const typedSetData = setData as SetEntry;
                  if (typedSetData.locked) {
                    filteredSets[setKey] = setData;
                  }
                });

                if (Object.keys(filteredSets).length > 0) {
                  cleanedWorkout[movementName] = filteredSets;
                }
              });



              // Set meta initialized
              await setDoc(strengthDocRef, {
                completed: true,
                fitnessSync: true,
                sessionData: cleanedWorkout,
                EndTime: serverTimestamp(),
              }, { merge: true });

              window.location.reload();
              setSelectedPage("BodySync");
              setActiveSessionStatus(false);
              setWorkoutSessionData({});
            }}
          >
            Submit RepSync
          </button>
        </div>



      </div>
    </>
  );

}
