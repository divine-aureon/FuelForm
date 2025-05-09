import Head from 'next/head';
import Link from 'next/link';
import HomeBackgroundSetter from '@/components/Backgrounds/homeBackgroundSetter';
import VHFixer from '@/components/VHFixer';
import { Fingerprint } from 'lucide-react';
import NavPortalPublic from "@/components/NavPortal/NavPortalPublic"
import HomeLoad from "@/components/Loading/HomeLoad";

export default function Home() {
    return (
        <>
        <HomeLoad/>
            <HomeBackgroundSetter />

            <div className="">
                <div className="relative z-10 flex justify-center">

                    <div className="fixed top-4 px-3 w-full">
                        <div className="relative h-32 bg-[url('/images/menus/biocard.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-7xl glowing-button mb-2">
                            <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                                <div className="flex items-center gap-2">FuelForm</div>
                                <h2 className="text-lg font-bold text-white">
                                    Adaptive Metabolic Interface v1.3.4
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="w-40 h-40 bg-white/10 rounded-full flex flex-col items-center justify-center animate-pulse shadow-xl">
                        <span className="text-center text-2xl font-semibold text-white">Decrypting</span>
                        <Fingerprint size={64} className="mt-2 text-white cursor-pointer" />
                    </div>
                </div>



                <div className="z-20 relative flex justify-center ">
                    <div className="fixed bottom-14 px-3 w-full grid grid-cols-2 gap-3 ">
                        <Link href="/login?querymode=login" className="block ">
                            <div className="relative h-16 bg-[url('/images/menus/loginimage.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border border-white/30 shadow-xl text-white text-2xl glowing-button mb-2 flex items-center justify-center">
                                Login
                            </div>
                        </Link>

                        <Link href="/login?querymode=register" className="block">
                            <div className="relative h-16 bg-[url('/images/menus/register.webp')] bg-cover bg-center bg-no-repeat rounded-2xl border border-white/30 shadow-xl text-white text-2xl glowing-button mb-2 flex items-center justify-center">
                                Sign Up
                            </div>
                        </Link>
                    </div>
                </div>


            </div>
                  <footer className="pt-4 pb-2">
                     <NavPortalPublic />
                  </footer>
        </>
    );
}