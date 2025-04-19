import NavBar from '../components/NavBar';

export default function Sources() {
  return (
    <>
      <NavBar pageTitle="Sources" />
      <main className="bg-gray-950 text-white min-h-screen p-8">
        <h1 className="text-2xl">Sources</h1>
        <p className="mt-4">All source citations and scientific references will go here.</p>
        {/* ⬇️ Add the disclaimer here, still inside <main> */}
      <div className="mt-12 bg-gray-900 p-4 rounded-xl text-sm text-gray-400 border border-gray-700">
        <p className="mb-2 font-semibold text-white">Disclaimer:</p>
        <p>
          The information provided on FuelForm is for educational and informational purposes only.
          It is not intended as medical advice, diagnosis, or treatment. Always consult with a qualified
          healthcare provider before making changes to your diet, supplements, or lifestyle — especially
          if you have any pre-existing conditions or are taking medication.
        </p>
      </div>
      </main>
    </>
  );
}