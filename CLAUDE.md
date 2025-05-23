# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PCC1.news is a Next.js website focused on Procyanidin C1 research, featuring a blog, science content, and an e-commerce shop. The site uses:

- Next.js 15+ with App Router
- TypeScript
- Tailwind CSS for styling
- Radix UI component library with Shadcn/UI implementation
- Stripe for payment processing
- Supabase for backend services (database, auth, edge functions)

## Common Commands

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Next.js App Router Structure

The project uses Next.js App Router architecture:

- `/app/` - Contains all page routes organized by folder structure
  - `/app/page.tsx` - Homepage
  - `/app/[section]/page.tsx` - Section pages (blog, shop, about, etc.)
  - `/app/api/` - API route handlers

### Key Components

- `/components/layout/` - Layout components (header, footer)
- `/components/shop/` - E-commerce components
- `/components/ui/` - Shadcn UI components
- `/lib/` - Utility functions and Supabase client

### External Services

1. **Stripe Integration**
   - Checkout flow implemented in `/app/shop/page.tsx` and `/app/api/checkout_sessions/route.ts`
   - Uses server-side Stripe initialization for product/price fetching
   - Requires environment variables for Stripe API keys

2. **Supabase Integration**
   - Client setup in `/lib/supabaseClient.ts`
   - Contact form using Supabase edge functions
   - Requires proper configuration of environment variables

## Environment Variables

The following environment variables need to be configured:

```
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-site-key
```

## Important Notes

- When making changes to the shop, ensure the Stripe product and price IDs are correctly maintained in both the server component and API route.
- Supabase edge function for contact form requires additional setup as documented in `/docs/contact-form-final-setup.md`.
- Commits should be pushed to the 199-biotechnologies organization GitHub repository.