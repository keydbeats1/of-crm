import { adminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supa = adminClient()
  
  const { data, error } = await supa.rpc('daily_totals')
  
  if (error) {
    return new Response(error.message, { status: 500 })
  }
  
  return Response.json(data)
}
