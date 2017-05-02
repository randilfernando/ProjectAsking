import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../types/question.type";

@Component({
  selector: 'ask-question-summary',
  templateUrl: 'question-summary.component.html'
})
export class QuestionSummaryComponent implements OnInit {
  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {

  }

}
