export interface Product {
  id: number;
  name: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Light Blue', title: 'Light Blue Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/lightblue.jpeg' },
  { id: 2, name: 'Light Purple', title: 'Light Purple Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/lightpurple.jpeg' },
  { id: 3, name: 'Flower', title: 'Flower Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/flower.jpeg' },
  { id: 4, name: 'Green', title: 'Green Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/green.JPG' },
  { id: 5, name: 'Pink', title: 'Pink Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/pink.jpeg' },
  { id: 6, name: 'Purple', title: 'Purple Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/purple.JPG' },
  { id: 7, name: 'Sparkle', title: 'Sparkle Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/sparkle.jpeg' },
  { id: 8, name: 'White', title: 'White Press-On Nails', price: '$45.00', originalPrice: '$75.00', image: '/images/white.jpeg' },
];
