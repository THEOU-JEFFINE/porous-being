import type { Metadata } from 'next';
import About from '@/components/Pages/About';

export const metadata: Metadata = {
  title: 'About — Porous Being | Architecture & Design Practice',
  description: 'Learn about Porous Being, an architecture and design practice exploring the intersection of spatial design, ecology, and urbanism.',
  keywords: 'architecture firm, design studio, sustainability, urban design, ecology',
  openGraph: {
    title: 'About — Porous Being',
    description: 'Learn about our architecture and design practice.',
    url: 'https://porous-being.com/about',
  },
};

export default function AboutPage() {
  return <About />;
}
