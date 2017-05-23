import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';
import { RouterModule} from "@angular/router";
import { routing } from "./ask.routing";

import { AskComponent } from './ask.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidePanelComponent } from './shared/side-panel/side-panel.component';
import { ModuleSummaryComponent } from './shared/module/module-summary.component';
import { ModuleSummaryListComponent } from './shared/module/module-summary-list.component';
import { AboutusComponent } from './shared/about-us/aboutus.component';
import { LoginheaderComponent } from './shared/header/loginheader.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionSummaryComponent } from './shared/question/question-summary.component';
import { QuestionListComponent } from './shared/question/question-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FeaturedComponent } from './components/home/featured/featured.component';
import { TextAreaComponent } from "./shared/text-area/text-area.component";
import { SearchQuestionsComponent } from "./components/home/search-question/search-questions.component";
import { SearchModuleComponent } from './components/home/search-module/search-module.component';
import { ModuleDetailsComponent } from './components/home/module-details/module-details.component';
import { AddQuestionComponent } from './components/home/add-question/add-question.component';
import { InputErrorComponent } from './shared/messages/input-error/input-error.component';
import { AnswerListComponent } from './shared/answer/answer-list.component';
import { AnswerSummaryComponent } from './shared/answer/answer-summary.component';
import { ViewQuestionComponent } from './components/home/view-question/view-question.component';
import { Error404Component } from './components/error-pages/error-404/error-404.component';
import { ViewReportComponent } from './components/home/view-report/view-report.component';
import { Error403Component } from './components/error-pages/error-403/error-403.component';
import { ViewProfileComponent } from './components/home/view-profile/view-profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UserManagementComponent } from './components/home/user-management/user-management.component';
import { ViewModuleReportComponent } from './components/home/view-module-report/view-module-report.component';
import { ModuleSearchComponent } from './shared/module/module-search.component';
import { ManageModulesComponent } from './components/home/manage-modules/manage-modules.component';
import { AddModuleComponent } from './components/home/add-module/add-module.component';;
import { ManageUsersComponent } from './components/home/manage-users/manage-users.component';
import { SearchUserComponent } from './shared/user/search-user.component';
import { AddUserComponent } from './components/home/add-user/add-user.component';

import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not-auth.guard";
import { AdminOnlyGuard } from "./guards/admin-only.guard";
import { LecturerOnlyGuard } from "./guards/lecturer-only.guard";
import { StudentOnlyGuard } from "./guards/student-only.guard";
import { AdminLecturerGuard } from "./guards/admin-lecturer.guard";
import { LecturerStudentGuard } from "./guards/lecturer-student.guard";

import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { ModuleService } from "./services/module.service";
import { QuestionService } from "./services/question.service";
import { RatingService } from "./services/rating.service";
import { ReportService } from "./services/report.service"

@NgModule({
  declarations: [
    AskComponent,
    HeaderComponent,
    FooterComponent,
    SidePanelComponent,
    ModuleSummaryComponent,
    ModuleSummaryListComponent,
    AboutusComponent,
    LoginheaderComponent,
    HomeComponent,
    TextAreaComponent,
    QuestionSummaryComponent,
    QuestionListComponent,
    LoginComponent,
    SignUpComponent,
    FeaturedComponent,
    SearchQuestionsComponent,
    SearchModuleComponent,
    ModuleDetailsComponent,
    AddQuestionComponent,
    InputErrorComponent,
    AnswerListComponent,
    AnswerSummaryComponent,
    ViewQuestionComponent,
    Error404Component,
    ViewReportComponent,
    Error403Component,
    ViewProfileComponent,
    PasswordResetComponent,
    UserManagementComponent,
    ViewModuleReportComponent,
    ModuleSearchComponent,
    ManageModulesComponent,
    AddModuleComponent,
    ManageUsersComponent,
    SearchUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    ChartModule,
    routing
  ],
  providers: [
    AuthenticationService,
    ModuleService,
    QuestionService,
    UserService,
    ReportService,
    RatingService,
    AuthGuard,
    LecturerOnlyGuard,
    AdminOnlyGuard,
    StudentOnlyGuard,
    AdminLecturerGuard,
    LecturerStudentGuard,
    NotAuthGuard
  ],
  bootstrap: [AskComponent]
})
export class AppModule { }
