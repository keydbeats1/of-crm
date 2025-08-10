'use client'
import { useState, useEffect } from 'react'
import { client } from '@/lib/supabase'

export function SalesForm() {
  const [subscriber, setSubscriber] = useState('')
  const [amount, setAmount] = useState('')
  const [modelId, setModelId] = useState('')
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const supa = client()

  // Učitaj modele
  useEffect(() => {
    loadModels()
  }, [])

  const loadModels = async () => {
    try {
      const { data } = await supa
        .from('models')
        .select('id, username')
        .order('username')
      
      setModels(data || [])
    } catch (error) {
      console.error('Error loading models:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const res = await fetch('/api/sales', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          subscriber, 
          amount: parseFloat(amount), 
          modelId 
        }) 
      })

      if (res.ok) {
        setMsg('✅ Sale logged successfully!')
        // Reset form
        setSubscriber('')
        setAmount('')
        setModelId('')
      } else {
        const errorText = await res.text()
        setMsg(`❌ Error: ${errorText}`)
      }
    } catch (error) {
      setMsg('❌ Network error')
    }

    setLoading(false)
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <input 
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          placeholder="Subscriber username" 
          value={subscriber} 
          onChange={e => setSubscriber(e.target.value)}
          required
        />
      </div>
      
      <div>
        <input 
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          type="number"
          step="0.01"
          min="0"
          placeholder="Amount USD" 
          value={amount} 
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div>
        <select 
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={modelId}
          onChange={e => setModelId(e.target.value)}
          required
        >
          <option value="">Select Model</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>
              {model.username}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : 'Log Sale'}
      </button>
      
      {msg && (
        <div className={`text-sm p-2 rounded ${
          msg.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {msg}
        </div>
      )}
    </form>
  )
}

export default SalesForm
