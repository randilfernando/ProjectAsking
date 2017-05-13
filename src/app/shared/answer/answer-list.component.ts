import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../types/answer.type";
import {AuthenticationService} from "../../services/authentication.service";
import {QuestionService} from "../../services/question.service";
import {serializePaths} from "@angular/router/src/url_tree";

@Component({
  selector: 'ask-answer-list',
  templateUrl: './answer-list.component.html',
  styles: []
})
export class AnswerListComponent implements OnInit {

  @Input() answerList: Answer[];
  @Input() editEnabled: boolean = false;
  @Input() loggedOnEmail: string;

  constructor() { }

  ngOnInit() {
  }

}
