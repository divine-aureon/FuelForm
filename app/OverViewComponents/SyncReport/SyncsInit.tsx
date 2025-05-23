'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData } from "../../initializing/Global/BodySyncManifest"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function Loading() {
    const router = useRouter();
    const { user } = useAuth();


    const setUserProfileSTORE = getGlobalDataState().setUserProfileSTORE;


    const setSyncHistorySTORE = getGlobalDataState().setSyncHistorySTORE;


    const latestDate = (getGlobalDataState().syncHistorySTORE?.[0] as SyncData)?.id;

    const getTodayDateString = () => new Date().toISOString().split("T")[0];
    const todayId = getTodayDateString(); // e.g., "2025-05-21"
    const existing = getGlobalDataState().syncHistorySTORE?.find(
        s => (s as SyncData).id === todayId
    ) as SyncData| undefined;

    const setLatestSyncSTORE = getGlobalDataState().setLatestSyncSTORE;

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {


            const userRef = doc(db, 'users', user.uid);
            const syncsRef = collection(db, 'users', user.uid, 'syncs');

            const latestSyncQuery = query(syncsRef, orderBy("timestamp", "desc"), limit(1));

            const [profileSnap, latestSyncSnap] = await Promise.all([
                getDoc(userRef),
                getDocs(latestSyncQuery),
            ]);


            const profileData = profileSnap.exists() ? profileSnap.data() : null;

            const latestSync = latestSyncSnap.docs[0]?.data();

            // Update the global state
            setUserProfileSTORE(profileData as UserProfile);
            setLatestSyncSTORE(latestSync as SyncData);

        };

        fetchStats();
        router.push('/overview');
    }, [user]);

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[url('/images/loading.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
            <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Sync in progress...</p>
        </div>
    );
}
