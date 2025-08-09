import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">OF CRM</h1>
      <p className="mt-2">
        Go to <Link className="underline" href="/login">Login</Link>
      </p>
    </main>
  )
}
