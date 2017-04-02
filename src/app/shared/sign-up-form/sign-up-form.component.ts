import { Component, OnInit } from '@angular/core';
import {User} from "../../types/user.type";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-sign-up-form',
  templateUrl: 'sign-up-form.component.html'
})
export class SignUpFormComponent implements OnInit {
  private user: User = {email: '', password: '', username: '', token: ''};

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  register(){
    this.authenticationService.register(this.user)
      .subscribe(result => {
        if(result){
          this.router.navigate(['/login']);
        }
        return result;
      });
  }

}
