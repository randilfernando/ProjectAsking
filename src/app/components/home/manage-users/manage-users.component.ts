import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.type";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'ask-manage-users',
  templateUrl: './manage-users.component.html',
  styles: []
})
export class ManageUsersComponent implements OnInit, AfterViewInit {

  private isError: boolean = true;
  userList: User[];
  private selectedUser: User = {
    email: '',
    name: '',
    accessLevel: 0,
    token: '',
    password: ''
  };

  constructor(private userService: UserService) {
  }

  loadUser(email: string) {
    this.isError = true;
    Object.assign(this.selectedUser, this.userService.getUser(email));
    this.isError = false;
  }

  ngOnInit() {
    this.userService.loadUsers()
      .subscribe(result => {
        if (result) {
          this.userList = this.userService.getUsers();
        } else {
          this.userList = null;
        }
      })
  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

  resetData(){
    Object.assign(this.selectedUser, this.userService.getUser(this.selectedUser.email))
  }

  updateUser(){
    this.userService.changeAccess(this.selectedUser)
      .subscribe(result => {
        if(result){
          $('#trigger_submitted').click();
        }else{
          $('#trigger_error').click();
        }
      })
  }

}
