import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Network, Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse-glow"></div>
            <div className="relative flex items-center justify-center">
              <Network className="h-24 w-24 text-primary" />
              <div className="absolute text-6xl font-bold text-foreground">404</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Page Not Found</h1>

          <p className="text-muted-foreground mb-8">
            The subdomain you're looking for doesn't exist or has expired. Check the URL or try navigating back to the
            homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-4 rounded-lg border border-border/50 bg-card/50">
            <h2 className="text-lg font-medium mb-2">Looking for something?</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search subdomains..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
              />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Popular pages:{" "}
              <Link href="/dashboard/subdomains" className="text-primary hover:underline">
                Subdomains
              </Link>
              ,{" "}
              <Link href="/dashboard/analytics" className="text-primary hover:underline">
                Analytics
              </Link>
              ,{" "}
              <Link href="/dashboard/settings" className="text-primary hover:underline">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

