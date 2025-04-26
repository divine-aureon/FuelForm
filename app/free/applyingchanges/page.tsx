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
    <main className="min-h-screen bg-[url('/images/loading.webp')] bg-cover bg-center bg-no-repeat text-white flex  justify-center px-4 pb-20">
      <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse text-center">
      Applying Updated BioMetrics...
      </h1>
    </main>
  );
}