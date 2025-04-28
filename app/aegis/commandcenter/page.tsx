// pages/dashboard.js
'use client';

'use client';

import useFuelFormData from "@/lib/hooks/CoreData";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlueprintPage() {
  const router = useRouter();
  const { profile, latestSync } = useFuelFormData();
  const heightDisplay = profile.preferredHeightUnit === "cm"
    ? `${profile.height_cm} cm`
    : `${profile.height_ft_in.feet}'${profile.height_ft_in.inches}"`;

  const activemacros = latestSync?.activeMacros || [];
  const macros = latestSync?.recoveryMacros || [];
  const minerals = latestSync?.minerals || [];
  const vitamins = latestSync?.vitamins || [];
  const mergedMacros = (latestSync?.recoveryMacros || []).map((recoveryMacro) => {
    const matchingActive = (latestSync?.activeMacros || []).find(
      (activeMacro) => activeMacro.name === recoveryMacro.name
    );

    return {
      name: recoveryMacro.name,
      recoveryValue: recoveryMacro.value,
      activeValue: matchingActive?.value || "[pending]",
    };
  });

  const recoveryTDEE = latestSync?.recoveryTDEE;
  const activeTDEE = latestSync?.activeTDEE;

  return (
    <>
      <main className="relative min-h-screen bg-[url('/images/bg.webp')] 
      bg-cover bg-center bg-no-repeat bg-black text-white overflow-hidden pb-10 px-5">
        {/* Background Image */}
        {/* Dark overlay */}

        <div className="flex flex-col justify-center">
          <div className="absolute inset-0 z-0"></div>

          {/* Top Bar */}
          <div className="w-full flex justify-center z-10">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <h2 className="text-4xl text-center font-bold text-white pulse-glow">Vital Systems Online</h2>
              <hr className="my-2 border-t-4 border-white/30" />
              <h2 className="text-left text-white ml-4 text-xs">Name: {profile.name}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Age: {profile.age}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Gender: {profile.gender}</h2>
              <h2 className="text-left text-white ml-4 text-xs">Height: {heightDisplay}</h2>
            </div>
          </div>

          <section className="max-w-lg mx-auto mt-4">
  <div className="w-full rounded-2xl overflow-hidden 
    shadow-[0_0_20px_rgba(255,255,255,0.2)]">

    {/* HEADER: white background */}
    <div className="bg-white text-black font-bold text-center py-2">
      Today's Energy Expenditure
    </div>

    {/* BODY: gradient background */}
    <div className="bg-gradient-to-b from-white/80 to-white/60 text-black p-3">
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="text-gray-600 italic text-right">Recovery TDEE:</div>
        <div className="text-left">
          {recoveryTDEE !== undefined ? `${recoveryTDEE} kcal` : "[pending]"}
        </div>

        <div className="text-gray-600 italic text-right">Active TDEE:</div>
        <div className="text-left">
          {activeTDEE !== undefined ? `${activeTDEE} kcal` : "[pending]"}
        </div>
      </div>
    </div>

  </div>
</section>

          <section className="max-w-lg mx-auto mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Macronutrients</h2>
            <table className="w-full border-collapse rounded-2xl overflow-hidden 
          shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-gradient-to-b from-white/80 to-white/60 text-black">
              <tbody>
                {mergedMacros.map((macro, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 font-bold">{macro.name}</td>
                    <td className="px-4 py-2">
                      {typeof macro.recoveryValue === "object" && macro.recoveryValue !== null
                        ? `${macro.recoveryValue.value}g`
                        : `${macro.recoveryValue}g`}
                    </td>
                    <td className="px-4 py-2">
                      {typeof macro.activeValue === "object" && macro.activeValue !== null
                        ? `${macro.activeValue}g`
                        : `${macro.activeValue}g`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Vitamins Section */}
          <section className="max-w-lg mx-auto mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Vitamins</h2>
            <table className="w-full border-collapse rounded-2xl overflow-hidden 
          shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-gradient-to-b from-white/80 to-white/60 text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Vitamin</th>
                  <th className="px-4 py-2 text-left">RDA</th>
                  <th className="px-4 py-2 text-left">Upper Limit</th>
                  <th className="px-4 py-2 text-left">Unit</th>
                </tr>
              </thead>
              <tbody>
                {(latestSync?.vitamins || []).map((vitamin, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-100">
                      <td className="px-4 py-2 font-medium">{vitamin.name}</td>
                      <td className="px-4 py-2">{vitamin.rda}</td>
                      <td className="px-4 py-2">{vitamin.ul}</td>
                      <td className="px-4 py-2">{vitamin.unit}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-sm text-gray-700 italic border-b">
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
          <section className="max-w-lg mx-auto mt-4 pb-20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Minerals</h2>
            <table className="w-full border-collapse rounded-2xl overflow-hidden 
          shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-gradient-to-b from-white/80 to-white/60 text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Mineral</th>
                  <th className="px-4 py-2 text-left">RDA</th>
                  <th className="px-4 py-2 text-left">Upper Limit</th>
                  <th className="px-4 py-2 text-left">Unit</th>
                </tr>
              </thead>
              <tbody>
                {(latestSync?.minerals || []).map((mineral, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-100">
                      <td className="px-4 py-2 font-medium">{mineral.name}</td>
                      <td className="px-4 py-2">{mineral.rda}</td>
                      <td className="px-4 py-2">{mineral.ul}</td>
                      <td className="px-4 py-2">{mineral.unit}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-sm text-gray-700 italic border-b">
                        <span className="font-semibold">Functions:</span>{" "}
                        {Array.isArray(mineral.functions) ? mineral.functions.join(", ") : "—"}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/*DAWNSYNC & DUSKSYNC*/}
            <div className="fixed bottom-16 left-0 w-full flex justify-between px-4 z-45">
              <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button mr-2"
                onClick={() => router.push("/aegis/dawnsync")}>
                <Sun size={20} />DawnSync
              </button>
              <button className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition glowing-button ml-2"
                onClick={() => router.push("/aegis/dusksync")}>
                <Moon size={20} />DuskSync
              </button>
            </div>
          </section>

        </div>
      </main >
    </>
  );
}