import { Layout } from "@/components/layout"
import { Star, Calendar, BookOpen, Award, TrendingUp } from "lucide-react"

export default function Progress() {
  // Datos de ejemplo para el progreso
  const stats = {
    level: "Intermedio",
    xp: 450,
    xpToNextLevel: 500,
    wordsLearned: 120,
    streak: 7,
    totalPractices: 35,
  }

  // Datos de ejemplo para el gráfico de actividad
  const activityData = [
    { day: "Lun", xp: 50 },
    { day: "Mar", xp: 70 },
    { day: "Mié", xp: 30 },
    { day: "Jue", xp: 80 },
    { day: "Vie", xp: 60 },
    { day: "Sáb", xp: 40 },
    { day: "Dom", xp: 50 },
  ]

  // Datos de ejemplo para las categorías de palabras
  const categories = [
    { name: "Negocios", count: 45, percentage: 38 },
    { name: "Viajes", count: 30, percentage: 25 },
    { name: "Tecnología", count: 25, percentage: 21 },
    { name: "Vida diaria", count: 20, percentage: 16 },
  ]

  return (
    <Layout>
      <div className="grid gap-6">
        {/* Mensaje motivador */}
        <div className="alert alert-info">
          <TrendingUp className="w-5 h-5" />
          <span>¡Te faltan {stats.xpToNextLevel - stats.xp} puntos para subir de nivel!</span>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-figure text-primary">
              <Star className="w-8 h-8" />
            </div>
            <div className="stat-title">XP Total</div>
            <div className="stat-value">{stats.xp}</div>
            <div className="stat-desc">Nivel {stats.level}</div>
            <progress
              className="progress progress-primary w-full mt-2"
              value={stats.xp}
              max={stats.xpToNextLevel}
            ></progress>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-figure text-secondary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title">Palabras aprendidas</div>
            <div className="stat-value">{stats.wordsLearned}</div>
            <div className="stat-desc">En total</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-figure text-accent">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="stat-title">Racha actual</div>
            <div className="stat-value">{stats.streak} días</div>
            <div className="stat-desc">{stats.totalPractices} prácticas completadas</div>
          </div>
        </div>

        {/* Gráfico de actividad semanal */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Actividad semanal</h2>
            <div className="flex h-40 items-end justify-between mt-4">
              {activityData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-primary w-8 rounded-t-lg" style={{ height: `${item.xp}%` }}></div>
                  <div className="mt-2 text-xs">{item.day}</div>
                  <div className="text-xs font-bold">{item.xp} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categorías de palabras */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Categorías de palabras</h2>
            <div className="grid gap-4 mt-2">
              {categories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{category.name}</span>
                    <span className="text-sm opacity-70">{category.count} palabras</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={category.percentage}
                    max="100"
                  ></progress>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Award className="w-5 h-5 text-warning" />
              Logros desbloqueados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="flex flex-col items-center">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-16">
                    <span className="text-xl">🔥</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">Racha de 7 días</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-16">
                    <span className="text-xl">📚</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">100+ palabras</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="avatar placeholder">
                  <div className="bg-base-300 text-base-content rounded-full w-16">
                    <span className="text-xl">🏆</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">Top 10 ranking</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="avatar placeholder">
                  <div className="bg-base-300 text-base-content rounded-full w-16">
                    <span className="text-xl">⭐</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">Nivel avanzado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
