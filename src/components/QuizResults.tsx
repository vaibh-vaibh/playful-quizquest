
import React from 'react';
import { motion } from 'framer-motion';
import { QuizResult } from '../types/quiz';
import { Award, Check, Star, Trophy } from 'lucide-react';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, onRestart }) => {
  const scorePercentage = Math.round(
    (result.earnedPoints / result.totalPoints) * 100
  );
  
  const getMessage = () => {
    if (scorePercentage >= 90) return "Outstanding! You're a genius!";
    if (scorePercentage >= 70) return "Great job! You know your stuff!";
    if (scorePercentage >= 50) return "Good effort! Keep learning!";
    return "Keep practicing! You'll get better!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="glass-container p-8 mb-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            {scorePercentage >= 70 ? (
              <div className="rounded-full p-4 bg-accent/10 text-accent">
                <Trophy size={48} />
              </div>
            ) : (
              <div className="rounded-full p-4 bg-accent/10 text-accent">
                <Award size={48} />
              </div>
            )}
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-muted-foreground">{getMessage()}</p>
        </div>

        <div className="grid gap-4 mb-8">
          <div className="scorecard">
            <div className="flex items-center">
              <Check className="mr-2 text-accent" />
              <span>Correct Answers</span>
            </div>
            <span className="font-semibold">
              {result.answeredCorrectly} / {result.totalQuestions}
            </span>
          </div>
          
          <div className="scorecard">
            <div className="flex items-center">
              <Star className="mr-2 text-accent" />
              <span>Total Score</span>
            </div>
            <span className="font-semibold">
              {result.earnedPoints} / {result.totalPoints} points
            </span>
          </div>
        </div>

        <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: `${scorePercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${scorePercentage}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="text-center font-medium text-lg">{scorePercentage}%</div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="btn-primary w-full max-w-xs mx-auto"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResults;
