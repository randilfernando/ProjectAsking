import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";

@Component({
  selector: 'ask-manage-modules',
  templateUrl: './manage-modules.component.html',
  styles: []
})
export class ManageModulesComponent implements OnInit, AfterViewInit {

  isError: boolean = true;
  moduleList: Module[];
  selectedModule: Module = {
    _id: '',
    moduleCode: '',
    moduleName: '',
    topics: [],
    totalQuestions: 0
  };
  editingTopic = '';

  constructor(private moduleService: ModuleService) {
  }

  loadModule(moduleCode: string) {
    this.isError = true;
    this.moduleService.loadModule(moduleCode)
      .subscribe(result => {
        if (result) {
          Object.assign(this.selectedModule, this.moduleService.getSelectedModule());
          this.isError = false;
        }
      })
  }

  resetData() {
    Object.assign(this.selectedModule, this.moduleService.getSelectedModule());
  }

  addNewTopic() {
    this.selectedModule.topics.push(this.editingTopic);
    this.editingTopic = '';
  }

  removeTopic(topic: string) {
    let index: number = this.selectedModule.topics.indexOf(topic, 0);
    if (index > -1) {
      this.selectedModule.topics.splice(index, 1);
    }
  }

  updateModule() {
    this.moduleService.updateModule(this.selectedModule)
      .subscribe(result => {
        if (result) {
          $('#trigger_submitted').click();
        } else {
          $('#trigger_error').click();
        }
      }, (err) => {
        $('#trigger_error').click();
      });
  }

  deleteModule() {
    this.moduleService.deleteModule(this.selectedModule)
      .subscribe(result => {
        if (result) {
          $('#trigger_submitted').click();
          this.isError = true;
        } else {
          $('#trigger_error').click();
        }
      }, (err) => {
        $('#trigger_error').click();
      });
  }

  ngOnInit() {
    this.moduleService.loadModules()
      .subscribe(result => {
        if (result) {
          this.moduleList = this.moduleService.getModules();
        } else {
          this.moduleList = null;
        }
      })
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

}
