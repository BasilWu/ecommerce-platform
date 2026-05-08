import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash,
        },
    });

    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
