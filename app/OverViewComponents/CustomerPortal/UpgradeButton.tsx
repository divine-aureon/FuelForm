'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeButton() {

  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ uid: user.uid }),
    });

    const data = await res.json();

    if (data.sessionId) {
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.error('Failed to create checkout session');
    }
  };

  return (
    <>
      <div className="fixed bottom-14 px-2 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30">
        <button onClick={handleUpgrade} className="text-lg font-bold text-center mb-2 text-white w-full glowing-button">
          Click to Upgrade
        </button>
      </div>
      {loading && (
        <div className="min-h-screen my-auto w-screen mx-auto fixed inset-0 z-[9999] bg-black/50 p-4 backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center ">
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
