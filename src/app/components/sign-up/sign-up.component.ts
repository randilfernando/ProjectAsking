import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../types/user.type";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit, AfterViewInit {
  private user: User = {email: '', password: '', name: '', token: '', accessLevel: 0};

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  ngAfterViewInit(){
    $('.modal').modal();
  }

  register() {
    this.authenticationService.register(this.user)
      .subscribe(result => {
        if (result) {
          $('#trigger_confirmation').click();
        }else{
          $('#trigger_resend').click();
        }
      });
  }

}
