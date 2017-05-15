import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "./authentication.service";
import {OverallReport} from "../types/overall-report.type";
import {ModuleReport} from "../types/module-report.type";

@Injectable()
export class ReportService {

  private overallReport: OverallReport = {
    answeredCount: 0,
    unansweredCount: 0,
    modules: []
  };

  private moduleReport: ModuleReport = {
    answeredCount: 0,
    unansweredCount: 0,
    moduleCode: '',
    moduleName: '',
    topics: []
  };

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  loadOverallReport(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get('/api/report', {headers: headers})
      .map((response: Response) => {
        if (response.status === 200) {
          this.overallReport.answeredCount = response.json().answeredCount;
          this.overallReport.unansweredCount = response.json().unansweredCount;
          this.overallReport.modules = response.json().data;
          return true;
        } else {
          return false;
        }
      });
  };

  loadModuleReport(moduleCode: string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get(`/api/report/${moduleCode}`, {headers: headers})
      .map((response: Response) => {
        if (response.status === 200) {
          this.moduleReport.answeredCount = response.json().answeredCount;
          this.moduleReport.unansweredCount = response.json().unansweredCount;
          this.moduleReport.topics = response.json().data;
          return true;
        } else {
          return false;
        }
      });
  }

  getOverallReport(): OverallReport{
    return this.overallReport;
  }

  getModuleReport(): ModuleReport{
    return this.moduleReport;
  }

}
