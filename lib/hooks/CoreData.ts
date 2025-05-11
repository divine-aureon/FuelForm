"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, orderBy, limit, } from "firebase/firestore";
import { ensureDefaultsExist } from "@/lib/UpdateDatabase/ensureDefaultsExist";

interface SyncData {
  weight_lbs: number;
  weight_kg: number;
  steps: number;
  exerciseMinutes: number;
  exerciseIntensity: string;
  recoveryMacros?: any[];
  activeMacros?: any[];
  vitamins?: any[];
  minerals?: any[];
  recoveryTDEE?: string;
  activeTDEE?: string;
  dawnSync?: boolean;
  duskSync?: boolean;
  dawnTimestamp?: any;
  duskTimestamp?: any;
  timestamp?: any;
}

interface FitSyncData {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
}

interface SettingsData {
  background: string;
  navIcon: string;
}

interface FitData {
  calorieGoal: number;
  activeSplit: string;
}

interface PulseMemoryData {
  v1_welcomeDrop: boolean;
  v2_updateDrop1: boolean,
}

interface PulseData {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  receiveTutorials: boolean;
  dailyMotivation: boolean;
}

interface UserProfile {
  name: string;
  birthday: string;
  gender: string;
  height_cm: number;
  height_ft_in: {
    feet: number;
    inches: number;
  };
  preferredHeightUnit: string;
  preferredWeightUnit: string;
  age: number;
  email: string; // ✅ Add email here
  latestSync?: SyncData;
  settings?: SettingsData;
  fitnessSettings?: FitData;
  pulseSettings?: PulseData;
  isStrengthActive: boolean;
  isMacroActive: boolean;
  isPrimeActive: boolean;
  isPaid: boolean;
  token: boolean;
}

const defaultProfile: UserProfile = {
  name: "",
  birthday: "",
  gender: "",
  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",
  age: 0,
  email: "", // ✅ Add email here
  isStrengthActive: false,
  isMacroActive: false,
  isPrimeActive: false,
  isPaid: false,
  token: true,

  latestSync: {
    weight_lbs: 0,
    weight_kg: 0,
    steps: 0,
    exerciseMinutes: 0,
    exerciseIntensity: "None",
    dawnSync: false,
    duskSync: false,
    dawnTimestamp: null,
    duskTimestamp: null,
    timestamp: null,
  },

  settings: {
    background: "",
    navIcon: "",
  },

  fitnessSettings: {
    calorieGoal: 0,
    activeSplit: "",
  },
  pulseSettings: {
    pulseMemory: {
      v1_welcomeDrop: true,
      v2_updateDrop1: true,
    },
    receivePulseDrops: true,
    receiveTutorials: true,
    dailyMotivation: true,
  }

};

export default function useCoreData() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        const userRef = doc(db, "users", user.uid);
        const syncRef = collection(db, "users", user.uid, "syncs");

        const [profileSnap, syncSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(query(syncRef, orderBy("timestamp", "desc"), limit(1))),
        ]);

        const profileData = profileSnap.exists()
          ? (profileSnap.data() as UserProfile)
          : defaultProfile;

        await ensureDefaultsExist(user.uid, profileData); //check UpdateDatbase to match fields. 

        const latestSync = syncSnap.docs.length > 0
          ? (syncSnap.docs[0].data() as SyncData)
          : defaultProfile.latestSync;

        const settings = profileData.settings ?? defaultProfile.settings;

        const fitnessSettings = profileData.fitnessSettings ?? defaultProfile.fitnessSettings;

        const pulseSettings = profileData.pulseSettings ?? defaultProfile.pulseSettings;

        const isPaid = profileData.isPaid ?? defaultProfile.isPaid;

        setProfile({ ...profileData, latestSync, settings, fitnessSettings, pulseSettings, isPaid });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    profile,
    latestSync: profile.latestSync,
    settings: profile.settings,
    fitnessSettings: profile.fitnessSettings,
    pulseSettings: profile.pulseSettings,
    isPaid: profile.isPaid,
  };
}
