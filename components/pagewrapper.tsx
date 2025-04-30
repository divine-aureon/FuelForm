"use client";

import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-y-auto scrollbar-hide bg-black text-white">
      {children}
    </div>
  );
}
