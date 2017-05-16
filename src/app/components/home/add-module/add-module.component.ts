import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-add-module',
  templateUrl: './add-module.component.html',
  styles: []
})
export class AddModuleComponent implements OnInit, AfterViewInit {

  private selectedModule: Module = {
    _id: '',
    moduleCode: '',
    moduleName: '',
    topics: [],
    totalQuestions: 0
  };
  private editingTopic = '';

  constructor(private moduleService: ModuleService, private activatedRouter: Router) { }

  addNewTopic(){
    this.selectedModule.topics.push(this.editingTopic);
    this.editingTopic = '';
  }

  removeTopic(topic: string){
    let index: number = this.selectedModule.topics.indexOf(topic, 0);
    if (index > -1) {
      this.selectedModule.topics.splice(index, 1);
    }
  }

  addModule(){
    this.moduleService.addModule(this.selectedModule)
      .subscribe(result => {
        if(result){
          $('#trigger_submitted').click();
        }else{
          $('#trigger_error').click();
        }
      }, err => {
        $('#trigger_error').click();
      });
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.modal').modal();
    })
  }

}
