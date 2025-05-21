'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Toaster } from '@/components/ui/sonner';

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (!user) {
        // Si no hay usuario logueado, redirijo a la landing
        router.replace('/');
      } else {
        // Si ya está validado, dejo renderizar
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Inyecto el Toaster aquí para todas las rutas protegidas */}
      <Toaster />
      {children}
    </>
  );
}
