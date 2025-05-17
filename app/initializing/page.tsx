'use client';
import CoreData from "@/lib/hooks/CoreData"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import useAuth from "@/lib/useAuth"

export default function Loading() {

    const { userProfile } = CoreData();
    const setserProfile = useGlobalData((s) => s.setUserProfile);


    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
        
            // do something here after 800ms
            console.log("Time's up!");
            router.push('/overview');
        }, 800);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="fixed inset-0 w-screen h-screen bg-[url('/images/loading.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
            <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Sync in progress...</p>
        </div>
    );
}