import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Climate Insights',
  description: 'Professional full-stack Next.js + Supabase + Prisma app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
