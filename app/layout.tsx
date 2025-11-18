// app/layout.tsx
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Jurnale Ean',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
