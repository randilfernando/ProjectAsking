import {Question} from "../types/question.type";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Answer} from "../types/answer.type";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class QuestionService {
  private questionList: Question[];
  private selectedQuestion: Question;
  private answerList: Answer[];

  constructor(private http: Http, private authenticationService: AuthenticationService){}

  addQuestion(question:Question): Observable<boolean> {
    return this.http.post('/api/question', {
      "title": question.title,
      "moduleCode": question.moduleCode,
      "moduleName": question.moduleName,
      "topic": question.topic,
      "description": question.description,
      "submittedBy": question.submittedBy,
      "tags": question.tags,
      "token": this.authenticationService.getloggedOnUser().token
    })
      .map( (response: Response) => {
        if(response.status === 200){
          return true;
        }
        return false;
      });
  }

  loadQuestions(): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
    return this.http.get('/api/question', {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  searchQuestions(keyword:string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
    return this.http.get(`/api/question/search/${keyword}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  loadQuestionsByModule(moduleCode: string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
    return this.http.get(`/api/question/module/${moduleCode}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  loadQuestionById(questionId: string): Observable<boolean>{
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
    return this.http.get(`/api/question/${questionId}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.selectedQuestion = response.json();
          this.answerList = response.json() && response.json().answers;
          return true;
        }
        return false;
      });
  }

  addAnswer(questionId: string, answer: Answer): Observable<boolean>{
    return this.http.post(`/api/answer/`, {
      "questionId": questionId,
      "answer": {
        "answer": answer.answer,
        "submittedBy": answer.submittedBy
      },
      "token": this.authenticationService.getloggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          return true;
        }
        return false;
      });
  }

  getQuestionList(){
    return this.questionList;
  }

  getSelectedQuestion(){
    return this.selectedQuestion;
  }

  getAnswerList(){
    return this.answerList;
  }
}
