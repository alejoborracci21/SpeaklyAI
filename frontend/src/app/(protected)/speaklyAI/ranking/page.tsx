'use client'

import { Layout } from "@/components/layout"
import { Trophy, Medal, Award } from "lucide-react"
import { getAllUsers } from "@/lib/firebase/users"
import { getFirebaseToken } from "@/lib/firebase/getFirebaseToken"
import { useEffect, useState } from "react"

interface BackendUser {
  uidFirebase: string
  nombre: string
  email: string
  score: number
}

interface User extends BackendUser {
  rank: number
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getFirebaseToken().toString()

    const fetchData = async () => {
      try {
        const data: BackendUser[] = await getAllUsers(token)

        // Ordena por score y asigna posición (rank)
        const sorted: User[] = data
          .slice()
          .sort((a, b) => b.score - a.score)
          .map((u, idx) => ({ ...u, rank: idx + 1 }))

        setUsers(sorted)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-warning" />
      case 2:
        return <Medal className="w-5 h-5 text-secondary" />
      case 3:
        return <Award className="w-5 h-5 text-accent" />
      default:
        return <span className="font-bold">{rank}</span>
    }
  }

  return (
    <Layout>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center">
            <Trophy className="w-6 h-6 text-warning mr-2" />
            Tabla de posiciones
          </h2>

          {loading ? (
            <div className="text-center py-8">Cargando usuarios…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th className="text-center">Puntuación</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="flex items-center justify-center">
                        {getRankIcon(user.rank)}
                      </td>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td className="text-center font-bold">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="alert mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0
                   11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>La tabla de posiciones se actualiza cada 24 horas.</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
