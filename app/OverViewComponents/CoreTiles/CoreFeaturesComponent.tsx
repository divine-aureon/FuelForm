'use client';
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

import PrimeTasksTile from "@/app/OverViewComponents/CoreTiles/DailyGoalsButton"
import StrengthArchiveTile from "@/app/OverViewComponents/CoreTiles/StrengthArchiveButton"
import MacroVaultTile from "@/app/OverViewComponents/CoreTiles/NutritionLogButton"

export default function CoreFeaturesComponent() {

       const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

    if (typeof userProfile?.isPaid !== 'boolean') return;


    return (

        <div className="flex items-center justify-center max-w-md flex-col">

            <div className="h-32 w-full bg-[url('/images/greyscale/corefeatures.webp')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white glowing-button2 mb-2">
                <div className="h-32 inset-0 pt-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                    <div className="text-center text-4xl font-semibold gap-2 pulse-glow mb-2">CoreFeatures</div>
                    <h2 className="text-sm font-bold text-white">
                        Optimize the interface to align with your rhythm, pace, and focus.
                    </h2>
                </div>
            </div>


            <div className="bg-white/30 w-full rounded-xl p-3 shadow-lg mb-[110px]">



                <div className="flex flex-col gap-4">

                    {/* TILE 1 */}

                    <PrimeTasksTile />

                    {/* TILE 2*/}

                    <StrengthArchiveTile />

                    {/* TILE 3 */}

                    <MacroVaultTile />

                </div>

            </div>
        </div>

    );
}