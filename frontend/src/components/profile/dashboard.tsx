"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link";


export default function Dashboard() {
  const [userName] = useState("Usuario");
  const [userLevel] = useState("intermedio");
  const [progressToNextLevel] = useState(65);

  return (
    <div className="flex-1 md:p-8 p-4 md:pt-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">¡Bienvenido, {userName}!</h1>
            <p className="text-base-content/70">
              Tu nivel actual es:{" "}
              <span className="font-medium text-primary">{userLevel}</span>
            </p>
          </div>
          <Link href="/speaklyAI/challenge" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Practicar
          </Link>
        </div>

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Progreso hacia el próximo nivel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card bg-base-100 shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Progreso hacia el próximo nivel
              </h2>
              <p className="text-base-content/70 mb-4">
                Estás a {100 - progressToNextLevel}% de alcanzar el siguiente
                nivel.
              </p>

              <div className="w-full bg-base-300 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="text-right mt-2 text-sm text-base-content/70">
                {progressToNextLevel}% completado
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Estadísticas de Aprendizaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="stat bg-base-200 rounded-box"
            >
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M12 20V10" />
                  <path d="M18 20V4" />
                  <path d="M6 20v-4" />
                </svg>
              </div>
              <div className="stat-title">Palabras Aprendidas</div>
              <div className="stat-value text-primary">25</div>
              <div className="stat-desc">
                ↗︎ 14 (30%) más que la semana pasada
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="stat bg-base-200 rounded-box"
            >
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <div className="stat-title">Días Consecutivos</div>
              <div className="stat-value text-secondary">7</div>
              <div className="stat-desc">¡Sigue así!</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="stat bg-base-200 rounded-box"
            >
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="stat-title">Precisión</div>
              <div className="stat-value text-accent">86%</div>
              <div className="stat-desc">↗︎ 5% más que la semana pasada</div>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tu posición en el ranking</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100 shadow-lg p-6"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 mb-1">Posición actual</p>
                  <h3 className="text-3xl font-bold text-primary">#5</h3>
                </div>
                <div className="text-right">
                  <p className="text-base-content/70 mb-1">Posicionamiento de hoy</p>
                  <span className="text-green-500 font-medium">
                    ⬆ Subiste 2 puestos
                  </span>
                  {/* Si bajó, usar: <span className="text-red-500">⬇ Bajaste 1 puesto</span> */}
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <Link href="/speaklyAI/ranking" className="btn btn-outline btn-sm">
                  Ver Ranking
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}