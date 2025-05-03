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
      <Link href="https://buy.stripe.com/3cs6rl8wZ0tL2is144" className="text-green-200 block px-4 pt-2 hover:bg-gray-800 animate-pulse pulse-glow" onClick={onClose}>
        ✦ UNLOCK ACCESS CODES ✦
      <p className="text-s text-green-200 pb-2">1-Month Free Trial. No payment today.</p>
      </Link>
      </div>
      <Link href="/command-center" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/macrovault" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Macro Vault ✦
      </Link>
      <Link href="/strengtharchive" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Strength Archive ✦
      </Link>
      <Link href="/statsecho" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Stats Echo ✦
      </Link>
      <Link href="/biometrics" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Biometrics ✦
      </Link>
      <Link href="/neurosettings" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ NeuroSettings ✦
      </Link>
      <Link href="/help-center" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Help Center ✦
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
      >✦ Exit Console ✦
      </button>
    </div>
  );
}
