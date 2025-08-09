import { adminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supa = adminClient()
  
  const { data } = await supa
    .from('shifts')
    .select('*')
    .order('start_at')
  
  return Response.json({ shifts: data || [] })
}
