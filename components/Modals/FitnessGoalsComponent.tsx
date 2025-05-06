'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import useCoreData from "@/lib/hooks/CoreData";
import useAuth from "@/lib/useAuth";
import { CircleAlert, CircleOff } from "lucide-react";
import TodaysSync from '@/lib/hooks/TodaysSync'
import {
    Crown,
    Flame,
    Zap,
    Star,
    Shield,
    Atom,
    Heart,
    Bird
} from 'lucide-react';



export default function FitnessGoalsPageComponent() {

    const router = useRouter();
    const [status, setStatus] = useState("");
    const { settings, fitnessSettings } = useCoreData();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const [calorieGoal, setCalorieGoal] = useState("");

    useEffect(() => {
        if (!fitnessSettings) return;
        setCalorieGoal(fitnessSettings.calorieGoal?.toString() || "");

    }, [fitnessSettings]);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const userId = auth.currentUser!.uid;
        const userRef = doc(db, "users", userId,);

        try {
            await setDoc(userRef, {
                fitnessSettings: {
                    calorieGoal: Number(calorieGoal),
                }
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
            }, 0);

            return () => clearTimeout(timeout);
        }
    }, [status, router]);

    return (

        <>
            <div>
                <div className="relative h-32 bg-[url('/images/menus/goals.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                        <div className="flex items-center gap-2 pulse-glow ">Accessing Fitness Goals</div>
                        <h2 className="text-sm font-bold text-white">
                            Optimize the interface to align with your rhythm, pace, and focus.
                        </h2>
                    </div>
                </div>
            </div>


            <div className="bg-white/30 rounded-xl p-3 shadow-lg mb-[110px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-lg text-white font-semibold mb-1">
                        Calorie Goals
                        <div className="flex mb-4">

                            <select
                                value={calorieGoal}
                                onChange={(e) => setCalorieGoal(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">+/- Kcal</option>
                                {["500", "400", "300", "200", "100", "0", "-100", "-200", "-300", "-400", "-500"].map((kcal) => (
                                    <option key={kcal} value={kcal}>
                                        {kcal} kcal
                                    </option>
                                ))}
                            </select>
                        </div>
                    </p>


                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black hover:bg-indigo-300/50 px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Sync Goals!
                        </button>
                    </div>
                </form>
            </div>
        </>

    );

}