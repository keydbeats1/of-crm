'use client'
import useSWR from 'swr'

const fetcher = (u: string) => fetch(u).then(r => r.json())

export default function Shifts() {
  const { data } = useSWR('/api/shifts', fetcher)

  return (
    <div className="mt-2 space-y-2">
      {(data?.shifts || []).map((s: any) => (
        <div key={s.id} className="p-3 rounded bg-neutral-100 flex items-center justify-between">
          <div>
            <div className="font-medium">
              {new Date(s.start_at).toLocaleString()} – {new Date(s.end_at).toLocaleTimeString()}
            </div>
            <div className="text-sm text-neutral-600">
              Capacity {s.capacity}{s.locked ? ' • locked' : ''}
            </div>
          </div>
          <button className="px-3 py-1 rounded bg-blue-600 text-white">
            Request
          </button>
        </div>
      ))}
    </div>
  )
}
