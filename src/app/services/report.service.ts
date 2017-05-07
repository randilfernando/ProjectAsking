import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ReportService {

  private moduleReport: Module[] = [];
  private unanswered: number;

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  loadOverallReport(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/report', {headers: headers})
      .map((response: Response) => {
        if (response.status === 200) {
          this.moduleReport = response.json();
          return true;
        } else {
          return false;
        }
      });
  };

  loadUnanswered(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/report/unanswered', {headers: headers})
      .map((response: Response) => {
        if (response.status === 200) {
          this.unanswered = response.json() && response.json().count;
          return true;
        } else {
          return false;
        }
      });
  }

  getModuleReport(): Module[]{
    return this.moduleReport;
  }

  getUnansweredCount(): number{
    return this.unanswered;
  }

  getAnsweredCount(): number{
    let count: number = 0;
    for (let module of this.moduleReport){
      count += module.totalQuestions;
    }
    return (count - this.unanswered);
  }

}
