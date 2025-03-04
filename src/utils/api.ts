
import { Quiz, QuizOption, QuizQuestion } from '../types/quiz';
import { toast } from 'sonner';

export const API_URL = 'https://opentdb.com/api.php?amount=10&category=12&type=multiple';

export async function fetchQuizData(): Promise<Quiz | null> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API response is valid
    if (data.response_code !== 0 || !data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid quiz data format');
    }
    
    // Transform OpenTDB data format to our Quiz format
    const transformedQuiz: Quiz = {
      id: 'opentdb-music-quiz',
      title: 'Music Trivia Quiz',
      description: 'Test your knowledge about music with these challenging questions!',
      questions: data.results.map((question: any, index: number): QuizQuestion => {
        // Create an array with all options (correct + incorrect)
        const allOptions = [
          ...question.incorrect_answers.map((answer: string, i: number): QuizOption => ({
            id: `option-${index}-${i}`,
            text: decodeHTMLEntities(answer)
          }))
        ];
        
        // Insert the correct answer at a random position
        const correctOption: QuizOption = {
          id: `option-${index}-correct`,
          text: decodeHTMLEntities(question.correct_answer)
        };
        
        // Randomly insert the correct answer
        const randomPosition = Math.floor(Math.random() * (allOptions.length + 1));
        allOptions.splice(randomPosition, 0, correctOption);
        
        return {
          id: `question-${index}`,
          question: decodeHTMLEntities(question.question),
          options: allOptions,
          correctOptionId: correctOption.id,
          points: 10, // Default points for each question
        };
      })
    };
    
    return transformedQuiz;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    toast.error('Failed to load quiz. Please try again.');
    return null;
  }
}

// Helper function to decode HTML entities in the API response
function decodeHTMLEntities(text: string): string {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
