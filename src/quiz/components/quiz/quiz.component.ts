import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { QuizService } from 'src/quiz/services/quiz.service';
import { QuizState } from 'src/quiz/types/quiz-state.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title = 'quiz component';
  questionsLength$: Observable<number>;
  currentQuestionIndex$: Observable<number>;
  showResults$: Observable<boolean>;
  correctAnswersCount$: Observable<number>;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.questionsLength$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.questions.length)
    );

    this.currentQuestionIndex$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.currentQuestionIndex + 1)
    );

    this.showResults$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.showResults)
    );

    this.correctAnswersCount$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.correctAnswersCount)
    );
  }

  nextQuestion(): void {
    this.quizService.nextQuestion();
  }
}
