import {Component, getModuleFactory, OnInit} from '@angular/core';
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
export class ModuleDetailsComponent implements OnInit {

  selectedModule: Module;
  questionList: Question[];
  private message: string;

  constructor(private moduleService: ModuleService, private questionService: QuestionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.getModuleDetails(id);
    this.getQuestions(id);
  }

  getModuleDetails(id: number){
    this.moduleService.loadModule(id)
      .subscribe(result => {
        if(result){
          this.selectedModule = this.moduleService.getSelectedModule();
        }else{
          this.selectedModule = null;
          this.message = 'Sorry no such module.'
        }
      });
  }

  getQuestions(id: number){
    this.questionService.loadQuestionsByModule(id)
      .subscribe(result => {
        if(result){
          this.questionList = this.questionService.getQuestionList();
        }else{
          this.questionService = null;
        }
      });
  }

}
