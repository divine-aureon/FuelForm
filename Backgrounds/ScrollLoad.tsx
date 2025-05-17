// components/ScrollLoad.tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollLoad() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // runs on every route change

  return null;
}
