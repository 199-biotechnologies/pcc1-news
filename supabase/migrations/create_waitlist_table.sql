-- Create waitlist table for product notifications
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  phone text,
  product_id text not null,
  quantity_interested integer default 1 check (quantity_interested > 0 and quantity_interested <= 10),
  hcaptcha_token text not null,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  referred_by uuid references public.waitlist(id),
  priority_score integer default 0,
  created_at timestamptz default now(),
  notified_at timestamptz,
  converted_at timestamptz,
  constraint unique_email_product unique(email, product_id)
);

-- Create indexes for performance
create index idx_waitlist_product_id on public.waitlist(product_id);
create index idx_waitlist_created_at on public.waitlist(created_at);
create index idx_waitlist_email on public.waitlist(email);
create index idx_waitlist_referral_code on public.waitlist(referral_code);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Create policy to allow inserts from authenticated and anonymous users
create policy "Allow public inserts to waitlist" on public.waitlist
  for insert
  with check (true);

-- Create policy to allow users to view their own waitlist entries
create policy "Users can view own waitlist entries" on public.waitlist
  for select
  using (auth.jwt() ->> 'email' = email);

-- Create a function to increment referral priority when someone uses a referral code
create or replace function public.handle_referral(referral_code text)
returns void
language plpgsql
security definer
as $$
begin
  update public.waitlist
  set priority_score = priority_score + 10
  where referral_code = handle_referral.referral_code;
end;
$$;

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant insert on public.waitlist to anon, authenticated;
grant select on public.waitlist to anon, authenticated;
grant execute on function public.handle_referral(text) to anon, authenticated;