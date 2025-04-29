'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateRecoveryFuel } from "@/lib/FusionCore";
import useFuelFormData from "@/lib/hooks/CoreData";

export default function DawnSyncPage() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { profile, latestSync } = useFuelFormData();

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
        age: profile.age
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

        router.push("/aegis/commandcenter");
      }, 1300); // optional delay (1 second)

      return () => clearTimeout(timeout);
    }
  }, [status, router]);

  if (status === "success")
    return (
      <div className="bg-[url('/images/loading.webp')] 
    bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
        <p className="text-xl font-bold text-white animate-pulse">Syncing In Progress...</p>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    );

  return (
    <>

      <main className="relative min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center 
      bg-no-repeat bg-black text-white overflow-hidden pb-16">
        <div className="absolute inset-0 z-0"></div>

        <div className="relative z-10 text-white flex flex-col items-center px-0 pt-0">
          <div className="w-full max-w-md bg-white/20 rounded-xl p-6 shadow-lg">
            <h1 className="text-3xl text-center font-bold mb-6 pulse-glow">Initiate DawnSync Protocol</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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
              <button
                type="submit"
                className="text-3xl bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
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