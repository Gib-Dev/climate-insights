# Climate Insights

A professional full-stack Next.js application with PostgreSQL (Supabase), Prisma ORM, and modern best practices. Built for portfolio-quality code, scalability, and real-world features.

## Features
- Next.js 15 (App Router, TypeScript)
- Supabase PostgreSQL database
- Prisma ORM (type-safe, migrations)
- Full CRUD user management (API + UI)
- Zod validation and robust error handling
- Modern UI/UX with Radix Toast notifications
- Professional code structure and tooling (ESLint, Prettier, Husky)

## Screenshots
![User Management UI](./public/screenshot.png)

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
- Add, edit, and delete users from the UI
- All actions are reflected live and validated
- API endpoints: `/api/users` (GET, POST), `/api/users/[id]` (PATCH, DELETE)



## Tech Stack
- Next.js, React, TypeScript
- Prisma ORM
- Supabase PostgreSQL
- Zod, Radix UI

