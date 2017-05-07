import {Component, getModuleFactory, OnDestroy, OnInit} from '@angular/core';
import {Question} from "../../../types/question.type";
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";
import {QuestionService} from "../../../services/question.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ask-module-details',
  templateUrl: './module-details.component.html'
})
export class ModuleDetailsComponent implements OnInit, OnDestroy {

  selectedModule: Module;
  questionList: Question[];
  private message: string = null;
  private subscription: Subscription;

  constructor(private moduleService: ModuleService, private questionService: QuestionService, private activatedRoute: ActivatedRoute) { }

  getModule(id: string){
    this.questionList = null;
    this.moduleService.loadModule(id)
      .subscribe( result => {
        if(result){
          this.selectedModule = this.moduleService.getSelectedModule();
          this.getQuestions(id);
        }else{
          this.selectedModule = null;
          this.message = 'No such Module...';
        }
      }
      ,(err) => {
          this.selectedModule = null;
          this.message = 'No such Module...';
        });
  }

  getQuestions(id: string){
    this.questionService.loadQuestionsByModule(id)
      .subscribe(result => {
        if(result){
          this.questionList = this.questionService.getQuestionList();
          this.message = null;
        }else{
          this.questionList = null;
          this.message = 'No questions submitted...'
        }
      });
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.getModule(params['id']);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
