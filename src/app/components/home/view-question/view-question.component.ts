import {Component, OnInit, trigger} from '@angular/core';
import {Answer} from "../../../types/answer.type";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";
import {Question} from "../../../types/question.type";

@Component({
  selector: 'ask-view-question',
  templateUrl: './view-question.component.html',
  styles: []
})
export class ViewQuestionComponent implements OnInit {

  selectedQuestion;
  Question;
  private selectedModule: Module;
  private editingQuestion = {
    title: '',
    description: ''
  };
  answerList: Answer[];
  private moduleList: Module[];
  editEnabled: boolean = false;
  isEditing: boolean = false;
  private hasError: boolean = false;

  private editingAnswer: Answer = {
    _id: '',
    totalRatings: 0,
    answer: '',
    submittedBy: ''
  };

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService, private moduleService: ModuleService,
              private activatedRouter: Router) {
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.loadQuestion(id);
  }

  loadQuestion(id: string) {

    this.questionService.loadQuestionById(id).subscribe(
      result => {
        if (result) {
          this.selectedQuestion = this.questionService.getSelectedQuestion();
          this.editingQuestion.title = this.selectedQuestion.title;
          this.editingQuestion.description = this.selectedQuestion.description;
          this.answerList = this.questionService.getAnswerList();
          this.editEnabled = (this.authenticationService.getLoggedOnUser().accessLevel > 0) ||
            (this.authenticationService.getLoggedOnUser().email == this.selectedQuestion.submittedBy);
        } else {
          this.selectedQuestion = null;
          this.answerList = null;
        }
      }
    );
  }

  addAnswer() {
    this.editingAnswer.submittedBy = this.authenticationService.getLoggedOnUser().email;
    this.questionService.addAnswer(this.selectedQuestion._id, this.editingAnswer).subscribe(
      result => {
        if (result) {
          let clone: Answer = {
            _id: '',
            totalRatings: 0,
            answer: '',
            submittedBy: ''
          };
          Object.assign(clone, this.editingAnswer);
          this.answerList.push(clone);
          this.selectedQuestion.totalAnswers++;
          this.editingAnswer.answer = '';
        }
      }
    );
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.selectedQuestion._id, this.editingQuestion.title, this.editingQuestion.description)
      .subscribe((result) => {
        if (result) {
          this.selectedQuestion.title = this.editingQuestion.title;
          this.selectedQuestion.description = this.editingQuestion.description;
          this.triggerEdit();
        }else{
          this.triggerEdit();
        }
      }
    );
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.selectedQuestion._id)
      .subscribe(result => {
        if(result){
          this.activatedRouter.navigate(['/featured']);
        }
      });
  }

  triggerEdit() {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing);
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
