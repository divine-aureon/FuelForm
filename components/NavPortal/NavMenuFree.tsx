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
    <div className="flex flex-col gap-2 z-60 ">
      <Link href="" className="block p-3 rounded-xl hover:bg-indigo-300/20 pulse-glow text-green-200"  onClick={() => setUnlockOpen(true)}>
        ✦ Unlock 1-Month Free ✦
      </Link>
      {isUnlockOpen && (
              <Elements stripe={stripePromise}>
                <UnlockModal onClose={() => setUnlockOpen(false)}>
                  <UnlockComponent />
                </UnlockModal>
              </Elements>
            )}
      <Link href="/command-center" className="block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/statsecho" className="block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StatsEcho ✦
      </Link>
      <Link href="/strengtharchive" className="block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StrengthArchive ✦
      </Link>
      <Link href="/macrovault" className="block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ MacroVault ✦
      </Link>
      <Link href="/primetasks" className="block p-3 rounded-xl  hover:bg-indigo-300/20" onClick={onClose}>
        ✦ PrimeTasks ✦
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full p-3 text-red-400 rounded-xl hover:bg-indigo-300/20 hover:text-red-300 transition"
      >✦ Exit Console ✦
      </button>
    </div>
  );
}
