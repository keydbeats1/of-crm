'use client'
import { useState } from 'react'
import { client } from '@/lib/supabase'

export function ClockCard() {
  const [loading, setLoading] = useState(false)
  const supa = client()

  return (
    <div className="space-x-2 mt-2">
      <button 
        disabled={loading} 
        onClick={async () => { 
          setLoading(true)
          await fetch('/api/clock/in', { method: 'POST' })
          setLoading(false) 
        }} 
        className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
        Clock In
      </button>
      <button 
        disabled={loading} 
        onClick={async () => { 
          setLoading(true)
          await fetch('/api/clock/out', { method: 'POST' })
          setLoading(false) 
        }} 
        className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-50"
      >
        Clock Out
      </button>
    </div>
  )
}

export default ClockCard
