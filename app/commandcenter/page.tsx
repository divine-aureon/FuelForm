// pages/dashboard.js
'use client';


import useFuelFormData from "../hooks/useFuelFormData";
import { useRouter } from "next/navigation"; // ✅ For App Router
import { logoutUser } from "@/lib/auth";
import NavBar from "@/components/NavBar";

export default function Dashboard() {
  const router = useRouter();

const { profile, latestSync } = useFuelFormData();

  return (
    
    <><NavBar pageTitle="Command Center" />
    
    <main className="relative min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-black text-white overflow-hidden pb-16">
    <div className="absolute inset-0 bg-black/30 z-0"></div>
  
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-4xl font-extrabold mb-4">Vital Systems Online</h1>
        {profile.email && (
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
        ? `${Math.round(profile.heightCm)} cm`
        : `${Math.floor(profile.heightCm / 2.54 / 12)}'${Math.round(profile.heightCm / 2.54 % 12)}\"`
    }</p>
  </div>
)}
  
<div className="bg-white/5 p-4 rounded-xl mb-6 w-full max-w-md">
  <button
    className="w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button"
    onClick={() => router.push("/fuelsync")}
  >
    Initiate FuelSync Protocol
  </button>
</div>

<div className="grid gap-3 w-full max-w-md">
  <button
    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition text-left"
    onClick={() => router.push("/fuelform")}
  >
    FuelForm<br />
    <span className="text-sm text-gray-500 font-normal">
      Plan your meals, track your intake, and fuel your form
    </span>
  </button>

  <button
    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition text-left"
    onClick={() => router.push("/formforge")}
  >
    FormForge<br />
    <span className="text-sm text-gray-500 font-normal">
      Your personalized strength tracker
    </span>
  </button>

  <button
    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition text-left"
    onClick={() => router.push("/blueprint")}
  >
    Nutrient Blueprint<br />
    <span className="text-sm text-gray-500 font-normal">
      A complete overview of your essential vitamins, minerals, and their roles
    </span>
  </button>

  <button
    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition text-left"
    onClick={() => router.push("/fuelstats")}
  >
    FuelStats<br />
    <span className="text-sm text-gray-500 font-normal">
      Your daily log of energy, weight, and progress trends
    </span>
  </button>

  <button
    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition text-left"
    onClick={() => router.push("/settings")}
  >
    Biometrics<br />
    <span className="text-sm text-gray-500 font-normal">
      Change metrics that adjust your Nutrient Blueprint
    </span>
  </button>
</div>
</div>
    </main>
    </>
  );
  
}
