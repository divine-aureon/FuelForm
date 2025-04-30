// app/aegis/help/page.tsx
"use client"; // if needed depending on your Next.js version

export default function HelpPage() {
  return (
    <main className="bg-[url(/images/bg.webp)] 
    bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-start pt-8 pb-20">
      <section className="w-full max-w-2xl bg-white/40 rounded-2xl shadow-md p-6">
        <h1 className="text-4xl font-bold text-center mb-6 animate-pulse">
          Welcome to the FuelForm Help Center!
        </h1>

        <p className="mb-4 text-center">
          Congratulations, Commander. Youve entered the next evolution of vitality tracking — powered by the <span className="font-semibold">FusionCore</span>.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How to Use FuelForm</h2>
        <p className="mb-4">
          Each day, you&#39;ll perform two Syncs — <span className="font-semibold">DawnSync</span> and <span className="font-semibold">DuskSync</span> — to keep your Blueprint updated with real-time stats, nutrition, and workout tracking.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">DawnSync & DuskSync Explained</h2>
        <ul className="list-disc list-inside mb-4">
          <li><span className="font-semibold">DawnSync:</span> Morning check-in. Record your weight and sleep quality. This calibrates your Recovery TDEE.</li>
          <li><span className="font-semibold">DuskSync:</span> Evening check-in. Record your steps and exercise. This locks in your Active TDEE for the day.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Menu Overview</h2>
        <ul className="list-disc list-inside mb-4">
          <li><span className="font-semibold">Command Center:</span> Your mission control. Syncs, stats, and quick actions.</li>
          <li><span className="font-semibold">Blueprint Echo:</span> Full breakdown of calories, macros, and nutrient targets.</li>
          <li><span className="font-semibold">Strength Archive:</span> Log workouts, track personal records, and push limits.</li>
          <li><span className="font-semibold">MacroVault:</span> Meal tracker for mastering your fuel intake.</li>
          <li><span className="font-semibold">Biometrics:</span> Update your core data like height, weight unit, or birthday.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">FusionCore: The Power Engine</h2>
        <p className="mb-4">
          FuelForm is powered by the <span className="font-semibold">FusionCore</span> — a custom system designed to calculate your Recovery and Active needs with precision, using your live data.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Recovery vs Active Calories</h2>
        <ul className="list-disc list-inside mb-4">
          <li><span className="font-semibold">Recovery Calories:</span> The calories needed if you rested all day. Perfect for recovery days or lighter activity.</li>
          <li><span className="font-semibold">Active Calories:</span> Your true daily burn including steps and exercise, synced at night during DuskSync.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Changing Your Biometrics</h2>
        <p className="mb-4">
          To update your height, weight unit, or birthday, go to the <span className="font-semibold">Biometrics</span> page. These changes help fine-tune your calculations.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the Database</h2>
        <p className="mb-4">
          Your data is securely stored in FuelForm&#39;s cloud database. Each Sync (Dawn or Dusk) creates a new log for that day, ensuring your Blueprint evolves with you. No Sync = no updates. Syncing daily keeps your stats alive!
        </p>

        <div className="mt-10 text-center">
          <p className="text-lg font-semibold">For more detailed guidance, updates, or support, stay tuned to the Command Center!</p>
        </div>

        <div className="mt-10 text-center bg-white/30 p-3 rounded-3xl">
          Need More Help?<br />
          Contact Support<br/>
          <br />
        <a
          href="fuelform.online@email.com?subject=FuelForm%20Support"
          className="text-white underline hover:text-blue-400"
        >
          FuelForm.Online@gmail.com
        </a>
        </div>
      </section>
    </main>
  );
}