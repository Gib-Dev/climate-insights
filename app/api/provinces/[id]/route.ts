import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';

const provinceSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2).max(2),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const province = await prisma.province.findUnique({ where: { id: Number(id) } });
  if (!province) {
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });
  }
  return NextResponse.json(province);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parse = provinceSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  const updated = await prisma.province.update({
    where: { id: Number(id) },
    data: parse.data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.province.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
