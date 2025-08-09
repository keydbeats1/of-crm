import { NextResponse } from 'next/server'

export async function middleware(req: Request) {
  // In a real app decode a JWT/session to extract role; placeholder: pass-through
  return NextResponse.next()
}
