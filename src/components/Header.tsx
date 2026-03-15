'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="sticky top-0 z-40 bg-black text-white overflow-hidden h-8 flex items-center">
        <style>{`
          @keyframes scrollBanner {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .banner-scroll {
            display: flex;
            animation: scrollBanner 20s linear infinite;
            width: 200%;
          }
          .banner-scroll span {
            flex: 0 0 50%;
            white-space: nowrap;
          }
        `}</style>
        <div className="banner-scroll text-sm font-semibold">
          <span>🎉 40% discount on all items storewide! 🎉</span>
          <span>🎉 40% discount on all items storewide! 🎉</span>
        </div>
      </div>

      <header className="fixed top-8 left-0 right-0 z-50 bg-[#f7c5d8]/90 backdrop-blur-sm dark:bg-[#f7c5d8]/80 border-b border-[#f7c5d8] dark:border-[#f7c5d8]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
        <Image
            src="/images/logo-transparent-bg.png"
            alt="Petals & Polish Logo"
            width={120}
            height={50}
            priority
            className="h-20 w-auto"
        />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 relative"
          style={{ zIndex: 51 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/product"
            className="text-sm font-medium hover:text-[#ff1493] dark:hover:text-[#ff1493] transition-colors"
          >
            Product
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium hover:text-[#ff1493] dark:hover:text-[#ff1493] transition-colors"
          >
            Contact
          </button>
          <Link
            href="/cart"
            className="relative p-2 hover:text-[#ff1493] dark:hover:text-[#ff1493] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff1493] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu backdrop and panel */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            style={{ zIndex: 30 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-[#f7c5d8f7] dark:bg-black border-l border-gray-200 dark:border-gray-800 md:hidden overflow-hidden`}
          style={{ 
            zIndex: 40,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="pt-40 pb-6 flex flex-col">
            <Link
              href="/product"
              onClick={() => setIsOpen(false)}
              className="px-6 py-4 text-left text-3xl font-extrabold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-800"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease-out, transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isOpen ? '100ms' : '0ms'
              }}
            >
              Product
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-4 text-left text-3xl font-extrabold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-800"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease-out, transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isOpen ? '200ms' : '0ms'
              }}
            >
              Contact
            </button>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="px-6 py-4 text-left text-3xl font-extrabold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-800 flex items-center gap-2"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease-out, transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isOpen ? '300ms' : '0ms'
              }}
            >
             Cart {cartCount > 0 && <span className="bg-[#ff1493] text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
