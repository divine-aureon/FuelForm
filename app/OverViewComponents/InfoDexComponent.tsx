"use client"; // if needed depending on your Next.js version

import ControlHub from "./ControlHub/ControlHubBar";
import NavPortalPublic from "../LandingPageComponents/ControlHubPublic/ControlHubBarPublic";
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CancelButton from "@/app/OverViewComponents/CustomerPortal/CancelButton"
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import { UserProfile } from "../Global/BodySyncManifest"

export default function InfoDexComponent() {

  return (
    <>
          <h2 className="text-3xl font-bold mb-4">How to Use BodySync</h2>
          <p className="mb-4">
            Each day, you&#39;ll perform two Syncs — <span className="font-semibold">DawnSync</span> and <span className="font-semibold">DuskSync</span> — to keep your Blueprint updated with real-time stats, nutrition, and workout tracking.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">DawnSync & DuskSync Explained</h2>
          <ul className="list-disc list-inside mb-4">
            <li><span className="font-semibold">DawnSync:</span> Morning check-in. Used to record your weight and sleep rating. This sync also calculates your Recovery TDEE
              — essentially the calories your body would burn if you were to rest the entire day</li>
            <li><span className="font-semibold">DuskSync:</span> Evening check-in. It records your actual step count and workout time,
              then calculates your final Active TDEE. This allows FuelForm to adjust your daily nutrient targets based on your real energy output,
              closing the loop for a complete picture of your days activity and recovery</li>
            <li className="font-semibold">To prevent accidental overwrites or double entries, each sync button greys out after use and becomes inactive, displaying a
              status like -DuskSync Complete- or showing a checkmark to confirm its been recorded. This ensures your data stays clean and intentional.
            </li>
          </ul>



          <h2 className="text-3xl font-bold mt-8 mb-4">DawnSync & DuskSync OVERRIDE</h2>
          <ul className="list-disc list-inside mb-4">
            <li className="font-semibold"> if you ever make a mistake or need to update your sync, you can go to NeuroSettings and enable
              override mode for either Dawn or Dusk. Doing this will temporarily reactivate the corresponding sync button, allowing you to resubmit with updated info. Just remember — overrides are there for correction, so use them wisely.</li>
          </ul>



          <h2 className="text-3xl font-bold mt-8 mb-4">BodySync Features</h2>
          <ul className="list-disc list-inside mb-4">
            <li><span className="font-semibold">Overview:</span> Your mission control. Syncs, stats, and quick actions.</li>
            <li><span className="font-semibold">StatsReport:</span> Full breakdown of calories, macros, and nutrient targets.</li>
            <li><span className="font-semibold">FitnessTracker:</span> Log workouts, track personal records, and push limits.</li>
            <li><span className="font-semibold">NutritionLog:</span> Meal tracker for mastering your fuel intake.</li>
            <li><span className="font-semibold">CustomSettings:</span> Update your Fitness Goals & App settings</li>
            <li><span className="font-semibold">Biometrics:</span> Update your core data like height, weight unit, or birthday.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4">FusionCore: The Power Engine</h2>
          <p className="mb-4">
            FuelForm is powered by the <span className="font-semibold">FusionCore</span> — a custom system designed to calculate your Recovery and Active needs with precision, using your live data.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">RestDay vs ActiveDay Calories</h2>
          <ul className="list-disc list-inside mb-4">
            <li><span className="font-semibold">RestDay Calories:</span> The calories needed if you rested all day. Perfect for recovery days or lighter activity.</li>
            <li><span className="font-semibold">ActiveDay Calories:</span> Your true daily burn including steps and exercise, synced at night during DuskSync.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4">Changing Your Biometrics</h2>
          <p className="mb-4">
            To update your height, weight unit, or birthday, go to the <span className="font-semibold">Biometrics</span> page. These changes help fine-tune your calculations.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Understanding the Database</h2>
          <p className="mb-4">
            Your data is securely stored in the BodySync cloud database. Each Sync (Dawn, Dusk, or RepSync) creates a new log for that day, ensuring your Blueprint evolves with you. No Sync = no updates. Syncing daily keeps your stats alive!
          </p>

          <div className="mt-10 text-center">
            <p className="text-lg font-semibold">For more detailed guidance, updates, or support, stay tuned to the Overview!</p>
          </div>

          <div className="mt-10 text-center bg-white/10 p-3 rounded-3xl glowing-box">
            Need More Help?<br />
            Contact Support<br />

            <div className="glowing-purple-button mt-3 mb-2">
              <a
                href="mailto:fuelform.online@gmail.com?subject=FuelForm%20Support"
                className="text-white text-xl hover:text-indigo-300"
              >
                FuelForm.Online@gmail.com
              </a>
            </div>
          </div>
    </>
  );
}