"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, Upload, LayoutDashboard, Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DarkModeToggle } from "@/components/site/theme-toggle"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Header() {
  const pathname = usePathname()
  const link = (href: string, label: string, Icon: React.ComponentType<any>) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        pathname === href ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
      )}
    >
      <Icon className="size-4" />
      <span className="text-pretty">{label}</span>
    </Link>
  )

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" aria-hidden />
          <span className="font-semibold">Credify</span>
        </Link>
        <nav className="hidden gap-2 md:flex">
          {link("/", "Home", Home)}
          {link("/dashboard", "Learner Dashboard", LayoutDashboard)}
          {link("/institution", "Institution Upload", Upload)}
        </nav>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <SignedOut>
            <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
