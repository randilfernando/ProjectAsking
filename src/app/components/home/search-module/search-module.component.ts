import { Component, OnInit } from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";

@Component({
  selector: 'ask-search-module',
  templateUrl: './search-module.component.html'
})
export class SearchModuleComponent implements OnInit {

  modulesList: Module[];
  private message: string = null;

  constructor(private moduleService: ModuleService) {
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
  }
}
