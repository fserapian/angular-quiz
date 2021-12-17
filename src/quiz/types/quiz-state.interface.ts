import { Question } from './question.interface';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  showResults: boolean;
  correctAnswersCount: number;
  answers: string[];
  selectedAnswer: string | null;
  correctAnswer: string | null;
}
