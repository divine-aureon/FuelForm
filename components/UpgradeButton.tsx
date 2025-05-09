'use client';

import { useEffect , useState } from 'react';
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
    <button onClick={handleUpgrade} className="text-lg font-bold text-center mb-2 text-white w-full glowing-button">
      Click to Upgrade Your Access Codes
    </button>

{loading && (
  <div className="fixed inset-0 z-[1000] backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
    <p className="text-white text-3xl text-center font-bold pulse-glow">
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
