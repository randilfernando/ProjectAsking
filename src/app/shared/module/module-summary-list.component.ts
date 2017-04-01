import {Component, Input, OnInit} from '@angular/core';
import {Module} from "../../types/module.type";
import {ModuleService} from "../../services/module.service";

@Component({
  selector: 'ask-modulesummarylist',
  templateUrl: 'module-summary-list.component.html'
})
export class ModuleSummaryListComponent implements OnInit {

  @Input()
  featuredModules: Module[];

  constructor() { }

  ngOnInit() {

  }

}
