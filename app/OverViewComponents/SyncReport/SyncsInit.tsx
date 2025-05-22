'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData, SyncDataWithID } from "../../initializing/Global/BodySyncManifest"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function Loading() {
    const router = useRouter();
    const { user } = useAuth();


    const setUserProfileSTORE = getGlobalDataState().setUserProfileSTORE;


    const setSyncHistorySTORE = getGlobalDataState().setSyncHistorySTORE;


    const latestDate = (getGlobalDataState().syncHistorySTORE?.[0] as SyncDataWithID)?.id;

    const getTodayDateString = () => new Date().toISOString().split("T")[0];
    const todayId = getTodayDateString(); // e.g., "2025-05-21"
    const existing = getGlobalDataState().syncHistorySTORE?.find(
        s => (s as SyncDataWithID).id === todayId
    ) as SyncDataWithID | undefined;

    const setLatestSyncSTORE = getGlobalDataState().setLatestSyncSTORE;

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {


            const userRef = doc(db, 'users', user.uid);
            const syncsRef = collection(db, 'users', user.uid, 'syncs');




            //  const allSyncsQuery = query(syncsRef, orderBy("timestamp", "desc"));
        //    const allSyncsQuery = query(
      //          syncsRef,
     //           where("__name__", ">", latestDate),
     //           orderBy("__name__")
     //       );

            const latestSyncQuery = query(syncsRef, orderBy("timestamp", "desc"), limit(1));


//syncsSnap

            const [profileSnap, latestSyncSnap] = await Promise.all([
                getDoc(userRef),
    //            getDocs(allSyncsQuery),
                getDocs(latestSyncQuery),
            ]);


            const profileData = profileSnap.exists() ? profileSnap.data() : null;

            //const allSyncs = syncsSnap.docs.map(doc => ({
            //      id: doc.id,           // e.g., "2025-05-03"
            //       date: doc.id,         // same as id; this is your date
            //       ...doc.data() as SyncData,        // spread the rest (weight, TDEE, etc)
            //   }))
            //.sort((a, b) => b.date.localeCompare(a.date)); // Newest to oldest
      //      const newSyncs = syncsSnap.docs.map(doc => ({
      //          id: doc.id,
      ////          date: doc.id,
      //          ...(doc.data() as SyncData),
     //       })) as SyncDataWithID[];
     //       console.log("New syncs pulled from Firestore:", newSyncs.length, newSyncs);


     //       if (existing && (!existing.dawnTimestamp || !existing.duskTimestamp)) {
     //           const docRef = doc(syncsRef, todayId);
     //           const updatedSnap = await getDoc(docRef);

     //           if (updatedSnap.exists()) {
     //               const updatedData = {
     //                   id: todayId,
      //                  date: todayId,
      //                  ...(updatedSnap.data() as SyncData),
      //              } as SyncDataWithID;

                    // Avoid duplicate if today’s entry already in newSyncs
      //              const alreadyIncluded = newSyncs.some(s => s.id === todayId);
      //              if (!alreadyIncluded) {
      //                  newSyncs.unshift(updatedData);
     //               }
     //           }
     //       }

            const latestSync = latestSyncSnap.docs[0]?.data();


            // const syncHistory = allSyncs as SyncData[];

            // Update the global state
            setUserProfileSTORE(profileData as UserProfile);
            setLatestSyncSTORE(latestSync as SyncData);
            // setSyncHistorySTORE(allSyncs as SyncData[])

       //     if (newSyncs.length > 0) {
      //          setSyncHistorySTORE(prev => [...newSyncs, ...(prev ?? [])]);
     //       }
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
