import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    // console.log('ans', this.answer);
  }
}
