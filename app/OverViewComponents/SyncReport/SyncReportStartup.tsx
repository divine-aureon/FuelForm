
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming this is your Firestore instance
import useAuth from '@/lib/useAuth';
import type { UserProfile, SyncData } from "../../initializing/Global/BodySyncManifest"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import SyncReportNEW from "../../OverViewComponents/SyncReport/SyncReportsPageNEW";



export default function SyncReportStartup() {
    const { user } = useAuth();

    const setSyncHistorySTORE = getGlobalDataState().setSyncHistorySTORE;

    // 📅 Generate today's date string
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {

            const syncsRef = collection(db, 'users', user.uid, 'syncs');

            const newSyncs: SyncData[] = [];

            const syncHistorySTORE = getGlobalDataState().syncHistorySTORE?.[0];


            console.log("🔁 Existing syncs in store:", syncHistorySTORE);

            const latestDate = syncHistorySTORE?.id;


            const isTodayIncomplete =
                latestDate === dateString &&
                (!syncHistorySTORE?.dawnTimestamp || !syncHistorySTORE?.duskTimestamp);


            if (isTodayIncomplete) {
                const docRef = doc(syncsRef, dateString);
                const updatedSnap = await getDoc(docRef);
                if (updatedSnap.exists()) {
                    const updatedData = {
                        id: dateString,
                        date: dateString,
                        ...(updatedSnap.data() as Omit<SyncData, 'id' | 'date'>),
                    } as SyncData;
                    newSyncs.unshift(updatedData);
                }
            } else {
                const allSyncsQuery = latestDate
                    ? query(syncsRef, where("__name__", ">", latestDate), orderBy("__name__"))
                    : query(syncsRef, orderBy("__name__"));

                const syncsSnap = await getDocs(allSyncsQuery);
                const firestoreSyncs = syncsSnap.docs.map(doc => ({
                    id: doc.id,
                    date: doc.id,
                    ...(doc.data() as Omit<SyncData, 'id' | 'date'>),
                })).sort((a, b) => b.date.localeCompare(a.date)) as SyncData[];

                console.log("🆕 Pulled from Firestore:", firestoreSyncs.length);

                newSyncs.push(...firestoreSyncs);
            }


            //  if (!getGlobalDataState().latestSyncSTORE?.dawnTimestamp || !getGlobalDataState().latestSyncSTORE?.duskTimestamp) {
            //     const docRef = doc(syncsRef, dateString);
            //     const updatedSnap = await getDoc(docRef);
            //
            //              if (updatedSnap.exists()) {
            //                const updatedData = {
            //                  id: dateString,
            //                date: dateString,
            //              ...(updatedSnap.data() as Omit<SyncData, 'id'>),
            //        } as SyncData;
            //
            //                  newSyncs.unshift(updatedData); // ✅ no need to check for duplicate — deduper will clean
            //            }
            //      }

            //   const allSyncsQuery = latestDate
            //      ? query(
            //          syncsRef,
            //          where("__name__", ">", latestDate), 
            //          orderBy("__name__")
            //      )
            //      : query(syncsRef, orderBy("__name__"));

            //  const [syncsSnap] = await Promise.all([
            //      getDocs(allSyncsQuery),

            //    ]);

            //     const firestoreSyncs = syncsSnap.docs.map(doc => ({
            //       id: doc.id,
            //     date: doc.id,
            //   ...(doc.data() as Omit<SyncData, 'id'>),
            // })).sort((a, b) => b.date.localeCompare(a.date)) as SyncData[];




            //    newSyncs.push(...firestoreSyncs);



            // Update the global state
            const deduped = [
                ...new Map(
                    //([...newSyncs, ...(getGlobalDataState().syncHistorySTORE ?? [])] as SyncData[])
                    ([...getGlobalDataState().syncHistorySTORE ?? [], ...newSyncs] as SyncData[])

                        .map(item => [item.id, item])

                ).values()

            ];

            deduped.sort((a, b) => b.date.localeCompare(a.date));

            setSyncHistorySTORE(deduped);
            setDataLoaded(true)
        };

        (async () => {
            await fetchStats();
        })();
    }, [user]);

    if (!dataLoaded) return null; // show nothing until ready
    return <SyncReportNEW />;
};