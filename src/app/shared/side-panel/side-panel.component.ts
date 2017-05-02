import {Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Module} from "../../types/module.type";

@Component({
  selector: 'ask-side-panel',
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input()
  enrolledModules: Module[];

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    let userEmail = this.authenticationService.getloggedOnUser().email;
    this.userService.loadSubscribedModules(userEmail)
      .subscribe(result => {
        if(result){
          this.enrolledModules = this.userService.getSubscribedModules();
        } else {
          this.enrolledModules = [];
        }
      })
  }

}
