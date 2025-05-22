"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeSelector } from "../theme-selector"

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            <BookOpen className="w-6 h-6 mr-2" /> SpeaklyAI
          </Link>
        </div>

        {/* Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="#features">Características</Link></li>
            <li><Link href="#themes">Personaliza</Link></li>
            <li><Link href="#pricing">Precios</Link></li>
            <li><Link href="#contact">Contacto</Link></li>
          </ul>
        </div>

        {/* Tema + Login */}
        <div className="navbar-end space-x-2">
          <ThemeSelector />
          <Link href="/login" className="btn  btn-primary">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
