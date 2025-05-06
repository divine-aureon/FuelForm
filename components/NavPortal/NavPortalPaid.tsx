"use client";

import { useState } from 'react';
import NavMenuPaid from './NavMenuPaid';
import useFuelFormData from "@/lib/hooks/CoreData";
import {
  Crown,
  Flame,
  Zap,
  Star,
  Shield,
  Atom,
  Heart,
  Bird
} from 'lucide-react';

export default function NavPortalPaid() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  

  const { preferences } = useFuelFormData();

  const LucideIconMap: Record<string, React.ElementType> = {
    Atom: Atom,
    Crown: Crown,
    Flame: Flame,
    Star: Star,
    Zap: Zap,
    Shield: Shield,
    Heart: Heart,
    Bird: Bird,
  };
  
  const Icon = LucideIconMap[preferences?.navIcon || "Atom"];
  

  return (
    <>
      {/* Fixed bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/70 text-white px-6 py-4 flex items-center justify-center shadow-inner z-50">
        <button
          onClick={toggleMenu}
          className="text-xl font-bold tracking-wide transition-all hover:scale-105 pulse-glow"
        >
          {isOpen ? <p className="flex items-center justify-center gap-2"> DEACTIVATE NavPortal <Icon size={20} /> </p> : <p className="flex items-center justify-center gap-2"> ACTIVATE NavPortal <Icon size={20} /> </p>}
        </button>
      </nav>

      {/* Expanding drawer from bottom */}
      <div
        className={`fixed bottom-[64px] left-0 right-0 transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          } overflow-hidden`}
      >
        <div className="glowing-navportal shadow-2xl p-6 w-full max-w-sm mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-4 pulse-glow">NavPortal</h2>
          <NavMenuPaid onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
