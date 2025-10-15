import { NextResponse } from "next/server"
import { getCredential } from "@/lib/db"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const credential = getCredential(params.id)
  if (!credential) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ credential })
}
