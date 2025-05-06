'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db, } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateActiveFuel } from "@/lib/FusionCore";
import useFuelFormData from "@/lib/hooks/CoreData";
import { Listbox } from '@headlessui/react'

const intensityOptions = ["None", "Light", "Moderate", "High"]

export default function DuskSyncComponent() {



    const router = useRouter();
    const [status, setStatus] = useState("");
    const { profile, latestSync, fitnessGoals } = useFuelFormData();

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
                    calorieGoal: fitnessGoals?.calorieGoal
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
        <>
            <div>
                <div className="relative mb-2 h-32 bg-[url('/images/menus/dusk.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                        <div className="flex items-center gap-2">Initiate DuskSync Protocol</div>
                        <h2 className="text-xs font-bold text-white">
                            “The day is done. Sync the work and restore your baseline.” </h2>
                    </div>
                </div>
            </div>


            <div className="bg-white/30 rounded-xl p-3 shadow-lg">
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

                    <div className="fixed bottom-16 left-0 w-full flex gap-2 justify-center mb-2 z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Sync Now!
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

}