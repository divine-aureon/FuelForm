// processingCore.js

import nutrientData from "../data/nutrients";

const lbToKg = (lbs) => lbs * 0.453592;
const ftToCm = (inches) => inches * 2.54;

export function getBMR({ gender, weight, weightUnit, height, heightUnit, age }) {
  const kg = weightUnit === "kg" ? +weight : lbToKg(+weight);
  const cm = heightUnit === "cm" ? +height : ftToCm(+height);
  return gender === "male"
    ? 10 * kg + 6.25 * cm - 5 * age + 5
    : 10 * kg + 6.25 * cm - 5 * age - 161;
}

export function getEAT(minutes, intensity) {
  const calsPerMin = { none: 0, light: 5, moderate: 7, intense: 10 }[intensity] || 0;
  return minutes * calsPerMin;
}

function getBaselineNEAT(kg, awakeHrs = 16) {
  return 0.3 * kg * awakeHrs;
}

export function getNEAT({ weight, weightUnit, steps }) {
  const kg = weightUnit === "kg" ? +weight : lbToKg(+weight);
  const baseline = getBaselineNEAT(kg);
  const stepCals = steps * 0.04 + (steps / 1000) * 2;
  return baseline + stepCals;
}

export function getTDEE(profile) {
  const BMR = getBMR(profile);
  const NEAT = getNEAT(profile);
  const EAT = getEAT(+profile.exerciseMinutes || 0, profile.exerciseIntensity);
  const rawTDEE = BMR + NEAT + EAT;
  const TEF = rawTDEE * 0.1;
  return Math.round(rawTDEE + TEF);
}

function getAgeGroup(age) {
  return age < 4 ? "infant"
    : age < 9 ? "child"
    : age < 14 ? "tween"
    : age < 19 ? "teen"
    : age < 30 ? "young_adult"
    : age < 50 ? "adult"
    : age < 70 ? "older_adult"
    : "elder";
}

function getWeightRange(weight) {
  const w = parseFloat(weight);
  if (w < 100) return "low";
  if (w < 150) return "moderate";
  if (w < 200) return "high";
  return "very_high";
}

export function calculateAllNutrition(profile) {
  const tdee = getTDEE(profile);

// Convert weight to lbs if needed
const weightLbs = profile.weightUnit === "kg" ? profile.weight / 0.453592 : +profile.weight;

// Protein (weight-based)
const proteinMin = weightLbs * 0.7;
const proteinMax = weightLbs * 1.2;

// Macronutrient Percentage Ranges (to support flexible goals)
const carbPctMin = 10;
const carbPctMax = 60;
const fatPctMin = 20;
const fatPctMax = 60;

// Carbohydrates (calories per gram = 4)
const carbsMin = (tdee * (carbPctMin / 100)) / 4;
const carbsMax = (tdee * (carbPctMax / 100)) / 4;

// Fats (calories per gram = 9)
const fatsMin = (tdee * (fatPctMin / 100)) / 9;
const fatsMax = (tdee * (fatPctMax / 100)) / 9;

// Fiber (14g per 1000 calories rule)
const fiber = (tdee / 1000) * 14;

const recommendedMacros = [
  { name: "Estimated TDEE", value: `${tdee} kcal` },
  { name: "Protein", value: `${proteinMin.toFixed(0)}–${proteinMax.toFixed(0)} g` },
  { name: "Carbohydrates", value: `${carbsMin.toFixed(0)}–${carbsMax.toFixed(0)} g` },
  { name: "Fats", value: `${fatsMin.toFixed(0)}–${fatsMax.toFixed(0)} g` },
  { name: "Fiber", value: `${fiber.toFixed(0)} g` }
];



  const ageGroup = getAgeGroup(profile.age);
  const weightRange = getWeightRange(profile.weight);

  const vitamins = Object.entries(nutrientData.vitamins).map(([name, data]) => {
    const baseRDA = data.rda?.[profile.gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  const minerals = Object.entries(nutrientData.minerals).map(([name, data]) => {
    const baseRDA = data.rda?.[profile.gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  return {
    tdee,
    macros: {
      proteinMin: Math.round(proteinMin),
      proteinMax: Math.round(proteinMax),
      carbsMin: Math.round(carbsMin),
      carbsMax: Math.round(carbsMax),
      fatsMin: Math.round(fatsMin),
      fatsMax: Math.round(fatsMax),
      fiber: Math.round(fiber)
    },
    vitamins,
    minerals
  };
}
