import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const provinceSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2).max(3),
});

export async function GET() {
  try {
    const provinces = await prisma.province.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(provinces);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch provinces' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = provinceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
    }
    try {
      const province = await prisma.province.create({ data: parsed.data });
      return NextResponse.json(province, { status: 201 });
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('code')) {
        return NextResponse.json({ error: 'Province code already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create province', details: error?.toString() }, { status: 500 });
  }
} 