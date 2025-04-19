import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6">
        FuelForm
      </h1>
      <p className="text-lg md:text-2xl text-center max-w-2xl mb-10">
        Fuel your body. Master your form. A system for sacred nutrition and performance.
      </p>
      <Link href="/blueprint">
  <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition">
    Discover Your Blueprint
  </button>
</Link>
    </main>
  );
}