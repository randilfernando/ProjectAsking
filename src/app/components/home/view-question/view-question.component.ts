import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Answer} from "../../../types/answer.type";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {ModuleService} from "../../../services/module.service";
import {Question} from "../../../types/question.type";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'ask-view-question',
  templateUrl: './view-question.component.html',
  styles: []
})
export class ViewQuestionComponent implements OnInit {

  editingQuestion = {
    title: '',
    description: ''
  };
  selectedQuestion: Question;
  answerList: Answer[];
  editEnabled: boolean = false;
  isEditing: boolean = false;
  accessLevel: number = 0;

  editingAnswer: Answer = {
    _id: '',
    totalRatings: 0,
    answer: '',
    submittedBy: ''
  };

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService, private moduleService: ModuleService,
              private ratingService: RatingService, private location: Location) {
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.loadQuestion(id);
    this.accessLevel = this.authenticationService.getLoggedOnUser().accessLevel;
  }

  loadQuestion(id: string) {

    this.questionService.loadQuestionById(id).subscribe(
      result => {
        if (result) {
          this.selectedQuestion = this.questionService.getSelectedQuestion();
          Object.assign(this.editingQuestion, this.selectedQuestion);
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
    let clone: Answer = {
      _id: '',
      totalRatings: 0,
      answer: '',
      submittedBy: ''
    };
    Object.assign(clone, this.editingAnswer);

    this.questionService.addAnswer(clone).subscribe(
      result => {
        if (result) {
          this.selectedQuestion.totalAnswers++;
          this.editingAnswer.answer = '';
        }
      }
    );
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.editingQuestion.title, this.editingQuestion.description)
      .subscribe((result) => {
          if (result) {
            this.selectedQuestion.title = this.editingQuestion.title;
            this.selectedQuestion.description = this.editingQuestion.description;
            this.triggerEdit();
          } else {
            this.triggerEdit();
          }
        }
      );
  }

  deleteQuestion() {
    this.questionService.deleteQuestion()
      .subscribe(result => {
        if (result) {
          this.location.back();
        }
      });
  }

  rateUpQuestion(){
    this.ratingService.rateUpQuestion()
      .subscribe(result => {
        if(result){
          this.selectedQuestion.totalRatings++;
        }
      });
  }

  rateDownQuestion(){
    this.ratingService.rateDownQuestion()
      .subscribe(result => {
        if(result){
          this.selectedQuestion.totalRatings--;
        }
      });
  }

  triggerEdit() {
    this.isEditing = !this.isEditing;
  }

  resetEditing() {
    Object.assign(this.editingQuestion, this.selectedQuestion);
    this.triggerEdit();
  }

  getLoggedOnEmail() {
    return this.authenticationService.getLoggedOnUser().email;
  }

}
