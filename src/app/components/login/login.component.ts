import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../types/user.type";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'ask-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  user: User = {email: '', password: '', name: '', token: '', accessLevel: 0};

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.modal').modal();
    })
  }

  login() {
    this.authenticationService.login(this.user)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/featured']);
        }
        return result;
      }, err => {
        $('#trigger_error').click();
      });
  }

}
