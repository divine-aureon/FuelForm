import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";

export default function TodaysSync() {
  const { user } = useAuth();
  const [hasDawnSyncedToday, setHasDawnSyncedToday] = useState(false);
  const [hasDuskSyncedToday, setHasDuskSyncedToday] = useState(false);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTodaySync = async () => {
      const docRef = doc(db, "users", user.uid, "syncs", dateString);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setHasDawnSyncedToday(data.dawnSync === true);
        setHasDuskSyncedToday(data.duskSync === true);
      } else {
        setHasDawnSyncedToday(false);
        setHasDuskSyncedToday(false);
      }
    };

    fetchTodaySync();
  }, [user?.uid, dateString]);

  return { hasDawnSyncedToday, hasDuskSyncedToday };
}
