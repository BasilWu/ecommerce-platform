import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const schema = z.object({
  quantity: z.number().int().min(1),
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

export async function PATCH(
  req: Request,
  context: { params: Promise<{ itemId: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { itemId } = await context.params;

  try {
    const json = await req.json();
    const body = schema.parse({
      quantity: Number(json.quantity),
    });

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!item || item.cart.userId !== userId) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    if (body.quantity > item.product.stock) {
      return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: body.quantity },
    });

    return NextResponse.json({ item: updatedItem });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ itemId: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { itemId } = await context.params;

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!item || item.cart.userId !== userId) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  return NextResponse.json({ message: 'Deleted' });
}
