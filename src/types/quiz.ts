
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  points: number;
}

export interface QuizResult {
  totalQuestions: number;
  answeredCorrectly: number;
  totalPoints: number;
  earnedPoints: number;
  userAnswers: UserAnswer[];
}
