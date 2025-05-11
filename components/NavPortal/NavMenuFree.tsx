// NavMenu.tsx

import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { Unlock } from 'lucide-react';
import { UnlockModal } from "@/components/Modals/UnlockModal"
import UnlockComponent from "@/components/Modals/UnlockComponent"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";
import { Lock , Rotate3d , Dna, ListChecks ,CircleCheckBig, SmilePlus, Dumbbell , Utensils , Globe , LogOut , KeyRound } from 'lucide-react';

type NavMenuProps = {
  onClose: () => void;
};

export default function NavMenuFree({ onClose }: NavMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onClose();
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [isUnlockOpen, setUnlockOpen] = useState(false);


  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);




  return (
    <div className="flex flex-col gap-1 z-60 mb-4 mt-3">
      <Link href="/unlock" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 text-green-200 gap-2 flex items-center justify-center" onClick={onClose}>
         <KeyRound size={15}/>Upgrade 1 Month Free
      </Link>
      <Link href="/command-center" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 gap-2 flex items-center justify-center" onClick={onClose}>
        <CircleCheckBig size={15}/>Command Centre  
      </Link>
            <Link href="/strengtharchive" className="z-20 block p-3 rounded-xl gap-2 flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
         <CircleCheckBig size={15}/>InfoDex
      </Link>
      <Link href="/primetasks" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 gap-2 flex items-center justify-center" onClick={onClose}>
         <CircleCheckBig size={15}/>PrimeTasks 
      </Link>
      <Link href="/statsecho" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 gap-2 flex items-center justify-center " onClick={onClose}>
       <CircleCheckBig size={15}/>SyncSimulator
      </Link>
      <button
        onClick={handleLogout}
        className="z-20 block w-full p-3 text-red-400 rounded-xl hover:bg-indigo-300/20 hover:text-red-300 transition gap-2 flex items-center justify-center"
      >  <LogOut size={15}/>Exit Console
      </button>
    </div>
  );
}
