"use client"
import { VolumeUp } from "./volume-up"
import { useRouter } from "next/navigation"


interface QuestionCardProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  onPlayAudio?: () => void
}

export function QuestionCard({ question, options, onAnswer, onPlayAudio }: QuestionCardProps) {
  const router = useRouter()
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-lg">{question}</h2>
          {onPlayAudio && (
            <button onClick={onPlayAudio} className="btn btn-circle btn-sm btn-ghost" aria-label="Play pronunciation">
              <VolumeUp />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              className="btn btn-block btn-outline hover:btn-primary text-center py-4"
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="card-actions justify-between mt-6">
          <button className="btn btn-ghost btn-sm text-primary" onClick={() => router.back()}>&lt; Atrás</button>
          <button className="btn btn-primary btn-sm">Siguiente &gt;</button>
        </div>
      </div>
    </div>
  )
}
