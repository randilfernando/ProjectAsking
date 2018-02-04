import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Module} from "../../../types/module.type";
import {Question} from "../../../types/question.type";
import {ModuleService} from "../../../services/module.service";
import {QuestionService} from "../../../services/question.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'ask-add-question',
  templateUrl: './add-question.component.html',
  styles: []
})
export class AddQuestionComponent implements OnInit, AfterViewInit {
  moduleList: Module[];
  selectedModule: Module;
  question: Question = {
    _id: '',
    title: '',
    moduleCode: '',
    moduleName: '',
    topic: '',
    description: '',
    tags: [],
    totalRatings: 0,
    totalAnswers: 0,
    submittedBy: ''
  };

  hasError: boolean = false;

  constructor(private moduleService: ModuleService, private questionService: QuestionService, private authenticationService: AuthenticationService) {
  }

  loadSelectedModule(moduleCode: string) {
    this.moduleService.loadModule(moduleCode).subscribe(
      (result) => {
        if (result) {
          this.selectedModule = this.moduleService.getSelectedModule();
        } else {
          this.selectedModule = null;
        }
        this.question.topic = '';
      }
    );

    setTimeout(function () {
      $('select').material_select('destroy');
      $('select').material_select();
    }, 500);
  }

  submitQuestion() {
    if (this.selectedModule == null) {
      this.hasError = true;
    } else {
      this.hasError = false;
      this.question.moduleCode = this.selectedModule.moduleCode;
      this.question.moduleName = this.selectedModule.moduleName;
      this.question.topic = $('#topic').val();
      let chips = $('.chips-placeholder').material_chip('data');
      this.question.tags = [];
      for (let chip of chips) {
        this.question.tags.push(chip.tag);
      }
      this.questionService.addQuestion(this.question)
        .subscribe((result) => {
            if (result) {
              $('#trigger_submitted').click();
            }else{
              $('#trigger_error').click();
            }
          }
          , (err) => {
            $('#trigger_error').click();
          });
    }
  }

  ngOnInit() {
    this.moduleService.loadModules()
      .subscribe(result => {
        if (result) {
          this.moduleList = this.moduleService.getModules();
        } else {
          this.moduleList = null;
        }
      });
  }

  ngAfterViewInit() {
    $('.modal').modal();
    $('select').material_select();

    $('.chips-placeholder').material_chip({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
  }

}
