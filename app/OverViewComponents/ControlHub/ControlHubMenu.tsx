// NavMenu.tsx
"use client";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

import { auth } from "@/lib/firebase";
import { logoutUser } from "@/lib/auth"
import { useRouter } from 'next/navigation';
import { Lock, Rotate3d, ListChecks, Dumbbell, Utensils, Globe, LogOut } from 'lucide-react';
import SyncSimTile from "@/app/OverViewComponents/FastLinks/SyncSimulatorButton"
import UnlockTile from "@/app/OverViewComponents/FastLinks/UnlockPageButton"
import CustomSettingsTile from "@/app/OverViewComponents/FastLinks/CustomSettings"
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, CircleCheckBig, CircleArrowLeft, CircleArrowRight, SmilePlus, Webhook, StepForward, StepBack } from "lucide-react";
import PrimeTasksTile from "@/app/OverViewComponents/CoreTiles/DailyGoalsButton"
import StrengthArchiveTile from "@/app/OverViewComponents/CoreTiles/StrengthArchiveButton"
import MacroVaultTile from "@/app/OverViewComponents/CoreTiles/NutritionLogButton"

export default function ControlHubMenu() {

  const router = useRouter();

    const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

  const selectedPage = useGlobalData((s) => s.selectedPage);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  const isOpen = useGlobalData((s) => s.isOpen);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsOpen(false);
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className=" flex flex-col gap-1 z-60 mb-4 mt-3">


      <div className="text-white rounded-lg p-2 text-center">
        {/*FIRST ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2 ">


          {/*TILE 1*/}

          <UnlockTile />

          {/*TILE 2*/}





          <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/20 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => {
              setSelectedPage("InfoDex");
              setIsOpen(false);
            }}
          >
            InfoDex<SmilePlus size={36} className=" mt-1 text-white transition cursor-pointer" />
          </button>


          {/*TILE 3*/}

          <PrimeTasksTile />


        </div>  {/*SECOND ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2">

          {/*TILE 4*/}

          <SyncSimTile />



          {/*TILE 5*/}




          <CustomSettingsTile />

          {/*TILE 6*/}



          <MacroVaultTile />

        </div>
        {/*THIRD ROW*/}
        <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2">


          {/*TILE 7*/}

          <button className="h-[100px]  w-full rounded-xl py-4 leading-none bg-white/20 justify-center flex flex-col items-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
            onClick={() => {
              setSelectedPage("Crowns");
              setIsOpen(false);
            }}
          >
            Crowns<Crown size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>




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



          <StrengthArchiveTile />


        </div>
        <div className="grid grid-cols-1 gap-2 w-full rounded-xl mb-2">

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
        onClick={() => {
          logoutUser();
          setIsOpen(false);
          router.push('/');
        }}

        className="block w-full p-3 text-red-400 z-20 rounded-xl  flex items-center justify-center hover:bg-indigo-300/20 hover:text-red-300 transition"
      >  <LogOut size={15} />Exit Console
      </button>
    </div>

  );
}
