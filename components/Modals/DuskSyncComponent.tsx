'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db, } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateActiveFuel } from "@/lib/FusionCore";
import useCoreData from "@/lib/hooks/CoreData";
import { Listbox } from '@headlessui/react'

import PageFadeWrapper from "@/components/Loading/PageFadeWrapper"

const intensityOptions = ["None", "Light", "Moderate", "High"]

export default function DuskSyncComponent() {



    const router = useRouter();
    const [status, setStatus] = useState("");
    const { profile, latestSync, fitnessSettings } = useCoreData();

    const [steps, setSteps] = useState(latestSync?.steps?.toString() || "");
    const [exerciseMinutes, setExerciseMinutes] = useState(latestSync?.exerciseMinutes?.toString() || "");
    const [exerciseIntensity, setExerciseIntensity] = useState(latestSync?.exerciseIntensity || "None");

    // 📅 Generate today's date string
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const parsedSteps = Number(steps);
            const parsedExerciseMinutes = Number(exerciseMinutes);

            const { activeTDEE, activeMacros, vitamins, minerals }
                = calculateActiveFuel({
                    weight_lbs: latestSync?.weight_lbs,
                    weight_kg: latestSync?.weight_kg,   // ← live state value
                    steps: parsedSteps,
                    exerciseMinutes: parsedExerciseMinutes,
                    exerciseIntensity: exerciseIntensity.toLowerCase(),
                    height_cm: profile.height_cm,
                    gender: profile.gender,
                    age: profile.age,
                    calorieGoal: fitnessSettings?.calorieGoal
                });

            const userId = auth.currentUser!.uid;
            const syncRef = collection(db, "users", userId, "syncs");
            const syncDocRef = doc(syncRef, dateString);

            await setDoc(syncDocRef, {
                steps: parsedSteps,
                exerciseMinutes: parsedExerciseMinutes,
                exerciseIntensity: exerciseIntensity.toLowerCase(),
                vitamins,
                minerals,
                activeMacros,
                activeTDEE,
                duskSync: true,
                duskTimestamp: serverTimestamp(),
                timestamp: serverTimestamp(),
            }, { merge: true });


            setStatus("success");
        } catch (error) {
            setStatus("failiure");
        }
    };

    useEffect(() => {
        if (status === "success") {
            const timeout = setTimeout(() => {
                window.location.reload(); // hard refresh
            }, 0); // optional delay (1 second)

            return () => clearTimeout(timeout);
        }
    }, [status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen flex-col pb-28">
        
                <div className="h-36 relative w-full bg-[url('/images/menus/dusk.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white text-3xl glowing-button mb-2">
                    <div className="absolute inset-0 pt-3 p-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                        <div className="text-center gap-2 pulse-glow">Initiate DuskSync Protocol</div>
                        <h2 className="text-sm font-bold text-white">
                            The day is done. Sync the work and restore your baseline. </h2>
                    </div>
                </div>
           


            <div className="bg-white/30 w-full rounded-xl p-3 shadow-lg">
                <form onSubmit={handleSubmit} className="">
                    <p className="text-xl text-white font-semibold mb-1">Steps
                        <input
                            type="number"
                            placeholder="How many Steps?"
                            min="0"
                            className="w-full p-3 mb-3 rounded-lg bg-gray-800/70 placeholder-white/60
                 border-none focus:outline-none appearance-none"
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </p>

                    <p className="text-xl text-white font-semibold mb-1">Exercise Minutes
                        <input
                            type="number"
                            min="0"
                            placeholder="Were you active?"
                            className="w-full p-3 mb-3 rounded-lg bg-gray-800/70 placeholder-white/60 border-none focus:outline-none appearance-none"
                            onChange={(e) => setExerciseMinutes(e.target.value)}
                        />
                    </p>
                    <p className="text-xl text-white font-semibold mb-1">Exercise Intensity

                        <Listbox value={exerciseIntensity}
                            onChange={setExerciseIntensity}>
                            <div className="relative">
                                <Listbox.Button className="w-full p-3 rounded-lg bg-gray-800/70 text-white">
                                    {exerciseIntensity}
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
                    </p>

                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Sync Now!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}