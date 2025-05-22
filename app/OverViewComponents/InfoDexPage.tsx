"use client"; // if needed depending on your Next.js version

import ControlHub from "./ControlHub/ControlHubBar";
import NavPortalPublic from "../LandingPageComponents/ControlHubPublic/ControlHubBarPublic";
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CancelButton from "@/app/OverViewComponents/CustomerPortal/CancelButton"
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { UserProfile } from "../initializing/Global/BodySyncManifest"
import InfoDexComponent from "@/app/OverViewComponents/InfoDexComponent"

export default function InfoDex() {

    const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

  const [loadingOverlay, setLoadingOverlay] = useState(false);

  const isPaidUser = userProfile?.isPaid ?? false;

  return (
    <>
      <ScrollLoad />
      <div className="pb-3">

        <div>
          <div className="relative mb-2 h-40 bg-[url('/images/menus/help.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
            <div className="absolute flex flex-col items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
              <h1 className="text-4xl font-bold text-center pulse-glow">
                Welcome to the InfoDex
              </h1>
              <p className="text-sm mt-2">
                Assistance initiated. Optimization incoming.                </p>
            </div>
          </div>
        </div>


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

        <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-md p-6 ">

          <InfoDexComponent />

          <div className="mt-10 text-center bg-white/10 p-3 rounded-3xl glowing-box">
            {isPaidUser &&
              <>
                <div className="text-lg">
                  Proceed to Cancellation Screen.
                </div>
                <div className="mt-3 mb-2">
                  <CancelButton triggerOverlay={() => setLoadingOverlay(true)} />
                </div>

              </>
            }
          </div>
        </section>
      </div>
    </>
  );
}