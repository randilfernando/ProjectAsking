import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';

import { AskComponent } from './ask.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidePanelComponent } from './shared/side-panel/side-panel.component';
import { ModuleSummaryComponent } from './shared/module/module-summary.component';
import { ModuleSummaryListComponent } from './shared/module/module-summary-list.component';
import { AboutusComponent } from './shared/about-us/aboutus.component';
import { LoginheaderComponent } from './shared/header/loginheader.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule} from "@angular/router";
import { QuestionSummaryComponent } from './shared/question/question-summary.component';
import { QuestionListComponent } from './shared/question/question-list.component';
import { routing } from "./ask.routing";
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuard } from "./guards/auth.guard";
import { ModuleService } from "./services/module.service";
import { FeaturedComponent } from './components/home/featured/featured.component';
import { QuestionService } from "./services/question.service";
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
import { UserService } from "./services/user.service";
import { ViewReportComponent } from './components/home/view-report/view-report.component';
import { ReportService } from "./services/report.service";
import { Error403Component } from './components/error-pages/error-403/error-403.component';
import {AdminGuard} from "./guards/admin.guard";
import {LecturerGuard} from "./guards/lecturer.guard";

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
    Error403Component
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
    AuthGuard,
    LecturerGuard,
    AdminGuard
  ],
  bootstrap: [AskComponent]
})
export class AppModule { }
