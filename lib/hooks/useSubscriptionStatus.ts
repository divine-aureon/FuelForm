// utils/checkSubscription.ts
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const useSubscriptionStatus = (userId: string) => {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setIsPaid(userDoc.data().isPaid); // Retrieve isPaid field
      }
    };

    if (userId) {
      fetchSubscriptionStatus();
    }
  }, [userId]);

  return isPaid; // Return whether the user has paid or not
};
