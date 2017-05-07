import {Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Module} from "../../types/module.type";
import {ActionURL} from "../../types/action.type";

@Component({
  selector: 'ask-side-panel',
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  @Input()
  enrolledModules: Module[];

  @Input()
  actionURLList: ActionURL[];

  constructor() {
  }

  ngOnInit() {
  }

}
