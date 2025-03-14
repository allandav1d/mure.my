"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, CheckCircle2 } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Invoices
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your current subscription plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-muted-foreground">$15.00 per month</p>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>10 Subdomains</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Cloudflare Protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>SSL Certificates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>API Access</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade Plan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Cycle</CardTitle>
                <CardDescription>Your billing information and next payment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Next payment</p>
                  <p className="text-2xl font-bold">$15.00</p>
                  <p className="text-sm text-muted-foreground">Due on May 15, 2025</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Billing cycle</p>
                  <p className="text-sm">Monthly (Renews automatically)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment method</p>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">•••• •••• •••• 4242</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <Button variant="outline" className="w-full sm:w-auto" size="sm">
                  Cancel Subscription
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" size="sm">
                  Update Payment
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>Your current resource usage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Subdomains</p>
                    <p className="text-sm">5 of 10</p>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Bandwidth</p>
                    <p className="text-sm">24.5 GB of 100 GB</p>
                  </div>
                  <Progress value={24.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">API Requests</p>
                    <p className="text-sm">12,543 of 50,000</p>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Usage
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </div>
              <Button className="w-full">Add Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "INV-001", date: "Apr 1, 2025", amount: "$15.00", status: "Paid" },
                  { id: "INV-002", date: "Mar 1, 2025", amount: "$15.00", status: "Paid" },
                  { id: "INV-003", date: "Feb 1, 2025", amount: "$15.00", status: "Paid" },
                  { id: "INV-004", date: "Jan 1, 2025", amount: "$15.00", status: "Paid" },
                  { id: "INV-005", date: "Dec 1, 2024", amount: "$15.00", status: "Paid" },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm">{invoice.amount}</p>
                      <Badge variant="outline" className="text-primary">
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
              <CardDescription>Detailed breakdown of your resource usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Subdomains</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Used</p>
                    <p className="text-sm font-medium">5 of 10</p>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">You are using 5 out of 10 available subdomains.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Bandwidth</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Used</p>
                    <p className="text-sm font-medium">24.5 GB of 100 GB</p>
                  </div>
                  <Progress value={24.5} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  You have used 24.5 GB out of your 100 GB monthly bandwidth allowance.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Requests</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Used</p>
                    <p className="text-sm font-medium">12,543 of 50,000</p>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  You have made 12,543 API requests out of your 50,000 monthly limit.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">SSL Certificates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Used</p>
                    <p className="text-sm font-medium">5 of Unlimited</p>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">Your plan includes unlimited SSL certificates.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

