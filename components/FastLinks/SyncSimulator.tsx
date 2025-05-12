import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";


export default function SyncSimTile({ isPaidUser }: { isPaidUser: boolean }) {
    const { ref, isNarrow, width } = AutoClamp(225); // threshold can be adjusted
    const router = useRouter();
    return (
        <>
            {isPaidUser ? (
                <>
                    <button className="w-full rounded-xl py-4 glowing-button leading-none bg-white/10 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
                        onClick={() => router.push("/sync-simulator")}>
                        Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
                    </button>
                </>
            ) : (
                <>
                    <button className="w-full rounded-xl py-4 glowing-button leading-none bg-white/10 flex flex-col items-center  justify-center backdrop-blur hover:bg-indigo-300/50 text-white shadow-md"
                        onClick={() => router.push("/sync-simulator")}>
                        Free Sync Simulator<Dna size={36} className="mt-1 text-white transition cursor-pointer" />
                    </button>
                </>
            )}
        </>
    );
}
