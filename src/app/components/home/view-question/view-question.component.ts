import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../types/answer.type";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'ask-view-question',
  templateUrl: './view-question.component.html',
  styles: []
})
export class ViewQuestionComponent implements OnInit {

  selectedQuestion; Question;
  answerList: Answer[];

  private editingAnswer: Answer = {
    _id: '',
    totalRatings: 0,
    answer: '',
    submittedBy: ''
  };

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.loadQuestion(id);
  }

  loadQuestion(id: string){
    this.questionService.loadQuestionById(id).subscribe(
      result => {
        if (result){
          this.selectedQuestion = this.questionService.getSelectedQuestion();
          this.answerList = this.questionService.getAnswerList();
        }else{
          this.selectedQuestion = null;
          this.answerList = null;
        }
      }
    );
  }

  addAnswer(){
    this.editingAnswer.submittedBy = this.authenticationService.getloggedOnUser().username;
    this.questionService.addAnswer(this.selectedQuestion._id, this.editingAnswer).subscribe(
      result => {
        if (result){
          let clone: Answer = {
            _id: '',
            totalRatings: 0,
            answer: '',
            submittedBy: ''
          };
          Object.assign(clone, this.editingAnswer);
          this.answerList.push(clone);
          this.selectedQuestion.totalAnswers ++;
          this.editingAnswer.answer = '';
        }
      }
    );
  }

}
