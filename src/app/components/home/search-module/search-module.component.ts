import { Component, OnInit } from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'ask-search-module',
  templateUrl: './search-module.component.html'
})
export class SearchModuleComponent implements OnInit {

  modulesList: Module[];
  message: string = null;
  subscribeEnabled = false;

  constructor(private moduleService: ModuleService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.moduleService.loadModules()
      .subscribe(result => {
        this.message = null;
        if (result) {
          this.modulesList = this.moduleService.getModules();
        } else {
          this.message = 'Sorry no modules.'
        }
      });
    this.subscribeEnabled = this.authenticationService.getLoggedOnUser().accessLevel < 2;
  }
}
