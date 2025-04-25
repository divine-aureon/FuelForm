"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useFuelFormData from "@/lib/hooks/useFuelFormData";

export default function usePaidGuard() {
  const router = useRouter();
  const { profile } = useFuelFormData();

  useEffect(() => {
    if (!profile) return; // Still loading

    if (!profile.isPaid) {
      router.push("/commandcenter"); // Redirect free users back to free dashboard
    }
  }, [profile, router]);
}
