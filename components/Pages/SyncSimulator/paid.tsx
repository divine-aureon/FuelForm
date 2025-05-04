"use client"; // if needed depending on your Next.js version

import { useState } from "react";
import { calculateRecoveryFuel, calculateActiveFuel } from "@/lib/FusionCore";
import EnergyBreakdown from "@/components/NutrientDisplay/EnergyBreakdown"
import VitaminBreakdown from "@/components/NutrientDisplay/VitaminBreakdown"
import MineralBreakdown from "@/components/NutrientDisplay/MineralBreakdown"

export default function PaidSyncSimulator() {

    const [weight_lbs, setWeight_lbs] = useState("");
    const [weight_kg, setWeight_kg] = useState("");
    const [height_cm, setHeight_cm] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male"); // default male, or you could leave it blank
    const [steps, setSteps] = useState("");
    const [exerciseMinutes, setExerciseMinutes] = useState("");
    const [exerciseIntensity, setExerciseIntensity] = useState("low");
    const [preferredHeightUnit, setpreferredHeightUnit] = useState<"cm" | "ft_in">("cm");
    const [preferredWeightUnit, setpreferredWeightUnit] = useState<"lbs" | "kg">("lbs");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [calorieGoal, setCalorieGoal] = useState("");

    const [EnergyData, setEnergyData] = useState<any>(null);
    const [Nutrient_V, setNutrient_V] = useState<any>(null);
    const [Nutrient_M, setNutrient_M] = useState<any>(null);
    const [calculated, setCalculated] = useState(false);

    const handleWeightChange = (input: string) => {
        const parsed = parseFloat(input);
        if (isNaN(parsed)) return; // 🛡️ Guard against bad input

        if (preferredWeightUnit === "lbs") {
            setWeight_lbs(parsed.toString());
            setWeight_kg((parsed * 0.453592).toFixed(2).toString()); // ✅ fixed decimals
        } else {
            setWeight_kg(parsed.toString());
            setWeight_lbs((parsed * 2.20462).toFixed(2).toString()); // ✅ fixed decimals
        }
    };

    const handleFeetInchesChange = (feetInput: string, inchesInput: string) => {
        const feetNum = parseFloat(feetInput) || 0;
        const inchesNum = parseFloat(inchesInput) || 0;

        const totalInches = (feetNum * 12) + inchesNum;
        const cm = totalInches * 2.54;

        setHeight_cm(cm.toFixed(1)); // ✅ store it nicely (like 180.3 cm)
    };


    const handleCalculate = () => {
        const recovery = calculateRecoveryFuel({
            weight_lbs: Number(weight_lbs),
            weight_kg: Number(weight_kg),
            height_cm: Number(height_cm),
            gender,
            age: Number(age),
            calorieGoal: Number(calorieGoal),

        });

        const active = calculateActiveFuel({
            weight_lbs: Number(weight_lbs),
            weight_kg: Number(weight_kg),
            steps: Number(steps),
            exerciseMinutes: Number(exerciseMinutes),
            exerciseIntensity,
            height_cm: Number(height_cm),
            age: Number(age),
            gender,
            calorieGoal: Number(calorieGoal),
        });

        console.log("🧠 recovery.vitamins", recovery.vitamins);
        console.log("🧠 active.vitamins", active.vitamins);


        const activeMap = active.activeMacros?.reduce((acc: Record<string, string>, item: any) => {
            acc[item.name] = item.value;
            return acc;
        }, {});

        const recoveryMap = recovery.recoveryMacros?.reduce((acc: Record<string, string>, item: any) => {
            acc[item.name] = item.value;
            return acc;
        }, {});

        const EnergyData = {
            calories: {
                recovery: recovery.recoveryTDEE || '[n/a-]',
                active: active.activeTDEE || '[n/a-]',
            },
            protein: {
                recovery: recoveryMap["Protein"] || '[n/a-]',
                active: activeMap["Protein"] || '[n/a-]',
            },
            carbs: {
                recovery: recoveryMap["Carbohydrates"] || '[n/a-]',
                active: activeMap["Carbohydrates"] || '[n/a-]',
            },
            fats: {
                recovery: recoveryMap["Fats"] || '[n/a-]',
                active: activeMap["Fats"] || '[n/a-]',
            },
            fiber: {
                recovery: recoveryMap["Fiber"] || '[n/a-]',
                active: activeMap["Fiber"] || '[n/a-]',
            },

        };

        const Nutrient_V = recovery.vitamins?.map((item: any) => ({
            name: item.name || '[n/a-]',
            functions: item.functions || '[n/a-]',
            rda: item.rda || '[n/a-]',
            ul: item.ul || '[n/a-]',
            unit: item.unit || '[n/a-]',
        }));


        const Nutrient_M = recovery.minerals?.map((item: any) => ({
            name: item.name || '[n/a-]',
            functions: item.functions || '[n/a-]',
            rda: item.rda || '[n/a-]',
            ul: item.ul || '[n/a-]',
            unit: item.unit || '[n/a-]',
        }));

        setNutrient_M(Nutrient_M);
        setNutrient_V(Nutrient_V);
        setEnergyData(EnergyData);

        setCalculated(true);
    };

    return (
        <main className="rounded-lg mb-12 p-0">
            <div className="text-center">
                <div className="bg-[url('/images/hologram.gif')] bg-cover bg-center bg-no-repeat bg rounded-xl overflow-hidden">
                    <div className="inset-0 w-full bg-blue-300/20 rounded-xl p-2">
                        <h1 className="text-4xl flex justify-center font-bold pulse-glow p-2">
                            Sync Simulator</h1>
                        <h2 className="text-lg flex justify-center p-2">
                            Sync Simulator lets you test how FuelForms FusionCore calculates your calories
                            and macros based on your Biometrics, steps, and exercise.
                        </h2>
                    </div>
                </div>
                {/* Inputs */}
                <div className="flex flex-col text-xl text-white gap-2 mt-4 mb-4 w-full">
                    <select value={preferredWeightUnit}
                        onChange={(e) => setpreferredWeightUnit(e.target.value as "lbs" | "kg")}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30">
                        <option value="lbs">Pounds (lbs)</option>
                        <option value="kg">Kilograms (kg)</option>

                    </select>

                    {preferredWeightUnit === "lbs" ? (
                        <input
                            type="text"
                            placeholder="Weight (lbs)"
                            value={weight_lbs}
                            onChange={(e) => handleWeightChange(e.target.value)}
                            className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="Weight (kg)"
                            value={weight_kg}
                            onChange={(e) => handleWeightChange(e.target.value)}
                            className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                        />
                    )}
                    <select value={preferredHeightUnit}
                        onChange={(e) => setpreferredHeightUnit(e.target.value as "cm" | "ft_in")}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30">
                        <option value="cm">Metric (cm)</option>
                        <option value="ft_in">Imperial (ft_in)</option>

                    </select>

                    {preferredHeightUnit === "cm" ? (
                        <input
                            type="text"
                            placeholder="Height (cm)"
                            value={height_cm}
                            onChange={(e) => setHeight_cm(e.target.value)}
                            className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                        />
                    ) : (

                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Feet"
                                value={feet}
                                onChange={(e) => {
                                    setFeet(e.target.value);
                                    handleFeetInchesChange(e.target.value, feet);
                                }}
                                className="p-2 w-full placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                            />
                            <input
                                type="number"
                                placeholder="Inches"
                                value={inches}
                                onChange={(e) => {
                                    setInches(e.target.value);
                                    handleFeetInchesChange(e.target.value, inches);
                                }}
                                onBlur={() => {
                                    const num = parseInt(inches);
                                    if (isNaN(num)) return;

                                    const clamped = Math.min(Math.max(num, 0), 11); // clamps to 0–11
                                    setInches(clamped.toString());
                                }}
                                className="p-2 w-full placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                            />
                        </div>

                    )}
                    <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    />
                    <select
                        value="" disabled hidden
                        onChange={(e) => setGender(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Steps"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    />
                    <input
                        type="text"
                        placeholder="Exercise Minutes"
                        value={exerciseMinutes}
                        onChange={(e) => setExerciseMinutes(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    />
                    <select
                        value={exerciseIntensity}
                        onChange={(e) => setExerciseIntensity(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    >
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                    <select
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(e.target.value)}
                        className="p-2 placeholder-white rounded-lg focus:outline-indigo-300 focus:border-indigo-300 bg-white/30"
                    >
                        <option value="">-/+ Calories Adjustment</option>
                        {["500", "400", "300", "200", "100", "0", "-100", "-200", "-300", "-400", "-500"].map((kcal) => (
                            <option key={kcal} value={kcal}>
                                {kcal} kcal
                            </option>
                        ))}
                    </select>
                </div>

                {/* Button */}

                <div className="fixed bottom-16 left-0 w-full flex gap-2 justify-center mb-2 z-30">
                    <button
                        onClick={handleCalculate}
                        className="text-2xl bg-white text-black px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                    >
                        Generate Nutrient Blueprint!
                    </button>
                </div>

                {/* Outputs */}

                {calculated && (
                    <>
                        <EnergyBreakdown data={EnergyData} />
                        <VitaminBreakdown Vitamins={Nutrient_V} />
                        <MineralBreakdown minerals={Nutrient_M} />
                    </>
                )}
            </div>
        </main >
    );
}
