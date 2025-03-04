
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Quiz, QuizQuestion as QuestionType, QuizResult, UserAnswer } from '../types/quiz';
import { fetchQuizData } from '../utils/api';
import ProgressBar from './ProgressBar';
import QuizQuestionComponent from './QuizQuestion';
import QuizResults from './QuizResults';
import QuizIntro from './QuizIntro';
import { toast } from 'sonner';

enum QuizState {
  LOADING,
  INTRO,
  QUESTION,
  CHECKING_ANSWER,
  RESULTS,
}

const QuizApp: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.LOADING);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setQuizState(QuizState.LOADING);
    try {
      const quizData = await fetchQuizData();
      
      if (quizData) {
        setQuiz(quizData);
        setQuizState(QuizState.INTRO);
        toast.success("Quiz loaded successfully!");
      } else {
        toast.error("Could not load quiz data. Please try again.");
        setQuizState(QuizState.INTRO); // Fallback to intro with error message
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      toast.error("Failed to load quiz. Please try again.");
      setQuizState(QuizState.INTRO);
    }
  };

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setQuizState(QuizState.QUESTION);
  };

  const handleAnswer = (questionId: string, selectedOptionId: string) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    
    // Create a new answer object
    const userAnswer: UserAnswer = {
      questionId,
      selectedOptionId,
      isCorrect,
      points: isCorrect ? currentQuestion.points : 0,
    };

    // Add the new answer to the userAnswers array
    setUserAnswers((prev) => [...prev, userAnswer]);
    
    // Show the correct answer for a moment
    setQuizState(QuizState.CHECKING_ANSWER);

    // Wait for a moment before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        // Move to the next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setQuizState(QuizState.QUESTION);
      } else {
        // If we've reached the end of the quiz, calculate results
        calculateResults();
      }
    }, 1500);
  };

  const calculateResults = () => {
    if (!quiz) return;

    const totalQuestions = quiz.questions.length;
    const answeredCorrectly = userAnswers.filter((answer) => answer.isCorrect).length;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = userAnswers.reduce((sum, answer) => sum + answer.points, 0);

    const result: QuizResult = {
      totalQuestions,
      answeredCorrectly,
      totalPoints,
      earnedPoints,
      userAnswers,
    };

    setQuizResult(result);
    setQuizState(QuizState.RESULTS);
  };

  const restartQuiz = () => {
    startQuiz();
    toast.success("Quiz restarted! Good luck!");
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-muted rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const currentQuestion: QuestionType | undefined =
    quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80 py-10 px-4">
      <div className="quiz-container flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {quizState === QuizState.INTRO && (
            <QuizIntro
              quiz={quiz}
              onStart={startQuiz}
              isLoading={quizState === QuizState.LOADING}
            />
          )}

          {(quizState === QuizState.QUESTION || quizState === QuizState.CHECKING_ANSWER) && currentQuestion && (
            <div className="w-full">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={quiz.questions.length}
              />
              <QuizQuestionComponent
                key={currentQuestion.id} // Add a key to force re-render when question changes
                question={currentQuestion}
                onAnswer={handleAnswer}
                showAnswer={quizState === QuizState.CHECKING_ANSWER}
              />
            </div>
          )}

          {quizState === QuizState.RESULTS && quizResult && (
            <QuizResults result={quizResult} onRestart={restartQuiz} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizApp;
