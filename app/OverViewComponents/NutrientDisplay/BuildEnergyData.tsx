'use client';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import useCoreData from "@/lib/hooks/CoreData";
import { doc, getDoc, collection } from "firebase/firestore";
import { subDays, format } from "date-fns";
import { db } from "@/lib/firebase"; // adjust if needed
import { useState, useEffect } from "react";
import useAuth from '@/lib/useAuth';
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

export function BuildEnergyData(latestSync: any) {

    const { user } = useAuth();

    const recoveryTDEE = latestSync?.recoveryTDEE;
    const activeTDEE = latestSync?.activeTDEE;
    const activeMacros = latestSync?.activeMacros || [];
    const recoveryMacros = latestSync?.recoveryMacros || [];

    const { userProfile } = useCoreData();
    console.log("⚡ CoreData userProfile:", userProfile);

    const active = activeMacros?.reduce((acc: Record<string, string>, item: any) => {
        acc[item.name] = item.value;
        return acc;
    }, {});

    const recovery = recoveryMacros?.reduce((acc: Record<string, string>, item: any) => {
        acc[item.name] = item.value;
        return acc;
    }, {});

    async function getLast7ActiveTDEEs(userId: string) {
        const today = new Date();

        const last7Dates = Array.from({ length: 7 }).map((_, i) =>
            format(subDays(today, i), "yyyy-MM-dd")
        );

        const syncsRef = collection(db, "users", userId, "syncs");

        const tdeeValues = await Promise.all(
            last7Dates.map(async (date) => {
                const docSnap = await getDoc(doc(syncsRef, date));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    return data.activeTDEE || null;
                }
                return null;
            })
        );

        return tdeeValues.filter((val) => val !== null) as number[];
    }

    const [last7TDEEs, setLast7TDEEs] = useState<number[]>([]);


    async function getLastKnownWeight(userId: string): Promise<number | null> {
        const syncsRef = collection(db, "users", userId, "syncs");
        const q = query(
            syncsRef,
            where("weight_lbs", "!=", null), // get only syncs that recorded weight
            orderBy("weight_lbs", "desc"),   // dummy order to satisfy Firestore
            orderBy("__name__", "desc"),
            limit(1)
        )

        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;

        const data = snapshot.docs[0].data();
        return data.weight_lbs || null;
    }

    const [lastWeight, setLastWeight] = useState<number | null>(null);

    useEffect(() => {
        if (!user?.uid) return;
        getLast7ActiveTDEEs(user.uid).then(setLast7TDEEs);
    }, [user?.uid]);

    const averageTDEE = Math.round(
        last7TDEEs.reduce((sum, val) => sum + val, 0) / last7TDEEs.length
    );

    useEffect(() => {
        if (!user?.uid) return;
        getLastKnownWeight(user.uid).then(setLastWeight);
    }, [user?.uid]);


    const averageTDEEString = averageTDEE.toString();



    // Macronutrient Percentage Ranges (to support flexible goals)
    const carbPctMin = 10;
    const carbPctMax = 60;
    const fatPctMin = 20;
    const fatPctMax = 60;

    // Carbohydrates (calories per gram = 4)
    const carbsMin = (averageTDEE * (carbPctMin / 100)) / 4;
    const carbsMax = (averageTDEE * (carbPctMax / 100)) / 4;

    // Fats (calories per gram = 9)
    const fatsMin = (averageTDEE * (fatPctMin / 100)) / 9;
    const fatsMax = (averageTDEE * (fatPctMax / 100)) / 9;

    // Fiber (14g per 1000 calories rule)
    const fiber = (averageTDEE / 1000) * 14;

    const carbsString = `${Math.round(carbsMin)}–${Math.round(carbsMax)}`;
    const fatsString = `${Math.round(fatsMin)}–${Math.round(fatsMax)}`;
    const fiberString = `${Math.round(fiber)}–${Math.round(fiber + 10)}`;



    // Protein (weight-based)
    const proteinLow = userProfile?.lastKnownWeight_lbs ? Math.round(userProfile?.lastKnownWeight_lbs * 0.7) : '[n/a]';
    const proteinHigh = userProfile?.lastKnownWeight_lbs ? Math.round(userProfile?.lastKnownWeight_lbs * 1.2) : '[n/a]';
    const estimatedProtein = userProfile?.lastKnownWeight_lbs ? `${proteinLow}–${proteinHigh}` : '[n/a]';


    const EnergyData = {
        calories: {
            recovery: recoveryTDEE || '[n/a]',
            average: averageTDEEString === 'NaN' ? '[n/a]' : averageTDEEString,
            active: activeTDEE || '[n/a]',
        },
        protein: {
            recovery: recovery["Protein"] || '[n/a]',
            average: estimatedProtein || '[n/a]',
            active: active["Protein"] || '[n/a]',
        },
        carbs: {
            recovery: recovery["Carbohydrates"] || '[n/a]',
            average: carbsString === 'NaN–NaN' ? '[n/a]' : carbsString,
            active: active["Carbohydrates"] || '[n/a]',
        },
        fats: {
            recovery: recovery["Fats"] || '[n/a]',
            average: fatsString === 'NaN–NaN' ? '[n/a]' : fatsString,
            active: active["Fats"] || '[n/a]',
        },
        fiber: {
            recovery: recovery["Fiber"] || '[n/a]',
            average: fiberString === 'NaN–NaN' ? '[n/a]' : fiberString,

            active: active["Fiber"] || '[n/a]',
        },
    };

    return EnergyData;

}
