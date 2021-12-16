import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { QuizState } from '../types/quiz-state.interface';
import mockData from '../data';

@Injectable()
export class QuizService {
  state$ = new BehaviorSubject<QuizState>({
    questions: mockData,
    currentQuestionIndex: 0,
    showResults: false,
    correctAnswersCount: 0,
  });

  setState(partialState: Partial<QuizState>): void {
    this.state$.next({ ...this.state$.getValue(), ...partialState });
  }

  getState(): QuizState {
    return this.state$.getValue();
  }

  nextQuestion(): void {
    const state = this.getState();

    // if current question is equal to question length show results (true) otherwise don't (false)
    const showResults = state.currentQuestionIndex === state.questions.length - 1;
    state.showResults = showResults;

    const currentQuestionIndex = state.showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;

    this.setState({
      currentQuestionIndex,
    });
  }
}
