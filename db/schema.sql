create extension if not exists "pgcrypto";

create table if not exists public.health_check (
  id boolean primary key default true,
  created_at timestamptz not null default now(),
  constraint health_check_single_row check (id = true)
);

insert into public.health_check (id)
values (true)
on conflict (id) do nothing;

create table if not exists public.locations (
  id text primary key,
  name text not null,
  city text not null,
  country text not null,
  address text not null,
  district text not null,
  phone text not null,
  email text not null,
  hours text not null,
  image text not null,
  suites_count integer not null default 0 check (suites_count >= 0),
  vip_lounge boolean not null default false,
  parking text not null,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.treatments (
  id text primary key,
  slug text not null unique,
  name text not null,
  subtitle text not null,
  tagline text not null,
  category text not null check (category in ('facial', 'skin', 'body', 'hair', 'aesthetic')),
  duration_minutes integer not null check (duration_minutes > 0),
  price numeric(12, 2) not null check (price >= 0),
  original_price numeric(12, 2),
  description text not null,
  long_description text not null,
  benefits jsonb not null default '[]'::jsonb,
  suitable_for jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  skin_concerns jsonb not null default '[]'::jsonb,
  skin_types jsonb not null default '[]'::jsonb,
  intensity text not null,
  downtime text not null,
  before_after jsonb not null default '{}'::jsonb,
  rating numeric(3, 2) not null default 0,
  review_count integer not null default 0,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  is_signature boolean not null default false,
  image text not null,
  gallery jsonb not null default '[]'::jsonb,
  recommended_homecare_ids jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  subtitle text not null,
  category text not null check (category in ('skincare', 'bodycare', 'haircare', 'aftercare', 'devices')),
  price numeric(12, 2) not null check (price >= 0),
  volume text not null,
  rating numeric(3, 2) not null default 0,
  review_count integer not null default 0,
  description text not null,
  key_ingredients jsonb not null default '[]'::jsonb,
  clinical_results jsonb not null default '[]'::jsonb,
  how_to_use text not null,
  texture text not null,
  image text not null,
  gallery jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  is_best_seller boolean not null default false,
  inventory_count integer not null default 0 check (inventory_count >= 0),
  linked_treatment_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experts (
  id text primary key,
  name text not null,
  title text not null,
  role text not null,
  credentials jsonb not null default '[]'::jsonb,
  experience_years integer not null default 0,
  bio text not null,
  quote text not null,
  rating numeric(3, 2) not null default 0,
  review_count integer not null default 0,
  avatar text not null,
  cover_image text,
  specializations jsonb not null default '[]'::jsonb,
  clinic_location_ids jsonb not null default '[]'::jsonb,
  available_days jsonb not null default '[]'::jsonb,
  schedule_slots jsonb not null default '[]'::jsonb,
  signature_treatment_id text references public.treatments(id),
  consultation_fee numeric(12, 2),
  created_at timestamptz not null default now()
);

create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customer_profiles(id) on delete set null,
  booking_code text not null unique,
  treatment_id text not null references public.treatments(id),
  location_id text not null references public.locations(id),
  expert_id text references public.experts(id),
  date date not null,
  time_slot text not null,
  customer_info jsonb not null default '{}'::jsonb,
  add_ons jsonb not null default '[]'::jsonb,
  payment_method text not null,
  payment_status text not null default 'pending',
  subtotal numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total_amount numeric(12, 2) not null default 0,
  points_earned integer not null default 0,
  points_used integer not null default 0,
  status text not null default 'confirmed',
  therapist_notes text,
  created_at timestamptz not null default now()
);

alter table public.health_check enable row level security;
alter table public.locations enable row level security;
alter table public.treatments enable row level security;
alter table public.products enable row level security;
alter table public.experts enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "health check is public" on public.health_check;
create policy "health check is public" on public.health_check for select to anon, authenticated using (true);

drop policy if exists "catalog is public" on public.locations;
create policy "catalog is public" on public.locations for select to anon, authenticated using (true);
drop policy if exists "treatments are public" on public.treatments;
create policy "treatments are public" on public.treatments for select to anon, authenticated using (true);
drop policy if exists "products are public" on public.products;
create policy "products are public" on public.products for select to anon, authenticated using (true);
drop policy if exists "experts are public" on public.experts;
create policy "experts are public" on public.experts for select to anon, authenticated using (true);

drop policy if exists "customers manage own profile" on public.customer_profiles;
create policy "customers manage own profile" on public.customer_profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "customers manage own bookings" on public.bookings;
create policy "customers manage own bookings" on public.bookings for all to authenticated using (auth.uid() = customer_id) with check (auth.uid() = customer_id);