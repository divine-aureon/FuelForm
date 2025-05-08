'use client';

import { useEffect, useState } from 'react';
import { Fingerprint } from 'lucide-react';

export default function InitLoad() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 1500); // Duration of your loading
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null; // ❌ Stops rendering the background and div completely

  return (
    <div className="animate-fade-in fixed inset-0 z-[9999] flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="w-40 h-40 bg-white/10 rounded-full flex flex-col items-center justify-center animate-pulse shadow-xl">
          <span className="text-2xl font-semibold text-white">Initializing..</span>
          <Fingerprint size={64} className="mt-2 text-white cursor-pointer" />
        </div>
      </div>    </div>
  );
}