'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateRecoveryFuel } from "@/lib/FusionCore";
import useCoreData from "@/lib/hooks/CoreData";

export default function AddSplitComponent() {


    const router = useRouter();
    const [status, setStatus] = useState("");
    const { profile, latestSync, fitnessSettings } = useCoreData();

    const [weight_lbs, setWeightLbs] = useState("");
    const [weight_kg, setWeightKg] = useState("");

    const preferredWeightUnit = profile?.preferredWeightUnit ?? "lbs";

    const [mood, setMood] = useState("");
    const [sleepQuality, setSleepQuality] = useState("");
    const [sleepDuration, setSleepDuration] = useState("");

    // 📅 Generate today's date string
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input === "") {
            setWeightLbs("");
            setWeightKg("");
            return;
        }

        const parsed = parseFloat(input);
        if (isNaN(parsed)) return; // Guard against nonsense

        if (preferredWeightUnit === "lbs") {
            setWeightLbs(parsed.toString());
            setWeightKg((parsed * 0.453592).toString());
        } else {
            setWeightKg(parsed.toString());
            setWeightLbs((parsed * 2.20462).toString());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Debug Profile:");

            const { recoveryTDEE, recoveryMacros, vitamins, minerals } = calculateRecoveryFuel({
                weight_lbs,
                weight_kg,        // ← live state value
                height_cm: profile.height_cm,
                gender: profile.gender,
                age: profile.age,
                calorieGoal: fitnessSettings?.calorieGoal
            });

            const userId = auth.currentUser!.uid;
            const syncRef = collection(db, "users", userId, "syncs");
            const syncDocRef = doc(syncRef, dateString);

            await setDoc(syncDocRef, {
                weight_lbs,
                weight_kg,
                recoveryMacros,
                vitamins,
                minerals,
                recoveryTDEE,
                sleepQuality: sleepQuality || null,
                sleepDuration: sleepDuration || null,
                mood: mood || null,
                dawnSync: true,
                dawnTimestamp: serverTimestamp(),
                timestamp: serverTimestamp(),
            }, { merge: true });


            setStatus("success");
        } catch (error) {
            setStatus("failure");
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
                <div className="relative mb-2 h-32 bg-[url('/images/menus/dawn.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                        <div className="flex items-center gap-2">Initiate DawnSync Protocol</div>
                        <h2 className="text-xs font-bold text-white">
                        “Each morning is a chance to recalibrate. Enter your truth and proceed with clarity.”
                        </h2>
                    </div>
                </div>
            </div>
            <div className="bg-white/20 rounded-xl p-2 shadow-lg">
                        <form onSubmit={handleSubmit} className="">
                    <p className="text-lg text-white font-semibold mb-1">
                        Weight ({preferredWeightUnit === "kg" ? "kg" : "lbs"})
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={preferredWeightUnit === "lbs" ? weight_lbs.toString() : weight_kg.toString()} onChange={handleWeightChange}
                            placeholder="Enter weight"
                            className="w-full p-3 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                            required
                        />
                    </p>
                    <p className="text-lg text-white font-semibold mb-1">
                        Mood
                        <input
                            type="text"
                            placeholder="Happy, Tired, Focused, etc."
                            onChange={(e) => setMood(e.target.value)}
                            className="w-full p-3 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                            required
                        />
                    </p>
                    <p className="text-lg text-white font-semibold mb-1">
                        Sleep Quality
                        <input
                            type="number"
                            min="1"
                            max="10"
                            placeholder="1-10"
                            onChange={(e) => setSleepQuality(e.target.value)}
                            className="w-full p-3 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                            required
                        />
                    </p>

                    <p className="text-lg text-white font-semibold mb-1">
                        Sleep Duration (hours)
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Hours"
                            onChange={(e) => setSleepDuration(e.target.value)}
                            className="w-full p-3 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
                            required
                        />
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