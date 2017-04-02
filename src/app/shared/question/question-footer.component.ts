import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ask-question-footer',
  templateUrl: './question-footer.component.html',
  styles: []
})
export class QuestionFooterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $('.chips-placeholder').material_chip({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
  }

}
