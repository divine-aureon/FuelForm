'use client';

import { useEffect, useState } from 'react';

export default function NavLoad() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 800); // Duration of your loading
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null; // ❌ Stops rendering the background and div completely

  return (
<div className="fixed inset-0 w-screen h-screen bg-[url('/images/loading.jpg')] bg-cover bg-center bg-no-repeat bg-fixed z-[9999] flex flex-col justify-center items-center text-center space-y-4">
      <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Syncing in progress..</p>
    </div>
  );
}