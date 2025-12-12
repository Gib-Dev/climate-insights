import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAuthenticatedClient } from '../../../../lib/auth';
import { z } from 'zod';

const provinceSchema = z.object({
  name: z.string().min(2),
  code: z
    .string()
    .trim()
    .length(2)
    .transform((val) => val.toUpperCase()),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const provinceId = Number(id);
    if (isNaN(provinceId)) {
      return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    }
    const province = await prisma.province.findUnique({ where: { id: provinceId } });
    if (!province) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }
    return NextResponse.json(province);
  } catch (error) {
    console.error('Failed to fetch province:', error);
    return NextResponse.json({ error: 'Failed to fetch province' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthenticatedClient(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const provinceId = Number(id);
    if (isNaN(provinceId)) {
      return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    }

    const body = await request.json();
    const parse = provinceSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parse.error.errors },
        { status: 400 },
      );
    }

    const existing = await prisma.province.findUnique({ where: { id: provinceId } });
    if (!existing) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }

    const updated = await prisma.province.update({
      where: { id: provinceId },
      data: parse.data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update province:', error);
    return NextResponse.json({ error: 'Failed to update province' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await getAuthenticatedClient(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const provinceId = Number(id);
    if (isNaN(provinceId)) {
      return NextResponse.json({ error: 'Invalid province ID' }, { status: 400 });
    }

    const existing = await prisma.province.findUnique({ where: { id: provinceId } });
    if (!existing) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }

    await prisma.province.delete({ where: { id: provinceId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete province:', error);
    if (error instanceof Error && error.message.includes('Foreign key constraint')) {
      return NextResponse.json(
        { error: 'Cannot delete province with associated weather data' },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: 'Failed to delete province' }, { status: 500 });
  }
}
