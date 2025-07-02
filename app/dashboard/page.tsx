import AuthForm from '../../components/AuthForm';
import UserList from '../../components/UserList';

export default function DashboardPage() {
  return (
    <main>
      <section className="card" style={{ margin: '24px 0' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>Dashboard</h1>
        <AuthForm />
        <UserList />
      </section>
    </main>
  );
} 