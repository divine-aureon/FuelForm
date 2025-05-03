// processingCore.js

import nutrientData from "../data/nutrients";
import useFuelFormData from "@/lib/hooks/CoreData";

export function calculateRecoveryFuel(
  {
    weight_lbs,
    weight_kg,
    height_cm,
    gender,
    age,
    calorieGoal,

  }) 
  
  {//AGE INLINE//

  let ageGroup;
  if (age < 4) {
    ageGroup = "infant";
  } else if (age < 9) {
    ageGroup = "child";
  } else if (age < 14) {
    ageGroup = "tween";
  } else if (age < 19) {
    ageGroup = "teen";
  } else if (age < 30) {
    ageGroup = "young_adult";
  } else if (age < 50) {
    ageGroup = "adult";
  } else if (age < 70) {
    ageGroup = "older_adult";
  } else {
    ageGroup = "elder";
  }
  //WEIGHT INLINE//
  let weightRange;
  const w = parseFloat(weight_lbs);
  if (w < 100) {
    weightRange = "low";
  } else if (w < 150) {
    weightRange = "moderate";
  } else if (w < 200) {
    weightRange = "high";
  } else {
    weightRange = "very_high";
  }

  //BMR FORMULA//
  const BMR = gender === "male"
    ? (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    : (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161;

  //BASE NEAT//
  const awakeHours = 16;
  const baselineNEAT = 0.25 * weight_kg * awakeHours;

  //RECOVERY TDEE//
  const rawRecoveryTDEE = BMR + baselineNEAT + calorieGoal;
  const recoveryTDEE = Math.round(rawRecoveryTDEE / 0.9);

  // Protein (weight-based)
  const proteinMin = weight_lbs * 0.7;
  const proteinMax = weight_lbs * 1.2;

  // Macronutrient Percentage Ranges (to support flexible goals)
  const carbPctMin = 10;
  const carbPctMax = 60;
  const fatPctMin = 20;
  const fatPctMax = 60;

  // Carbohydrates (calories per gram = 4)
  const carbsMin = (recoveryTDEE * (carbPctMin / 100)) / 4;
  const carbsMax = (recoveryTDEE * (carbPctMax / 100)) / 4;

  // Fats (calories per gram = 9)
  const fatsMin = (recoveryTDEE * (fatPctMin / 100)) / 9;
  const fatsMax = (recoveryTDEE * (fatPctMax / 100)) / 9;

  // Fiber (14g per 1000 calories rule)
  const fiber = (recoveryTDEE / 1000) * 14;

  const recoveryMacros = [
    { name: "Protein", value: `${proteinMin.toFixed(0)}–${proteinMax.toFixed(0)}` },
    { name: "Carbohydrates", value: `${carbsMin.toFixed(0)}–${carbsMax.toFixed(0)}` },
    { name: "Fats", value: `${fatsMin.toFixed(0)}–${fatsMax.toFixed(0)}` },
    { name: "Fiber", value: `${fiber.toFixed(0)}` }
  ];

  const vitamins = Object.entries(nutrientData.vitamins).map(([name, data]) => {
    const baseRDA = data.rda?.[gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  const minerals = Object.entries(nutrientData.minerals).map(([name, data]) => {
    const baseRDA = data.rda?.[gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  return {
    recoveryTDEE,
    recoveryMacros,
    vitamins,
    minerals
  };


}

export function calculateActiveFuel({
  weight_lbs,
  weight_kg,
  steps,
  exerciseMinutes,
  exerciseIntensity,
  height_cm,
  gender,
  age,
  calorieGoal,
}) {//AGE INLINE//
  let ageGroup;
  if (age < 4) {
    ageGroup = "infant";
  } else if (age < 9) {
    ageGroup = "child";
  } else if (age < 14) {
    ageGroup = "tween";
  } else if (age < 19) {
    ageGroup = "teen";
  } else if (age < 30) {
    ageGroup = "young_adult";
  } else if (age < 50) {
    ageGroup = "adult";
  } else if (age < 70) {
    ageGroup = "older_adult";
  } else {
    ageGroup = "elder";
  }
  //WEIGHT INLINE//
  let weightRange;
  const w = parseFloat(weight_lbs);
  if (w < 100) {
    weightRange = "low";
  } else if (w < 150) {
    weightRange = "moderate";
  } else if (w < 200) {
    weightRange = "high";
  } else {
    weightRange = "very_high";
  }

  //BMR FORMULA//
  const BMR = gender === "male"
    ? (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    : (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161;

  //BASE NEAT//
  const awakeHours = 16;
  const baselineNEAT = 0.25 * weight_kg * awakeHours;

  //STEP NEAT//
  const stepCals = steps * 0.04 + (steps / 1000) * 2;

  //EAT//
  const calsPerMin = { none: 0, light: 5, moderate: 7, high: 10 }[exerciseIntensity] || 0;
  const EAT = exerciseMinutes * calsPerMin;

  //ACTIVE TDEE//
  const rawActiveTDEE = BMR + baselineNEAT + stepCals + EAT + calorieGoal;
  const activeTDEE = Math.round(rawActiveTDEE / 0.9);

  // Protein (weight-based)
  const proteinMin = weight_lbs * 0.7;
  const proteinMax = weight_lbs * 1.2;

  // Macronutrient Percentage Ranges (to support flexible goals)
  const carbPctMin = 10;
  const carbPctMax = 60;
  const fatPctMin = 20;
  const fatPctMax = 60;

  // Carbohydrates (calories per gram = 4)
  const carbsMin = (activeTDEE * (carbPctMin / 100)) / 4;
  const carbsMax = (activeTDEE * (carbPctMax / 100)) / 4;

  // Fats (calories per gram = 9)
  const fatsMin = (activeTDEE * (fatPctMin / 100)) / 9;
  const fatsMax = (activeTDEE * (fatPctMax / 100)) / 9;

  // Fiber (14g per 1000 calories rule)
  const fiber = (activeTDEE / 1000) * 14;

  const activeMacros = [
    { name: "Protein", value: `${proteinMin.toFixed(0)}–${proteinMax.toFixed(0)}` },
    { name: "Carbohydrates", value: `${carbsMin.toFixed(0)}–${carbsMax.toFixed(0)}` },
    { name: "Fats", value: `${fatsMin.toFixed(0)}–${fatsMax.toFixed(0)}` },
    { name: "Fiber", value: `${fiber.toFixed(0)}` }
  ];

  const vitamins = Object.entries(nutrientData.vitamins).map(([name, data]) => {
    const baseRDA = data.rda?.[gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  const minerals = Object.entries(nutrientData.minerals).map(([name, data]) => {
    const baseRDA = data.rda?.[gender]?.[ageGroup] ?? null;
    const modifier = data.weightModifier?.[weightRange] ?? 1;
    const rda = baseRDA ? Math.round(baseRDA * modifier) : "Varies";
    const ul = data.ul ?? "Varies";
    return { name, rda, ul, unit: data.unit, functions: data.functions };
  });

  return {
    activeTDEE,
    activeMacros,
    vitamins,
    minerals
  };


}

