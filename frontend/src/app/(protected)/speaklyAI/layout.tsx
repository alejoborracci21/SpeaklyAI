// app/(protected)/layout.tsx  (o donde tengas tu layout)
'use client'

import React from 'react'
import LogoutButton from '@/components/auth/LogoutButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black font-poppins">SpeaklyAI</h1>
          <LogoutButton />
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
