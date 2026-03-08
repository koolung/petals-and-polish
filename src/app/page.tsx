'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const products = [
    { id: 1, image: '/images/lightblue.jpeg', title: 'Light Blue', price: '$9.99' },
    { id: 2, image: '/images/pink.jpeg', title: 'Pink', price: '$10.99' },
    { id: 3, image: '/images/sparkle.jpeg', title: 'Sparkle', price: '$9.99' },
    { id: 4, image: '/images/white.jpeg', title: 'White', price: '$12.99' },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
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
          <div className="md:hidden">
            <Image
              src="/images/banner-mobile.png"
              alt="Banner"
              width={600}
              height={400}
              priority
              className="w-full h-auto"
            />
          </div>
        </a>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Opening Sales Deal</h2>
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden">
            <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div className="mb-6">
                <div key={products[currentSlide].id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 dark:bg-gray-900 h-110">
                    <Image
                      src={products[currentSlide].image}
                      alt={products[currentSlide].title}
                      width={200}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7c5d8] text-[#ff1493] px-3 py-1 rounded-2xl text-sm font-semibold">
                      Save 20%
                    </div>
                  </div>
                  <div className='flex flex-row'>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-center">{products[currentSlide].title}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-sm text-black line-through">
                          ${(parseFloat(products[currentSlide].price.replace('$', '')) * 1.2).toFixed(2)}
                        </p>
                        <p className="text-xl font-bold text-[#f7c5d8]">{products[currentSlide].price}</p>
                      </div>
                    </div>
                    <button className="w-3/5 bg-[#f7c5d8] text-black font-semibold py-2 pb-0 rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-between mb-4">
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
                      onClick={() => setCurrentSlide(idx)}
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
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 dark:bg-gray-900 h-40">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#f7c5d8] text-[#ff1493] px-2 py-1 rounded-2xl text-xs font-semibold">
                    Save 20%
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#f7c5d8] transition-colors">{product.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-black line-through">
                    ${(parseFloat(product.price.replace('$', '')) * 1.2).toFixed(2)}
                  </p>
                  <p className="text-xl font-bold text-[#f7c5d8]">{product.price}</p>
                </div>
                <button className="w-full bg-[#f7c5d8] text-black font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with modern web technologies for the best user experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Optimized performance with Next.js and Tailwind CSS for incredible load times"
            />
            <FeatureCard
              icon="📱"
              title="Mobile First"
              description="Fully responsive design that looks perfect on all devices and screen sizes"
            />
            <FeatureCard
              icon="✨"
              title="Smooth Animations"
              description="CSS-based animations and smooth scrolling for a delightful user experience"
            />
            <FeatureCard
              icon="🎨"
              title="Modern Design"
              description="Contemporary UI patterns and gradient effects for a polished look"
            />
            <FeatureCard
              icon="🔒"
              title="Type Safe"
              description="Built with TypeScript for safer code and better developer experience"
            />
            <FeatureCard
              icon="♿"
              title="Accessible"
              description="WCAG compliant components that work for everyone"
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl font-bold">Smooth Scrolling Experience</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Navigate seamlessly through the site with our smooth scroll behavior. Every transition is optimized for the best visual feedback.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <span className="text-[#f7c5d8] font-bold">✓</span>
                  <span>Native CSS scroll-behavior for optimal performance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7c5d8] font-bold">✓</span>
                  <span>Smooth section navigation on all breakpoints</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7c5d8] font-bold">✓</span>
                  <span>Touch-friendly interactions for mobile users</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#f7c5d8]/10 to-[#f7c5d8]/5 border border-[#f7c5d8]/20 rounded-2xl p-12 flex items-center justify-center animate-slide-in-right">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎯</div>
                <p className="font-semibold">Mobile Optimized</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perfect viewport settings and responsive components
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Start your next project with Petals & Polish as your foundation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              className="px-8 py-3 bg-[#f7c5d8] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all duration-300 transform hover:scale-105"
            >
              View Source Code
            </a>
            <a
              href="https://nextjs.org/docs"
              className="px-8 py-3 border-2 border-[#f7c5d8] text-black font-semibold rounded-lg hover:border-[#f7c5d8] hover:bg-[#f7c5d8]/10 transition-all duration-300"
            >
              Learn Next.js
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
