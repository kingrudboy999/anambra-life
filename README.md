# Anambra Social App

A premium social media app UI for React Native + Expo, built with Supabase-ready architecture.

## Tech stack
- React Native + Expo
- TypeScript
- Supabase Auth
- Supabase Database
- Supabase Storage

## Project setup

1. Install dependencies:
   npm install

2. Create a `.env` file from the example:
   cp .env.example .env

3. Add your Supabase values:
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

4. Run the app:
   npm start

## Supabase schema (recommended)

Create these tables in Supabase:

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  content text,
  image_url text,
  created_at timestamptz default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text,
  created_at timestamptz default now()
);

create table likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

create table follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references auth.users(id) on delete cascade,
  following_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete cascade,
  content text,
  created_at timestamptz default now()
);
```

## Notes
This repo currently includes the premium Anambra social UI and includes Supabase-ready auth hooks and configuration. The app is ready for backend connection once your Supabase project is configured.
