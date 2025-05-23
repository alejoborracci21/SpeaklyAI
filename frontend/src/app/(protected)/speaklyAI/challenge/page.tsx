'use client'

import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout'
import { CheckCircle, XCircle } from 'lucide-react'
import { getFirebaseToken } from '@/lib/firebase/getFirebaseToken'
import { getAllChallenges, Challenge } from '@/lib/firebase/challenge'
import { addScoreToUser } from '@/lib/firebase/users'
import { useRouter } from 'next/navigation'

export default function Practice() {
  // — Estados de la práctica —
  const [questions, setQuestions] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(false)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const userLevel = 'Easy'

  // — Al montar, llamamos a getAllChallenges y guardamos las preguntas —
  useEffect(() => {
    const load = async () => {
      try {
        const token = await getFirebaseToken()
        if (!token) throw new Error('No se obtuvo token de Firebase')
        const data = await getAllChallenges(token.toString(), userLevel)
        setQuestions(data)
      } catch (err) {
        console.error('Error cargando preguntas:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // — Toast breve —
  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 1500)
  }

  // — Selección de opción —
  const select = (optId: string) => {
    if (disabled) return
    setSelected(optId)
    setDisabled(true)

    const isCorrect = questions[current].correct === optId
    if (isCorrect) {
      setScore((s) => s + 2)
      showToast('+2 puntos', 'success')
    } else {
      showToast('Incorrecto', 'error')
    }

    // Avanzar tras 1 segundo
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1)
        setSelected(null)
        setDisabled(false)
      } else {
        setDone(true)
      }
    }, 1000)
  }

  // — Reiniciar práctica —
  const restart = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setDisabled(false)
    setDone(false)
  }

  const sendPoints = async () => {
    const token = await getFirebaseToken()
    if (!token) throw new Error('No se obtuvo token de Firebase')
    
    await addScoreToUser(token.toString(), score)
    showToast('Felicitaciones! sumaste '+ score + "Puntos", 'success')
    restart()
    router.push('/speaklyAI/profile')
  }

  // — Renderizado condicional: loading / error / preguntas / fin —
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Layout>
    )
  }
  if (!questions.length) {
    return (
      <Layout>
        <div className="alert alert-error mx-auto my-20 text-center">
          No se pudieron cargar las preguntas.
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6">
        {/* Toast */}
        {toast && (
          <div className="toast toast-top toast-end">
            <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {toast.type === 'success' ? <CheckCircle /> : <XCircle />}
              <span className="ml-2">{toast.msg}</span>
            </div>
          </div>
        )}

        {/* Flujo de preguntas */}
        {!done ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Práctica diaria</h2>
              <span className="badge badge-lg">
                {current + 1}/{questions.length}
              </span>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">{questions[current].prompt}</h3>
                <div className="grid gap-4">
                  {questions[current].options.map((opt) => {
                    const isSel = selected === opt.id
                    const isCorr = opt.id === questions[current].correct
                    let cls = 'btn btn-outline justify-start'
                    if (disabled && isSel) cls = isCorr ? 'btn btn-success' : 'btn btn-error'
                    if (disabled && !isSel && isCorr) cls = 'btn btn-success'

                    return (
                      <button
                        key={opt.id}
                        className={`${cls} btn-lg flex items-center`}
                        onClick={() => select(opt.id)}
                        disabled={disabled}
                      >
                        <span className="w-5">{opt.id.toUpperCase()}</span>
                        <span className="ml-2">{opt.text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Tarjeta de fin */
          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body">
              <div className="avatar placeholder mx-auto mb-4">
                <div className="bg-primary text-primary-content rounded-full w-24 h-24 flex items-center justify-center text-3xl">
                  🎉
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">¡Completado!</h2>
              <p className="text-xl mb-4">
                Obtuviste {score} de {questions.length * 2} puntos
              </p>
              <button onClick={restart} className="btn btn-primary btn-lg">
                Reintentar
              </button>
               <button onClick={sendPoints} className="btn btn-primary btn-lg">
                Finalizar practica
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
