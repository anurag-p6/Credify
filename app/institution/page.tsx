"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function InstitutionUploadPage() {
  const [loading, setLoading] = useState(false)
  const [aiPhase, setAiPhase] = useState<"idle" | "verifying" | "success" | "rejected">("idle")
  const [validationResult, setValidationResult] = useState<{
    score?: number
    reasons?: string[]
    analysis?: any
  } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setLoading(true)
    setAiPhase("verifying")
    setValidationResult(null)
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const out = await res.json()

      if (res.ok && out.success) {
        // Document passed AI validation (score >= 90%)
        setValidationResult({
          score: out.validationScore,
          reasons: out.reasons,
          analysis: out.analysis,
        })
        setAiPhase("success")
        toast({
          title: "Document Validated & Uploaded!",
          description: `AI Score: ${out.validationScore}% - Uploaded to blockchain`,
        })
        form.reset()
      } else if (out.rejected) {
        // Document failed AI validation (score < 90%)
        setValidationResult({
          score: out.validationScore,
          reasons: out.reasons,
          analysis: out.analysis,
        })
        setAiPhase("rejected")
        toast({
          title: "Document Rejected by AI",
          description: out.message || "Document does not meet quality standards",
          variant: "destructive" as any,
        })
      } else {
        // Other errors
        toast({
          title: "Upload failed",
          description: out?.error || out?.message || "Unknown error",
          variant: "destructive" as any,
        })
        setAiPhase("idle")
      }
    } catch (err) {
      toast({
        title: "Upload error",
        description: "Network or server error",
        variant: "destructive" as any,
      })
      setAiPhase("idle")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-balance">Institution Upload</h1>
        <p className="text-muted-foreground">Submit credential details and a PDF certificate.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-lg border bg-card p-6">
          <div className="grid gap-2">
            <Label htmlFor="learnerEmail">Learner Email</Label>
            <Input required id="learnerEmail" name="learnerEmail" type="email" placeholder="learner@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input required id="courseName" name="courseName" placeholder="Intro to Blockchain" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="issuerName">Issuer Name</Label>
            <Input required id="issuerName" name="issuerName" placeholder="NCVET/MSDE Institute" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="certificate">Certificate (PDF)</Label>
            <Input required id="certificate" name="certificate" type="file" accept="application/pdf" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading…" : "Upload"}
            </Button>
            {aiPhase === "verifying" && (
              <span className="text-sm text-muted-foreground animate-pulse">
                AI Agent verifying document…
              </span>
            )}
            {aiPhase === "success" && validationResult && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Verified by AI ({validationResult.score}%)
              </span>
            )}
            {aiPhase === "rejected" && validationResult && (
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                Rejected ({validationResult.score}%)
              </span>
            )}
          </div>
        </form>

        {/* Validation Results Display */}
        {validationResult && aiPhase !== "idle" && aiPhase !== "verifying" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-lg border bg-card p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              AI Validation Results
            </h2>

            <div className="space-y-4">
              {/* Score Display */}
              <div className="flex items-center justify-between pb-4 border-b">
                <span className="text-sm font-medium">Validation Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        (validationResult.score ?? 0) >= 90
                          ? "bg-green-500"
                          : (validationResult.score ?? 0) >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${validationResult.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold min-w-[3rem] text-right">
                    {validationResult.score}%
                  </span>
                </div>
              </div>

              {/* Analysis Breakdown */}
              {validationResult.analysis && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Analysis Breakdown</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Required Fields:</span>
                      <span className={validationResult.analysis.hasRequiredFields ? "text-green-600" : "text-red-600"}>
                        {validationResult.analysis.hasRequiredFields ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Content Quality:</span>
                      <span>{validationResult.analysis.contentQuality}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format Compliance:</span>
                      <span>{validationResult.analysis.formatCompliance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Authenticity:</span>
                      <span>{validationResult.analysis.authenticity}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reasons */}
              {validationResult.reasons && validationResult.reasons.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Validation Details</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {validationResult.reasons.map((reason, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Status Message */}
              <div className={`p-3 rounded-md ${
                aiPhase === "success"
                  ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
              }`}>
                <p className={`text-sm font-medium ${
                  aiPhase === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                }`}>
                  {aiPhase === "success"
                    ? `Document passed validation (${validationResult.score}% ≥ 90%) and has been uploaded to the blockchain.`
                    : `Document failed validation (${validationResult.score}% < 90%). Please review the issues above and resubmit.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
