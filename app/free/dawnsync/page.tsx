'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFuelSync from "@/lib/hooks/useFuelSync";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateProjectedFuel } from "@/lib/fuelCalculatorCore";
import useFuelFormData from "@/lib/hooks/useFuelFormData";
import { Listbox } from '@headlessui/react'


const intensityOptions = ["None", "Light", "Moderate", "High"]

export default function FuelSyncPage() {
  const router = useRouter();
  const sync = useFuelSync();

  const [weight_lbs, setWeight_lbs] = useState(sync.weight_lbs?.toString() || "");
  const [weight_kg, setWeight_kg] = useState(sync.weight_kg?.toString() || "");
  const [steps, setSteps] = useState(sync.steps?.toString() || "");
  const [exerciseMinutes, setExerciseMinutes] = useState(sync.exerciseMinutes?.toString() || "");
  const [intensity, setIntensity] = useState(sync.exerciseIntensity || "low");
  const [status, setStatus] = useState("");

  const { profile } = useFuelFormData();
  const preferredWeightUnit = profile?.preferredWeightUnit ?? "lbs";
  const lastWeightLbs = sync.weight_lbs;
  const lastWeightKg = sync.weight_kg;
  const lastSteps = sync.steps;
  const lastExerciseMinutes = sync.exerciseMinutes;

  const [mood, setMood] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");

  const [weight, setWeight] = useState(
    preferredWeightUnit === "kg"
      ? lastWeightKg?.toString() || ""
      : lastWeightLbs?.toString() || "");

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

      const parsedWeight = parseFloat(weight);

      const weight_lbs = preferredWeightUnit === "kg"
        ? parsedWeight * 2.20462
        : parsedWeight;

      const weight_kg = preferredWeightUnit === "lbs"
        ? parsedWeight * 0.4536
        : parsedWeight;

      const parsedSteps = Number(steps);
      const parsedExerciseMinutes = Number(exerciseMinutes);
      const parsedExerciseIntensity = intensity;

      const calculated = calculateProjectedFuel({
        weight_lbs,
        projectedSteps: parsedSteps,
        projectedExerciseMinutes: parsedExerciseMinutes,
        exerciseIntensity: parsedExerciseIntensity,
      });

      const recommendedMacros = [
        { name: "Estimated TDEE", value: `${calculated.tdee} kcal` },
        { name: "Protein", value: `${calculated.macros.proteinMin}–${calculated.macros.proteinMax} g` },
        { name: "Carbohydrates", value: `${calculated.macros.carbsMin}–${calculated.macros.carbsMax} g` },
        { name: "Fats", value: `${calculated.macros.fatsMin}–${calculated.macros.fatsMax} g` },
        { name: "Fiber", value: `${calculated.macros.fiber} g` }

      ];

      const recommendedVitamins = calculated.vitamins;
      const recommendedMinerals = calculated.minerals;


   

      await setDoc(syncDocRef, {
        weight_lbs: +weight_lbs.toFixed(2),
        weight_kg: +weight_kg.toFixed(2),
        projectedSteps: parsedSteps,
        projectedExerciseMinutes: parsedExerciseMinutes,
        exerciseIntensity: parsedExerciseIntensity,
        recommendedMacros,
        recommendedVitamins,
        recommendedMinerals,
        sleepQuality: sleepQuality || null,
        sleepDuration: sleepDuration || null,
        mood: mood || null,
        actualSteps: 0,
        actualExerciseMinutes: 0,
        timestamp: serverTimestamp(),
      });
      setStatus("Sync complete!");
    } catch (error) {
      console.error("Error Syncing FuelForm", error);
      setStatus("❌ Unable to Sync. Please check your Data.");
    }
  };

  useEffect(() => {
    if (status === "Sync complete!") {
      const timeout = setTimeout(() => {
        router.push("/free/calculating");
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
            <h1 className="text-2xl text-center font-bold mb-6 pulse-glow">Initiate DawnSync Protocol</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
              <p className="text-white font-semibold mb-1">
                Weight - {preferredWeightUnit === "kg" ? "kg" : "lbs"}
                <input
                  type="number"
                  placeholder={
                    preferredWeightUnit === "kg"
                      ? lastWeightKg?.toString() || ""
                      : lastWeightLbs?.toString() || ""
                  }
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 mb-4 rounded bg-white/10 text-white border-none focus:outline-none appearance-none"
                  required
                />
              </p>
              <p className="text-white font-semibold mb-1">
                Mood
                <input
                  type="text"
                  placeholder="Happy, Tired, Focused, etc."
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-3 mb-4 rounded bg-white/10 text-white border-none focus:outline-none appearance-none"
                  required
                />
              </p>
              <p className="text-white font-semibold mb-1">
                Sleep Quality
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="1-10"
                  onChange={(e) => setSleepQuality(e.target.value)}
                  className="w-full p-3 mb-4 rounded bg-white/10 text-white border-none focus:outline-none appearance-none"
                  required
                />
              </p>

              <p className="text-white font-semibold mb-1">
                Sleep Duration (hours)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Hours"
                  onChange={(e) => setSleepDuration(e.target.value)}
                  className="w-full p-3 mb-4 rounded bg-white/10 text-white border-none focus:outline-none appearance-none"
                  required
                />
              </p>
              <button
                type="submit"
                className="bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
              >
                Sync Now!
              </button>
            </form>
          </div>
        </div>
      </main>
    </>

  );

}