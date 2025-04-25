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
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Login/Register ✦</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ About ✦</Link>
            <Link href="/sources" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>✦ Sources ✦</Link>
            <button
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