import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  username: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.username = this.authenticationService.username;
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
}
