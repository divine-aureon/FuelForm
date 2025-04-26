// fuelCalculatorCore.js
import { getTDEE, calculateAllNutrition } from "@/lib/processingCore";

export function calculateProjectedFuel({ weight_lbs, projectedSteps, projectedExerciseMinutes, exerciseIntensity }) {
  const profile = {
    weight: weight_lbs,
    weightUnit: "lbs",
    steps: projectedSteps,
    exerciseMinutes: projectedExerciseMinutes,
    exerciseIntensity,
    height: 170, // Default placeholder
    heightUnit: "cm",
    gender: "male", // Default placeholder
    age: 25 // Default placeholder
  };

  const tdee = getTDEE(profile);
  const { macros, vitamins, minerals } = calculateAllNutrition(profile);

  return {
    tdee,
    macros,
    vitamins,
    minerals
  };
}

export function calculateFinalizedFuel({ weight_lbs, actualSteps, actualExerciseMinutes, exerciseIntensity }) {
  const profile = {
    weight: weight_lbs,
    weightUnit: "lbs",
    steps: actualSteps,
    exerciseMinutes: actualExerciseMinutes,
    exerciseIntensity,
    height: 170, // Default placeholder
    heightUnit: "cm",
    gender: "male", // Default placeholder
    age: 25 // Default placeholder
  };

  const tdee = getTDEE(profile);
  const { macros, vitamins, minerals } = calculateAllNutrition(profile);

  return {
    tdee,
    macros,
    vitamins,
    minerals
  };
}
