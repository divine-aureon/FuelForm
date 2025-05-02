'use client';

import React from 'react';

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
  return (
  <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg pt-2 w-full max-w-lg mx-auto mt-4 text-black overflow-hidden">
      <h2 className="text-center font-bold text-lg mb-3">Recommended Minerals</h2>
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
  );
}
