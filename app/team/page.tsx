import type { Metadata } from 'next';
import Team from '@/components/Pages/Team';

export const metadata: Metadata = {
  title: 'Team — Porous Being | Architecture Professionals',
  description: 'Meet the talented team behind Porous Being architecture and design practice, including architects and project managers.',
  keywords: 'architects, design team, project management, architecture professionals',
  openGraph: {
    title: 'Team — Porous Being',
    description: 'Meet our team of architecture and design professionals.',
    url: 'https://porous-being.com/team',
  },
};

export default function TeamPage() {
  return <Team />;
}
