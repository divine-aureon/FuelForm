// NavMenu.tsx
"use client";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { Lock, Rotate3d, ListChecks, Dumbbell, Utensils, Globe, LogOut } from 'lucide-react';
import { useState, useEffect } from "react";
import { FitnessGoalsModal } from "@/ArchivedComponents/Modals/MacroSettingsModal"
import FitnessGoalsPageComponent from "@/app/OverViewComponents/Settings/MacroSettingsComponent"
import { OverrideModal } from "@/ArchivedComponents/Modals/OverrideModal"
import OverrideComponent from "@/app/OverViewComponents/Sync/OverrideComponent"
import { BioModal } from "@/ArchivedComponents/Modals/BiometricsModal"
import BiometricsComponent from "@/app/OverViewComponents/Settings/BiometricsComponent"
import { CoreFeaturesModal } from "@/ArchivedComponents/Modals/CoreFeaturesModal"
import CoreFeaturesComponent from "@/app/OverViewComponents/CoreTiles/CoreFeaturesComponent"
import SyncSimTile from "@/app/OverViewComponents/FastLinks/SyncSimulatorButton"
import UnlockTile from "@/app/OverViewComponents/FastLinks/UnlockPageButton"
import CustomSettingsTile from "@/app/OverViewComponents/FastLinks/CustomSettings"
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, CircleCheckBig, CircleArrowLeft, CircleArrowRight, SmilePlus, Webhook, StepForward, StepBack } from "lucide-react";

export default function ControlHubMenu() {

  const router = useRouter();

  const userProfile = useGlobalData((s) => s.userProfile);

  const selectedPage = useGlobalData((s) => s.selectedPage);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  const isSettingsOpen = useGlobalData((s) => s.isSettingsOpen);
  const setSettingsOpen = useGlobalData((s) => s.setSettingsOpen);

  const isFitnessOpen = useGlobalData((s) => s.isFitnessOpen);
  const setFitnessOpen = useGlobalData((s) => s.setFitnessOpen);

  const isOverrideOpen = useGlobalData((s) => s.isOverrideOpen);
  const setOverrideOpen = useGlobalData((s) => s.setOverrideOpen);

  const isBioOpen = useGlobalData((s) => s.isBioOpen);
  const setBioOpen = useGlobalData((s) => s.setBioOpen);

  const isUnlockOpen = useGlobalData((s) => s.isUnlockOpen);
  const setUnlockOpen = useGlobalData((s) => s.setUnlockOpen);

  const isCoreOpen = useGlobalData((s) => s.isCoreOpen);
  const setCoreOpen = useGlobalData((s) => s.setCoreOpen);

  const isDawnOpen = useGlobalData((s) => s.isDawnOpen);
  const setDawnOpen = useGlobalData((s) => s.setDawnOpen);

  const isDuskOpen = useGlobalData((s) => s.isDuskOpen);
  const setDuskOpen = useGlobalData((s) => s.setDuskOpen);

  const isOpen = useGlobalData((s) => s.isOpen);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);



  useEffect(() => {
    if (isCoreOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isCoreOpen]);


  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isBioOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isBioOpen]);


  useEffect(() => {
    if (isFitnessOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isFitnessOpen]);


  useEffect(() => {
    if (isOverrideOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isOverrideOpen]);

  useEffect(() => {
    if (isDawnOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDawnOpen]);

  useEffect(() => {
    if (isDuskOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDuskOpen]);





  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsOpen(false);
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const AccessToken = userProfile?.token ?? null;
  if (typeof AccessToken !== 'boolean') return;

  return (
    <div className=" flex flex-col gap-1 z-60 mb-4 mt-3">


      <div className="text-white rounded-lg p-2 text-center">
        {/*FIRST ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2 ">
          {/*TILE 1*/}
          <SyncSimTile />


          {/*TILE 6*/}   
          <UnlockTile/>


          {/*TILE 3*/}


              <button
                onClick={() => {
                  setSelectedPage("biometrics");
                  setIsOpen(false);
                }}
                className="w-full h-[100px] rounded-xl py-4 gap-1 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                Modify Biometrics<Fingerprint size={36} />
              </button>

        </div>  {/*SECOND ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2">

          {/*TILE 4*/}
          <button className="h-[100px]  w-full rounded-xl py-4 leading-none bg-white/20 justify-center flex flex-col items-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => {
              setSelectedPage("Crowns");
              setIsOpen(false);
            }}
          >
            Crowns<Crown size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>


          {/*TILE 5*/}


          <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/20 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => {
              setSelectedPage("InfoDex");
              setIsOpen(false);
            }}
          >
            InfoDex<SmilePlus size={36} className=" mt-1 text-white transition cursor-pointer" />
          </button>



          {/*TILE 2*/}
          <CustomSettingsTile/>


        </div>
        {/*THIRD ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2">


          {/*TILE 7*/}

          {userProfile?.isPaid ? (
            <>

              <button
                onClick={() => {
                  setSelectedPage("nutrientsettings");
                  setIsOpen(false);
                }}
                className="w-full h-[100px] rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                Nutrient Settings<Flame size={36} />
              </button>

            </>
          ) : (
            <>

              <button
                disabled
                className="h-[100px] cursor-default w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur text-white shadow-md">
                Nutrient Settings<Lock size={36} className=" mt-1 text-white transition cursor-pointer" />
              </button>

            </>
          )}

          {/*TILE 8*/}

          {userProfile?.isPaid ? (
          
              <button
                onClick={() => {
                  setSelectedPage("override");
                  setIsOpen(false);
                }}
                className="w-full h-[100px] rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                Sync Override<Atom size={36} />
              </button>

            
        
          ) : (

              <button
                disabled
                className="w-full h-[100px] rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur text-white shadow-md">
                Sync Override<Lock size={36} className=" mt-1 text-white transition cursor-pointer" />
              </button>

          )}

          {/*TILE 9*/}




        </div>
        <div className="grid grid-cols-2 gap-2 w-full rounded-xl mb-2">


          <button
            onClick={() => {
              setSelectedPage("corefeatures");
              setIsOpen(false);
            }}
            className="w-full h-[100px] glowing-button2 rounded-xl py-4 leading-sm flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
            CoreFeatures<Webhook size={36} />
          </button>


          <button
            onClick={() => {
              setSelectedPage("bodysync");
              setIsOpen(false);
            }}
            className="w-full h-[100px] glowing-button2 rounded-xl py-4 leading-sm flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
            OverView<Globe size={36} />
          </button>

        </div>
      </div>
      <button
        onClick={handleLogout}
        className="block w-full p-3 text-red-400 z-20 rounded-xl  flex items-center justify-center hover:bg-indigo-300/20 hover:text-red-300 transition"
      >  <LogOut size={15} />Exit Console
      </button>
    </div>

  );
}
