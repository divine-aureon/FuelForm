// app/api/create-checkout-session/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1RIAQPLzxfsrCsGVPB21wi8o', // <-- replace with your real Stripe Price ID
        quantity: 1,
      },
    ],
    mode: 'subscription', // or 'payment' if one-time
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/FF418VX`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/command-center`,
  });

  return NextResponse.json({ id: session.id });
}
