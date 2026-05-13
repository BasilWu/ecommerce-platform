import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const schema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
});

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

export async function POST(req: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: '請先登入' }, { status: 401 });
    }

    const body = await req.json();
    const data = schema.parse(body);

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json({ message: '商品不存在' }, { status: 404 });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: data.productId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + data.quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: data.productId,
          quantity: data.quantity,
        },
      });
    }

    return NextResponse.json({ message: '已加入購物車' });
  } catch {
    return NextResponse.json({ message: '加入購物車失敗' }, { status: 400 });
  }
}
