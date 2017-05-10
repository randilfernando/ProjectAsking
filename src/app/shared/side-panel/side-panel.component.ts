import {Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Module} from "../../types/module.type";
import {ActionURL} from "../../types/action.type";

@Component({
  selector: 'ask-side-panel',
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.css']
})
export class SidePanelComponent implements OnInit, AfterViewInit {

  @Input()
  enrolledModules: Module[];

  @Input()
  actionURLList: ActionURL[];

  @ViewChild('menuUp') menuUp: ElementRef;
  menuDownHeight = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.menuDownHeight = window.innerHeight - (this.menuUp.nativeElement.offsetHeight + 60);
  }

  onResize(){
    this.menuDownHeight = window.innerHeight - this.menuUp.nativeElement.offsetHeight;
  }

}
