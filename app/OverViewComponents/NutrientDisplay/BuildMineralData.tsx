'use client';


export function BuildMineralData(latestSync: any) {

    const minerals = latestSync?.minerals || [];

    const Nutrient_M = minerals?.map((item: any) => ({
        name: item.name || '[n/a]',
        functions: item.functions || '[n/a]',
        rda: item.rda || '[n/a]',
        ul: item.ul || '[n/a]',
        unit: item.unit || '[n/a]',
      }));

    return Nutrient_M;

}
