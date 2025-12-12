import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAuthenticatedClient } from '../../../../lib/auth';
import { z } from 'zod';

const weatherDataSchema = z.object({
  provinceId: z.number().int().positive(),
  date: z.string().datetime(),
  temperature: z.number().min(-50).max(50),
  precipitation: z.number().min(0),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const weatherId = Number(id);
    if (isNaN(weatherId)) {
      return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    }
    const weather = await prisma.weatherData.findUnique({
      where: { id: weatherId },
      include: { province: true },
    });
    if (!weather) {
      return NextResponse.json({ error: 'Weather data not found' }, { status: 404 });
    }
    return NextResponse.json(weather);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthenticatedClient(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const weatherId = Number(id);
    if (isNaN(weatherId)) {
      return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    }

    const body = await request.json();
    const parse = weatherDataSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parse.error.errors },
        { status: 400 },
      );
    }

    const existing = await prisma.weatherData.findUnique({ where: { id: weatherId } });
    if (!existing) {
      return NextResponse.json({ error: 'Weather data not found' }, { status: 404 });
    }

    const province = await prisma.province.findUnique({
      where: { id: parse.data.provinceId },
    });
    if (!province) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }

    const updated = await prisma.weatherData.update({
      where: { id: weatherId },
      data: {
        ...parse.data,
        date: new Date(parse.data.date),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update weather data:', error);
    return NextResponse.json({ error: 'Failed to update weather data' }, { status: 500 });
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
    const weatherId = Number(id);
    if (isNaN(weatherId)) {
      return NextResponse.json({ error: 'Invalid weather data ID' }, { status: 400 });
    }

    const existing = await prisma.weatherData.findUnique({ where: { id: weatherId } });
    if (!existing) {
      return NextResponse.json({ error: 'Weather data not found' }, { status: 404 });
    }

    await prisma.weatherData.delete({ where: { id: weatherId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete weather data:', error);
    return NextResponse.json({ error: 'Failed to delete weather data' }, { status: 500 });
  }
}
