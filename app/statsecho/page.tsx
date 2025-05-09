'use client';

import { Sun, Moon, Lock, CircleCheckBig } from "lucide-react";
import React from "react";
import { useEffect, useState } from 'react';
import useAuth from '@/lib/useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import useCoreData from "@/lib/hooks/CoreData";
import { useBackground } from '@/components/Backgrounds/BackgroundMaker';
import NavLoad from "@/components/Loading/NavLoad";
import NavPortalPaid from "@/components/NavPortal/NavPortalPaid";
import NavPortalFree from "@/components/NavPortal/NavPortalFree";

export default function PaidStatsEchoPage() {

  const { profile } = useCoreData();
  const isPaidUser = profile?.isPaid ?? null;

  const { settings } = useCoreData();

  const { setBackgroundMode } = useBackground();
  useEffect(() => {
    if (settings?.background) {
      setBackgroundMode(settings.background);
    }
  }, [settings?.background, setBackgroundMode]);

  { /USER PROFILE INFO/ }

  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const userRef = doc(db, 'users', user.uid);
      const syncsRef = collection(db, 'users', user.uid, 'syncs');

      const [profileSnap, syncsSnap] = await Promise.all([
        getDoc(userRef),
        getDocs(syncsRef),
      ]);

      const profileData = profileSnap.exists() ? profileSnap.data() : null;

      const allSyncs = syncsSnap.docs.map(doc => ({
        id: doc.id,           // e.g., "2025-05-03"
        date: doc.id,         // same as id; this is your date
        ...doc.data(),        // spread the rest (weight, TDEE, etc)
      }))
        .sort((a, b) => b.date.localeCompare(a.date)); // Newest to oldest

      setStats({
        profile: profileData,
        syncs: allSyncs,
      });
    };

    fetchStats();
  }, [user]);

  { /WEIGHT ARRAY/ }

  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");

  useEffect(() => {
    if (stats?.profile?.preferredWeightUnit) {
      setWeightUnit(stats.profile.preferredWeightUnit);
    }
  }, [stats?.profile?.preferredWeightUnit]);

  const [selectedMonth, setSelectedMonth] = useState("All");

  type SyncEntry = {
    date: string;
    weight: string | number;
    unit: string;
  };

  const SyncArray: SyncEntry[] = stats?.syncs?.map((sync: any) => ({
    date: sync.id,
    weight:
      weightUnit === "lbs"
        ? Number(sync.weight_lbs) && !isNaN(Number(sync.weight_lbs))
          ? Number(Number(sync.weight_lbs).toFixed(1))
          : "[n/a]"
        : Number(sync.weight_kg) && !isNaN(Number(sync.weight_kg))
          ? Number(Number(sync.weight_kg).toFixed(1))
          : "[n/a]",
    unit: weightUnit,

  }));

  const weightValues = (SyncArray || [])
    .filter(entry => typeof entry.weight === "number")
    .map(entry => entry.weight as number);

  const minWeight = Math.min(...weightValues);
  const maxWeight = Math.max(...weightValues);

  const yMin = Math.floor(minWeight - 1);
  const yMax = Math.ceil(maxWeight + 1);

  const filteredSyncArray = (SyncArray || []).filter(entry =>
    selectedMonth === "All" ? true : entry.date.startsWith(selectedMonth));


  const availableMonths = SyncArray
    ? [...new Set(SyncArray.map(entry => entry.date.slice(0, 7)))]
    : [];

  const chartWeightData = [...filteredSyncArray].reverse();

  { /STEPS ARRAY/ }

  const [selectedStepsMonth, setSelectedStepsMonth] = useState("All");

  type StepSyncEntry = {
    date: string;
    steps: string | number;
  };

  const StepSyncArray: StepSyncEntry[] = stats?.syncs?.map((sync: any) => ({
    date: sync.id,
    steps: Number(sync.steps) ?? 0,
  }));

  const stepValues = (StepSyncArray || [])
    .filter(entry => typeof entry.steps === "number")
    .map(entry => entry.steps as number);

  const minSteps = Math.min(...stepValues);
  const maxSteps = Math.max(...stepValues);

  const yMinSteps = Math.floor(minSteps - 100);
  const yMaxSteps = Math.ceil(maxSteps + 100);

  const filteredStepSyncArray = (StepSyncArray || []).filter(entry =>
    selectedStepsMonth === "All" ? true : entry.date.startsWith(selectedStepsMonth));


  const availableStepsMonths = StepSyncArray
    ? [...new Set(StepSyncArray.map(entry => entry.date.slice(0, 7)))]
    : [];

  const chartStepData = [...filteredStepSyncArray].reverse();

  { /EXERCISE MINUTES ARRAY/ }

  const [selectedMinutesMonth, setSelectedMinutesMonth] = useState("All");

  type MinuteSyncEntry = {
    date: string;
    exerciseMinutes: string | number;
  };

  const MinuteSyncArray: MinuteSyncEntry[] = stats?.syncs?.map((sync: any) => ({
    date: sync.id,
    exerciseMinutes: Number(sync.exerciseMinutes) ?? 0,
  }));

  const MinuteValues = (MinuteSyncArray || [])
    .filter(entry => typeof entry.exerciseMinutes === "number")
    .map(entry => entry.exerciseMinutes as number);

  const minMinutes = Math.min(...MinuteValues);
  const maxMinutes = Math.max(...MinuteValues);

  const yMinMinutes = Math.floor(minMinutes - 1);
  const yMaxMinutes = Math.ceil(maxMinutes + 1);

  const filteredMinutesSyncArray = (MinuteSyncArray || []).filter(entry =>
    selectedMinutesMonth === "All" ? true : entry.date.startsWith(selectedMinutesMonth));


  const availableMinuteMonths = MinuteSyncArray
    ? [...new Set(MinuteSyncArray.map(entry => entry.date.slice(0, 7)))]
    : [];

  const chartMinuteData = [...filteredMinutesSyncArray].reverse();


  { /SELECTED VIEW BAR/ }

  type StatView =
    | "steps"
    | "exercise"
    | "weight"
    | "sleepDuration"
    | "sleepQuality"
    | "mood"
    | "macroAccuracy";

  const handleSectorClick = (sector: "dawnStats" | "coreStats" | "duskStats") => {
    if (selectedSector === sector && isDrawerOpen) {
      // If same sector clicked again, close drawer
      setIsDrawerOpen(false);
      setSelectedSector(null);
      setButtonColor(null);
    } else {
      // Open drawer with new content
      setSelectedSector(sector);
      setIsDrawerOpen(true);
      setButtonColor(sector);
    }
  };

  const [selectedSector, setSelectedSector] = useState<"dawnStats" | "coreStats" | "duskStats" | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<StatView>("weight"); // default stat within selected sector
  const [buttonColor, setButtonColor] = useState<"dawnStats" | "coreStats" | "duskStats" | null>(null);

  const getButtonColor = (sector: "dawnStats" | "coreStats" | "duskStats") => {
    return isDrawerOpen && selectedSector === sector
      ? "bg-indigo-300/60 text-white"
      : "glowing-button";
  };

  if (typeof isPaidUser !== 'boolean') {
    return;
  }

  return (
    <>
<NavLoad/>
      <div>
        <div className="relative h-32 bg-[url('/images/menus/stats2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex text-4xl items-center gap-2">Stats Echo </div>
            <h2 className="text-sm font-bold text-white">
              “The more you know yourself, the clearer your path becomes.”
            </h2>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {selectedView === "weight" && (
          <motion.div
            key="weight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}>
            <div className="p-2 mb-10 bg-white/40 text-white rounded-lg flex flex-col">
              <div className="p-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                <div className="place-self-center text-left text-xl font-semibold">Weight History</div>
              </div>
              <div className="w-full h-64 mt-2 mb-2 bg-black/40 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartWeightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis
                      stroke="#fff"
                      domain={[yMin, yMax]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", border: "none" }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value: any) => [`${value} ${SyncArray[0]?.unit}`, "weight"]} />
                    <Line type="monotone" dataKey="weight" stroke="#00f5d4" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-lg 20 w-full max-w-md text-black">
                <div className="mb-2 p-2 grid grid-cols-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                  <div className="flex flex-col place-self-center text-left font-semibold">
                    <p className=" font-semibold">Filter by date</p>
                    <select
                      className="p-2 rounded-lg bg-black/30 text-white"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}>
                      <option value="All">All</option>
                      {availableMonths.sort().map(month => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col place-self-center text-right font-semibold">
                    <p className=" font-semibold">Set Weight Unit</p>
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as "lbs" | "kg")}
                      className="p-2 rounded-lg bg-black/30 text-white">
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
                <ul className="space-y-2">
                  {filteredSyncArray.map((entry, index) => (
                    <li key={index} className="p-4 grid grid-cols-2 items-center rounded-lg shadow bg-black/40 text-white">
                      <div className="place-self-center text-left font-semibold"> {entry.date} </div>
                      <div className="place-self-center text-right"> {entry?.weight} {entry.unit}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        {selectedView === "steps" && (
          <motion.div
            key="steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}>
            <div className="p-2 mb-10 bg-white/40 text-white rounded-lg flex flex-col">
              <div className="p-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                <div className="place-self-center text-left text-xl font-semibold">Step History</div>
              </div>
              <div className="w-full h-64 mt-2 mb-2 bg-black/40 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartStepData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis
                      stroke="#fff"
                      domain={[yMinSteps, yMaxSteps]}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", border: "none" }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value: any) => [`${value} ${StepSyncArray[0]?.steps}`, "steps"]}
                    />
                    <Line type="monotone" dataKey="steps" stroke="#00f5d4" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-lg w-full max-w-md text-black">
                <div className="mb-2 p-2 grid grid-cols-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                  <div className="flex flex-col place-self-center text-left font-semibold">
                    <p className=" font-semibold">Filter by date</p>
                    <select
                      className="p-2 rounded-lg bg-black/30 text-white"
                      value={selectedStepsMonth}
                      onChange={(e) => setSelectedStepsMonth(e.target.value)}>
                      <option value="All">All</option>
                      {availableStepsMonths.sort().map(month => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <ul className="space-y-2">
                  {filteredStepSyncArray.map((entry, index) => (
                    <li key={index} className="p-4 grid grid-cols-2 items-center rounded-lg shadow bg-black/40 text-white">

                      <div className="place-self-center text-left font-semibold"> {entry.date} </div>
                      <div className="place-self-center text-right"> {entry?.steps} Steps </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}


        {selectedView === "exercise" && (
          <motion.div
            key="exercise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >

            <div className="p-2 mb-10 bg-white/40 text-white rounded-lg flex flex-col">
              <div className="p-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                <div className="place-self-center text-left text-xl font-semibold">Exercise History</div>
              </div>

              <div className="w-full h-64 mt-2 mb-2 bg-black/40 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartMinuteData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis
                      stroke="#fff"
                      domain={[yMinMinutes, yMaxMinutes]}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", border: "none" }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value: any) => [`${value} ${MinuteSyncArray[0]?.exerciseMinutes}`, "exerciseMinutes"]}

                    />
                    <Line type="monotone" dataKey="exerciseMinutes" stroke="#00f5d4" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-lg w-full max-w-md text-black">
                <div className="mb-2 p-2 grid grid-cols-2 items-center rounded-lg shadow bg-white/40 text-white glowing-button">
                  <div className="flex flex-col place-self-center text-left font-semibold">
                    <p className=" font-semibold">Filter by date</p>
                    <select
                      className="p-2 rounded-lg bg-black/30 text-white"
                      value={selectedMinutesMonth}
                      onChange={(e) => setSelectedMinutesMonth(e.target.value)}>
                      <option value="All">All</option>
                      {availableMinuteMonths.sort().map(month => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <ul className="space-y-2">
                  {filteredMinutesSyncArray.map((entry, index) => (
                    <li key={index} className="p-4 grid grid-cols-2 items-center rounded-lg shadow bg-black/40 text-white">

                      <div className="place-self-center text-left font-semibold"> {entry.date} </div>
                      <div className="place-self-center text-right"> {entry?.exerciseMinutes} Min.</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>


      <div className="relative flex justify-between z-40">
        <div className="fixed bottom-16 left-0 w-full flex gap-2 justify-center">
          <button
            className={`px-4 py-2 rounded-lg w-full ${getButtonColor("dawnStats")}`}
            onClick={() => handleSectorClick("dawnStats")}>DawnStats</button>
          <button
            className={`px-4 py-2 rounded-lg w-full ${getButtonColor("coreStats")}`}
            onClick={() => handleSectorClick("coreStats")}>CoreStats</button>
          <button
            className={`px-4 py-2 rounded-lg w-full ${getButtonColor("duskStats")}`}
            onClick={() => handleSectorClick("duskStats")}>DuskStats</button>
        </div>

        <div className=" relative grid grid-cols-3 gap-2 z-40">
          <div className="w-full  fixed bottom-28 left-0">
            <AnimatePresence mode="wait">
              {isDrawerOpen && selectedSector && (
                <motion.div
                  key={selectedSector}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="w-full flex justify-between z-40"
                >
                  {selectedSector === "dawnStats" && (
                    <div className="flex justify-center gap-2 w-full">
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("weight"); setIsDrawerOpen(false); }}>Weight</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("sleepDuration"); setIsDrawerOpen(false); }}>Sleep</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("sleepQuality"); setIsDrawerOpen(false); }}>Mood</button>
                    </div>
                  )}
                  {selectedSector === "coreStats" && (
                    <div className="flex justify-center gap-2 w-full">
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("sleepDuration"); setIsDrawerOpen(false); }}>PrimeTasks</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("sleepQuality"); setIsDrawerOpen(false); }}>StrengthArchive</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("mood"); setIsDrawerOpen(false); }}>MacroVault</button>
                    </div>
                  )}

                  {selectedSector === "duskStats" && (
                    <div className="flex justify-center gap-2 w-full">
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("steps"); setIsDrawerOpen(false); }}>Steps</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("exercise"); setIsDrawerOpen(false); }}>Exercise</button>
                      <button
                        className={`px-4 py-2 rounded-lg w-full bg-blue-500/70 text-white}`}
                        onClick={() => { setSelectedView("macroAccuracy"); setIsDrawerOpen(false); }}>Energy</button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
      <footer className="pt-4 pb-2">
        {isPaidUser ? <NavPortalPaid /> : <NavPortalFree />}
      </footer>
    </>
  );
}