import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuizService } from 'src/quiz/services/quiz.service';
import { Question } from 'src/quiz/types/question.interface';
import { QuizState } from 'src/quiz/types/quiz-state.interface';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  title = 'question component';
  question$: Observable<Question>;

  constructor(private quizService: QuizService) {
    this.question$ = this.quizService.state$.pipe(
      map((state: QuizState) => state.questions[state.currentQuestionIndex])
    );
  }
}
