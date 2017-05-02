import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";

@Injectable()
export class UserService {

  private subscribedModuleList: Module[];

  constructor(private http: Http) { }

  subscribeModule(email: string, module: Module): Observable<boolean>{
    return this.http.post('/api/user/subscribe', {
      "email": email,
      "id": module._id,
    })
      .map((response: Response) => {
        if (response.status == 200) {
          this.subscribedModuleList.push(module);
          return true;
        } else {
          return false;
        }
      });
  };

  loadSubscribedModules(email: string): Observable<boolean>{
    return this.http.get(`/api/user/profile/${email}`)
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
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
