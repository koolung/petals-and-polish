'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  // Sample product data - in a real app, fetch based on params.id
  const product = {
    id: 1,
    title: 'Light Blue Press-On Nails',
    price: 9.99,
    originalPrice: 11.99,
    images: ['/images/lightblue.jpeg', '/images/lightblue.jpeg', '/images/lightblue.jpeg', '/images/lightblue.jpeg'],
    description: 'Beautiful light blue press-on nails perfect for everyday wear. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
    sizes: ['XS', 'S', 'M', 'L'],
  };

  const toolkit = [
    { icon: '✨', name: 'Sticky Tabs', desc: 'Strong adhesive tabs' },
    { icon: '🧼', name: 'Alcohol Wipes', desc: 'Nail cleanser' },
    { icon: '🪵', name: 'Wooden Stick', desc: 'Nail applicator' },
    { icon: '🧽', name: 'Sponge Buffer', desc: 'Smooth finish' },
    { icon: '📄', name: 'Nail File', desc: 'Sizing tool' },
  ];

  const recommendedProducts = [
    { id: 2, image: '/images/pink.jpeg', title: 'Pink', price: '$10.99' },
    { id: 3, image: '/images/sparkle.jpeg', title: 'Sparkle', price: '$9.99' },
    { id: 4, image: '/images/white.jpeg', title: 'White', price: '$12.99' },
  ];

  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);
    
    // Add item to cart
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
    });

    // Show success message
    setAddSuccess(true);
    setIsAdding(false);

    // Reset after 2 seconds and redirect
    setTimeout(() => {
      router.push('/cart');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 h-96">
                <Image
                  src={mainImage}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#f7c5d8] text-[#ff1493] px-3 py-1 rounded-2xl text-sm font-semibold">
                  Save 20%
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`overflow-hidden rounded-lg h-24 border-2 transition-all ${
                      mainImage === img ? 'border-[#f7c5d8]' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                
                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-sm text-black line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                  <p className="text-3xl font-bold text-[#f7c5d8]">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Select Size</h2>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-[#f7c5d8] text-black'
                          : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:border-[#f7c5d8] border-2 border-transparent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-[#f7c5d8] font-semibold hover:underline"
                >
                  📏 View Size Chart
                </button>

                {showSizeChart && (
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-semibold mb-2">Size Chart Guide:</p>
                    <ul className="space-y-1">
                      <li><strong>XS:</strong> Size 0-3</li>
                      <li><strong>S:</strong> Size 4-6</li>
                      <li><strong>M:</strong> Size 7-9</li>
                      <li><strong>L:</strong> Size 10-12</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Quantity Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Quantity</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full font-bold py-4 text-lg rounded-lg transition-all transform hover:scale-105 ${
                    addSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-[#f7c5d8] text-black hover:shadow-lg hover:shadow-[#f7c5d8]/50'
                  } ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {addSuccess ? '✓ Added to Cart!' : isAdding ? 'Adding...' : '🛒 Add to Cart'}
                </button>
                <Link
                  href="/cart"
                  className="block w-full text-center border-2 border-[#f7c5d8] text-black font-semibold py-3 rounded-lg hover:bg-[#f7c5d8]/10 transition-all"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          {/* Complimentary Toolkit Section */}
          <div className="bg-gradient-to-r from-[#f7c5d8]/10 to-[#f7c5d8]/5 border border-[#f7c5d8]/20 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8">✨ Complimentary Toolkit Included</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Every nail set includes a complete application toolkit everything you need for a perfect application:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {toolkit.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* You May Also Like Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendedProducts.map((prod) => (
                <div key={prod.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 dark:bg-gray-900 h-56">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#f7c5d8] text-[#ff1493] px-2 py-1 rounded-2xl text-xs font-semibold">
                      Save 20%
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#f7c5d8] transition-colors">
                    {prod.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-sm text-black line-through">
                      ${(parseFloat(prod.price.replace('$', '')) * 1.2).toFixed(2)}
                    </p>
                    <p className="text-xl font-bold text-[#f7c5d8]">{prod.price}</p>
                  </div>
                  <Link href={`/product/${prod.id}`} className="w-full bg-[#f7c5d8] text-black font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-[#f7c5d8]/50 transition-all block text-center">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
