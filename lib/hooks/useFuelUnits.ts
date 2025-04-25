"use client";

import useFuelFormData from "@/lib/hooks/useFuelFormData";

export default function useFuelUnits() {
  const { profile } = useFuelFormData();

  const weightUnit = profile?.preferredWeightUnit || "lbs";
  const heightUnit = profile?.preferredHeightUnit || "cm";

  const convertWeight = (weight: number, from: "kg" | "lbs", to: "kg" | "lbs") => {
    if (from === to) return weight;
    return from === "kg" ? weight * 2.20462 : weight / 2.20462;
  };

  const formatWeight = (weight_lbs: number, weight_kg: number): string => {
    return weightUnit === "kg"
      ? `${weight_kg.toFixed(1)} kg`
      : `${weight_lbs.toFixed(1)} lbs`;
  };

  return {
    weightUnit,
    heightUnit,
    convertWeight,
    formatWeight,
  };
}
