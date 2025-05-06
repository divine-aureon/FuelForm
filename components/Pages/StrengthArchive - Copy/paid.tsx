"use client";





import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import useAuth from "@/lib/useAuth";

export default function PaidStrengthArchivePage() {

  const [isInitialized, setIsInitialized] = useState(true); // default true
  const [checkedInit, setCheckedInit] = useState(false); // to avoid flicker

  const { user } = useAuth();
  const [activeSplit, setActiveSplit] = useState(null);
  const [allSplits, setAllSplits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSplitName, setNewSplitName] = useState("Full Body");

  useEffect(() => {
    const checkInitialization = async () => {
      const uid = user?.uid;
      if (!uid) return;

      const statRef = doc(db, "users", uid, "strengthArchive", "stats");
      const metaSnap = await getDoc(statRef);

      if (!metaSnap.exists()) {
        setIsInitialized(false);
      }

      setCheckedInit(true);
    };

    checkInitialization();
  }, [user]);


  if (!checkedInit) return null; // or a loading spinner

  if (!isInitialized) {
    return (
      <>
        <div>
          <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
            <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
              <div className="flex items-center gap-2">StrengthArchive</div>
              <h2 className="text-xs font-bold text-white">
                "Log It. Lift It. Level Up."
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4 text-center bg-white/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Activate Strength Archive?</h2>
          <p className="mb-4">First time setup required. Ready to initialize?</p>
          <button
            className="px-4 py-2  text-white rounded glowing-button"
            onClick={async () => {
              if (!user) return;

              const statRef = doc(db, "users", user.uid, "strengthArchive", "stats");

              // Set meta initialized
              await setDoc(statRef, {
                initialized: true,
                currentSplitName: "",
                totalWorkouts: 0,
                prCount: 0,
                lastWorkout: null,
              });
              window.location.reload();
            }}
          >
            Initialize DataBase
          </button>
        </div>
      </>
    );
  }
  // Main Strength Archive UI
  return (
    <>
      <div>
        <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
    border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
          <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
            <div className="flex items-center gap-2">StrengthArchive</div>
            <h2 className="text-xs font-bold text-white">
              "Log It. Lift It. Level Up."
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white/30 rounded-lg">
        <p className="mt-2">Thankyou for registering for the StrengthArchive. Page still under construction. Checkback soon for update. Thankyou</p>
        {/* Add your split loader, add split button, etc. here */}
      </div>
    </>
  );
}
