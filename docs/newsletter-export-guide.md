# Newsletter Export Guide

This guide provides detailed instructions for exporting newsletter subscribers from Supabase to various email marketing platforms.

## Table of Contents
- [Manual Export Methods](#manual-export-methods)
- [Export to Mailchimp](#export-to-mailchimp)
- [Export to ConvertKit](#export-to-convertkit)
- [Export to Klaviyo](#export-to-klaviyo)
- [Export to MailerLite](#export-to-mailerlite)
- [Automated Export Options](#automated-export-options)
- [Best Practices](#best-practices)

## Manual Export Methods

### Method 1: Supabase Dashboard CSV Export

1. **Navigate to Table Editor**
   - Go to your Supabase dashboard
   - Click on "Table Editor" in the left sidebar
   - Select `newsletter_subscribers` table

2. **Filter Active Subscribers**
   - Click "Filter" button
   - Add filter: `status` equals `active`
   - Apply filter

3. **Export as CSV**
   - Click "Export" button (download icon)
   - Choose "Export as CSV"
   - Save the file

### Method 2: SQL Query Export

Use these queries in the SQL Editor for more control:

```sql
-- Export all active subscribers with basic info
SELECT 
  email,
  source,
  subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;

-- Export with additional fields for segmentation
SELECT 
  email,
  source,
  tags,
  subscribed_at,
  metadata->>'url' as signup_page,
  CASE 
    WHEN source LIKE '%shop%' THEN 'High Intent'
    WHEN source LIKE '%homepage%' THEN 'General Interest'
    ELSE 'Other'
  END as segment
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;

-- Export recent subscribers (last 30 days)
SELECT 
  email,
  source,
  subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
  AND subscribed_at >= NOW() - INTERVAL '30 days'
ORDER BY subscribed_at DESC;
```

### Method 3: Command Line Export

If you have `psql` installed and your database connection string:

```bash
# Export to CSV file
psql "your-database-connection-string" -c "\copy (SELECT email, source, subscribed_at FROM newsletter_subscribers WHERE status = 'active') TO '~/Desktop/subscribers.csv' WITH CSV HEADER"
```

## Export to Mailchimp

### Prepare the Data
1. Export subscribers using Method 1 or 2 above
2. Ensure CSV has these columns:
   - `email` (required)
   - `source` (optional - can map to MERGE field)
   - `subscribed_at` (optional - for segmentation)

### Import Process
1. **Navigate to Audience**
   - Log into Mailchimp
   - Go to Audience → All contacts

2. **Import Contacts**
   - Click "Add contacts" → "Import contacts"
   - Choose "CSV or tab-delimited text file"
   - Upload your exported CSV

3. **Map Fields**
   - Map `email` to Email Address
   - Map `source` to a custom field (create if needed)
   - Map `subscribed_at` to a date field

4. **Configure Import Settings**
   - Update existing contacts: Yes
   - Add tags: "PCC1-Import-[Date]"

## Export to ConvertKit

### Prepare the Data
ConvertKit prefers simple CSV with just emails, but supports additional fields:

```sql
-- ConvertKit-optimized export
SELECT 
  email as "Email",
  SPLIT_PART(email, '@', 1) as "First Name", -- Extract name from email
  source as "Source",
  TO_CHAR(subscribed_at, 'YYYY-MM-DD') as "Subscribed Date"
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

### Import Process
1. **Navigate to Subscribers**
   - Go to Subscribers → + Add Subscribers

2. **Import from CSV**
   - Click "Import a CSV"
   - Upload file
   - Map fields (Email is required)

3. **Apply Tags**
   - Add tag: "pcc1-newsletter"
   - Add source-based tags if desired

## Export to Klaviyo

### Prepare the Data
Klaviyo loves detailed data for segmentation:

```sql
-- Klaviyo-optimized export with properties
SELECT 
  email,
  source,
  ARRAY_TO_STRING(tags, ',') as tags,
  subscribed_at,
  CASE 
    WHEN source LIKE '%shop%' THEN true
    ELSE false
  END as showed_purchase_intent,
  metadata->>'url' as signup_url
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

### Import Process
1. **Create a List**
   - Go to Lists & Segments
   - Create new list: "PCC1 Newsletter"

2. **Import Subscribers**
   - Click "Add/Import Profiles"
   - Upload CSV
   - Map custom properties

3. **Set Up Welcome Flow**
   - Create flow triggered by list subscription
   - Personalize based on source property

## Export to MailerLite

### Prepare the Data
MailerLite format:

```sql
-- MailerLite-optimized export
SELECT 
  email as "Email",
  source as "Field: Source",
  TO_CHAR(subscribed_at, 'YYYY-MM-DD HH24:MI:SS') as "Field: Signup Date"
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

### Import Process
1. **Navigate to Subscribers**
   - Go to Subscribers → Import

2. **Upload CSV**
   - Select your CSV file
   - Choose "Add to group": Create "PCC1 Newsletter"

3. **Map Fields**
   - Email → Email
   - Custom fields → Create as needed

## Automated Export Options

### Option 1: Zapier Integration

1. **Create Zap**
   - Trigger: Supabase - New Row
   - Table: newsletter_subscribers
   - Filter: status equals "active"

2. **Action**
   - App: Your email service
   - Action: Create/Update Subscriber

### Option 2: Make.com (Integromat)

Similar to Zapier but often more affordable for high volume.

### Option 3: Custom API Integration

Create an API endpoint in your Next.js app:

```typescript
// app/api/sync-subscribers/route.ts
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  // Verify secret key
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Fetch new subscribers
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('status', 'active')
    .gte('subscribed_at', new Date(Date.now() - 24*60*60*1000).toISOString())

  // Sync to your email service
  // ... integration code here ...

  return Response.json({ synced: subscribers?.length || 0 })
}
```

## Best Practices

### 1. **Export Frequency**
- Weekly for active campaigns
- Monthly for maintenance
- Real-time for transactional needs

### 2. **Data Hygiene**
- Remove duplicates before import
- Validate email formats
- Check for typos in popular domains

### 3. **Segmentation Strategy**
- Tag by source (homepage, shop, etc.)
- Tag by date range
- Create segments based on engagement

### 4. **Compliance**
- Only export active subscribers
- Include unsubscribe links in all emails
- Honor unsubscribe requests promptly

### 5. **Testing**
- Always test with a small batch first
- Verify custom fields map correctly
- Check that welcome emails trigger properly

## Useful SQL Queries

### Find Duplicate Emails (shouldn't happen due to unique constraint)
```sql
SELECT email, COUNT(*) 
FROM newsletter_subscribers 
GROUP BY email 
HAVING COUNT(*) > 1;
```

### Export by Date Range
```sql
-- Last 7 days
SELECT email, source, subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
  AND subscribed_at >= NOW() - INTERVAL '7 days';

-- Specific month
SELECT email, source, subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
  AND DATE_TRUNC('month', subscribed_at) = '2025-01-01';
```

### Export with Engagement Potential
```sql
SELECT 
  email,
  source,
  CASE 
    WHEN source LIKE '%shop%' THEN 'High'
    WHEN source LIKE '%homepage%' THEN 'Medium'
    ELSE 'Low'
  END as engagement_potential,
  subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY 
  CASE 
    WHEN source LIKE '%shop%' THEN 1
    WHEN source LIKE '%homepage%' THEN 2
    ELSE 3
  END,
  subscribed_at DESC;
```

### Clean Export for Simple Email Services
```sql
-- Just emails, one per line
SELECT email
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY email;
```

## Troubleshooting

### Common Issues

1. **CSV Format Issues**
   - Ensure UTF-8 encoding
   - Check for special characters in emails
   - Remove any line breaks in fields

2. **Import Failures**
   - Verify email format validity
   - Check for required fields
   - Ensure no duplicate headers

3. **Missing Data**
   - Confirm filters aren't too restrictive
   - Check timezone considerations for date filters
   - Verify RLS policies allow reading

### Support Contacts
- Mailchimp: support.mailchimp.com
- ConvertKit: help.convertkit.com
- Klaviyo: support.klaviyo.com
- MailerLite: mailerlite.com/help