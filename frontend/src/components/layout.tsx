import type React from "react"
import { Navbar } from "./navbar"
import { BottomNav } from "./bottom-nav"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 page-transition">{children}</main>
      <BottomNav />
    </div>
  )
}
