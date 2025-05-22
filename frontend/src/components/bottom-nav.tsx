"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, User, BarChart2, Award } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "active" : ""
  }

  return (
    <div className="btm-nav btm-nav-sm lg:hidden">
      <Link href="/home" className={isActive("/home")}>
        <Home className="h-5 w-5" />
        <span className="btm-nav-label">Inicio</span>
      </Link>
      <Link href="/practice" className={isActive("/practice")}>
        <BookOpen className="h-5 w-5" />
        <span className="btm-nav-label">Práctica</span>
      </Link>
      <Link href="/profile" className={isActive("/profile")}>
        <User className="h-5 w-5" />
        <span className="btm-nav-label">Perfil</span>
      </Link>
      <Link href="/progress" className={isActive("/progress")}>
        <BarChart2 className="h-5 w-5" />
        <span className="btm-nav-label">Progreso</span>
      </Link>
      <Link href="/leaderboard" className={isActive("/leaderboard")}>
        <Award className="h-5 w-5" />
        <span className="btm-nav-label">Ranking</span>
      </Link>
    </div>
  )
}
