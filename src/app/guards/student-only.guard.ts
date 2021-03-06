import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class StudentOnlyGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.authenticationService.getLoggedOnUser().accessLevel == 0) {
      //If Student
      return true;
    }
    // If not Student
    this.router.navigate(['/forbidden']);
    return false;
  }
}
