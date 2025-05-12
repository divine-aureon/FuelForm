// route.ts (app/api/webhook/route.ts)
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminApp } from '@/lib/firebase-admin';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const admin = getAdminApp();

export async function POST(request: NextRequest) {

  const rawBody = await request.text(); // must be raw!
  const sig = request.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret);
    console.log('✅ Webhook verified!', event.type);


    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (userId) {
          await markUserPaidInFirestore(userId, session);
        }
        break;

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await markUserUnpaidInFirestore(customerId);
        break;
      }


      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });



  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), {
      status: 400,
    });
  }
}

async function markUserPaidInFirestore(userId: string, session: Stripe.Checkout.Session) {
  try {
    const db = admin.firestore();

    const stripeCustomerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    await db.collection('users').doc(userId).set(
      {
        isPaid: true,
        paidAt: new Date(),
        stripeCustomerId,
        subscriptionId,
      },
      { merge: true }
    );
    console.log(`✅ User ${userId} marked as paid`);
  } catch (err) {
    console.error(`❌ Failed to update user ${userId}:`, err);
  }
}

async function markUserUnpaidInFirestore(customerId: string) {
  const db = admin.firestore();
  const usersRef = db.collection('users');
  const querySnap = await usersRef
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();

  if (!querySnap.empty) {
    const userDoc = querySnap.docs[0];
    const userId = userDoc.id;

    await db.collection('users').doc(userId).set(
      {
        isPaid: false,
        canceledAt: new Date(),
        stripeCustomerId: customerId,
      },
      { merge: true }
    );

    console.log(`✅ User ${userId} marked as unpaid.`);
  } else {
    console.warn(`⚠️ No user found with Stripe customer ID: ${customerId}`);
  }
}
