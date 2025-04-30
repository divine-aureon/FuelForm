"use client";

import useAuthGuard from "@/lib/hooks/AuthGuard";
import NavPortal from '@/components/NavPortal';
import Overlay from "@/components/overlay";  
import { Exo_2 } from 'next/font/google';
import { useState, useEffect } from "react";
import useProfile from '@/lib/hooks/ProfileData'; 
import PageWrapper from "@/components/pagewrapper"

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});



export default function FreeCommandCenterLayout({ children }: { children: React.ReactNode }) {
  useAuthGuard();
  
  const { profile, loading } = useProfile(); // DIRECT fetch here
  const isPaidUser = profile?.isPaid ?? null;  // Default to false if undefined
  
  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingDone(true);
    }, 1000); // 1 second

    return () => clearTimeout(timer); // Clean up just in case
  }, []);

  const stillLoading = (isPaidUser === undefined || isPaidUser === null) || !minimumLoadingDone;

  if (stillLoading) {
    return (
      <div className="bg-[url('/images/loading.webp')] 
      bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <p className="text-xl font-bold text-white animate-pulse">Securing Access Codes...</p>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
      </div>
    </div>
    );
  }

  return (
    <PageWrapper>
    <>
      <div className={exo2.className}>
        <Overlay isPaidUser={isPaidUser} />
        <div>{children}</div>
        <NavPortal />
      </div>
    </>
    </PageWrapper>
  );
}
