import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function useDawnSyncPoints() {

  const latestSyncSTORE = getGlobalDataState().latestSyncSTORE;
  const latestSync = latestSyncSTORE;

  const setHasDawnSyncedToday = useGlobalData((s) => s.setHasDawnSyncedToday);


  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  const isToday = latestSync?.id === dateString;

  //DAWN SYNC
  useEffect(() => {
    if (isToday) {

      if (latestSync?.dawnSync) {
        setHasDawnSyncedToday(true);

      } else {
        setHasDawnSyncedToday(false);

      }
    } else {
      setHasDawnSyncedToday(false);
    }
  }, [isToday, latestSync?.dawnSync]);


  return null;
}
