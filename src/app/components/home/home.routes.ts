import {Routes} from "@angular/router";
import {QuestionListComponent} from "../../shared/question/question-list.component";
import {FeaturedComponent} from "./featured/featured.component";
import {AllQuestionsComponent} from "./question-list/all-questions.component";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'question', component: AllQuestionsComponent},
  {path: 'question/search/:keyword', component: QuestionListComponent}
];
