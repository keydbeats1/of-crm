'use client'
import { useState, useEffect } from 'react'
import { client } from '@/lib/supabase'

export function ClockCard() {
  const [loading, setLoading] = useState(false)
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<string | null>(null)
  const supa = client()

  // Proveri trenutno stanje
  useEffect(() => {
    checkClockStatus()
  }, [])

  const checkClockStatus = async () => {
    try {
      const { data: { user } } = await supa.auth.getUser()
      if (!user) return

      const { data } = await supa
        .from('clock_logs')
        .select('clock_in_at')
        .eq('chatter_id', user.id)
        .eq('active', true)
        .maybeSingle()

      setIsClockedIn(!!data)
      setClockInTime(data?.clock_in_at || null)
    } catch (error) {
      console.error('Error checking clock status:', error)
    }
  }

  const handleClockIn = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/clock/in', { method: 'POST' })
      if (res.ok) {
        setIsClockedIn(true)
        setClockInTime(new Date().toISOString())
      }
    } catch (error) {
      console.error('Clock in error:', error)
    }
    setLoading(false)
  }

  const handleClockOut = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/clock/out', { method: 'POST' })
      if (res.ok) {
        setIsClockedIn(false)
        setClockInTime(null)
      }
    } catch (error) {
      console.error('Clock out error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600">
        {isClockedIn ? (
          <div>
            <span className="text-green-600 font-medium">● Clocked In</span>
            {clockInTime && (
              <div className="text-xs mt-1">
                Since: {new Date(clockInTime).toLocaleTimeString()}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-500">● Not Clocked In</span>
        )}
      </div>
      
      <div className="space-x-2">
        <button 
          disabled={loading || isClockedIn} 
          onClick={handleClockIn}
          className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition-colors"
        >
          {loading ? 'Loading...' : 'Clock In'}
        </button>
        <button 
          disabled={loading || !isClockedIn} 
          onClick={handleClockOut}
          className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50 hover:bg-red-700 transition-colors"
        >
          {loading ? 'Loading...' : 'Clock Out'}
        </button>
      </div>
    </div>
  )
}

export default ClockCard
