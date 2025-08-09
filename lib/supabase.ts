import { createClient } from '@supabase/supabase-js'

export function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key'
  
  return createClient(url, key, { 
    auth: { 
      autoRefreshToken: false, 
      persistSession: false 
    }
  })
}

export function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key'
  
  return createClient(url, key)
}
