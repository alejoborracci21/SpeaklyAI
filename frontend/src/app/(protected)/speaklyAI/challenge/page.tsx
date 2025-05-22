"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function Practice() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")

  // Preguntas de ejemplo para la práctica
  const questions = [
    {
      word: "Serendipity",
      options: ["Casualidad", "Tristeza", "Enfado"],
      correctAnswer: 0,
      translation: "Casualidad/Hallazgo afortunado",
    },
    {
      word: "Quintessential",
      options: ["Básico", "Esencial", "Complejo"],
      correctAnswer: 1,
      translation: "Quintaesencia/Lo más representativo",
    },
    {
      word: "Melancholy",
      options: ["Felicidad", "Energía", "Melancolía"],
      correctAnswer: 2,
      translation: "Melancolía",
    },
    {
      word: "Eloquent",
      options: ["Elocuente", "Silencioso", "Tímido"],
      correctAnswer: 0,
      translation: "Elocuente",
    },
    {
      word: "Perseverance",
      options: ["Rendición", "Perseverancia", "Debilidad"],
      correctAnswer: 1,
      translation: "Perseverancia",
    },
    {
      word: "Meticulous",
      options: ["Descuidado", "Rápido", "Meticuloso"],
      correctAnswer: 2,
      translation: "Meticuloso",
    },
    {
      word: "Ambiguous",
      options: ["Ambiguo", "Claro", "Preciso"],
      correctAnswer: 0,
      translation: "Ambiguo",
    },
    {
      word: "Resilient",
      options: ["Frágil", "Resistente", "Débil"],
      correctAnswer: 1,
      translation: "Resistente",
    },
    {
      word: "Pragmatic",
      options: ["Teórico", "Idealista", "Práctico"],
      correctAnswer: 2,
      translation: "Práctico",
    },
    {
      word: "Ephemeral",
      options: ["Efímero", "Eterno", "Duradero"],
      correctAnswer: 0,
      translation: "Efímero/Pasajero",
    },
  ]

  const showToastMessage = (message: string, type: "success" | "error" | "info") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return

    setSelectedOption(optionIndex)
    setAttempts(attempts + 1)

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      // Respuesta correcta
      const pointsEarned = attempts === 0 ? 2 : 1 // 2 puntos en primer intento, 1 en segundo
      setScore(score + pointsEarned)

      showToastMessage(`¡Correcto! +${pointsEarned} puntos`, "success")

      // Pasar a la siguiente pregunta después de un breve retraso
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    } else if (attempts >= 1) {
      // Segundo intento fallido, mostrar respuesta correcta
      setShowAnswer(true)
      showToastMessage(
        `La respuesta correcta es: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`,
        "info",
      )

      // Pasar a la siguiente pregunta después de mostrar la respuesta
      setTimeout(() => {
        nextQuestion()
      }, 2000)
    } else {
      // Primer intento fallido
      showToastMessage("Incorrecto. Intenta de nuevo.", "error")
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAttempts(0)
      setShowAnswer(false)
      setSelectedOption(null)
    } else {
      // Práctica completada
      setPracticeCompleted(true)
    }
  }

  const finishPractice = () => {
    router.push("/home")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {showToast && (
          <div className="toast toast-top toast-end">
            <div
              className={`alert ${
                toastType === "success" ? "alert-success" : toastType === "error" ? "alert-error" : "alert-info"
              }`}
            >
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {!practiceCompleted ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">Práctica diaria</h2>
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

              <h2 className="text-2xl font-bold mb-2">¡Completaste tu práctica!</h2>
              <p className="text-xl mb-4">+{score} puntos</p>

              <div className="stats shadow mx-auto mb-6">
                <div className="stat">
                  <div className="stat-title">Puntuación</div>
                  <div className="stat-value">
                    {score}/{questions.length * 2}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Racha</div>
                  <div className="stat-value text-secondary">1 día</div>
                </div>
              </div>

              <button onClick={finishPractice} className="btn btn-primary btn-lg">
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
