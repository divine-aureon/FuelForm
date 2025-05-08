// NavMenu.tsx

import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";

type NavMenuProps = {
  onClose: () => void;
};

export default function NavMenuPublic({ onClose }: NavMenuProps) {
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
      <Link href="/unlock" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20 pulse-glow text-green-200"  onClick={onClose}>
        ✦ Unlock 1 Month Free ✦
      </Link>
      <Link href="/" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Home ✦
      </Link>
      <Link href="/login?querymode=login" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Login ✦
      </Link>
      <Link href="/login?querymode=register" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Register ✦
      </Link>
      <Link href="/infodex" className="z-20 block p-3 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ InfoDex ✦
      </Link>
    </div>
  );
}
