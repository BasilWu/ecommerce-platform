import Link from 'next/link';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import LogoutButton from './LogoutButton';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

type TokenPayload = {
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
};

export default async function AuthStatus() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return <Link href="/login">登入</Link>;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = payload as TokenPayload;

    return (
      <>
        <Link href="/member">{user.name || user.email || '會員中心'}</Link>
        <Link href="/orders">訂單</Link>
        <LogoutButton />
      </>
    );
  } catch {
    return <Link href="/login">登入</Link>;
  }
}
