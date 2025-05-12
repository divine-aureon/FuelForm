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

if (!res.ok) {
  alert(`❌ ${data.error}\n\nMessage: ${data.message}\nType: ${data.type}`);
  return;
}

    };

  return (
    <>
    <button onClick={handleCancelSubscription} className="w-full text-white text-xl glowing-cancel-button">
      Revoke Access Codes..
    </button>

      {loading && (
        <div className="min-h-screen my-auto min-w-screen mx-auto fixed inset-0 z-[9999] bg-black/50 p-4 backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center ">
          <p className="text-white text-3xl p-4 text-center font-bold pulse-glow">
            Preparing verification procedures...
          </p>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-5 w-5 rounded-full bg-white opacity-70 animate-bounce`}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        </div>
      )}
    
    </>
  );
}