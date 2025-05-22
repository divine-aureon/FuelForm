
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData, SyncDataWithID } from "../../initializing/Global/BodySyncManifest"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import SyncReportNEW from "../../OverViewComponents/SyncReport/SyncReportsPageNEW";



export default function SyncReportStartup() {

    const router = useRouter();
    const { user } = useAuth();

    const setSyncHistorySTORE = getGlobalDataState().setSyncHistorySTORE;

    const latestDate = (getGlobalDataState().syncHistorySTORE?.[0] as SyncDataWithID)?.id;

    const getTodayDateString = () => new Date().toISOString().split("T")[0];
    const todayId = getTodayDateString(); // e.g., "2025-05-21"
    const existing = getGlobalDataState().syncHistorySTORE?.find(
        s => (s as SyncDataWithID).id === todayId
    ) as SyncDataWithID | undefined;

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {

            const syncsRef = collection(db, 'users', user.uid, 'syncs');

            //const allSyncsQuery = query(syncsRef, orderBy("timestamp", "desc"));
            const allSyncsQuery = latestDate
                ? query(syncsRef, where("__name__", ">", latestDate), orderBy("__name__"))
                : query(syncsRef, orderBy("__name__"));

            const [syncsSnap] = await Promise.all([

                getDocs(allSyncsQuery),

            ]);

            //    const allSyncs = syncsSnap.docs.map(doc => ({
            //       id: doc.id,           // e.g., "2025-05-03"
            //        date: doc.id,         // same as id; this is your date
            //        ...doc.data() as SyncData,        // spread the rest (weight, TDEE, etc)
            //    }))
            // .sort((a, b) => b.date.localeCompare(a.date)); // Newest to oldest
            const newSyncs = syncsSnap.docs.map(doc => ({
                id: doc.id,
                date: doc.id,
                ...(doc.data() as SyncData),
            })).sort((a, b) => b.date.localeCompare(a.date)) as SyncDataWithID[];
            console.log("New syncs pulled from Firestore:", newSyncs.length, newSyncs);


            if (!getGlobalDataState().latestSyncSTORE?.dawnTimestamp || !getGlobalDataState().latestSyncSTORE?.duskTimestamp) {
                const docRef = doc(syncsRef, todayId);
                const updatedSnap = await getDoc(docRef);

                if (updatedSnap.exists()) {
                    const updatedData = {
                        id: todayId,
                        date: todayId,
                        ...(updatedSnap.data() as SyncData),
                    } as SyncDataWithID;

                    newSyncs.unshift(updatedData); // ✅ no need to check for duplicate — deduper will clean
                }
            }


            // Update the global state

            //setSyncHistorySTORE(allSyncs as SyncData[])

            if (newSyncs.length > 0) {
                const deduped = [
                    ...new Map(
                        ([...newSyncs, ...(getGlobalDataState().syncHistorySTORE ?? [])] as SyncDataWithID[])
                            .map(item => [item.id, item])
                    ).values()
                ];

                setSyncHistorySTORE(deduped);

            }
            setDataLoaded(true)
        };

        (async () => {
            await fetchStats();
        })();

    }, [user]);

    if (!dataLoaded) return null; // show nothing until ready
    return <SyncReportNEW />;
};