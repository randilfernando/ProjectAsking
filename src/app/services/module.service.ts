import { Injectable } from '@angular/core';
import {Module} from "../types/module.type";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ModuleService {

  private moduleList: Module[];
  private selectedModule: Module;

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  loadFeaturedModules(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/module/featured', {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.moduleList = response.json();
          return true;
        }
        return false;
      });
  }

  loadModules(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/module', {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.moduleList = response.json();
          return true;
        }
        return false;
      });
  }

  loadModule(id: string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get(`/api/module/${id}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.selectedModule = response.json();
          return true;
        }
        return false;
      });
  }

  addModule(module: Module): Observable<boolean>{
    return new Observable();
  }

  getModules(): Module[]{
    return this.moduleList;
  }

  getSelectedModule(): Module{
    return this.selectedModule;
  }

}
