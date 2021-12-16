import { Question } from './question.interface';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  showResults: boolean;
  correctAnswersCount: number;
}
