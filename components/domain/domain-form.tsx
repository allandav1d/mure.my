"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDomains, type Domain } from "@/contexts/domain-context"
import { Loader2, Plus } from "lucide-react"

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
  duration: z.enum(["30", "60", "90", "180", "365"]),
  tags: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

interface DomainFormProps {
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function DomainForm({ trigger, onSuccess }: DomainFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addDomain } = useDomains()
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ipAddress: "",
      description: "",
      protected: false,
      duration: "30",
      tags: [],
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // Calculate expiration date based on duration
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + Number.parseInt(values.duration))

      // Create new domain object
      const newDomain: Omit<Domain, "id" | "createdAt"> = {
        name: values.name,
        url: `${values.name}.mure.my`,
        status: "active",
        expiresAt: expiresAt.toISOString(),
        protected: values.protected,
        ipAddress: values.ipAddress,
        description: values.description,
        tags: values.tags,
      }

      // Add domain to context
      addDomain(newDomain)

      // Reset form and close dialog
      form.reset()
      setOpen(false)

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Navigate to the domains page
      router.push("/dashboard/subdomains")
    } catch (error) {
      console.error("Error creating domain:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Subdomain
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Subdomain</DialogTitle>
          <DialogDescription>
            Enter the details for your new subdomain. It will be instantly available once created.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Textarea {...field} placeholder="A brief description of this subdomain" className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                      { value: "30", label: "30 Days" },
                      { value: "60", label: "60 Days" },
                      { value: "90", label: "90 Days" },
                      { value: "180", label: "180 Days" },
                      { value: "365", label: "365 Days" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={field.value === option.value ? "default" : "outline"}
                        className="w-full"
                        onClick={() => field.onChange(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <FormDescription>How long you need this subdomain for.</FormDescription>
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
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Subdomain"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

