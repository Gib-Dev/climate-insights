import ProvinceList from '../../components/ProvinceList';
import { Map } from 'lucide-react';

export default function ProvincesPage() {
  return (
    <main>
      <section className="card" style={{ margin: '24px 0', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Map size={28} color="var(--primary)" />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Provinces</h1>
        </div>
        <ProvinceList />
      </section>
    </main>
  );
} 