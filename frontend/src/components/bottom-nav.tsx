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
    <div className="btm-nav btm-nav-sm hidden">
      <Link href="/speaklyAI" className={isActive("/home")}>
        <Home className="h-5 w-5" />
        <span className="btm-nav-label">Inicio</span>
      </Link>
      <Link href="/speaklyAI/practice" className={isActive("/practice")}>
        <BookOpen className="h-5 w-5" />
        <span className="btm-nav-label">Práctica</span>
      </Link>
      <Link href="/speaklyAI/profile" className={isActive("/profile")}>
        <User className="h-5 w-5" />
        <span className="btm-nav-label">Perfil</span>
      </Link>
      <Link href="/speaklyAI/progress" className={isActive("/progress")}>
        <BarChart2 className="h-5 w-5" />
        <span className="btm-nav-label">Progreso</span>
      </Link>
      <Link href="/speaklyAI/ranking" className={isActive("/leaderboard")}>
        <Award className="h-5 w-5" />
        <span className="btm-nav-label">Ranking</span>
      </Link>
    </div>
  )
}
