import ProvinceList from '../../components/ProvinceList';

export default function ProvincesPage() {
  return (
    <main>
      <section className="card" style={{ margin: '24px 0' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>Provinces</h1>
        <ProvinceList />
      </section>
    </main>
  );
} 