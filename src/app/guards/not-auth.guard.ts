import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.getLoggedOnUser()) {
      // logged in so return true
      return false;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/featured']);
    return true;
  }
}
