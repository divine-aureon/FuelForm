import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, Webhook, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";

import SettingsPageComponent from "@/app/OverViewComponents/Settings/CustomSettingsComponent"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

export default function CustomSettingsTile() {
         const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);

  return (

    <>
      {userProfile?.isPaid ? (
       
        <>

          <button
            onClick={() => {
              setSelectedPage("customsettings");
              setIsOpen(false);
            }}
            className="w-full h-[100px] rounded-xl py-4 leading-none gap-1 flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
            Custom<br />Settings<Webhook size={36} />
          </button>



        </>
      ) : (
        <>

          <button
            className="w-full h-[100px] rounded-xl py-4 gap-1 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur text-white shadow-md">
            Custom<br />Settings<Webhook size={36} />
          </button>

        </>
      )}

    </>

  );
}
