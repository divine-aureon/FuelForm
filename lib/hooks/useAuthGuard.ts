// lib/hooks/useAuthGaurd.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    // Only run on the client-side
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login"); // Redirect to login if no user is authenticated
        }
      });

      return () => unsubscribe(); // Cleanup on component unmount
    }
  }, [router]);
}
