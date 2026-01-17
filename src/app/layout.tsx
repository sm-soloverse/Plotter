import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Plotter - Micro-IP Marketplace for Writers',
  description: 'Create, share, and discover micro intellectual property. Plan your lore, build characters, craft stories, and connect with other writers.',
  keywords: ['writing', 'stories', 'characters', 'worldbuilding', 'lore', 'fiction', 'creative writing', 'IP', 'marketplace'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
