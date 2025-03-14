"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubdomainCard } from "@/components/dashboard/subdomain-card"
import { DomainForm } from "@/components/domain/domain-form"
import { useDomains } from "@/contexts/domain-context"
import { Plus, Search } from "lucide-react"

export default function SubdomainsPage() {
  const { domains } = useDomains()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter domains based on search query
  const filteredDomains = domains.filter(
    (domain) =>
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Separate domains by status
  const activeDomains = filteredDomains.filter((domain) => domain.status === "active")
  const inactiveDomains = filteredDomains.filter((domain) => domain.status !== "active")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Subdomains</h2>
        <DomainForm />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subdomains..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeDomains.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveDomains.length})</TabsTrigger>
          <TabsTrigger value="all">All ({filteredDomains.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeDomains.map((domain) => (
              <SubdomainCard key={domain.id} domain={domain} />
            ))}
            <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Add Subdomain</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Create a new subdomain for your next project
              </p>
              <DomainForm
                trigger={
                  <Button className="mt-4" variant="outline">
                    Create Subdomain
                  </Button>
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inactiveDomains.length > 0 ? (
              inactiveDomains.map((domain) => <SubdomainCard key={domain.id} domain={domain} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No inactive subdomains found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.length > 0 ? (
              <>
                {filteredDomains.map((domain) => (
                  <SubdomainCard key={domain.id} domain={domain} />
                ))}
                <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Add Subdomain</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Create a new subdomain for your next project
                  </p>
                  <DomainForm
                    trigger={
                      <Button className="mt-4" variant="outline">
                        Create Subdomain
                      </Button>
                    }
                  />
                </div>
              </>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No subdomains found. Create your first one!</p>
                <DomainForm
                  trigger={
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Subdomain
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

