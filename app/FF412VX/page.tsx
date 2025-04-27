'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import useAuth from '../../lib/useAuth';

export default function SuccessPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function handleSuccess() {
      if (user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { isPaid: true });
      }
  
      router.push('/aegis/commandcenter');
    }
  
    handleSuccess();
  }, [user, router]);

  return (
    <main className="min-h-screen bg-[url('/images/loading.webp')] bg-cover bg-center bg-no-repeat text-white flex  justify-center px-4 pb-20">
      <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse text-center">
      Upgrading Access Codes...
      </h1>
      <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse text-center">
      Initializing Enhanced Systems...
      </h1>
    </main>
  );
}
