/**
 * AI Document Validation Service
 *
 * This service acts as an agentic instance that validates uploaded documents
 * and determines whether they meet quality standards before blockchain upload.
 */

export type ValidationResult = {
  score: number // 0-100 percentage score
  isValid: boolean // true if score >= 90
  reasons: string[]
  analysis: {
    hasRequiredFields: boolean
    contentQuality: number
    formatCompliance: number
    authenticity: number
  }
}

/**
 * Validates a document file and returns a quality score.
 * Documents with score >= 90% are considered valid for blockchain upload.
 *
 * @param file - The uploaded document file
 * @param metadata - Document metadata (learnerEmail, courseName, issuerName)
 * @returns ValidationResult with score and detailed analysis
 */
export async function validateDocument(
  file: File,
  metadata: {
    learnerEmail: string
    courseName: string
    issuerName: string
  }
): Promise<ValidationResult> {
  const reasons: string[] = []
  const analysis = {
    hasRequiredFields: false,
    contentQuality: 0,
    formatCompliance: 0,
    authenticity: 0,
  }

  // Check file type
  if (file.type !== "application/pdf") {
    reasons.push("Invalid file format: must be PDF")
    return {
      score: 0,
      isValid: false,
      reasons,
      analysis,
    }
  }

  // Check file size (must be between 10KB and 10MB)
  const fileSizeKB = file.size / 1024
  if (fileSizeKB < 10) {
    reasons.push("File too small: suspicious or empty document")
    analysis.formatCompliance = 20
  } else if (fileSizeKB > 10240) {
    reasons.push("File too large: exceeds 10MB limit")
    analysis.formatCompliance = 40
  } else {
    analysis.formatCompliance = 100
  }

  // Validate metadata completeness
  const hasEmail = !!(metadata.learnerEmail && metadata.learnerEmail.includes("@"))
  const hasCourseName = !!(metadata.courseName && metadata.courseName.length > 3)
  const hasIssuerName = !!(metadata.issuerName && metadata.issuerName.length > 3)

  if (!hasEmail) {
    reasons.push("Invalid learner email address")
  }
  if (!hasCourseName) {
    reasons.push("Course name is too short or missing")
  }
  if (!hasIssuerName) {
    reasons.push("Issuer name is too short or missing")
  }

  analysis.hasRequiredFields = hasEmail && hasCourseName && hasIssuerName

  // Simulate AI content analysis
  // In production, this would use actual AI/ML models to analyze PDF content
  const contentScore = await analyzeDocumentContent(file, metadata)
  analysis.contentQuality = contentScore

  // Simulate authenticity check
  // In production, this would check digital signatures, watermarks, etc.
  const authenticityScore = await checkAuthenticity(file, metadata)
  analysis.authenticity = authenticityScore

  // Calculate overall score
  const weights = {
    requiredFields: 0.2,
    contentQuality: 0.4,
    formatCompliance: 0.2,
    authenticity: 0.2,
  }

  const score = Math.round(
    (analysis.hasRequiredFields ? 100 : 0) * weights.requiredFields +
    analysis.contentQuality * weights.contentQuality +
    analysis.formatCompliance * weights.formatCompliance +
    analysis.authenticity * weights.authenticity
  )

  // Add reasons for low scores
  if (analysis.contentQuality < 70) {
    reasons.push(`Content quality below threshold: ${analysis.contentQuality}%`)
  }
  if (analysis.authenticity < 70) {
    reasons.push(`Authenticity verification failed: ${analysis.authenticity}%`)
  }
  if (!analysis.hasRequiredFields) {
    reasons.push("Required metadata fields are incomplete or invalid")
  }

  const isValid = score >= 90

  if (isValid) {
    reasons.push("Document meets all quality standards for blockchain upload")
  } else {
    reasons.push(`Overall score ${score}% is below the required 90% threshold`)
  }

  return {
    score,
    isValid,
    reasons,
    analysis,
  }
}

/**
 * Simulates AI-powered content analysis of the document.
 * In production, this would:
 * - Extract text from PDF using OCR/text extraction
 * - Analyze structure and formatting
 * - Check for required certificate elements (names, dates, signatures)
 * - Validate course content alignment
 */
async function analyzeDocumentContent(
  file: File,
  metadata: { learnerEmail: string; courseName: string; issuerName: string }
): Promise<number> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulated AI analysis scoring
  // In production, this would be replaced with actual ML model inference
  let score = 75 // Base score

  // Check filename quality
  if (file.name.toLowerCase().includes("certificate") ||
      file.name.toLowerCase().includes("credential")) {
    score += 5
  }

  // Simulate random variation for demo (remove in production)
  const variation = Math.random() * 20 - 10 // -10 to +10
  score = Math.max(0, Math.min(100, score + variation))

  return Math.round(score)
}

/**
 * Simulates authenticity verification.
 * In production, this would:
 * - Check digital signatures
 * - Verify issuer credentials against known institutions
 * - Analyze watermarks and security features
 * - Cross-reference with institutional databases
 */
async function checkAuthenticity(
  file: File,
  metadata: { learnerEmail: string; courseName: string; issuerName: string }
): Promise<number> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Simulated authenticity check
  let score = 80 // Base score

  // Check if issuer name suggests institutional legitimacy
  const legitimateKeywords = ["institute", "university", "ncvet", "msde", "academy", "college"]
  const hasLegitKeyword = legitimateKeywords.some((keyword) =>
    metadata.issuerName.toLowerCase().includes(keyword)
  )

  if (hasLegitKeyword) {
    score += 10
  }

  // Simulate random variation for demo (remove in production)
  const variation = Math.random() * 20 - 10 // -10 to +10
  score = Math.max(0, Math.min(100, score + variation))

  return Math.round(score)
}

/**
 * Quick validation check without detailed analysis.
 * Used for pre-flight checks before full validation.
 */
export function quickValidate(metadata: {
  learnerEmail: string
  courseName: string
  issuerName: string
}): { valid: boolean; message?: string } {
  if (!metadata.learnerEmail?.includes("@")) {
    return { valid: false, message: "Invalid email address" }
  }
  if (!metadata.courseName || metadata.courseName.length < 3) {
    return { valid: false, message: "Course name too short" }
  }
  if (!metadata.issuerName || metadata.issuerName.length < 3) {
    return { valid: false, message: "Issuer name too short" }
  }
  return { valid: true }
}
