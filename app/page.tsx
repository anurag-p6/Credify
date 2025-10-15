"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12 rounded-lg border bg-card p-8"
      >
        <h1 className="text-3xl font-bold text-balance">CredifyPlatform</h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          A trusted registry for learners and institutions. Securely aggregate, verify, and share micro-credentials.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard">For Learners</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/institution">For Institutions</Link>
          </Button>
        </div>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border bg-card p-6"
        >
          <h2 className="text-xl font-semibold">For Learners</h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Manage all your micro-credentials in one place. View issuers, issuance dates, and verification status.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border bg-card p-6"
        >
          <h2 className="text-xl font-semibold">For Institutions</h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Upload credentials (PDF) with learner details. Our AI agent assists in validation before registry inclusion.
          </p>
          <Button variant="secondary" className="mt-4" asChild>
            <Link href="/institution">Upload a Credential</Link>
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border bg-card p-6"
        >
          <h2 className="text-xl font-semibold">Verification</h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Each credential is anchored with a blockchain hash and immutable IPFS CID for integrity and authenticity.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border bg-card p-6"
        >
          <h2 className="text-xl font-semibold">About DigiLocker Integration</h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Soon, connect your DigiLocker to automatically sync verified certificates into your dashboard.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
