"use client";

import { useState } from 'react';
import NavMenu from '../components/NavMenu';

export default function NavPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Fixed bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/80 text-white px-6 py-4 flex items-center justify-center shadow-inner z-50">
        <button
          onClick={toggleMenu}
          className="text-xl font-bold tracking-wide uppercase transition-all hover:scale-105 pulse-glow"
        >
          {isOpen ? 'Deactivate NavPortal' : 'Activate NavPortal'}
        </button>
      </nav>

      {/* Expanding drawer from bottom */}
      <div
        className={`fixed bottom-[64px] left-0 right-0 transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="bg-gray-900 rounded-t-2xl shadow-2xl p-6 w-full max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">NavPortal</h2>
          <NavMenu onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
