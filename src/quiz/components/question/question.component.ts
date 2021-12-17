import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { QuizService } from 'src/quiz/services/quiz.service';
import { Question } from 'src/quiz/types/question.interface';
import { QuizState } from 'src/quiz/types/quiz-state.interface';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  question$: Observable<Question>;
  answers$: Observable<string[]>;
  selectedAnswer!: string | null;
  correctAnswer!: string | null;

  correctAnswerSubscription!: Subscription;
  selectedAnswerSubscription!: Subscription;

  constructor(private quizService: QuizService) {
    this.question$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.questions[state.currentQuestionIndex])
    );

    this.answers$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.answers)
    );
  }

  ngOnInit(): void {
    this.correctAnswerSubscription = this.question$.pipe(
      map((question: Question) => question.correctAnswer)
    ).subscribe((correctAnswer: string) => {
      this.correctAnswer = correctAnswer;
    });

    this.selectedAnswerSubscription = this.quizService.state$.pipe(
      map((state: QuizState) => state.selectedAnswer)
    ).subscribe((selectedAnswer: string | null) => {
      this.selectedAnswer = selectedAnswer;
    })
  }

  ngOnDestroy(): void {
      this.correctAnswerSubscription.unsubscribe();
      this.selectedAnswerSubscription.unsubscribe();
  }

  onSelectAnswer(answer: any): void {
    this.quizService.selectAnswer(answer);
  }

  isCorrectAnswer(answer: string): boolean {
    if (!this.selectedAnswer || !this.correctAnswer) {
      return false;
    }

    return Boolean(this.selectedAnswer) && answer === this.correctAnswer;
  }

  isWrongAnswer(answer: string): boolean {
    if (!this.selectedAnswer || !this.correctAnswer) {
      return false;
    }

    return this.selectedAnswer === answer && answer !== this.correctAnswer;
  }

  isDisabledAnswer(): boolean {
    if (!this.selectedAnswer || !this.correctAnswer) {
      return false;
    }

    if (this.selectedAnswer) {
      return true;
    }
    return false;
  }
}
