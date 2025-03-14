"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Globe, ExternalLink, MoreHorizontal, Shield, Pencil, Trash2, RefreshCw } from "lucide-react"
import { useDomains, type Domain } from "@/contexts/domain-context"
import { formatDistanceToNow, parseISO, isAfter } from "date-fns"

interface SubdomainCardProps {
  domain: Domain
}

export function SubdomainCard({ domain }: SubdomainCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { deleteDomain, updateDomain } = useDomains()
  const router = useRouter()

  // Format dates for display
  const createdAtFormatted = formatDistanceToNow(parseISO(domain.createdAt), { addSuffix: true })

  // Check if domain is expired
  const isExpired = isAfter(new Date(), parseISO(domain.expiresAt))

  // Format expiration date
  let expiresAtFormatted = formatDistanceToNow(parseISO(domain.expiresAt), { addSuffix: true })
  if (isExpired) {
    expiresAtFormatted = "Expired"
  } else {
    expiresAtFormatted = formatDistanceToNow(parseISO(domain.expiresAt), { addSuffix: false }) + " left"
  }

  // Handle domain deletion
  const handleDelete = () => {
    deleteDomain(domain.id)
    setDeleteDialogOpen(false)
  }

  // Handle domain renewal (extend by 30 days)
  const handleRenew = () => {
    const newExpiryDate = new Date(parseISO(domain.expiresAt))
    newExpiryDate.setDate(newExpiryDate.getDate() + 30)

    updateDomain(domain.id, {
      expiresAt: newExpiryDate.toISOString(),
      status: "active",
    })
  }

  // Handle edit navigation
  const handleEdit = () => {
    router.push(`/dashboard/subdomains/${domain.id}`)
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">{domain.name}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRenew}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Renew (30 days)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="flex items-center gap-1 mt-1">
            <span>{domain.url}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={() => window.open(`https://${domain.url}`, "_blank")}
            >
              <ExternalLink className="h-3 w-3" />
              <span className="sr-only">Open URL</span>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant={domain.status === "active" ? "default" : domain.status === "pending" ? "outline" : "secondary"}
              className={
                domain.status === "active"
                  ? "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary"
                  : domain.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500"
                    : "bg-destructive/20 text-destructive hover:bg-destructive/20 hover:text-destructive"
              }
            >
              {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
            </Badge>
            {domain.protected && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 text-primary" />
                <span>Protected</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <p>Created</p>
              <p className="font-medium text-foreground">{createdAtFormatted}</p>
            </div>
            <div>
              <p>Expires</p>
              <p className={`font-medium ${isExpired ? "text-destructive" : "text-foreground"}`}>
                {expiresAtFormatted}
              </p>
            </div>
          </div>
          {domain.description && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p className="line-clamp-2">{domain.description}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" size="sm" className="w-full" onClick={handleEdit}>
            Manage
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subdomain <span className="font-semibold">{domain.url}</span>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

