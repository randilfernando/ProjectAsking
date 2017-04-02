import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../types/question.type";
import {QuestionService} from "../../../services/question.service";

@Component({
  selector: 'ask-question-summary',
  templateUrl: 'question-summary.component.html'
})
export class QuestionSummaryComponent implements OnInit {
  @Input()
  private selectedQuestion: Question;

  constructor() { }

  ngOnInit() {

  }

}
