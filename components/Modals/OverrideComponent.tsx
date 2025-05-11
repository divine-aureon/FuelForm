'use client';

import { useRouter } from "next/navigation";
import { CircleAlert, CircleOff } from "lucide-react";
import TodaysSync from '@/lib/hooks/TodaysSync'
import { useState, useEffect } from "react";
import PageFadeWrapper from "@/components/Loading/PageFadeWrapper"

type OverrideButtonPanelProps = {
    onClose: () => void;
    setDawnOpen: (val: boolean) => void;
    setDuskOpen: (val: boolean) => void;
  };

export default function OverrideComponent ({ onClose, setDawnOpen, setDuskOpen }: OverrideButtonPanelProps) {
    const router = useRouter();

    const { hasDuskSyncedToday, hasDawnSyncedToday } = TodaysSync();


    return (  
        <div className="flex items-center justify-center min-h-screen flex-col">
           
                <div className="h-36 relative w-full bg-[url('/images/menus/override.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white text-3xl glowing-button mb-1">
                    <div className="absolute inset-0 pt-1 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                        <div className="flex items-center pulse-glow px-3 pt-3">Initating Sync Override Protocol...</div>
                        <h2 className="text-sm font-bold text-white">
                        When the system wont bend, override it.                       </h2>
                    </div>
                </div>
      


            <div className="bg-white/30 w-full rounded-xl p-3 mb-[110px]">
    
                <div className="gap-4 ">
                    {hasDawnSyncedToday ? (
                        <button
                        className="flex items-center justify-center gap-2 mb-4 w-full bg-indigo-300/30 text-black rounded-lg hover:bg-indigo-700/80 px-4 py-2 glowing-button relative transition"
                        onClick={() => {
                          onClose();         // close override modal
                          setDawnOpen(true); // open dawn sync modal
                        }}
                      >
                        <CircleAlert size={20} /> DawnSync Override Available
                      </button>

                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 mb-4 w-full bg-black/30 text-white px-4 py-2 rounded-lg cursor-default "
                        >
                            <CircleOff size={20} /> DawnSync Not Found
                        </button>
                    )}

                    {hasDuskSyncedToday ? (

                        <button
                            className="flex items-center justify-center gap-2 w-full bg-white text-black rounded-lg hover:bg-indigo-300/80 cursor-default px-4 py-2  transition glowing-button"
                            onClick={() => {
                                onClose();         // close override modal
                                setDuskOpen(true); // open dawn sync modal
                              }}
                        >
                            <CircleAlert size={20} /> DuskSync Override Available
                        </button>

                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 w-full bg-black/30 px-4 py-2  text-white rounded-lg "
                        >
                            <CircleOff size={20} /> DuskSync Not Found
                        </button>
                    )}
                </div>
            </div>


        </div>

    );

}