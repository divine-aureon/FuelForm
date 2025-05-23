'use client';

import { useEffect, useState } from 'react';
import { getGlobalDataState } from "../../Global/store/globalStoreInstance";

export default function NavLoad() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let ready = false;
    let delayPassed = false;

    const checkReady = () => {
      const userProfileSTORE = getGlobalDataState().userProfileSTORE;
      const latestSyncSTORE = getGlobalDataState().latestSyncSTORE;
      const latestFitnessSyncSTORE = getGlobalDataState().latestFitnessSyncSTORE;
      return !!userProfileSTORE && !!latestSyncSTORE && !!latestFitnessSyncSTORE;
    };

    // Delay timer
    const delayTimer = setTimeout(() => {
      delayPassed = true;
      if (ready) setShow(false);
    }, 800);

    // Readiness poller
    const poll = setInterval(() => {
      if (checkReady()) {
        ready = true;
        if (delayPassed) setShow(false);
        clearInterval(poll);
      }
    }, 100);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(poll);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[url('/images/loading.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
      <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Sync in progress...</p>
    </div>
  );
}
