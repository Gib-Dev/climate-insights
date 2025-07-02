import AuthForm from '../../components/AuthForm';
import UserList from '../../components/UserList';
import { User, LogIn, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
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
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <ShieldCheck size={32} color="var(--primary)" />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
            Dashboard
          </h1>
        </div>
        <p
          style={{
            color: 'var(--primary)',
            fontWeight: 600,
            marginBottom: 8,
            textAlign: 'center',
            maxWidth: 500,
          }}
        >
          <LogIn size={20} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Please log in or sign up to manage provinces and weather data. Only authenticated users
          can add, edit, or delete data.
        </p>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <AuthForm />
        </div>
        <div style={{ width: '100%', maxWidth: 500, marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <User size={20} color="var(--primary)" />
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 18 }}>
              User List
            </span>
          </div>
          <UserList />
        </div>
      </section>
    </main>
  );
}
