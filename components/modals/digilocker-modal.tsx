"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

export function DigiLockerConnect() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:opacity-90">Connect DigiLocker</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-balance">DigiLocker integration coming soon</DialogTitle>
          <DialogDescription className="text-pretty">
            This will automatically fetch verified certificates from your DigiLocker account.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            <span className="font-medium">Mock OAuth</span>
            <Badge variant="outline">Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            In production, you’ll be redirected to DigiLocker to authorize read access to verified documents.
          </p>
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button disabled>Continue to DigiLocker</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
