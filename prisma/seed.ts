import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const data = [
  { name: 'Ontario', code: 'ON', date: '2025-07-02', temperature: 25.0, precipitation: 0 },
  { name: 'Quebec', code: 'QC', date: '2025-07-02', temperature: 20.0, precipitation: 0 },
  { name: 'British Columbia', code: 'BC', date: '2025-07-02', temperature: 24.0, precipitation: 0 },
  { name: 'Alberta', code: 'AB', date: '2025-07-02', temperature: 27.0, precipitation: 0 },
  { name: 'Manitoba', code: 'MB', date: '2025-07-02', temperature: 27.0, precipitation: 0 },
  { name: 'Saskatchewan', code: 'SK', date: '2025-07-02', temperature: 27.0, precipitation: 0 },
  { name: 'Nova Scotia', code: 'NS', date: '2025-07-02', temperature: 18.0, precipitation: 0 },
  { name: 'New Brunswick', code: 'NB', date: '2025-07-02', temperature: 19.0, precipitation: 0 },
  { name: 'Newfoundland and Labrador', code: 'NL', date: '2025-07-02', temperature: 16.0, precipitation: 0 },
  { name: 'Prince Edward Island', code: 'PE', date: '2025-07-02', temperature: 21.0, precipitation: 0 },
  { name: 'Yukon', code: 'YT', date: '2025-07-02', temperature: 18.0, precipitation: 0 },
  { name: 'Northwest Territories', code: 'NT', date: '2025-07-02', temperature: 20.0, precipitation: 0 },
  { name: 'Nunavut', code: 'NU', date: '2025-07-02', temperature: 9.0, precipitation: 0 },
];

async function main() {
  for (const entry of data) {
    // Upsert province
    const province = await prisma.province.upsert({
      where: { code: entry.code },
      update: { name: entry.name },
      create: { name: entry.name, code: entry.code },
    });
    // Add weather data
    await prisma.weatherData.create({
      data: {
        provinceId: province.id,
        date: new Date(entry.date),
        temperature: entry.temperature,
        precipitation: entry.precipitation ?? 0,
      },
    });
  }
  console.log('Seed complete!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
}); 