import {Component, OnInit, Input} from '@angular/core';
import {Module} from "../../types/module.type";

@Component({
  selector: 'ask-module-summary',
  templateUrl: 'module-summary.component.html'
})
export class ModuleSummaryComponent implements OnInit {
  @Input()
  module: Module;

  constructor() { }

  ngOnInit() {
  }

}
