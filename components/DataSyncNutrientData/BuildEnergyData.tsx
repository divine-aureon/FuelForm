'use client';

import useFuelFormData from "@/lib/hooks/CoreData";


export function BuildEnergyData(latestSync: any) {

    const recoveryTDEE = latestSync?.recoveryTDEE;
    const activeTDEE = latestSync?.activeTDEE;
    const activeMacros = latestSync?.activeMacros || [];
    const recoveryMacros = latestSync?.recoveryMacros || [];

    const active = activeMacros?.reduce((acc: Record<string, string>, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
    
      const recovery = recoveryMacros?.reduce((acc: Record<string, string>, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});



    const EnergyData = {
        calories: {
            recovery: recoveryTDEE || '[n/a-]',
            active: activeTDEE || '[n/a-]',
        },
        protein: {
            recovery: recovery["Protein"] || '[n/a-]',
            active: active["Protein"] || '[n/a-]',
        },
        carbs: {
            recovery: recovery["Carbohydrates"] || '[n/a-]',
            active: active["Carbohydrates"] || '[n/a-]',
        },
        fats: {
            recovery: recovery["Fats"] || '[n/a-]',
            active: active["Fats"] || '[n/a-]',
        },
        fiber: {
            recovery: recovery["Fiber"] || '[n/a-]',
            active: active["Fiber"] || '[n/a-]',
        },
    };

    return EnergyData;

}
