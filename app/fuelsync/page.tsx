'use client';

import Link from "next/link";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import useFuelSync from "../hooks/useFuelSync";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateAllNutrition } from "@/lib/processingCore";
import useFuelFormData from "../hooks/useFuelFormData";
import { Listbox } from '@headlessui/react'
import NavPortal from '@/components/NavPortal';


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

const [weight, setWeight] = useState(
  preferredWeightUnit === "kg"
    ? lastWeightKg?.toString() || ""
    : lastWeightLbs?.toString() || "");

  const handleSubmit = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return setStatus("You must be logged in.");

    try {
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
    
      const calculated = calculateAllNutrition({
        weight_lbs,
        steps: parsedSteps,
        exerciseMinutes: parsedExerciseMinutes,
        intensity: parsedExerciseIntensity,
      });
    
      const syncRef = collection(db, "users", userId, "sync");
    
      const recommendedMacros = [
        { name: "Estimated TDEE", value: `${calculated.tdee} kcal` },
        { name: "Protein", value: `${calculated.macros.proteinMin}–${calculated.macros.proteinMax} g` },
        { name: "Carbohydrates", value: `${calculated.macros.carbsMin}–${calculated.macros.carbsMax} g` },
        { name: "Fats", value: `${calculated.macros.fatsMin}–${calculated.macros.fatsMax} g` },
        { name: "Fiber", value: `${calculated.macros.fiber} g` }
      
      ];
    
      const recommendedVitamins = calculated.vitamins;
      const recommendedMinerals = calculated.minerals;
    
await addDoc(syncRef, {
  weight_lbs: +weight_lbs.toFixed(2),
  weight_kg: +weight_kg.toFixed(2),
  steps: parsedSteps,
  exerciseMinutes: parsedExerciseMinutes,
  exerciseIntensity: parsedExerciseIntensity,
  calorieGoal: 0,
  recommendedMacros,
  recommendedVitamins,
  recommendedMinerals,
  timestamp: serverTimestamp(),
});
      setStatus("Sync complete!");
    } catch (error) {
      console.error("Error: Please Enter Data", error);
      setStatus("❌ Unable to.");
    }
  };

useEffect(() => {
  if (status === "Sync complete!") {
    const timeout = setTimeout(() => {
      router.push("/calculating");
    }, 1000); // optional delay (1 second)

    return () => clearTimeout(timeout);
  }
}, [status]);



  return (
    <>
      
      <main className="relative min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-black text-white overflow-hidden pb-16">
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 min-h-screen text-white flex flex-col items-center items-center px-6 pt-5">
      <div className="w-full max-w-md bg-white/20 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl text-center font-bold mb-6 pulse-glow">Initiate FuelSync Protocol</h1>

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
<p className="text-white font-semibold mb-1">Steps</p>
          <input
            type="number"
            placeholder= {lastSteps?.toString()}
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
      <NavPortal />
    </>
    
  );
  
}