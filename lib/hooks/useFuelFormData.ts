"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "lib/firebase";
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
  recommendedMacros?: any[];
  recommendedVitamins?: any[];
  recommendedMinerals?: any[];
  timestamp?: any;
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
  latestSync?: SyncData;
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
  latestSync: {
    weight_lbs: 0,
    weight_kg: 0,
    steps: 0,
    exerciseMinutes: 0,
    exerciseIntensity: "low",
  },
};

export default function useFuelFormData() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const syncRef = collection(db, "users", user.uid, "sync");

        const [profileSnap, syncSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(query(syncRef, orderBy("timestamp", "desc"), limit(1))),
        ]);

        const profileData = profileSnap.exists()
          ? (profileSnap.data() as UserProfile)
          : defaultProfile;

        const latestSync = syncSnap.docs.length > 0
          ? (syncSnap.docs[0].data() as SyncData)
          : defaultProfile.latestSync;

        setProfile({ ...profileData, latestSync });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    profile,
    latestSync: profile.latestSync,
  };
}
