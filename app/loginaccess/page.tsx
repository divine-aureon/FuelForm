'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/aegis/commandcenter');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (

    <main className="min-h-screen bg-[url('/images/loading.webp')] bg-cover 
    bg-center bg-no-repeat flex items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse text-center">
      Confirming Access Codes...
      </h1>
    </main>
  );
}