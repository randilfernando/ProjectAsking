import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UserService {

  private subscribedModuleList: Module[];

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  subscribeModule(module: Module): Observable<boolean>{
    return this.http.post('/api/user/subscribe', {
      "id": module._id,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status === 200) {
          this.subscribedModuleList.push(module);
          console.log(this.subscribedModuleList);
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
    return this.http.patch('/api/user/profile', {
      "name": newName,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if (response.status === 200) {
          let user = this.authenticationService.getLoggedOnUser();
          user.username = newName;
          this.authenticationService.saveLoggedOnUser(user);
          this.authenticationService.getLoggedOnUser().username = user.username;
          return true;
        } else {
          return false;
        }
      });
  }


  getSubscribedModules(): Module[]{
    return this.subscribedModuleList;
  }
}
