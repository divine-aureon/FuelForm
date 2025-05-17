'use client';

import useCoreData from "@/lib/hooks/CoreData";


export function BuildVitaminData(latestSync: any) {

    const vitamins = latestSync?.vitamins || [];

    const Nutrient_V = vitamins?.map((item: any) => ({
        name: item.name || '[n/a]',
        functions: item.functions || '[n/a]',
        rda: item.rda || '[n/a]',
        ul: item.ul || '[n/a]',
        unit: item.unit || '[n/a]',
      }));

    return Nutrient_V;

}
