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
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().positive(),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().nullable().optional(),
  category: z.string().min(1),
  tag: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const q = searchParams.get('q');

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
      ...(tag ? { tag } : {}),
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const role = await getRole();

  if (role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const json = await req.json();

    const body = schema.parse({
      ...json,
      price: Number(json.price),
      stock: Number(json.stock),
    });

    const product = await prisma.product.create({
       data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        imageUrl: body.imageUrl ?? null,
        category: body.category,
        tag: body.tag ?? null,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
