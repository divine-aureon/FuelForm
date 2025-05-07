// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from '@/lib/firebase-admin';
import useAuth from '@/lib/useAuth'; // or similar


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', 
});
const admin = getAdminApp();
export async function POST(request: NextRequest) {

  const { user } = useAuth();

  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!user) return null;

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const userId = user.uid;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // or 'subscription'
      line_items: [
        {
          price: 'price_1RLunrLzxfsrCsGVpVgn7Lik', // replace this with your actual Price ID
          quantity: 1,
        },
      ],
      success_url: 'https://www.fuelform.online/upgrading-access-codes',
      cancel_url: 'https://www.fuelform.online/command-center',
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (error: any) {
    console.error('🔥 Stripe Checkout Session Error');
    console.error('🧠 Message:', error?.message);
    console.error('📦 Full Error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
  
    return NextResponse.json(
      {
        error: error?.message || 'Unknown error',
        details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 }
    );
  }
}