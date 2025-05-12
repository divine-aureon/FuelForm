import { NextResponse } from "next/server";
import Stripe from 'stripe'; // adjust path if needed
import { getAdminApp } from "@/lib/firebase-admin"; // your Firebase Admin init
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

getAdminApp(); // safe to call multiple times

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: "Missing UID" }, { status: 431 });

    const db = getFirestore();
    const userDoc = await db.collection("users").doc(uid).get();
    const customerId = userDoc.data()?.stripeCustomerId;

    if (!customerId) {
      return NextResponse.json({ error: "No Stripe customer found" }, { status: 432 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://fuelform.online", // Change as needed
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe portal session error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
