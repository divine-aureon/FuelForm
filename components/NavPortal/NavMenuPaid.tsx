// NavMenu.tsx

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
    <div className="z-20 flex flex-col gap-1 z-60 mb-4 mt-3">
      <Link href="/command-center" className="block p-3 z-20 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ Command Centre ✦
      </Link>
      <Link href="/statsecho" className="block p-3 z-20 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StatsEcho ✦
      </Link>
      <Link href="/strengtharchive" className="block p-3 z-20 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ StrengthArchive ✦
      </Link>
      <Link href="/macrovault" className="block p-3 z-20 rounded-xl hover:bg-indigo-300/20" onClick={onClose}>
        ✦ MacroVault ✦
      </Link>
      <Link href="/primetasks" className="block p-3 z-20 rounded-xl  hover:bg-indigo-300/20" onClick={onClose}>
        ✦ PrimeTasks ✦
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full p-3 text-red-400 z-20 rounded-xl hover:bg-indigo-300/20 hover:text-red-300 transition"
      >✦ Exit Console ✦
      </button>
    </div>
  );
}
