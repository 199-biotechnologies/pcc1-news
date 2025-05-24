# Waitlist Feature Setup Guide

This guide explains how to set up and configure the waitlist feature for PCC1.news.

## Overview

The waitlist feature allows customers to sign up for notifications when products are back in stock. It includes:
- Email collection with optional phone number
- hCaptcha verification
- Position tracking in the waitlist
- Referral system for priority
- Automated confirmation emails

## Setup Steps

### 1. Deploy Database Schema

Run the migration file to create the waitlist table in your Supabase project:

```sql
-- Execute the SQL from: /supabase/migrations/create_waitlist_table.sql
```

This creates:
- `waitlist` table with all necessary fields
- Indexes for performance
- Row Level Security policies
- Referral handling function

### 2. Deploy Edge Function

Deploy the waitlist confirmation edge function:

```bash
supabase functions deploy waitlist-confirmation
```

### 3. Configure Supabase Secrets

In your Supabase dashboard, navigate to **Project Settings** → **Edge Functions** → **Add New Secret**:

- `HCAPTCHA_SECRET_KEY`: Your hCaptcha secret key
- `RESEND_API_KEY`: Your Resend API key
- `WAITLIST_EMAIL_SENDER`: Verified sender email (e.g., `noreply@pcc1.news`)

### 4. Set Up Database Trigger

Create a database trigger to automatically send confirmation emails:

1. Go to **Database** → **Function Hooks**
2. Click **Create a new function hook**
3. Configure:
   - **Name**: `trigger_waitlist_confirmation`
   - **Table**: `waitlist`
   - **Events**: `INSERT`
   - **Function**: `waitlist-confirmation`
   - **Authentication**: `service_role`
4. Click **Confirm**

## Usage

### Customer Flow

1. Customer clicks "Join Waitlist" on sold-out product
2. Modal opens with email form
3. Customer enters email, optional phone, and desired quantity
4. Completes hCaptcha verification
5. Submits form
6. Sees position in waitlist
7. Receives confirmation email with referral link

### Referral System

- Each waitlist entry gets a unique 8-character referral code
- Sharing the referral link (`/shop?ref=XXXXXXXX`) gives priority
- Each successful referral adds 10 priority points
- Higher priority customers get notified first

### Admin Management

To view waitlist entries:

```sql
-- View all waitlist entries for a product
SELECT email, phone, quantity_interested, created_at, priority_score
FROM waitlist
WHERE product_id = 'prod_SFtP7VXSpwhZcG'
ORDER BY priority_score DESC, created_at ASC;

-- Count total interested quantity
SELECT SUM(quantity_interested) as total_demand
FROM waitlist
WHERE product_id = 'prod_SFtP7VXSpwhZcG';
```

To notify customers when back in stock:

```sql
-- Mark customers as notified (implement notification system separately)
UPDATE waitlist
SET notified_at = NOW()
WHERE product_id = 'prod_SFtP7VXSpwhZcG'
  AND notified_at IS NULL
ORDER BY priority_score DESC, created_at ASC
LIMIT 100; -- Notify top 100
```

## Testing

1. Visit `/shop` page
2. Click "Join Waitlist" button
3. Fill out the form with test email
4. Complete hCaptcha
5. Submit and verify:
   - Modal shows success with position
   - Entry appears in Supabase waitlist table
   - Confirmation email is received

## Customization

### Email Template
Edit the HTML/text in `/supabase/functions/waitlist-confirmation/index.ts`

### Priority System
Modify the `priority_score` calculation in the database schema

### Quantity Limits
Adjust the check constraint in the schema (currently 1-10)

## Troubleshooting

### Emails not sending
- Verify Resend API key is correct
- Check sender email is verified in Resend
- Review edge function logs in Supabase dashboard

### hCaptcha failing
- Ensure `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` is set in `.env.local`
- Verify secret key matches in edge function
- Check domain is added to hCaptcha settings

### Position calculation incorrect
- Ensure indexes are created for performance
- Check that `created_at` timestamp is being set correctly