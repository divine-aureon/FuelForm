// app/(protected)/layout.tsx
"use client"; // Ensure this runs on the client side

import useAuthGuard from "@/lib/hooks/useAuthGaurd"; // Import the auth guard
import NavPortal from '@/components/NavPortal';

// The layout component that will wrap all protected pages
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // This hook ensures that the user is authenticated before rendering the page content
  useAuthGuard();

  return (
    <>
      {/* This will render the protected content inside the layout */}
      <div>{children}</div>
      <NavPortal />
    </>
  );
}
