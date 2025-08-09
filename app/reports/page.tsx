'use client'
import useSWR from 'swr'

const fetcher = (u: string) => fetch(u).then(r => r.json())

export default function Reports() {
  const { data } = useSWR('/api/reports/earnings?granularity=day', fetcher)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Reports (daily)</h1>
      <pre className="mt-4 p-4 bg-white rounded-2xl shadow text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
