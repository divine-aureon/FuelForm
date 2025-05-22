"use client"; // if needed depending on your Next.js version

import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import InfoDexComponent from "@/app/OverViewComponents/InfoDexComponent"
import ScrollLoad from "@/Backgrounds/ScrollLoad"


export default function InfoDexPublic() {

    return (
        <>
            <ScrollLoad />
            <div className="pb-3">

                <div>
                    <div className="relative mb-2 h-40 bg-[url('/images/menus/help.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button">
                        <div className="absolute flex flex-col items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                            <h1 className="text-4xl font-bold text-center pulse-glow">
                                Welcome to the InfoDex
                            </h1>
                            <p className="text-sm mt-2">
                                Assistance initiated. Optimization incoming.                </p>
                        </div>
                    </div>
                </div>

                <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-md p-6 ">

                    <InfoDexComponent />

                </section>
            </div>
        </>
    );
}