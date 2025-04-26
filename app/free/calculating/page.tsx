'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/free/commandcenter');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse text-center">
      Initializing Bioform Analysis...
      </h1>
    </main>
  );
}