'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-8">
            {/* Cancel Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Your payment was not completed. Your items are still in your cart.
              </p>
            </div>

            {/* Info Message */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-left">
              <h2 className="font-semibold text-lg mb-2">What Happened?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You cancelled the payment process before completing your purchase. Don't worry—your items are saved in your cart and ready whenever you are.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/cart"
                className="block px-8 py-3 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all transform hover:scale-105 text-center"
              >
                Return to Cart
              </Link>
              <Link
                href="/product"
                className="block px-8 py-3 border-2 border-[#f7c5d8] text-black font-semibold rounded-lg hover:bg-[#f7c5d8]/10 transition-all text-center"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="block px-8 py-3 text-gray-600 dark:text-gray-400 font-semibold rounded-lg hover:text-[#f7c5d8] transition-all text-center"
              >
                Back to Home
              </Link>
            </div>

            {/* Help Text */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Having trouble? Contact us at support@petalsandpolish.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
