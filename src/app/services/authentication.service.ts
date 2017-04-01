import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {User} from "../types/user.type";

@Injectable()
export class AuthenticationService {
  private storage = localStorage;

  public token: string;
  public username: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(this.storage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
  }

  login(user: User): Observable<boolean> {
    return this.http.post('/api/user/login', {"email": user.email, "password": user.password})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;

        if (token) {
          // set token property
          this.token = token;
          user.token = token;
          let username = response.json() && response.json().username;
          this.username = username;
          user.username = username;

          user.password = '';
          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('currentUser', JSON.stringify(user));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  register(user: User): Observable<boolean>{
    return this.http.post('/api/user/register', {"email": user.email, "username": user.username, "password": user.password})
      .map((response: Response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.username = null;
    this.storage.removeItem('currentUser');
  }

  getloggedOnUser(): User{
    return JSON.parse(this.storage.getItem('currentUser'));
  }
}
