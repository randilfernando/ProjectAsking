import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from "../types/user.type";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  private storage = localStorage;
  private storedName = 'currentUser';

  loggedOnUser: User;

  constructor(private http: Http, private activatedRouter: Router) {
    this.loggedOnUser = JSON.parse(this.storage.getItem(this.storedName));
  }

  login(user: User): Observable<boolean> {
    return this.http.post('/api/user/login', {
      "email": user.email,
      "password": user.password
    })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;

        if (token) {
          // set token property
          user.token = token;
          user.username = response.json() && response.json().username;
          user.accessLevel = response.json() && response.json().accessLevel;
          user.password = '';
          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.saveLoggedOnUser(user);

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  register(user: User): Observable<boolean>{
    return this.http.post('/api/user/register', {
      "email": user.email,
      "name": user.username,
      "password": user.password
    })
      .map((response: Response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      });
  }

  passwordReset(email: string): Observable<boolean>{
    return this.http.post('/api/user/reset', {
      "email": email
    })
      .map((response: Response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean>{
    return this.http.patch('/api/user/profile', {
      "oldPassword": oldPassword,
      "newPassword": newPassword,
      "token": this.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status == 200) {
          let user: User = {
            username: this.getLoggedOnUser().username,
            email: this.getLoggedOnUser().email,
            password: newPassword,
            accessLevel: 0,
            token: ''
          };
          this.login(user)
            .subscribe(result => {
              if(!result){
                this.activatedRouter.navigate(['/login']);
              }
            });
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.storage.removeItem(this.storedName);
  }

  getLoggedOnUser(): User{
    return this.loggedOnUser;
  }

  saveLoggedOnUser(user: User){
    this.storage.setItem(this.storedName, JSON.stringify(user));
    this.loggedOnUser = JSON.parse(this.storage.getItem(this.storedName));
  }
}
