'use client';
import { useState } from 'react';
import QuestionCard from '@/components/questions/QuestionCard';
import ProgressBar from '@/components/questions/ProgressBar';
import ScoreDisplay from '@/components/questions/ScoreDisplay';
import { questions } from './questions';

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selected: string) => {
    if (selected === questions[current].correct) {
      // Each correct gives 1000/10 = 100 points
      setScore((s) => s + 100);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
      submitScore(score + (selected === questions[current].correct ? 100 : 0));
    }
  };

  const submitScore = async (finalScore: number) => {
    try {
      await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore }),
      });
      console.log('Score enviado', finalScore);
    } catch (err) {
      console.error('Error enviando el score', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-xl">
        {!finished ? (
          <>
            <ProgressBar current={current + 1} total={questions.length} />
            <QuestionCard
              question={questions[current]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <ScoreDisplay score={score} />
        )}
      </div>
    </div>
  );
}