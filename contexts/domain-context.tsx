"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type DomainStatus = "active" | "pending" | "inactive" | "expired"

export interface Domain {
  id: string
  name: string
  url: string
  status: DomainStatus
  createdAt: string
  expiresAt: string
  protected: boolean
  ipAddress?: string
  description?: string
  tags?: string[]
}

interface DomainContextType {
  domains: Domain[]
  addDomain: (domain: Omit<Domain, "id" | "createdAt">) => void
  updateDomain: (id: string, domain: Partial<Domain>) => void
  deleteDomain: (id: string) => void
  getDomain: (id: string) => Domain | undefined
}

const DomainContext = createContext<DomainContextType | undefined>(undefined)

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domains, setDomains] = useState<Domain[]>([])

  // Load domains from localStorage on initial render
  useEffect(() => {
    const storedDomains = localStorage.getItem("mure-domains")
    if (storedDomains) {
      try {
        setDomains(JSON.parse(storedDomains))
      } catch (error) {
        console.error("Failed to parse stored domains:", error)
      }
    } else {
      // Set some sample domains if none exist
      const sampleDomains: Domain[] = [
        {
          id: "1",
          name: "api-test",
          url: "api-test.mure.my",
          status: "active",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          protected: true,
          ipAddress: "192.168.1.1",
          description: "API testing environment",
          tags: ["api", "testing"],
        },
        {
          id: "2",
          name: "demo-app",
          url: "demo-app.mure.my",
          status: "active",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
          protected: true,
          ipAddress: "192.168.1.2",
          description: "Client demo application",
          tags: ["demo", "client"],
        },
        {
          id: "3",
          name: "staging",
          url: "staging.mure.my",
          status: "active",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          protected: false,
          ipAddress: "192.168.1.3",
          description: "Staging environment",
          tags: ["staging"],
        },
      ]
      setDomains(sampleDomains)
      localStorage.setItem("mure-domains", JSON.stringify(sampleDomains))
    }
  }, [])

  // Save domains to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mure-domains", JSON.stringify(domains))
  }, [domains])

  // Add a new domain
  const addDomain = (domain: Omit<Domain, "id" | "createdAt">) => {
    const newDomain: Domain = {
      ...domain,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    }

    setDomains((prevDomains) => [...prevDomains, newDomain])
  }

  // Update an existing domain
  const updateDomain = (id: string, domain: Partial<Domain>) => {
    setDomains((prevDomains) => prevDomains.map((d) => (d.id === id ? { ...d, ...domain } : d)))
  }

  // Delete a domain
  const deleteDomain = (id: string) => {
    setDomains((prevDomains) => prevDomains.filter((d) => d.id !== id))
  }

  // Get a domain by ID
  const getDomain = (id: string) => {
    return domains.find((d) => d.id === id)
  }

  return (
    <DomainContext.Provider
      value={{
        domains,
        addDomain,
        updateDomain,
        deleteDomain,
        getDomain,
      }}
    >
      {children}
    </DomainContext.Provider>
  )
}

export function useDomains() {
  const context = useContext(DomainContext)
  if (context === undefined) {
    throw new Error("useDomains must be used within a DomainProvider")
  }
  return context
}

