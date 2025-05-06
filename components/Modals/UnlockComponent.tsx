'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAuth from '@/lib/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from "react";
import SuccessLoad from "@/components/Loading/SuccessLoad";



const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#ffffff',
      color: '#ffffff',
      fontWeight: '500',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      iconColor: '#ff0000',
      color: '#ff0000',
    },
  },
};

const UnlockComponent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async () => {

    setIsLoading(true);  //🟡 Start loading state
    setShowSuccess(true);//  🔥 show the loading component


    const card = elements?.getElement(CardElement);
    if (!stripe || !card || !user?.uid) return;

    const res = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: user.uid }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    const userRef = doc(db, 'users', user?.uid!);  // <-- Now 100% safe


    if (result.paymentIntent?.status === 'succeeded') {

    console.log('🔥 Subscribed!');
    await updateDoc(userRef, { isPaid: true });

    await new Promise((r) => setTimeout(r, 1000));
    window.location.reload();  //hard refresh

    } else {
      console.error(result.error?.message);
      router.push('/command-center');
    }
  };

  return (
    <>
      <div className="bg-white/30 rounded-lg p-3">


        {showSuccess ? (
          <SuccessLoad />
        ) : (
          <>
            <div>
              <div className="relative h-32 bg-[url('/images/menus/unlock.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
                <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                  <div className="flex items-center gap-2 pulse-glow ">Upgrade Access Codes</div>
                  <h2 className="text-sm font-bold text-white">
                    Before you can change, you must know where you are. These are your fundamentals.
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg flex flex-col gap-4 mb-3 p-4">
              <CardElement options={CARD_OPTIONS} />
            </div>
            <button
              onClick={handleSubscribe}
              className="w-full glowing-button bg-indigo-600 text-white rounded-xl px-4 py-2 font-bold"
            >
              Confirm Subscription
            </button>
          </>
        )}

      </div>
    </>

  );
};

export default UnlockComponent;
