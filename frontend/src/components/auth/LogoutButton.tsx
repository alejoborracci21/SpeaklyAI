'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace('/login')
    } catch (err) {
      console.error('Error cerrando sesión:', err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="btn btn-ghost text-black"
    >
      Cerrar sesión
    </button>
  )
}
