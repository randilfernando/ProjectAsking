import {Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'ask-text-area',
  templateUrl: 'text-area.component.html'
})
export class TextAreaComponent implements AfterViewInit, OnDestroy{

  @Input() initialContent: string = '';

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#questionDetail',
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
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
