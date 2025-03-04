
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion as QuestionType } from '../types/quiz';
import OptionCard from './OptionCard';

interface QuizQuestionProps {
  question: QuestionType;
  onAnswer: (questionId: string, selectedOptionId: string) => void;
  showAnswer: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  showAnswer,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Reset the selected option when the question changes
  useEffect(() => {
    setSelectedOptionId(null);
  }, [question.id]);

  const handleSelectOption = (optionId: string) => {
    if (!selectedOptionId && !showAnswer) {
      setSelectedOptionId(optionId);
      onAnswer(question.id, optionId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="question-text">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selectedOptionId === option.id}
            disabled={!!selectedOptionId || showAnswer}
            showAnswer={showAnswer}
            isCorrect={option.id === question.correctOptionId}
            onSelect={handleSelectOption}
          />
        ))}
      </div>
      {showAnswer && (
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <p className="font-medium mb-1">Points: {question.points}</p>
          <p className="text-sm text-muted-foreground">
            {selectedOptionId === question.correctOptionId
              ? "Correct! Good job."
              : "Incorrect. The correct answer is highlighted."}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default QuizQuestion;
