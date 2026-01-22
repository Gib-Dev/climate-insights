import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthenticatedClient } from '../../../lib/auth';
import { z } from 'zod';

const weatherDataSchema = z.object({
  provinceId: z.number().int().positive(),
  date: z.string().datetime(),
  temperature: z.number().min(-50).max(50),
  precipitation: z.number().min(0),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const provinceId = url.searchParams.get('provinceId');
    const take = Math.min(Number(url.searchParams.get('limit')) || 100, 100);
    const skip = Number(url.searchParams.get('offset')) || 0;

    const where = provinceId ? { provinceId: Number(provinceId) } : {};
    const weather = await prisma.weatherData.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { province: true },
      take,
      skip,
    });
    return NextResponse.json(weather);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthenticatedClient(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = weatherDataSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 },
      );
    }

    const date = new Date(parsed.data.date);
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
    }

    const province = await prisma.province.findUnique({
      where: { id: parsed.data.provinceId },
    });
    if (!province) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }

    const weather = await prisma.weatherData.create({
      data: {
        ...parsed.data,
        date,
      },
    });
    return NextResponse.json(weather, { status: 201 });
  } catch (error) {
    console.error('Failed to create weather data:', error);
    return NextResponse.json(
      { error: 'Failed to create weather data', details: error?.toString() },
      { status: 500 },
    );
  }
}
