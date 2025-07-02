import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Climate Insights',
  description: 'Professional full-stack Next.js + Supabase + Prisma app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--background)', color: 'var(--text)', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', margin: 0 }}>
        <NavBar />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
