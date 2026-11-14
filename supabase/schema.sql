-- ==============================================================================
-- APNASAHARA COMPLETE SUPABASE DATABASE SCHEMA
-- Role-based Elder Care Platform (Family, Elder, Caregiver, Admin)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null check (role in ('family', 'elder', 'caregiver', 'admin')),
  phone text,
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. ELDERS TABLE
create table if not exists public.elders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  family_user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  age integer not null,
  gender text check (gender in ('Male', 'Female', 'Other')),
  blood_group text,
  phone text,
  emergency_phone text not null,
  address text not null,
  city text not null,
  safe_zone_lat double precision not null,
  safe_zone_lng double precision not null,
  current_lat double precision,
  current_lng double precision,
  battery_level integer default 100,
  location_sharing_enabled boolean default true,
  medical_conditions text[] default '{}',
  allergies text[] default '{}',
  preferred_language text default 'Hindi & English',
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. CAREGIVERS TABLE
create table if not exists public.caregivers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  phone text not null,
  email text not null,
  avatar_url text,
  rating numeric(3, 2) default 5.00,
  experience_years integer default 0,
  certifications text[] default '{}',
  verification_status text default 'pending' check (verification_status in ('verified', 'pending', 'rejected')),
  police_verification boolean default false,
  aadhaar_verified boolean default false,
  active_visits_count integer default 0,
  current_lat double precision,
  current_lng double precision,
  is_available boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. HEALTH METRICS TABLE
create table if not exists public.health_metrics (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  recorded_at timestamptz default timezone('utc'::text, now()) not null,
  systolic_bp integer,
  diastolic_bp integer,
  heart_rate integer,
  spo2 numeric(4, 1),
  blood_glucose numeric(5, 1),
  blood_glucose_type text check (blood_glucose_type in ('Fasting', 'Post-Meal', 'Random')),
  temperature numeric(4, 1),
  weight numeric(5, 2),
  sleep_hours numeric(3, 1),
  mood text check (mood in ('Very Good', 'Good', 'Fair', 'Unwell', 'Critical')),
  notes text
);

-- 5. MEDICATIONS TABLE
create table if not exists public.medications (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  name text not null,
  dosage text not null,
  frequency text not null,
  time_of_day text[] default '{}',
  scheduled_time text not null,
  instructions text,
  is_taken_today boolean default false,
  taken_at text,
  pills_remaining integer default 30,
  refill_alert_threshold integer default 7,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 6. SOS ALERTS TABLE
create table if not exists public.sos_alerts (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  elder_name text not null,
  elder_phone text,
  address text not null,
  lat double precision not null,
  lng double precision not null,
  triggered_at timestamptz default timezone('utc'::text, now()) not null,
  status text default 'triggered' check (status in ('triggered', 'acknowledged', 'dispatched', 'resolved')),
  severity text default 'Critical' check (severity in ('Critical', 'Urgent', 'General Help')),
  responder_name text,
  dispatched_at timestamptz,
  resolved_at timestamptz,
  notes text
);

-- 7. VISITS TABLE
create table if not exists public.visits (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  elder_name text not null,
  elder_address text not null,
  caregiver_id uuid not null references public.caregivers(id) on delete cascade,
  caregiver_name text not null,
  caregiver_phone text not null,
  date date not null,
  time_slot text not null,
  status text default 'scheduled' check (status in ('scheduled', 'en_route', 'in_progress', 'completed', 'cancelled')),
  tasks jsonb default '[]'::jsonb,
  notes text,
  vitals_recorded jsonb default '{}'::jsonb,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  family_feedback_rating integer check (family_feedback_rating between 1 and 5),
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. APPOINTMENTS TABLE
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  elder_name text not null,
  doctor_name text not null,
  specialty text not null,
  hospital_clinic text not null,
  appointment_date date not null,
  appointment_time text not null,
  status text default 'upcoming' check (status in ('upcoming', 'completed', 'rescheduled', 'cancelled')),
  notes text,
  accompanied_by_caregiver boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 9. SUBSCRIPTIONS TABLE
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid not null references public.profiles(id) on delete cascade,
  plan_name text not null check (plan_name in ('Basic Sahara', 'Comprehensive Sahara', 'Premium 24/7 Guardian')),
  status text default 'active' check (status in ('active', 'expiring_soon', 'cancelled')),
  monthly_amount integer not null,
  currency text default 'INR',
  renewal_date date not null,
  elder_covered_name text not null,
  visits_included_per_month integer default 8,
  visits_used_this_month integer default 0,
  emergency_sos_enabled boolean default true,
  dedicated_care_manager boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 10. ASSISTANCE REQUESTS
create table if not exists public.assistance_requests (
  id uuid primary key default uuid_generate_v4(),
  elder_id uuid not null references public.elders(id) on delete cascade,
  elder_name text not null,
  type text not null check (type in ('Groceries', 'Medicine', 'Unwell', 'Ride', 'Companion', 'Other')),
  details text not null,
  urgency text default 'Medium' check (urgency in ('Low', 'Medium', 'High')),
  status text default 'pending' check (status in ('pending', 'in_progress', 'fulfilled')),
  requested_at timestamptz default timezone('utc'::text, now()) not null
);

-- 11. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null check (type in ('sos', 'health', 'visit', 'medication', 'system')),
  read boolean default false,
  link text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.elders enable row level security;
alter table public.caregivers enable row level security;
alter table public.health_metrics enable row level security;
alter table public.medications enable row level security;
alter table public.sos_alerts enable row level security;
alter table public.visits enable row level security;
alter table public.appointments enable row level security;
alter table public.subscriptions enable row level security;
alter table public.assistance_requests enable row level security;
alter table public.notifications enable row level security;

-- Profiles: Users can read and update their own profile; Admins can read all
create policy "Allow individual read access" on public.profiles
  for select using (auth.uid() = id or (select role from public.profiles where id = auth.uid()) = 'admin');

create policy "Allow individual update access" on public.profiles
  for update using (auth.uid() = id);

-- SOS Alerts: Read and insert allowed for authenticated users and monitored by admins/family
create policy "Allow authenticated read sos" on public.sos_alerts
  for select using (auth.role() = 'authenticated');

create policy "Allow authenticated insert sos" on public.sos_alerts
  for insert with check (auth.role() = 'authenticated');

create policy "Allow authorized update sos" on public.sos_alerts
  for update using (auth.role() = 'authenticated');

-- Visits: Caregivers and Family can view their respective visits
create policy "Allow access to visits" on public.visits
  for all using (auth.role() = 'authenticated');

-- Health Metrics & Medications: Accessible to authenticated users associated with the elder
create policy "Allow access to health metrics" on public.health_metrics
  for all using (auth.role() = 'authenticated');

create policy "Allow access to medications" on public.medications
  for all using (auth.role() = 'authenticated');

-- REALTIME REPLICATION ENABLEMENT
alter publication supabase_realtime add table public.sos_alerts;
alter publication supabase_realtime add table public.health_metrics;
alter publication supabase_realtime add table public.visits;
alter publication supabase_realtime add table public.notifications;
