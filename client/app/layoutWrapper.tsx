'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar/navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || 
                     pathname === '/signup' || 
                     pathname.startsWith('/review/') ||
                     pathname.startsWith('/about') ||
                     pathname.startsWith('/contact');

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
