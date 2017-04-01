import {Question} from "../types/question.type";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class QuestionService {
  private questionList: Question[];

  constructor(private http: Http){}

  loadQuestions(): Observable<boolean>{
    return this.http.get('/api/question')
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  searchQuestions(keyword:string): Observable<boolean>{
    return this.http.get(`/api/question/search/${keyword}`)
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  loadQuestionsByModule(moduleCode: number): Observable<boolean>{
    return this.http.get(`/api/question/module/${moduleCode}`)
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  getQuestionList(){
    return this.questionList;
  }
}
