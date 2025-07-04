'use client';
import Link from 'next/link';
import ClimateChart from '../components/ClimateChart';
import CanadaMap from '../components/CanadaMap';
import {
  Map,
  CloudSun,
  LayoutDashboard,
  Github,
  Database,
  BarChart3,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Animated SVG Waves
const AnimatedWaves = () => (
  <svg
    viewBox="0 0 1440 120"
    width="100%"
    height="120"
    style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 0 }}
    aria-hidden="true"
  >
    <path fill="#3282B8" fillOpacity="0.18" d="M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z">
      <animate
        attributeName="d"
        dur="6s"
        repeatCount="indefinite"
        values="M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z;
                M0,60 C400,100 1040,20 1440,60 L1440,120 L0,120 Z;
                M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
      />
    </path>
  </svg>
);

const techStack = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Gib-Dev/climate-insights' },
  { icon: Database, label: 'Supabase', href: 'https://supabase.com/' },
  { icon: BarChart3, label: 'Recharts', href: 'https://recharts.org/' },
  { icon: Map, label: 'Lucide', href: 'https://lucide.dev/' },
];

export default function Home() {
  const [provinceData, setProvinceData] = useState<{ code: string; avgTemp: number }[]>([]);

  useEffect(() => {
    // Fetch weather data and group by province for avgTemp
    fetch('/api/weatherdata')
      .then((res) => res.json())
      .then((weather) => {
        const grouped: Record<string, { code: string; temps: number[] }> = {};
        for (const entry of weather) {
          const code = entry.province?.code || '?';
          if (!grouped[code]) grouped[code] = { code, temps: [] };
          grouped[code].temps.push(entry.temperature);
        }
        setProvinceData(
          Object.values(grouped).map((g) => ({
            code: g.code,
            avgTemp: g.temps.length ? g.temps.reduce((a, b) => a + b, 0) / g.temps.length : 0,
          })),
        );
      });
  }, []);

  return (
    <main style={{ width: '100%' }}>
      {/* Hero Section */}
      <section
        style={{
          margin: '32px 0 24px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #F8FAFC 80%, #E2E8F0 100%)',
          borderRadius: 18,
          minHeight: 320,
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, padding: '32px 0 32px 0' }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--primary)', marginBottom: 10 }}>
            Climate Insights
          </h1>
          <p style={{ fontSize: 20, color: 'var(--text)', margin: '0 auto 18px', maxWidth: 600 }}>
            Explore Canada&apos;s climate data with a modern, interactive dashboard.
          </p>
          <Link href="/provinces">
            <button
              style={{
                background: 'var(--secondary)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                padding: '12px 32px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                marginTop: 8,
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
        <AnimatedWaves />
      </section>

      {/* Interactive Canada Map Section */}
      <section className="card" style={{ margin: '32px 0', textAlign: 'center' }}>
        <h2
          style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '0 0 16px 0' }}
        >
          Canada Map (Interactive)
        </h2>
        <CanadaMap provinceData={provinceData} />
      </section>

      {/* Climate Chart Section */}
      <section className="card" style={{ margin: '32px 0' }}>
        <ClimateChart />
      </section>

      {/* Section Previews */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
          margin: '32px 0',
        }}
      >
        {/* Provinces Preview */}
        <div
          className="card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}
        >
          <Map size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>
            Provinces
          </h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Manage Canadian provinces and their codes. Add, edit, or remove provinces as needed.
          </p>
          <Link href="/provinces">
            <button
              style={{
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                padding: '8px 22px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              View Provinces
            </button>
          </Link>
        </div>
        {/* Weather Data Preview */}
        <div
          className="card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}
        >
          <CloudSun size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>
            Weather Data
          </h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Add and view temperature and precipitation records for each province.
          </p>
          <Link href="/weather">
            <button
              style={{
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                padding: '8px 22px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              View Weather Data
            </button>
          </Link>
        </div>
        {/* Dashboard Preview */}
        <div
          className="card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}
        >
          <LayoutDashboard size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>
            Dashboard
          </h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Sign up or sign in to access admin features and manage your data securely.
          </p>
          <Link href="/dashboard">
            <button
              style={{
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                padding: '8px 22px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Go to Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* Built With Row */}
      <section style={{ margin: '32px 0 0 0', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            gap: 32,
            alignItems: 'center',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '12px 32px',
          }}
        >
          {techStack.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--primary)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 600,
                gap: 4,
                transition: 'color 0.2s',
              }}
            >
              <Icon size={26} />
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
