import {Component} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'ask-root',
  template: '<router-outlet></router-outlet>'
})
export class AskComponent {

  constructor(){}

}
