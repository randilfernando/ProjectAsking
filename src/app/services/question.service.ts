import {Question} from "../types/question.type";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestMethod, RequestOptionsArgs} from "@angular/http";
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
      "tags": question.tags,
      "token": this.authenticationService.getLoggedOnUser().token
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
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
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
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
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
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get(`/api/question/module/${moduleCode}`, {headers: headers})
      .map((response: Response) => {
        if(response.status === 200){
          this.questionList = response.json();
          return true;
        }
        return false;
      });
  }

  loadQuestionByUser(){
    let headers = new Headers();
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
    return this.http.get(`/api/question/user`, {headers: headers})
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
    headers.append('x-jwt-token', this.authenticationService.getLoggedOnUser().token);
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
      },
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          answer._id = response.json() && response.json().id;
          console.log(answer);
          this.answerList.push(answer);
          return true;
        }
        return false;
      });
  }

  updateQuestion(questionId: string, title: string, description: string): Observable<boolean>{
    return this.http.patch(`/api/question/${questionId}`, {
      "title": title,
      "description": description,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          return true;
        }
        return false;
      });
  }

  updateAnswer(answerId: string, answer: string): Observable<boolean>{
    return this.http.patch(`/api/answer/`, {
      "questionId": this.selectedQuestion._id,
      "answerId": answerId,
      "answer": answer,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        if(response.status === 200){
          return true;
        }
        return false;
      });
  }

  deleteQuestion(questionId: string): Observable<boolean>{
    let options: RequestOptionsArgs = {
      body: {
        "questionId": questionId,
        "token": this.authenticationService.getLoggedOnUser().token
      },
      method: RequestMethod.Delete
    };

    return this.http.request('/api/question/', options)
      .map((response: Response) => {
        if(response.status === 200){
          return true;
        }
        return false;
      });
  }

  deleteAnswer(answer: Answer): Observable<boolean>{
    let options: RequestOptionsArgs = {
      body: {
        "questionId": this.selectedQuestion._id,
        "answerId": answer._id,
        "token": this.authenticationService.getLoggedOnUser().token
      },
      method: RequestMethod.Delete
    };

    return this.http.request('/api/answer/', options)
      .map((response: Response) => {
        if(response.status === 200){
          var index: number = this.answerList.indexOf(answer, 0);
          if (index > -1) {
            this.answerList.splice(index, 1);
          }
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
