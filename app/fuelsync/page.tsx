'use client';

import Link from "next/link";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import useFuelSync from "../hooks/useFuelSync";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateAllNutrition } from "@/lib/processingCore";
import NavBar from "@/components/NavBar";
import useFuelFormData from "../hooks/useFuelFormData";


export default function FuelSyncPage() {
  const router = useRouter();
  const sync = useFuelSync();

  const [weight_lbs, setWeight_lbs] = useState(sync.weight_lbs);
  const [weight_kg, setWeight_kg] = useState(sync.weight_kg);
  const [steps, setSteps] = useState(sync.steps);
  const [exerciseMinutes, setExerciseMinutes] = useState(sync.exerciseMinutes);
  const [intensity, setIntensity] = useState(sync.exerciseIntensity);
  const [status, setStatus] = useState("");

  const { profile } = useFuelFormData();
const preferredWeightUnit = profile?.preferredWeightUnit ?? "lbs";

  const handleSubmit = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return setStatus("You must be logged in.");

    try {
    const parsedSteps = Number(steps);
    const parsedExerciseMinutes = Number(exerciseMinutes);
    const parsedExerciseIntensity = intensity; // or however you're capturing it



    const calculated = calculateAllNutrition({
      weight_lbs,
      steps: parsedSteps,
      exerciseMinutes: parsedExerciseMinutes,
      intensity: parsedExerciseIntensity,
    });

    const syncRef = collection(db, "users", userId, "sync");
  
  // Add these lines to extract readable data for Firestore:
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
      <NavBar pageTitle="FuelSync" />
      <main className="relative min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 min-h-screen text-white flex flex-col items-center items-center px-6 pt-5">
      <div className="w-full max-w-md bg-white/20 rounded-xl p-6 shadow-lg glowing-button">
        <h1 className="text-2xl text-center font-bold mb-6 animate-pulse">Initiate FuelSync Protocol</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <p className="text-white font-semibold mb-1">
  Weight
        <input
  type="number"
  placeholder={""}
  value={""}
  onChange={(e) => setWeight_lbs(Number(e.target.value))}
  className="w-full p-3 mb-4 rounded bg-white/10 text-white"
  required
/>
</p>
<p className="text-white font-semibold mb-1">Steps</p>
          <input
            type="number"
            placeholder= {""}
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
          />
      <p className="text-white font-semibold mb-1">Exercise Minutes</p>

          <input
            type="number"
            placeholder={""}
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60"
            value={exerciseMinutes}
            onChange={(e) => setExerciseMinutes(Number(e.target.value))}
          />
                <p className="text-white font-semibold mb-1">Exercise Intensity</p>

          <select
            className="w-full p-3 rounded-lg bg-grey text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
  value={intensity}
  onChange={(e) => setIntensity(e.target.value)}
>
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="intense">Intense</option>
          </select>

          <button
            type="submit"
            className="glowing-button bg-white text-black px-4 py-3 w-full rounded-lg font-semibold"
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