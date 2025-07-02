import ProvinceList from '../components/ProvinceList';
import WeatherDataList from '../components/WeatherDataList';
import ClimateChart from '../components/ClimateChart';
import AuthForm from '../components/AuthForm';
import UserList from '../components/UserList';

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
      <section style={{ margin: '24px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Climate Insights</h1>
        <p style={{ fontSize: 18, color: 'var(--text)', margin: '0 auto', maxWidth: 600 }}>
          A clean, professional dashboard for Canadian meteorological data.<br />
          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Sign up or sign in to manage provinces and weather data.</span>
        </p>
      </section>

      {/* Chart Section */}
      <section className="card" style={{ margin: '24px 0' }}>
        <ClimateChart />
      </section>

      {/* Provinces Section */}
      <section className="card" style={{ margin: '24px 0' }}>
        <ProvinceList />
      </section>

      {/* Weather Data Section */}
      <section className="card" style={{ margin: '24px 0' }}>
        <WeatherDataList />
      </section>

      {/* Dashboard Section */}
      <section className="card" style={{ margin: '24px 0' }}>
        <AuthForm />
        <UserList />
      </section>
    </main>
  );
}
