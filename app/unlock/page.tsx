'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from "@/components/CheckoutForm"
import useAuth from '@/lib/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from "react";
import SuccessLoad from "@/components/Loading/SuccessLoad";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

import UpgradeButton from "@/components/UpgradeButton"


const UnlockComponent = () => {

  return (
    <>
      <>
        <div className="bg-white/30 rounded-lg p-3">

          <div className="grid grid-cols-2 gap-3">

            <div className="relative flex justify-center h-32 bg-[url('/images/menus/unlock.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button mb-2 p-3">

              <div className="absolute inset-0 flex items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                <div className="flex items-center pulse-glow rounded-xl">Upgrade Access Codes</div>
              </div>

            </div>
            <div className="relative flex justify-center h-32 bg-[url('/images/menus/price.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button mb-2 p-3">

              <div className="absolute inset-0 flex items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                <div className=" bg-cover bg-center bg-no-repeat text-4xl h-32 w-32 flex justify-center rounded-lg font-bold text-white"></div>
              </div>

            </div>
          </div>

          <UpgradeButton />

          <div className="text-xl p-1 px-1 bg-white/30 rounded-lg font-bold text-white text-center">
            Unlock full access to FuelForm and gain:
            <div className="text-sm font-bold pb-2 text-white">
              Before you can change, you must know where you are. These are your fundamentals.
            </div>
          </div>
          <div className="text-xs grid-cols-[1fr_3fr] gap-3 flex justify-center py-3 rounded-lg font-bold text-white ">
            <div className="grid gap-3 ">
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                DawnSync & DuskSync:
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                StatsEcho:
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Customization Options:
              </div>
              <div className="text-xs h-24 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                StrengthArchive (..in progress)
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Calorie Goal:
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                MacroVault (coming soon)
              </div>

            </div>
            <div className="grid gap-3">
            <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
            Sync your daily weight, sleep, steps, exercise & Discover your recovery/active TDEE as well as Vitamin & Mineral Requirements.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                View statistics from DawnSync & DuskSync, StrengthArchive, MacroVault & Completed PrimeTasks.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Choose your own, Background, NavPortal Icon, Light or Dark mode (coming soon) & Change Order of FastLinks. (coming soon)
              </div>
              <div className="text-xs h-24 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Set your workout split, and add movements to your workouts. Track PRs, and compare your current session with past workouts to track progress.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Choose a Calorie Adjustment based on yoru fitness goals. Whether that is a kcal Surplus, Deficit or Maintenence. We got you.
              </div>
              <div className="text-xs h-20 text-center p-2 bg-white/10 rounded-lg font-bold text-white ">
                Log meals & count your calories. Using your RecoveryTDEE & ActiveTDEE
              </div>
            </div>
          </div>
          <UpgradeButton />
        </div>
      </>

    </>

  );
};

export default UnlockComponent;
