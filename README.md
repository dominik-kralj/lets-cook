# Let's Cook - Recipe Management System

A full-stack application for organizing, collecting, and discovering your favorite recipes.

## Tech Stack

**Frontend**: Next.js 16, React 19, TypeScript, Chakra UI v3
**Backend**: Next.js API Routes, Prisma ORM, Supabase Auth
**Database**: PostgreSQL
**Storage**: Supabase Storage
**Forms**: React Hook Form with Zod validation
**Data Fetching**: SWR

## Features

- **Recipe Management**: Create, edit, and delete recipes with images, ingredients, and cooking instructions
- **Collections**: Organize recipes into custom collections
- **Favorites**: Mark and quickly access your favorite recipes
- **Search**: Find recipes by title with real-time search
- **Authentication**: Secure user authentication with Supabase
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Setup

**Install dependencies:**
```bash
npm install
```

**Configure database:**

Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lets_cook"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

Setup database:
```bash
npx prisma generate
npx prisma db push
```

**Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

