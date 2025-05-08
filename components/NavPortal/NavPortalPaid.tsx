"use client";

import { useState } from 'react';
import NavMenuPaid from './NavMenuPaid';
import useCoreData from "@/lib/hooks/CoreData";
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


  const { settings } = useCoreData();

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

  const Icon = LucideIconMap[settings?.navIcon || "Atom"];


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
      <div className={`fixed bottom-[60px] left-0 right-0 transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}>
        <div className="glowing-bg border border-indigo-400 rounded-3xl relative shadow-2xl w-full max-w-xs mx-auto overflow-hidden text-center"
          style={{ backgroundColor: '#0f172a' }}>

          <div className="h-[80px] bg-[url('/images/menus/navportal.jpg')] relative glowing-bg border border-indigo-400 bg-cover bg-center bg-no-repeat border 
             border-white/30 shadow-xl text-white text-2xl">

            <div className="flex flex-col h-full pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center">

              <div className="z-20 flex items-center gap-2 font-semibold pulse-glow">NavPortal</div>
              <h2 className="z-20 text-xs font-bold text-white">
                Command your journey. Instantly.
              </h2>
            </div>
          </div>
          <NavMenuPaid onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
