import {Component, OnInit} from '@angular/core';
import {User} from "../../types/user.type";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  private user: User = {email: '', password: '', username: '', token: '', accessLevel: 0};

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  register() {
    this.authenticationService.register(this.user)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/login']);
        }
        return result;
      });
  }

}
