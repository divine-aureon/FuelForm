'use client';

import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { UserProfile } from "../initializing/Global/BodySyncManifest"

import ControlHub from "./ControlHub/ControlHubBar";
import { useState, useEffect } from "react";
import ScrollLoad from "@/Backgrounds/ScrollLoad"

export default function Crowns() {


        const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

  return (
    <>
      <ScrollLoad />
      <div>
        <div className="relative h-32 bg-[url('/images/menus/crown2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex items-center gap-2">Crown Achievements Coming Soon!</div>
            <h2 className="text-xs font-bold text-white">
              Progress isn&apos;t just tracked. It&apos;s honored.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white/30 text-white rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <p className="text-lg max-w-md">
          Crown Achievements mark your defining moments — the milestones where discipline, intention,
          and mastery align. Every crown earned represents a personal victory: syncing daily, hitting
          PRs, mastering your meals, or staying consistent through resistance.
          This isn&apos;t about flashy badges or empty rewards. Crowns are earned through real effort,
          and each one reflects your evolving commitment to your form — physical, mental, and energetic.
          Crown types include:
          Sync Streaks — for showing up daily, even when it&apos;s hard.
          Strength Milestones — PRs, total rep records, volume surges.
          Nutrient Mastery — logging complete meals with accurate macros & micros.
          Consistency Crowns — staying within your calorie zone for a full week.
          Recovery Honors — logging rest days, managing soreness, and staying aligned.
          Crowns are visible proof that you&apos;re not just going through the motions —
          you&apos;re building your form, one intentional day at a time.
          Earn them. Reflect on them. Let them remind you who you are becoming.
        </p>
      </div>
      <footer className="pt-4 pb-2">
        <ControlHub />
      </footer>
    </>
  );
}





