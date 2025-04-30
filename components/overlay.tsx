"use client";

import { useRouter } from 'next/navigation';
import { FreeModal } from "@/components/OverlaySyncSimModal"
import SyncSimulator from "@/components/SyncSimulator"
import { useState } from "react";

export default function Overlay({ isPaidUser }: { isPaidUser: boolean }) {
  const router = useRouter();
  const [modalStatus, setModalStatus] = useState(false);
  if (isPaidUser) return null; // No overlay if paid

  function goToTransition() {
    router.push('/transition');
  }


  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md flex items-center justify-center slow pointer-events-none">
      <div className="bg-white/10 rounded-2xl p-8 shadow-lg border border-white/20 backdrop-blur-sm flex flex-col item-center animate-fade-in">

        <p className="text-white/80 text-3xl text-center mb-8 pulse-glow">
          Hello, Commander. <br /> 
          Access to Sync Simulator Granted.
        </p>
        <button onClick={() => setModalStatus(true)}
          className="px-8 py-4 bg-blue-500 z-60 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 pointer-events-auto  hover:scale-105 glowing-button"
        >
          Open SyncSimulator
        </button>

        <h2 className="text-3xl pt-9 font-bold text-white mb-6 text-center">
          Unlock Full Access
        </h2>
        <p className="text-white/80 text-center mb-8">
          Upgrade now to activate all command center features.
        </p>
        <button
          onClick={goToTransition}
          className="px-8 py-4 bg-blue-500 z-60 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 pointer-events-auto  hover:scale-105 animate-pulse"
        >
          Access All Features
        </button>
      </div>
      <FreeModal isOpen={modalStatus} onClose={() => setModalStatus(false)}>
          {/* Here's where you drop your whole SyncSimulator page */}
          <SyncSimulator />
        </FreeModal>
    </div >
    

  );
}