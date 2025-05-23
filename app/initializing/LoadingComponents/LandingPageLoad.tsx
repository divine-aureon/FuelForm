'use client';
import CoreData from "@/lib/hooks/CoreData"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

export default function LoadingComponent() {

    const { userProfile } = CoreData();
    const setUserProfile = useGlobalData((s) => s.setUserProfile);


    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setUserProfile(userProfile as UserProfile);
            // do something here after 800ms
            console.log("Time's up!");
            router.push('/home');
        }, 400);

        return () => clearTimeout(timeout);
    }, [userProfile]);
    return (
        <div className="fixed inset-0 w-screen h-screen bg-[url('/images/homeload2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
            <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Initializing Biometric Scan...</p>
        </div>
    );
}