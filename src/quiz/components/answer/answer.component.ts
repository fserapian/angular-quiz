import { Component, HostListener, Input, OnInit } from '@angular/core';
import { QuizService } from 'src/quiz/services/quiz.service';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  title = 'answer component';
  @Input() answer!: string;
  @Input() index!: number;

  letterMapping: string[] = ['A', 'B', 'C', 'D'];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    // console.log('ans', this.answer);
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.quizService.selectAnswer(this.answer);
  }

  // onClick() {
  //   console.log('clicked');
  // }
}
