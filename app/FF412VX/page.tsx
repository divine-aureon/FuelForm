'use client';

import { useEffect ,useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import useAuth from '@/lib/useAuth';
import SuccessLoad from "@/components/SuccessLoad";


export default function SuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!delayDone || !user?.uid) return;  // <-- If user isn't ready, don't run

    async function handleSuccess() {
      try {
        const userRef = doc(db, 'users', user?.uid!);  // <-- Now 100% safe
        await updateDoc(userRef, { isPaid: true });
        router.push('/command-center');
      } catch (error) {
        console.error("Error updating isPaid:", error);
      }
    }


    handleSuccess();
  }, [delayDone, user, router]); // <-- depend on user and router

  return <SuccessLoad />;
}