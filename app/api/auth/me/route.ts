import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return NextResponse.json({ user: null });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
