"use client"

import useSWR from "swr"
import { CredentialCard, type Credential } from "@/components/dashboard/credential-card"
import { DigiLockerConnect } from "@/components/modals/digilocker-modal"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DashboardPage() {
  const { data, mutate, isLoading } = useSWR<{ credentials: Credential[] }>("/api/credentials", fetcher, {
    refreshInterval: 2500,
  })

  async function verifyOnChain(id: string) {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    const out = await res.json()
    if (out.success) {
      toast({ title: "Verification complete", description: "Credential verified on blockchain." })
      mutate()
    } else {
      toast({
        title: "Verification failed",
        description: "Unable to verify credential.",
        variant: "destructive" as any,
      })
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-balance">My Credentials</h1>
          <p className="text-muted-foreground">View and verify your micro-credentials.</p>
        </div>
        <DigiLockerConnect />
      </motion.div>

      {isLoading && <p className="text-muted-foreground">Loading credentials…</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.credentials?.map((c) => (
          <CredentialCard key={c.id} cred={c} onVerify={verifyOnChain} />
        ))}
      </div>

      {!data?.credentials?.length && !isLoading && (
        <div className="mt-8 rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No credentials yet.</p>
          <Button className="mt-3" asChild>
            <a href="/institution">Upload one</a>
          </Button>
        </div>
      )}
    </div>
  )
}
