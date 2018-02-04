import {Component, OnDestroy, OnInit} from '@angular/core';
import {Question} from "../../../types/question.type";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'ask-search-questions',
  templateUrl: './search-questions.component.html',
  styles: []
})
export class SearchQuestionsComponent implements OnInit, OnDestroy {

  questionList: Question[];
  message: string = null;
  private subscription: Subscription;

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => this.searchQuestions(params['keyword'])
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  searchQuestions(keyword: string){
    this.questionList = null;
    this.message = null;
    this.questionService.searchQuestions(keyword)
      .subscribe(result => {
        if(result){
          this.questionList = this.questionService.getQuestionList();
        }else{
          this.message = 'Sorry no questions...';
        }
      });
  }

}
