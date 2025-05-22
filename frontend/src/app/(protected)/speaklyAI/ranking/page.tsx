import { Layout } from "@/components/layout"
import { Trophy, Medal, Award } from "lucide-react"

export default function Leaderboard() {
  // Datos de ejemplo para la tabla de posiciones
  const users = [
    { rank: 1, name: "Carlos Mendoza", username: "carlosmendoza", xp: 1250, level: "Avanzado", streak: 15 },
    { rank: 2, name: "Laura Sánchez", username: "laurasanchez", xp: 980, level: "Avanzado", streak: 12 },
    { rank: 3, name: "Miguel Ángel", username: "miguelangel", xp: 875, level: "Intermedio", streak: 9 },
    { rank: 4, name: "Sofía Rodríguez", username: "sofiarodriguez", xp: 820, level: "Intermedio", streak: 7 },
    { rank: 5, name: "Javier López", username: "javierlopez", xp: 750, level: "Intermedio", streak: 10 },
    { rank: 6, name: "Ana García", username: "anagarcia", xp: 450, level: "Intermedio", streak: 7 },
    { rank: 7, name: "Pedro Martínez", username: "pedromartinez", xp: 420, level: "Principiante", streak: 5 },
    { rank: 8, name: "Elena Gómez", username: "elenagomez", xp: 380, level: "Principiante", streak: 4 },
    { rank: 9, name: "Daniel Fernández", username: "danielfernandez", xp: 320, level: "Principiante", streak: 3 },
    { rank: 10, name: "María Torres", username: "mariatorres", xp: 290, level: "Principiante", streak: 2 },
  ]

  // Usuario actual (para destacarlo en la tabla)
  const currentUser = "anagarcia"

  // Función para renderizar el icono de rango
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

          <div className="tabs tabs-boxed my-4 justify-center">
            <a className="tab tab-active">Global</a>
            <a className="tab">Amigos</a>
            <a className="tab">Semanal</a>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Usuario</th>
                  <th className="text-center">Nivel</th>
                  <th className="text-center">XP</th>
                  <th className="text-center hidden md:table-cell">Racha</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.rank} className={user.username === currentUser ? "bg-base-200 font-medium" : ""}>
                    <td className="flex items-center justify-center">{getRankIcon(user.rank)}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-70">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge badge-primary badge-sm">{user.level}</div>
                    </td>
                    <td className="text-center font-bold">{user.xp}</td>
                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-warning">🔥</span>
                        <span>{user.streak} días</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>La tabla de posiciones se actualiza cada 24 horas.</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}
