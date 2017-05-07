import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Module} from "../../types/module.type";
import {ActionURL} from "../../types/action.type";

@Component({
  selector: 'ask-home',
  templateUrl: 'home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  private studentURLs: ActionURL[] = [
    {title: 'Home', actionURL: 'featured'},
    {title: 'Add Question', actionURL: 'add-question'},
    {title: 'Search Module', actionURL: 'search-module'}
  ];

  private lecturerURLs: ActionURL[] = [
    {title: 'Home', actionURL: 'featured'},
    {title: 'Search Module', actionURL: 'search-module'},
    {title: 'Overall Report', actionURL: 'view-report'},
    {title: 'Module Report', actionURL: 'view-module-report'}
  ];

  private adminURLs: ActionURL[] = [
    {title: 'Home', actionURL: 'featured'},
    {title: 'Search Modules', actionURL: 'search-module'},
    {title: 'Overall Report', actionURL: 'view-report'},
    {title: 'Module Report', actionURL: 'view-module-report'},
    {title: 'Manage Modules', actionURL: 'manage-modules'},
    {title: 'Manage Users', actionURL: 'manage-users'},
  ];

  enrolledModules: Module[];
  actionsURLs: ActionURL[] = [];

  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    let userEmail = this.authenticationService.getLoggedOnUser().email;
    if (this.authenticationService.getLoggedOnUser().accessLevel < 2){
      this.userService.loadSubscribedModules(userEmail)
        .subscribe(result => {
          if(result){
            this.enrolledModules = this.userService.getSubscribedModules();
          } else {
            this.enrolledModules = [];
          }
        })
    }else{
      this.enrolledModules = null;
    }
    let accessLevel = this.authenticationService.getLoggedOnUser().accessLevel;
    switch (accessLevel){
      case 0:
        this.actionsURLs = this.studentURLs;
        break;
      case 1:
        this.actionsURLs = this.lecturerURLs;
        break;
      case 2:
        this.actionsURLs = this.adminURLs;
        break;
      default:
        this.actionsURLs = this.studentURLs;
    }
  }

}
