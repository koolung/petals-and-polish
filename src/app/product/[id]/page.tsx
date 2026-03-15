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

  // Product data based on ID
  const productsData: { [key: string]: any } = {
    '1': {
      id: 1,
      title: 'Light Blue Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/lightblue.jpeg', '/images/lightblue2.jpeg'],
      description: 'Stunning light blue press-on nails perfect for a fresh, serene look. These elegant nails feature a beautiful sky blue shade that works for any occasion. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '2': {
      id: 2,
      title: 'Light Purple Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/lightpurple1.JPEG', '/images/lightpurple2.JPEG'],
      description: 'Delicate light purple press-on nails that bring a soft, romantic vibe to your style. Perfect for those who love subtle elegance with a touch of color. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '3': {
      id: 3,
      title: 'Flower Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/flower.jpeg'],
      description: 'Gorgeous floral-inspired press-on nails that bring nature\'s beauty to your fingertips. These stunning nails feature beautiful flower designs perfect for spring and summer. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '4': {
      id: 4,
      title: 'Green Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/green.JPG'],
      description: 'Vibrant green press-on nails that make a bold fashion statement. Whether you prefer a soft sage or vibrant emerald, these nails add a refreshing pop of color to any look. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '5': {
      id: 5,
      title: 'Pink Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/pink.jpeg', '/images/pink2.jpeg'],
      description: 'Classic gorgeous pink press-on nails that never go out of style. These beautiful pink nails are perfect for every season and occasion, from casual to elegant. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '6': {
      id: 6,
      title: 'Purple Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/purple.JPG'],
      description: 'Stunning deep purple press-on nails that exude sophistication and elegance. Perfect for those who love bold, luxurious colors that command attention. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '7': {
      id: 7,
      title: 'Sparkle Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/sparkle.jpeg'],
      description: 'Dazzling sparkle press-on nails that catch the light beautifully. These glamorous nails are perfect for making a statement at parties, events, or whenever you want to shine. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
    '8': {
      id: 8,
      title: 'White Press-On Nails',
      price: 45.00,
      originalPrice: 75.00,
      images: ['/images/white.jpeg'],
      description: 'Elegant white press-on nails that bring timeless sophistication to your style. These crisp, clean white nails are versatile and work with any outfit or occasion. Super comfortable, durable, and reusable up to 5 times. Professional salon quality finish.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
  };

  const product = productsData[params.id as string] || productsData['1'];

  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const toolkit = [
    { icon: '✨', name: 'Sticky Tabs', desc: 'Strong adhesive tabs' },
    { icon: '🧼', name: 'Alcohol Wipes', desc: 'Nail cleanser' },
    { icon: '🪵', name: 'Wooden Stick', desc: 'Nail applicator' },
    { icon: '🧽', name: 'Sponge Buffer', desc: 'Smooth finish' },
    { icon: '📄', name: 'Nail File', desc: 'Sizing tool' },
  ];

  // Get recommended products - exclude current product
  const currentId = parseInt(params.id as string) || 1;
  const allProductIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const otherProductIds = allProductIds.filter(id => id !== currentId).slice(0, 3);
  
  const recommendedProducts = otherProductIds.map(id => {
    const prod = productsData[id.toString()];
    return {
      id: prod.id,
      image: prod.images[0],
      title: prod.title,
      price: `$${prod.price.toFixed(2)}`,
    };
  });

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
      notes: notes || undefined,
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

      <section className="pt-20 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6 lg:px-8">
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
                  Save 40%
                </div>
                {/* Fullscreen Button */}
                <button
                  onClick={() => setFullscreenImage(mainImage)}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6v12h12v-4m4-4V6m0 0h-4m4 0l-5 5" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: string, idx: number) => (
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
                  {product.sizes.map((size: string) => (
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
                  className="text-[#f7c5d8] font-semibold hover:underline border-[#f7c5d8] border-2 rounded-lg px-3 py-1 text-sm"
                >
                  📏 View Size Chart
                </button>

                {showSizeChart && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setShowSizeChart(false)}
                  >
                    <div
                      className="relative bg-white dark:bg-black rounded-xl overflow-hidden max-w-2xl max-h-screen"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setShowSizeChart(false)}
                        className="absolute top-4 right-4 z-10 bg-black dark:bg-white text-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        ✕
                      </button>

                      {/* Size Chart Image */}
                      <div className="relative w-full h-auto">
                        <Image
                          src="/images/guide.png"
                          alt="Size Chart"
                          width={700}
                          height={900}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
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

              {/* Notes */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions or notes for your order..."
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg"
                />
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
                      Save 40%
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

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white p-2 rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={fullscreenImage}
            alt="Fullscreen"
            width={1200}
            height={1200}
            className="w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
