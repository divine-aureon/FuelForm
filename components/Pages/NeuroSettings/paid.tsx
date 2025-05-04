'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import useFuelFormData from "@/lib/hooks/CoreData";
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



export default function PaidNeuroSettingsPage() {

    const router = useRouter();
    const [status, setStatus] = useState("");
    const { profile, latestSync, preferences, fitnessGoals } = useFuelFormData();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const [background, setBackground] = useState("");
    const [navIcon, setNavIcon] = useState("");
    const [calorieGoal, setCalorieGoal] = useState("");
    const { user } = useAuth();

    const { hasDuskSyncedToday, hasDawnSyncedToday } = TodaysSync();

    useEffect(() => {
        const fetchNeuroSettings = async () => {
            if (!user?.uid) return;

            const preferencesRef = doc(db, "users", user.uid, "neuro", "preferences");
            const fitnessGoalsRef = doc(db, "users", user.uid, "neuro", "fitnessGoals");

            const [preferencesSnap, fitnessGoalsSnap] = await Promise.all([
                getDoc(preferencesRef),
                getDoc(fitnessGoalsRef),
            ]);

            if (preferencesSnap.exists()) {
                const data = preferencesSnap.data();
                setBackground(data.background || 0);
                setNavIcon(data.navIcon || 0);
            }

            if (fitnessGoalsSnap.exists()) {
                const goals = fitnessGoalsSnap.data();
                setCalorieGoal(goals.calorieGoal || 0); // 👈 assumes you’ve declared this state
            }
        };

        fetchNeuroSettings(); // ✅ call only once user is defined
    }, [user]);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const user = auth.currentUser;
        const userId = auth.currentUser!.uid;
        const syncRef = collection(db, "users", userId, "syncs");
        const syncDocRef = doc(syncRef, dateString);
        const preferencesRef = doc(db, "users", userId, "neuro", "preferences");
        const fitnessGoalsRef = doc(db, "users", userId, "neuro", "fitnessGoals");
        const trendSettingsRef = doc(db, "users", userId, "neuro", "trendSettings");

        try {
            await setDoc(preferencesRef, {
                background,
                navIcon
            }, { merge: true });

            await setDoc(fitnessGoalsRef, {
                calorieGoal: Number(calorieGoal), // or however you're tracking this
            }, { merge: true });


            setStatus("success");
        } catch (error) {
            setStatus("failiure");
        }
    };

    useEffect(() => {
        if (status === "success") {
            const timeout = setTimeout(() => {

                router.push("/command-center");
            }, 200); // optional delay (1 second)

            return () => clearTimeout(timeout);
        }
    }, [status, router]);


    return (

        <>
            <div className="bg-white/20 rounded-xl p-6 shadow-lg mb-[110px]">
                <h1 className="text-3xl text-center font-bold mb-2 pulse-glow">Accessing NeuroSettings</h1>
                <h1 className="text-md text-center font-bold mb-6">
                    “Optimize the interface to align with your rhythm, pace, and focus.”
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white/30 rounded-xl text-3xl text-white p-3"> Preferences
                        <p className="text-lg text-white font-semibold mb-1">
                            Customize Background
                            <div className="flex mb-4">
                                <select
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-800/70 text-white"
                                >
                                    <option value="">Customize Background</option>
                                    {["Neural Link", "Dream Bokeh", "Circuit Veins", "Data Cloud", "Ether Pulse"].map((bg) => (
                                        <option key={bg} value={bg}>
                                            {bg}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </p>
                        <p className="text-lg text-white font-semibold mb-1">
                            NavPortal Icon
                            <div className="flex mb-4">
                                <select
                                    value={navIcon}
                                    onChange={(e) => setNavIcon(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-800/70 text-white"
                                >
                                    <option value="">Choose an Icon</option>
                                    {["Atom", "Crown", "Flame", "Zap", "Star", "Shield", "Heart", "Bird"].map((icon) => (
                                        <option key={icon} value={icon}>
                                            {icon}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </p>
                    </div>
                    <div className="bg-white/30 rounded-xl text-3xl text-white p-3"> Fitness Goals
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
                    </div>

                    <div className="fixed bottom-[135px] left-0 w-full flex gap-2 justify-center mb-2 z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Link NeuroSettings!
                        </button>
                    </div>
                </form>
            </div>
            <div className="fixed bottom-16 left-0 w-full flex justify-between z-30">

                <>
                    {hasDawnSyncedToday ? (
                        <button
                            className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300/80  transition mr-1 px-4 py-2 glowing-button"
                            onClick={() => router.push("/dawnsync?querymode=override")}
                        >
                            <CircleAlert size={20} /> DawnSync Override
                        </button>

                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 w-full bg-gray-500/80 text-white rounded-lg mr-1 cursor-default px-4 py-2 "
                        >
                            <CircleOff size={20} /> DawnSync Not Found
                        </button>
                    )}

                    {hasDuskSyncedToday ? (

                        <button
                            className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-gray-300/80 cursor-default transition ml-1 px-4 py-2 glowing-button"
                            onClick={() => router.push("/dusksync?querymode=override")}
                        >
                            <CircleAlert size={20} /> DuskSync Override
                        </button>

                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 w-full bg-gray-500/80 text-white rounded-lg ml-1  px-4 py-2"
                        >
                            <CircleOff size={20} /> DuskSync Not Found
                        </button>
                    )}
                </>
            </div>
        </>

    );

}