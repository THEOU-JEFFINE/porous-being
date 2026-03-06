import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://porous-being.com'),
  title: 'Porous Being | Architecture & Design Portfolio',
  description: 'Explore our award-winning architectural and design projects. From sustainable residential developments to innovative infrastructure solutions.',
  keywords: 'architecture, design, projects, portfolio, residential, commercial, sustainable design',
  authors: [{ name: 'Porous Being' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  icons: {
    icon: '/Porous_favi.png',
    apple: '/Porous_favi.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Porous Being',
  },
  openGraph: {
    type: 'website',
    url: 'https://porous-being.com',
    title: 'Porous Being | Architecture & Design Portfolio',
    description: 'Explore our award-winning architectural and design projects.',
    siteName: 'Porous Being',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Porous Being | Architecture & Design Portfolio',
    description: 'Explore our award-winning architectural and design projects.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&display=swap"
        />
        <meta name="theme-color" content="#000000" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Porous Being',
            'url': 'https://porous-being.com/',
            'sameAs': [
              'https://www.facebook.com/porousbeing',
              'https://www.instagram.com/porousbeing',
              'https://www.linkedin.com/company/porous-being'
            ]
          })}
        </script>
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
