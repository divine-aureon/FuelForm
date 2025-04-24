'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "lib/firebase";
import { useRouter } from 'next/navigation';



export default function NavBar({ pageTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-950 text-white px-6 py-4 flex items-center justify-between shadow-md relative">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-bold tracking-wide">FuelForm</h1>
        <span className="text-sm text-gray-400">| {pageTitle}</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleMenu} className="text-white">
          <AlignJustify size={28} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg z-50 py-2">
            <Link href="/commandcenter" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Command Centre</Link>
            <Link href="/fuelsync" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelSync</Link>
            <Link href="/fuelform" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelForm</Link>
            <Link href="/formforge" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FormForge</Link>
            <Link href="/blueprint" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Nutrient Blueprint</Link>
            <Link href="/fuelstats" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ FuelStats</Link>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Settings</Link>
            <button
  onClick={async () => {
    await auth.signOut();
    setIsOpen(false);
    router.push('/');
  }}
  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
>
  ✦ Exit Console 
</button>
          </div>
        )}
      </div>
    </header>
  );

}
