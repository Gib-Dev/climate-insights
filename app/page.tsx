import Link from "next/link";
import ClimateChart from '../components/ClimateChart';
import { Map, CloudSun, LayoutDashboard } from "lucide-react";

// Vibrant climate palette
const COLORS = {
  arcticBg: '#E8F4FD',
  arcticBlue: '#006BA6',
  forestGreen: '#0F7B0F',
  forestLight: '#B8E0D2',
  coral: '#FF6B35',
  coralLight: '#F39C12',
  grayDark: '#2C3E50',
  gray: '#7F8C8D',
};

export default function Home() {
  return (
    <main style={{ width: '100%' }}>
      {/* Hero Section */}
      <section style={{ margin: '32px 0 24px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--primary)', marginBottom: 10 }}>
          Climate Insights
        </h1>
        <p style={{ fontSize: 20, color: 'var(--text)', margin: '0 auto 18px', maxWidth: 600 }}>
          Explore Canada's climate data with a modern, interactive dashboard.
        </p>
        <Link href="/provinces">
          <button style={{ background: 'var(--secondary)', color: '#fff', fontWeight: 700, fontSize: 18, padding: '12px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginTop: 8 }}>
            Get Started
          </button>
        </Link>
      </section>

      {/* Climate Chart Section */}
      <section className="card" style={{ margin: '32px 0' }}>
        <ClimateChart />
      </section>

      {/* Section Previews */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, margin: '32px 0' }}>
        {/* Provinces Preview */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
          <Map size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>Provinces</h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Manage Canadian provinces and their codes. Add, edit, or remove provinces as needed.
          </p>
          <Link href="/provinces">
            <button style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, fontSize: 16, padding: '8px 22px', borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              View Provinces
            </button>
          </Link>
        </div>
        {/* Weather Data Preview */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
          <CloudSun size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>Weather Data</h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Add and view temperature and precipitation records for each province.
          </p>
          <Link href="/weather">
            <button style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, fontSize: 16, padding: '8px 22px', borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              View Weather Data
            </button>
          </Link>
        </div>
        {/* Dashboard Preview */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
          <LayoutDashboard size={36} color="var(--primary)" style={{ marginBottom: 10 }} />
          <h3 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>Dashboard</h3>
          <p style={{ color: 'var(--text)', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
            Sign up or sign in to access admin features and manage your data securely.
          </p>
          <Link href="/dashboard">
            <button style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, fontSize: 16, padding: '8px 22px', borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
