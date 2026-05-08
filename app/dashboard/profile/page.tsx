import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/login');

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const user = payload as unknown as TokenPayload;

    return (
      <main className="container section" style={{ maxWidth: 760 }}>
        <h1>Profile</h1>
        <p className="muted">這裡顯示你的會員資料。</p>

        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </main>
    );
  } catch {
    redirect('/login');
  }
}
