"use client"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Zap, Shield, Clock, Globe, Code, Server, CheckCircle2, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="top" className="relative overflow-hidden py-20 md:py-32 hero-gradient">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Deploy Instantly. <span className="gradient-text">Experiment Freely.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get instant access to secure subdomains, pre-configured with Cloudflare, so you can focus on
                    building, not configuring.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="gap-1">
                    <a href="/login">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href="#features"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center lg:justify-end">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse-glow"></div>
                  <div className="relative h-full w-full rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                    <div className="flex h-full w-full flex-col rounded-lg border border-border/50 bg-background p-4">
                      <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                        <div className="flex gap-1">
                          <div className="h-3 w-3 rounded-full bg-destructive/70"></div>
                          <div className="h-3 w-3 rounded-full bg-muted"></div>
                          <div className="h-3 w-3 rounded-full bg-muted"></div>
                        </div>
                        <div className="flex-1 text-center text-xs text-muted-foreground">Terminal</div>
                      </div>
                      <div className="flex-1 p-2 font-mono text-xs">
                        <p className="text-muted-foreground">$ mure create my-project</p>
                        <p className="text-primary">✓ Creating subdomain: my-project.mure.my</p>
                        <p className="text-primary">✓ Configuring Cloudflare protection</p>
                        <p className="text-primary">✓ Setting up SSL certificate</p>
                        <p className="text-foreground mt-2">Your subdomain is ready!</p>
                        <p className="text-foreground">https://my-project.mure.my</p>
                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                          <span className="animate-pulse">_</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stop configuring and start innovating. Get your projects online in seconds with our powerful features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Instant Deployment</h3>
                      <p className="text-muted-foreground">
                        Get your subdomain up and running in seconds, not minutes or hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Cloudflare Protection</h3>
                      <p className="text-muted-foreground">
                        Every subdomain comes with Cloudflare security and performance features.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Flexible Duration</h3>
                      <p className="text-muted-foreground">
                        Pay only for what you need, whether it's a day, a week, or a month.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Globe className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Custom Domains</h3>
                      <p className="text-muted-foreground">
                        Choose from a variety of domain options or bring your own.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Code className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Developer API</h3>
                      <p className="text-muted-foreground">
                        Automate subdomain creation and management with our robust API.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Server className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Analytics & Monitoring</h3>
                      <p className="text-muted-foreground">
                        Track traffic, performance, and security metrics for all your subdomains.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Use Cases</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Perfect For Developers</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how mure.my can accelerate your development workflow and simplify your testing process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Testing New Features</h3>
                <p className="text-muted-foreground">
                  Deploy feature branches to separate subdomains for isolated testing and client review.
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Isolated environments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Easy sharing with stakeholders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Quick teardown when done</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-secondary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Staging Environments</h3>
                <p className="text-muted-foreground">
                  Create dedicated staging environments that mirror production for thorough testing.
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Production-like setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Secure access controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Automated deployment options</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-secondary"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Client Prototypes</h3>
                <p className="text-muted-foreground">
                  Share working prototypes with clients using professional-looking URLs.
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Professional presentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Password protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Feedback collection tools</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Temporary Landing Pages</h3>
                <p className="text-muted-foreground">
                  Launch temporary landing pages for events, campaigns, or product launches.
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Quick setup and teardown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Traffic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Form submission handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your needs. All plans include Cloudflare protection and SSL certificates.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">Perfect for small projects and experiments</p>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>3 Subdomains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Cloudflare Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>SSL Certificates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Basic Analytics</span>
                  </li>
                </ul>
                <Button asChild className="mt-auto">
                  <a href="/login">Get Started</a>
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border-2 border-primary bg-card/50 p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground rounded-full">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For developers with multiple projects</p>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>10 Subdomains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Cloudflare Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>SSL Certificates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>API Access</span>
                  </li>
                </ul>
                <Button asChild className="mt-auto">
                  <a href="/login">Get Started</a>
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Team</h3>
                  <p className="text-muted-foreground">For teams and organizations</p>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$39</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>30 Subdomains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Cloudflare Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>SSL Certificates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Team Management</span>
                  </li>
                </ul>
                <Button asChild className="mt-auto">
                  <a href="/login">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Deployment?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Get started with mure.my today and experience the fastest way to deploy your projects.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-1">
                  <a href="/login">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

