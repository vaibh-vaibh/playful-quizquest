
import { Quiz } from '../types/quiz';
import { toast } from 'sonner';

export const API_URL = 'https://api.jsonserve.com/Uw5CrX';

export async function fetchQuizData(): Promise<Quiz | null> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Quiz;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    toast.error('Failed to load quiz. Please try again.');
    return null;
  }
}
