# Newsletter System Guide

## Overview
The newsletter system collects email subscribers across the site, storing them in Supabase for easy export to third-party email marketing services.

## Features
- **Email validation** - Client and database-level validation
- **Duplicate handling** - Prevents duplicate entries, reactivates unsubscribed users
- **Source tracking** - Records which page the user subscribed from
- **Privacy compliant** - Includes unsubscribe tokens and timestamps
- **Flexible metadata** - JSONB field for future expansion

## Database Structure

### Table: `newsletter_subscribers`
- `email` - Subscriber's email (unique)
- `status` - active/unsubscribed/bounced
- `source` - Page where they subscribed
- `tags` - Array for future segmentation
- `subscribed_at` - Timestamp of subscription
- `unsubscribe_token` - Unique token for one-click unsubscribe
- `metadata` - Flexible JSONB for additional data

## Usage

### Adding Subscribe Forms
Use the `NewsletterSubscribe` component anywhere:

```tsx
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

// Basic usage
<NewsletterSubscribe />

// With custom props
<NewsletterSubscribe
  source="homepage-hero"
  buttonText="Get Updates"
  placeholder="your@email.com"
  successMessage="Thanks for subscribing!"
  showDescription={false}
/>
```

### Tracking Sources
The component automatically tracks:
- Current page path
- Custom source identifier
- Timestamp and URL in metadata

## Exporting Subscribers

### Manual Export via SQL
```sql
-- Export all active subscribers
SELECT email, subscribed_at, source
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;

-- Export as CSV
COPY (
  SELECT email, subscribed_at, source
  FROM newsletter_subscribers
  WHERE status = 'active'
) TO '/tmp/subscribers.csv' WITH CSV HEADER;
```

### Programmatic Export
```javascript
// Example: Export to Mailchimp/ConvertKit/etc
const { data } = await supabase
  .from('newsletter_subscribers')
  .select('email, tags, subscribed_at')
  .eq('status', 'active');

// Format for your email service
const formatted = data.map(sub => ({
  email_address: sub.email,
  status: 'subscribed',
  tags: sub.tags || [],
  merge_fields: {
    SIGNUP_DATE: sub.subscribed_at
  }
}));
```

## Integration Options

### 1. **Zapier/Make.com**
- Set up webhook on new subscriber
- Auto-sync to email service
- No code required

### 2. **API Integration**
Create an API endpoint to sync:
```typescript
// app/api/sync-subscribers/route.ts
export async function GET() {
  // Fetch new subscribers
  // Push to email service API
  // Mark as synced
}
```

### 3. **Batch Export**
- Manual CSV export
- Upload to email service
- Good for periodic updates

## Email Service Recommendations

### For Simplicity: **ConvertKit**
- Great for creators
- Easy automation
- Good deliverability

### For E-commerce: **Klaviyo**
- Deep Shopify integration
- Advanced segmentation
- Revenue tracking

### For Scale: **SendGrid/Mailgun**
- API-first approach
- High volume capability
- Transactional + marketing

### Budget-Friendly: **MailerLite**
- Free tier up to 1,000 subscribers
- Clean interface
- Good features

## Compliance & Best Practices

### GDPR/CAN-SPAM Compliance
- ✅ Explicit consent (user submits form)
- ✅ Easy unsubscribe (token in database)
- ✅ Data portability (can export anytime)
- ✅ Right to deletion (can delete records)

### Email Content Ideas
1. **Welcome Series**
   - Introduction to PCC1
   - Science behind the product
   - Customer testimonials

2. **Educational Content**
   - Research updates
   - Longevity tips
   - Ingredient deep-dives

3. **Product Updates**
   - Back in stock alerts
   - New research findings
   - Special offers

## Unsubscribe Handling

### One-Click Unsubscribe
Create unsubscribe page:
```tsx
// app/unsubscribe/[token]/page.tsx
const { data } = await supabase.rpc('unsubscribe_newsletter', {
  token: params.token
});
```

### Email Footer
Include in all emails:
```
Unsubscribe: https://pcc1.news/unsubscribe/[token]
```

## Analytics & Reporting

### Key Metrics to Track
- Subscription rate by source
- Growth over time
- Engagement rates (via email service)
- Conversion to customers

### SQL Queries for Insights
```sql
-- Daily signups
SELECT DATE(subscribed_at), COUNT(*)
FROM newsletter_subscribers
WHERE status = 'active'
GROUP BY DATE(subscribed_at)
ORDER BY DATE(subscribed_at) DESC;

-- Top sources
SELECT source, COUNT(*) as subscribers
FROM newsletter_subscribers
WHERE status = 'active'
GROUP BY source
ORDER BY subscribers DESC;
```

## Next Steps

1. **Immediate**: Run the SQL migration to create the table
2. **Soon**: Choose an email service provider
3. **Later**: Set up automated welcome emails
4. **Future**: Implement segmentation and personalization

## Testing Checklist
- [ ] Subscribe with valid email
- [ ] Try duplicate subscription
- [ ] Check source tracking
- [ ] Verify data in Supabase
- [ ] Test with invalid emails
- [ ] Confirm success messages