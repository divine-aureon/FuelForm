'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData, FitnessSyncData } from "../initializing/Global/BodySyncManifest"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function Loading() {
    const router = useRouter();
    const { user } = useAuth();

    //USER PROFILE
    const setUserProfileSTORE = getGlobalDataState().setUserProfileSTORE;

    //LATEST SYNC
    const setLatestSyncSTORE = getGlobalDataState().setLatestSyncSTORE;

    //LATEST FITNESS SYNC
    const setLatestFitnessSyncSTORE = getGlobalDataState().setLatestFitnessSyncSTORE;

    //PULLING FROM DATABASE
    useEffect(() => {
        if (!user) return;
        const fetchStats = async () => {

            //PULLING FROM DATABASE
            const userRef = doc(db, 'users', user.uid);
            const syncsRef = collection(db, 'users', user.uid, 'syncs');
            const FitRef = collection(db, 'users', user.uid, 'fitness');

            //QUERY
            const latestSyncQuery = query(syncsRef, orderBy("__name__", "desc"), limit(1));
            const latestFitnessSyncQuery = query(FitRef, orderBy("__name__", "desc"), limit(1));



            const [profileSnap, latestSyncSnap, latestFitSyncSnap] = await Promise.all([
                getDoc(userRef),
                getDocs(latestSyncQuery),
                getDocs(latestFitnessSyncQuery),
            ]);

            //UPDATE USERPROFILE
            const profileData = profileSnap.exists() ? profileSnap.data() : null;
            setUserProfileSTORE(profileData as UserProfile);

            //UPDATE LATEST SYNC
            const latestDoc = latestSyncSnap.docs[0];
            setLatestSyncSTORE({
                id: latestDoc.id,
                date: latestDoc.id,
                ...(latestDoc.data() as Omit<SyncData, 'id' | 'date'>),
            });

            //UPDATE LATEST FITNESS SYNC
            const latestFitDoc = latestFitSyncSnap.docs[0];
            setLatestFitnessSyncSTORE({
                id: latestFitDoc.id,
                date: latestFitDoc.id,
                ...(latestFitDoc.data() as Omit<FitnessSyncData, 'id'>),
            });
        };

        const runInit = async () => {
            await fetchStats(); // ensures data is fully fetched and set
            router.push('/overview');
        }
        runInit();
    }, [user]);

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[url('/images/loading.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
            <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Sync in progress...</p>
        </div>
    );
}
