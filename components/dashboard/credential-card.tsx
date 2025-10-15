"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle2, Clock, ExternalLink } from "lucide-react"
import { useState } from "react"

export type Credential = {
  id: string
  learnerEmail: string
  courseName: string
  issuerName: string
  issueDate: string
  ipfsCid: string
  blockchainHash: string
  verificationStatus: "Pending AI" | "Verified by AI" | "Verified on Blockchain"
  verified: boolean
}

export function CredentialCard({ cred, onVerify }: { cred: Credential; onVerify: (id: string) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const status =
    cred.verificationStatus === "Verified by AI" || cred.verificationStatus === "Verified on Blockchain"
      ? "verified"
      : "pending"

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-pretty">{cred.courseName}</CardTitle>
        <CardDescription className="text-pretty">
          Issuer: {cred.issuerName} • Issued: {new Date(cred.issueDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          {status === "verified" ? (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              <CheckCircle2 className="mr-1 size-4" /> {cred.verificationStatus}
            </Badge>
          ) : (
            <Badge variant="outline">
              <Clock className="mr-1 size-4" /> {cred.verificationStatus}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground break-all">IPFS CID: {cred.ipfsCid}</p>
        <p className="text-xs text-muted-foreground break-all">Hash: {cred.blockchainHash}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button asChild variant="secondary">
          <Link href={`/verify/${cred.id}`} className="inline-flex items-center gap-2">
            View Credential <ExternalLink className="size-4" />
          </Link>
        </Button>
        <Button
          onClick={async () => {
            setLoading(true)
            await onVerify(cred.id)
            setLoading(false)
          }}
          disabled={loading || cred.verificationStatus === "Verified on Blockchain"}
        >
          {loading ? "Verifying…" : "Verify on Blockchain"}
        </Button>
      </CardFooter>
    </Card>
  )
}
