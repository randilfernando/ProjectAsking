import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.getLoggedOnUser().accessLevel > 1) {
      // If admin
      return true;
    }
    // If not admin
    return false;
  }
}
