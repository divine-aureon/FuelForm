'use client';
// pages/about.js


import NavBar from 'components/NavBar';

export default function About() {
  return (
    <>
      <NavBar pageTitle="About" />
      <main className="bg-gray-950 text-white min-h-screen p-6 pt-20">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-4 text-white pl-0">About FuelForm</h1>
    <div className="bg-gray-900 rounded-2xl p-6 text-gray-300 shadow-lg">
    <p className="text-2xl font-semibold text-white mb-2">
  FuelForm is a wellness engine.
</p><br></br>

<p className="mb-4">
  Built to empower individuals with real, personalized nutritional knowledge.
  It’s not just about calories — it’s about understanding your body’s needs, and how to fuel it for longevity, strength, and vitality.
</p>
      <p className="mb-4">
        I created FuelForm because I believe everyone deserves to thrive.
        This is a space where science meets intuition — where you’re not told what to eat, but equipped to know <em>why</em> you eat what you eat.
      </p>
      <p className="mb-4">
        Whether you’re training, healing, or simply optimizing, FuelForm is here to reflect your unique needs — clearly, simply, and beautifully.
      </p>
      <p className="italic text-gray-400">This is only the beginning.</p>
    </div>
  </div>
</main>
    </>
  );
}