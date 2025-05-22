import { FC } from 'react';

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

const QuestionCard: FC<Props> = ({ question, onAnswer }) => (
  <div className="card bg-base-100 shadow-xl mb-4">
    <div className="card-body">
      <h2 className="card-title">{question.prompt}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            className="btn btn-outline btn-lg"
            onClick={() => onAnswer(opt.id)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default QuestionCard;