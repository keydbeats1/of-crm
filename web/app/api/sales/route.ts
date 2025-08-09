import { adminClient } from '@/lib/supabase'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const schema = z.object({ 
  subscriber: z.string().min(1), 
  amount: z.number().nonnegative(), 
  modelId: z.string().min(1) 
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  
  if (!parsed.success) {
    return new Response('Invalid', { status: 400 })
  }
  
  const supa = adminClient()
  const userId = process.env.TEST_USER_ID!
  
  const { data: active } = await supa
    .from('clock_logs')
    .select('id, shift_id')
    .eq('chatter_id', userId)
    .eq('active', true)
    .maybeSingle()
  
  const { error } = await supa
    .from('sales')
    .insert({ 
      chatter_id: userId, 
      model_id: parsed.data.modelId, 
      subscriber_username: parsed.data.subscriber, 
      amount_usd: parsed.data.amount, 
      sold_at: new Date().toISOString(), 
      shift_id: active?.shift_id ?? null 
    })
  
  if (error) {
    return new Response(error.message, { status: 500 })
  }
  
  return new Response('OK')
}
