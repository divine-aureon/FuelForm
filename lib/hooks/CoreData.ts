"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, orderBy, limit, } from "firebase/firestore";
import { ensureDefaultsExist } from "@/lib/UpdateDatabase/ensureDefaultsExist";
import { liftIndexData } from "@/lib/UpdateDatabase/liftIndexData";

//LATEST SYNC
export interface SyncData {
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

//LATEST FITNESS SYNC
export interface FitnessSyncData {
  split: string;
  bodygroup: string;
  whichProfile: string;
  completed: boolean;
  StartTime: any;
  EndTime: any;
  sessionData: any;
}

interface GoalSyncData {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
}

interface NutritionSyncData {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
}

//CUSTOM SETTINGS
interface CustomSettingsData {
  background: string;
  navIcon: string;
  lightMode: boolean;
}

//FITNESSETTINGS
interface FitnessSettingsData {
  currentSplit: string;
  lastBodygroup: string;
  fitnessToken: boolean;
  activeSession: boolean;
  totalWorkouts: number;
  totalPRs: number;
  liftIndex: {
    [bodygroup: string]: BodygroupProfile;
  };
}

//LIFT PROFILE INFO
interface Profile {
  name: string;
  movements: string[];
}

//BODYGROUP PROFILE INFO
interface BodygroupProfile {
  profile1?: Profile;
  profile2?: Profile;
  profile3?: Profile;
}

//DAILY GOAL SETTINGS
interface DailyGoalSettingsData {
  dailyGoalToken: boolean;
}

//NUTRITION SETTINGS
interface NutritionSettingsData {
  calorieGoal: number;
  nutritionToken: boolean;
}
//PULSE DROP SETTINGS
interface PulseMemoryData {
  v1_welcomeDrop: boolean;
  v2_updateDrop1: boolean;
  Thanks4UpgradeDrop: boolean;
}

interface PulseSettingsData {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  tutorialDrops: boolean;
  motivationDrops: boolean;
  humourDrops: boolean;
}

// THE ONE AND ONLY USER PROFILE
export interface UserProfile {
  name: string;
  age: number;
  email: string;
  birthday: string;
  gender: string;

  height_cm: number;
  height_ft_in: {
    feet: number;
    inches: number;
  };
  preferredHeightUnit: string;
  preferredWeightUnit: string;

  lastKnownWeight_lbs: number;
  lastKnownWeight_kg: number;

  //SETTINGS
  customSettings?: CustomSettingsData;
  fitnessSettings?: FitnessSettingsData;
  dailyGoalSettings?: DailyGoalSettingsData;
  nutritionSettings?: NutritionSettingsData;
  pulseSettings?: PulseSettingsData;

  isPaid: boolean;
  token: boolean;

  //COLLECTIONS
  latestSync?: SyncData;
  latestFitnessSync?: FitnessSyncData;
}

const defaultProfile: UserProfile = {
  name: "",
  age: 0,
  email: "",
  birthday: "",
  gender: "",

  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",

  lastKnownWeight_lbs: 0,
  lastKnownWeight_kg: 0,

  isPaid: false,
  token: true,

  customSettings: {
    background: "",
    navIcon: "",
    lightMode: true,
  },

  fitnessSettings: {
    fitnessToken: false,
    currentSplit: "None",
    lastBodygroup: "None",
    activeSession: false,
    totalWorkouts: 0,
    totalPRs: 0,
    liftIndex: liftIndexData(),
  },

  dailyGoalSettings: {
    dailyGoalToken: false,
  },

  nutritionSettings: {
    nutritionToken: false,
    calorieGoal: 0,
  },
  pulseSettings: {
    pulseMemory: {
      v1_welcomeDrop: true,
      v2_updateDrop1: true,
      Thanks4UpgradeDrop: true,
    },
    receivePulseDrops: true,
    tutorialDrops: true,
    motivationDrops: true,
    humourDrops: true,
  },

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

  latestFitnessSync: {
    split: "",
    bodygroup: "",
    whichProfile: "",
    completed: false,
    StartTime: "",
    EndTime: "",
    sessionData: "",
  },


};

export default function useCoreData() {
  //EVERYTHING THAT WE ARE PULLING FROM FIRESTORE
  const [userProfile, setProfile] = useState<UserProfile>(defaultProfile);
  const [syncs, setSyncs] = useState<SyncData[]>([]);
  const [fitness, setFitness] = useState<FitnessSyncData[]>([]);


  //APPLICATION
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        const userRef = doc(db, "users", user.uid);
        const syncRef = collection(db, "users", user.uid, "syncs");
        const fitnessRef = collection(db, "users", user.uid, "fitness");

        const [profileSnap, syncSnap, fitnessSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(query(syncRef, orderBy("timestamp", "desc"))),
          getDocs(query(fitnessRef, orderBy("timestamp", "desc"))),
        ]);

        const profileData = profileSnap.exists()
          ? (profileSnap.data() as UserProfile)
          : defaultProfile;

        await ensureDefaultsExist(user.uid, profileData); //check UpdateDatbase to match fields.

        const allSyncs = syncSnap.docs.map(doc => doc.data() as SyncData);
        const allFitness = fitnessSnap.docs.map(doc => doc.data() as FitnessSyncData);

        const latestSync = allSyncs[0] ?? defaultProfile.latestSync;
        const latestFitnessSync = allFitness[0] ?? defaultProfile.latestFitnessSync;

        setProfile({
          ...profileData,
          latestSync,
          latestFitnessSync,
        });

        setSyncs(allSyncs);
        setFitness(allFitness);

      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userProfile,
    latestSync: userProfile.latestSync,
    latestFitnessSync: userProfile.latestFitnessSync,
    allSyncs: syncs,
    allFitness: fitness,
  };
}