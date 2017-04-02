import { Component, OnInit } from '@angular/core';
import {Module} from "../../../types/module.type";
import {ModuleService} from "../../../services/module.service";

@Component({
  selector: 'ask-featured',
  templateUrl: './featured.component.html'
})
export class FeaturedComponent implements OnInit {

  modulesList: Module[];
  private message: string = 'Loading.....';

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
    this.moduleService.loadFeaturedModules()
      .subscribe(result => {
        if(result){
          this.modulesList = this.moduleService.getModules();
        }else{
          this.message = 'Sorry no modules.'
        }
      });
  }

}
