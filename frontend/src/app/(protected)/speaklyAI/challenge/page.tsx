
"use client"

import { useState } from "react"
import { ProgressHeader } from "@/components/challenge/progress-header"
import { LessonProgress } from "@/components/challenge/lesson-progress"
import { QuestionCard } from "@/components/challenge/question-card"

export default function LessonPage() {
  const [currentStep] = useState(3)

  // Datos de ejemplo
  const userData = {
    level: 1,
    points: 590,
    dailyProgress: 45,
    userName: "Laura",
    remainingTrainings: 3,
  }

  const lessonData = {
    totalSteps: 6,
    currentQuestion: "What is the correct meaning of 'endeavor'?",
    options: ["Esforzarse", "Entender", "Endurecer", "Encantar"],
  }

  const handleAnswer = (answer: string) => {
    console.log("Selected answer:", answer)
    // Aquí iría la lógica para procesar la respuesta
  }

  const handlePlayAudio = () => {
    console.log("Playing audio pronunciation")
    // Aquí iría la lógica para reproducir el audio
  }

  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center">
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <ProgressHeader
          level={userData.level}
          points={userData.points}
          dailyProgress={userData.dailyProgress}
          userName={userData.userName}
          remainingTrainings={userData.remainingTrainings}
        />

        <div className="mt-6">
          <LessonProgress currentStep={currentStep} totalSteps={lessonData.totalSteps} />

          <QuestionCard
            question={lessonData.currentQuestion}
            options={lessonData.options}
            onAnswer={handleAnswer}
            onPlayAudio={handlePlayAudio}
          />
        </div>
      </div>
    </div>
  )
}
