import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";

export default function useFitnessSyncPoints() {

const latestFitnessSyncSTORE = getGlobalDataState().latestFitnessSyncSTORE;
const latestFitnessSync = latestFitnessSyncSTORE;

const setHasFitnessSyncedToday = useGlobalData((s) => s.setHasFitnessSyncedToday);


const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const dateString = `${yyyy}-${mm}-${dd}`;

const isToday = latestFitnessSync?.id === dateString;

//DAWN SYNC
useEffect(() => {
  if (isToday) {

    if (latestFitnessSync?.fitnessSync) {
      setHasFitnessSyncedToday(true);

    } else {
      setHasFitnessSyncedToday(false);

    }
  } else {
    setHasFitnessSyncedToday(false);
  }
}, [isToday, latestFitnessSync?.fitnessSync]);


return null;
}


