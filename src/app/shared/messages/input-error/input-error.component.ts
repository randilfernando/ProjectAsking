import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ask-input-error',
  templateUrl: './input-error.component.html'
})
export class InputErrorComponent implements OnInit {

  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
