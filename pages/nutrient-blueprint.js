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

      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Vitamins</h2>
        <div className="overflow-x-auto max-w-full">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Vitamin</th>
                <th className="px-4 py-2 text-left">Functions</th>
                <th className="px-4 py-2 text-left">RDA</th>
                <th className="px-4 py-2 text-left">Upper Limit</th>
                <th className="px-4 py-2 text-left">Unit</th>
              </tr>
            </thead>
            <tbody>
              {selectedVitamins.map((nutrient) => (
                <tr key={nutrient.name} className="hover:bg-gray-100">
                  <td className="px-4 py-2 font-medium">{nutrient.name}</td>
                  <td className="px-4 py-2">
    {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
  </td>
                  <td className="px-4 py-2">{nutrient.rda}</td>
                  <td className="px-4 py-2">{nutrient.ul}</td>
                  <td className="px-4 py-2">{nutrient.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Minerals</h2>
        <div className="overflow-x-auto max-w-full">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Mineral</th>
                <th className="px-4 py-2 text-left">Functions</th>
                <th className="px-4 py-2 text-left">RDA</th>
                <th className="px-4 py-2 text-left">Upper Limit</th>
                <th className="px-4 py-2 text-left">Unit</th>
              </tr>
            </thead>
            <tbody>
              {selectedMinerals.map((nutrient) => (
                <tr key={nutrient.name} className="hover:bg-gray-100">
                  <td className="px-4 py-2 font-medium">{nutrient.name}</td>
                  <td className="px-4 py-2">
    {Array.isArray(nutrient.functions) ? nutrient.functions.join(', ') : '—'}
  </td>
                  <td className="px-4 py-2">{nutrient.rda}</td>
                  <td className="px-4 py-2">{nutrient.ul}</td>
                  <td className="px-4 py-2">{nutrient.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
    </>
  );
}
