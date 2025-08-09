'use client'
import { useState } from 'react'

export function SalesForm() {
  const [subscriber, setSubscriber] = useState('')
  const [amount, setAmount] = useState('')
  const [modelId, setModelId] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <form 
      className="space-y-2" 
      onSubmit={async (e) => {
        e.preventDefault()
        setMsg('')
        const res = await fetch('/api/sales', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            subscriber, 
            amount: parseFloat(amount), 
            modelId 
          }) 
        })
        setMsg(res.ok ? 'Saved' : 'Error')
      }}
    >
      <input 
        className="w-full border rounded p-2" 
        placeholder="Subscriber username" 
        value={subscriber} 
        onChange={e => setSubscriber(e.target.value)} 
      />
      <input 
        className="w-full border rounded p-2" 
        placeholder="Amount USD" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
      />
      <input 
        className="w-full border rounded p-2" 
        placeholder="Model ID" 
        value={modelId} 
        onChange={e => setModelId(e.target.value)} 
      />
      <button className="w-full bg-black text-white rounded p-2">
        Log Sale
      </button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  )
}

export default SalesForm
