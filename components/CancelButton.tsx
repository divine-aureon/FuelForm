'use client';


import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function CancelButton() {

const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

   

 useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

        return () => unsubscribe();
  }, []);


 const handleCancelSubscription = async () => {
    
    if (!user?.uid) {
      alert("User not loaded.");
      return;
    }
    setLoading(true);
        const res = await fetch("/api/create-portal-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid }), // replace with your current UID
        });

        const data = await res.json();
        if (data?.url) window.location.href = data.url;
        setLoading(false);
    };

  return (
    <button onClick={handleCancelSubscription} className="w-full text-white text-xl glowing-cancel-button">
      Revoke Access Codes..
    </button>
  );
}