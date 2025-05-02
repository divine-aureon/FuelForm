// NavMenu.tsx
"use client";
import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

type NavMenuProps = {
  onClose: () => void;
};

export default function NavMenuPaid({ onClose }: NavMenuProps) {
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
    <div className="flex flex-col gap-2 z-60">
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
