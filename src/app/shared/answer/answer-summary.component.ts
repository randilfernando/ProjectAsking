import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../types/answer.type";

@Component({
  selector: 'ask-answer-summary',
  templateUrl: './answer-summary.component.html'
})
export class AnswerSummaryComponent implements OnInit {

  @Input()
  answer: Answer;

  constructor() { }

  ngOnInit() {
    console.log(this.answer);
  }

}
