// NavMenu.tsx

import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { Lock , Rotate3d , ListChecks , Dumbbell , Utensils , Globe , LogOut } from 'lucide-react';

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
    <div className=" flex flex-col gap-1 z-60 mb-4 mt-3">
      <Link href="/command-center" className="block p-3 z-20  rounded-xl gap-2 flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
        <Globe size={15}/>Command Centre 
      </Link>
      <Link href="/statsecho" className="block p-3 z-20 gap-2 rounded-xl flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
       <Rotate3d size={15} /> StatsEcho
      </Link>
      <Link href="/strengtharchive" className="block p-3 z-20 gap-2 rounded-xl flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
         <Dumbbell size={15}/>StrengthArchive
      </Link>
      <Link href="/macrovault" className="block p-3 z-20 gap-2 rounded-xl flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
        <Utensils size={15}/>MacroVault
      </Link>
      <Link href="/primetasks" className="block p-3 z-20 gap-2 rounded-xl flex items-center justify-center hover:bg-indigo-300/20" onClick={onClose}>
         <ListChecks size={15}/>PrimeTasks
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full p-3 text-red-400 z-20 gap-2 rounded-xl  flex items-center justify-center hover:bg-indigo-300/20 hover:text-red-300 transition"
      >  <LogOut size={15}/>Exit Console
      </button>
    </div>
  );
}
