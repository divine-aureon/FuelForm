"use client";

import useFuelFormData from "@/lib/hooks/useFuelFormData";

interface MacroRange {
  proteinMin: number;
  proteinMax: number;
  fatMin: number;
  fatMax: number;
  carbsMin: number;
  carbsMax: number;
  calories: number;
}

export default function useFuelMacros(): MacroRange {
  const { profile, latestSync } = useFuelFormData();

  const weight = profile.preferredWeightUnit === "kg"
    ? latestSync?.weight_kg || 0
    : latestSync?.weight_lbs || 0;

  const weightInLbs = profile.preferredWeightUnit === "kg"
    ? (latestSync?.weight_kg || 0) * 2.20462
    : latestSync?.weight_lbs || 0;

  // Protein Range (0.7g–1.0g per lb)
  const proteinMin = Math.round(weightInLbs * 0.7);
  const proteinMax = Math.round(weightInLbs * 1.2);

  // Fat Range (0.3g–0.45g per lb)
  const fatMin = Math.round(weightInLbs * 0.3);
  const fatMax = Math.round(weightInLbs * 0.45);

  // Estimate Calories
  const steps = latestSync?.steps || 0;
  const exerciseMinutes = latestSync?.exerciseMinutes || 0;
  const baseCalories = 10 * weightInLbs + 500; // Rough BMR + buffer
  const activityCalories = steps * 0.04 + exerciseMinutes * 6;
  const totalCalories = Math.round(baseCalories + activityCalories);

  // Carbs = leftover calories after protein + fat
  const minCaloriesUsed = (proteinMin * 4) + (fatMin * 9);
  const maxCaloriesUsed = (proteinMax * 4) + (fatMax * 9);

  const carbsMin = Math.round((totalCalories - minCaloriesUsed) / 4);
  const carbsMax = Math.round((totalCalories - maxCaloriesUsed) / 4);

  return {
    proteinMin,
    proteinMax,
    fatMin,
    fatMax,
    carbsMin,
    carbsMax,
    calories: totalCalories,
  };
}
