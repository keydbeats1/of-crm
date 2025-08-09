'use client'
import { useEffect, useState } from 'react'
import { client } from '@/lib/supabase'
import Link from 'next/link'
import ClockCard from './ClockCard'
import SalesForm from './SalesForm'
import Shifts from './Shifts'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const supa = client()

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supa.auth.getUser()
      if (!user) { 
        window.location.href = '/login'
        return 
      }
      const { data } = await supa
        .from('users')
        .select('id, role, profiles(display_name)')
        .eq('id', user.id)
        .maybeSingle()
      setProfile({ ...data, email: user.email })
    })()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {profile && (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <section className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-medium">Clock</h2>
            <ClockCard />
          </section>
          <section className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-medium">Log Sale</h2>
            <SalesForm />
          </section>
          <section className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-medium">Shifts</h2>
            <Shifts />
          </section>
        </div>
      )}
      <div className="mt-6">
        <Link className="underline" href="/reports">Reports</Link>
      </div>
    </main>
  )
}
