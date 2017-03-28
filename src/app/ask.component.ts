import {Component} from '@angular/core';

@Component({
  selector: 'ask-root',
  template: '<router-outlet></router-outlet>'
})
export class AskComponent {
  loggedOn : boolean = true;

  isLoggedOn(): boolean{
    return this.loggedOn;
  }
}
