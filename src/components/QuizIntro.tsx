
import React from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '../types/quiz';
import { BookOpen, Info } from 'lucide-react';

interface QuizIntroProps {
  quiz: Quiz;
  onStart: () => void;
  isLoading: boolean;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ quiz, onStart, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="glass-container p-8 mb-12">
        <div className="flex justify-center mb-8">
          <div className="rounded-full p-4 bg-accent/10">
            <BookOpen size={40} className="text-accent" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">{quiz.title}</h1>
        <p className="text-center text-muted-foreground mb-8">
          {quiz.description}
        </p>
        
        <div className="bg-secondary/50 p-4 rounded-lg flex mb-8">
          <Info size={20} className="text-accent mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm leading-relaxed">
              This quiz contains {quiz.questions.length} questions. You'll earn points for each correct answer.
              Take your time and choose carefully!
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onStart}
            disabled={isLoading}
            className="btn-primary px-10 py-3 text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Start Quiz</span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-white/10 transition-all duration-300 group-hover:h-full z-0"></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizIntro;
