import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';

async function getUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as { name: string; email: string; role: string };
  } catch {
    return null;
  }
}

const adminMenus = [
  { title: '商品管理', desc: '新增、編輯、上下架商品', href: '/admin/products', color: '#ec4899' },
  { title: '訂單管理', desc: '查看與處理所有訂單', href: '/admin/orders', color: '#f59e0b' },
  { title: '會員管理', desc: '查看會員列表與資料', href: '/admin/users', color: '#10b981' },
];

export default async function AdminPage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <main className="container section" style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 4 }}>後台管理</h1>
        <p className="muted">登入身份：{user.name}（{user.email}）</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {adminMenus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: 18,
              padding: 24,
              textDecoration: 'none',
              color: '#111',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: item.color,
                marginBottom: 16,
              }}
            />
            <strong style={{ display: 'block', marginBottom: 6 }}>{item.title}</strong>
            <span style={{ fontSize: 13, color: '#666' }}>{item.desc}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link href="/member" style={{ color: '#ec4899', fontSize: 14 }}>
          ← 回會員中心
        </Link>
      </div>
    </main>
  );
}
