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
  
  await setDoc(doc(db, "users", user.uid), {
    ...userInfo,            // 🔥 Save exactly what was passed
    email: user.email,      // 🔥 Add the email from Firebase user
    createdAt: serverTimestamp(), // 🔥 Add the timestamp
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
