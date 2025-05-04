import { createClient } from '@supabase/supabase-js'

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// Create and export the Supabase client
// We specify the schema 'public' explicitly, though it's the default.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    // Recommended settings for Next.js, especially if using Server Components
    // or Route Handlers that interact with auth.
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})