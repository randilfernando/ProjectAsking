import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ask-sign-up-form',
  templateUrl: 'sign-up-form.component.html',
  styles: [`
      .btn-cancel{
        background-color: white;
        color: #1565c0;
        border: 1px solid #1565c0;
      }
  `]
})
export class SignUpFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
