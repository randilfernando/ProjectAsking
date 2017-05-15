import {EventEmitter, Injectable} from '@angular/core';
import {Module} from "../types/module.type";
import {Http, Response, Headers, RequestOptionsArgs, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ModuleService {

  moduleListUpdated:EventEmitter<any> = new EventEmitter();

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
    return this.http.post('/api/module', {
      "moduleCode": module.moduleCode,
      "moduleName": module.moduleName,
      "topics": module.topics,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          this.selectedModule = module;
          return true;
        }
        return false;
      });
  }

  updateModule(module: Module): Observable<boolean>{
    return this.http.patch('/api/module', {
      "_id": module._id,
      "moduleCode": module.moduleCode,
      "moduleName": module.moduleName,
      "topics": module.topics,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          this.selectedModule = module;
          return true;
        }
        return false;
      });
  }

  deleteModule(module: Module): Observable<boolean>{
    let options: RequestOptionsArgs = {
      body: {
        "_id": module._id,
        "token": this.authenticationService.getLoggedOnUser().token
      },
      method: RequestMethod.Delete
    };

    return this.http.request('/api/module/', options)
      .map((response: Response) => {
        if(response.status === 200){
          this.selectedModule = null;
          return true;
        }
        return false;
      });
  }

  generateChangedEvent(){
    this.moduleListUpdated.emit();
  }

  getModules(): Module[]{
    return this.moduleList;
  }

  getSelectedModule(): Module{
    return this.selectedModule;
  }

}
