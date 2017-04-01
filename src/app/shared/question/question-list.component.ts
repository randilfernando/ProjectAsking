import { Component, OnInit } from '@angular/core';
import {Question} from "../../types/question.type";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'ask-question-list',
  templateUrl: 'question-list.component.html',
  styleUrls: ['question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  private questionList: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.loadQuestions()
      .subscribe(result => {
        if(result){
          this.questionList = this.questionService.getQuestionList();
        }
      });
  }

}
