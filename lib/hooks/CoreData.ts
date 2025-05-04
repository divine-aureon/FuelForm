"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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

interface PrefData {
  background: string;
  navIcon: string;
}

interface FitData {
  calorieGoal: number;
}

interface UserProfile {
  name: string;
  birthday: string;
  gender: string;
  heightCm: number;
  heightUnit: string;
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
  preferences?: PrefData;
  fitnessGoals?: FitData;
  isPaid: boolean;
}

const defaultProfile: UserProfile = {
  name: "",
  birthday: "",
  gender: "",
  heightCm: 0,
  heightUnit: "",
  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",
  age: 0,
  email: "", // ✅ Add email here
  isPaid: false,
  latestSync: {
    weight_lbs: 0,
    weight_kg: 0,
    steps: 0,
    exerciseMinutes: 0,
    exerciseIntensity: "low",
    dawnSync: false,
    duskSync: false,
    dawnTimestamp: null,
    duskTimestamp: null,
    timestamp: null,
  },
  preferences: {
    background: "Neural Link",
    navIcon: "Atom",
  },
  fitnessGoals: {
    calorieGoal: 0,
  },

};

export default function useFuelFormData() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const syncRef = collection(db, "users", user.uid, "syncs");
        const prefRef = doc(db, "users", user.uid, "neuro", "preferences");
        const fitRef = doc(db, "users", user.uid, "neuro", "fitnessGoals");

        const [profileSnap, syncSnap, prefSnap, fitSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(query(syncRef, orderBy("timestamp", "desc"), limit(1))),
          getDoc(prefRef), // preferences
          getDoc(fitRef), // fitnessgoals
        ]);

        const profileData = profileSnap.exists()
          ? (profileSnap.data() as UserProfile)
          : defaultProfile;

        const latestSync = syncSnap.docs.length > 0
          ? (syncSnap.docs[0].data() as SyncData)
          : defaultProfile.latestSync;

        const preferences = prefSnap.exists()
          ? (prefSnap.data() as PrefData)
          : defaultProfile.preferences

        const fitnessGoals = fitSnap.exists()
          ? (fitSnap.data() as FitData)
          : defaultProfile.fitnessGoals

        setProfile({ ...profileData, latestSync, preferences, fitnessGoals });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    profile,
    latestSync: profile.latestSync,
    preferences: profile.preferences,
    fitnessGoals: profile.fitnessGoals,
  };
}
