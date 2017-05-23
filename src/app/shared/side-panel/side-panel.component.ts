import {Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Module} from "../../types/module.type";
import {ActionURL} from "../../types/action.type";
import {User} from "../../types/user.type";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ask-side-panel',
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.css']
})
export class SidePanelComponent implements OnInit, AfterViewInit {

  @Input()
  enrolledModules: Module[];

  @Input()
  actionURLList: ActionURL[];

  @ViewChild('menuUp') menuUp: ElementRef;
  menuDownHeight = 0;

  user: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getLoggedOnUser();
  }

  ngAfterViewInit() {
    this.menuDownHeight = window.innerHeight - (this.menuUp.nativeElement.offsetHeight + 60);
    $(document).ready(function () {
      $('.modal').modal();
      $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 300
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
          draggable: true // Choose whether you can drag to open on touch screens
        }
      );
    })
  }

  onResize(){
    this.menuDownHeight = window.innerHeight - this.menuUp.nativeElement.offsetHeight;
  }

  logout() {
    // logout user
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string){
    if(newPassword == confirmPassword){
      this.authenticationService.changePassword(oldPassword, newPassword)
        .subscribe(result => {
          if(result){
            $('#passwordReset').modal('close');
            $('#trigger_confirmation').click();
          }
        });
    }
  }

}
