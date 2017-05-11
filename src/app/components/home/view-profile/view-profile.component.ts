import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.type";
import {AuthenticationService} from "../../../services/authentication.service";
import {Module} from "../../../types/module.type";
import {Question} from "../../../types/question.type";
import {QuestionService} from "../../../services/question.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'ask-view-profile',
  templateUrl: './view-profile.component.html',
  styles: []
})
export class ViewProfileComponent implements OnInit, AfterViewInit {

  private user: User = {
    email: '',
    accessLevel: 0,
    token: '',
    username: '',
    password: ''
  };

  subscribedModules: Module[];
  submittedQuestions: Question[];

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
              private questionService: QuestionService) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getLoggedOnUser();
    this.loadSubscribedModules();
    this.loadSubmittedQuestions();
  }

  ngAfterViewInit() {
    $('ul.tabs').tabs();
    $('.modal').modal();
  }

  loadSubscribedModules() {
    if (this.subscribedModules = this.userService.getSubscribedModules()) {
    } else {
      this.userService.loadSubscribedModules()
        .subscribe(result => {
          if (result) {
            this.subscribedModules = this.userService.getSubscribedModules();
          }
        });
    }
  }

  loadSubmittedQuestions() {
    this.questionService.loadQuestionByUser()
      .subscribe(result => {
        if(result){
          this.submittedQuestions = this.questionService.getQuestionList();
        }else{
          this.submittedQuestions = null;
        }
      })
  }

  changeUserData(){
    this.userService.changeProfileName(this.user.username)
      .subscribe(result => {
        if(result){
          $('#trigger_confirmation').click();
        }else{
          $('#trigger_error').click();
        }
      })
  }

  cancelEdit(){
    this.user = this.authenticationService.getLoggedOnUser();
  }

}
