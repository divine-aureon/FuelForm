'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import useAuth from '@/lib/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import UpgradeButton from "@/app/OverViewComponents/CustomerPortal/UpgradeButton"
import ControlHub from "../ControlHub/ControlHubBar";
import NavPortalPublic from "../../LandingPageComponents/ControlHubPublic/ControlHubBarPublic"
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust path as needed
import { getAuth } from "firebase/auth";
import ScrollLoad from "@/Backgrounds/ScrollLoad"




export default function UnlockPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [hasFuelFormAccount, setHasFuelFormAccount] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccount = async () => {
      if (!user?.uid) return;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      setHasFuelFormAccount(userSnap.exists());
    };

    checkAccount();
  }, [user]);


  return (
    <>
    
      <ScrollLoad />

      <div className="">
        <div className="bg-white/30 rounded-lg p-3 ">

          <div className="h-32 w-full flex justify-center bg-[url('/images/menus/unlock.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button2 mb-2 ">

            <div className="h-32 w-full inset-0 flex items-center bg-indigo-500/30 justify-center text-center rounded-xl">
              <div className="flex items-center text-5xl pb-2 font-semibold pulse-glow rounded-xl">BodySync Pro</div>
            </div>

          </div>



          <div className="bg-white/30 p-3 rounded-3xl font-bold text-white text-center">
            <div className=" grid grid-cols-2 gap-3">

              <div className="text-2xl p-3 pulse-glow">
                1 Month $0<br />
                PromoCode: <br />
                ACCESSCODES <br />
              </div>

              <div className=" flex justify-center h-32 bg-[url('/images/menus/price.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button p-3">
              </div>

            </div>

          </div>


          <div className="text-xs grid-cols-[1fr_3fr] gap-3 flex justify-center py-3 rounded-lg font-bold text-white ">
            <div className="grid gap-3 ">
              <div className="bg-[url('/images/menus/dusk.jpg')] bg-cover bg-center bg-no-repeat text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                DawnSync & DuskSyn
              </div>
              <div className="bg-[url('/images/menus/stats2.jpg')] bg-cover bg-center bg-no-repeat text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                SyncReport
              </div>
      
              <div className="bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat text-xs h-24 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                FitnessTracker (Dev in progress...)
              </div>
              <div className="bg-[url('/images/menus/goals.jpg')] bg-cover bg-center bg-no-repeat text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                DailyGoals (coming soon)
              </div>
              <div className="bg-[url('/images/menus/meals3.jpg')] bg-cover bg-center bg-no-repeat text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                NutritionLog (coming soon)
              </div>
                      <div className="bg-[url('/images/menus/settings.jpg')] bg-cover bg-center bg-no-repeat text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Customization 
              </div>

            </div>
            <div className="grid gap-3">
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Sync your daily weight, sleep, steps, exercise & Discover your recovery/active TDEE as well as Vitamin & Mineral Requirements.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                View statistics from DawnSync & DuskSync, StrengthArchive, MacroVault & Completed PrimeTasks.
              </div>

              <div className="text-xs h-24 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Set your workout split, and add movements to your workouts. Track PRs, and compare your current session with past workouts to track progress.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Set daily goals for yourself to hold accountability in your goals. mark items as completed, and earn crowns. Set Long Term goals, and track your history.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
               Set your Calorie Surplus/Deficit and Use your RestDayTDEE & ActiveDayTDEE to Count Calories to stay on track. 
              </div>
                            <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Choose your own, Background, ControlHub Icon, Light or Dark mode (coming soon) & Change Order of FastLinks. (coming soon)
              </div>
            </div>
          </div>


          <UpgradeButton />
        </div>
      </div>
      <footer className="pt-4 pb-2 ">
        {hasFuelFormAccount === true ? <ControlHub /> : <NavPortalPublic />}
      </footer>
    </>
  );
};
