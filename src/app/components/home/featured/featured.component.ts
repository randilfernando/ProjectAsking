import { Component, OnInit } from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";

@Component({
  selector: 'ask-featured',
  templateUrl: './featured.component.html'
})
export class FeaturedComponent implements OnInit {

  modulesList: Module[];
  message: string = null;

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
    this.moduleService.loadFeaturedModules()
      .subscribe(result => {
        this.message = null
        if(result){
          this.modulesList = this.moduleService.getModules();
        }else{
          this.message = 'Sorry no modules.'
        }
      });
  }

}
