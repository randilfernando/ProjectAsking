import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";
import {Location} from "@angular/common";

@Component({
  selector: 'ask-add-module',
  templateUrl: './add-module.component.html',
  styles: []
})
export class AddModuleComponent implements OnInit, AfterViewInit {

  selectedModule: Module = {
    _id: '',
    moduleCode: '',
    moduleName: '',
    topics: [],
    totalQuestions: 0
  };
  editingTopic = '';

  constructor(private moduleService: ModuleService, private location: Location) { }

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
          this.location.back();
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
