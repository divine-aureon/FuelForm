'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFuelSync from "@/lib/hooks/useFuelSync";
import { auth, db, } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateFinalizedFuel } from "@/lib/fuelCalculatorCore";
import useFuelFormData from "@/lib/hooks/useFuelFormData";
import useFuelUnits from "@/lib/hooks/useFuelUnits";
import { Listbox } from '@headlessui/react'

const intensityOptions = ["None", "Light", "Moderate", "High"]

export default function DuskSyncPage() {
  const router = useRouter();
  const sync = useFuelSync();
  const { profile } = useFuelFormData();

  const [steps, setSteps] = useState(sync.steps?.toString() || "");
  const [exerciseMinutes, setExerciseMinutes] = useState(sync.exerciseMinutes?.toString() || "");
  const [intensity, setIntensity] = useState(sync.exerciseIntensity || "low");
  const [status, setStatus] = useState("");
  const weight_lbs = sync.weight_lbs;

  const lastSteps = sync.steps;
  const lastExerciseMinutes = sync.exerciseMinutes;

  // 📅 Generate today's date string
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser!.uid;
      const syncRef = collection(db, "users", userId, "syncs");
      const syncDocRef = doc(syncRef, dateString);

      const parsedSteps = Number(steps);
      const parsedExerciseMinutes = Number(exerciseMinutes);
      const parsedExerciseIntensity = intensity;

      const calculated = calculateFinalizedFuel({
        weight_lbs,
        actualSteps: parsedSteps,
        actualExerciseMinutes: parsedExerciseMinutes,
        exerciseIntensity: parsedExerciseIntensity,
      });

      const activeTDEE = `${calculated.tdee} kcal`;

      const activeRecommendedMacros = [
        { name: "Protein", value: `${calculated.macros.proteinMin}–${calculated.macros.proteinMax} g` },
        { name: "Carbohydrates", value: `${calculated.macros.carbsMin}–${calculated.macros.carbsMax} g` },
        { name: "Fats", value: `${calculated.macros.fatsMin}–${calculated.macros.fatsMax} g` },
        { name: "Fiber", value: `${calculated.macros.fiber} g` }

      ];

      await setDoc(syncDocRef, {
        actualSteps: parsedSteps,
        actualExerciseMinutes: parsedExerciseMinutes,
        exerciseIntensity: parsedExerciseIntensity,
        activeRecommendedMacros,
        activeTDEE,
        timestamp: serverTimestamp(),
      },{ merge: true });
      setStatus("Sync complete!");
    } catch (error) {
      console.error("Error Syncing FuelForm", error);
      setStatus("❌ Unable to Sync. Please check your Data.");
    }
  };

  useEffect(() => {
    if (status === "Sync complete!") {
      const timeout = setTimeout(() => {
        router.push("/aegis/loadingpages/calculating");
      }, 500); // optional delay (1 second)

      return () => clearTimeout(timeout);
    }
  }, [status, router]);



  return (
    <>

      <main className="relative min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat bg-black text-white overflow-hidden pb-16">
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="relative z-10 min-h-screen text-white flex flex-col items-center items-center px-6 pt-5">
          <div className="w-full max-w-md bg-white/20 rounded-xl p-6 shadow-lg">
            <h1 className="text-2xl text-center font-bold mb-6 pulse-glow">Initiate DuskSync Protocol</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
              <p className="text-white font-semibold mb-1">Steps</p>
              <input
                type="number"
                placeholder={lastSteps?.toString()}
                className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 border-none focus:outline-none appearance-none"
                onChange={(e) => setSteps(e.target.value)}
              />
              <p className="text-white font-semibold mb-1">Exercise Minutes</p>

              <input
                type="number"
                placeholder={lastExerciseMinutes?.toString()}
                className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 border-none focus:outline-none appearance-none"
                onChange={(e) => setExerciseMinutes(e.target.value)}
              />
              <p className="text-white font-semibold mb-1">Exercise Intensity</p>

              <Listbox value={intensity} onChange={setIntensity}>
                <div className="relative">
                  <Listbox.Button className="w-full p-3 mb-4 rounded bg-white/10 text-white">
                    {intensity}
                  </Listbox.Button>
                  <Listbox.Options className="absolute bottom-full mb-2 w-full bg-gray-800 backdrop-blur-md text-white rounded shadow-lg z-10 border-none">
                    {intensityOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className="cursor-pointer px-4 py-2 hover:bg-white/20"
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>

              <button
                type="submit"
                className="bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
              >
                Sync Now!
              </button>
            </form>

            {status && <p className="mt-6 text-green-400 text-center">{status}</p>}
            <p className="mg-1">&nbsp;</p>

          </div>
        </div>
      </main>
    </>

  );

}