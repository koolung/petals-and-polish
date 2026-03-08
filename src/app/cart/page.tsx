'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Call the checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();
      console.log('Checkout response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      const { checkoutUrl } = data;

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from Stripe');
      }

      console.log('Redirecting to Stripe checkout URL:', checkoutUrl);

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout');
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Shopping Cart</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Start shopping and add some beautiful press-on nails to your cart!
              </p>
              <Link
                href="/product"
                className="inline-block px-8 py-3 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all transform hover:scale-105"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const total = getCartTotal();
  const subtotal = total;
  const tax = parseFloat((subtotal * 0.08).toFixed(2)); // 8% tax
  const finalTotal = parseFloat((subtotal + tax).toFixed(2));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-[#f7c5d8] transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)
                          }
                          className="w-12 text-center border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                      <p className="text-lg font-bold text-[#f7c5d8]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4 sticky top-40">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-3 border-t border-b border-gray-300 dark:border-gray-700 py-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#f7c5d8]">${finalTotal.toFixed(2)}</span>
                </div>

                {error && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={`w-full font-bold py-3 rounded-lg text-lg transition-all transform hover:scale-105 ${
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#f7c5d8] text-black hover:shadow-lg hover:shadow-[#f7c5d8]/50'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <Link
                  href="/product"
                  className="block w-full text-center border-2 border-[#f7c5d8] text-black font-semibold py-2 rounded-lg hover:bg-[#f7c5d8]/10 transition-all"
                >
                  Continue Shopping
                </Link>

                <div className="pt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
