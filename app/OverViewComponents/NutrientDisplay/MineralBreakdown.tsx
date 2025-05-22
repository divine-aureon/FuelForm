'use client';

import React from 'react';
import { Crown, Flame, Zap, Star, Shield, Atom, Heart, Bird, Dna, KeyRound, Settings, Mars, Venus, Fingerprint } from 'lucide-react';
import { Sun, Moon, Lock, Sprout, CircleCheckBig, Rotate3d, CircleArrowLeft, CircleArrowRight, SmilePlus, Dumbbell, Utensils, ListChecks, StepForward, StepBack } from "lucide-react";
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";


type Nutrient_M = {
  functions: string [];
  name: string;
  rda: string;
  ul: string;
  unit: string;
};

interface MineralBreakdownProps {
  minerals: Nutrient_M[];
}

export default function MineralBreakdown({ minerals }: MineralBreakdownProps) {

  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  return (


        <>

     <div className="h-50 w-full bg-[url('/images/menus/dawn.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
             text-white text-3xl glowing-button2 mb-2">
            <div className=" h-50 inset-0 pt-5 p-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
              <div className="text-center gap-2 pulse-glow ">Recommended Minerals</div>
              <h2 className="text-sm font-bold text-white">
                Each morning is a chance to recalibrate. Enter your truth and proceed with clarity.
              </h2>
    
    
              <div className="flex items-center z-30 mt-3 justify-between px-14 ">
    
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
            </div>
    
          </div>

  <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md mx-auto mt-4 text-black overflow-hidden">

      <table className="w-full text-sm md:text-base text-center overflow-hidden">

        <thead className="bg-white/50 font-semibold">
          <tr>
            <th className="py-2 px-3">Mineral</th>
            <th className="py-2 px-3">RDA</th>
            <th className="py-2 px-3">Upper Limit</th>
            <th className="py-2 px-3">Unit</th>
          </tr>
        </thead>
        <tbody>
          {minerals.map((mineral, index) => (

            <React.Fragment key={index}>
      <tr>
          <td colSpan={4}>
            <hr className="border-t border-white/40" />
          </td>
        </tr>
              <tr className="hover:bg-white/20 transition">
                <td className="py-2 px-3 font-medium bg-white/10">{mineral.name}</td>
                <td className="py-2 px-3">{mineral.rda}</td>
                <td className="py-2 px-3">{mineral.ul}</td>
                <td className="py-2 px-3">{mineral.unit}</td>
                
              </tr>
              <tr>
  <td className="italic text-sm font-semibold text-black/80 px-3 align-top bg-white/10">Functions:</td>
  <td colSpan={3} className="italic text-left font-semibold text-sm text-black/80 px-3">
    {mineral.functions.map((fn: string, i: number) => (
      <span key={i}
      >      
        {fn}{i < mineral.functions.length - 1 ? ' • ' : ''}
        
      </span>
    ))}
  </td>
</tr>
      
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
