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
    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <button onClick={handleCheckout}>
      Access all Features!
</button>
    </div>
  );
}