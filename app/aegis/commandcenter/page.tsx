// pages/dashboard.js
'use client';

import useFuelFormData from "@/lib/hooks/useFuelFormData";
import { useRouter } from "next/navigation"; // ✅ For App Router
import { Sun, Moon } from "lucide-react";


export default function NutrientBlueprint() {
  const router = useRouter();
  const { profile, latestSync } = useFuelFormData();

  const macros = latestSync?.recommendedMacros || [];
  const vitamins = latestSync?.recommendedVitamins || [];
  const minerals = latestSync?.recommendedMinerals || [];

  const heightDisplay = profile.preferredHeightUnit === "cm"
    ? `${profile.height_cm} cm`
    : `${profile.height_ft_in.feet}'${profile.height_ft_in.inches}"`;

  return (


    <>


      <main className="relative min-h-screen bg-black text-white overflow-hidden pb-16 mb-10">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat"></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Top Bar */}
        <div className="fixed top-2 left-0 w-full flex justify-center z-10">
          <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
            <hr className="my-2 border-t-4 border-white/30" />
            <h2 className="text-left text-white ml-4 text-xs">Name: {profile.name}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
            <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>


          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 mt-40 flex flex-col items-center">

          <div>
            <h1>{profile.name}&apos;s Nutrient Blueprint</h1>
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <h2>Macros</h2>
            {macros.map((macro, index) => (
              <p key={index}>{macro.name}: {macro.value}</p>
            ))}          {/* etc */}
          </div>


          {/*bottom of page buttons*/}
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