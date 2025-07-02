import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';

const weatherDataSchema = z.object({
  provinceId: z.number(),
  date: z.string(),
  temperature: z.number(),
  precipitation: z.number(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const weather = await prisma.weatherData.findUnique({
    where: { id: Number(id) },
    include: { province: true },
  });
  if (!weather) {
    return NextResponse.json({ error: 'Weather data not found' }, { status: 404 });
  }
  return NextResponse.json(weather);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parse = weatherDataSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  const updated = await prisma.weatherData.update({
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
  await prisma.weatherData.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
