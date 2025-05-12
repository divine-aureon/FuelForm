import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";
import { SettingsModal } from "@/components/Modals/SettingsModal"
import SettingsPageComponent from "@/components/Modals/SettingsPageComponent"
import { UnlockModal } from "@/components/Modals/UnlockModal"
import UnlockComponent from "@/components/Modals/UnlockComponent"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);



export default function NeuroUnlockTile({
  isPaidUser,
  isSettingsOpen,
  setSettingsOpen,
  setUnlockOpen,
  isUnlockOpen,
}: {
  isPaidUser: boolean;
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  setUnlockOpen:(open: boolean) => void;
  isUnlockOpen: boolean;
}) {
    const { ref, isNarrow , width } = AutoClamp(225); // threshold can be adjusted

    return (

        <>
            {isPaidUser ? (
                <>
              <button
                                onClick={() => setSettingsOpen(true)}
                                className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                                Neuro <br />Settings<Settings size={36} className=" mt-1 text-white transition cursor-pointer" />
                              </button>
                              {isSettingsOpen && (
                                <SettingsModal onClose={() => setSettingsOpen(false)}>
                                  < SettingsPageComponent />
                                </SettingsModal>)}


                </>
            ) : (
                <>

                         <button
                          onClick={() => setUnlockOpen(true)}
                          className="w-full rounded-xl py-4 leading-none flex flex-col justify-center items-center bg-white/20 backdrop-blur hover:bg-indigo-300/50 text-white shadow-md">
                          Upgrade<br />1 Month Free<KeyRound size={36} className="mt-1 text-white transition cursor-pointer" />
                        </button>

                        {isUnlockOpen && (
                          <Elements stripe={stripePromise}>
                            <UnlockModal onClose={() => setUnlockOpen(false)}>
                              <UnlockComponent />
                            </UnlockModal>
                          </Elements>)}

                </>
            )}

        </>

    );
}
