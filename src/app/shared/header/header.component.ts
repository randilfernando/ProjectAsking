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

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.username = this.authenticationService.getLoggedOnUser().username;
  }

  logout(){
    // logout user
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(){
      $(document).ready(function () {
        $('.dropdown-button').dropdown();
      });
  }

  search(){
    this.router.navigate([`/question/search/${this.keyword}`])
  }
}
