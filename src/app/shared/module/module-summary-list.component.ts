import { Component, OnInit } from '@angular/core';
import {Module} from "./module";

@Component({
  selector: 'ask-modulesummarylist',
  templateUrl: 'module-summary-list.component.html'
})
export class ModuleSummaryListComponent implements OnInit {
  moduleSummaries: [Module];

  constructor() { }

  ngOnInit() {
    this.moduleSummaries = [
      new Module('CS2022', 'Object Oriented Programming', 100),
      new Module('CS3200', 'Object Oriented Software Designing', 120),
      new Module('CS2200', 'Computer Architecture', 500),
      new Module('CS3062', 'Theory of Computing', 75)
    ];
  }

}
