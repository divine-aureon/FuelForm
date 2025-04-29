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
    <div className="bg-[url('/images/loading.webp')] 
    bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
        <p className="text-xl font-bold text-white animate-pulse">Upgrading Access Codes...</p>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
  );
}
