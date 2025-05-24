-- Create newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  source text, -- which page they subscribed from
  tags text[], -- for future segmentation
  ip_address inet, -- for compliance/spam prevention
  user_agent text, -- browser info
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token text unique default substr(md5(random()::text), 1, 32),
  metadata jsonb default '{}', -- flexible field for future data
  constraint valid_email check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for performance
create index idx_newsletter_email on public.newsletter_subscribers(email);
create index idx_newsletter_status on public.newsletter_subscribers(status);
create index idx_newsletter_subscribed_at on public.newsletter_subscribers(subscribed_at);
create index idx_newsletter_unsubscribe_token on public.newsletter_subscribers(unsubscribe_token);

-- Enable Row Level Security
alter table public.newsletter_subscribers enable row level security;

-- Allow public to insert (subscribe)
create policy "Allow public newsletter signups" on public.newsletter_subscribers
  for insert
  with check (true);

-- Allow users to view their own subscription
create policy "Users can view own subscription" on public.newsletter_subscribers
  for select
  using (auth.jwt() ->> 'email' = email);

-- Function to safely subscribe (handles duplicates)
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
  -- Check if already subscribed
  select * into existing_sub
  from public.newsletter_subscribers
  where email = subscriber_email;
  
  if existing_sub.id is not null then
    -- Already exists
    if existing_sub.status = 'active' then
      return json_build_object(
        'success', true,
        'message', 'Already subscribed',
        'data', row_to_json(existing_sub)
      );
    else
      -- Reactivate subscription
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
    -- New subscription
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

-- Function to unsubscribe
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

-- Add comment for documentation
comment on table public.newsletter_subscribers is 'Stores email newsletter subscriptions with support for tags, sources, and unsubscribe tokens';