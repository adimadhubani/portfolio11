// src/components/toaster.tsx
'use client';

import { Toaster } from 'sonner';

export function ToasterProvider() {
  return <Toaster position="top-center" richColors expand visibleToasts={3} />;
}