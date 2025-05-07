// route.ts (app/api/webhook/route.ts)
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminApp } from '@/lib/firebase-admin';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const admin = getAdminApp();

export const config = {
  runtime: 'nodejs',
};

export async function POST(request: NextRequest) {

  
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        await markUserPaidInFirestore(userId);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function markUserPaidInFirestore(userId: string) {
  try {
    const db = admin.firestore();
    await db.collection('users').doc(userId).update({
      isPaid: true,
      paidAt: new Date(),
    });
    console.log(`✅ User ${userId} marked as paid`);
  } catch (err) {
    console.error(`❌ Failed to update user ${userId}:`, err);
  }
}