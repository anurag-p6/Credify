"use client"

import useSWR from "swr"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function VerifyPage() {
  const params = useParams<{ id: string }>()
  const { data } = useSWR<{ credential: any }>(params?.id ? `/api/credentials/${params.id}` : null, fetcher)

  if (!data?.credential) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  const c = data.credential

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">{c.courseName}</CardTitle>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Issuer: {c.issuerName}</span>
            <span>•</span>
            <span>Issued: {new Date(c.issueDate).toLocaleDateString()}</span>
            <Badge variant="outline" className="ml-auto">
              {c.verificationStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <QRCodeSVG value={c.blockchainHash} size={180} />
          <p className="text-xs text-muted-foreground break-all">Blockchain Hash: {c.blockchainHash}</p>
          <p className="text-xs text-muted-foreground break-all">IPFS CID: {c.ipfsCid}</p>
          <Button asChild className="mt-2">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
