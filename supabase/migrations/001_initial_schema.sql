create extension if not exists "pgcrypto";
create table flights (
  id uuid primary key default gen_random_uuid(),
  flight_no text not null,
  origin text not null,
  destination text not null,
  departs_at timestamptz not null,
  arrives_at timestamptz not null,
  aircraft_type text,
  status text default 'scheduled',
  base_price numeric not null
);

create table seats (
  id uuid primary key default gen_random_uuid(),
  flight_id uuid references flights(id) on delete cascade,
  seat_number text not null,
  class text not null,
  is_available boolean default true,
  extra_fee numeric default 0
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  flight_id uuid references flights(id),
  seat_id uuid references seats(id),
  status text default 'confirmed',
  booked_at timestamptz default now(),
  total_price numeric,
  pnr_code text unique
);

create table passengers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  full_name text,
  passport_no text,
  nationality text,
  dob date
);

create table reschedules (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id),
  old_flight_id uuid references flights(id),
  new_flight_id uuid references flights(id),
  requested_at timestamptz default now(),
  fee_charged numeric default 0
);