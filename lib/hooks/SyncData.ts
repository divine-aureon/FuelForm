"use client";

import useFuelFormData from "@/lib/hooks/CoreData"; // Adjust this path to match your project

interface SyncData {
  weight_lbs: number;
  weight_kg: number;
  steps: number;
  exerciseMinutes: number;
  exerciseIntensity: string;
  activeMacros?: any[];
  recoveryMacros?: any[];
  vitamins?: any[];
  minerals?: any[];
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
    activeMacros: latestSync?.activeMacros || [],
    recoveryMacros: latestSync?.recoveryMacros || [],
    vitamins: latestSync?.vitamins || [],
    minerals: latestSync?.minerals || [],
    timestamp: latestSync?.timestamp || null,
  };
}
