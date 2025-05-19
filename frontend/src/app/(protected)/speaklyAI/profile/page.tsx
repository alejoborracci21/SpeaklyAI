"use client"

import Header from "@/components/profile/header"
import Dashboard from "@/components/profile/dashboard"


export default function Profile() {

  return (
    <div className="min-h-screen bg-base-100 flex">


      {/* Mobile header */}
      <Header />
      
      {/* Dashboard */}
      <Dashboard />
    </div>
  )
}
