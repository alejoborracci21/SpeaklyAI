interface LessonProgressProps {
  currentStep: number
  totalSteps: number
}

export function LessonProgress({ currentStep, totalSteps }: LessonProgressProps) {
  return (
    <div className="flex w-full gap-1 my-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full flex-1 ${index < currentStep ? "bg-primary" : "bg-base-content opacity-20"}`}
        ></div>
      ))}
    </div>
  )
}
