import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import LogoutButton from './logout-button';
import Link from 'next/link';

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/login');

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const user = payload as unknown as TokenPayload;

    return (
      <main className="container section" style={{ maxWidth: 1100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1>Dashboard</h1>
            <p className="muted">這裡是你的後台首頁，顯示登入狀態與快捷入口。</p>
          </div>
          <LogoutButton />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
          <Card title="User ID" value={user.userId} />
          <Card title="Email" value={user.email} />
          <Card title="Role" value={user.role} />
        </div>

        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          <h2 style={{ marginTop: 0 }}>快速導覽</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link className="btn" href="/dashboard/profile">Profile</Link>
            <Link className="btn" href="/dashboard/orders">Orders</Link>
            <Link className="btn" href="/dashboard/settings">Settings</Link>
          </div>
        </div>
      </main>
    );
  } catch {
    redirect('/login');
  }
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <p className="muted" style={{ marginBottom: 8 }}>{title}</p>
      <strong style={{ wordBreak: 'break-all' }}>{value}</strong>
    </div>
  );
}
