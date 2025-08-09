import { createClient } from '@supabase/supabase-js'

export function adminClient(){
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co', 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key', 
    { auth: { autoRefreshToken: false, persistSession: false }}
  )
}

export function client(){
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co', 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key'
  )
}
