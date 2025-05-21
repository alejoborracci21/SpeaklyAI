// src/components/LoadingSpinner.tsx
'use client'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />
    </div>
  )
}
