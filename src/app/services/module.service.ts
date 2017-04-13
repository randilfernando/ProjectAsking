import { Injectable } from '@angular/core';
import {Module} from "../types/module.type";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ModuleService {

  private moduleList: Module[];
  private selectedModule: Module;

  constructor(private http: Http) { }

  loadFeaturedModules(): Observable<boolean>{
    return this.http.get('/api/module/featured')
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.moduleList = response.json();
          return true;
        }
        return false;
      });
  }

  loadModules(): Observable<boolean>{
    return this.http.get('/api/module')
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.moduleList = response.json();
          return true;
        }
        return false;
      });
  }

  loadModule(moduleCode: string): Observable<boolean>{
    return this.http.get(`/api/module/${moduleCode}`)
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
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
