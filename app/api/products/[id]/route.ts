import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getRole() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

const schema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().int().positive().optional(),
  stock: z.number().int().min(0).optional(),
  imageUrl: z.string().url().nullable().optional(),
  category: z.string().min(1).optional(),
  tag: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const role = await getRole();

  if (role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;

  try {
    const json = await req.json();

    const body = schema.parse({
      ...json,
      ...(json.price !== undefined ? { price: Number(json.price) } : {}),
      ...(json.stock !== undefined ? { stock: Number(json.stock) } : {}),
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...body,
        imageUrl: body.imageUrl ?? null,
        tag: body.tag ?? null,
      },
    });

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const role = await getRole();

  if (role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}
