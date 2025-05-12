import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, StepForward, StepBack } from "lucide-react";


export default function PrimeTasksCard({ isPaidUser }: { isPaidUser: boolean }) {

    const { ref, isNarrow , width } = AutoClamp(225); // threshold can be adjusted

    return (

        <>
            {isPaidUser ? (
                <>
                    <Link href="/primetasks">
                        <div className="relative h-32 bg-[url('/images/menus/tasks.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white glowing-button"
                        >
                            <div
                                ref={ref}
                                className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                                <div
                                    className={`flex items-center gap-2 font-semibold
                                        ${isNarrow ? "text-xl" : "text-2xl"
                                        }`}
                                >
                                    <ListChecks />
                                    PrimeTasks

                                </div>
                                <h2 className="text-sm font-bold text-white">Define. Align. Execute.</h2>
                            </div>
                        </div>
                    </Link>


                </>
            ) : (
                <>

                    <Link href="/primetasks">
                        <div
                            ref={ref}
                            className="relative h-32 bg-[url('/images/menus/tasks.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white glowing-button"
                        >
                            <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl hover:bg-indigo-300/50">
                                <div
                                    className={`flex items-center gap-2 font-semibold ${isNarrow
                                        ? "text-[clamp(1.125rem,4vw,1.5rem)]"
                                        : "text-[clamp(1.25rem,6vw,1.875rem)]"
                                        }`}
                                >
                                    <ListChecks />
                                    PrimeTasks
                                </div>
                                <h2 className="text-sm font-bold text-white">Access Granted.</h2>
                            </div>
                        </div>
                    </Link>

                </>
            )}

        </>

    );
}
