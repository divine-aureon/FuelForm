// app/(protected)/layout.tsx
"use client"; // Ensure this runs on the client side

import useAuthGuard from "@/lib/hooks/useAuthGuard"; // Import the auth guard
import NavPortal from '@/components/NavPortal';
import usePaidGuard from "@/lib/hooks/usePaidGuard";
import Overlay from "@/components/overlay";  // Import the overlay component

import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'], // Regular and Bold
});



export default function FreeCommandCenterLayout({ children }: { children: React.ReactNode }) {
  useAuthGuard();  // Only logged-in users allowed
  const isPaidUser = usePaidGuard();  // Get user status (true for paid, false for free)
  return (
    <>
    <div>
    <Overlay isPaidUser={isPaidUser} />  {/* Conditionally render overlay */}
      {/* This will render the protected content inside the layout */}
      <div>{children}</div>
      <NavPortal />
      </div>
    </>
  );
}