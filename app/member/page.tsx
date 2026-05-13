import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';

async function getUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; name: string; email: string; role: string };
  } catch {
    return null;
  }
}

export default async function MemberPage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <main className="container section" style={{ maxWidth: 720 }}>
      <h1 style={{ marginBottom: 4 }}>會員中心</h1>
      <p className="muted" style={{ marginBottom: 32 }}>歡迎回來，{user.name}！</p>

      <div style={{ display: 'grid', gap: 16 }}>
        {/* 帳號資訊 */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>帳號資訊</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <Row label="姓名" value={user.name} />
            <Row label="Email" value={user.email} />
            <Row label="身份" value={user.role === 'ADMIN' ? '管理員' : '一般會員'} />
          </div>
        </div>

        {/* 我的訂單（佔位） */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 16 }}>我的訂單</h2>
          <p className="muted" style={{ margin: 0 }}>尚無訂單紀錄。</p>
        </div>

        {/* 管理員入口 */}
        {user.role === 'ADMIN' && (
          <div className="card" style={{ padding: 24, borderColor: '#ec4899' }}>
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 16, color: '#ec4899' }}>管理員工具</h2>
            <p className="muted" style={{ marginBottom: 16 }}>進入後台管理商品、訂單與會員。</p>
            <Link className="btn" href="/admin" style={{ background: '#ec4899', color: '#fff' }}>
              進入後台
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span className="muted" style={{ width: 60, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#111' }}>{value}</span>
    </div>
  );
}
