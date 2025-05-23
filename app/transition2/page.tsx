'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function SanitizeSyncsPage() {
  const router = useRouter();

  useEffect(() => {
    const sanitizeAndWrite = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;
        const userId = user.uid;

        const quarterId = "Q2-2025"; // Change this if needed
        const docRef = doc(db, "users", userId, "syncs", quarterId);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          console.warn("Quarter not found.");
          return;
        }

        const original = snap.data();
        const sanitized: Record<string, any> = {};

        Object.entries(original).forEach(([dateId, entry]) => {
          const e = entry as Record<string, any>;

          sanitized[dateId] = {
            ...e,
            weight_kg: e.weight_kg ? Math.round(parseFloat(e.weight_kg) * 100) / 100 : null,
            weight_lbs: e.weight_lbs ? Math.round(parseFloat(e.weight_lbs) * 100) / 100 : null,
            sleepQuality: e.sleepQuality ? parseFloat(e.sleepQuality) : null,
            sleepDuration: e.sleepDuration ? parseFloat(e.sleepDuration) : null,
          };
        });

        const outputRef = doc(db, "users", userId, "syncs", quarterId);
        await setDoc(outputRef, sanitized, { merge: false }); // full overwrite

        router.push("/overview");
      });

      return () => unsubscribe();
    };

    sanitizeAndWrite();
  }, [router]);

  return <div className="p-4 text-center">Sanitizing sync data...</div>;
}
