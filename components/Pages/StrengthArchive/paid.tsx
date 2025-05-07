"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import { AddSplitModal } from "@/components/StrengthArchiveModals/AddSplitModal"; // You can create this next
import AddSplitComponent from "@/components/StrengthArchiveModals/AddSplitComponent"; // You can create this next
import useCoreData from "@/lib/hooks/CoreData";

export default function PaidStrengthArchivePage() {

  //inialization steps

  const { user } = useAuth();
  const { profile } = useCoreData();

  const [activeSplit, setActiveSplit] = useState(null);
  const [allSplits, setAllSplits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSplitName, setNewSplitName] = useState("Full Body");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateString = `${yyyy}-${mm}-${dd}`;

  //check split steps

  type Split = {
    id: string;
    name: string;
  };

  const [splits, setSplits] = useState<Split[]>([]);
  const [isAddSplitModalOpen, setAddSplitModalOpen] = useState(false);

  useEffect(() => {
    const fetchSplits = async () => {
      const uid = user?.uid;
      if (!uid) return;

      const splitsRef = collection(db, "users", uid, "strength", "stats", "storedSplits");
      const splitsSnap = await getDocs(splitsRef);

      const splits: Split[] = splitsSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Split, "id">), // tells TypeScript "trust me, this has a `name`"
      }));

      setSplits(splits);
    };

    fetchSplits();
  }, []);


  if (!profile?.isFitnessActive) {
    return (
      <>
        <div>
          <div className="relative h-32 bg-[url('/images/menus/strength2.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-2xl glowing-button mb-2">
            <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
              <div className="flex items-center gap-2">StrengthArchive</div>
              <h2 className="text-xs font-bold text-white">
                Log It. Lift It. Level Up.
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4 text-center bg-white/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Activate Strength Archive</h2>
          <p className="mb-4">First time setup required. Ready to initialize?</p>
          <button
            disabled
            className="px-4 py-2  text-white rounded glowing-button"
            onClick={async () => {
              if (!user) return;

              const userRef = doc(db, "users", user.uid);

              // Set meta initialized
              await setDoc(userRef, {
                isFitnessActive: true,
                fitnessSettings: {
                  totalWorkouts: 0,
                totalPR: 0,
                },
              }, { merge: true });

              const strengthRef = collection(db, "users", user.uid, "strength");
              const strengthDocRef = doc(strengthRef, dateString);

              // Set meta initialized
              await setDoc(strengthDocRef, {
                currentSplitName: "",
                lastWorkout: "",
                todaysWorkout: "",
                movements: [],
                prCount: 0,
              }, { merge: true });
              window.location.reload();
            }}

          >
            Coming Soon!
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
              Log It. Lift It. Level Up.
            </h2>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {splits.length > 0 ? (
          splits.map((split) => (
            <div key={split.id} className="text-white bg-white/10 rounded-lg p-3 shadow">
              {split.name}
            </div>
          ))
        ) : (
          <div className="text-white text-center italic opacity-70">
            No splits found. Add one below to get started.
          </div>
        )}

        <button
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg w-full"
          onClick={() => setAddSplitModalOpen(true)}
        >
          Add Split
        </button>
        {isAddSplitModalOpen && (
          <AddSplitModal onClose={() => setAddSplitModalOpen(false)}>
            < AddSplitComponent />
          </AddSplitModal>)}
      </div>



    </>
  );
}
