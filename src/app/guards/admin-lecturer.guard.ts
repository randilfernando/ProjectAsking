import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AdminLecturerGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate() {
    let accessLevel = this.authenticationService.getLoggedOnUser().accessLevel;
    if (accessLevel === 1 || accessLevel === 2) {
      // If admin or lecturer
      return true;
    }
    // If not admin or lecturer
    return false;
  }
}
