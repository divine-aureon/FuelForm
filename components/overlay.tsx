"use client";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Overlay({ isPaidUser }: { isPaidUser: boolean }) {
  if (isPaidUser) return null; // No overlay if paid
  
  
  async function handleCheckout() {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
  
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  }
  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md flex items-center justify-center animate-pulse-slow pointer-events-none">
  <div className="bg-white/10 rounded-2xl p-8 shadow-lg border border-white/20 backdrop-blur-sm flex flex-col item-center animate-fade-in">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">
      Unlock Full Access
    </h2>
    <p className="text-white/80 text-center mb-8">
      Upgrade now to activate all command center features.
    </p>
    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center pointer-events-none">
  <button
    type="button"
    onClick={handleCheckout}
    className="relative z-80 pointer-events-auto touch-manipulation transition duration-300 ease-out"
  >
    Access All Features
  </button>
</div>
  </div>
</div>

  );
}