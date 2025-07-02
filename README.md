# Climate Insights

A professional, portfolio-ready full-stack Next.js application for Canadian climate data. Built with PostgreSQL (Supabase), Prisma ORM, and a modern, minimal blue-themed UI. Features real authentication, province and weather data management, and beautiful data visualization.

## Features
- Next.js 15 (TypeScript)
- Supabase PostgreSQL database
- Prisma ORM (type-safe, migrations)
- Authentication (Supabase Auth)
- Full CRUD for Provinces and Weather Data (API + UI)
- Dedicated pages: Home, Provinces, Weather, Dashboard
- Modern, minimal blue color system
- Lucide React icons for navigation and actions
- Professional NavBar and Footer
- Responsive, accessible, and clean design
- Data visualization with Recharts
- Robust error handling and Zod validation
- Professional code structure and tooling (ESLint, Prettier, Husky)

## Screenshots
![Dashboard UI](./public/screenshot.png)

## Getting Started

### 1. Clone & Install
```sh
git clone https://github.com/your-username/climate-insights.git
cd climate-insights
pnpm install
```

### 2. Configure Environment
Create a `.env` file in the root:
```
DATABASE_URL=your_supabase_connection_string
DIRECT_URL=your_supabase_direct_connection
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Prisma Setup
```sh
pnpx prisma generate
pnpx prisma migrate dev --name init
```

### 4. Run the App
```sh
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000)

## Usage
- Sign up or sign in to manage provinces and weather data
- Add, edit, and delete provinces and weather records (only when authenticated)
- View average temperature by province in a professional Recharts visualization
- Navigate between Home, Provinces, Weather, and Dashboard pages

## Tech Stack
- Next.js, React, TypeScript
- Prisma ORM
- Supabase PostgreSQL & Auth
- Lucide React (icons)
- Recharts (data visualization)
- Zod (validation)
- ESLint, Prettier, Husky

