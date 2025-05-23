"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { questions } from "./questions"
import { getFirebaseToken } from "@/lib/firebase/getFirebaseToken"
import { addScoreToUser } from "@/lib/firebase/users"
import { toast } from "sonner"
export default function LevelTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (showAnswer) return

    setSelectedOption(optionId)
    setAttempts(prev => prev + 1)

    if (optionId === questions[currentQuestion].correct) {
      // Respuesta correcta: sumar 75 puntos
      setScore(prev => prev + 75)

      // Mostrar toast de éxito
      const toast = document.createElement("div")
      toast.className = "toast toast-top toast-end"
      toast.innerHTML = `
        <div class=\"alert alert-success\">
          <span>¡Correcto! +75 puntos</span>
        </div>
      `
      document.body.appendChild(toast)
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 2000)

      setTimeout(() => nextQuestion(), 1000)
    } else if (attempts >= 1) {
      // Segundo intento fallido, mostrar respuesta
      setShowAnswer(true)
      setTimeout(() => nextQuestion(), 2000)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setAttempts(0)
      setShowAnswer(false)
      setSelectedOption(null)
    } else {
      setTestCompleted(true)
    }
  }

  const getLevel = () => {
    const totalPoints = questions.length * 75
    const percentage = (score / totalPoints) * 100
    if (percentage >= 80) return "Avanzado"
    if (percentage >= 50) return "Intermedio"
    return "Principiante"
  }

  const finishTest = async () => {
    const token = await getFirebaseToken()
    console.log("Token:", token)
    if (!token) return toast.error("Error al obtener el token del usuario")
    await addScoreToUser(token.toString(), score)
    router.push("/speaklyAI/profile")
  }

  const correctText = () => {
    const correctOption = questions[currentQuestion].options.find(
      opt => opt.id === questions[currentQuestion].correct
    )
    return correctOption?.text || ""
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full">
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
                value={currentQuestion + 1}
                max={questions.length}
              ></progress>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {questions[currentQuestion].prompt}
                </h3>
                {showAnswer && (
                  <div className="alert alert-info mt-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Respuesta: {correctText()}</span>
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map(option => (
                  <button
                    key={option.id}
                    className={`btn btn-lg justify-start ${
                      selectedOption === option.id
                        ? option.id === questions[currentQuestion].correct
                          ? "btn-success"
                          : "btn-error"
                        : "btn-outline"
                    } ${showAnswer && option.id === questions[currentQuestion].correct ? "btn-success" : ""}`}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={showAnswer}
                  >
                    {selectedOption === option.id ? (
                      option.id === questions[currentQuestion].correct ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 mr-2" />
                      )
                    ) : (
                      <span className="w-5 h-5 mr-2">{option.id.toUpperCase()}</span>
                    )}
                    {option.text}
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
                    {score}/{questions.length * 75}
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
    </div>
  )
}