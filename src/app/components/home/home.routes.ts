import {Routes} from "@angular/router";
import {ModuleSummaryListComponent} from "../../shared/module/module-summary-list.component";
import {AddQuestionComponent} from "../../shared/question/question-description.component";
import {QuestionListComponent} from "../../shared/question/question-list.component";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: ModuleSummaryListComponent},
  {path: 'add-question', component: AddQuestionComponent},
  {path: 'search-module', component: AddQuestionComponent},
  {path: 'module/:id', component: QuestionListComponent},
  {path: 'question/search/:keyword', component: QuestionListComponent},
  {path: 'question/:id', component: QuestionListComponent}
];
