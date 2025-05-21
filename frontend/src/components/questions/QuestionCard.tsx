import { FC, useState } from 'react';

type Option = { id: string; text: string };

type Question = {
  id: number;
  prompt: string;
  options: Option[];
  correct: string;
};

interface Props {
  question: Question;
  onAnswer: (selected: string) => void;
}

const QuestionCard: FC<Props> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (id: string) => {
    if (disabled) return;
    setSelected(id);
    setDisabled(true);
    // Delay so user sees coloring before moving on
    setTimeout(() => {
      onAnswer(id);
    }, 1000);
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{question.prompt}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {question.options.map((opt) => {
            let btnClass = 'btn-outline';
            if (selected) {
              if (opt.id === selected) {
                btnClass =
                  selected === question.correct ? 'btn-success' : 'btn-error';
              } else {
                btnClass = 'opacity-50';
              }
            }
            return (
              <button
                key={opt.id}
                className={`btn ${btnClass} btn-lg w-full`}
                disabled={disabled}
                onClick={() => handleClick(opt.id)}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
