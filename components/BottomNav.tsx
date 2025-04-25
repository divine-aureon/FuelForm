// BottomNav.tsx
'use client';

import { useState } from 'react';
import NavMenu from '@/components/NavMenu';

export default function BottomNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-transparent text-white px-6 py-4 flex items-center justify-center shadow-inner z-50">
        <button
          onClick={toggleMenu}
          className="text-xl font-bold tracking-wide uppercase"
        >
          NavPortal
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm text-center animate-fadeIn">
            <h2 className="text-4xl font-semibold text-white mb-4">NavPortal</h2>
            <NavMenu onClose={() => setIsOpen(false)} />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
