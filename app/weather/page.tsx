import WeatherDataList from '../../components/WeatherDataList';

export default function WeatherPage() {
  return (
    <main>
      <section className="card" style={{ margin: '24px 0' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>Weather Data</h1>
        <WeatherDataList />
      </section>
    </main>
  );
} 