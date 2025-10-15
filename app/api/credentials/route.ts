import { NextResponse } from "next/server"
import { listCredentials } from "@/lib/db"

export async function GET() {
  const credentials = listCredentials()
  return NextResponse.json({ credentials })
}
