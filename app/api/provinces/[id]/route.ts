import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const provinceSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2).max(3),
});

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    const province = await prisma.province.findUnique({ where: { id } });
    if (!province) return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    return NextResponse.json(province);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch province' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    const body = await req.json();
    const parsed = provinceSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
    }
    try {
      const province = await prisma.province.update({ where: { id }, data: parsed.data });
      return NextResponse.json(province);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('code')) {
        return NextResponse.json({ error: 'Province code already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update province', details: error?.toString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    await prisma.province.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete province', details: error?.toString() }, { status: 500 });
  }
} 