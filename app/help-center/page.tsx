"use client"; // if needed depending on your Next.js version

import useProfile from "@/lib/hooks/ProfileData";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";
import { useState, useEffect } from 'react';
import NavLoad from "@/components/Loading/NavLoad";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import useFuelFormData from "@/lib/hooks/CoreData";


export default function HelpPage() {

  const { preferences } = useFuelFormData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (preferences?.background) {
      setBackgroundMode(preferences.background);
    }
  }, [preferences?.background, setBackgroundMode]);

  const { profile } = useProfile();
  const isPaidUser = profile?.isPaid ?? false;

  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 800);
    return () => clearTimeout(timer);
  }, []);



  if (!delayDone) return <NavLoad />;

  return (
    <>
      <div className="flex justify-center backdrop-blur-md pb-3">
        <section className="bg-black/30 rounded-2xl shadow-md p-6">
          <h1 className="text-4xl font-bold text-center mb-6 pulse-glow">
            Welcome to the FuelForm Help Center!
          </h1>

          <p className="mb-4 text-center">
            Congratulations, Commander. Youve entered the next evolution of vitality tracking — powered by the <span className="font-semibold">FusionCore</span>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How to Use FuelForm</h2>
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
            <li><span className="font-semibold">Neuro Settings:</span> Update your Fitness Goals & App Preferences</li>
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

          <div className="mt-10 text-center bg-white/10 p-3 rounded-3xl">
            Need More Help?<br />
            Contact Support<br />
            <br />
            <a
              href="mailto:fuelform.online@gmail.com?subject=FuelForm%20Support"
              className="text-white underline hover:text-blue-400"
            >
              FuelForm.Online@gmail.com
            </a>
          </div>
        </section>
      </div>
      {/* 🔀 Conditionally render the appropriate NavPortal */}
      {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
    </>
  );
}