import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmationEmail } from '@/lib/mailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('\n\n=== SEND CONFIRMATION EMAIL REQUEST STARTED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    const body = await request.json();
    const { sessionId } = body;

    console.log(`[${Date.now() - startTime}ms] Received sessionId:`, sessionId);

    if (!sessionId) {
      console.error('[ERROR] No sessionId provided');
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve session from Stripe
    console.log(`[${Date.now() - startTime}ms] Fetching session from Stripe...`);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent', 'line_items.data.price.product'],
    });

    console.log(`[${Date.now() - startTime}ms] Session retrieved successfully`);
    console.log('  - Order ID:', session.id);
    console.log('  - Customer Email:', session.customer_email);
    console.log('  - Payment Status:', session.payment_status);
    console.log('  - Amount Total:', session.amount_total);

    // Extract line items (products ordered)
    let subtotal = 0;
    let tax = 0;
    let shipping = 0;

    const items = session.line_items?.data
      .filter((item: any) => {
        // Track tax and shipping separately
        const productName = item.price?.product?.name || '';
        if (productName === 'Tax') {
          tax = item.price?.unit_amount || 0;
          return false;
        }
        if (productName === 'Shipping') {
          shipping = item.price?.unit_amount || 0;
          return false;
        }
        return true;
      })
      .map((item: any) => {
        const product = item.price?.product;
        const itemData: any = {
          name: product?.name || 'Product',
          quantity: item.quantity || 1,
          price: item.price?.unit_amount || 0,
        };

        // Track subtotal
        subtotal += (item.price?.unit_amount || 0) * (item.quantity || 1);

        // Include notes from product description
        if (product?.description) {
          itemData.notes = product.description;
        }

        console.log(`[${Date.now() - startTime}ms] Processed item:`, {
          name: itemData.name,
          quantity: itemData.quantity,
          notes: itemData.notes || 'None',
        });

        return itemData;
      }) || [];

    console.log(`[${Date.now() - startTime}ms] Line items with notes:`, items);
    console.log(`[${Date.now() - startTime}ms] Order breakdown:`, {
      subtotal: `$${(subtotal / 100).toFixed(2)}`,
      tax: `$${(tax / 100).toFixed(2)}`,
      shipping: `$${(shipping / 100).toFixed(2)}`,
      total: `$${((subtotal + tax + shipping) / 100).toFixed(2)}`,
    });

    // Extract shipping address from metadata
    let shippingAddress = null;
    if (session.metadata?.shippingAddress) {
      try {
        shippingAddress = JSON.parse(session.metadata.shippingAddress);
      } catch (e) {
        console.error('Failed to parse shipping address:', e);
      }
    }

    console.log(`[${Date.now() - startTime}ms] Shipping address:`, shippingAddress);

    // Extract order details
    const orderDetails = {
      orderId: session.id.slice(0, 16),
      customerEmail: session.customer_email || session.customer_details?.email || '',
      amount: session.amount_total || 0,
      paymentStatus: session.payment_status,
      items,
      subtotal,
      tax,
      shipping,
      shippingAddress,
    };

    console.log(`[${Date.now() - startTime}ms] Order details prepared:`, orderDetails);

    // Validate email exists
    if (!orderDetails.customerEmail) {
      console.error('[ERROR] No customer email found');
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
      );
    }

    // Send confirmation emails
    console.log(`[${Date.now() - startTime}ms] Calling sendOrderConfirmationEmail...`);
    const emailResult = await sendOrderConfirmationEmail(orderDetails);
    
    console.log(`[${Date.now() - startTime}ms] ✓ Emails sent successfully`);
    console.log('Email result:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'Confirmation emails sent successfully',
      orderDetails,
      timeTaken: `${Date.now() - startTime}ms`,
    });
  } catch (error: any) {
    console.error('\n=== ❌ ERROR SENDING CONFIRMATION EMAILS ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Time elapsed:', `${Date.now() - startTime}ms`);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('Stack:', error.stack);
    console.error('===========================================\n');
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to send confirmation emails',
        details: error.stack,
        timeTaken: `${Date.now() - startTime}ms`,
      },
      { status: 500 }
    );
  }
}
