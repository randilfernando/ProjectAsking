import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class LecturerStudentGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate() {
    let accessLevel = this.authenticationService.getLoggedOnUser().accessLevel;
    if (accessLevel === 1 || accessLevel === 0) {
      // If student or lecturer
      return true;
    }
    // If not student or lecturer
    return false;
  }
}
