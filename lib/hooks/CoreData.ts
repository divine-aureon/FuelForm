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

interface StrengthSyncData {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
}

interface CustomSettingsData {
  background: string;
  navIcon: string;
  lightMode: boolean;
}

interface StrengthData {
  isStrengthArchiveActive: boolean;
  currentSplit: string;
  activeSession: boolean;
  liftIndex: {
    [bodygroup: string]: BodygroupProfile;
  };
}

interface Profile {
  name: string;
  movements: string[];
}

interface BodygroupProfile {
  profile1?: Profile;
  profile2?: Profile;
  profile3?: Profile;
}


interface PrimeData {
  isPrimeTasksActive: boolean;
}

interface MacroData {
  calorieGoal: number;
  isMacroVaultActive: boolean;
}

interface PulseMemoryData {
  v1_welcomeDrop: boolean;
  v2_updateDrop1: boolean;
  Thanks4UpgradeDrop: boolean;
}

interface PulseData {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  tutorialDrops: boolean;
  motivationDrops: boolean;
  humourDrops: boolean;
}

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

  latestSync?: SyncData;

  customSettings?: CustomSettingsData;
  strengthArchiveSettings?: StrengthData;
  primeTasksSettings?: PrimeData;
  macroVaultSettings?: MacroData;
  pulseSettings?: PulseData;

  isPaid: boolean;
  token: boolean;
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

  strengthArchiveSettings: {
    isStrengthArchiveActive: false,
    currentSplit: "",
    activeSession: false,
    liftIndex: {},
  },

  primeTasksSettings: {
    isPrimeTasksActive: false,
  },

  macroVaultSettings: {
    isMacroVaultActive: false,
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


};

export default function useCoreData() {
  const [userProfile, setProfile] = useState<UserProfile>(defaultProfile);

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

        setProfile({
          ...profileData,
          latestSync
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userProfile,
    latestSync: userProfile.latestSync,
  };
}

