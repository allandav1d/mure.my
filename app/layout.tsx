import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { DomainProvider } from "@/contexts/domain-context"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "mure.my | Rapid Deployment Subdomain Service",
  description: "Deploy instantly. Experiment freely. Get secure subdomains on demand.",
  openGraph: {
    title: "mure.my | Rapid Deployment Subdomain Service",
    description: "Deploy instantly. Experiment freely. Get secure subdomains on demand.",
    url: "https://mure.my",
    siteName: "mure.my",
    images: [{ url: "https://mure.my/og-image.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white py-2 px-4 text-center text-sm">
            <p>
              <strong>Portfolio Concept:</strong> This is a demo project, not a real service. Use email:{" "}
              <code className="bg-red-700 px-1 rounded">demo@example.com</code> and password:{" "}
              <code className="bg-red-700 px-1 rounded">password123</code> to login. No data will persist between
              sessions.
              <a href="https://allandavid.eu" className="text-white">Back to my portfolio</a>
            </p>
          </div>
          <DomainProvider>
            <div className="mt-10">
              {children}
            </div>
            <ScrollToTop />
          </DomainProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'