import WeatherDataList from '../../components/WeatherDataList';
import { CloudSun } from 'lucide-react';

export default function WeatherPage() {
  return (
    <main>
      <section
        className="card"
        style={{
          margin: '24px 0',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <CloudSun size={28} color="var(--primary)" />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
            Weather Data
          </h1>
        </div>
        <WeatherDataList />
      </section>
    </main>
  );
}
