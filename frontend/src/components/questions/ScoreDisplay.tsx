import { FC, useMemo } from 'react';

interface ScoreProps {
  score: number;
}

const ScoreDisplay: FC<ScoreProps> = ({ score }) => {
  const level = useMemo(() => {
    if (score < 500) return 'Inicial';
    if (score < 900) return 'Intermedio';
    return 'Avanzado';
  }, [score]);

  return (
    <div className="card bg-base-100 shadow-xl p-6 text-center">
      <h2 className="text-3xl font-bold mb-2">Tu puntaje: {score}</h2>
      <p className="text-xl">Nivel: {level}</p>
      <button
        className="btn btn-primary mt-4"
        onClick={() => location.reload()}
      >
        Volver a intentar
      </button>
    </div>
  );
};

export default ScoreDisplay;
