// NavMenu.tsx
"use client";
import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

type NavMenuProps = {
  onClose: () => void;
};

export default function NavMenu({ onClose }: NavMenuProps) {
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
      <Link href="/aegis/commandcenter" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/aegis/dawnsync" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ DawnSync ✦
      </Link>
      <Link href="/aegis/dusksync" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ DuskSync ✦
      </Link>
      <Link href="/aegis/macrovault" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Macro Vault ✦
      </Link>
      <Link href="/aegis/strengtharchive" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Strength Archive ✦
      </Link>
      <Link href="/aegis/blueprintecho" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Blueprint Echo ✦
      </Link>
      <Link href="/aegis/biometrics" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Biometrics ✦
      </Link>
      <Link href="/aegis/help" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
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
