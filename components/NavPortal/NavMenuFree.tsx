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
      <Link href="/unlock" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 text-green-200" onClick={onClose}>
        ✦ Unlock 1 Month Free ✦
      </Link>
      <Link href="/command-center" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/statsecho" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StatsEcho ✦
      </Link>
      <Link href="/strengtharchive" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StrengthArchive ✦
      </Link>
      <Link href="/macrovault" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ MacroVault ✦
      </Link>
      <Link href="/primetasks" className="z-20 block p-3 rounded-xl  hover:bg-indigo-300/20" onClick={onClose}>
        ✦ PrimeTasks ✦
      </Link>
      <button
        onClick={handleLogout}
        className="z-20 block w-full p-3 text-red-400 rounded-xl hover:bg-indigo-300/20 hover:text-red-300 transition"
      >✦ Exit Console ✦
      </button>
    </div>
  );
}
