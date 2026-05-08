import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user: TokenPayload | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      user = payload as unknown as TokenPayload;
    } catch {
      user = null;
    }
  }

  return (
    <nav style={{ borderBottom: '1px solid #222', padding: '16px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <Link href="/" style={{ fontWeight: 700 }}>Ecommerce Platform</Link>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {user ? (
            <>
              <span className="muted">{user.email}</span>
              <Link className="btn" href="/dashboard">Dashboard</Link>
              <form action="/api/auth/logout" method="post">
                <button className="btn" type="submit">登出</button>
              </form>
            </>
          ) : (
            <>
              <Link className="btn" href="/login">登入</Link>
              <Link className="btn" href="/register">註冊</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
