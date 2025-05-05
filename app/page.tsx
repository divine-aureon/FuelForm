import Head from 'next/head';
import Link from 'next/link';
import './globals.css';
import HomeBackgroundSetter from '@/components/Backgrounds/homeBackgroundSetter';
import VHFixer from '@/components/VHFixer';



export default function Home() {
  return (
    <>
    <HomeBackgroundSetter />
    <VHFixer/>
      <Head>
        <title>Home | FuelForm</title>
      </Head>
      <main className="h-screen text-white flex flex-col items-center justify-between overflow-hidden">
        <div className="bg-black/40 rounded-3xl p-4">
          <h1 className="text-7xl md:text-7xl font-extrabold text-center mb-1 z-10">
            FuelForm
          </h1>
          <p className="text-lg md:text-2xl text-center max-w-2xl z-10 shadow-xl">
            Adaptive Metabolic Interface v1.3.0
          </p>
        </div>
        <div className="flex flex-col mt-auto pb-10 gap-4 z-10">
          <Link href="/login?querymode=login">
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold 
            hover:bg-gray-200 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 w-full sm:w-auto">
              Login
            </button>
          </Link>
          <Link href="/login?querymode=register">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold border 
            border-white hover:shadow-lg hover:shadow-pink-400/40 transition duration-300 w-full sm:w-auto">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="pb-16">
 
        <div className=" flex flex-center gap-4 text-sm rounded-3xl bg-black/50 p-3 z-10">
          <Link href="/about" className="hover:underline hover:text-white transition">About</Link>
          <Link href="/sources" className="hover:underline hover:text-white transition">Sources</Link>
        </div>
        </div>
      </main>
    </>
  );
}