'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-8 px-4 py-2 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all duration-300"
          >
            ← Back
          </button>

          {/* Hero Section */}
          <div className="mb-16 space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold">Petals & Polish</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Gorgeous Press-On Nails. Express Yourself.</p>
          </div>

          {/* Collections Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Classic Elegance', price: '$8.99', desc: 'Timeless designs for everyday wear' },
                { name: 'Bold & Vibrant', price: '$9.99', desc: 'Eye-catching colors and patterns' },
                { name: 'Luxury Glam', price: '$12.99', desc: 'Premium finishes with embellishments' },
              ].map((collection) => (
                <div key={collection.name} className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#f7c5d8] hover:shadow-lg dark:hover:shadow-[#f7c5d8]/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{collection.desc}</p>
                  <p className="text-2xl font-bold text-[#f7c5d8] mb-4">{collection.price}</p>
                  <button className="w-full bg-[#f7c5d8] text-black py-2 font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Why Choose Petals & Polish?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-3xl">✨</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Premium Quality</h3>
                    <p className="text-gray-600 dark:text-gray-400">High-quality, long-lasting materials that look salon-perfect</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">⏱️</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Easy Application</h3>
                    <p className="text-gray-600 dark:text-gray-400">Simple 5-minute application process with included nail glue</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-3xl">🌈</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Endless Designs</h3>
                    <p className="text-gray-600 dark:text-gray-400">Hundreds of trendy designs updated seasonally</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">💪</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Reusable & Durable</h3>
                    <p className="text-gray-600 dark:text-gray-400">Up to 2 weeks wear per set. Can be reused up to 5 times</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Apply */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">How to Apply</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: '1', title: 'Prep', desc: 'Clean and push back cuticles' },
                { step: '2', title: 'Size', desc: 'Find the right size for each nail' },
                { step: '3', title: 'Apply', desc: 'Add glue and press for 10-15 seconds' },
                { step: '4', title: 'Enjoy', desc: 'Rock your fabulous new nails!' },
              ].map((item) => (
                <div key={item.step} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-3xl font-bold text-[#f7c5d8] mb-2">{item.step}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#f7c5d8]/10 to-[#f7c5d8]/5 border border-[#f7c5d8]/20 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Browse our complete collection and find your perfect nails today</p>
            <button className="px-8 py-3 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all duration-300 transform hover:scale-105">
              Shop All Collections
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
