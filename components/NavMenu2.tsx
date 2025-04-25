// NavMenu.tsx

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

type BottomNavProps = {
  onClose: () => void;
};

export default function BottomNav () {
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => setIsOpen(!isOpen);
const router = useRouter();


  return (
    <>
      <Link href="/" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Home ✦</Link>
      <Link href="/commandcenter" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Command Centre ✦</Link>
            <Link href="/fuelsync" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelSync ✦</Link>
            <Link href="/fuelform" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelForm ✦</Link>
            <Link href="/formforge" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FormForge ✦</Link>
            <Link href="/blueprint" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Nutrient Blueprint ✦</Link>
            <Link href="/fuelstats" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelStats ✦</Link>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Settings ✦</Link>            <button
  onClick={async () => {
    await auth.signOut();
    setIsOpen(false);
    router.push('/');
  }}
  className="block w-full px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
>
  ✦ Exit Console ✦
</button>
    </>
  );
}