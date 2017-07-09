import {Component,  Output, EventEmitter, AfterViewInit, OnDestroy, Input} from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';

@Component({
  selector: 'ask-text-area',
  template: `
    <div class="row">
      <textarea id="{{elementId}}" style="padding-right: 10px; padding-left: 10px">{{initialContent}}</textarea>
    </div>
  `
})
export class TextAreaComponent implements AfterViewInit, OnDestroy{

  @Input() elementId: string;
  @Input() initialContent = '';
  @Input() height= '150';
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
