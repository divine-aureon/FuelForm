import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";

export default function useDuskSyncPoints() {


  const latestSyncSTORE = getGlobalDataState().latestSyncSTORE;
  const latestSync = latestSyncSTORE;

  const setHasDuskSyncedToday = useGlobalData((s) => s.setHasDuskSyncedToday);


  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  const isToday = latestSync?.id === dateString;

  //DUSK SYNC
  useEffect(() => {
    if (isToday) {
      if (latestSync?.duskSync) {
        setHasDuskSyncedToday(true);
      } else {
        setHasDuskSyncedToday(false);
      }
    } else {
      setHasDuskSyncedToday(false);
    }
  }, [isToday , latestSync?.duskSync]);

  return null;
}
