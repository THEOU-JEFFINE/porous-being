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
  const [showLanding, setShowLanding] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Register service worker for offline support and caching
  useServiceWorker();

  useEffect(() => {
    // Check if landing animation has already been shown in this session
    const hasSeenLanding = sessionStorage.getItem('landingAnimationShown');
    
    if (!hasSeenLanding) {
      setShowLanding(true);
    }
    setMounted(true);
  }, []);

  const handleLandingComplete = () => {
    setShowLanding(false);
    // Mark that landing animation has been shown in this session
    sessionStorage.setItem('landingAnimationShown', 'true');
  };

  // Don't render until component is mounted to prevent hydration mismatch
  if (!mounted) {
    return <Projects componentData={componentData} />;
  }

  return (
    <>
      {showLanding && <Landing onComplete={handleLandingComplete} />}
      <Projects componentData={componentData} />
    </>
  );
}
