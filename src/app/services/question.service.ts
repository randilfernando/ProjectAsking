import {Question} from "../types/question.type";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
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
      "description": question.description,
      "submittedBy": question.submittedBy,
      "tags": question.tags,
      "token": this.authenticationService.getloggedOnUser().token
    })
      .map( (response: Response) => {
        let status = response.status;
        // get modules if successful
        if(status == 200){
          return true;
        }
        return false;
      });
  }

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

  loadQuestionById(questionId: string): Observable<boolean>{
    return this.http.get(`/api/question/${questionId}`)
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
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
      }
    })
      .map((response: Response) => {
        let message = response.json() && response.json().message;
        // get modules if successful
        if(!message){
          this.selectedQuestion = response.json();
          this.answerList = response.json() && response.json().answers;
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
