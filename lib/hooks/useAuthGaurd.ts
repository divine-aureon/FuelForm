// lib/hooks/useAuthGuard.ts
import { useAuth } from "@/lib/auth"; // adjust if needed
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Once loading finishes, if no user is logged in, redirect to login
    if (!loading && !user) {
      router.replace("/login"); // replace avoids back button going to protected page
    }
  }, [user, loading, router]);

  // Optionally return something if needed (like user)
  return { user, loading };
}
