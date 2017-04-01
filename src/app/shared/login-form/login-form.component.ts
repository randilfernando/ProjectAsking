import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../types/user.type";

@Component({
  selector: 'ask-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  user: User = {email: '', password: '', username: '', token: ''};

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.authenticationService.login(this.user)
      .subscribe(result => {
        if(result){
          this.router.navigate(['/featured']);
        }
        return result;
      });
  }

}
