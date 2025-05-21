interface ProgressHeaderProps {
  level: number
  points: number
  dailyProgress: number
  userName: string
  remainingTrainings: number
}

export function ProgressHeader({ level, points, dailyProgress, userName, remainingTrainings }: ProgressHeaderProps) {
  return (
    <div className="w-full px-4 py-6 bg-base-300 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="text-xs text-primary-content opacity-80">NIVEL {level}</span>
          <span className="text-xs text-primary-content opacity-80">Puntos</span>
          <span className="text-3xl font-bold text-primary-content">{points}</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary-content">SpeaklyAI</span>
        </div>
      </div>

      <div className="w-full mb-4">
        <div className="flex justify-between text-xs text-primary-content opacity-80 mb-1">
          <span>{dailyProgress}% para completar tu lección del día</span>
        </div>
        <progress className="progress progress-primary w-full h-2" value={dailyProgress} max="100"></progress>
      </div>

      <div className="text-primary-content">
        <h2 className="text-xl font-bold">¡Seguí así, {userName}!</h2>
        <p className="text-sm opacity-80">Solo {remainingTrainings} entrenamientos más y subís de nivel</p>
      </div>
    </div>
  )
}
