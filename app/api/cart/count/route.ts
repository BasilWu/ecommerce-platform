import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserId() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ count: 0 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  const count =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return NextResponse.json({ count });
}
