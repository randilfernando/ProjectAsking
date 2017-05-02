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
  private selectedModule: Module;
  private moduleList: Module[];
  private question: Question = {
    _id: '',
    title: '',
    moduleCode: '',
    moduleName: '',
    description: '',
    tags: [],
    totalRatings: 0,
    totalAnswers: 0,
    submittedBy: ''
  };

  private hasError: boolean = false;

  constructor(private moduleService: ModuleService, private questionService: QuestionService, private authenticationService: AuthenticationService) {
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

  submitQuestion() {
    if (this.selectedModule == null) {
      this.hasError = true;
    } else {
      this.hasError = false;
      this.question.moduleCode = this.selectedModule.moduleCode;
      this.question.moduleName = this.selectedModule.moduleName;
      this.question.submittedBy = this.authenticationService.getloggedOnUser().username; //can remove after authentication implemented
      let chips = $('.chips-placeholder').material_chip('data');
      for (let chip of chips) {
        this.question.tags.push(chip.tag);
      }
      console.log(this.question);
      this.questionService.addQuestion(this.question).subscribe(
        (result) => {
          if (result) {
            console.log('Success');
          }
        }
      );
    }
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
            $('.modal').modal();
            $('select').material_select();

            $('#moduleSearch').autocomplete({
              data: item,
              limit: 20,
              minLength: 1,
              onAutocomplete: function () {
                $('#load_topics').click();
              }
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
