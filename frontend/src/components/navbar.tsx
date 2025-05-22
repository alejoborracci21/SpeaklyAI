"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen } from "lucide-react"
import { ThemeSelector } from "./theme-selector"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "active" : ""
  }

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/speaklyAI" className={isActive("/home")}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/speaklyAI/challenge" className={isActive("/practice")}>
                Práctica
              </Link>
            </li>
            <li>
              <Link href="/speaklyAI/profile" className={isActive("/profile")}>
                Perfil
              </Link>
            </li>
            <li>
              <Link href="/speaklyAI/progress" className={isActive("/progress")}>
                Progreso
              </Link>
            </li>
            <li>
              <Link href="/speaklyAI/ranking" className={isActive("/leaderboard")}>
                Ranking
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/speaklyAI" className="btn btn-ghost text-xl">
          <BookOpen className="w-6 h-6 mr-2" /> SpeaklyAI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/speaklyAI" className={isActive("/home")}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/speaklyAI/challenge" className={isActive("/practice")}>
              Práctica
            </Link>
          </li>
          <li>
            <Link href="/speaklyAI/profile" className={isActive("/profile")}>
              Perfil
            </Link>
          </li>
          <li>
            <Link href="/speaklyAI/progress" className={isActive("/progress")}>
              Progreso
            </Link>
          </li>
          <li>
            <Link href="/speaklyAI/ranking" className={isActive("/leaderboard")}>
              Ranking
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSelector />
      </div>
    </div>
  )
}
