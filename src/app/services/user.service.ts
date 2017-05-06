import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UserService {

  private subscribedModuleList: Module[];

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  subscribeModule(email: string, module: Module): Observable<boolean>{
    return this.http.post('/api/user/subscribe', {
      "email": email,
      "id": module._id,
      "token": this.authenticationService.getloggedOnUser().token
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

  loadSubscribedModules(email: string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
    return this.http.get(`/api/user/profile/${email}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.subscribedModuleList = response.json() && response.json().subscribedModules;
          return true;
        }
        return false;
      });
  }

  getSubscribedModules(): Module[]{
    return this.subscribedModuleList;
  }

}
