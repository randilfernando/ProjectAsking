import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../types/question.type";

@Component({
  selector: 'ask-question-list',
  templateUrl: 'question-list.component.html'
})
export class QuestionListComponent implements OnInit {

  @Input()
  questionList: Question[];

  constructor() { }

  ngOnInit() {

  }

}
