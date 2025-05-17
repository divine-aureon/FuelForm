// components/EnergyBreakdown.tsx
'use client';

import React from 'react';
import useCoreData from "@/lib/hooks/CoreData";
import { HeartPlus } from "lucide-react";
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, Sprout, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";


type MacroRange = {
  recovery: string;
  active: string;
  average: string;
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

  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);


  return (
    <>

      <div className="h-32 relative w-full bg-[url('/images/menus/dawn.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white text-3xl glowing-button mb-2">
        <div className="absolute inset-0 pt-5 p-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
          <div className="text-center gap-2 pulse-glow ">Energy Breakdown</div>
          <h2 className="text-sm font-bold text-white">
            Each morning is a chance to recalibrate. Enter your truth and proceed with clarity.
          </h2>
        </div>

      </div>


      <div className="flex items-center justify-between px-14 ">

        <button onClick={() => {
          setSelectedPage("Macros");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
          <div
            className="bg-white/30 rounded-3xl  border border-bg-indigo-300 flex flex-col  hover:bg-indigo-300/50 text-center p-2">
            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
              Macros
              <Flame size={30} />
            </div>
          </div>

        </button>

        <button onClick={() => {
          setSelectedPage("Vitamins");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
          <div
            className="bg-white/30 rounded-3xl  border border-bg-indigo-300 flex  hover:bg-indigo-300/50 flex-col text-center p-2">
            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
              Vitamin
              <Sprout size={30} />
            </div>
          </div>

        </button>

        <button onClick={() => {
          setSelectedPage("Minerals");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
          <div
            className="bg-white/30 rounded-3xl  border border-bg-indigo-300  hover:bg-indigo-300/50 flex flex-col text-center p-2 ">
            <div className="flex leading-none text-sm items-center flex-col font-semibold" >
              Mineral
              <Atom size={30} />
            </div>
          </div>
        </button>
      </div>



      <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg pt-2 w-full max-w-md mx-auto mt-4 text-black overflow-hidden">
        <h2 className="pl-8 text-gray-800 text-3md flex items-center gap-3"><HeartPlus />Set Calorie Goal Applied</h2>
        <hr className="my-2 border-t-4 border-white/30" />

        <h2 className="pl-8 text-gray-800 text-3md mb-3 flex items-center gap-3"><HeartPlus />10% Thermic Effect of Food Applied</h2>
        <table className="w-full text-sm md:text-base text-center overflow-hidden">
          <thead>
            <tr className="bg-white/50 font-semibold">
              <th className="py-2">Energy</th>
              <th className="py-2">RestDay</th>
              <th className="py-2">7 Day Average</th>
              <th className="py-2">ActiveDay</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr className="hover:bg-white/20 transition">
              <td className="py-2 font-medium font-semibold bg-white/10">Calories</td>
              <td>{data.calories.recovery} kcal</td>
              <td>{data.calories.average} kcal</td>
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
              <td>{data.protein.average}g</td>
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
              <td>{data.carbs.average}g</td>
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
              <td>{data.fats.average}g</td>
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
              <td>{data.fiber.average}g</td>
              <td>{data.fiber.active}g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
