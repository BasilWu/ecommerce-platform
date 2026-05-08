import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 401 });
    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    const res = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
