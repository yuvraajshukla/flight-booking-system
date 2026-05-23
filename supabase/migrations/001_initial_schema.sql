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

insert into flights (
  flight_no,
  origin,
  destination,
  departs_at,
  arrives_at,
  aircraft_type,
  status,
  base_price
)
values
(
  'AI101',
  'Delhi',
  'Mumbai',
  '2026-05-25 08:00:00+00',
  '2026-05-25 10:00:00+00',
  'Airbus A320',
  'scheduled',
  4500
),
(
  '6E202',
  'Mumbai',
  'Bangalore',
  '2026-05-25 11:00:00+00',
  '2026-05-25 13:30:00+00',
  'Boeing 737',
  'scheduled',
  5200
),
(
  'UK303',
  'Delhi',
  'Bangalore',
  '2026-05-26 06:30:00+00',
  '2026-05-26 09:00:00+00',
  'Airbus A321',
  'scheduled',
  6100
),
(
  'AI404',
  'Mumbai',
  'Delhi',
  '2026-05-26 14:00:00+00',
  '2026-05-26 16:00:00+00',
  'Airbus A320',
  'scheduled',
  4800
);

select * from flights;

alter table flights enable row level security;

create policy "Allow public read access"
on flights
for select
using (true);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references auth.users(id),

  flight_id uuid references flights(id),

  seat_no text not null,

  created_at timestamptz default now()
);

alter table bookings enable row level security;

create policy "Allow authenticated insert"
on bookings
for insert
to authenticated
with check (true);

create policy "Allow authenticated read"
on bookings
for select
to authenticated
using (true);

alter table bookings
add column seat_no text;

ALTER TABLE bookings
ALTER COLUMN flight_id TYPE text;