"use client";

import useFuelFormData from "@/lib/hooks/useFuelFormData"; // Adjust this path to match your project

interface SyncData {
  weight_lbs: number;
  weight_kg: number;
  steps: number;
  exerciseMinutes: number;
  exerciseIntensity: string;
  recommendedMacros?: any[];
  recommendedVitamins?: any[];
  recommendedMinerals?: any[];
  timestamp?: any;
}

export default function useFuelSync(): SyncData {
  const { latestSync } = useFuelFormData();

  return {
    weight_lbs: latestSync?.weight_lbs || 0,
    weight_kg: latestSync?.weight_kg || 0,
    steps: latestSync?.steps || 0,
    exerciseMinutes: latestSync?.exerciseMinutes || 0,
    exerciseIntensity: latestSync?.exerciseIntensity || "low",
    recommendedMacros: latestSync?.recommendedMacros || [],
    recommendedVitamins: latestSync?.recommendedVitamins || [],
    recommendedMinerals: latestSync?.recommendedMinerals || [],
    timestamp: latestSync?.timestamp || null,
  };
}
