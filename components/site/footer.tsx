import { BadgeCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm md:flex-row">
        <p className="text-muted-foreground text-pretty">
          © {new Date().getFullYear()} Credify Platform
        </p>
        <p className="inline-flex items-center gap-2">
          <BadgeCheck className="size-4 text-primary" aria-hidden />
          <span className="text-pretty">Powered by DigiLocker + Hyperledger Besu + IPFS</span>
        </p>
      </div>
    </footer>
  )
}
