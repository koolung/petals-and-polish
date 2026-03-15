'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/products';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const products = PRODUCTS;

  // Mobile carousel scroll
  const scrollToIndex = (index: number) => {
    if (mobileCarouselRef.current) {
      const cardWidth = mobileCarouselRef.current.offsetWidth * 0.88;
      mobileCarouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const newIndex = currentSlide < products.length - 1 ? currentSlide + 1 : 0;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : products.length - 1;
    scrollToIndex(newIndex);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-0">
        <a href="/product" className="block cursor-pointer transition-transform hover:scale-105">
          {/* Desktop Banner */}
          <div className="hidden md:flex justify-center px-8 pt-8 pb-16">
            <div className="h-[40vh] overflow-hidden rounded-xl w-full max-w-5xl">
              <Image
                src="/images/banner-desktop.png"
                alt="Banner"
                width={1200}
                height={400}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Mobile Banner */}
          <div className="md:hidden relative">
            <Image
              src="/images/banner-mobile.png"
              alt="Banner"
              width={600}
              height={400}
              priority
              className="w-full h-auto"
            />
            <Link href="/product" className="absolute inset-0 flex items-end justify-center pb-20 border-4 border-[#f7c5d8]">
              <button className="px-8 py-3 bg-[#f7c5d8] text-black border-4 font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all duration-300 transform hover:scale-105">
                Shop Now
              </button>
            </Link>
          </div>
        </a>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Opening Sales Deal</h2>
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden">
            <div 
              ref={mobileCarouselRef}
              className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide gap-3 pb-4"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative flex-shrink-0 w-[85%] group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 dark:bg-gray-900 h-110">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={200}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7c5d8] text-[#ff1493] px-3 py-1 rounded-2xl text-sm font-semibold">
                      Save 20%
                    </div>
                  </div>
                  <div className='flex flex-row gap-7' onClick={(e) => e.stopPropagation()}>
                    <div className="w-2/5">
                      <h3 className="font-semibold text-lg text-center">{product.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-sm text-black line-through">
                          {product.originalPrice}
                        </p>
                        <p className="text-xl font-bold text-[#ff1493]">{product.price}</p>
                      </div>
                    </div>
                    <div className="w-3/5">
                      <Link href={`/product/${product.id}`} className="h-full bg-transparent border border-[#ff1493] border-3 text-[#ff1493] font-semibold py-3 text-center rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all flex items-center justify-center">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between mt-4 px-3">
              <button
                onClick={prevSlide}
                className="p-2 hover:opacity-80 transition-all"
              >
                <svg className="w-6 h-6 text-[#ff1493]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-[#f7c5d8] w-6' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 hover:opacity-80 transition-all"
              >
                <svg className="w-6 h-6 text-[#ff1493]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 dark:bg-gray-900 h-40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#f7c5d8] text-[#ff1493] px-2 py-1 rounded-2xl text-xs font-semibold">
                    Save 20%
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#f7c5d8] transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-black line-through">
                    {product.originalPrice}
                  </p>
                  <p className="text-xl font-bold text-[#f7c5d8]">{product.price}</p>
                </div>
                <Link href={`/product/${product.id}`} className="w-full bg-[#f7c5d8] text-black font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all block text-center">
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Petals & Polish</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#f7c5d8]/10 to-[#f7c5d8]/5 border border-[#f7c5d8]/20 rounded-xl p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We're a <span className="font-semibold text-[#f7c5d8]">Nova Scotia-based small business</span> passionate about creating beautiful, high-quality press-on nails. We believe in the power of craftsmanship and the importance of supporting quality over quantity.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                In a world dominated by mass production, we stand by our commitment to <span className="font-semibold text-[#f7c5d8]">handcrafted excellence</span>. Every nail set we create is designed with care, attention to detail, and a dedication to uniqueness. We refuse to compromise quality for profit margins or create cookie-cutter products that lack personality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold text-lg mb-2">Locally Crafted</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Made with pride right here in Nova Scotia</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Premium materials and expert craftsmanship</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold text-lg mb-2">Uniquely Yours</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">One-of-a-kind designs with real personality</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              When you choose Petals & Polish, you're choosing to support a small business that values integrity, creativity, and the artistry behind every product. Thank you for being part of our journey! 💕
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">

      </section>

      <Footer />
    </div>
  );
}
