import { adminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST() {
  const supa = adminClient()
  const userId = process.env.TEST_USER_ID!
  
  const { data: row } = await supa
    .from('clock_logs')
    .select('*')
    .eq('chatter_id', userId)
    .eq('active', true)
    .maybeSingle()
  
  if (!row) {
    return new Response('No active clock', { status: 400 })
  }
  
  const { error } = await supa
    .from('clock_logs')
    .update({ 
      active: false, 
      clock_out_at: new Date().toISOString() 
    })
    .eq('id', row.id)
  
  if (error) {
    return new Response(error.message, { status: 500 })
  }
  
  return new Response('OK')
}
