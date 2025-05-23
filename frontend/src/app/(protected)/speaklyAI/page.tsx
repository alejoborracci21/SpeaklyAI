import Link from "next/link"
import { Layout } from "@/components/layout"
import { Star, Crown, Gift } from "lucide-react"

export default function Home() {
  // Palabras recomendadas del día
  const recommendedWords = [
    { word: "Endeavor", translation: "Esfuerzo", example: "His endeavors to learn Spanish were successful." },
    { word: "Resilient", translation: "Resistente", example: "She is a resilient person who never gives up." },
    { word: "Serendipity", translation: "Casualidad", example: "Finding this book was pure serendipity." },
    { word: "Meticulous", translation: "Meticuloso", example: "He is meticulous about his work." },
    { word: "Eloquent", translation: "Elocuente", example: "She gave an eloquent speech at the conference." },
  ]

  return (
    <Layout>
      <div className="grid gap-6 md:gap-8">
        {/* Mensaje de bienvenida */}
        <div className="hero bg-base-200 rounded-box p-6">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">¡Bienvenido a SpeaklyAI!</h1>
              <p className="py-4">Mejora tu vocabulario en inglés día a día con nuestra plataforma impulsada por IA.</p>
              <Link href="/speaklyAI/challenge" className="btn btn-primary">
                Empezar ahora
              </Link>
            </div>
          </div>
        </div>

        {/* Nivel y progreso */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Tu progreso</h2>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-warning w-6 h-6" />
              <span className="font-bold">Novato - Nivel 1</span>
            </div>
            <progress className="progress progress-primary w-full" value="30" max="100"></progress>
            <p className="text-sm">30/100 XP para el siguiente nivel</p>
          </div>
        </div>

        {/* Recomendaciones del día */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Gift className="w-5 h-5 text-primary" />
              Palabras recomendadas del día
            </h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Palabra</th>
                    <th>Traducción</th>
                    <th className="hidden md:table-cell">Ejemplo</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendedWords.map((word, index) => (
                    <tr key={index}>
                      <td className="font-medium">{word.word}</td>
                      <td>{word.translation}</td>
                      <td className="hidden md:table-cell">{word.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Planes */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Crown className="w-5 h-5 text-warning" />
              Planes disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Plan Gratuito</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>5 prácticas diarias</li>
                    <li>Acceso a nivel básico</li>
                    <li>Recomendaciones limitadas</li>
                  </ul>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">Actual</div>
                  </div>
                </div>
              </div>
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="card-title">Plan Premium</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Prácticas ilimitadas</li>
                    <li>Todos los niveles</li>
                    <li>Recomendaciones personalizadas</li>
                    <li>Sin anuncios</li>
                  </ul>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-sm">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
