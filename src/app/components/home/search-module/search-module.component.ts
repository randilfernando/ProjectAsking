import { Component, OnInit } from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";

@Component({
  selector: 'ask-search-module',
  templateUrl: './search-module.component.html'
})
export class SearchModuleComponent implements OnInit {

  private moduleList: Module[];

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {

  }

}
