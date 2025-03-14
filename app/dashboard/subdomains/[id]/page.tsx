"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDomains } from "@/contexts/domain-context"
import { ArrowLeft, Loader2, Trash2, Shield } from "lucide-react"
import { format, parseISO } from "date-fns"

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Domain name must be at least 3 characters" })
    .max(63, { message: "Domain name must be less than 63 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Only lowercase letters, numbers, and hyphens are allowed" }),
  ipAddress: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, { message: "Please enter a valid IP address" })
    .optional(),
  description: z.string().max(500).optional(),
  protected: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export default function DomainDetailPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { getDomain, updateDomain, deleteDomain } = useDomains()
  const router = useRouter()
  const [domain, setDomain] = useState<any>(null)

  useEffect(() => {
    if (params.id) {
      const fetchedDomain = getDomain(params.id)
      setDomain(fetchedDomain)
    }
  }, [params.id, getDomain])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: domain?.name || "",
      ipAddress: domain?.ipAddress || "",
      description: domain?.description || "",
      protected: domain?.protected || false,
    },

    // Reset form values when domain changes
    values: {
      name: domain?.name || "",
      ipAddress: domain?.ipAddress || "",
      description: domain?.description || "",
      protected: domain?.protected || false,
    },
  })

  useEffect(() => {
    form.reset({
      name: domain?.name || "",
      ipAddress: domain?.ipAddress || "",
      description: domain?.description || "",
      protected: domain?.protected || false,
    })
  }, [domain, form.reset])

  // If domain not found, redirect to subdomains page
  if (!domain) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/subdomains")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div>Domain not found</div>
      </div>
    )
  }

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // Update domain
      updateDomain(domain.id, {
        name: values.name,
        url: `${values.name}.mure.my`,
        ipAddress: values.ipAddress,
        description: values.description,
        protected: values.protected,
      })

      // Navigate back to subdomains page
      router.push("/dashboard/subdomains")
    } catch (error) {
      console.error("Error updating domain:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    deleteDomain(domain.id)
    router.push("/dashboard/subdomains")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/subdomains")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Edit Subdomain</CardTitle>
              <CardDescription>Update the details for your subdomain.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subdomain Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input {...field} placeholder="my-project" className="rounded-r-none" />
                            <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-muted-foreground">
                              .mure.my
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>This will be the subdomain for your project.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ipAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IP Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="192.168.1.1" />
                        </FormControl>
                        <FormDescription>The IP address your subdomain will point to.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="A brief description of this subdomain"
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="protected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Cloudflare Protection</FormLabel>
                          <FormDescription>Enable Cloudflare security features for this subdomain.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" type="button" onClick={() => setDeleteDialogOpen(true)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Subdomain
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you absolutely sure you want to delete the subdomain{" "}
                          <span className="font-semibold">{domain.url}</span>? This action cannot be undone and will
                          permanently remove the subdomain.
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Domain Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge
                  className={
                    domain.status === "active"
                      ? "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary mt-1"
                      : domain.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500 mt-1"
                        : "bg-destructive/20 text-destructive hover:bg-destructive/20 hover:text-destructive mt-1"
                  }
                >
                  {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                <p className="text-sm">{format(parseISO(domain.createdAt), "PPP")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Expires</h3>
                <p className="text-sm">{format(parseISO(domain.expiresAt), "PPP")}</p>
              </div>
              {domain.protected && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Protected with Cloudflare</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

