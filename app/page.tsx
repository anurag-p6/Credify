"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ShieldCheck,
  Award,
  Lock,
  Sparkles,
  Database,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "AI-Powered Validation",
      description: "Advanced AI agents verify credential authenticity with 90%+ accuracy before blockchain registration.",
    },
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Immutable verification using blockchain technology ensures credentials can't be tampered with.",
    },
    {
      icon: Database,
      title: "IPFS Storage",
      description: "Decentralized storage with IPFS keeps your credentials accessible and permanent.",
    },
    {
      icon: Sparkles,
      title: "Instant Verification",
      description: "Share verifiable credentials instantly with employers or institutions via QR codes.",
    },
  ]

  const benefits = [
    "Industry-leading AI validation",
    "Blockchain-verified credentials",
    "Google & Email authentication",
    "Real-time verification status",
    "Secure document storage",
    "DigiLocker integration (coming soon)",
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 px-4 py-1.5" variant="outline">
              <Sparkles className="mr-2 size-3.5" />
              AI-Powered Credential Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Credentials,
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Verified & Secured
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Credify is the trusted platform for managing, verifying, and sharing micro-credentials
              with blockchain security and AI validation.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-4" variant="outline">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to manage credentials
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Built with cutting-edge technology to ensure your credentials are secure, verified, and accessible.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-muted/30 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <Zap className="mr-2 size-3.5" />
                Why Choose Credify
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Trusted by learners and institutions worldwide
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of users who trust Credify to manage their educational credentials securely.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <span className="text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/sign-up">Start Managing Credentials</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid gap-4"
            >
              <Card className="border-2">
                <CardHeader>
                  <Award className="size-10 text-primary" />
                  <CardTitle className="text-2xl">For Learners</CardTitle>
                  <CardDescription className="text-base">
                    Manage all your micro-credentials in one secure place. Track verification status,
                    view issuers, and share credentials instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard">Access Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <FileCheck className="size-10 text-primary" />
                  <CardTitle className="text-2xl">For Institutions</CardTitle>
                  <CardDescription className="text-base">
                    Upload credentials with AI-powered validation. Ensure only verified documents
                    make it to the blockchain registry.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/institution">Upload Credentials</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to secure your credentials?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join Credify today and experience the future of credential management with
              blockchain security and AI validation.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/sign-up">
                  Create Free Account
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
