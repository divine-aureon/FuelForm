// NavMenu.tsx

import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

type NavMenuProps = {
  onClose: () => void;
};

export default function NavMenu({ onClose }: NavMenuProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Link href="/" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Home ✦
      </Link>
      <Link href="/commandcenter" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/fuelsync" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ FuelSync ✦
      </Link>
      <Link href="/fuelform" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ FuelForm ✦
      </Link>
      <Link href="/formforge" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ FormForge ✦
      </Link>
      <Link href="/blueprint" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Nutrient Blueprint ✦
      </Link>
      <Link href="/fuelstats" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ FuelStats ✦
      </Link>
      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-800" onClick={onClose}>
        ✦ Settings ✦
      </Link>

      <button
        onClick={async () => {
          await auth.signOut();
          onClose();
          router.push('/');
        }}
        className="block w-full px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
      >
        ✦ Exit Console ✦
      </button>
    </div>
  );
}
