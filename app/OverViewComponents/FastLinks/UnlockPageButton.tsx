
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"
import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";

import SettingsPageComponent from "@/app/OverViewComponents/Settings/CustomSettingsComponent"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);



export default function UnlockTile() {
         const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE


  const selectedPage = useGlobalData((s) => s.selectedPage);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  const setIsOpen = useGlobalData((s) => s.setIsOpen);


  return (

    <>
      {userProfile?.isPaid ? (
        <>
          <Link href="billing.stripe.com/p/login/eVa8x80MQ5PmgPmdQQ"

            className="w-full h-[100px]  rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
            Customer<br />Portal<Settings size={36} className=" mt-1 text-white transition cursor-pointer" />
          </Link>

        </>
      ) : (
        <>

          <button onClick={() => {
            setSelectedPage("Unlock");
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
            className="w-full h-[100px]  rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
            Upgrade<br />1 Month Free<KeyRound size={36} className="mt-1 text-white transition cursor-pointer" />
          </button>


        </>
      )}

    </>

  );
}
