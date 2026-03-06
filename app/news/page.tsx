import type { Metadata } from 'next';
import News from '@/components/Pages/News';

export const metadata: Metadata = {
  title: 'News & Events — Porous Being | Architecture & Design',
  description: 'Latest news, events, awards and lectures from Porous Being architecture practice. Stay updated with our recent projects and achievements.',
  keywords: 'architecture news, design events, awards, lectures, Porous Being',
  openGraph: {
    title: 'News & Events — Porous Being',
    description: 'Stay updated with the latest news, events, awards and lectures from Porous Being.',
    url: 'https://porous-being.com/news',
  },
};

export default function NewsPage() {
  return <News />;
}
