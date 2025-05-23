'use client';

import { useRouter } from "next/navigation";
import { CircleAlert, CircleOff } from "lucide-react";
import useTodaysSync from '@/app/OverViewComponents/Sync/hasDawnSynced'
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function OverrideComponent() {

    const router = useRouter();
    useTodaysSync();
    const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
    const hasDawnSyncedToday = useGlobalData((s) => s.hasDawnSyncedToday);
    const hasDuskSyncedToday = useGlobalData((s) => s.hasDuskSyncedToday);

    return (

        <div className="flex items-center justify-center flex-col">

            <div className="h-36 w-full bg-[url('/images/menus/override.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white glowing-button2 mb-1">
                <div className=" h-36 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                    <div className=" pulse-glow text-4xl pt-5 pb-2 text-center ">SyncOverride Protocol</div>
                    <h2 className="text-lg font-bold text-white">
                        When the system wont bend, override it.                       </h2>
                </div>
            </div>



            <div className="bg-white/30 w-full rounded-xl p-3 mb-[110px]">

                <div className="gap-4 ">
                    {hasDawnSyncedToday ? (
                        <button
                            className="flex items-center justify-center gap-2 mb-4 w-full bg-indigo-300/30 text-black rounded-lg hover:bg-indigo-700/80 px-4 py-2 glowing-button relative transition"
                            onClick={() => {
                                setSelectedPage("DawnSync");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}>
                            <CircleAlert size={20} /> DawnSync Override Available
                        </button>

                    ) : (
                        <button
                            disabled
                            className="relative z-10 font-bold px-4 py-2  overflow-hidden border border-indigo-400 flex items-center justify-center gap-2 mb-4 w-full bg-black/30 text-white rounded-lg cursor-default "
                        >
                            <CircleOff size={20} /> DawnSync Not Found
                        </button>
                    )}

                    {hasDuskSyncedToday ? (

                        <button
                            className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-indigo-300/80 cursor-default px-4 py-2  transition glowing-button"
                            onClick={() => {
                                setSelectedPage("DuskSync");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}>
                            <CircleAlert size={20} /> DuskSync Override Available
                        </button>

                    ) : (
                        <button
                            disabled
                            className="relative z-10 font-bold px-4 py-2  overflow-hidden border border-indigo-400 flex items-center justify-center gap-2 mb-4 w-full bg-black/30 text-white rounded-lg cursor-default "
                        >
                            <CircleOff size={20} /> DuskSync Not Found
                        </button>
                    )}
                </div>
            </div>


        </div>

    );

}