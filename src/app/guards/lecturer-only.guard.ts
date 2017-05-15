import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class LecturerOnlyGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.authenticationService.getLoggedOnUser().accessLevel === 1) {
      //If lecturer
      return true;
    }
    // If not lecturer
    this.router.navigate(['/forbidden']);
    return false;
  }
}
