import Head from 'next/head';
import Link from 'next/link';
import './globals.css';
import HomeBackgroundSetter from '@/components/Backgrounds/homeBackgroundSetter';
import VHFixer from '@/components/VHFixer';



export default function Home() {
  return (
    <>
    <HomeBackgroundSetter />

      <Head>
        <title>Home | FuelForm</title>
      </Head>
      <div className="h-[80dvh]">
        
        <div className="bg-black/40 rounded-3xl p-4">
          <h1 className="text-7xl md:text-7xl font-extrabold text-center mb-1 z-10">
            FuelForm
          </h1>
          <p className="text-lg md:text-2xl text-center max-w-2xl z-10 shadow-xl">
            Adaptive Metabolic Interface v1.3.4
          </p>
        </div>
        <div className="flex items-center justify-center pb-3 gap-4 mt-[380px] z-10">
          <Link href="/login?querymode=login">
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold 
            hover:bg-gray-200 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 w-full ">
              Login
            </button>
          </Link>
          <Link href="/login?querymode=register">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold border 
            border-white hover:shadow-lg hover:shadow-pink-400/40 transition duration-300 w-full">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
        <div className="w-40 grid grid-cols-2 text-md rounded-3xl bg-black/50 p-3 z-10">
          <Link href="/about" className="pl-2 hover:underline flex text-center hover:text-white transition">About</Link>
          <Link href="/sources" className="pl-1 hover:underline flex text-center hover:text-white transition">Sources</Link>
        </div>
        </div>

      </div>
    </>
  );
}