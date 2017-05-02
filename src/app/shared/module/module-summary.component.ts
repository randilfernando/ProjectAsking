import {Component, OnInit, Input} from '@angular/core';
import {Module} from "../../types/module.type";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'ask-module-summary',
  templateUrl: 'module-summary.component.html'
})
export class ModuleSummaryComponent implements OnInit {
  @Input()
  module: Module;

  @Input()
  subscribeEnabled: boolean = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
  }

  subscribe(){
    let email = this.authenticationService.getloggedOnUser().email;
    this.userService.subscribeModule(email, this.module)
      .subscribe(result => {

      });
  }

}
