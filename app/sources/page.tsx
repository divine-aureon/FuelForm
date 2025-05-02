'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';
import { useBackground } from '@/components/Backgrounds/BackgroundContext';

export default function SourcesPage() {


  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    setBackgroundMode("main");
  }, [setBackgroundMode]);

  
  return (
      <div className="mb-20">
          <h1 className="text-2xl">Sources</h1>

          <section>
            <h1 className="text-3xl font-bold mb-4">FuelForm Plant-Based Sources</h1>
            <p className="mb-6 text-gray-300">
              This page documents the official data sources used in the creation of our FuelForm Plant-Based database.
              These resources provide validated nutritional information from trusted databases maintained by the U.S. government.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">USDA FoodData Central</h2>
                <p className="text-gray-400">
                  Comprehensive food and nutrient database including SR Legacy and Foundation Foods.
                </p>
                <a className="text-blue-400 underline" href="https://fdc.nal.usda.gov/" target="_blank">Visit FoodData Central</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">USDA SR Legacy</h2>
                <p className="text-gray-400">
                  Standard Reference Legacy Release — historic nutrient data for over 7,000 foods.
                </p>
                <a className="text-blue-400 underline" href="https://fdc.nal.usda.gov/download.html" target="_blank">Download SR Legacy</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">USDA Foundation Foods</h2>
                <p className="text-gray-400">
                  Detailed nutrient profiles of minimally processed foods with data quality annotations.
                </p>
                <a className="text-blue-400 underline" href="https://fdc.nal.usda.gov/download.html" target="_blank">Download Foundation Foods</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">FuelForm Source Archive (CSV)</h2>
                <p className="text-gray-400">
                  Click below to download the internal CSV containing all sources referenced during FuelForm’s plant-based development.
                </p>
                <a className="text-green-400 underline font-semibold" href="/downloads/fuelform_sources_plant_based.csv" download>Download CSV</a>
              </div>
            </div>
          </section>
          <section>
            <h1 className="text-3xl font-bold mb-4">FuelForm Animal-Based Sources</h1>
            <p className="mb-6 text-gray-300">
              This page documents the official data sources used in the creation of our FuelForm Animal-Based database.
              These resources provide validated nutritional information from trusted databases maintained by the U.S. government and international authorities.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">USDA FoodData Central</h2>
                <p className="text-gray-400">
                  A comprehensive U.S. government resource for animal-based food nutrient data, including meats, dairy, and eggs.
                </p>
                <a className="text-blue-400 underline" href="https://fdc.nal.usda.gov/" target="_blank">Visit FoodData Central</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">EFSA (European Food Safety Authority)</h2>
                <p className="text-gray-400">
                  Provides scientific advice and data on animal products in the EU, including meats, fish, eggs, and milk.
                </p>
                <a className="text-blue-400 underline" href="https://www.efsa.europa.eu/" target="_blank">Visit EFSA</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">NIH (National Institutes of Health)</h2>
                <p className="text-gray-400">
                  Offers data on animal nutrition, focusing on vitamins, minerals, and bioactive compounds in meats and animal products.
                </p>
                <a className="text-blue-400 underline" href="https://ods.od.nih.gov/" target="_blank">Visit NIH</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">National Agricultural Library (NAL)</h2>
                <p className="text-gray-400">
                  Offers various animal-product resources like Nutrient Data Laboratory, and includes comprehensive food composition data.
                </p>
                <a className="text-blue-400 underline" href="https://www.nal.usda.gov/" target="_blank">Visit NAL</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">Meat & Livestock Australia</h2>
                <p className="text-gray-400">
                  Provides detailed data on the nutritional composition of various animal meats and products, especially lamb and beef.
                </p>
                <a className="text-blue-400 underline" href="https://www.mla.com.au/" target="_blank">Visit MLA</a>
              </div>

              <div className="bg-gray-900 shadow rounded-xl p-5">
                <h2 className="text-xl font-semibold">FuelForm Source Archive (CSV)</h2>
                <p className="text-gray-400">
                  Click below to download the internal CSV containing all sources referenced during FuelForm’s animal-based development.
                </p>
                <a className="text-green-400 underline font-semibold" href="/downloads/fuelform_sources_animal_based.csv" download>Download CSV</a>a
              </div>
            </div>
          </section>

          <div className="mt-12 bg-gray-900 p-4 rounded-xl text-sm text-gray-400 border border-gray-700">
            <p className="mb-2 font-semibold text-white">Disclaimer:</p>
            <p>
              The information provided on FuelForm is for educational and informational purposes only.
              It is not intended as medical advice, diagnosis, or treatment. Always consult with a qualified
              healthcare provider before making changes to your diet, supplements, or lifestyle — especially
              if you have any pre-existing conditions or are taking medication.
            </p>
          </div>
          <div className="all-[unset]">
            <div className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-5 border-t border-white/20 z-50">
              <Link href="/" className="text-base text-[32px] hover:underline">
                Home
              </Link>
            </div>
          </div>
      </div>
  );
}