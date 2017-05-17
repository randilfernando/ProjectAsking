import {Routes} from "@angular/router";
import {QuestionListComponent} from "../../shared/question/question-list.component";
import {FeaturedComponent} from "./featured/featured.component";
import {SearchQuestionsComponent} from "./search-question/search-questions.component";
import {ModuleDetailsComponent} from "./module-details/module-details.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {ViewQuestionComponent} from "./view-question/view-question.component";
import {SearchModuleComponent} from "./search-module/search-module.component";
import {ViewReportComponent} from "./view-report/view-report.component";
import {LecturerOnlyGuard} from "../../guards/lecturer-only.guard";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {StudentOnlyGuard} from "../../guards/student-only.guard";
import {ViewModuleReportComponent} from "./view-module-report/view-module-report.component";
import {ManageModulesComponent} from "./manage-modules/manage-modules.component";
import {AddModuleComponent} from "./add-module/add-module.component";
import {AdminOnlyGuard} from "../../guards/admin-only.guard";
import {AdminLecturerGuard} from "../../guards/admin-lecturer.guard";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {AddUserComponent} from "./add-user/add-user.component";

export const HOME_ROUTES : Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'add-question', component: AddQuestionComponent, canActivate: [StudentOnlyGuard]},
  {path: 'search-module', component: SearchModuleComponent},
  {path: 'question/:id', component: ViewQuestionComponent},
  {path: 'question/search/:keyword', component: SearchQuestionsComponent},
  {path: 'module/:id', component: ModuleDetailsComponent},
  {path: 'view-report', component: ViewReportComponent, canActivate: [AdminLecturerGuard]},
  {path: 'view-module-report', component: ViewModuleReportComponent, canActivate: [AdminLecturerGuard]},
  {path: 'view-profile', component: ViewProfileComponent},
  {path: 'manage-modules', component: ManageModulesComponent, canActivate: [AdminOnlyGuard]},
  {path: 'add-module', component: AddModuleComponent, canActivate: [AdminOnlyGuard]},
  {path: 'manage-users', component: ManageUsersComponent, canActivate: [AdminOnlyGuard]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AdminOnlyGuard]}
];
