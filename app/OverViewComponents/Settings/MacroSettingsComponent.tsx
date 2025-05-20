'use client';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import useCoreData from "@/lib/hooks/CoreData";
import useAuth from "@/lib/useAuth";
import { CircleAlert, CircleOff } from "lucide-react";
import TodaysSync from '@/lib/hooks/hasDawnDuskSynced'
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
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { EstablishConnection } from "../../initializing/Global/EstablishConnection";



export default function FitnessGoalsPageComponent() {

    const router = useRouter();
    const [status, setStatus] = useState("");
    const userProfile = useGlobalData((s) => s.userProfile);
      const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const [calorieGoal, setCalorieGoal] = useState("");

    useEffect(() => {
        if (!userProfile?.nutritionSettings) return;
        setCalorieGoal(userProfile?.nutritionSettings.calorieGoal?.toString() || "");

    }, [userProfile?.nutritionSettings]);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const userId = auth.currentUser!.uid;
        const userRef = doc(db, "users", userId,);

        try {
            await setDoc(userRef, {
                nutritionSettings: {
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

        <div className="flex items-center justify-center flex-col">

            <div className="h-32 relative w-full bg-[url('/images/menus/goals.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2 ">
                <div className="absolute inset-0 pt-5 p-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                    <div className="text-center gap-2 pulse-glow ">Nutrient Settings</div>
                    <h2 className="text-sm font-bold text-white">
                        Optimize the interface to align with your rhythm, pace, and focus.
                    </h2>
                </div>
            </div>



            <div className="text-left bg-white/30 w-full rounded-xl p-3 shadow-lg mb-[110px]">
                <form onSubmit={handleSubmit} className="">
                    <p className="text-lg text-white font-semibold mb-1">
                        Calorie Goals
                    </p>
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



                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30 px-2 ">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black hover:bg-indigo-300/50 px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

}