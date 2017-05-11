import {Component, OnInit, Input, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  keyword: string;
  username: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.username = this.authenticationService.getLoggedOnUser().username;
  }

  logout() {
    // logout user
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string){
    if(newPassword == confirmPassword){
      this.authenticationService.changePassword(oldPassword, newPassword)
        .subscribe(result => {
          if(result){
            $('#passwordReset').modal('close');
            $('#trigger_confirmation').click();
          }
        });
    }
  }

  ngAfterViewInit() {
    $('.dropdown-button').dropdown();
    $('.modal').modal();
  }

  search() {
    this.router.navigate([`/question/search/${this.keyword}`])
  }
}
