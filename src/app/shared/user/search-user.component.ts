import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../types/user.type";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'ask-search-user',
  templateUrl: './search-user.component.html',
  styles: []
})
export class SearchUserComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() userList: User[];
  @Output() onUserChanged = new EventEmitter<string>();

  private subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.userListUpdated.subscribe(
      () => {
        let item = {};
        for (let user of this.userList) {
          item[user.email] = null;
        }

        $('#userSearch').autocomplete({
          data: item,
          limit: 20,
          minLength: 1,
          onAutocomplete: function () {
            $('#load_users').click();
          }
        });
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    let item = {};
    for (let user of this.userList) {
      item[user.email] = null;
    }

    $(document).ready(function () {
      $('#userSearch').autocomplete({
        data: item,
        limit: 20,
        minLength: 1,
        onAutocomplete: function () {
          $('#load_users').click();
        }
      });
    });
  }

  userChanged(email: string){
    this.onUserChanged.emit(email);
  }

}
