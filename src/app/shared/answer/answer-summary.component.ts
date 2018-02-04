import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../types/answer.type";
import {QuestionService} from "../../services/question.service";
import {RatingService} from "../../services/rating.service";

@Component({
  selector: 'ask-answer-summary',
  templateUrl: './answer-summary.component.html'
})
export class AnswerSummaryComponent implements OnInit {

  @Input() answer: Answer;
  @Input() loggedOnEmail: string;
  @Input() editEnabled: boolean = false;
  sameUser: boolean = false;

  editingAnswer: string;

  isEditing: boolean;

  constructor(private questionService: QuestionService, private ratingService: RatingService) { }

  ngOnInit() {
    this.editingAnswer = this.answer.answer;
    this.sameUser = this.loggedOnEmail == this.answer.submittedBy;
  }

  triggerEditing(){
    this.isEditing = !this.isEditing;
  }

  updateAnswer(){
    if(this.editingAnswer == ''){
      this.deleteAnswer();
    }else{
      this.questionService.updateAnswer(this.answer._id, this.editingAnswer)
        .subscribe(result => {
          if(result){
            this.answer.answer = this.editingAnswer;
          }else{
            this.editingAnswer = this.answer.answer;
          }

          this.triggerEditing();
        })
    }
  }

  deleteAnswer(){
    this.questionService.deleteAnswer(this.answer)
      .subscribe(result => {
        if(result){
          this.answer.answer = this.editingAnswer;
        }else{
          this.editingAnswer = this.answer.answer;
        }
        this.triggerEditing();
      })
  }

  rateUpAnswer(){
    this.ratingService.rateUpAnswer(this.answer._id)
      .subscribe(result => {
        if(result){
          this.answer.totalRatings++;
        }
      });
  }

  rateDownAnswer(){
    this.ratingService.rateDownAnswer(this.answer._id)
      .subscribe(result => {
        if(result){
          this.answer.totalRatings--;
        }
      });
  }

}
