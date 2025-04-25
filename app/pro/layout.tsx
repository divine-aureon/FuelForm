// app/(protected)/layout.tsx
"use client"; // Ensure this runs on the client side

import useAuthGuard from "@/lib/hooks/useAuthGuard"; // Import the auth guard
import NavPortal from '@/components/NavPortal';
import usePaidGuard from "@/lib/hooks/usePaidGuard";

export default function FreeCommandCenterPage({ children }: { children: React.ReactNode }) {
  useAuthGuard();  // Only logged-in users allowed
  usePaidGuard();  // Paid users are redirected to Pro

  return (
    <>
      {/* This will render the protected content inside the layout */}
      <div>{children}</div>
      <NavPortal />
    </>
  );
}
