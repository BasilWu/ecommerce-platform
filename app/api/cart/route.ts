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

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return NextResponse.json({ cart });
}

export async function POST(req: Request) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await req.json();
    const body = schema.parse({
      ...json,
      quantity: Number(json.quantity ?? 1),
    });

    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    if (product.stock < body.quantity) {
      return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
         data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: body.productId,
        },
      },
    });

    if (existingItem) {
      const newQty = existingItem.quantity + body.quantity;

      if (product.stock < newQty) {
        return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
      }

      const item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty },
      });

      return NextResponse.json({ item });
    }

    const item = await prisma.cartItem.create({
       data: {
        cartId: cart.id,
        productId: body.productId,
        quantity: body.quantity,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
