"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export default function useIsLoggedIn(shouldRedirect = true): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loggedIn = !!user;
      setIsLoggedIn(loggedIn);

      if (!loggedIn && shouldRedirect) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, shouldRedirect]);

  return isLoggedIn;
}
