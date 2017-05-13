import {Routes} from "@angular/router";
import {QuestionListComponent} from "../../shared/question/question-list.component";
import {FeaturedComponent} from "./featured/featured.component";
import {SearchQuestionsComponent} from "./search-question/search-questions.component";
import {ModuleDetailsComponent} from "./module-details/module-details.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {ViewQuestionComponent} from "./view-question/view-question.component";
import {SearchModuleComponent} from "./search-module/search-module.component";
import {ViewReportComponent} from "./view-report/view-report.component";
import {LecturerGuard} from "../../guards/lecturer.guard";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {StudentOnlyGuard} from "../../guards/student-only.guard";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'add-question', component: AddQuestionComponent, canActivate: [StudentOnlyGuard]},
  {path: 'search-module', component: SearchModuleComponent},
  {path: 'question/:id', component: ViewQuestionComponent},
  {path: 'question/search/:keyword', component: SearchQuestionsComponent},
  {path: 'module/:id', component: ModuleDetailsComponent},
  {path: 'view-report', component: ViewReportComponent, canActivate: [LecturerGuard]},
  {path: 'view-profile', component: ViewProfileComponent}
];
