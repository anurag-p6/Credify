import { NextResponse } from "next/server"
import { verifyByHash, verifyCredentialById } from "@/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const { id, hash } = body || {}
  let ok = false
  if (id) ok = verifyCredentialById(String(id))
  else if (hash) ok = verifyByHash(String(hash))

  return NextResponse.json({ success: !!ok })
}
