// NavMenu.tsx
"use client";
import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { Unlock } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-2 z-60 ">
      <div className="text-center">
      <Link href="https://buy.stripe.com/3cs6rl8wZ0tL2is144" className="text-green-200 block p-3 rounded-xl hover:bg-indigo-300/20 animate-pulse pulse-glow" onClick={onClose}>
        ✦ Unlock ✦
      <p className="text-s text-white pb-2">1-Month Free Trial</p>
      </Link>
      </div>
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
