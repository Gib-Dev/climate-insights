import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';

const weatherDataSchema = z.object({
  provinceId: z.number().int().optional(),
  date: z.string().datetime().optional(),
  temperature: z.number().optional(),
  precipitation: z.number().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    const weather = await prisma.weatherData.findUnique({ where: { id }, include: { province: true } });
    if (!weather) return NextResponse.json({ error: 'Weather data not found' }, { status: 404 });
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    const body = await req.json();
    const parsed = weatherDataSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
    }
    const weather = await prisma.weatherData.update({ where: { id }, data: parsed.data });
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update weather data', details: error?.toString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    await prisma.weatherData.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete weather data', details: error?.toString() }, { status: 500 });
  }
} 