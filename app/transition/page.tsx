'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function TransitionPage() {
  const router = useRouter();

  useEffect(() => {
    const runMigration = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;
        const userId = user.uid;

        const oldSyncsRef = collection(db, "users", userId, "syncs");
        const oldSyncsSnap = await getDocs(oldSyncsRef);

        const quarters: Record<string, Record<string, any>> = {};

        oldSyncsSnap.forEach((docSnap) => {
          const dateId = docSnap.id;
          const data = docSnap.data();
          const [year, monthStr] = dateId.split("-");
          const month = parseInt(monthStr, 10);
          const quarter = Math.floor((month - 1) / 3) + 1;
          const quarterId = `Q${quarter}-${year}`;

          if (!quarters[quarterId]) quarters[quarterId] = {};
          quarters[quarterId][dateId] = {
            ...data,
            id: dateId,
            quarterId,
          };
        });

        for (const quarterId in quarters) {
          const quarterDocRef = doc(db, "users", userId, "syncs", quarterId);
          await setDoc(quarterDocRef, quarters[quarterId], { merge: true });
        }

        router.push("/overview");
      });

      return () => unsubscribe();
    };

    runMigration();
  }, [router]);

  return <div className="p-4 text-center">Transitioning data to quarterly syncs…</div>;
}
