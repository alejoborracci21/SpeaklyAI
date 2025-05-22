"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function LevelTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)

  // Preguntas de ejemplo para el test de nivel
  const questions = [
    {
      word: "Ubiquitous",
      options: ["Omnipresente", "Único", "Inusual"],
      correctAnswer: 0,
      translation: "Omnipresente",
    },
    {
      word: "Ephemeral",
      options: ["Eterno", "Pasajero", "Importante"],
      correctAnswer: 1,
      translation: "Pasajero/Efímero",
    },
    {
      word: "Pragmatic",
      options: ["Teórico", "Idealista", "Práctico"],
      correctAnswer: 2,
      translation: "Práctico",
    },
    {
      word: "Ambiguous",
      options: ["Ambiguo", "Claro", "Preciso"],
      correctAnswer: 0,
      translation: "Ambiguo",
    },
    {
      word: "Meticulous",
      options: ["Descuidado", "Meticuloso", "Rápido"],
      correctAnswer: 1,
      translation: "Meticuloso",
    },
    {
      word: "Eloquent",
      options: ["Silencioso", "Tímido", "Elocuente"],
      correctAnswer: 2,
      translation: "Elocuente",
    },
    {
      word: "Benevolent",
      options: ["Benévolo", "Malvado", "Neutral"],
      correctAnswer: 0,
      translation: "Benévolo",
    },
    {
      word: "Diligent",
      options: ["Perezoso", "Diligente", "Descuidado"],
      correctAnswer: 1,
      translation: "Diligente",
    },
    {
      word: "Resilient",
      options: ["Frágil", "Débil", "Resistente"],
      correctAnswer: 2,
      translation: "Resistente",
    },
    {
      word: "Verbose",
      options: ["Verboso", "Conciso", "Silencioso"],
      correctAnswer: 0,
      translation: "Verboso",
    },
  ]

  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return

    setSelectedOption(optionIndex)
    setAttempts(attempts + 1)

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      // Respuesta correcta
      const pointsEarned = attempts === 0 ? 2 : 1 // 2 puntos en primer intento, 1 en segundo
      setScore(score + pointsEarned)

      // Mostrar toast de éxito
      const toast = document.createElement("div")
      toast.className = "toast toast-top toast-end"
      toast.innerHTML = `
        <div class="alert alert-success">
          <span>¡Correcto! +${pointsEarned} puntos</span>
        </div>
      `
      document.body.appendChild(toast)

      // Eliminar el toast después de 2 segundos
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 2000)

      // Pasar a la siguiente pregunta después de un breve retraso
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    } else if (attempts >= 1) {
      // Segundo intento fallido, mostrar respuesta correcta
      setShowAnswer(true)

      // Pasar a la siguiente pregunta después de mostrar la respuesta
      setTimeout(() => {
        nextQuestion()
      }, 2000)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAttempts(0)
      setShowAnswer(false)
      setSelectedOption(null)
    } else {
      // Test completado
      setTestCompleted(true)
    }
  }

  const getLevel = () => {
    const percentage = (score / (questions.length * 2)) * 100
    if (percentage >= 80) return "Avanzado"
    if (percentage >= 50) return "Intermedio"
    return "Principiante"
  }

  const finishTest = () => {
    router.push("/home")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {!testCompleted ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">Prueba de Nivel</h2>
                <div className="badge badge-lg">
                  {currentQuestion + 1}/{questions.length}
                </div>
              </div>

              <progress
                className="progress progress-primary w-full mb-6"
                value={currentQuestion}
                max={questions.length - 1}
              ></progress>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">¿Qué significa &quot;{questions[currentQuestion].word}&quot;?</h3>
                {showAnswer && (
                  <div className="alert alert-info mt-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Traducción: {questions[currentQuestion].translation}</span>
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`btn btn-lg justify-start ${
                      selectedOption === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? "btn-success"
                          : "btn-error"
                        : "btn-outline"
                    } ${showAnswer && index === questions[currentQuestion].correctAnswer ? "btn-success" : ""}`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showAnswer}
                  >
                    {selectedOption === index ? (
                      index === questions[currentQuestion].correctAnswer ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 mr-2" />
                      )
                    ) : (
                      <span className="w-5 h-5 mr-2">{index + 1}</span>
                    )}
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="mb-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl">🎉</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">¡Bien hecho!</h2>
              <p className="text-xl mb-4">Has completado la prueba de nivel</p>

              <div className="stats shadow mx-auto mb-6">
                <div className="stat">
                  <div className="stat-title">Puntuación</div>
                  <div className="stat-value">
                    {score}/{questions.length * 2}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Nivel asignado</div>
                  <div className="stat-value text-primary">{getLevel()}</div>
                </div>
              </div>

              <button onClick={finishTest} className="btn btn-primary btn-lg">
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
