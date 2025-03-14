"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/dashboard/stats-card"
import { SubdomainCard } from "@/components/dashboard/subdomain-card"
import { ActivityList } from "@/components/dashboard/activity-list"
import { Chart } from "@/components/dashboard/chart"
import { DomainForm } from "@/components/domain/domain-form"
import { useDomains } from "@/contexts/domain-context"
import { Globe, BarChart3, Clock, Shield, Plus } from "lucide-react"

export default function DashboardPage() {
  const { domains } = useDomains()

  // Get active domains
  const activeDomains = domains.filter((domain) => domain.status === "active")

  // Calculate stats
  const stats = [
    {
      title: "Active Subdomains",
      value: activeDomains.length.toString(),
      description: "Total active subdomains",
      icon: <Globe className="h-4 w-4" />,
      trend: {
        value: "+2",
        positive: true,
      },
    },
    {
      title: "Total Requests",
      value: "12.5k",
      description: "Last 30 days",
      icon: <BarChart3 className="h-4 w-4" />,
      trend: {
        value: "+24%",
        positive: true,
      },
    },
    {
      title: "Avg. Response Time",
      value: "125ms",
      description: "Last 30 days",
      icon: <Clock className="h-4 w-4" />,
      trend: {
        value: "-12%",
        positive: true,
      },
    },
    {
      title: "Blocked Threats",
      value: "243",
      description: "Last 30 days",
      icon: <Shield className="h-4 w-4" />,
      trend: {
        value: "+5%",
        positive: false,
      },
    },
  ]

  // Mock activity data
  const activities = [
    {
      id: "1",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      action: "created a new subdomain",
      target: domains[0]?.url || "api-test.mure.my",
      date: "2 days ago",
    },
    {
      id: "2",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      action: "enabled protection for",
      target: domains[0]?.url || "api-test.mure.my",
      date: "2 days ago",
    },
    {
      id: "3",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      action: "updated DNS settings for",
      target: domains[1]?.url || "demo-app.mure.my",
      date: "4 days ago",
    },
    {
      id: "4",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      action: "created a new subdomain",
      target: domains[1]?.url || "demo-app.mure.my",
      date: "5 days ago",
    },
  ]

  const trafficData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1200, 1900, 1500, 2500, 2200, 1800, 2400],
  }

  const responseTimeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [120, 145, 110, 125, 130, 115, 105],
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <DomainForm />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Total requests per day for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart title="" data={trafficData} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions on your account</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityList items={activities} />
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Your Subdomains</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeDomains.slice(0, 2).map((domain) => (
                <SubdomainCard key={domain.id} domain={domain} />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
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
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Total requests per day for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart title="" data={trafficData} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average response time in milliseconds</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart title="" data={responseTimeData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and download reports for your subdomains</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No reports available yet. Reports will be generated at the end of the month.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

