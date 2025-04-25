'use client';
// pages/about.js


import BottomNav from '@/components/BottomNav';
import Image from "next/image";

export default function About() {
  return (
    <>
      <BottomNav />

     
      <main className="text-white min-h-screen relative pb-16">
      <Image
        src="/images/info.webp"
        alt="background"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none z-0"
        priority
      />
      <div className="relative z-10 px-4">
  <div className="max-w-3xl mx-auto backdrop-blur-md bg-black/40 rounded-2xl p-6 md:p-10 text-gray-300 shadow-2xl border border-white/10">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center tracking-wide">
       <span className="text-white pulse-glow">About FuelForm</span>
    </h1>

    <p className="text-2xl font-semibold text-white mb-6 text-center">
      Prime Directive
    </p>

    <p className="mb-4 leading-relaxed text-lg">
    FuelForm is a futuristic wellness engine forged at the intersection of biology, data, and self-realization.
    It’s not just an app—it’s your command center for transformation.
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
    This isn’t fitness.
    This is FuelForm.
    </p>
  </div>
</div>
</main>
    </>
  );
}