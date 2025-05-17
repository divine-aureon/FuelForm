"use client";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { useState, useEffect } from "react";
import ControlHubMenu from './ControlHubMenu';
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

export default function ControlHub() {

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (!next) {
      setSettingsOpen(false);
      setBioOpen(false);
      setOverrideOpen(false);
      setFitnessOpen(false);
      setUnlockOpen(false);
      setDawnOpen(false);
      setDuskOpen(false);
      setCoreOpen(false);

    }
  };


  const userProfile = useGlobalData((s) => s.userProfile);

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

  const Icon = LucideIconMap[userProfile?.customSettings?.navIcon || "Atom"];
  const ProfileLoad = userProfile ?? null;

  const selectedPage = useGlobalData((s) => s.selectedPage);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  const isSettingsOpen = useGlobalData((s) => s.isSettingsOpen);
  const setSettingsOpen = useGlobalData((s) => s.setSettingsOpen);

  const isFitnessOpen = useGlobalData((s) => s.isFitnessOpen);
  const setFitnessOpen = useGlobalData((s) => s.setFitnessOpen);

  const isOverrideOpen = useGlobalData((s) => s.isOverrideOpen);
  const setOverrideOpen = useGlobalData((s) => s.setOverrideOpen);

  const isBioOpen = useGlobalData((s) => s.isBioOpen);
  const setBioOpen = useGlobalData((s) => s.setBioOpen);

  const isUnlockOpen = useGlobalData((s) => s.isUnlockOpen);
  const setUnlockOpen = useGlobalData((s) => s.setUnlockOpen);

  const isCoreOpen = useGlobalData((s) => s.isCoreOpen);
  const setCoreOpen = useGlobalData((s) => s.setCoreOpen);

  const isDawnOpen = useGlobalData((s) => s.isDawnOpen);
  const setDawnOpen = useGlobalData((s) => s.setDawnOpen);

  const isDuskOpen = useGlobalData((s) => s.isDuskOpen);
  const setDuskOpen = useGlobalData((s) => s.setDuskOpen);

  const isOpen = useGlobalData((s) => s.isOpen);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);



  useEffect(() => {
    if (isCoreOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isCoreOpen]);


  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isBioOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isBioOpen]);


  useEffect(() => {
    if (isFitnessOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isFitnessOpen]);


  useEffect(() => {
    if (isOverrideOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isOverrideOpen]);

  useEffect(() => {
    if (isDawnOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDawnOpen]);

  useEffect(() => {
    if (isDuskOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isDuskOpen]);



  return (
    <>
      {/* Fixed bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/70 text-white px-6 py-4 flex items-center justify-center shadow-inner z-50">
        <button
          onClick={toggleMenu}
          className="text-xl font-bold tracking-wide transition-all pulse-glow"
        >
          {isOpen ? <p className="flex items-center justify-center gap-2"> DEACTIVATE ControlHub <Icon size={20} /> </p> : <p className="flex items-center justify-center gap-2"> ACTIVATE ControlHub <Icon size={20} /> </p>}
        </button>
      </nav>


      {/* Expanding drawer from bottom */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="navdrawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[60px] left-0 right-0 z-40 overflow-hidden"
          >
            <div
              className="glowing-bg border border-indigo-400 rounded-3xl relative shadow-2xl w-full max-w-xs mx-auto overflow-hidden text-center"
              style={{ backgroundColor: '#0f172a' }}
            >
              <div className="h-[80px] bg-[url('/images/menus/navportal.jpg')] relative glowing-bg border border-indigo-400 bg-cover bg-center bg-no-repeat border 
           border-white/30 shadow-xl text-white text-3xl"
              >
                <div className="flex flex-col h-full pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center">
                  <div className="z-20 flex items-center gap-2 font-semibold pulse-glow">ControlHub</div>
                  <h2 className="z-20 text-xs font-bold text-white">
                    Command your journey. Instantly.
                  </h2>
                </div>
              </div>
              <ControlHubMenu />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
