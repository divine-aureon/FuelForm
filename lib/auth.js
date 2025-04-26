// lib/auth.js
import { db } from "./firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

export const registerUser = async (email, password, userInfo) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;

  await setDoc(doc(db, "users", user.uid), {
    ...userInfo,            // 🔥 Save exactly what was passed
    email: user.email,      // 🔥 Add the email from Firebase user
    calorieGoal: 0,
    createdAt: serverTimestamp(), // 🔥 Add the timestamp
  });

  // ⬇️ NEW: Log this as a sync to a subcollection
  await setDoc(doc(db, "users", user.uid, "syncs", dateString), {
    weight_lbs: "na",
    weight_kg: "na",
    weightUnit: "lb",
    sleepQuality: "na",
    sleepDuration: "na",
    mood: "na",
    projectedSteps: 0,
    projectedExerciseMinutes: 0,
    projectedExerciseIntensity: 0,
    actualSteps: 0,
    actualExerciseMinutes: 0,
    actualExerciseIntensity: "low",
    timestamp: serverTimestamp()
  });


  return userCredential;
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
