import {Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'ask-add-question',
  templateUrl: 'question-description.component.html',
  styles: []
})
export class QuestionDescriptionComponent implements AfterViewInit, OnDestroy{

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#questionDetail',
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
