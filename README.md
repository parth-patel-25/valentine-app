# Valentine's Proposal App 💝

A playful, interactive, and romantic web application designed to ask a special someone to be your Valentine. Built with Next.js and Supabase.

![Valentine App Preview](public/preview.png)

## ✨ Features

- **Interactive "No" Button**: The button playfully runs away when the cursor gets too close (within 200px), making it impossible to click "No".
- **"Yes" Button Logic**:
    - updates the database (Supabase) to record the acceptance.
    - Shows a loading spinner during the API call.
    - Redirects to a celebration page.
- **Device Restrictions**:
    - **Mobile**: Shows a humorous angry red screen ("Why did you open this in mobile? 📱😠").
    - **Tablet**: Shows a disappointed yellow screen ("Why did you open this in tablet? 📟😒").
    - **Desktop/Laptop**: Displays the full interactive experience.
- **Success Page**: A dedicated `/accepted` page with a romantic message and specific date details (Place, Time, Dinner).

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Language**: TypeScript

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/valentine-app.git
cd valentine-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> **Note**: The `SUPABASE_SERVICE_ROLE_KEY` is required for the `/api/update-love` route to perform authorized database updates using `supabase-admin`.

### 4. Database Schema

Run the following SQL in your Supabase SQL Editor to sets up the table:

```sql
create table public.valentine_love (
  id bigint primary key generated always as identity,
  clicked_yes boolean not null default false,
  click_count integer not null default 0,
  created_at timestamp with time zone not null default now(),
  modified_at timestamp with time zone not null default now()
);

-- Initial row (optional, app handles insertion)
insert into public.valentine_love (clicked_yes) values (false);

-- Enable RLS
alter table public.valentine_love enable row level security;

-- Policies
create policy "Allow public select" on public.valentine_love for select using (true);
create policy "Allow public update" on public.valentine_love for update using (true);
create policy "Allow public insert" on public.valentine_love for insert with check (true);
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/page.tsx`: Main entry point. Handles device detection and renders the card.
- `app/components/ValentineCard.tsx`: The main interactive card component.
- `app/accepted/page.tsx`: The success page shown after clicking "Yes".
- `app/api/update-love/route.ts`: API route for secure database updates.
- `lib/supabase-admin.ts`: Supabase admin client configuration.

---

Made with ❤️ by [Parth Patel]
