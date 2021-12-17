import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/quiz/services/quiz.service';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  title = 'answer component';
  @Input() answer: string;
  @Input() index: number;
  @Input() selectedAnswer: string;
  @Input() correctAnswer: string;

  @Output('selectAnswer') selectAnswerEvent = new EventEmitter<string>();

  letterMapping: string[] = ['A', 'B', 'C', 'D'];

  // constructor(private quizService: QuizService) {}

  @HostListener('click', ['$event'])
  onClick() {
    this.selectAnswerEvent.emit(this.answer);
  }
}
