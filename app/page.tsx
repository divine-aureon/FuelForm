import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';


export default function Home() {

  return (
    <>
      <Head>
        <title>Home | FuelForm</title>
      </Head>
      <main className="bg-[url('/images/home.webp')] bg-cover bg-center bg-no-repeat min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* 🌟 Main Content */}
        <div className="bg-black/40 rounded-3xl p-4 mb-12">
        <h1 className="text-7xl md:text-7xl font-extrabold text-center mb-1 relative z-10">
          FuelForm
        </h1>
        <p className="text-lg md:text-2xl text-center max-w-2xl relative z-10 shadow-xl">
        Adaptive Metabolic Interface v1.0.0  
        </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
        <Link href="/login?querymode=login">
    <button className="bg-white text-black px-6 mt-8 py-3 rounded-2xl font-bold hover:bg-gray-200 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 w-full sm:w-auto">
      Login
    </button>
  </Link>
  <Link href="/login?querymode=register">
    <button className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold border border-white hover:shadow-lg hover:shadow-pink-400/40 transition duration-300 w-full sm:w-auto">
      Sign Up
    </button>
  </Link>
</div>
<div className="flex gap-4 mt-6 text-sm rounded-3xl bg-black/50 p-3 z-10">
  <Link href="/about" className="hover:underline hover:text-white transition">About</Link>
  <Link href="/sources" className="hover:underline hover:text-white transition">Sources</Link>
</div>
      </main>
    </>
  );
}