'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData, SyncsFlatMap, FitnessQuarterDocument, FitnessFlatMap, FitnessSyncData } from "../Global/BodySyncManifest"
import { useGlobalData } from "@/app/Global/GlobalData";

export default function Loading() {
    const router = useRouter();
    const { user } = useAuth();

    //USER PROFILE
    const setUserProfileSTORE = getGlobalDataState().setUserProfileSTORE;

    //LATEST SYNC
    const setLatestSyncSTORE = getGlobalDataState().setLatestSyncSTORE;
    const setSyncHistorySTORE = getGlobalDataState().setSyncHistorySTORE;


    //LATEST FITNESS SYNC
    const setLatestFitnessSyncSTORE = getGlobalDataState().setLatestFitnessSyncSTORE;
    const setFitnessHistorySTORE = getGlobalDataState().setFitnessHistorySTORE;

    // 📅 Generate today's date string
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    //QUARTER STRING
    const quarter = Math.floor((parseInt(mm) - 1) / 3) + 1;
    const quarterString = `Q${quarter}-${yyyy}`;

    //PULLING FROM DATABASE
    useEffect(() => {
        if (!user) return;
        const fetchStats = async () => {

            //PULLING FROM DATABASE
            const userRef = doc(db, 'users', user.uid);
            //QUERY


            const [profileSnap] = await Promise.all([
                getDoc(userRef),
            ]);

            //UPDATE USERPROFILE
            const profileData = profileSnap.exists() ? profileSnap.data() : null;
            setUserProfileSTORE(profileData as UserProfile);


            if (!profileData?.token) {
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { token: true }, { merge: true });
                window.location.reload(); // refresh so init runs cleanly
                return;
            }


            if (profileData?.isPaid) {

                //Sync History
                const docRef = doc(db, "users", user.uid, "syncs", quarterString);
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    const quarterData = snap.data(); // { "2025-05-21": {...}, ... }

                    const flattened: SyncsFlatMap = {};

                    Object.entries(quarterData).forEach(([dateId, entry]) => {
                        flattened[dateId] = {
                            ...(entry as SyncData),
                            id: dateId,
                        };
                    });

                    setSyncHistorySTORE(flattened); // or setSyncsSTORE(flattened)

                    const latest = Object.values(flattened)
                        .sort((a, b) => b.id.localeCompare(a.id))[0];

                    if (latest) {
                        setLatestSyncSTORE(latest); // ✅ store latest entry
                    }
                }


                //FitnessHistory
                const FitRef = doc(db, "users", user.uid, "fitness", quarterString);
                const Fitsnap = await getDoc(FitRef);

                if (Fitsnap.exists()) {
                    const quarterData = Fitsnap.data(); // { "2025-05-21": {...}, ... }

                    const flattened: FitnessFlatMap = {};

                    Object.entries(quarterData).forEach(([dateId, entry]) => {
                        flattened[dateId] = {
                            ...(entry as FitnessSyncData),
                            id: dateId,
                        };
                    });

                    setFitnessHistorySTORE(flattened); // or setSyncsSTORE(flattened)

                    const latest = Object.values(flattened)
                        .sort((a, b) => b.id.localeCompare(a.id))[0];

                    if (latest) {
                        setLatestFitnessSyncSTORE(latest); // ✅ store latest entry
                    }
                }
            }
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
