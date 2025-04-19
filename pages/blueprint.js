import { useState } from 'react';
import nutrientData from '../data/nutrients';
import Head from 'next/head'

const ageOptions = [
  { label: "0–3 years", value: "infant" },
  { label: "4–8 years", value: "child" },
  { label: "9–13 years", value: "tween" },
  { label: "14–18 years", value: "teen" },
  { label: "19–29 years", value: "young_adult" },
  { label: "30–49 years", value: "adult" },
  { label: "50–69 years", value: "older_adult" },
  { label: "70+ years", value: "elder" }
];

const getAgeGroup = (age) => {
  if (age < 4) return "infant";
  if (age < 9) return "child";
  if (age < 14) return "tween";
  if (age < 19) return "teen";
  if (age < 30) return "young_adult";
  if (age < 50) return "adult";
  if (age < 70) return "older_adult";
  return "elder";
};

const defaultProfile = {
  gender: 'Male',
  ageGroup: 'Youth',
  weight: ' '
};

const getWeightRange = (weight) => {
  if (!weight) return 'moderate';
  const w = parseFloat(weight);
  if (w < 100) return 'low';
  if (w < 150) return 'moderate';
  if (w < 200) return 'high';
  return 'very_high';
};

export default function NutrientBlueprint() {
  const [profile, setProfile] = useState(defaultProfile);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const selectedVitamins = Object.entries(nutrientData.vitamins).map(([name, data]) => {
    const ageGroup = getAgeGroup(profile.age);
    const baseRDA = data.rda?.[profile.gender]?.[ageGroup] ?? null;
const weightRange = getWeightRange(profile.weight);
const modifier = data.weightModifier?.[weightRange] ?? 1;
const rda = baseRDA ? Math.round(baseRDA * modifier) : 'Varies';
    const ul = data.ul ?? 'Varies';
    return { name, ...data, rda, ul };
  });

  const selectedMinerals = Object.entries(nutrientData.minerals).map(([name, data]) => {
    const ageGroup = getAgeGroup(profile.age);
    const baseRDA = data.rda?.[profile.gender]?.[ageGroup] ?? null;
const weightRange = getWeightRange(profile.weight);
const modifier = data.weightModifier?.[weightRange] ?? 1;
const rda = baseRDA ? Math.round(baseRDA * modifier) : 'Varies';
    const ul = data.ul ?? 'Varies';
    return { name, ...data, rda, ul };
  });

  return (
    <>
      <Head>
        <title>Blueprint | FuelForm</title>
      </Head>
  
      <main className="min-h-screen bg-black text-white p-8 font-sans">
        <h1 className="text-4xl font-bold mb-8 text-center">Blueprint</h1>
  
        <div className="bg-gray-900 p-6 rounded-2xl max-w-xl mx-auto shadow-lg mb-12">
          <p className="text-sm text-gray-400 mt-2">
            Choose your gender and age group to unlock your personalized Nutrient Blueprint.
          </p>
          <br />

        <div className="grid gap-4">
          <label className="block">
            Gender:
            <select name="gender" value={profile.gender} onChange={handleChange} className="block w-full mt-1 border p-2 bg-gray-800 text-white rounded">
            <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label className="block">
  Age Group:
  <select
    value={profile.ageGroup}
    onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}
    className="block w-full mt-1 border p-2 bg-gray-800 text-white rounded"
  >
    <option value="">Select Your Age Bracket</option>
    {ageOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</label>

<label className="block">
  Weight (lbs):
  <input
    type="number"
    name="weight"
    min="0"
    value={profile.weight}
    onChange={handleChange}
    placeholder="Enter Your Weight"
    className="block w-full mt-1 border p-2 bg-gray-800 text-white rounded placeholder-gray-400"
  />
</label>
        </div>
      </div>

      <section className="max-w-3xl mx-auto">
  <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Vitamins</h2>

  {/* DESKTOP TABLE */}
  <div className="hidden md:block overflow-x-auto max-w-full">
    <table className="w-full min-w-[600px] border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left whitespace-nowrap">Vitamin</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Functions</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">RDA</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Upper Limit</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Unit</th>
        </tr>
      </thead>
      <tbody>
        {selectedvitamins.map((nutrient) => (
          <tr key={nutrient.name} className="hover:bg-gray-100">
            <td className="px-4 py-2 font-medium whitespace-nowrap">{nutrient.name}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.rda}</td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.ul}</td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* MOBILE VERSION */}
  <div className="md:hidden space-y-4">
    {selectedvitamins.map((nutrient) => (
      <div
        key={nutrient.name}
        className="bg-white text-black rounded-xl shadow p-4 border border-gray-200"
      >
        <div className="font-semibold text-lg mb-1">{nutrient.name}</div>
        <div className="text-sm text-gray-700 mb-1">
          <span className="font-medium">RDA:</span> {nutrient.rda} {nutrient.unit}
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <span className="font-medium">Upper Limit:</span> {nutrient.ul ?? '—'} {nutrient.unit}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Functions:</span>{' '}
          {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="max-w-3xl mx-auto">
  <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Minerals</h2>

  {/* DESKTOP TABLE */}
  <div className="hidden md:block overflow-x-auto max-w-full">
    <table className="w-full min-w-[600px] border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left whitespace-nowrap">Mineral</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Functions</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">RDA</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Upper Limit</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Unit</th>
        </tr>
      </thead>
      <tbody>
        {selectedMinerals.map((nutrient) => (
          <tr key={nutrient.name} className="hover:bg-gray-100">
            <td className="px-4 py-2 font-medium whitespace-nowrap">{nutrient.name}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.rda}</td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.ul}</td>
            <td className="px-4 py-2 whitespace-nowrap">{nutrient.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* MOBILE VERSION */}
  <div className="md:hidden space-y-4">
    {selectedMinerals.map((nutrient) => (
      <div
        key={nutrient.name}
        className="bg-white text-black rounded-xl shadow p-4 border border-gray-200"
      >
        <div className="font-semibold text-lg mb-1">{nutrient.name}</div>
        <div className="text-sm text-gray-700 mb-1">
          <span className="font-medium">RDA:</span> {nutrient.rda} {nutrient.unit}
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <span className="font-medium">Upper Limit:</span> {nutrient.ul ?? '—'} {nutrient.unit}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Functions:</span>{' '}
          {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
        </div>
      </div>
    ))}
  </div>
</section>
    </main>
    </>
  );
}
