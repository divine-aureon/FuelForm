"use client";

import { ReactNode } from "react";

type InitGateProps = {
  ready: boolean;
  fallback?: ReactNode;
  children: ReactNode;
};

export default function InitGate({ ready, fallback = null, children }: InitGateProps) {
  if (!ready) return <>{fallback}</>; // Render nothing or a spinner until ready
  return <>{children}</>;
}
