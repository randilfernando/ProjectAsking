import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.type";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'ask-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit, AfterViewInit {

  private user: User = {
    email: '',
    name: '',
    password: '',
    accessLevel: 0,
    token: ''
  };
  private editingTopic = '';

  constructor(private userService: UserService, private location: Location) {
  }

  addUser() {
    this.userService.addUser(this.user)
      .subscribe(result => {
        if (result) {
          $('#trigger_submitted').click();
          this.location.back();
        } else {
          $('#trigger_error').click();
        }
      }, err => {
        $('#trigger_error').click();
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.modal').modal();
    })
  }

}
