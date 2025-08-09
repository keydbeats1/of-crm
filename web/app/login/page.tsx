'use client'
import { useState } from 'react'
import { client } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const r = useRouter()

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold">Login</h1>
      <form 
        className="mt-4 space-y-4" 
        onSubmit={async (e) => {
          e.preventDefault()
          setErr('')
          const { error } = await client().auth.signInWithPassword({ email, password })
          if (error) { 
            setErr(error.message)
            return 
          }
          r.push('/dashboard')
        }}
      >
        <input 
          className="w-full border rounded p-2" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          className="w-full border rounded p-2" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-black text-white rounded p-2">
          Sign in
        </button>
      </form>
    </main>
  )
}
