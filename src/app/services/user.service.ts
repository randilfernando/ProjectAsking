import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";
import {AuthenticationService} from "./authentication.service";
import {User} from "../types/user.type";

@Injectable()
export class UserService {

  private subscribedModuleList: Module[];
  private usersList: User[] = [];
  private selectedUser: User = {
    email: '',
    name: '',
    password: '',
    token: '',
    accessLevel: 0
  };
  userListUpdated:EventEmitter<any> = new EventEmitter();

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  subscribeModule(module: Module): Observable<boolean>{
    return this.http.post('/api/user/subscribe', {
      "id": module._id,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status === 200) {
          this.subscribedModuleList.push(module);
          return true;
        } else {
          return false;
        }
      });
  };

  unsubscribeModule(module: Module): Observable<boolean>{
    return this.http.post('/api/user/unsubscribe', {
      "id": module._id,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status === 200) {
          var index: number = this.subscribedModuleList.indexOf(module, 0);
          if (index > -1) {
            this.subscribedModuleList.splice(index, 1);
          }
          return true;
        } else {
          return false;
        }
      });
  };

  loadSubscribedModules(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get(`/api/user/profile`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          if (!this.subscribedModuleList){
            this.subscribedModuleList = response.json() && response.json().subscribedModules;
          }
          return true;
        }
        return false;
      });
  }

  changeProfileName(newName: string): Observable<boolean>{
    return this.http.put('/api/user/profile', {
      "name": newName,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status === 200) {
          let user = this.authenticationService.getLoggedOnUser();
          user.name = newName;
          this.authenticationService.saveLoggedOnUser(user);
          this.authenticationService.getLoggedOnUser().name = user.name;
          return true;
        } else {
          return false;
        }
      });
  }

  loadUsers(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/user', {headers: headers})
      .map((response: Response) => {
        this.usersList = response.json();
        return response.status === 200;
      });
  }

  addUser(user: User): Observable<boolean>{
    return this.http.post('/api/user', {
      "email": user.email,
      "name": user.name,
      "accessLevel": user.accessLevel,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        Object.assign(this.selectedUser, user);
        this.usersList.push(this.selectedUser);
        return response.status === 200;
      });
  }

  changeAccess(user: User): Observable<boolean>{
    return this.http.post('/api/user/change',{
      "accessLevel": user.accessLevel,
      "email": user.email,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        for (let u of this.usersList){
          if(u.email === user.email) u = user
        }
        return response.status === 200;
      })
  }

  getUsers(){
    return this.usersList;
  }

  getUser(email: string): User{
    for (let user of this.usersList){
      if(user.email === email) return user;
    }
    return null;
  }

  getSubscribedModules(): Module[]{
    return this.subscribedModuleList;
  }

  userListChanged(){
    this.userListUpdated.emit('Changed');
  }
}
