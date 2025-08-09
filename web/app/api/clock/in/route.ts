import { adminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST() {
  const supa = adminClient()
  // TODO: derive user id from session; placeholder uses an env test user
  const userId = process.env.TEST_USER_ID!
  
  const { data: active } = await supa
    .from('clock_logs')
    .select('id')
    .eq('chatter_id', userId)
    .eq('active', true)
  
  if (active && active.length) {
    return new Response('Already clocked in', { status: 400 })
  }
  
  const { error } = await supa
    .from('clock_logs')
    .insert({ 
      chatter_id: userId, 
      clock_in_at: new Date().toISOString(), 
      active: true 
    })
  
  if (error) {
    return new Response(error.message, { status: 500 })
  }
  
  return new Response('OK')
}
