'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpgradeLoad() {
  const [delayDone, setDelayDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayDone(true);
    }, 1200); // You can increase if you want more animation time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (delayDone) {
      router.push('/command-center'); // Adjust this route if needed
    }
  }, [delayDone, router]);

  return (
    <div className="fixed inset-0 bg-[url('/images/loading.jpg')] 
      bg-cover bg-center z-[9999] bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Upgrading Access Codes...</p>
    </div>
  );
}
