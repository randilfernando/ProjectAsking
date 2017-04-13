import {
  AfterViewInit, Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import {ModuleService} from "../../../services/module.service";
import {Module} from "../../../types/module.type";
import {Question} from "../../../types/question.type";
import {QuestionService} from "../../../services/question.service";

@Component({
  selector: 'ask-question-details',
  templateUrl: './question-details.component.html',
})
export class QuestionDetailsComponent implements OnInit, AfterViewInit {
  private selectedModule: Module;
  private moduleList: Module[];
  private question: Question = {
    _id: '', title: '', moduleCode: '', moduleName: '', description: '', tags: [], totalRatings: 0, totalAnswers: 0, submittedBy: ''
  };

  constructor(private moduleService: ModuleService, private questionService: QuestionService) {
  }

  loadSelectedModule(moduleCode: string) {
    moduleCode = moduleCode.slice(0, 6);
    this.moduleService.loadModule(moduleCode).subscribe(
      (result) => {
        if (result) {
          this.selectedModule = this.moduleService.getSelectedModule();
        } else {
          this.selectedModule = null;
        }
      }
    );

    setTimeout(function () {
      $('select').material_select('destroy');
      $('select').material_select();
    }, 1000);
  }

  submitQuestion(){
    this.question.moduleCode = this.selectedModule.moduleCode;
    this.question.moduleName = this.selectedModule.moduleName;
    this.question.submittedBy = 'Randil Fernando'; //can remove after authentication implemented
    let chips = $('.chips-placeholder').material_chip('data');
    for (let chip of chips){
      this.question.tags.push(chip.tag);
    }
    console.log(this.question);
    this.questionService.addQuestion(this.question).subscribe(
      (result) => {
        if(result){
          console.log('Success');
        }
      }
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.moduleService.loadModules().subscribe(
      (result) => {
        if (result) {
          this.moduleList = this.moduleService.getModules();
          var item = {};
          for (let module of this.moduleList) {
            item[module.moduleCode + ' - ' + module.moduleName] = null;
          }

          $(document).ready(function () {
            $('select').material_select();

            $('#moduleSearch').autocomplete({
              data: item,
              limit: 20,
              minLength: 1
            });

            $('.chips-placeholder').material_chip({
              placeholder: 'Enter a tag',
              secondaryPlaceholder: '+Tag',
            });
          });
        }
      }
    );
  }

}
