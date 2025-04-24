import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | FuelForm</title>
      </Head>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* 🌸 Faded Background Image */}
        
        <Image
  src="/images/home.webp"
  alt="background"
  fill
  className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
  priority
/>
        {/* 🌟 Main Content */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 relative z-10">
          FuelForm
        </h1>
        <p className="text-lg md:text-2xl text-center max-w-2xl mb-10 relative z-10">
          Fuel your body. Master your form. A system for sacred nutrition and performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
        <Link href="/login?querymode=login">
    <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 w-full sm:w-auto">
      Login
    </button>
  </Link>
  <Link href="/login?querymode=register">
    <button className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold border border-white hover:shadow-lg hover:shadow-pink-400/40 transition duration-300 w-full sm:w-auto">
      Sign Up
    </button>
  </Link>
</div>
<div className="flex gap-4 mt-6 text-sm text-gray-400 z-10">
  <Link href="/about" className="hover:underline hover:text-white transition">About</Link>
  <Link href="/sources" className="hover:underline hover:text-white transition">Sources</Link>
</div>
      </main>
    </>
  );
}