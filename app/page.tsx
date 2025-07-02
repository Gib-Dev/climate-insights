import Link from "next/link";
import ClimateChart from '../components/ClimateChart';
import { Map, CloudSun, LayoutDashboard, Github, LucideIcon, Database, BarChart3 } from "lucide-react";

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

// Canada SVG Map (minimal, inline)
const CanadaMap = () => (
  <svg viewBox="0 0 120 60" width={120} height={60} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.9 }} aria-label="Canada map">
    <path d="M10,40 Q30,10 60,20 Q90,30 110,10 Q100,40 60,50 Q20,60 10,40 Z" fill="#3282B8" stroke="#0F4C75" strokeWidth="2" />
    <circle cx="60" cy="30" r="3" fill="#0F4C75" />
  </svg>
);

// Animated SVG Waves
const AnimatedWaves = () => (
  <svg viewBox="0 0 1440 120" width="100%" height="120" style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 0 }} aria-hidden="true">
    <path fill="#3282B8" fillOpacity="0.18" d="M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z">
      <animate attributeName="d" dur="6s" repeatCount="indefinite"
        values="M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z;
                M0,60 C400,100 1040,20 1440,60 L1440,120 L0,120 Z;
                M0,80 C360,120 1080,0 1440,80 L1440,120 L0,120 Z" />
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
  return (
    <main style={{ width: '100%' }}>
      {/* Hero Section */}
      <section style={{ margin: '32px 0 24px 0', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #F8FAFC 80%, #E2E8F0 100%)', borderRadius: 18, minHeight: 320 }}>
        <div style={{ position: 'relative', zIndex: 1, padding: '32px 0 32px 0' }}>
          <CanadaMap />
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
        </div>
        <AnimatedWaves />
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

      {/* Built With Row */}
      <section style={{ margin: '32px 0 0 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 32, alignItems: 'center', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 32px' }}>
          {techStack.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 14, fontWeight: 600, gap: 4, transition: 'color 0.2s' }}>
              <Icon size={26} />
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
