"use client";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

async function handleCheckout() {
  const stripe = await stripePromise;
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
  });

  const session = await response.json();
  await stripe?.redirectToCheckout({ sessionId: session.id });
}



export default function DawnSyncPage() {
    return (
      <main className="relative min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat bg-black text-white overflow-hidden pb-16">
        <h1 className="text-2xl font-bold mb-4">Unlock Pro</h1>
        
      </main>

    );
  }