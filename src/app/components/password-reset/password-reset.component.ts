import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'ask-password-reset',
  templateUrl: './password-reset.component.html',
  styles: []
})
export class PasswordResetComponent implements OnInit, AfterViewInit {

  email:string = '';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $('.modal').modal();
  }

  send(){
    this.authenticationService.passwordReset(this.email)
      .subscribe(result => {
        if(result){
          $('#confirmation').click();
        }else{
          $('error').click();
        }
      })
  }

}
