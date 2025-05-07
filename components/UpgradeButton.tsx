'use client';

import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeButton() {
  const handleUpgrade = async () => {
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
    <button onClick={handleUpgrade} className="text-lg font-bold text-center mb-2 text-white w-full glowing-button">
      Click to Upgrade Your Access Codes
    </button>
  );
}
