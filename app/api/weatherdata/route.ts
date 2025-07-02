import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const weatherDataSchema = z.object({
  provinceId: z.number().int(),
  date: z.string().datetime(),
  temperature: z.number(),
  precipitation: z.number(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const provinceId = url.searchParams.get('provinceId');
    const where = provinceId ? { provinceId: Number(provinceId) } : {};
    const weather = await prisma.weatherData.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { province: true },
    });
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = weatherDataSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
    }
    const weather = await prisma.weatherData.create({ data: parsed.data });
    return NextResponse.json(weather, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create weather data', details: error?.toString() }, { status: 500 });
  }
} 