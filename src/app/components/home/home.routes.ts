import {Routes} from "@angular/router";
import {QuestionListComponent} from "../../shared/question/question-list.component";
import {FeaturedComponent} from "./featured/featured.component";
import {SearchQuestionsComponent} from "./search-question/search-questions.component";
import {ModuleDetailsComponent} from "./module-details/module-details.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {ViewQuestionComponent} from "./view-question/view-question.component";
import {SearchModuleComponent} from "./search-module/search-module.component";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'add-question', component: AddQuestionComponent},
  {path: 'search-module', component: SearchModuleComponent},
  {path: 'question/:id', component: ViewQuestionComponent},
  {path: 'question/search/:keyword', component: SearchQuestionsComponent},
  {path: 'module/:id', component: ModuleDetailsComponent}
];
