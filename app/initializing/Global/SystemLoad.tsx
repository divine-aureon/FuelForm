'use client';

import { useEffect, useState } from "react";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function SystemLoad() {
  const ready = useGlobalData((s) => s.connectionReady);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const gateActive = !ready || show;

  if (!gateActive) return null;

  return 


}
