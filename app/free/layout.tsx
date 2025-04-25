// app/(protected)/layout.tsx
"use client"; // Ensure this runs on the client side

import useAuthGuard from "@/lib/hooks/useAuthGuard"; // Import the auth guard
import FreeNavPortal from '@/components/FreeNavPortal';
import useFreeGuard from "@/lib/hooks/useFreeGuard";

export default function FreeCommandCenterPage({ children }: { children: React.ReactNode }) {
  useAuthGuard();  // Only logged-in users allowed
  useFreeGuard();  // Paid users are redirected to Pro

  return (
    <>
      {/* This will render the protected content inside the layout */}
      <div>{children}</div>
      <FreeNavPortal />
    </>
  );
}
