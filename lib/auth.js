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

  const getAgeFromBirthday = (birthdayStr) => {
    const [year, month, day] = birthdayStr.split("-").map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const age = getAgeFromBirthday(userInfo.birthday);
  
  // Save additional user data in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name: userInfo.name,
    birthday: userInfo.birthday,
    age, // 👈 🔥 Save as a number
    gender: userInfo.gender.toLowerCase(),
    heightCm: userInfo.heightCm,
    email: user.email,
    createdAt: serverTimestamp()
  });

  // ⬇️ NEW: Log this as a sync to a subcollection
await addDoc(collection(db, "users", user.uid, "sync"), {
  weight: "na",
  weightUnit: "lb",
  steps: "na",
  exerciseMinutes: "na",
  exerciseIntensity: "na",
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
