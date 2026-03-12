import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItems, shippingAddress } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Get the origin from headers or use a fallback
    const origin = request.headers.get('origin') || 'https://petals-and-polish.vercel.app/';

    // Transform cart items to Stripe line items
    const lineItems = cartItems.map((item: any) => {
      // Convert relative image paths to absolute URLs for Stripe
      const imageUrl = item.image.startsWith('http') 
        ? item.image 
        : `${origin}${item.image}`;

      const productData: any = {
        name: `${item.title} - Size ${item.size}`,
        images: [imageUrl],
      };

      // Only include description if there are notes
      if (item.notes && item.notes.trim()) {
        productData.description = item.notes;
      }

      return {
        price_data: {
          currency: 'cad',
          product_data: productData,
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Calculate tax
    const subtotal = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.14 * 100); // 14% tax in cents

    // Add tax as a line item
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: 'Tax',
        },
        unit_amount: tax,
      },
      quantity: 1,
    });

    // Add flat shipping fee
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: 1500, // $15.00 in cents
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress || {}),
      },
    });

    console.log('Stripe session created:', session.id);
    console.log('Stripe checkout URL:', session.url);
    return NextResponse.json({ sessionId: session.id, checkoutUrl: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    console.error('Error details:', error.message);
    return NextResponse.json(
      { error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
