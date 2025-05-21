import { FC } from 'react';

interface BarProps {
  current: number;
  total: number;
}

const ProgressBar: FC<BarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="mb-4">
      <progress
        className="progress progress-primary w-full"
        value={percentage}
        max={100}
      ></progress>
      <p className="text-center mt-2">
        Pregunta {current} de {total}
      </p>
    </div>
  );
};

export default ProgressBar;
