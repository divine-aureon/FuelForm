"use client"; // if needed depending on your Next.js version

import ControlHub from "./ControlHub/ControlHubBar";
import NavPortalPublic from "../LandingPageComponents/ControlHubPublic/ControlHubBarPublic";
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CancelButton from "@/app/OverViewComponents/CustomerPortal/CancelButton"
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function InfoDex() {


  const userProfile = useGlobalData((s) => s.userProfile);
  const customSettings = userProfile?.customSettings;


  const auth = getAuth();
  const user = auth.currentUser;
  const [hasFuelFormAccount, setHasFuelFormAccount] = useState<boolean | null>(null);

  const [loadingOverlay, setLoadingOverlay] = useState(false);

  useEffect(() => {
    const checkAccount = async () => {
      if (!user?.uid) {
        setHasFuelFormAccount(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      setHasFuelFormAccount(userSnap.exists());
    };

    checkAccount();
  }, [user]);

  const isPaidUser = userProfile?.isPaid ?? false;


  // --- Logic tier flags (used to conditionally render later)
  const showPublic = hasFuelFormAccount === false;
  const showFree = hasFuelFormAccount === true && !isPaidUser;
  const showPremium = hasFuelFormAccount === true && isPaidUser;


  return (
    <>
      <ScrollLoad />
      <div className="pb-3">


        {loadingOverlay && (
          <div className="min-h-screen my-auto w-screen mx-auto fixed inset-0 z-[9999] bg-black/50 p-4 backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center ">
            <p className="text-white text-3xl p-4 text-center font-bold pulse-glow">
              Preparing verification procedures...
            </p>
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-5 w-5 rounded-full bg-white opacity-70 animate-bounce`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>
          </div>
        )}


        <div>
          <div className="relative mb-2 h-40 bg-[url('/images/menus/help.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
            <div className="absolute flex flex-col items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
              <h1 className="text-3xl font-bold text-center pulse-glow">
                Booting InfoDex...
              </h1>
              <p className="text-sm mt-2">
                Assistance initiated. Optimization incoming.                </p>
            </div>
          </div>
        </div>

        <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-md p-6 ">

          <h2 className="text-2xl font-bold mb-4">How to Use FuelForm</h2>
          <p className="mb-4">
            Each day, you&#39;ll perform two Syncs — <span className="font-semibold">DawnSync</span> and <span className="font-semibold">DuskSync</span> — to keep your Blueprint updated with real-time stats, nutrition, and workout tracking.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">DawnSync & DuskSync Explained</h2>
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



          <h2 className="text-2xl font-bold mt-8 mb-4">DawnSync & DuskSync OVERRIDE</h2>
          <ul className="list-disc list-inside mb-4">
            <li className="font-semibold"> if you ever make a mistake or need to update your sync, you can go to NeuroSettings and enable
              override mode for either Dawn or Dusk. Doing this will temporarily reactivate the corresponding sync button, allowing you to resubmit with updated info. Just remember — overrides are there for correction, so use them wisely.</li>
          </ul>



          <h2 className="text-2xl font-bold mt-8 mb-4">Menu Overview</h2>
          <ul className="list-disc list-inside mb-4">
            <li><span className="font-semibold">Command Center:</span> Your mission control. Syncs, stats, and quick actions.</li>
            <li><span className="font-semibold">Stats Echo:</span> Full breakdown of calories, macros, and nutrient targets.</li>
            <li><span className="font-semibold">Strength Archive:</span> Log workouts, track personal records, and push limits.</li>
            <li><span className="font-semibold">Macro Vault:</span> Meal tracker for mastering your fuel intake.</li>
            <li><span className="font-semibold">Neuro Settings:</span> Update your Fitness Goals & App settings</li>
            <li><span className="font-semibold">Biometrics:</span> Update your core data like height, weight unit, or birthday.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">FusionCore: The Power Engine</h2>
          <p className="mb-4">
            FuelForm is powered by the <span className="font-semibold">FusionCore</span> — a custom system designed to calculate your Recovery and Active needs with precision, using your live data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Recovery vs Active Calories</h2>
          <ul className="list-disc list-inside mb-4">
            <li><span className="font-semibold">Recovery Calories:</span> The calories needed if you rested all day. Perfect for recovery days or lighter activity.</li>
            <li><span className="font-semibold">Active Calories:</span> Your true daily burn including steps and exercise, synced at night during DuskSync.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changing Your Biometrics</h2>
          <p className="mb-4">
            To update your height, weight unit, or birthday, go to the <span className="font-semibold">Biometrics</span> page. These changes help fine-tune your calculations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the Database</h2>
          <p className="mb-4">
            Your data is securely stored in FuelForm&#39;s cloud database. Each Sync (Dawn or Dusk) creates a new log for that day, ensuring your Blueprint evolves with you. No Sync = no updates. Syncing daily keeps your stats alive!
          </p>

          <div className="mt-10 text-center">
            <p className="text-lg font-semibold">For more detailed guidance, updates, or support, stay tuned to the Command Center!</p>
          </div>

          <div className="mt-10 text-center bg-white/10 p-3 rounded-3xl glowing-box">
            Need More Help?<br />
            Contact Support<br />

            <div className="glowing-purple-button mt-3 mb-6">
              <a
                href="mailto:fuelform.online@gmail.com?subject=FuelForm%20Support"
                className="text-white text-xl hover:text-indigo-300"
              >
                FuelForm.Online@gmail.com
              </a>
            </div>

            {isPaidUser &&
              <>
                <div className="text-lg">
                  Mission Control acknowledges your transmission.
                  We understand that your journey is taking you elsewhere — to new frontiers, new priorities, and perhaps a different rhythm of life.

                  Just know this: your presence in the FuelForm Command Center left a trace — a spark in the system, a log in the archives, a legacy in motion.

                  Whether you&apos;re returning to base or charting a new path, your mission was — and always will be — honored.

                  At ease, Commander.

                  You are cleared for departure.
                </div>
                <div className="mt-3 mb-2">
                  <CancelButton triggerOverlay={() => setLoadingOverlay(true)} />
                </div>

              </>
            }

          </div>
        </section>
      </div>
      <footer>
        {showPublic && <NavPortalPublic />}
        {showFree && <ControlHub />}
        {showPremium && <ControlHub />}
      </footer>
    </>
  );
}