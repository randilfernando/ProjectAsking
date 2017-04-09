import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ask-question-details',
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit, AfterViewInit {

  private selectionList: [{}];
  private topicList: string[] = ['Topic 1', 'Topic 2', 'Topic 3'];
  private tags: string[] = [];
  private editingTag: string;

  constructor() {
  }

  // addTag(){
  //   this.tags.push(this.editingTag);
  //   this.editingTag = '';
  // }
  //
  // removeTag(tag: string){
  //   var index = this.tags.indexOf(tag, 0);
  //   if (index > -1){
  //     this.tags.splice(index, 1);
  //   }
  // }

  printMe(){}

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('select').material_select();

      $('input.autocomplete').autocomplete({
        data: {
          "Object oriented programming": null,
          "Theory of Computing": null,
          "Computer Architecture": null
        },
        limit: 20,
        minLength: 1
      });

      $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
      });
    });
  }

}
