import {Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'ask-text-area',
  templateUrl: 'text-area.component.html'
})
export class TextAreaComponent implements AfterViewInit, OnDestroy{

  @Input() elementId: string;
  @Input() initialContent: string = '';
  @Input() height: string = '150';
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height : this.height,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      formats: {
        bold: {inline : 'b'},
        italic: {inline : 'em'},
        underline: {inline : 'u'},
        strikethrough: {inline : 'del'},
      },
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('paste', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('undo', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('redo', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('click', () => {
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
