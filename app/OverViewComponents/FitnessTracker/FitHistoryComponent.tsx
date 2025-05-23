'use client';
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import type { UserProfile, FitnessSyncData } from "../../Global/BodySyncManifest"

import React from "react";
import { useEffect, useState } from 'react';
import useAuth from '@/lib/useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ScrollLoad from "@/Backgrounds/ScrollLoad"

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const dateString = `${yyyy}-${mm}-${dd}`;

export default function FitHistoryComponent() {

    //USER PROFILE INFO
    const { user } = useAuth();

    const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

    const latestFitnessSyncSTORE = getGlobalDataState().latestFitnessSyncSTORE;
    const fitnessHistorySTORE = getGlobalDataState().fitnessHistorySTORE;

    const fitnessHistory = fitnessHistorySTORE;

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedEntry, setSelectedEntry] = useState<FitnessSyncData | null>(null);
    const movements = selectedEntry?.sessionData?.movements || [];

    useEffect(() => {
        if (!fitnessHistory) return;
        const todayId = new Date().toISOString().split("T")[0];
        if (fitnessHistory && fitnessHistory[todayId]) {
            setSelectedDate(todayId);
            setSelectedEntry(fitnessHistory[todayId]);
        } else {
            const mostRecent = Object.keys(fitnessHistory || {})
                .sort((a, b) => b.localeCompare(a))[0];
            if (mostRecent) {
                setSelectedDate(mostRecent);
                setSelectedEntry(fitnessHistory[mostRecent]);
            }
        }
    }, [fitnessHistory]);

    const convertSetId = (setId: string | undefined): string => {
        if (!setId) return "Set ?";
        const match = setId.match(/\d+/);
        return match ? `Set ${match[0]}` : setId;
    };

    return (
        <div className="flex justify-center flex-col">
            <ScrollLoad />
            <div className="bg-white/50 flex flex-col rounded-xl p-2 mb-4 ">
                <label className="text-white font-semibold block text-center">Select Date:</label>
                <select
                    className="p-2 rounded mx-28 bg-black/40 text-white border border-white"
                    value={selectedDate}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectedDate(val);
                        setSelectedEntry(fitnessHistory?.[val] || null);
                    }}
                >
                    {Object.keys(fitnessHistory || {})
                        .sort((a, b) => b.localeCompare(a))
                        .map((dateId) => (
                            <option key={dateId} value={dateId}>
                                {dateId}
                            </option>
                        ))}
                </select>
            </div>
            {selectedEntry?.sessionData?.movements?.length ? (
                <div className="space-y-4 mb-12">
                    {selectedEntry.sessionData.movements.map((movement, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 shadow text-white">
                            <div className="text-2xl font-bold mb-2">{movement.name}</div>
                            <div className="p-1 rounded-xl bg-white/50 mb-2 "></div>

                            <ul className="space-y-1">
                                <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
                                    <div></div>
                                    <div className="bg-black/20 rounded-xl  text-lg text-right pr-2">Reps</div>
                                    <div className="bg-black/20 rounded-xl  text-lg text-left pl-2">Weight</div>
                                </div>
                                {movement.sets.map((set, j) => (
                                    <li key={set.setId || j} className="flex flex-col justify-between text-sm">



                                        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">

                                            <div className="bg-black/20 rounded-xl text-center">
                                                <span>{convertSetId(set.setId)} {set.isDropset ? "(Dropset)" : ""}</span>
                                            </div>


                                            <div className="text-right pr-2">
                                                {set.reps}
                                            </div>

                                            <div className="text-left pl-2 ">
                                                {set.liftWeight_lbs
                                                    ? `${set.liftWeight_lbs} lbs`
                                                    : `${set.liftWeight_kg} kg`}
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white mt-4 text-center text-xl bg-white/50 p-2 rounded-xl">No session data found for this date.</div>
            )}

        </div>
    );
};