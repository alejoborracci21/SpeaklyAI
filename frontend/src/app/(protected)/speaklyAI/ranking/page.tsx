"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Player {
  name: string
  score: number
  position: number
  isCurrentUser?: boolean
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Player[]>([])
  const router = useRouter()

  useEffect(() => {
    // Datos de ejemplo
    const mockData: Player[] = [
      { position: 1, name: "Camila", score: 1240 },
      { position: 2, name: "Lucas", score: 1150 },
      { position: 3, name: "Alejo", score: 1100, isCurrentUser: true },
      { position: 4, name: "Sofía", score: 1075 },
      { position: 5, name: "Diego", score: 1020 },
    ]
    setRanking(mockData)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">🏆 Ranking General</h1>
        <button onClick={() => router.back()} className="btn btn-outline ml-4">
          ← Volver
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="table w-full bg-base-100 shadow-md rounded-lg">
          <thead>
            <tr className="text-base-content/70">
              <th>#</th>
              <th>Nombre</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((player) => (
              <tr
                key={player.position}
                className={player.isCurrentUser ? "bg-primary text-primary-content font-bold" : ""}
              >
                <td>{player.position}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
