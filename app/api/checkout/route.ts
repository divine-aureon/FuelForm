// File: /app/api/checkout/route.ts  (or /pages/api/checkout.ts)
import { NextResponse } from 'next/server'; // or `NextApiResponse` for Pages Router
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: 'price_1RLkK2LzxfsrCsGVej5sR1HB', // your Stripe price ID (with or without trial)
          quantity: 1,
        },
      ],
      success_url: 'https://www.fuelform.online/FF418VX?status=success',
      cancel_url: 'https://www.fuelform.online/command-center',
      metadata: {
        userId: 'xyz', // optional, we can pass in Firestore UID
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
