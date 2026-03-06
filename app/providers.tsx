'use client';

import { HelmetProvider } from 'react-helmet-async';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  );
}
