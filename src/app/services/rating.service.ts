import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptionsArgs, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Observable";
import {QuestionService} from "./question.service";

@Injectable()
export class RatingService {

  constructor(private http: Http, private authenticationService: AuthenticationService, private questionService: QuestionService) {
  }

  rateUpQuestion(questionId: string): Observable<boolean> {
    return this.http.post('/api/question/rate', {
      "questionId": questionId,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        return response.status === 200;
      });
  }

  rateDownQuestion(questionId: string): Observable<boolean> {
    let options: RequestOptionsArgs = {
      body: {
        "questionId": questionId,
        "token": this.authenticationService.getLoggedOnUser().token
      },
      method: RequestMethod.Delete
    };

    return this.http.request('/api/question/rate', options)
      .map((response: Response) => {
        return response.status === 200;
      });
  }

  rateUpAnswer(answerId: string): Observable<boolean> {
    return this.http.post('/api/answer/rate', {
      "questionId": this.questionService.getSelectedQuestion()._id,
      "answerId": answerId,
      "token": this.authenticationService.getLoggedOnUser().token
    })
      .map((response: Response) => {
        return response.status === 200;
      });
  }

  rateDownAnswer(answerId: string): Observable<boolean> {
    let options: RequestOptionsArgs = {
      body: {
        "questionId": this.questionService.getSelectedQuestion()._id,
        "answerId": answerId,
        "token": this.authenticationService.getLoggedOnUser().token
      },
      method: RequestMethod.Delete
    };

    return this.http.request('/api/answer/rate', options)
      .map((response: Response) => {
        return response.status === 200;
      });
  }

}
