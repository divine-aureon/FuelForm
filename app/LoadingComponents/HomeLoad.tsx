'use client';

import { useEffect, useState } from 'react';

export default function HomeLoad() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 1200); // Duration of your loading
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null; // ❌ Stops rendering the background and div completely

  return (
    <div className="fixed inset-0 bg-[url('/images/homeload2.jpg')] 
    bg-cover bg-center z-[9999] bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Initializing Biometric Scan...</p>
    </div>
  );
}