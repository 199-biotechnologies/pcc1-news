# Complete Supabase Setup Guide

This guide provides step-by-step instructions for setting up all the Supabase features for PCC1.news.

## Prerequisites
- Access to your Supabase project dashboard
- Supabase CLI installed (optional for edge functions)
- Project already linked (if using CLI)

## Step 1: Create Newsletter Subscribers Table

1. **Go to SQL Editor** in your Supabase dashboard
2. **Create a new query**
3. **Copy and paste this SQL**:

```sql
-- Create newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  source text,
  tags text[],
  ip_address inet,
  user_agent text,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token text unique default substr(md5(random()::text), 1, 32),
  metadata jsonb default '{}',
  constraint valid_email check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes
create index idx_newsletter_email on public.newsletter_subscribers(email);
create index idx_newsletter_status on public.newsletter_subscribers(status);
create index idx_newsletter_subscribed_at on public.newsletter_subscribers(subscribed_at);
create index idx_newsletter_unsubscribe_token on public.newsletter_subscribers(unsubscribe_token);

-- Enable RLS
alter table public.newsletter_subscribers enable row level security;

-- Policies
create policy "Allow public newsletter signups" on public.newsletter_subscribers
  for insert with check (true);

create policy "Users can view own subscription" on public.newsletter_subscribers
  for select using (auth.jwt() ->> 'email' = email);

-- Subscribe function
create or replace function public.subscribe_newsletter(
  subscriber_email text,
  subscriber_source text default null,
  subscriber_metadata jsonb default '{}'
)
returns json
language plpgsql
security definer
as $$
declare
  existing_sub record;
  new_sub record;
begin
  select * into existing_sub
  from public.newsletter_subscribers
  where email = subscriber_email;
  
  if existing_sub.id is not null then
    if existing_sub.status = 'active' then
      return json_build_object(
        'success', true,
        'message', 'Already subscribed',
        'data', row_to_json(existing_sub)
      );
    else
      update public.newsletter_subscribers
      set 
        status = 'active',
        unsubscribed_at = null,
        subscribed_at = now(),
        source = coalesce(subscriber_source, source),
        metadata = metadata || subscriber_metadata
      where email = subscriber_email
      returning * into new_sub;
      
      return json_build_object(
        'success', true,
        'message', 'Subscription reactivated',
        'data', row_to_json(new_sub)
      );
    end if;
  else
    insert into public.newsletter_subscribers (email, source, metadata)
    values (subscriber_email, subscriber_source, subscriber_metadata)
    returning * into new_sub;
    
    return json_build_object(
      'success', true,
      'message', 'Successfully subscribed',
      'data', row_to_json(new_sub)
    );
  end if;
exception
  when others then
    return json_build_object(
      'success', false,
      'message', 'Subscription failed',
      'error', SQLERRM
    );
end;
$$;

-- Unsubscribe function
create or replace function public.unsubscribe_newsletter(token text)
returns json
language plpgsql
security definer
as $$
declare
  updated_sub record;
begin
  update public.newsletter_subscribers
  set 
    status = 'unsubscribed',
    unsubscribed_at = now()
  where unsubscribe_token = token
    and status = 'active'
  returning * into updated_sub;
  
  if updated_sub.id is not null then
    return json_build_object(
      'success', true,
      'message', 'Successfully unsubscribed'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'Invalid or expired token'
    );
  end if;
end;
$$;

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant execute on function public.subscribe_newsletter(text, text, jsonb) to anon, authenticated;
grant execute on function public.unsubscribe_newsletter(text) to anon, authenticated;

comment on table public.newsletter_subscribers is 'Stores email newsletter subscriptions';
```

4. **Click "Run"** to execute the SQL

## Step 2: Verify Waitlist Table (If Not Already Created)

Check if the waitlist table exists. If not, run this SQL:

```sql
-- Create waitlist table
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

-- Create indexes
create index idx_waitlist_product_id on public.waitlist(product_id);
create index idx_waitlist_created_at on public.waitlist(created_at);
create index idx_waitlist_email on public.waitlist(email);
create index idx_waitlist_referral_code on public.waitlist(referral_code);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Policies
create policy "Allow public inserts to waitlist" on public.waitlist
  for insert with check (true);

create policy "Users can view own waitlist entries" on public.waitlist
  for select using (auth.jwt() ->> 'email' = email);

-- Referral function
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

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant insert on public.waitlist to anon, authenticated;
grant select on public.waitlist to anon, authenticated;
grant execute on function public.handle_referral(text) to anon, authenticated;
```

## Step 3: Create Database Trigger for Waitlist Emails

1. **Navigate to Database → Function Hooks** in Supabase dashboard
2. **Click "Create a new function hook"**
3. **Configure as follows**:
   - **Name**: `trigger_waitlist_confirmation`
   - **Table**: `waitlist`
   - **Events**: Check only `INSERT`
   - **Type**: Select "Supabase Edge Function"
   - **Function**: `waitlist-confirmation`
   - **Method**: POST
   - **Headers**: Leave default
   - **Params**: Leave default
4. **Click "Create function hook"**

## Step 4: Verify Edge Function Deployment

The `waitlist-confirmation` edge function has already been deployed. You can verify it at:
https://supabase.com/dashboard/project/qsygtfdyzyplfhhrifbf/functions/waitlist-confirmation

## Step 5: Verify Required Secrets

Go to **Settings → Edge Functions** and verify these secrets exist:
- ✅ `HCAPTCHA_SECRET_KEY`
- ✅ `RESEND_API_KEY` 
- ✅ `CONTACT_EMAIL_SENDER` (used for waitlist emails too)

No new secrets needed!

## Step 6: Test Everything

### Test Newsletter Subscription
1. Go to https://pcc1.news
2. Scroll to bottom and enter an email
3. Check **Table Editor → newsletter_subscribers**

### Test Waitlist
1. Go to https://pcc1.news/shop
2. Click "Join Waitlist"
3. Fill out the form
4. Check **Table Editor → waitlist**
5. Verify email was sent (check inbox)

## Troubleshooting

### Edge Function Not Triggering
- Check Function Hooks configuration
- Verify the function name matches exactly
- Check edge function logs in dashboard

### Emails Not Sending
- Verify RESEND_API_KEY is correct
- Check CONTACT_EMAIL_SENDER is a verified domain in Resend
- View edge function logs for errors

### Newsletter Not Working
- Check browser console for errors
- Verify RLS policies are correct
- Check that the subscribe_newsletter function exists

## Quick Reference

### View Newsletter Subscribers
```sql
SELECT email, source, subscribed_at 
FROM newsletter_subscribers 
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

### View Waitlist Entries
```sql
SELECT email, product_id, created_at, position
FROM (
  SELECT *, ROW_NUMBER() OVER (ORDER BY created_at) as position
  FROM waitlist
  WHERE product_id = 'prod_SFtP7VXSpwhZcG'
) t
ORDER BY created_at DESC;
```

### Export Subscribers for Email Service
```sql
-- Simple export
SELECT email FROM newsletter_subscribers WHERE status = 'active';

-- Detailed export
SELECT 
  email,
  source,
  TO_CHAR(subscribed_at, 'YYYY-MM-DD') as signup_date
FROM newsletter_subscribers 
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

## Next Steps

1. **Choose an email marketing service** (see `/docs/newsletter-export-guide.md`)
2. **Set up regular exports** or API integration
3. **Create welcome email series**
4. **Monitor subscriber growth**

## Support

- Supabase Discord: https://discord.supabase.com
- Documentation: https://supabase.com/docs
- Status: https://status.supabase.com