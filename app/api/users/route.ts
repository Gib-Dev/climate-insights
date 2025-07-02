import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 },
      );
    }
    try {
      const user = await prisma.user.create({ data: parsed.data });
      return NextResponse.json(user, { status: 201 });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('P2002') && error.message.includes('email')) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error?.toString() },
      { status: 500 },
    );
  }
}
