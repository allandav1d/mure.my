"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/dashboard/chart"
import { ChartAdvanced } from "@/components/dashboard/chart-advanced"
import { BarChart3, Download, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d")

  // Sample data for charts
  const trafficData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1200, 1900, 1500, 2500, 2200, 1800, 2400],
  }

  const responseTimeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [120, 145, 110, 125, 130, 115, 105],
  }

  const bandwidthData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [2.1, 3.5, 2.8, 4.2, 3.9, 3.2, 4.5],
  }

  const errorRateData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1.2, 0.8, 1.5, 0.5, 0.9, 1.1, 0.7],
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Monitor your subdomain performance and traffic.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">+24% from last {dateRange === "24h" ? "day" : "week"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125ms</div>
                <p className="text-xs text-muted-foreground">-12% from last {dateRange === "24h" ? "day" : "week"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bandwidth Used</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5 GB</div>
                <p className="text-xs text-muted-foreground">+18% from last {dateRange === "24h" ? "day" : "week"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.8%</div>
                <p className="text-xs text-muted-foreground">-0.3% from last {dateRange === "24h" ? "day" : "week"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ChartAdvanced title="Traffic Overview" description="Total requests per day" data={trafficData} />
            <ChartAdvanced
              title="Response Time"
              description="Average response time in milliseconds"
              data={responseTimeData}
              color="secondary"
            />
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your subdomain traffic.</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart title="" data={trafficData} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Sources driving traffic to your subdomains.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Google", value: "45%", change: "+5.2%" },
                    { name: "Direct", value: "30%", change: "-2.1%" },
                    { name: "GitHub", value: "12%", change: "+1.8%" },
                    { name: "Twitter", value: "8%", change: "+3.2%" },
                    { name: "Other", value: "5%", change: "-0.5%" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                      <div className={`text-sm ${item.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Traffic by country and region.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "United States", value: "38%", change: "+2.2%" },
                    { name: "United Kingdom", value: "15%", change: "+1.1%" },
                    { name: "Germany", value: "12%", change: "+0.8%" },
                    { name: "India", value: "10%", change: "+3.2%" },
                    { name: "Canada", value: "8%", change: "-0.5%" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                      <div className={`text-sm ${item.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Response times and bandwidth usage.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Chart title="Response Time (ms)" data={responseTimeData} />
              <Chart title="Bandwidth Usage (GB)" data={bandwidthData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Subdomain</CardTitle>
              <CardDescription>Comparison of performance metrics across your subdomains.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "api-test.mure.my", responseTime: "95ms", bandwidth: "8.2GB", status: "Excellent" },
                  { name: "demo-app.mure.my", responseTime: "125ms", bandwidth: "12.5GB", status: "Good" },
                  { name: "staging.mure.my", responseTime: "110ms", bandwidth: "3.8GB", status: "Excellent" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Response Time: {item.responseTime}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-muted-foreground">Bandwidth: {item.bandwidth}</p>
                      <p className={`text-sm ${item.status === "Excellent" ? "text-primary" : "text-yellow-500"}`}>
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Rate</CardTitle>
              <CardDescription>Percentage of requests resulting in errors.</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart title="" data={errorRateData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Breakdown</CardTitle>
              <CardDescription>Types of errors encountered by your subdomains.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { code: "404", description: "Not Found", count: 145, percentage: "45%" },
                  { code: "500", description: "Internal Server Error", count: 89, percentage: "28%" },
                  { code: "403", description: "Forbidden", count: 52, percentage: "16%" },
                  { code: "429", description: "Too Many Requests", count: 35, percentage: "11%" },
                ].map((item) => (
                  <div key={item.code} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.code} - {item.description}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.count} occurrences</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.percentage}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

