// NavMenu.tsx
"use client";
import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

type NavMenuProps = {
  onClose: () => void;
};

export default function FreeNavMenu({ onClose }: NavMenuProps) {
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
    <div className="flex flex-col gap-2">
      <Link href="/free/commandcenter" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/free/biometrics" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦Biometrics✦
      </Link>
      <Link href="/free/unlock" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦Unlock Pro✦
      </Link>
      <Link href="/free/dawnsync" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦DawnSync🔒✦
      </Link>
      <Link href="/free/dusksync" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦DuskSync🔒✦
      </Link>
      <Link href="/free/macrovault" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦Macro Vault🔒✦
      </Link>
      <Link href="/free/strengtharchive" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦Strength Archive🔒✦
      </Link>
      <Link href="/free/blueprintecho" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦Blueprint Echo🔒✦
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
      >✦Exit Console✦
      </button>
    </div>
  );
}
