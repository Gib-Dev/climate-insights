import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthenticatedClient } from '../../../lib/auth';
import { z } from 'zod';

const provinceSchema = z.object({
  name: z.string().min(2),
  code: z
    .string()
    .trim()
    .length(2)
    .transform((val) => val.toUpperCase()),
});

export async function GET() {
  try {
    const provinces = await prisma.province.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(provinces);
  } catch (error) {
    console.error('Failed to fetch provinces:', error);
    return NextResponse.json({ error: 'Failed to fetch provinces' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthenticatedClient(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = provinceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 },
      );
    }
    try {
      const province = await prisma.province.create({ data: parsed.data });
      return NextResponse.json(province, { status: 201 });
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes('P2002') &&
        error.message.includes('code')
      ) {
        return NextResponse.json({ error: 'Province code already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Failed to create province:', error);
    return NextResponse.json(
      { error: 'Failed to create province', details: error?.toString() },
      { status: 500 },
    );
  }
}
