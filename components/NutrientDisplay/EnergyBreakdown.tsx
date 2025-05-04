// components/EnergyBreakdown.tsx
'use client';

import React from 'react';
import useFuelFormData from "@/lib/hooks/CoreData";
import { HeartPlus } from "lucide-react";

type MacroRange = {
  recovery: string;
  active: string;
};

type EnergyData = {
  calories: MacroRange;
  protein: MacroRange;
  carbs: MacroRange;
  fats: MacroRange;
  fiber: MacroRange
};

interface EnergyBreakdownProps {
  data: EnergyData;
}

export default function EnergyBreakdown({ data }: EnergyBreakdownProps) {

    const { fitnessGoals } = useFuelFormData();

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg pt-2 w-full max-w-lg mx-auto mt-4 text-black overflow-hidden">
      <h2 className="text-center font-bold text-lg mb-3">Energy Breakdown</h2>
      <hr className="my-2 border-t-4 border-white/30" />

      <h2 className="pl-8 text-gray-800 text-3md flex items-center gap-3"><HeartPlus />Set Calorie Goal Applied</h2>
      <hr className="my-2 border-t-4 border-white/30" />

      <h2 className="pl-8 text-gray-800 text-3md mb-3 flex items-center gap-3"><HeartPlus />10% Thermic Effect of Food Applied</h2>
      <table className="w-full text-sm md:text-base text-center overflow-hidden">
        <thead>
          <tr className="bg-white/50 font-semibold">
            <th className="py-2">Energy</th>
            <th className="py-2">Recovery</th>
            <th className="py-2">Active</th>
          </tr>
        </thead>
        <tbody className="text-black">
          <tr className="hover:bg-white/20 transition">
            <td className="py-2 font-medium font-semibold bg-white/10">Calories</td>
            <td>{data.calories.recovery} kcal</td>
            <td>{data.calories.active} kcal</td>
          </tr>

          <tr>
          <td colSpan={4}>
            <hr className="border-t border-white/40" />
          </td>
        </tr>

          <tr className="hover:bg-white/20 transition">
            <td className="py-2 font-medium font-semibold bg-white/10">Protein</td>
            <td>{data.protein.recovery}g</td>
            <td>{data.protein.active}g</td>
          </tr>

          <tr>
          <td colSpan={4}>
            <hr className="border-t border-white/40" />
          </td>
        </tr>

          <tr className="hover:bg-white/20 transition">
            <td className="py-2 font-medium font-semibold bg-white/10">Carbs</td>
            <td>{data.carbs.recovery}g</td>
            <td>{data.carbs.active}g</td>
          </tr>

          <tr>
          <td colSpan={4}>
            <hr className="border-t border-white/40" />
          </td>
        </tr>
       

          <tr className="hover:bg-white/20 transition">
            <td className="py-2 font-medium font-semibold bg-white/10">Fats</td>
            <td>{data.fats.recovery}g</td>
            <td>{data.fats.active}g</td>
          </tr>

          <tr>
          <td colSpan={4}>
            <hr className="border-t border-white/40" />
          </td>
        </tr>

          <tr className="hover:bg-white/20 transition">
            <td className="py-2 font-medium font-semibold bg-white/10">Fiber</td>
            <td>{data.fiber.recovery}g</td>
            <td>{data.fiber.active}g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
