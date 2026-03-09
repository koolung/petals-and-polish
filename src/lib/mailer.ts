import nodemailer from 'nodemailer';

console.log('=== Initializing Nodemailer Transport ===');
console.log('SMTP Host:', process.env.SMTP_HOST);
console.log('SMTP Port:', process.env.SMTP_PORT);
console.log('SMTP User:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Connection Successful');
  }
});

interface OrderDetails {
  orderId: string;
  customerEmail: string;
  amount: number;
  paymentStatus: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  const { orderId, customerEmail, amount, paymentStatus, items = [] } = orderDetails;

  console.log('=== Preparing to send confirmation emails ===');
  console.log('To customer:', customerEmail);
  console.log('Order ID:', orderId);
  console.log('Items:', items);

  const itemsHtml = items.length > 0 ? `
    <h3>Items Ordered</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
        <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
        <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
      </tr>
      ${items.map((item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <strong>${item.name}</strong>
            ${item.notes ? `<br/><em style="color: #666; font-size: 0.9em;">Notes: ${item.notes}</em>` : ''}
          </td>
          <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(item.price / 100).toFixed(2)} CAD</td>
        </tr>
      `).join('')}
    </table>
  ` : '';

  const customerEmailContent = `
    <h2>Thank you for your order!</h2>
    <p>Your payment has been confirmed.</p>
    <hr />
    ${itemsHtml}
    <h3>Order Summary</h3>
    <ul>
      <li><strong>Order ID:</strong> ${orderId}</li>
      <li><strong>Amount Paid:</strong> $${(amount / 100).toFixed(2)} CAD</li>
      <li><strong>Payment Status:</strong> ${paymentStatus}</li>
    </ul>
    <hr />
    <p><strong>What's Next?</strong></p>
    <ul>
      <li>Your order is being prepared for shipment</li>
      <li>You'll receive a shipping confirmation email with tracking information</li>
      <li>Expected delivery: 5-7 business days</li>
      <li>Questions? Reply to this email</li>
    </ul>
    <hr />
    <p>Thank you for shopping with Petals & Polish!</p>
  `;

  const adminEmailContent = `
    <h2>New Order Received</h2>
    <p>A new order has been placed on Petals & Polish.</p>
    <hr />
    ${itemsHtml}
    <h3>Order Summary</h3>
    <ul>
      <li><strong>Order ID:</strong> ${orderId}</li>
      <li><strong>Customer Email:</strong> ${customerEmail}</li>
      <li><strong>Amount:</strong> $${(amount / 100).toFixed(2)} CAD</li>
      <li><strong>Payment Status:</strong> ${paymentStatus}</li>
    </ul>
    <hr />
    <p>Please process this order and send a shipping confirmation when the items are dispatched.</p>
  `;

  try {
    // Send email to customer
    console.log('Sending customer email to:', customerEmail);
    const customerResult = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: customerEmail,
      subject: 'Order Confirmation - Petals & Polish',
      html: customerEmailContent,
    });
    console.log('Customer email sent:', customerResult);

    // Send notification email to admin
    console.log('Sending admin notification to:', process.env.NOTIFICATION_EMAIL);
    const adminResult = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Order #${orderId} - Petals & Polish`,
      html: adminEmailContent,
    });
    console.log('Admin email sent:', adminResult);

    return { success: true, customerResult, adminResult };
  } catch (error: any) {
    console.error('=== Email Sending Error ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error commandResponse:', error.response);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
