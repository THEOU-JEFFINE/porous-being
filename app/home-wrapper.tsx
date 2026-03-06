'use client';

import { useState, useEffect } from 'react';
import Landing from '@/components/Landing';
import Projects from '@/components/Pages/Projects';
import { useServiceWorker } from '@/lib/hooks/useServiceWorker';

interface ComponentDataItem {
  key: string;
  title: string;
  typology: string;
  images: string[];
}

interface HomeWrapperProps {
  componentData?: ComponentDataItem[];
}

export default function HomeWrapper({ componentData = [] }: HomeWrapperProps) {
  const [showLanding, setShowLanding] = useState(true);

  // Register service worker for offline support and caching
  useServiceWorker();

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  return (
    <>
      {showLanding && <Landing onComplete={handleLandingComplete} />}
      <Projects componentData={componentData} />
    </>
  );
}
