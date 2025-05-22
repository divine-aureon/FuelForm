import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function useTodaysSync() {
  const { user } = useAuth();

  const setHasFitnessSyncedToday = useGlobalData((s) => s.setHasFitnessSyncedToday);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTodaySync = async () => {
      const docRef = doc(db, "users", user.uid, "fitness", dateString);
      const docSnap = await getDoc(docRef);


      if (docSnap.exists()) {
        const data = docSnap.data();

        setHasFitnessSyncedToday(data.fitnessSync === true);

      } else {
        setHasFitnessSyncedToday(false);
      }
    };

    fetchTodaySync();
  }, [user?.uid, dateString]);

  return null;
}
