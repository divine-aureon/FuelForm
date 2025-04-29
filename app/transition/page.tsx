"use client";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    import { useEffect } from 'react';

export default function TransitionPage() {
  useEffect(() => {
    async function redirectToCheckout() {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      if (!stripe) {
        console.error('Stripe.js failed to load.');
        return;
      }
      
      if (!response.ok) {
        console.error('Failed to create checkout session');
        return;
      }
      
      const session = await response.json();
      
      if (!session?.id) {
        console.error('Session ID missing');
        return;
      }
      
      await stripe.redirectToCheckout({ sessionId: session.id });
    }

    const timeout = setTimeout(() => {
      redirectToCheckout();
    }, 1500); // 1.5 second delay for cool animation (adjust as you want)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[url('/images/loading.webp')] 
      bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <p className="text-xl font-bold text-white animate-pulse">Transporting...</p>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
      </div>
    </div>
  );
}