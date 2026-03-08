# Petals & Polish - Modern Next.js Website

A beautiful, mobile-first Next.js website with smooth scrolling animations and responsive design.

## Features

- ✨ **Smooth Scroll**: Native CSS scroll-behavior for optimal performance
- 📱 **Mobile First**: Fully responsive design optimized for all screen sizes
- 🎨 **Modern UI**: Beautiful gradients, animations, and hover effects
- ⚡ **Lightning Fast**: Optimized with Next.js and Tailwind CSS
- 🔒 **Type Safe**: Built with TypeScript
- ♿ **Accessible**: WCAG compliant components

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles with smooth scroll animations
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Home page with sections
├── components/
│   ├── Header.tsx        # Mobile-friendly navigation
│   ├── FeatureCard.tsx   # Reusable card component
│   └── Footer.tsx        # Footer component
└── public/               # Static assets
```

## Customization

### Adding Sections

Edit `src/app/page.tsx` to add new sections. Each section uses smooth scrolling:

```tsx
<section id="section-id" className="py-16 sm:py-24">
  {/* Content */}
</section>
```

### Styling

- Tailwind CSS classes for responsive design
- Custom animations in `globals.css`
- Dark mode support with `dark:` prefix

### Mobile Optimization

- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Touch-friendly button sizes
- Flexible grid layouts

## Production Build

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
