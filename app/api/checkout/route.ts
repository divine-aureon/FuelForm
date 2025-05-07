// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import admin from '@/lib/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', 
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const userId = decoded.uid;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // or 'subscription'
      line_items: [
        {
          price: 'price_1RLunrLzxfsrCsGVpVgn7Lik', // replace this with your actual Price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upgrading-access-codes`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/command-center`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
