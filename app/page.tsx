import type { Metadata } from 'next';
import { getComponentData } from '@/lib/getComponentData';
import HomeWrapper from './home-wrapper';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Porous Being | Architecture & Design Portfolio',
  description: 'Explore our award-winning architectural and design projects. From sustainable residential developments to innovative infrastructure solutions.',
  keywords: 'architecture, design, projects, portfolio, residential, commercial, sustainable design',
  openGraph: {
    title: 'Porous Being | Architecture & Design Portfolio',
    description: 'Explore our award-winning architectural and design projects.',
    url: 'https://porous-being.com/',
  },
};

export default async function Home() {
  const componentData = await getComponentData();
  
  return <HomeWrapper componentData={componentData} />;
}
