'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, query, orderBy, limit } from "firebase/firestore";import { auth, db } from 'lib/firebase'; // Adjust path if different
import Link from "next/link";

interface SyncData {
  weight_lbs: number;
  weight_kg: number;
  steps: number;
  exerciseMinutes: number;
  exerciseIntensity: string;
}

interface UserProfile {
  name: string;
  birthday: string;
  gender: string;
  heightCm: number;
  heightUnit: string;
  height_cm: number;
  height_ft_in: {
    feet: number;
    inches: number;
  };
  preferredHeightUnit: string;
  preferredWeightUnit: string;
  age: number;
  latestSync?: SyncData; // 👈 optional, since it's dynamic
}

const defaultProfile: UserProfile = {
  name: "",
  birthday: "",
  gender: "",
  heightCm: 0,
  heightUnit: "",
  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",
  age: 0,
};

export default function NutrientBlueprint() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile); 

  const {
    name,
    birthday,
    gender,
    heightCm,
    heightUnit,
    height_cm,
    height_ft_in,
    preferredHeightUnit,
    preferredWeightUnit,
    age,
    latestSync,
  } = profile;

  const { feet, inches } = height_ft_in;
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const syncRef = collection(db, "users", user.uid, "sync");
  
        const [profileSnap, syncSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(query(syncRef, orderBy("timestamp", "desc"), limit(1))),
        ]);
  
        let profileData: UserProfile;
  
        if (profileSnap.exists()) {
          profileData = profileSnap.data() as UserProfile;
        } else {
          // ✅ Fallback to an empty object instead of null
          profileData = profileSnap.exists() ? profileSnap.data() as UserProfile : defaultProfile;
          };
        
        const latestSync = syncSnap.docs.length > 0 ? syncSnap.docs[0].data().data() as SyncData
        : {
          weight_lbs: 0,
          weight_kg: 0,
          steps: 0,
          exerciseMinutes: 0,
          exerciseIntensity: "low",
          recommendedMacros: [],
          recommendedVitamins: [],
          recommendedMinerals: [],
          timestamp: null,
        };

        setProfile({ ...profileData, latestSync }); // 💾 profile is always valid now
      };
    });
  
    return () => unsubscribe();
  }, []);

  if (!profile) return <p>Loading...</p>;

  const ageGroup =
  profile.age < 4 ? 'infant' :
  profile.age < 9 ? 'child' :
  profile.age < 14 ? 'tween' :
  profile.age < 19 ? 'teen' :
  profile.age < 30 ? 'young_adult' :
  profile.age < 50 ? 'adult' :
  profile.age < 70 ? 'older_adult' : 'elder';

  const getWeightRange = (weight) => {
    const w = parseFloat(weight);
    if (w < 100) return 'low';
    if (w < 150) return 'moderate';
    if (w < 200) return 'high';
    return 'very_high';
  };

  return (
    <>
    <main className="relative min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-black text-white overflow-hidden pb-16">
    <div className="absolute inset-0 bg-black/30 z-0"></div>


<main className="relative z-10 min-h-screen text-white p-8 font-sans">
      <div className="text-center mb-10">
  <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
  Nutrient Blueprint Calibration Complete
  </h1>
  <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
  Systems analyzed. 
  <br />
  Vital metrics decoded. 
  <br />
  Proceed with tailored fueling protocol.  </p>
</div>
<div className="mt-6 max-w-lg mx-auto flex justify-center">
<div className="bg-button-image text-white rounded-xl p-4 shadow-md w-full mt-0 text-sm text-left animate-pulseGlow">
  <h2 className="text-lg font-bold mb-2 text-blue-400">Most Recent FuelSync</h2>
  <p className="mb-1">
  <p className="mb-1 text-gray-400">
  <span className="text-blue-400 font-semibold">Synced:</span>{" "}
  {profile.latestSync?.timestamp?.toDate().toLocaleString() || "N/A"}
</p>
    <span className="text-blue-400">Steps:</span> {profile.latestSync?.steps || "N/A"}
  </p>
  <p className="mb-1">
    <span className="text-blue-400">Exercise Minutes:</span> {profile.latestSync?.exerciseMinutes || "N/A"}
  </p>
  <p>
    <span className="text-blue-400">Intensity:</span> {profile.latestSync?.exerciseIntensity || "N/A"}
  </p>
</div>
</div>

{/* Macronutrients Section */}
<section className="max-w-lg mx-auto mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Macronutrients</h2>
  <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left">Item</th>
        <th className="px-4 py-2 text-left">Target</th>
      </tr>
    </thead>
    <tbody>
      {(profile.latestSync?.recommendedMacros || []).map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="px-4 py-2 font-medium">{item.name}</td>
          <td className="px-4 py-2">{item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>

{/* Vitamins Section */}
<section className="max-w-lg mx-auto mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Vitamins</h2>
  <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left">Vitamin</th>
        <th className="px-4 py-2 text-left">RDA</th>
        <th className="px-4 py-2 text-left">Upper Limit</th>
        <th className="px-4 py-2 text-left">Unit</th>
      </tr>
    </thead>
    <tbody>
      {(profile.latestSync?.recommendedVitamins || []).map((vitamin, index) => (
        <React.Fragment key={index}>
          <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 font-medium">{vitamin.name}</td>
            <td className="px-4 py-2">{vitamin.rda}</td>
            <td className="px-4 py-2">{vitamin.ul}</td>
            <td className="px-4 py-2">{vitamin.unit}</td>
          </tr>
          <tr>
            <td colSpan="4" className="px-4 py-2 text-sm text-gray-700 italic border-b">
              <span className="font-semibold">Functions:</span>{" "}
              {Array.isArray(vitamin.functions) ? vitamin.functions.join(", ") : "—"}
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</section>

{/* Minerals Section */}
<section className="max-w-lg mx-auto mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Minerals</h2>
  <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left">Mineral</th>
        <th className="px-4 py-2 text-left">RDA</th>
        <th className="px-4 py-2 text-left">Upper Limit</th>
        <th className="px-4 py-2 text-left">Unit</th>
      </tr>
    </thead>
    <tbody>
      {(profile.latestSync?.recommendedMinerals || []).map((mineral, index) => (
        <React.Fragment key={index}>
          <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 font-medium">{mineral.name}</td>
            <td className="px-4 py-2">{mineral.rda}</td>
            <td className="px-4 py-2">{mineral.ul}</td>
            <td className="px-4 py-2">{mineral.unit}</td>
          </tr>
          <tr>
            <td colSpan="4" className="px-4 py-2 text-sm text-gray-700 italic border-b">
              <span className="font-semibold">Functions:</span>{" "}
              {Array.isArray(mineral.functions) ? mineral.functions.join(", ") : "—"}
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</section>
      </main>
      </main>
    </>
  );
}
