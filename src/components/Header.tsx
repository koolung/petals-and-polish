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
        <div className="animate-scroll whitespace-nowrap text-sm font-semibold">
          🎉 20% discount on all items storewide! 🎉 &nbsp;&nbsp;&nbsp;&nbsp; 🎉 20% discount on all items storewide! 🎉
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
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          {['Features', 'Showcase', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium hover:text-[#f7c5d8] dark:hover:text-[#f7c5d8] transition-colors"
            >
              {item}
            </button>
          ))}
          <Link
            href="/cart"
            className="relative p-2 hover:text-[#f7c5d8] dark:hover:text-[#f7c5d8] transition-colors"
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

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 md:hidden">
            <div className="flex flex-col">
              {['Features', 'Showcase', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                >
                  {item}
                </button>
              ))}
              <Link
                href="/cart"
                className="px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2"
              >
                🛒 Cart {cartCount > 0 && <span className="bg-[#ff1493] text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  );
}
