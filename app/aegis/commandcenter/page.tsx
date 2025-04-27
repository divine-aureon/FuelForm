// pages/dashboard.js
'use client';


import useFuelFormData from "@/lib/hooks/useFuelFormData";
import { useRouter } from "next/navigation"; // ✅ For App Router
import { Sun, Moon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const { profile, latestSync } = useFuelFormData();

  return (

    <>

      <main className="relative min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat bg-black text-white overflow-hidden pb-16">
        <div className="absolute inset-0 bg-black/30 z-0 "></div>
<div className="fixed top-2 left-0 flex w-full justify-center">
        <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-4 shadow-md z-60">
          <h2 className="text-4xl text-center justify-center font-bold text-white pulse-glow">Vital Systems Online</h2>
          {/* You can add more content here later */}
        </div>
        </div>
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center flex justify-center mt-20">
        {profile && (
            <p className="text-lg mb-6 text-gray-400">Signed in as: {profile.email}</p>
          )}
          {profile && (
            <div className="bg-white/10 p-4 rounded-xl text-sm text-left mb-6 w-full max-w-md">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Age: </strong>
                {profile.age || "—"}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Height:</strong> {
                profile.heightUnit === "cm"
                  ? `${Math.round(profile.height_cm)} cm`
                  : `${Math.floor(profile.height_cm / 2.54 / 12)}'${Math.round(profile.height_cm / 2.54 % 12)}\"`
              }</p>
            </div>
          )}

          <div className="fixed bottom-16 left-0 w-full flex justify-between px-4 z-[60]">
            <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button mr-2"
              onClick={() => router.push("/aegis/dawnsync")}>

              <Sun size={20} />DawnSync
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button ml-2"
              onClick={() => router.push("/aegis/dusksync")}>
              <Moon size={20} />DuskSync
            </button>
          </div>
        </div>
        
      </main>
    </>
  );
}
