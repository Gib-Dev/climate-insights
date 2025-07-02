# Climate Insights

A professional, portfolio-ready full-stack Next.js application for Canadian climate data. Built with PostgreSQL (Supabase), Prisma ORM, and a modern, minimal blue-themed UI. Features real authentication, province and weather data management, beautiful data visualization, and an interactive Canada map.

## Features
- Next.js 15 (App Router, TypeScript)
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
- **Interactive Canada map** with province highlights and tooltips
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
- Explore the interactive Canada map with province highlights and tooltips
- Navigate between Home, Provinces, Weather, and Dashboard pages

## Tech Stack
<div align="center">

<a href="https://github.com/Gib-Dev/climate-insights" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; display: inline-flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; gap: 4px; transition: color 0.2s; margin: 0 16px;">
  <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" alt="GitHub" width="32" height="32" style="filter: invert(27%) sepia(99%) saturate(747%) hue-rotate(176deg) brightness(92%) contrast(92%);" />
  <br />GitHub
</a>
<a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; display: inline-flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; gap: 4px; transition: color 0.2s; margin: 0 16px;">
  <img src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" alt="Supabase" width="32" height="32" />
  <br />Supabase
</a>
<a href="https://recharts.org/" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; display: inline-flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; gap: 4px; transition: color 0.2s; margin: 0 16px;">
  <img src="https://recharts.org/en-US/favicon.ico" alt="Recharts" width="32" height="32" />
  <br />Recharts
</a>
<a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; display: inline-flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; gap: 4px; transition: color 0.2s; margin: 0 16px;">
  <img src="https://lucide.dev/favicon.ico" alt="Lucide" width="32" height="32" />
  <br />Lucide
</a>

</div>

