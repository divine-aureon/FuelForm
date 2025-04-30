"use client"; // if needed depending on your Next.js version

import { useState } from "react";
import { calculateRecoveryFuel, calculateActiveFuel } from "@/lib/FusionCore";
import EnergyBreakdown from "@/components/DataBreakdown/EnergyBreakdown"
import VitaminBreakdown from "@/components/DataBreakdown/VitaminBreakdown"
import MineralBreakdown from "@/components/DataBreakdown/MineralBreakdown"

export default function SyncSimulator() {

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
        <main className=" rounded-lg bg-white/25 w-full">
            <div className="  max-w-md">
                <h1 className="text-4xl flex justify-center font-bold mb-4 pulse-glow">
                    Sync Simulator</h1>
                {/* Inputs */}
                <div className="flex flex-col text-black gap-2 mb-4 w-full max-w-md">
                    <select value={preferredWeightUnit}
                        onChange={(e) => setpreferredWeightUnit(e.target.value as "lbs" | "kg")}
                        className="p-2 border rounded">
                        <option value="lbs">Pounds (lbs)</option>
                        <option value="kg">Kilograms (kg)</option>

                    </select>

                    {preferredWeightUnit === "lbs" ? (
                        <input
                            type="text"
                            placeholder="Weight (lbs)"
                            value={weight_lbs}
                            onChange={(e) => handleWeightChange(e.target.value)}
                            className="p-2 border rounded"
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="Weight (kg)"
                            value={weight_kg}
                            onChange={(e) => handleWeightChange(e.target.value)}
                            className="p-2 border rounded"
                        />
                    )}
                    <select value={preferredHeightUnit}
                        onChange={(e) => setpreferredHeightUnit(e.target.value as "cm" | "ft_in")}
                        className="p-2 border rounded">
                        <option value="cm">Metric (cm)</option>
                        <option value="ft_in">Imperial (ft_in)</option>

                    </select>

                    {preferredHeightUnit === "cm" ? (
                        <input
                            type="text"
                            placeholder="Height (cm)"
                            value={height_cm}
                            onChange={(e) => setHeight_cm(e.target.value)}
                            className="p-2 border rounded"
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
                                className="p-2 border rounded w-24"
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
                                className="p-2 border rounded w-24"
                            />
                        </div>

                    )}
                    <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <select
                        value="" disabled hidden
                        onChange={(e) => setGender(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Steps"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Exercise Minutes"
                        value={exerciseMinutes}
                        onChange={(e) => setExerciseMinutes(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <select
                        value={exerciseIntensity}
                        onChange={(e) => setExerciseIntensity(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {/* Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full rounded-lg p-2 bg-blue-500 text-3xl text-white rounded glowing-button"
                >
                    Sync Now!
                </button>

                {/* Outputs */}

                {calculated && (
                    <>
                        <EnergyBreakdown data={EnergyData} />
                        <VitaminBreakdown Vitamins={Nutrient_V} />
                        <MineralBreakdown minerals={Nutrient_M} />
                    </>
                )}
            </div>
        </main>
    );
}
