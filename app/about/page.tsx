'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';

export default function AboutPage() {

    const { setBackgroundMode } = useBackground();
  
    useEffect(() => {
      setBackgroundMode("infopage");
    }, [setBackgroundMode]);

  return (
    <>
      <div className="rounded-3xl bg-black/40 rounded-2xl p-6 text-gray-300 shadow-2xl border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
          <span className="text-white pulse-glow">About FuelForm</span>
        </h1>

        <p className="text-2xl font-semibold text-white mb-6 text-center">
          Prime Directive
        </p>

        <p className="mb-4 leading-relaxed text-lg">
          FuelForm is a futuristic wellness engine forged at the intersection of biology, data, and self-realization.
          Its not just an app—its your command center for transformation.
        </p>

        <p className="mb-4 leading-relaxed text-lg">
          Designed to empower you with precision nutrition, intelligent workout tracking, and a fully immersive interface,
          FuelForm turns everyday health choices into a gamified journey toward strength, clarity, and vitality.
          We believe in more than calorie counting—we believe in systems optimization.
          Your body is a vessel of potential. Your choices are code. FuelForm is your console.

        </p>

        <p className="mb-4 leading-relaxed text-lg">
          From syncing neural metrics to initiating recovery protocols, every action within FuelForm reinforces your trajectory toward becoming the most aligned, energized, and evolved version of yourself.
        </p>

        <p className="italic text-gray-400 text-center mt-8">
          This isnt fitness.
          This is FuelForm.
        </p>
      </div>
      <div className="all-[unset]">
        <div className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-5 border-t border-white/20 z-50">
          <Link href="/" className="text-base text-[32px] hover:underline">
            Home
          </Link>
        </div>
      </div>
    </>
  );
}