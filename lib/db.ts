import crypto from "node:crypto"

export type StoredCredential = {
  id: string
  learnerEmail: string
  courseName: string
  issuerName: string
  issueDate: string
  ipfsCid: string
  blockchainHash: string
  verificationStatus: "Pending AI" | "Verified by AI" | "Verified on Blockchain" | "Rejected by AI"
  aiValidation?: {
    score: number
    isValid: boolean
    reasons: string[]
    timestamp: string
  }
}

let idCounter = 1
const credentials: StoredCredential[] = []

function randomCid() {
  // mock IPFS CID (not real multihash)
  const rand = crypto.randomBytes(8).toString("hex")
  return `bafybei${rand}xxxx`
}

export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex")
}

export function addCredential(
  data: {
    learnerEmail: string
    courseName: string
    issuerName: string
  },
  aiValidation?: {
    score: number
    isValid: boolean
    reasons: string[]
  }
): StoredCredential {
  const id = String(idCounter++)
  const issueDate = new Date().toISOString()

  // Only generate IPFS CID and blockchain hash if AI validation passed
  const ipfsCid = aiValidation?.isValid ? randomCid() : ""
  const blockchainHash = aiValidation?.isValid
    ? sha256(`${data.learnerEmail}|${data.courseName}|${data.issuerName}|${issueDate}|${Math.random()}`)
    : ""

  const cred: StoredCredential = {
    id,
    learnerEmail: data.learnerEmail,
    courseName: data.courseName,
    issuerName: data.issuerName,
    issueDate,
    ipfsCid,
    blockchainHash,
    verificationStatus: aiValidation
      ? (aiValidation.isValid ? "Verified by AI" : "Rejected by AI")
      : "Pending AI",
    aiValidation: aiValidation ? {
      score: aiValidation.score,
      isValid: aiValidation.isValid,
      reasons: aiValidation.reasons,
      timestamp: new Date().toISOString(),
    } : undefined,
  }
  credentials.unshift(cred)

  return cred
}

export function listCredentials() {
  return credentials.map((c) => ({
    ...c,
    verified: c.verificationStatus === "Verified by AI" || c.verificationStatus === "Verified on Blockchain",
  }))
}

export function getCredential(id: string) {
  return credentials.find((c) => c.id === id) || null
}

export function verifyCredentialById(id: string) {
  const c = credentials.find((x) => x.id === id)
  if (!c) return false
  c.verificationStatus = "Verified on Blockchain"
  return true
}

export function verifyByHash(hash: string) {
  const c = credentials.find((x) => x.blockchainHash === hash)
  if (!c) return false
  c.verificationStatus = "Verified on Blockchain"
  return true
}
