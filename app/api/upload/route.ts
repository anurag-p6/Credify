import { NextResponse } from "next/server"
import { addCredential } from "@/lib/db"
import { validateDocument, quickValidate } from "@/lib/ai-validator"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const learnerEmail = String(form.get("learnerEmail") || "")
    const courseName = String(form.get("courseName") || "")
    const issuerName = String(form.get("issuerName") || "")
    const certificate = form.get("certificate") as File | null

    if (!learnerEmail || !courseName || !issuerName || !certificate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Quick validation check
    const quickCheck = quickValidate({ learnerEmail, courseName, issuerName })
    if (!quickCheck.valid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: quickCheck.message,
          validationScore: 0,
        },
        { status: 400 }
      )
    }

    // AI-powered document validation
    const validationResult = await validateDocument(certificate, {
      learnerEmail,
      courseName,
      issuerName,
    })

    // Check if document meets the 90% threshold
    if (!validationResult.isValid) {
      // Document rejected - do NOT upload to blockchain
      const cred = addCredential(
        { learnerEmail, courseName, issuerName },
        {
          score: validationResult.score,
          isValid: false,
          reasons: validationResult.reasons,
        }
      )

      return NextResponse.json(
        {
          success: false,
          rejected: true,
          message: `Document validation failed. Score: ${validationResult.score}% (minimum required: 90%)`,
          validationScore: validationResult.score,
          reasons: validationResult.reasons,
          analysis: validationResult.analysis,
          credential: cred,
        },
        { status: 422 } // Unprocessable Entity
      )
    }

    // Document passed validation - proceed with blockchain upload
    const cred = addCredential(
      { learnerEmail, courseName, issuerName },
      {
        score: validationResult.score,
        isValid: true,
        reasons: validationResult.reasons,
      }
    )

    return NextResponse.json({
      success: true,
      message: `Document validated successfully with score: ${validationResult.score}%. Uploaded to blockchain.`,
      validationScore: validationResult.score,
      reasons: validationResult.reasons,
      analysis: validationResult.analysis,
      credential: cred,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 })
  }
}
