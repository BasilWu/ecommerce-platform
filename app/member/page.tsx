import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import LogoutButton from './logout-button';

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export default async function MemberPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const user = payload as unknown as TokenPayload;

    return (
      <main className="container section" style={{ maxWidth: 760 }}>
        <h1>會員中心</h1>
        <p className="muted">你已成功登入，這裡可以放訂單、地址與個人資料。</p>

        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          <p>User ID: {user.userId}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <div style={{ marginTop: 20 }}>
            <LogoutButton />
          </div>
        </div>
      </main>
    );
  } catch {
    redirect('/login');
  }
}
