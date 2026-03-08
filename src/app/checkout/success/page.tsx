'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();

    // Fetch session details from Stripe
    if (sessionId) {
      const fetchSession = async () => {
        try {
          const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setSessionDetails(data);
          } else {
            setError('Failed to retrieve order details');
          }
        } catch (err) {
          console.error('Error fetching session:', err);
          setError('An error occurred while retrieving order details');
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
    } else {
      setLoading(false);
      setError('No session ID found');
    }
  }, [sessionId, clearCart]);

  return (
    <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Thank you for your order. Your beautiful press-on nails are on their way!
            </p>
          </div>

          {/* Order Details */}
          {loading ? (
            <div className="text-gray-600 dark:text-gray-400">Loading order details...</div>
          ) : error ? (
            <div className="text-red-600 dark:text-red-400">{error}</div>
          ) : sessionDetails ? (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-left space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                  <p className="font-semibold text-lg">{sessionId?.slice(0, 16)}...</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</p>
                  <p className="font-semibold text-lg text-green-600">
                    ${(sessionDetails.amount_total / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                  <p className="font-semibold text-lg capitalize text-green-600">
                    {sessionDetails.payment_status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-lg">{sessionDetails.customer_email}</p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Next Steps */}
          <div className="bg-[#f7c5d8]/10 border border-[#f7c5d8]/20 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-lg">What's Next?</h2>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="text-[#f7c5d8] font-bold">✓</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f7c5d8] font-bold">✓</span>
                <span>Track your shipment with the provided tracking number</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f7c5d8] font-bold">✓</span>
                <span>Delivery within 5-7 business days</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f7c5d8] font-bold">✓</span>
                <span>30-day return policy applies</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/product"
              className="block px-8 py-3 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all transform hover:scale-105 text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block px-8 py-3 border-2 border-[#f7c5d8] text-black font-semibold rounded-lg hover:bg-[#f7c5d8]/10 transition-all text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <Suspense fallback={<div className="pt-40 text-center">Loading order details...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
