import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";


export default function SyncSimTile() {
    const { ref, isNarrow, width } = AutoClamp(225); // threshold can be adjusted
    const router = useRouter();
          const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE
    const selectedPage = useGlobalData((s) => s.selectedPage);
    const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
    const isOpen = useGlobalData((s) => s.isOpen);
    const setIsOpen = useGlobalData((s) => s.setIsOpen);

    return (
        <>
            {userProfile?.isPaid ? (
                <>
                    <button className="w-full h-[100px] rounded-xl py-4 leading-none bg-white/20 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
                        onClick={() => {
                            setSelectedPage("SyncSim");
                            setIsOpen(false);
                        }}
                    >
                        Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
                    </button>
                </>
            ) : (
                <>
                    <button className="w-full h-[100px]  rounded-xl py-4  leading-none bg-white/20 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
                        onClick={() => {
                            setSelectedPage("SyncSim");
                            setIsOpen(false);
                        }}
                    >
                        Free Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
                    </button>
                </>
            )}
        </>
    );
}
