import type { Metadata } from 'next';
import Contact from '@/components/Pages/Contact';

export const metadata: Metadata = {
  title: 'Contact — Porous Being | Get in Touch',
  description: 'Get in touch with Porous Being architecture practice. We\'d love to hear from you about your project or inquiry.',
  keywords: 'contact, architecture, design inquiry, project consultation',
  openGraph: {
    title: 'Contact — Porous Being',
    description: 'Get in touch with Porous Being architecture and design practice.',
    url: 'https://porous-being.com/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
