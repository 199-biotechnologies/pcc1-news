# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PCC1.news is a Next.js website focused on Procyanidin C1 research, featuring a blog, science content, and an e-commerce shop. The site uses:

- Next.js 15+ with App Router
- TypeScript with strict mode enabled
- Tailwind CSS for styling with Typography plugin
- Radix UI component library with Shadcn/UI implementation
- Stripe for payment processing (API version: 2025-04-30.basil)
- Supabase for backend services (database, auth, edge functions)
- React 19 with React Hook Form for form handling
- pnpm as package manager

## Common Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Type checking (via build process)
pnpm build
```

## Architecture

### Next.js App Router Structure

The project uses Next.js App Router architecture with the following route structure:

- `/app/` - Root layout and pages
  - `/app/page.tsx` - Homepage
  - `/app/about/page.tsx` - About page with contact form
  - `/app/blog/[slug]/page.tsx` - Dynamic blog post pages
  - `/app/shop/page.tsx` - E-commerce product listing
  - `/app/shop/success/page.tsx` - Post-purchase success page
  - `/app/science/page.tsx` - Scientific information page
  - `/app/research/page.tsx` - Research papers listing
  - `/app/press/page.tsx` - Press coverage
  - `/app/api/checkout_sessions/route.ts` - Stripe checkout API endpoint

### Component Architecture

- `/components/ui/` - Shadcn UI primitive components (buttons, forms, dialogs, etc.)
- `/components/layout/` - Shared layout components (header, footer, content wrappers)
- `/components/shop/` - E-commerce specific components
- `/components/research/` - Research-related components
- `/components/contact-form.tsx` - Contact form with hCaptcha integration
- `/components/theme-provider.tsx` - Next-themes integration

### Utility and Configuration

- `/lib/utils.ts` - Utility functions including `cn()` for className merging
- `/lib/supabaseClient.ts` - Configured Supabase client instance
- `/hooks/` - Custom React hooks
- Path aliases configured: `@/*` maps to root directory

### External Services Integration

1. **Stripe Integration**
   - Live mode price ID: `price_1RLNcfIXR6Q95AMXx9UpgE2i`
   - Checkout session creation in `/app/api/checkout_sessions/route.ts`
   - Automatic tax calculation enabled
   - Shipping address collection for US, CA, GB, AU

2. **Supabase Integration**
   - Database table: `contact_messages` for contact form submissions
   - Edge Function: `contact-form-handler` for processing form submissions
   - Uses Deno runtime with Resend for email delivery
   - Requires database trigger setup for INSERT events

3. **Contact Form Flow**
   - Frontend validation with React Hook Form and Zod
   - hCaptcha verification on client
   - Direct Supabase insert from client
   - Database trigger invokes edge function
   - Edge function verifies hCaptcha server-side and sends email via Resend

## Environment Variables

Required environment variables:

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

## Development Guidelines

- TypeScript strict mode is enforced - ensure all types are properly defined
- Use absolute imports with `@/` prefix for consistency
- Tailwind classes should use the `cn()` utility from `/lib/utils.ts` for conditional classes
- Form components should use React Hook Form with Zod validation
- All commits should be pushed to the 199-biotechnologies organization GitHub repository

## Deployment Considerations

- Supabase edge function requires secrets configuration (see `/docs/contact-form-final-setup.md`)
- Stripe webhook endpoints may need configuration for production
- Environment variables must be set in deployment platform
- Build excludes Supabase functions directory (`/supabase/functions/**/*`)