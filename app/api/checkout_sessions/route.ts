import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
// Ensure the secret key is set in your environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // Use the API version expected by the installed library
  typescript: true,
});

export async function POST(request: Request) {
  const priceId = 'price_1RLNcfIXR6Q95AMXx9UpgE2i'; // Updated Live Price ID
  const origin = request.headers.get('origin') || 'http://localhost:3000'; // Default for local dev

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // Use 'payment' for one-time purchases
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect URL on success
      cancel_url: `${origin}/shop?canceled=true`, // Redirect URL on cancellation
      automatic_tax: { enabled: true }, // Optional: enable automatic tax calculation
    });

    // Return the session URL to the client
    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error('Error creating Stripe Checkout session:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}