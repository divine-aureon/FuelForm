// pages/dashboard.js
'use client';


import useFuelFormData from "@/lib/hooks/useFuelFormData";
import { useRouter } from "next/navigation"; // ✅ For App Router
import { logoutUser } from "@/lib/auth";

export default function Dashboard() {
  const router = useRouter();

const { profile, latestSync } = useFuelFormData();

  return (
    
    <>
    
    <main className="relative min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-black text-white overflow-hidden pb-16">
    <div className="absolute inset-0 bg-black/30 z-0 "></div>
  
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-4xl font-extrabold mb-4">FREE Vital Systems Online</h1>
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
    onClick={() => router.push("/dawnsync")}
  >
    Initiate DawnSync Protocol
  </button>
</div>
<div className="bg-white/5 p-4 rounded-xl mb-6 w-full max-w-md">
  <button
    className="w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button"
    onClick={() => router.push("/dusksync")}
  >
    Initiate DuskSync Protocol
  </button>
</div>
</div>
    </main>
    </>
  );
  
}
