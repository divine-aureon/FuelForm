"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import ScrollLoad from "@/Backgrounds/ScrollLoad";
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import { Sun, Moon, Lock, Sprout, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";
import RecentWorkoutsModal from "../../OverViewComponents/FitnessTracker/RecentWorkoutsModal"
import { UserProfile, WorkoutSessionData, SetEntry, MovementEntry } from "@/app/Global/BodySyncManifest";





export default function RepSync() {

  const userProfileSTORE = getGlobalDataState().userProfileSTORE;
  const userProfile = userProfileSTORE
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

  //QUARTER STRING
  const quarter = Math.floor((parseInt(mm) - 1) / 3) + 1;
  const quarterString = `Q${quarter}-${yyyy}`;

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
    const newSession: WorkoutSessionData = {
      movements: [],
    };

    movementNames.forEach((movementName) => {
      newSession.movements.push({
        name: movementName,
        sets: [
          {
            setId: "set1",
            reps: 0,
            liftWeight_lbs: 0,
            liftWeight_kg: 0,
            locked: false,
          },
        ],
      });
    });

    setWorkoutSessionData(newSession);
  };

  useEffect(() => {
    if (
      TodaysWorkout?.length > 0 &&
      workoutSessionData.movements.length === 0
    ) {
      initializeWorkoutSession(TodaysWorkout);
    }
  }, [TodaysWorkout]);


  TodaysWorkout.forEach((movementName) => {
    const movementData = workoutSessionData.movements.find(
      (m: MovementEntry) => m.name === movementName
    );

    if (!movementData) {
      console.log("Not found:", movementName);
      return;
    }

    // Use movementData.sets...
  });

  const handleAddSet = (movementName: string) => {
    setWorkoutSessionData((prev) => {
      const updated = { ...prev };
      const movement = updated.movements.find((m) => m.name === movementName);
      if (!movement) return prev;

      //const nextSetNumber = movement.sets.length + 1;
      const nextSetNumber = movement.sets.filter((s) => !s.isDropset).length + 1;

      const newSetId = `set${nextSetNumber}`;

      movement.sets.push({
        setId: newSetId,
        reps: 0,
        liftWeight_lbs: 0,
        liftWeight_kg: 0,
        locked: false,
      });

      return updated;
    });
  };
  const addDropSetToSet = (movementName: string, parentSetId: string) => {
    setWorkoutSessionData((prev) => {
      const updated = { ...prev };
      const movement = updated.movements.find((m) => m.name === movementName);
      if (!movement) return prev;

      // Only count main sets for parent ID
      const mainSets = movement.sets.filter((s) => !s.isDropset);
      const lastMainSet = mainSets[mainSets.length - 1];
      if (!lastMainSet) return prev;

      const dropCount = movement.sets.filter(
        (s) => s.isDropset && s.parentSetId === parentSetId
      ).length;

      const newDropId = `${parentSetId}_dropset${dropCount + 1}`;

      movement.sets.push({
        setId: newDropId,
        isDropset: true,
        parentSetId,
        reps: 0,
        liftWeight_lbs: 0,
        liftWeight_kg: 0,
        locked: false,
      });

      return updated;
    });
  };


  const [showModal, setShowModal] = useState(false);


  return (
    <div>

      <ScrollLoad />
      <RecentWorkoutsModal isWorkoutsOpen={showModal} onWorkoutsClose={() => setShowModal(false)} />
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
          const movementData = workoutSessionData.movements.find(
            (m: MovementEntry) => m.name === movementName
          );

          if (!movementData) return null;

          const lastSet = movementData.sets.filter((s: SetEntry) => !s.isDropset).at(-1);
          const lastSetId = lastSet?.setId ?? "";


          return (
            <div key={index} className="text-xl bg-white/30 rounded-xl p-4 mb-2">
              {movementName}
              <div className="bg-white/30 p-1 mt-1 rounded-xl"></div>


              {/* 🔽 Your custom buttons, styling, inputs, dropdowns go here */}
              {/* They will now live inside this return block as expected */}



              {movementData.sets.map((set: SetEntry, index: number) => {
                const reps = set.reps ?? "";
                const liftWeight_lbs = set.liftWeight_lbs ?? "";
                const liftWeight_kg = set.liftWeight_kg ?? "";
                const locked = set.locked ?? false;

                if (!set.isDropset) {
                  return (
                    <>
                      <div className="grid grid-cols-[4fr_1fr] gap-4">
                        <div className="grid grid-cols-2 gap-4 mt-2">
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
                                  setWorkoutSessionData((prev) => {
                                    const updated = { ...prev };
                                    const movement = updated.movements.find((m) => m.name === movementName);
                                    if (!movement) return prev;
                                    const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                    if (!targetSet) return prev;

                                    targetSet.liftWeight_lbs = preferredWeightUnit === "lbs" ? value : value * 2.2;
                                    targetSet.liftWeight_kg = preferredWeightUnit === "kg" ? value : value * 0.45;
                                    return updated;
                                  });
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
                                  setWorkoutSessionData((prev) => {
                                    const updated = { ...prev };
                                    const movement = updated.movements.find((m) => m.name === movementName);
                                    if (!movement) return prev;
                                    const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                    if (!targetSet) return prev;

                                    targetSet.reps = value;
                                    return updated;
                                  });
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
                              setWorkoutSessionData((prev) => {
                                const updated = { ...prev };
                                const movement = updated.movements.find((m) => m.name === movementName);
                                if (!movement) return prev;
                                const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                if (!targetSet) return prev;

                                targetSet.liftWeight_lbs = Number(liftWeight_lbs);
                                targetSet.liftWeight_kg = Number(liftWeight_kg);
                                targetSet.reps = Number(reps);
                                targetSet.locked = !locked;
                                return updated;
                              });
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
                } else {

                  return (

                    <div key={set.setId} className="mt-2 p-2 bg-white/10 rounded-lg">
                      <p className="text-sm text-indigo-300 font-semibold mb-1">
                        {set.setId.toUpperCase()}
                      </p>

                      <div className="grid grid-cols-[4fr_1fr] gap-4">
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Weight ({preferredWeightUnit === "kg" ? "kg" : "lbs"})
                              <input
                                disabled={set.locked}
                                type="number"
                                step="0.1"
                                min="0"
                                value={
                                  preferredWeightUnit === "lbs"
                                    ? set.liftWeight_lbs ?? ""
                                    : set.liftWeight_kg ?? ""
                                }
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  setWorkoutSessionData((prev) => {
                                    const updated = { ...prev };
                                    const movement = updated.movements.find((m) => m.name === movementName);
                                    if (!movement) return prev;
                                    const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                    if (!targetSet) return prev;

                                    targetSet.liftWeight_lbs = preferredWeightUnit === "lbs" ? value : value * 2.2;
                                    targetSet.liftWeight_kg = preferredWeightUnit === "kg" ? value : value * 0.45;

                                    return updated;
                                  });
                                }}
                                placeholder="Weight"
                                className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                              />
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-white font-semibold mb-1">
                              Reps
                              <input
                                disabled={set.locked}
                                type="number"
                                min="0"
                                value={set.reps ?? ""}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setWorkoutSessionData((prev) => {
                                    const updated = { ...prev };
                                    const movement = updated.movements.find((m) => m.name === movementName);
                                    if (!movement) return prev;
                                    const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                    if (!targetSet) return prev;

                                    targetSet.reps = value;
                                    return updated;
                                  });
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
                              setWorkoutSessionData((prev) => {
                                const updated = { ...prev };
                                const movement = updated.movements.find((m) => m.name === movementName);
                                if (!movement) return prev;
                                const targetSet = movement.sets.find((s) => s.setId === set.setId);
                                if (!targetSet) return prev;

                                targetSet.locked = !targetSet.locked;
                                return updated;
                              });
                            }}
                            className={`flex rounded-2xl p-3 justify-center items-center ${set.locked
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
                    <button onClick={() => addDropSetToSet(movementName, lastSetId)}
                      className="w-full mt-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 w-fit">
                      + Add Drop Set
                    </button>

                    <button onClick={() => handleAddSet(movementData.name)}
                      className="w-full mt-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 w-fit">
                      + Add Set
                    </button>
                  </>
                </div>
              </div>
            </div >
          );
        })}

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



                const quarterDocRef = doc(db, "users", user.uid, "fitness", quarterString);


                const cleanedWorkout: WorkoutSessionData = {
                  movements: workoutSessionData.movements.map((movement: MovementEntry) => ({
                    name: movement.name,
                    sets: movement.sets.filter((set: SetEntry) => set.locked),
                  })).filter((m: MovementEntry) => m.sets.length > 0)
                };

                await setDoc(
                  quarterDocRef,
                  {
                    [dateString]: {
                      id: dateString,
                      quarterId: quarterString,

                      completed: true,
                      fitnessSync: true,
                      sessionData: cleanedWorkout,
                      EndTime: serverTimestamp(),
                    }
                  },
                  { merge: true }
                );

                const setLatestFitnessSyncSTORE = getGlobalDataState().setLatestFitnessSyncSTORE;
                const latest = getGlobalDataState().latestFitnessSyncSTORE;

                setLatestFitnessSyncSTORE({
                  ...latest,
                  id: dateString,
                  quarterId: quarterString,
                  completed: true,
                  fitnessSync: true,
                  sessionData: cleanedWorkout,
                  EndTime: serverTimestamp(),
                });

                const setFitnessHistorySTORE = getGlobalDataState().setFitnessHistorySTORE;
                const fitnessHistorySTORE = getGlobalDataState().fitnessHistorySTORE;
                const latestHistory = fitnessHistorySTORE?.[dateString];
                const { [dateString as keyof typeof fitnessHistorySTORE]: _, ...restOfHistory } = fitnessHistorySTORE;

                setFitnessHistorySTORE({
                  ...restOfHistory,
                  [dateString as keyof typeof fitnessHistorySTORE]: {
                    ...latestHistory,
                    id: dateString,
                    quarterId: quarterString,
                    completed: true,
                    fitnessSync: true,
                    sessionData: cleanedWorkout,
                    EndTime: serverTimestamp(),
                  }
                });

                window.location.reload();
                setSelectedPage("BodySync");
                setActiveSessionStatus(false);
                setWorkoutSessionData({ movements: [] });
              }}
            >
              Submit RepSync
            </button>
          </div>


        </div>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-0 w-full max-w-md text-center text-lg rounded-xl glowing-purple-button text-white"
        >Reference History
        </button>
      </div>
    </div>
  );
}

