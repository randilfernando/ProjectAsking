import {Routes} from "@angular/router";
import {QuestionListComponent} from "../../shared/question/question-list.component";
import {FeaturedComponent} from "./featured/featured.component";
import {SearchQuestionsComponent} from "./search-question/search-questions.component";
import {ModuleDetailsComponent} from "./module-details/module-details.component";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'question/search/:keyword', component: SearchQuestionsComponent},
  {path: 'module/:id', component: ModuleDetailsComponent}
];
