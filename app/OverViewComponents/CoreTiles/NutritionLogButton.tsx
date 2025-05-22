import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";



export default function MacroVaultTile() {

    const selectedPage = useGlobalData((s) => s.selectedPage);
    const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
           const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE
    const setIsOpen = useGlobalData((s) => s.setIsOpen);

    return (

        <>
            {userProfile?.isPaid ? (
                <>



                   <button onClick={() => {
                       setSelectedPage("NutrientLog");
                       setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                        <div className="w-full h-[100px] bg-[url('/images/greyscale/nutrition.jpg')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-[100px] bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] h-[100px]  w-full rounded-xl py-4 leading-none justify-center flex flex-col items-center hover:bg-indigo-300/50 text-white shadow-md">
                                <div className="flex leading-none justify-center flex-col items-center gap-2 font-semibold" >
                                     Nutrition<br/>Log<br/>
                                    <Utensils size={36} />
                                   
                                </div>
                            </div>
                        </div>
                    </button>


                </>
            ) : (
                <>


  <button 
                    disabled>
                        <div className="w-full h-[100px] bg-[url('/images/greyscale/nutrition.jpg')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-[100px] bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] h-[100px]  w-full rounded-xl py-4 leading-none justify-center flex flex-col items-center text-white shadow-md">
                                <div className="flex leading-none justify-center flex-col items-center gap-2 font-semibold" >
                                     Nutrition<br/>Log<br/>
                                    <Lock size={36} />
                                   
                                </div>
                            </div>
                        </div>
                    </button>


                </>
            )}

        </>

    );
}
