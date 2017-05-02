import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Module} from "../types/module.type";

@Injectable()
export class ReportService {

  private moduleReport: Module[] = [];
  private unanswered: number;

  constructor(private http: Http) { }

  loadOverallReport(): Observable<boolean>{
    return this.http.get('/api/report')
      .map((response: Response) => {
        if (response.status == 200) {
          this.moduleReport = response.json();
          return true;
        } else {
          return false;
        }
      });
  };

  loadUnanswered(): Observable<boolean>{
    return this.http.get('/api/report/unanswered')
      .map((response: Response) => {
        if (response.status == 200) {
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
