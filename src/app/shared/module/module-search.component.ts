import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Module} from "../../types/module.type";
import {Observable} from "rxjs/Observable";
import {ModuleService} from "../../services/module.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ask-module-search',
  templateUrl: './module-search.component.html',
  styles: []
})
export class ModuleSearchComponent implements OnInit, OnDestroy {

  @Input() moduleList: Module[];
  @Output() onModuleChanged = new EventEmitter<string>();

  private subscription: Subscription;

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.subscription = this.moduleService.moduleListUpdated.subscribe(
      () => {
        let item = {};
        for (let module of this.moduleList) {
          item[module.moduleCode + ' - ' + module.moduleName] = null;
        }

        $('#moduleSearch').autocomplete({
          data: item,
          limit: 20,
          minLength: 1,
          onAutocomplete: function () {
            $('#load_topics').click();
          }
        });
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    let item = {};
    for (let module of this.moduleList) {
      item[module.moduleCode + ' - ' + module.moduleName] = null;
    }

    $(document).ready(function () {
      $('#moduleSearch').autocomplete({
        data: item,
        limit: 20,
        minLength: 1,
        onAutocomplete: function () {
          $('#load_topics').click();
        }
      });

      $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
      });
    });
  }

  moduleChanged(moduleCode: string){
    moduleCode = moduleCode.slice(0, 6);
    this.onModuleChanged.emit(moduleCode);
  }
}
