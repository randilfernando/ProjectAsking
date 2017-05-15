import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AdminOnlyGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.getLoggedOnUser().accessLevel === 2) {
      // If admin
      return true;
    }
    // If not admin
    return false;
  }
}
