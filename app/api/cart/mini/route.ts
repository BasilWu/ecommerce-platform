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
    return NextResponse.json({
      count: 0,
      total: 0,
      items: [],
    });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const items =
    cart?.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      productId: item.product.id,
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      category: item.product.category,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    })) ?? [];

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return NextResponse.json({
    count,
    total,
    items,
  });
}
