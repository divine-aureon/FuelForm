// Fully pulls the current userProfile and commits every field to ZenState.

import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile, SyncData, FitnessSyncData } from "@/lib/hooks/CoreData"; // or wherever you defined it




export async function EstablishConnection(userId: string) {

    const setUserProfile = useGlobalData.getState().setUserProfile;
    const setSyncHistory = useGlobalData.getState().setSyncHistory;
    const setFitnessHistory = useGlobalData.getState().setFitnessHistory;

    const userRef = doc(db, "users", userId);
    const syncRef = collection(db, "users", userId, "syncs");
    const fitnessRef = collection(db, "users", userId, "fitness");

    const [profileSnap, syncSnap, fitnessSnap] = await Promise.all([
        getDoc(userRef),
        getDocs(query(syncRef, orderBy("timestamp", "desc"))),
        getDocs(query(fitnessRef, orderBy("timestamp", "desc"))),
    ]);


    const profileData = profileSnap.data() as UserProfile;
    const allSyncs = syncSnap.docs.map(doc => doc.data() as SyncData);
    const allFitness = fitnessSnap.docs.map(doc => doc.data() as FitnessSyncData);

const latestSync = allSyncs[0];
const latestFitnessSync = allFitness[0];

setUserProfile((prev) =>
  ({
    ...prev,
    ...profileData,

    latestSync,
    latestFitnessSync,

    customSettings: {
      ...prev?.customSettings,
      ...profileData.customSettings,
    },

    fitnessSettings: {
      ...prev?.fitnessSettings,
      ...profileData.fitnessSettings,
    },

    dailyGoalSettings: {
      ...prev?.dailyGoalSettings,
      ...profileData.dailyGoalSettings,
    },

    nutritionSettings: {
      ...prev?.nutritionSettings,
      ...profileData.nutritionSettings,
    },

    pulseSettings: {
      ...prev?.pulseSettings,
      ...profileData.pulseSettings,
    },
  }) as UserProfile
);

setSyncHistory(allSyncs);
setFitnessHistory(allFitness);
}