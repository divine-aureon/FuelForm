'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from "@/components/CheckoutForm"
import useAuth from '@/lib/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

import UpgradeButton from "@/components/UpgradeButton"
import PageFadeWrapper from "@/components/Loading/PageFadeWrapper"

const UnlockComponent = () => {

  return (
    <>
        <div className="flex items-center justify-center min-h-screen flex-col pb-32">
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

              <div className="absolute inset-0 flex items-center justify-center text-center rounded-xl">
                <div className=" bg-cover bg-center bg-no-repeat text-4xl h-32 w-32 flex justify-center rounded-lg font-bold text-white"></div>
              </div>

            </div>
          </div>

          <div className="bg-[url('/images/menus/cardbio.jpg')] bg-cover bg-center mb-2 bg-no-repeat text-md p-10  bg-white/30 rounded-lg font-bold text-white text-center">
          Unlock your full potential.
            Upgrade to gain access to your Blueprint, track your Syncs, log your workouts, build meal plans, and watch your progress unfold — all in one adaptive system.
          </div>
          <UpgradeButton />
        </div>
      </div>

    </>

  );
};

export default UnlockComponent;
